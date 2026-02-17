import React from 'react';

const Features = () => {
    const features = [
        {
            id: "01",
            title: "Resume Builder",
            description: "Create ATS-friendly resumes in minutes with our drag-and-drop editor tailored for modern job markets.",
            icon: (
                <svg className="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                </svg>
            ),
            bgIcon: "bg-purple-500/10",
            borderIcon: "border-purple-500/20"
        },
        {
            id: "02",
            title: "Job Tracker",
            description: "Keep track of every application, interview, and offer in one centralized dashboard. Never miss a follow-up.",
            icon: (
                <svg className="h-8 w-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                </svg>
            ),
            bgIcon: "bg-pink-500/10",
            borderIcon: "border-pink-500/20"
        },
        {
            id: "03",
            title: "Digital Footprint",
            description: "Analyze and optimize your online presence to ensure you look your best when recruiters Google you.",
            icon: (
                <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                </svg>
            ),
            bgIcon: "bg-blue-500/10",
            borderIcon: "border-blue-500/20"
        },
        {
            id: "04",
            title: "Resume Parser",
            description: "Automatically extract data from your existing documents to populate your profile instantly.",
            icon: (
                <svg className="h-8 w-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                </svg>
            ),
            bgIcon: "bg-indigo-500/10",
            borderIcon: "border-indigo-500/20"
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    Everything <span className="text-gradient">You Need</span>
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
                    Comprehensive tools to forge your career path with precision and style.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {features.map((feature) => (
                    <a
                        key={feature.id}
                        href={feature.id === "01" || feature.id === "04" ? "/builder" : "/dashboard"}
                        className="glass-card rounded-2xl p-8 relative overflow-hidden group block cursor-pointer transition-all duration-300"
                    >
                        <span className="absolute top-4 left-6 text-6xl font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors">
                            {feature.id}
                        </span>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="mb-6">
                                <div className={`h-14 w-14 rounded-xl ${feature.bgIcon} flex items-center justify-center border ${feature.borderIcon} mb-4 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Features;
