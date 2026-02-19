
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    // Handle Session Completed
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;

        if (!session?.metadata?.userId) {
            return new NextResponse("User ID is missing in metadata", { status: 400 });
        }

        // MONTHLY SUBSCRIPTION LOGIC
        if (session.mode === "subscription") {
            const subscription = await stripe.subscriptions.retrieve(
                session.subscription as string
            ) as any;

            await db.user.update({
                where: {
                    id: session.metadata.userId,
                },
                data: {
                    stripeSubscriptionId: subscription.id,
                    stripeCustomerId: subscription.customer as string,
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(
                        subscription.current_period_end * 1000
                    ),
                    plan: "monthly",
                    credits: {
                        increment: 100
                    }
                },
            });
        }

        // DAY PASS LOGIC (One-time payment)
        if (session.mode === "payment" && session.metadata.planType === "day_pass") {
            // Calculate 24 hours from now
            const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

            await db.user.update({
                where: {
                    id: session.metadata.userId,
                },
                data: {
                    stripeCustomerId: (session.customer as string) || session.metadata.userId,
                    stripePriceId: "day_pass_payment",
                    stripeCurrentPeriodEnd: expiresAt,
                    plan: "day_pass",
                    credits: {
                        increment: 10
                    }
                }
            });
        }
    }

    // Handle Recurring Payments
    if (event.type === "invoice.payment_succeeded") {
        const invoice = event.data.object as any;

        // Only process if it's a subscription invoice
        if (invoice.subscription) {
            const subscription = await stripe.subscriptions.retrieve(
                invoice.subscription as string
            ) as any;

            await db.user.update({
                where: {
                    stripeSubscriptionId: subscription.id,
                },
                data: {
                    stripePriceId: subscription.items.data[0].price.id,
                    stripeCurrentPeriodEnd: new Date(
                        subscription.current_period_end * 1000
                    ),
                },
            });
        }
    }

    return new NextResponse(null, { status: 200 });
}
