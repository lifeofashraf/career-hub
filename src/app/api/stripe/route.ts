
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/dashboard");

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { priceId, planType } = await req.json();

        if (!priceId || !planType) {
            return new NextResponse("Missing priceId or planType", { status: 400 });
        }

        // Check for existing customer
        const dbUser = await db.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!dbUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        // If user already has a stripeCustomerId, use it. Otherwise, Stripe creates one during checkout or we create it.
        // Ideally, for subscriptions, we want to attach to the same customer.
        let customerId = dbUser.stripeCustomerId;

        if (planType === "monthly") {
            // SUBSCRIPTION FLOW
            // If user already has a valid subscription, redirect to billing portal? 
            // For simplicity, we assume they are upgrading or new.

            const stripeSession = await stripe.checkout.sessions.create({
                success_url: settingsUrl,
                cancel_url: settingsUrl,
                payment_method_types: ["card"],
                mode: "subscription",
                billing_address_collection: "auto",
                customer_email: user.emailAddresses[0].emailAddress,
                // If we have a customer ID, pass it. If not, Stripe creates one. 
                // BUT for subscriptions, passing customer_email AND customer might conflict if they don't match. 
                // Safest: check if we have customerId, if so pass it, else prompt email.
                // customer: customerId || undefined, // Commented out to avoid conflict if email differs, Stripe handles email matching usually or creates new.
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                metadata: {
                    userId,
                    planType: "monthly"
                },
            });

            return NextResponse.json({ url: stripeSession.url });

        } else if (planType === "day_pass") {
            // ONE-TIME PAYMENT FLOW
            const stripeSession = await stripe.checkout.sessions.create({
                success_url: settingsUrl,
                cancel_url: settingsUrl,
                payment_method_types: ["card"],
                mode: "payment",
                billing_address_collection: "auto",
                customer_email: user.emailAddresses[0].emailAddress,
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                metadata: {
                    userId,
                    planType: "day_pass"
                },
            });

            return NextResponse.json({ url: stripeSession.url });
        }

        return new NextResponse("Invalid Plan Type", { status: 400 });

    } catch (error) {
        console.log("[STRIPE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
