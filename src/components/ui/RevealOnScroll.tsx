"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealOnScrollProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
}

export default function RevealOnScroll({
    children,
    width = "fit-content",
    className = "",
    delay = 0
}: RevealOnScrollProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 }); // Trigger every time, 30% visibility

    return (
        <div ref={ref} style={{ width, position: "relative", overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
}
