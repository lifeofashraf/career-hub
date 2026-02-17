import { ResumeData } from "@/stores/resumeStore";

// ============================================================
// Helper: Escape LaTeX special characters
// ============================================================

function esc(text: string | undefined | null): string {
    if (!text) return "";
    return text
        .replace(/\\/g, "\\textbackslash{}")
        .replace(/&/g, "\\&")
        .replace(/%/g, "\\%")
        .replace(/\$/g, "\\$")
        .replace(/#/g, "\\#")
        .replace(/_/g, "\\_")
        .replace(/\{/g, "\\{")
        .replace(/\}/g, "\\}")
        .replace(/~/g, "\\textasciitilde{}")
        .replace(/\^/g, "\\textasciicircum{}");
}

// ============================================================
// Template metadata for the selector UI
// ============================================================

export interface TemplateInfo {
    id: string;
    name: string;
    description: string;
    tags: string[];
}

export const TEMPLATES: TemplateInfo[] = [
    {
        id: "jake",
        name: "Jake's Resume",
        description: "Clean single-column layout. Highest ATS compatibility. Industry standard for tech/SWE roles.",
        tags: ["ATS-Friendly", "Single Column", "Minimalist"],
    },
    {
        id: "deedy",
        name: "Deedy CV",
        description: "Compact two-column design. Great for experienced professionals with dense content.",
        tags: ["Two Column", "Compact", "Professional"],
    },
    {
        id: "awesome",
        name: "Awesome CV",
        description: "Modern typography with color accents. Stands out while remaining recruiter-friendly.",
        tags: ["Modern", "Color Accents", "Creative"],
    },
];

// ============================================================
// 1. JAKE'S RESUME — Clean single-column, ATS-optimized
//    Based on: https://github.com/jakegut/resume
// ============================================================

export function generateJakeResume(data: ResumeData): string {
    const b = data.basics;

    // Build contact line
    const contactParts: string[] = [];
    if (b.phone) contactParts.push(`\\small ${esc(b.phone)}`);
    if (b.email) contactParts.push(`\\href{mailto:${esc(b.email)}}{\\underline{${esc(b.email)}}}`);
    if (b.url) contactParts.push(`\\href{${esc(b.url)}}{\\underline{${esc(b.url)}}}`);
    if (b.location) contactParts.push(`\\small ${esc(b.location)}`);
    const contactLine = contactParts.join(" $|$ ");

    // Work experience
    const workEntries = (data.work || [])
        .map((w) => {
            const highlights = (w.highlights || [])
                .map((h) => `          \\resumeItem{${esc(h)}}`)
                .join("\n");
            const desc = w.summary
                ? `          \\resumeItem{${esc(w.summary)}}`
                : "";
            const items = [desc, highlights].filter(Boolean).join("\n");
            return `      \\resumeSubheading
        {${esc(w.position)}}{${esc(w.startDate)} -- ${esc(w.endDate || "Present")}}
        {${esc(w.company)}}{}
        \\resumeItemListStart
${items}
        \\resumeItemListEnd`;
        })
        .join("\n\n");

    // Education
    const eduEntries = (data.education || [])
        .map(
            (e) => `      \\resumeSubheading
        {${esc(e.institution)}}{${esc(e.startDate)} -- ${esc(e.endDate || "Present")}}
        {${esc(e.studyType)}${e.area ? ` in ${esc(e.area)}` : ""}}{${e.score ? `GPA: ${esc(e.score)}` : ""}}`
        )
        .join("\n\n");

    // Skills
    const skillLine = (data.skills || []).map((s) => esc(s.name)).join(", ");

    // Projects
    const projEntries = (data.projects || [])
        .map((p) => {
            const nameUrl = p.url
                ? `\\textbf{${esc(p.name)}} $|$ \\emph{\\small\\href{${esc(p.url)}}{Link}}`
                : `\\textbf{${esc(p.name)}}`;
            return `      \\resumeProjectHeading
          {${nameUrl}}{}
          \\resumeItemListStart
            \\resumeItem{${esc(p.description)}}
          \\resumeItemListEnd`;
        })
        .join("\n\n");

    return `%-------------------------
% Jake's Resume - LaTeX Template
% Based on: https://github.com/jakegut/resume
% License: MIT
%-------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Custom commands
\\newcommand{\\resumeItem}[1]{\\item\\small{#1 \\vspace{-2pt}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${esc(b.name || "Your Name")}} \\\\ \\vspace{1pt}
    ${contactLine}
\\end{center}

${b.summary ? `%-----------SUMMARY-----------
\\section{Summary}
  ${esc(b.summary)}
` : ""}
${data.education?.length ? `%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
${eduEntries}
  \\resumeSubHeadingListEnd
` : ""}
${data.work?.length ? `%-----------EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
${workEntries}
  \\resumeSubHeadingListEnd
` : ""}
${data.projects?.length ? `%-----------PROJECTS-----------
\\section{Projects}
  \\resumeSubHeadingListStart
${projEntries}
  \\resumeSubHeadingListEnd
` : ""}
${data.skills?.length ? `%-----------SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Skills}{: ${skillLine}}
    }}
 \\end{itemize}
