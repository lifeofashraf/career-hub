import { JAKES_RESUME_TEMPLATE } from "./latex-templates";

// Helper to escape special LaTeX characters
function escapeLatex(str: string | undefined): string {
    if (!str) return "";
    return str
        .replace(/\\/g, "\\textbackslash{}")
        .replace(/([&%$#_{}])/g, "\\$1")
        .replace(/~/g, "\\textasciitilde{}")
        .replace(/\^/g, "\\textasciicircum{}");
}

export function generateLatex(resumeData: any): string {
    const data = resumeData || {};
    const basics = data.basics || {};

    // --- 1. Header (Basics) ---
    let latex = JAKES_RESUME_TEMPLATE
        .replace("{{NAME}}", escapeLatex(basics.name))
        .replace("{{PHONE}}", escapeLatex(basics.phone))
        .replace("{{EMAIL}}", escapeLatex(basics.email))
        .replace(/{{LINKEDIN}}/g, escapeLatex(basics.url)) // Assuming url is linkedin for now or generic
        .replace("{{LINKEDIN_USER}}", "User") // Placeholder, robust parser needed for username extraction
        .replace(/{{GITHUB}}/g, "github.com") // Placeholder
        .replace("{{GITHUB_USER}}", "User");   // Placeholder


    // --- 2. Education ---
    let educationLatex = "";
    if (data.education && Array.isArray(data.education)) {
        data.education.forEach((edu: any) => {
            educationLatex += `
    \\resumeSubheading
      {${escapeLatex(edu.institution)}}{${escapeLatex(edu.location || "")}}
      {${escapeLatex(edu.studyType)} in ${escapeLatex(edu.area)}}{${escapeLatex(edu.startDate)} -- ${escapeLatex(edu.endDate)}}
`;
        });
    }
    latex = latex.replace("{{EDUCATION_SECTION}}", educationLatex);


    // --- 3. Experience ---
    let experienceLatex = "";
    if (data.work && Array.isArray(data.work)) {
        data.work.forEach((job: any) => {
            let highlights = "";
            if (job.highlights && Array.isArray(job.highlights)) {
                highlights = "\\resumeItemListStart\n";
                job.highlights.forEach((point: string) => {
                    highlights += `        \\resumeItem{${escapeLatex(point)}}\n`;
                });
                highlights += "      \\resumeItemListEnd";
            }

            experienceLatex += `
    \\resumeSubheading
      {${escapeLatex(job.position)}}{${escapeLatex(job.startDate)} -- ${escapeLatex(job.endDate)}}
      {${escapeLatex(job.company)}}{${escapeLatex(job.location || "")}}
      ${highlights}
`;
        });
    }
    latex = latex.replace("{{EXPERIENCE_SECTION}}", experienceLatex);


    // --- 4. Projects ---
    let projectsLatex = "";
    if (data.projects && Array.isArray(data.projects)) {
        data.projects.forEach((proj: any) => {
            let highlights = "";
            if (proj.highlights && Array.isArray(proj.highlights)) {
                highlights = "\\resumeItemListStart\n";
                proj.highlights.forEach((point: string) => {
                    highlights += `        \\resumeItem{${escapeLatex(point)}}\n`;
                });
                highlights += "      \\resumeItemListEnd";
            }

            // Project formatting slightly different in Jake's template
            projectsLatex += `
    \\resumeProjectHeading
      {\\textbf{${escapeLatex(proj.name)}} $|$ \\emph{${escapeLatex(proj.description || "")}}}{${escapeLatex(proj.startDate || "")} -- ${escapeLatex(proj.endDate || "")}}
      ${highlights}
`;
        });
    }
    latex = latex.replace("{{PROJECTS_SECTION}}", projectsLatex);


    // --- 5. Skills ---
    let skillsLatex = "";
    if (data.skills && Array.isArray(data.skills)) {
        data.skills.forEach((cat: any) => {
            const keywords = Array.isArray(cat.keywords) ? cat.keywords.map(escapeLatex).join(", ") : "";
            skillsLatex += `\\textbf{${escapeLatex(cat.name)}}{: ${keywords}} \\\\ \n`;
        });
    }
    latex = latex.replace("{{SKILLS_SECTION}}", skillsLatex);

    return latex;
}

export async function compileLatexToPdf(latexCode: string): Promise<ArrayBuffer> {
    // using latexonline.cc public API
    // Switched to POST to avoid "Request-URI Too Large" error
    const url = "https://latexonline.cc/compile";

    console.log("[LATEX_COMPILE] Sending POST request to latexonline.cc...");

    const params = new URLSearchParams();
    params.append("text", latexCode);

    const response = await fetch(url, {
        method: "POST",
        body: params,
    });

    if (!response.ok) {
        const err = await response.text();
        console.error("[LATEX_COMPILE] Error:", err);
        throw new Error(`LaTeX Compilation Failed: ${response.statusText}`);
    }

    return await response.arrayBuffer();
}
