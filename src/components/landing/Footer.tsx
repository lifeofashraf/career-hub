import { Github, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const footerLinks = {
    Product: [
        { label: "Resume Builder", href: "/builder" },
        { label: "Job Tracker", href: "/tracker" },
        { label: "Digital Footprint", href: "/footprint" },
    ],
    Company: [
        { label: "About", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
    ],
    Resources: [
        { label: "Blog", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Contact", href: "#" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative border-t-2 border-border py-20 w-full flex flex-col items-center">
            <div className="w-full max-w-6xl mx-auto px-8 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4 group">
                            <div className="bg-black p-1.5 border-2 border-black group-hover:bg-white group-hover:text-black transition-colors">
                                <Sparkles className="w-3.5 h-3.5 text-white group-hover:text-black" />
                            </div>
                            <span className="text-xl font-black uppercase tracking-tight text-black">
                                CareerForge
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            Free, privacy-first career tools. No tracking, no ads, just value.
                        </p>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors neo-badge bg-card"
                        >
                            <Github className="w-3.5 h-3.5" />
                            Open Source
                        </a>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all inline-block"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t-2 border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} CareerForge. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        Built with <Heart className="w-3.5 h-3.5 text-neo-coral" /> for job seekers
                    </p>
                </div>
            </div>
        </footer>
    );
}
