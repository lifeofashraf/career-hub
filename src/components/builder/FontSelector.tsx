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
                            "relative flex items-center justify-between px-4 py-3 text-left transition-all border-2 border-black brutal-shadow-sm hover:brutal-shadow-hover active:brutal-shadow-active",
                            selected === font.id
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-neutral-50"
                        )}
                        style={{ fontFamily: font.family }}
                    >
                        <span className="text-sm font-bold">
                            {font.name}
                        </span>
                        {selected === font.id && (
                            <div className="bg-white border text-black rounded-full p-0.5 pointer-events-none">
                                <Check className="w-2.5 h-2.5" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