` : ""}

\\end{document}
`;
}

// ============================================================
// 2. DEEDY CV — Two-column, compact
//    Inspired by: https://github.com/deedy/Deedy-Resume
// ============================================================

export function generateDeedyResume(data: ResumeData): string {
    const b = data.basics;

    const workEntries = (data.work || [])
        .map(
            (w) => `\\runsubsection{${esc(w.company)}}
\\descript{| ${esc(w.position)}}
\\location{${esc(w.startDate)} - ${esc(w.endDate || "Present")}}
\\vspace{\\topsep}
\\begin{tightemize}
${w.summary ? `\\item ${esc(w.summary)}` : ""}
${(w.highlights || []).map((h) => `\\item ${esc(h)}`).join("\n")}
\\end{tightemize}
\\sectionsep`
        )
        .join("\n\n");

    const eduEntries = (data.education || [])
        .map(
            (e) => `\\subsection{${esc(e.institution)}}
\\descript{${esc(e.studyType)}${e.area ? ` in ${esc(e.area)}` : ""}}
\\location{${esc(e.startDate)} - ${esc(e.endDate || "Present")}${e.score ? ` | GPA: ${esc(e.score)}` : ""}}
\\sectionsep`
        )
        .join("\n\n");

    const skillLine = (data.skills || []).map((s) => esc(s.name)).join(" \\textbullet{} ");

    const projEntries = (data.projects || [])
        .map(
            (p) => `\\runsubsection{${esc(p.name)}}
${p.url ? `\\descript{| \\href{${esc(p.url)}}{Link}}` : ""}
\\begin{tightemize}
\\item ${esc(p.description)}
\\end{tightemize}
\\sectionsep`
        )
        .join("\n\n");

    return `%-------------------------
% Deedy CV - LaTeX Template
% Inspired by: https://github.com/deedy/Deedy-Resume
% License: MIT
%-------------------------

\\documentclass[letterpaper]{deedy-resume}
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}

\\begin{document}

%----------HEADING----------
\\namesection{${esc(b.name?.split(" ")[0] || "First")}}{${esc(b.name?.split(" ").slice(1).join(" ") || "Last")}}{
${b.url ? `\\urlstyle{same}\\href{${esc(b.url)}}{${esc(b.url)}} | ` : ""}${b.email ? `\\href{mailto:${esc(b.email)}}{${esc(b.email)}}` : ""}${b.phone ? ` | ${esc(b.phone)}` : ""}
}

%----------LEFT COLUMN----------
\\begin{minipage}[t]{0.33\\textwidth}

\\section{Education}
${eduEntries}

\\section{Skills}
${skillLine}
\\sectionsep

${b.location ? `\\section{Location}
${esc(b.location)}
\\sectionsep` : ""}

\\end{minipage}
\\hfill
%----------RIGHT COLUMN----------
\\begin{minipage}[t]{0.66\\textwidth}

${b.summary ? `\\section{Summary}
${esc(b.summary)}
\\sectionsep` : ""}

\\section{Experience}
${workEntries}

${data.projects?.length ? `\\section{Projects}
${projEntries}` : ""}

\\end{minipage}
\\end{document}
`;
}

