"use client";

import { motion } from "framer-motion";
import { Check, FileText, Columns2, Palette } from "lucide-react";
import { TEMPLATES, type TemplateInfo } from "@/lib/latexTemplates";
import { cn } from "@/lib/utils";

const templateIcons: Record<string, React.ReactNode> = {
    jake: <FileText className="w-8 h-8" />,
    deedy: <Columns2 className="w-8 h-8" />,
    awesome: <Palette className="w-8 h-8" />,
};

interface TemplateSelectorProps {
    selected: string;
    onSelect: (templateId: string) => void;
}

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-black mb-1">Choose Template</h3>
                <p className="text-sm text-neutral-600">
                    All templates are ATS-friendly and optimized for job applications.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {TEMPLATES.map((template, index) => (
                    <motion.button
                        key={template.id}
                        onClick={() => onSelect(template.id)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                            "w-full text-left p-6 transition-all duration-200 group border-2 border-black relative brutal-shadow hover:brutal-shadow-hover active:brutal-shadow-active",
                            selected === template.id
                                ? "bg-black text-white"
                                : "bg-white text-black hover:bg-neutral-50"
                        )}
                    >
                        {/* Selected indicator */}
                        {selected === template.id && (
                            <div className="absolute top-4 right-4 p-1 bg-white border-2 border-black">
                                <Check className="w-4 h-4 text-black" />
                            </div>
                        )}

                        <div className="flex items-start gap-5">
                            {/* Template icon */}
                            <div
                                className={cn(
                                    "p-2 border-2 border-black shrink-0",
                                    selected === template.id
                                        ? "bg-white text-black"
                                        : "bg-neutral-100 text-black group-hover:bg-white"
                                )}
                            >
                                {templateIcons[template.id]}
                            </div>

                            {/* Template info */}
                            <div className="flex-1 min-w-0 pt-1">
                                <h4 className="font-black uppercase text-lg mb-1 tracking-tight font-sans">
                                    {template.name}
                                </h4>
                                <p className={cn(
                                    "text-sm leading-relaxed mb-4 font-mono",
                                    selected === template.id ? "text-neutral-300" : "text-neutral-600"
                                )}>
                                    {template.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {template.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={cn(
                                                "px-2 py-1 text-[10px] font-bold uppercase tracking-wider border-2 border-black font-mono",
                                                selected === template.id
                                                    ? "bg-white text-black"
                                                    : "bg-neutral-100 text-black"
                                            )}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
