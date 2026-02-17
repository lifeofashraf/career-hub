import React from 'react';

const Footer = () => {
    return (
        <>
            <section className="py-24 px-4 text-center">
                <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 md:p-16 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-purple-500/20 blur-[100px] pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
                            Start Building <span className="text-gradient">Today</span>
                        </h2>
                        <button className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300">
                            Start Building Today
                        </button>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/5 bg-[#0a0e17] py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 opacity-50">
                        <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                        <span className="text-sm">© 2023 CareerForge. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a className="hover:text-white transition-colors" href="#">Privacy</a>
                        <a className="hover:text-white transition-colors" href="#">Terms</a>
                        <a className="hover:text-white transition-colors" href="#">Contact</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
