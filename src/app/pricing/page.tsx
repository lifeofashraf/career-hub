"use client";

import { motion } from "framer-motion";
import { Check, X, ShieldCheck, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const plans = [
    {
        id: "free",
        name: "Observer",
        price: "RM 0",
        period: "/ forever",
        description: "Perfect for students and first-time applicants.",
        features: [
            { text: "1 Active Resume", included: true },
            { text: "Basic Templates Only", included: true },
            { text: "Unlimited Job Tracking", included: true },
            { text: "Watermarked Downloads", included: true },
            { text: "AI Analysis", included: false },
        ],
        cta: "Current Plan",
        variant: "outline",
        popular: false,
    },
    {
        id: "day_pass",
        name: "Day Pass",
        price: "RM 3",
        period: "/ 24 hours",
        description: "Urgent interview? Get full access for one day.",
        features: [
            { text: "24h Unlimited Resumes", included: true },
            { text: "Unbranded PDF Downloads", included: true },
            { text: "Access All Templates", included: true },
            { text: "10 AI Credits", included: true },
            { text: "No Auto-Renewal", included: true },
        ],
        cta: "Buy Day Pass",
        variant: "default",
        popular: false,
    },
    {
        id: "monthly",
        name: "Pro Monthly",
        price: "RM 30",
        period: "/ month",
        description: "Serious job hunting. Continuous optimization.",
        features: [
            { text: "Unlimited Everything", included: true },
            { text: "100 AI Credits / Mo", included: true },
            { text: "Full Footprint Report", included: true },
            { text: "Cover Letter Generator", included: true },
            { text: "Priority Support", included: true },
        ],
        cta: "Subscribe Now",
        variant: "default",
        popular: true,
    },
];

export default function PricingPage() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubscribe = async (planId: string) => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/stripe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceId: planId === "day_pass" ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_DAY : process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
                    planType: planId
                }),
            });

            if (!response.ok) {
                const errText = await response.text();
                console.error("Failed to checkout:", errText, {
                    planId,
                    dayPrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_DAY,
                    monthlyPrice: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY
                });
                return;
            }

            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col font-sans text-black overflow-x-hidden bg-white selection:bg-black selection:text-white">
            <Header />
            <main className="flex-1 py-32 px-4 md:px-8 bg-background">
                <RevealOnScroll width="100%">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
                            Invest in Your <span className="text-primary italic">Career</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Choose the plan that fits your job hunt ease. Upgrade anytime.
                        </p>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <RevealOnScroll key={plan.id} delay={index * 0.1}>
                            <div
                                className={cn(
                                    "relative flex flex-col h-full bg-card border-2 rounded-2xl p-8 transition-all duration-300",
                                    plan.popular
                                        ? "border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] scale-105 z-10"
                                        : "border-border shadow-sm hover:translate-y-1 hover:shadow-md"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                        <div className="bg-neutral-950 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1 shadow-sm border-2 border-neutral-950">
                                            <Crown className="w-3 h-3" /> Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="mb-8 text-center border-b-2 border-dashed border-gray-200 pb-8">
                                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                                        <span className="text-muted-foreground text-sm font-bold uppercase">{plan.period}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-4 font-medium px-4">{plan.description}</p>
                                </div>

                                <div className="flex-1 space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <div className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center shrink-0 border border-black/10">
                                                    <Check className="w-3.5 h-3.5 text-black" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                                                    <X className="w-3.5 h-3.5 text-red-300" />
                                                </div>
                                            )}
                                            <span className={cn("text-sm font-medium", feature.included ? "text-foreground" : "text-muted-foreground line-through")}>
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    disabled={isLoading || plan.id === "free"}
                                    onClick={() => plan.id !== "free" && onSubscribe(plan.id)}
                                    variant={plan.popular ? "default" : "outline"}
                                    className={cn(
                                        "w-full h-12 text-base font-bold uppercase tracking-wide border-2 shadow-sm transition-all active:translate-y-0.5",
                                        plan.popular
                                            ? "bg-black text-white hover:bg-neutral-800 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                                            : "border-black hover:bg-neutral-100 text-black"
                                    )}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>


                <RevealOnScroll delay={0.4} width="100%">
                    <div className="mt-20 text-center space-y-4">
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <ShieldCheck className="w-5 h-5" />
                            <span className="text-sm font-medium">Secure Payment via Stripe</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            30-day money-back guarantee for Monthly plans. Day passes are non-refundable.
                        </p>
                    </div>
                </RevealOnScroll>
            </main>
            <Footer />
        </div>
    );
}
