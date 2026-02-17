"use client";

import { Check, Type } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const FONTS = [
    { id: "Inter", name: "Inter", type: "Sans", family: "'Inter', sans-serif" },
    { id: "Roboto", name: "Roboto", type: "Sans", family: "'Roboto', sans-serif" },
    { id: "Open Sans", name: "Open Sans", type: "Sans", family: "'Open Sans', sans-serif" },
    { id: "Lato", name: "Lato", type: "Sans", family: "'Lato', sans-serif" },
    { id: "Merriweather", name: "Merriweather", type: "Serif", family: "'Merriweather', serif" },
    { id: "Playfair Display", name: "Playfair", type: "Serif", family: "'Playfair Display', serif" },
    { id: "Times New Roman", name: "Classic", type: "Serif", family: "'Times New Roman', serif" },
];

interface FontSelectorProps {
    selected: string;
    onSelect: (font: string) => void;
}

export default function FontSelector({ selected, onSelect }: FontSelectorProps) {
    return (
        <div className="space-y-3">
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                    <Type className="w-4 h-4" /> Typography
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {FONTS.map((font) => (
                    <button
                        key={font.id}
                        onClick={() => onSelect(font.id)}
                        className={cn(
                            "glass-card relative flex items-center justify-between px-4 py-3 text-left transition-all border border-transparent",
                            selected === font.id
                                ? "bg-primary/20 border-primary/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                                : "hover:bg-white/5 hover:border-white/10 text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <span className="text-sm" style={{ fontFamily: font.family }}>
                            {font.name}
                        </span>
                        {selected === font.id && (
                            <div className="bg-primary rounded-full p-0.5 shadow-lg shadow-primary/50">
                                <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
