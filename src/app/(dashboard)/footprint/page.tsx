"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    ShieldCheck,
    ExternalLink,
    CheckCircle2,
    Circle,
    ArrowRight,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

// ============================================
// Types & Data
// ============================================

interface ChecklistItem {
    id: string;
    label: string;
    description: string;
    actionLabel?: string;
    actionUrl?: string;
}

interface Category {
    id: string;
    title: string;
    description: string;
    items: ChecklistItem[];
}

const categories: Category[] = [
    {
        id: "cleanup",
        title: "Clean Up Old Accounts",
        description: "Reduce your attack surface by deleting unused accounts.",
        items: [
            { id: "old-email", label: "Delete old email accounts", description: "Hackers use old emails to reset passwords on other sites." },
            { id: "social-media", label: "Deactivate unused social media", description: "MySpace, Tumblr, or old Facebook accounts exposing personal data." },
            { id: "shopping", label: "Remove saved cards from shopping sites", description: "Amazon, eBay, etc. shouldn't store your card details indefinitely." },
        ]
    },
    {
        id: "privacy",
        title: "Privacy Settings",
        description: "Lock down who can see your information.",
        items: [
            { id: "google-activity", label: "Review Google Activity controls", description: "Turn off location history and voice recordings.", actionLabel: "Google Activity", actionUrl: "https://myactivity.google.com" },
            { id: "fb-privacy", label: "Limit past posts on Facebook", description: "Change audience for old posts to 'Friends' only.", actionLabel: "FB Settings", actionUrl: "https://facebook.com/settings" },
            { id: "linkedin-viz", label: "Turn off LinkedIn profile viewing", description: "Browse anonymously without alerting others.", actionLabel: "LinkedIn Settings", actionUrl: "https://www.linkedin.com/psettings/" },
        ]
    },
    {
        id: "security",
        title: "Hardening Security",
        description: "Make it impossible for hackers to get in.",
        items: [
            { id: "pwm", label: "Use a Password Manager", description: "Bitwarden or 1Password. No more reused passwords.", actionLabel: "Get Bitwarden", actionUrl: "https://bitwarden.com" },
            { id: "2fa", label: "Enable 2FA everywhere", description: "Use an authenticator app (Authy/Google Auth), not SMS.", actionLabel: "2FA Guide", actionUrl: "https://2fa.directory" },
            { id: "hibp", label: "Check HaveIBeenPwned", description: "See if your email was involved in a data breach.", actionLabel: "Check Now", actionUrl: "https://haveibeenpwned.com" },
        ]
    },
    {
        id: "removal",
        title: "Data Removal",
        description: "Remove your personal info from data brokers.",
        items: [
            { id: "incogni", label: "Use a data removal service", description: "Automated removal from people-search sites.", actionLabel: "Check inCogni", actionUrl: "https://incogni.com" },
            { id: "manual-optout", label: "Manual opt-out of Whitepages", description: "Search yourself and request removal.", actionLabel: "Whitepages", actionUrl: "https://www.whitepages.com/suppression-requests" },
        ]
    }
];

// ============================================
// Components
// ============================================

function ScoreRing({ score }: { score: number }) {
    const circumference = 2 * Math.PI * 40; // r=40
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
                <circle
                    cx="48"
                    cy="48"
                    r="40"
                    className="stroke-muted fill-none"
                    strokeWidth="8"
                />
                <circle
                    cx="48"
                    cy="48"
                    r="40"
                    className={cn(
                        "fill-none transition-all duration-1000 ease-out",
                        score >= 80 ? "stroke-success" : score >= 50 ? "stroke-warning" : "stroke-danger"
                    )}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold">{score}%</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Safe</span>
            </div>
        </div>
    );
}