// ============================================================
// 3. AWESOME CV — Modern, color-accented
//    Inspired by: https://github.com/posquit0/Awesome-CV
// ============================================================

export function generateAwesomeResume(data: ResumeData): string {
    const b = data.basics;

    const workEntries = (data.work || [])
        .map(
            (w) => `  \\cventry
    {${esc(w.position)}}
    {${esc(w.company)}}
    {}
    {${esc(w.startDate)} - ${esc(w.endDate || "Present")}}
    {
      \\begin{cvitems}
${w.summary ? `        \\item{${esc(w.summary)}}` : ""}
${(w.highlights || []).map((h) => `        \\item{${esc(h)}}`).join("\n")}
      \\end{cvitems}
    }`
        )
        .join("\n\n");

    const eduEntries = (data.education || [])
        .map(
            (e) => `  \\cventry
    {${esc(e.studyType)}${e.area ? ` in ${esc(e.area)}` : ""}}
    {${esc(e.institution)}}
    {}
    {${esc(e.startDate)} - ${esc(e.endDate || "Present")}}
    {${e.score ? `GPA: ${esc(e.score)}` : ""}}`
        )
        .join("\n\n");

    const skillLine = (data.skills || []).map((s) => esc(s.name)).join(", ");

    const projEntries = (data.projects || [])
        .map(
            (p) => `  \\cventry
    {${esc(p.description)}}
    {${esc(p.name)}}
    {${p.url ? `\\href{${esc(p.url)}}{Link}` : ""}}
    {}
    {}`
        )
        .join("\n\n");

    return `%-------------------------
% Awesome CV - LaTeX Template
% Inspired by: https://github.com/posquit0/Awesome-CV
% License: MIT
%-------------------------

\\documentclass[11pt, a4paper]{awesome-cv}

% Configure colors
\\colorlet{awesome}{awesome-emerald}

% Personal Information
\\name{${esc(b.name?.split(" ")[0] || "First")}}{${esc(b.name?.split(" ").slice(1).join(" ") || "Last")}}
${b.headline ? `\\position{${esc(b.headline)}}` : ""}
${b.location ? `\\address{${esc(b.location)}}` : ""}
${b.phone ? `\\mobile{${esc(b.phone)}}` : ""}
${b.email ? `\\email{${esc(b.email)}}` : ""}
${b.url ? `\\homepage{${esc(b.url)}}` : ""}

\\begin{document}

\\makecvheader

${b.summary ? `\\cvsection{Summary}
\\begin{cvparagraph}
${esc(b.summary)}
\\end{cvparagraph}` : ""}

${data.work?.length ? `\\cvsection{Experience}
\\begin{cventries}
${workEntries}
\\end{cventries}` : ""}

${data.education?.length ? `\\cvsection{Education}
\\begin{cventries}
${eduEntries}
\\end{cventries}` : ""}

${data.skills?.length ? `\\cvsection{Skills}
\\begin{cvskills}
  \\cvskill{Technical}{${skillLine}}
\\end{cvskills}` : ""}

${data.projects?.length ? `\\cvsection{Projects}
\\begin{cventries}
${projEntries}
\\end{cventries}` : ""}

\\end{document}
`;
}

// ============================================================
// Generator map
// ============================================================

export const templateGenerators: Record<string, (data: ResumeData) => string> = {
    jake: generateJakeResume,
    deedy: generateDeedyResume,
    awesome: generateAwesomeResume,
};

export function generateLatex(templateId: string, data: ResumeData): string {
    const generator = templateGenerators[templateId] || generateJakeResume;
    return generator(data);
}
