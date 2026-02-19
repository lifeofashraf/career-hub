
export const EXAMPLE_RESUME_DATA = {
    basics: {
        name: "Ashraf Mazlan",
        email: "ashraf@example.com",
        phone: "+60 12-345 6789",
        url: "www.linkedin.com/in/ashrafmazlan",
        location: "Kuala Lumpur, Malaysia",
        summary: "Full Stack Developer and Content Creator with a passion for building scalable web applications and automating workflows. Experienced in Next.js, React, and cloud infrastructure. Currently growing a faceless YouTube channel focused on tech and finance.",
        headline: "Full Stack Developer | Content Creator",
    },
    work: [
        {
            company: "TechCorp Solutions",
            position: "Senior Frontend Engineer",
            startDate: "2023-01",
            endDate: "Present",
            location: "Remote",
            summary: "Leading the frontend migration to Next.js and improving vital web vitals.",
            highlights: [
                "Refactored legacy React code to Next.js 14, improving load times by 40%.",
                "Implemented a custom design system using Tailwind CSS and Radix UI.",
                "Mentored junior developers and established code quality standards."
            ]
        },
        {
            company: "Creative Digital Agency",
            position: "Web Developer",
            startDate: "2021-06",
            endDate: "2022-12",
            location: "Kuala Lumpur",
            summary: "Developed marketing websites for high-profile clients.",
            highlights: [
                "Built responsive landing pages converting at 5% above industry average.",
                "Integrated headless CMS solutions (Sanity, Strapi) for content management.",
                "Automated deployment pipelines using Vercel and GitHub Actions."
            ]
        }
    ],
    education: [
        {
            institution: "University of Malaya",
            area: "Computer Science",
            studyType: "Bachelor's Degree",
            startDate: "2018",
            endDate: "2021",
            score: "3.8 CGPA"
        }
    ],
    skills: [
        {
            name: "Frontend",
            keywords: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
        },
        {
            name: "Backend",
            keywords: ["Node.js", "PostgreSQL", "Prisma", "Supabase", "Firebase"]
        },
        {
            name: "Tools",
            keywords: ["Git", "Docker", "Figma", "Vercel", "Stripe API"]
        }
    ],
    projects: [
        {
            name: "Resumate.ai",
            description: "AI-powered resume builder with LaTeX export.",
            url: "https://resumate.ai",
            highlights: [
                "Built with Next.js App Router, Clerk Auth, and Postgres.",
                "Integrated Gemini AI for resume optimization and content generation.",
                "Implemented real-time PDF preview using LaTeX to PDF conversion."
            ]
        },
        {
            name: "Finance Tracker",
            description: "Personal finance dashboard for tracking multi-currency assets.",
            url: "https://finance-tracker.demo",
            highlights: [
                "Real-time currency conversion using OpenExchangeRates API.",
                "Visualized spending data with Recharts.",
                "Secure data storage with Row Level Security (RLS)."
            ]
        }
    ]
};

export const EMPTY_RESUME_DATA = {
    basics: {
        name: "",
        email: "",
        phone: "",
        url: "",
        location: "",
        summary: "",
        headline: "",
    },
    work: [],
    education: [],
    skills: [],
    projects: []
};