function ChecklistItemComponent({
    item,
    isChecked,
    onToggle,
}: {
    item: ChecklistItem;
    isChecked: boolean;
    onToggle: () => void;
}) {
    return (
        <div
            onClick={onToggle}
            className={cn(
                "group flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200",
                isChecked
                    ? "bg-accent/5 border-accent/20"
                    : "bg-card border-border hover:border-accent/40 hover:shadow-sm"
            )}
        >
            <div className={cn(
                "mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 shrink-0",
                isChecked ? "bg-accent border-accent" : "border-muted-foreground group-hover:border-accent"
            )}>
                {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>

            <div className="flex-1">
                <h4 className={cn(
                    "font-medium text-sm transition-colors",
                    isChecked ? "text-accent line-through opacity-70" : "text-foreground"
                )}>
                    {item.label}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-lg">
                    {item.description}
                </p>
                {item.actionLabel && item.actionUrl && (
                    <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                        <a
                            href={item.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                        >
                            {item.actionLabel} <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

function CategorySection({
    category,
    checkedItems,
    onToggle,
}: {
    category: Category;
    checkedItems: Set<string>;
    onToggle: (id: string, categoryId: string) => void;
}) {
    const completedCount = category.items.filter(i => checkedItems.has(i.id)).length;
    const isAllDone = completedCount === category.items.length;

    return (
        <div className="bg-card/50 border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        {category.title}
                        {isAllDone && <ShieldCheck className="w-5 h-5 text-success" />}
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
                <div className="text-xs font-medium px-3 py-1 bg-background rounded-full border border-border">
                    {completedCount} / {category.items.length} Done
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item) => (
                    <ChecklistItemComponent
                        key={item.id}
                        item={item}
                        isChecked={checkedItems.has(item.id)}
                        onToggle={() => onToggle(item.id, category.id)}
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================
// Main Footprint Page
// ============================================

export default function FootprintPage() {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    // Fetch initial state
    useEffect(() => {
        const fetchChecklist = async () => {
            try {
                const res = await fetch("/api/footprint");
                if (res.ok) {
                    const data = await res.json();
                    // data is array of { checkId, isChecked, category... }
                    const checkedIds = new Set<string>();
                    data.forEach((item: any) => {
                        if (item.isChecked) checkedIds.add(item.checkId);
                    });
                    setCheckedItems(checkedIds);
                }
            } catch (error) {
                console.error("Failed to load footprint data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchChecklist();
    }, []);

    const toggleItem = async (checkId: string, categoryId: string) => {
        // Optimistic update
        const wasChecked = checkedItems.has(checkId);

        setCheckedItems((prev) => {
            const next = new Set(prev);
            if (wasChecked) {
                next.delete(checkId);
            } else {
                next.add(checkId);
            }
            return next;
        });

        // Sync with DB
        try {
            const res = await fetch("/api/footprint", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    category: categoryId,
                    checkId,
                    isChecked: !wasChecked
                })
            });
            if (!res.ok) throw new Error("Failed to save");
        } catch (error) {
            console.error("Failed to sync footprint item", error);
            // Revert on failure
            setCheckedItems((prev) => {
                const next = new Set(prev);
                if (wasChecked) next.add(checkId);
                else next.delete(checkId);
                return next;
            });
        }
    };

    const totalItems = categories.reduce((acc, c) => acc + c.items.length, 0);
    const completedItems = checkedItems.size;
    const score = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
                <p className="text-muted-foreground">Loading your digital footprint score...</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <RevealOnScroll>
                <div className="mb-10 flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            {score >= 80 ? (
                                <ShieldCheck className="w-7 h-7 text-success" />
                            ) : (
                                <Shield className="w-7 h-7 text-warning" />
                            )}
                            Digital Footprint
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Secure your online presence. Check off each item to improve your score.
                        </p>
                    </div>
                    <ScoreRing score={score} />
                </div>
            </RevealOnScroll>

            {/* Categories */}
            <div className="space-y-6">
                {categories.map((category, i) => (
                    <RevealOnScroll key={category.id} delay={i * 0.1} width="100%">
                        <CategorySection
                            category={category}
                            checkedItems={checkedItems}
                            onToggle={toggleItem}
                        />
                    </RevealOnScroll>
                ))}
            </div>
        </div>
    );
}
