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
                <h3 className="text-lg font-semibold text-foreground mb-1">Choose Template</h3>
                <p className="text-sm text-muted-foreground">
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
                            "glass-card relative w-full text-left p-6 transition-all duration-300 group border border-transparent",
                            selected === template.id
                                ? "bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                                : "hover:bg-white/5 hover:border-white/10"
                        )}
                    >
                        {/* Selected indicator */}
                        {selected === template.id && (
                            <div className="absolute top-4 right-4 p-1.5 bg-primary rounded-full shadow-lg shadow-primary/40 animate-pulse-soft">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                        )}

                        <div className="flex items-start gap-5">
                            {/* Template icon */}
                            <div
                                className={cn(
                                    "p-3 rounded-2xl border transition-colors shrink-0",
                                    selected === template.id
                                        ? "bg-primary/20 border-primary/30 text-primary"
                                        : "bg-white/5 border-white/10 text-muted-foreground group-hover:text-foreground group-hover:border-white/20"
                                )}
                            >
                                {templateIcons[template.id]}
                            </div>

                            {/* Template info */}
                            <div className="flex-1 min-w-0 pt-1">
                                <h4 className={cn(
                                    "font-semibold mb-1.5 text-lg transition-colors",
                                    selected === template.id ? "text-primary text-glow" : "text-foreground"
                                )}>
                                    {template.name}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    {template.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {template.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={cn(
                                                "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-colors",
                                                selected === template.id
                                                    ? "bg-primary/10 border-primary/20 text-primary"
                                                    : "bg-white/5 border-white/10 text-muted-foreground group-hover:border-white/20"
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
