import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            plan: true,
        },
    });

    if (!user) {
        return false;
    }

    // Lifetime plan logic (if plan === "lifetime")
    if (user.plan === "lifetime") {
        return true;
    }

    const isValid =
        user.stripePriceId &&
        user.stripeCurrentPeriodEnd?.getTime()! > Date.now();

    return !!isValid;
};

export const getUserPlan = async () => {
    const { userId } = await auth();

    if (!userId) {
        return "Free";
    }

    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            plan: true,
            stripePriceId: true,
            stripeCurrentPeriodEnd: true,
        },
    });

    if (!user) {
        return "Free";
    }

    // Check if subscription is valid
    const isPro =
        user.stripePriceId &&
        user.stripeCurrentPeriodEnd?.getTime()! > Date.now();

    if (isPro) {
        // Map internal plan names to display names if needed
        return "Pro";
    }

    return "Free";
};
