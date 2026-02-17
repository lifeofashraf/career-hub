"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ElementType, useMemo } from "react";

interface TextRevealProps {
    children: string;
    as?: ElementType;
    className?: string;
    delay?: number;
    staggerSpeed?: number;
    splitBy?: "char" | "word";
}

const charVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
};

export default function TextReveal({
    children,
    as: Tag = "span",
    className = "",
    delay = 0,
    staggerSpeed = 0.03,
    splitBy = "char",
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });

    const segments = useMemo(() => {
        if (splitBy === "word") {
            return children.split(" ").map((word, i, arr) => ({
                text: word + (i < arr.length - 1 ? "\u00A0" : ""),
                key: `w-${i}`,
            }));
        }
        return children.split("").map((char, i) => ({
            text: char === " " ? "\u00A0" : char,
            key: `c-${i}`,
        }));
    }, [children, splitBy]);

    return (
        <Tag ref={ref} className={className} aria-label={children}>
            <motion.span
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ staggerChildren: staggerSpeed, delayChildren: delay }}
                style={{ display: "inline-flex", flexWrap: "wrap" }}
                aria-hidden
            >
                {segments.map((segment) => (
                    <span
                        key={segment.key}
                        style={{
                            display: "inline-block",
                            overflow: "hidden",
                            verticalAlign: "top",
                        }}
                    >
                        <motion.span
                            variants={charVariants}
                            transition={{
                                duration: 0.5,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            style={{ display: "inline-block" }}
                        >
                            {segment.text}
                        </motion.span>
                    </span>
                ))}
            </motion.span>
        </Tag>
    );
}
