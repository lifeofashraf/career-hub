import React from 'react';

const Navbar = () => {
    return (
        <nav className="w-full fixed top-0 z-50 backdrop-blur-md bg-[#0a0e17]/80 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
                        <svg className="h-8 w-8 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                        <span className="text-white font-bold text-xl tracking-tight">CareerForge</span>
                    </div>
                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" href="#">Features</a>
                            <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors" href="#">How It Works</a>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <a className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all" href="/dashboard">
                            Dashboard
                        </a>
                        {/* User Avatar Placeholder */}
                        <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden border border-gray-600 cursor-pointer">
                            <svg className="w-10 h-10 rounded-full bg-gray-700 p-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path clipRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fillRule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    {/* Mobile menu button (Hamburger) */}
                    <div className="-mr-2 flex md:hidden">
                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none" type="button">
                            <span className="sr-only">Open main menu</span>
                            <svg aria-hidden="true" className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
