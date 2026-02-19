"use client";

import React from "react";
import Link from "next/link";
import { FileText, Globe, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black text-white border-t-4 border-black py-16 px-6 lg:px-12 w-full">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
                <div className="flex flex-col gap-6 max-w-sm">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center border-2 border-white p-1 bg-white text-black">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tighter">Resumate</h2>
                    </div>
                    <p className="text-sm font-mono text-gray-400">System architecture for professional advancement. Secure your next position with verified tools.</p>
                </div>
                <div className="flex flex-wrap gap-16">
                    <div className="flex flex-col gap-4">
                        <h4 className="font-black uppercase text-sm border-b border-white/30 pb-2 mb-2">Product</h4>
                        <Link className="text-sm font-bold uppercase hover:text-gray-400 hover:translate-x-1 transition-transform" href="#">Templates</Link>
                        <Link className="text-sm font-bold uppercase hover:text-gray-400 hover:translate-x-1 transition-transform" href="#">Cover Letter</Link>
                        <Link className="text-sm font-bold uppercase hover:text-gray-400 hover:translate-x-1 transition-transform" href="#">Features</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-black uppercase text-sm border-b border-white/30 pb-2 mb-2">Intel</h4>
                        <Link className="text-sm font-bold uppercase hover:text-gray-400 hover:translate-x-1 transition-transform" href="#">Blog</Link>
                        <Link className="text-sm font-bold uppercase hover:text-gray-400 hover:translate-x-1 transition-transform" href="#">Advice</Link>
                        <Link className="text-sm font-bold uppercase hover:text-gray-400 hover:translate-x-1 transition-transform" href="#">Examples</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="font-black uppercase text-sm border-b border-white/30 pb-2 mb-2">Corp</h4>
                        <Link className="text-sm font-bold uppercase hover:text-gray-400 hover:translate-x-1 transition-transform" href="#">About</Link>
                        <Link className="text-sm font-bold uppercase hover:text-gray-400 hover:translate-x-1 transition-transform" href="#">Contact</Link>
                        <Link className="text-sm font-bold uppercase hover:text-gray-400 hover:translate-x-1 transition-transform" href="#">Privacy</Link>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/20 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500 uppercase">
                <p>© 2026 Resumate Inc. All rights reserved.</p>
                <div className="flex gap-6">
                    <Link className="hover:text-white" href="#"><Globe className="w-5 h-5" /></Link>
                    <Link className="hover:text-white" href="#"><Mail className="w-5 h-5" /></Link>
                </div>
            </div>
        </footer>
    );
}
