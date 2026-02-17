import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            id: "01",
            title: "Import or Create",
            description: "Upload your existing CV or start from scratch using our intelligent wizard.",
            icon: (
                <svg className="w-12 h-12 mb-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
            )
        },
        {
            id: "02",
            title: "Customize & Optimize",
            description: "Use AI suggestions to tailor your content for specific job descriptions.",
            icon: (
                <svg className="w-12 h-12 mb-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
            )
        },
        {
            id: "03",
            title: "Export & Apply",
            description: "Download your polished resume and track your application progress.",
            icon: (
                <svg className="w-12 h-12 mb-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
            )
        }
    ];

    return (
        <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        How It <span className="text-gradient">Works</span>
                    </h2>
                </div>
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -translate-y-12 z-0"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {steps.map((step) => (
                            <div key={step.id} className="relative flex flex-col items-center group">
                                <span className="absolute -top-12 text-9xl font-black text-white/[0.03] select-none z-[-1] transition-transform group-hover:scale-110 duration-500">
                                    {step.id}
                                </span>
                                {step.icon}
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 px-4">
                                    {step.description}
                                </p>
                                <a href={step.id === "01" ? "/builder" : "/dashboard"} className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/30 hover:border-purple-400 hover:from-purple-800 hover:to-purple-700 transition-all shadow-lg shadow-purple-900/20 text-center">
                                    {step.id === "01" ? "Start Building" : "Get Started"}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
