"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Trash2, GripVertical, User, Briefcase, GraduationCap, Wrench, FolderOpen, Save, Loader2, CheckCircle, Sparkles, ExternalLink, Download, Layout } from "lucide-react";
import { useResumeStore, ResumeBasics, WorkExperience, Education, Skill, Project } from "@/stores/resumeStore";
import { cn } from "@/lib/utils";
import OptimizeButton from "@/components/builder/OptimizeButton";
import TemplateSelector from "@/components/builder/TemplateSelector";
import { generateLatex } from "@/lib/latexTemplates";
import MagicImproveButton from "@/components/builder/MagicImproveButton";
import FontSelector, { FONTS } from "@/components/builder/FontSelector";

// ============================================
// Section Navigation
// ============================================

const sections = [
    { id: "basics", label: "Personal Info", icon: User },
    { id: "work", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "template", label: "Template", icon: Layout },
];

function InputField({
    label,
    value,
    onChange,
    type = "text",
    multiline = false,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    multiline?: boolean;
}) {
    const baseClasses =
        "w-full px-5 py-3 glass-input text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-inner text-sm";

    return (
        <div className="group">
            <label className="block text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-widest transition-colors group-focus-within:text-primary">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(baseClasses, "min-h-[120px] resize-y leading-relaxed")}
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={baseClasses}
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
            )}
        </div>
    );
}

// ============================================
// Pro Tip Component
// ============================================

function ProTip({ title, description, actionUrl, actionLabel }: { title: string, description: string, actionUrl: string, actionLabel: string }) {
    return (
        <div className="mt-6 p-5 bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 rounded-xl relative overflow-hidden group hover:border-violet-500/30 transition-all">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles className="w-20 h-20 text-violet-500 -rotate-12" />
            </div>
            <div className="relative z-10 flex items-start gap-3">
                <div className="p-2 bg-violet-500/20 rounded-lg shrink-0">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                    <h4 className="text-sm font-semibold text-violet-300 mb-1">
                        {title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed max-w-md">
                        {description}
                    </p>
                    <a
                        href={actionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-violet-600 hover:bg-violet-500 px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-violet-500/20"
                    >
                        {actionLabel} <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    )
}

// ============================================
// Basics Section
// ============================================

function BasicsForm() {
    const { data, updateBasics } = useResumeStore();
    // Helper to safely get value
    const getValue = (val: string | undefined) => val || "";

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Full Name" value={getValue(data.basics.name)} onChange={(v) => updateBasics("name", v)} />
                <InputField label="Headline" value={getValue(data.basics.headline)} onChange={(v) => updateBasics("headline", v)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Email" value={getValue(data.basics.email)} onChange={(v) => updateBasics("email", v)} type="email" />
                <InputField label="Phone" value={getValue(data.basics.phone)} onChange={(v) => updateBasics("phone", v)} type="tel" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Location" value={getValue(data.basics.location)} onChange={(v) => updateBasics("location", v)} />
                <InputField label="Website" value={getValue(data.basics.url)} onChange={(v) => updateBasics("url", v)} type="url" />
            </div>
            <InputField label="Professional Summary" value={getValue(data.basics.summary)} onChange={(v) => updateBasics("summary", v)} multiline />

            {data.basics.summary && data.basics.summary.length > 10 && (
                <div className="glass-card p-4">
// OptimizeButton removed

                </div>
            )}

            <ProTip
                title="Fix typos instantly"
                description="Recruiters toss resumes with typos. Use Grammarly to catch errors and improve clarity."
                actionUrl="https://grammarly.com" // Placeholder
                actionLabel="Get Grammarly Free"
            />
        </div>
    );
}

// ============================================
// Work Section
// ============================================

function WorkSection() {
    const { data, addWorkExperience, updateWorkExperience, removeWorkExperience } = useResumeStore();

    return (
        <div className="space-y-4">
            {data.work?.map((exp) => (
                <div key={exp.id} className="p-5 glass-card space-y-4 transition-all hover:bg-white/5">
                    <div className="flex items-center justify-between">
                        <GripVertical className="w-4 h-4 text-muted cursor-grab" />
                        <div className="flex items-center gap-2">
                            {/* OptimizeButton removed */}
                            <button onClick={() => removeWorkExperience(exp.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-rose-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Company" value={exp.company || ""} onChange={(v) => updateWorkExperience(exp.id, "company", v)} />
                        <InputField label="Position" value={exp.position || ""} onChange={(v) => updateWorkExperience(exp.id, "position", v)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Start Date" value={exp.startDate || ""} onChange={(v) => updateWorkExperience(exp.id, "startDate", v)} />
                        <InputField label="End Date" value={exp.endDate || ""} onChange={(v) => updateWorkExperience(exp.id, "endDate", v)} />
                    </div>
                    <InputField label="Description" value={exp.summary || ""} onChange={(v) => updateWorkExperience(exp.id, "summary", v)} multiline />
                </div>
            ))}
            <button
                onClick={addWorkExperience}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 glass-btn"
            >
                <Plus className="w-4 h-4" /> Add Experience
            </button>
        </div>
    );
}

// ============================================
// Education Section
// ============================================

function EducationSection() {
    const { data, addEducation, updateEducation, removeEducation } = useResumeStore();

    return (
        <div className="space-y-4">
            {data.education?.map((edu) => (
                <div key={edu.id} className="p-5 glass-card space-y-4 transition-all hover:bg-white/5">
                    <div className="flex items-center justify-between">
                        <GripVertical className="w-4 h-4 text-muted cursor-grab" />
                        <button onClick={() => removeEducation(edu.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-rose-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Institution" value={edu.institution || ""} onChange={(v) => updateEducation(edu.id, "institution", v)} />
                        <InputField label="Field of Study" value={edu.area || ""} onChange={(v) => updateEducation(edu.id, "area", v)} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <InputField label="Degree" value={edu.studyType || ""} onChange={(v) => updateEducation(edu.id, "studyType", v)} />
                        <InputField label="Start Date" value={edu.startDate || ""} onChange={(v) => updateEducation(edu.id, "startDate", v)} />
                        <InputField label="End Date" value={edu.endDate || ""} onChange={(v) => updateEducation(edu.id, "endDate", v)} />
                    </div>
                </div>
            ))}
            <button
                onClick={addEducation}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 glass-btn"
            >
                <Plus className="w-4 h-4" /> Add Education
            </button>
        </div>
    );
}

// ============================================
// Skills Section
// ============================================

function SkillsSection() {
    const { data, addSkill, updateSkill, removeSkill } = useResumeStore();

    return (
        <div className="space-y-4">
            {data.skills?.map((skill) => (
                <div key={skill.id} className="p-3 glass-card flex items-center gap-3 transition-all hover:bg-white/5">
                    <GripVertical className="w-4 h-4 text-muted cursor-grab flex-shrink-0" />
                    <input
                        value={skill.name || ""}
                        onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                        className="flex-1 px-3 py-2 bg-transparent border border-white/10 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Skill name..."
                    />
                    <select
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                        className="px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Expert</option>
                    </select>
                    <button onClick={() => removeSkill(skill.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-rose-400 transition-colors flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ))}
            <button
                onClick={addSkill}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 glass-btn"
            >
                <Plus className="w-4 h-4" /> Add Skill
            </button>
        </div>
    );
}

// ============================================
// Projects Section
// ============================================

function ProjectsSection() {
    const { data, addProject, updateProject, removeProject } = useResumeStore();

    return (
        <div className="space-y-4">
            {data.projects?.map((proj) => (
                <div key={proj.id} className="p-5 glass-card space-y-4 transition-all hover:bg-white/5">
                    <div className="flex items-center justify-between">
                        <GripVertical className="w-4 h-4 text-muted cursor-grab" />
                        <button onClick={() => removeProject(proj.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-rose-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField label="Project Name" value={proj.name || ""} onChange={(v) => updateProject(proj.id, "name", v)} />
                        <InputField label="URL" value={proj.url || ""} onChange={(v) => updateProject(proj.id, "url", v)} type="url" />
                    </div>
                    <InputField label="Description" value={proj.description || ""} onChange={(v) => updateProject(proj.id, "description", v)} multiline />
                </div>
            ))}
            <button
                onClick={addProject}
                className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 glass-btn"
            >
                <Plus className="w-4 h-4" /> Add Project
            </button>
        </div>
    );
}

// ============================================
// Template Section
// ============================================

function TemplateSection() {
    const { metadata, updateMetadata } = useResumeStore();

    return (
        <div className="space-y-8">
            <TemplateSelector
                selected={metadata.template || "jake"}
                onSelect={(templateId) => updateMetadata("template", templateId)}
            />
            <div className="border-t border-white/10 pt-8">
                <FontSelector
                    selected={metadata.fontFamily || "Inter"}
                    onSelect={(fontId) => updateMetadata("fontFamily", fontId)}
                />
            </div>
        </div>
    );
}

// ============================================
// Resume Preview (Live) — Template-specific
// ============================================

// Shared section rendering helpers
function SectionHeading({ children, color, style }: { children: React.ReactNode; color: string; style?: "serif" | "modern" | "bar" }) {
    if (style === "bar") {
        return (
            <div className="mb-4 mt-6">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-5 rounded-full" style={{ backgroundColor: color }} />
                    <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color }}>{children}</h2>
                </div>
                <div className="border-b border-gray-200 mt-2" />
            </div>
        );
    }
    if (style === "modern") {
        return (
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-3 mt-6 pb-1 border-b-2" style={{ color, borderColor: color }}>
                {children}
            </h2>
        );
    }
    // default serif / jake style
    return (
        <h2 className="text-[11px] font-bold uppercase tracking-wider mb-2 mt-5 pb-0.5 border-b border-gray-900 text-gray-900">
            {children}
        </h2>
    );
}

// ──────────────────────────────────────
// Jake's Resume Preview (single-column, clean)
// ──────────────────────────────────────
function JakePreview({ data, fontFamily }: { data: any, fontFamily?: string }) {
    return (
        <div className="bg-white text-gray-900 rounded-lg shadow-2xl overflow-hidden" style={{ width: "100%", minHeight: "800px", fontFamily: fontFamily || "'Times New Roman', serif", fontSize: "13px" }}>
            <div className="p-8">
                {/* Centered Header */}
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily }}>{data.basics.name || "Your Name"}</h1>
                    <div className="flex flex-wrap justify-center gap-x-3 gap-y-0.5 mt-1.5 text-[11px] text-gray-600">
                        {data.basics.phone && <span>{data.basics.phone}</span>}
                        {data.basics.email && <><span>|</span><span className="underline">{data.basics.email}</span></>}
                        {data.basics.url && <><span>|</span><span className="underline">{data.basics.url}</span></>}
                        {data.basics.location && <><span>|</span><span>{data.basics.location}</span></>}
                    </div>
                </div>

                {data.basics.summary && (
                    <><SectionHeading color="#000" style="serif">Summary</SectionHeading>
                        <p className="text-[12px] text-gray-700 leading-relaxed">{data.basics.summary}</p></>
                )}

                {data.education?.length > 0 && (
                    <><SectionHeading color="#000" style="serif">Education</SectionHeading>
                        {data.education.map((edu: any) => (
                            <div key={edu.id} className="flex justify-between mb-1">
                                <div><span className="font-bold text-[12px]">{edu.institution || "Institution"}</span> <span className="text-[11px] italic text-gray-600">{edu.studyType}{edu.area ? ` in ${edu.area} ` : ""}</span></div>
                                <span className="text-[11px] text-gray-500">{edu.startDate} – {edu.endDate || "Present"}</span>
                            </div>
                        ))}</>
                )}

                {data.work?.length > 0 && (
                    <><SectionHeading color="#000" style="serif">Experience</SectionHeading>
                        {data.work.map((exp: any) => (
                            <div key={exp.id} className="mb-3">
                                <div className="flex justify-between"><span className="font-bold text-[12px]">{exp.position || "Position"}</span><span className="text-[11px] text-gray-500">{exp.startDate} – {exp.endDate || "Present"}</span></div>
                                <div className="text-[11px] italic text-gray-600">{exp.company}</div>
                                {exp.summary && <p className="text-[11px] text-gray-700 mt-0.5 ml-4">• {exp.summary}</p>}
                            </div>
                        ))}</>
                )}

                {data.projects?.length > 0 && (
                    <><SectionHeading color="#000" style="serif">Projects</SectionHeading>
                        {data.projects.map((proj: any) => (
                            <div key={proj.id} className="mb-2">
                                <span className="font-bold text-[12px]">{proj.name || "Project"}</span>
                                {proj.url && <span className="text-[10px] text-gray-400 ml-2">{proj.url}</span>}
                                {proj.description && <p className="text-[11px] text-gray-700 mt-0.5 ml-4">• {proj.description}</p>}
                            </div>
                        ))}</>
                )}

                {data.skills?.length > 0 && (
                    <><SectionHeading color="#000" style="serif">Technical Skills</SectionHeading>
                        <p className="text-[11px] text-gray-800"><span className="font-bold">Skills: </span>{data.skills.map((s: any) => s.name || "Skill").join(", ")}</p></>
                )}
            </div>
        </div>
    );
}

// ──────────────────────────────────────
// Deedy CV Preview (two-column)
// ──────────────────────────────────────
function DeedyPreview({ data, fontFamily }: { data: any, fontFamily?: string }) {
    return (
        <div className="bg-white text-gray-900 rounded-lg shadow-2xl overflow-hidden" style={{ width: "100%", minHeight: "800px", fontFamily: fontFamily || "'Lato', sans-serif", fontSize: "12px" }}>
            {/* Full-width header */}
            <div className="px-8 pt-8 pb-4 text-center border-b-2 border-gray-200">
                <h1 className="text-3xl font-light tracking-wide text-gray-900">
                    <span className="font-bold">{data.basics.name?.split(" ")[0] || "First"}</span>{" "}
                    <span>{data.basics.name?.split(" ").slice(1).join(" ") || "Last"}</span>
                </h1>
                <div className="flex flex-wrap justify-center gap-x-3 mt-1 text-[11px] text-gray-500">
                    {data.basics.email && <span className="underline">{data.basics.email}</span>}
                    {data.basics.phone && <><span>|</span><span>{data.basics.phone}</span></>}
                    {data.basics.url && <><span>|</span><span className="underline">{data.basics.url}</span></>}
                </div>
            </div>

            <div className="flex">
                {/* Left Column (narrow) */}
                <div className="w-[35%] bg-gray-50 p-6 border-r border-gray-100">
                    {data.education?.length > 0 && (
                        <><h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">Education</h2>
                            {data.education.map((edu: any) => (
                                <div key={edu.id} className="mb-3">
                                    <p className="font-bold text-[11px]">{edu.institution}</p>
                                    <p className="text-[10px] text-gray-500 italic">{edu.studyType}{edu.area ? ` in ${edu.area} ` : ""}</p>
                                    <p className="text-[10px] text-gray-400">{edu.startDate} - {edu.endDate || "Present"}</p>
                                </div>
                            ))}</>
                    )}

                    {data.skills?.length > 0 && (
                        <><h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3 mt-6">Skills</h2>
                            <p className="text-[11px] text-gray-700 leading-relaxed">{data.skills.map((s: any) => s.name || "Skill").join(" • ")}</p></>
                    )}

                    {data.basics.location && (
                        <><h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2 mt-6">Location</h2>
                            <p className="text-[11px] text-gray-700">{data.basics.location}</p></>
                    )}
                </div>

                {/* Right Column (wide) */}
                <div className="w-[65%] p-6">
                    {data.basics.summary && (
                        <><h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">Summary</h2>
                            <p className="text-[11px] text-gray-700 leading-relaxed mb-6">{data.basics.summary}</p></>
                    )}

                    {data.work?.length > 0 && (
                        <><h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">Experience</h2>
                            {data.work.map((exp: any) => (
                                <div key={exp.id} className="mb-4">
                                    <p className="font-bold text-[12px]">{exp.company} <span className="font-normal text-gray-400">| {exp.position}</span></p>
                                    <p className="text-[10px] text-gray-400 italic">{exp.startDate} - {exp.endDate || "Present"}</p>
                                    {exp.summary && <p className="text-[11px] text-gray-600 mt-1 ml-3">• {exp.summary}</p>}
                                </div>
                            ))}</>
                    )}

                    {data.projects?.length > 0 && (
                        <><h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3 mt-6">Projects</h2>
                            {data.projects.map((proj: any) => (
                                <div key={proj.id} className="mb-3">
                                    <p className="font-bold text-[12px]">{proj.name}</p>
                                    {proj.description && <p className="text-[11px] text-gray-600 mt-0.5 ml-3">• {proj.description}</p>}
                                </div>
                            ))}</>
                    )}
                </div>
            </div>
        </div>
    );
}

// ──────────────────────────────────────
// Awesome CV Preview (modern, color accents)
// ──────────────────────────────────────
function AwesomePreview({ data, primaryColor, fontFamily }: { data: any; primaryColor: string, fontFamily?: string }) {
    const color = primaryColor || "#059669";

    return (
        <div className="bg-white text-gray-900 rounded-lg shadow-2xl overflow-hidden" style={{ width: "100%", minHeight: "800px", fontFamily: fontFamily || "'Inter', sans-serif", fontSize: "13px" }}>
            {/* Color header bar */}
            <div className="px-8 py-6" style={{ backgroundColor: color }}>
                <h1 className="text-2xl font-light text-white tracking-wide">
                    <span className="font-bold">{data.basics.name?.split(" ")[0] || "First"}</span>{" "}
                    {data.basics.name?.split(" ").slice(1).join(" ") || "Last"}
                </h1>
                {data.basics.headline && <p className="text-white/80 text-sm mt-1">{data.basics.headline}</p>}
                <div className="flex flex-wrap gap-x-4 mt-3 text-[11px] text-white/70">
                    {data.basics.email && <span>✉ {data.basics.email}</span>}
                    {data.basics.phone && <span>☎ {data.basics.phone}</span>}
                    {data.basics.location && <span>⌂ {data.basics.location}</span>}
                    {data.basics.url && <span>🔗 {data.basics.url}</span>}
                </div>
            </div>

            <div className="p-8">
                {data.basics.summary && (
                    <><SectionHeading color={color} style="bar">Summary</SectionHeading>
                        <p className="text-[12px] text-gray-600 leading-relaxed">{data.basics.summary}</p></>
                )}

                {data.work?.length > 0 && (
                    <><SectionHeading color={color} style="bar">Experience</SectionHeading>
                        {data.work.map((exp: any) => (
                            <div key={exp.id} className="mb-4 pl-4 border-l-2 border-gray-100">
                                <div className="flex justify-between"><span className="font-semibold text-[12px]">{exp.position}</span><span className="text-[10px] text-gray-400">{exp.startDate} – {exp.endDate || "Present"}</span></div>
                                <p className="text-[11px] italic" style={{ color }}>{exp.company}</p>
                                {exp.summary && <p className="text-[11px] text-gray-600 mt-1">• {exp.summary}</p>}
                            </div>
                        ))}</>
                )}

                {data.education?.length > 0 && (
                    <><SectionHeading color={color} style="bar">Education</SectionHeading>
                        {data.education.map((edu: any) => (
                            <div key={edu.id} className="mb-3 pl-4 border-l-2 border-gray-100">
                                <div className="flex justify-between"><span className="font-semibold text-[12px]">{edu.institution}</span><span className="text-[10px] text-gray-400">{edu.startDate} – {edu.endDate || "Present"}</span></div>
                                <p className="text-[11px] text-gray-600">{edu.studyType}{edu.area ? ` in ${edu.area} ` : ""}</p>
                            </div>
                        ))}</>
                )}

                {data.skills?.length > 0 && (
                    <><SectionHeading color={color} style="bar">Skills</SectionHeading>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.map((skill: any) => (
                                <span key={skill.id} className="px-2.5 py-1 text-[10px] rounded-full text-white font-medium" style={{ backgroundColor: color }}>{skill.name || "Skill"}</span>
                            ))}
                        </div></>
                )}

                {data.projects?.length > 0 && (
                    <><SectionHeading color={color} style="bar">Projects</SectionHeading>
                        {data.projects.map((proj: any) => (
                            <div key={proj.id} className="mb-3 pl-4 border-l-2 border-gray-100">
                                <span className="font-semibold text-[12px]">{proj.name}</span>
                                {proj.url && <span className="text-[10px] ml-2 underline" style={{ color }}>{proj.url}</span>}
                                {proj.description && <p className="text-[11px] text-gray-600 mt-0.5">• {proj.description}</p>}
                            </div>
                        ))}</>
                )}
            </div>
        </div>
    );
}

function ResumePreview() {
    const { data, metadata } = useResumeStore();

    // Map legacy "minimal" to "jake"
    const template = (metadata.template === "minimal" || !metadata.template) ? "jake" : metadata.template;
    const fontFamily = metadata.fontFamily ? (FONTS.find(f => f.id === metadata.fontFamily)?.family || metadata.fontFamily) : undefined;

    if (template === "deedy") return <DeedyPreview data={data} fontFamily={fontFamily} />;
    if (template === "awesome") return <AwesomePreview data={data} primaryColor={metadata.primaryColor} fontFamily={fontFamily} />;
    return <JakePreview data={data} fontFamily={fontFamily} />;
}

// ============================================
// Main Builder Page
// ============================================

const sectionComponents: Record<string, React.FC> = {
    basics: BasicsForm,
    work: WorkSection,
    education: EducationSection,
    skills: SkillsSection,
    projects: ProjectsSection,
    template: TemplateSection,
};

export default function BuilderPage() {
    const params = useParams();
    const id = params?.id as string;

    // Explicitly destructure store values
    const activeSection = useResumeStore(state => state.activeSection);
    const setActiveSection = useResumeStore(state => state.setActiveSection);
    const setResume = useResumeStore(state => state.setResume);
    const isDirty = useResumeStore(state => state.isDirty);
    const isSaving = useResumeStore(state => state.isSaving);
    const setIsSaving = useResumeStore(state => state.setIsSaving);
    const resetResume = useResumeStore(state => state.resetResume);
    const data = useResumeStore(state => state.data);
    const metadata = useResumeStore(state => state.metadata);
    const title = useResumeStore(state => state.title);
    const isPublic = useResumeStore(state => state.isPublic);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const ActiveComponent = sectionComponents[activeSection] || BasicsForm;

    // Load resume data
    const fetchResume = useCallback(async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/resumes/${id}`);
            if (!res.ok) {
                if (res.status === 404) throw new Error("Resume not found");
                throw new Error("Failed to load resume");
            }
            const resumeData = await res.json();
            setResume(resumeData);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [id, setResume]);

    useEffect(() => {
        fetchResume();
        return () => {
            resetResume();
        }
    }, [fetchResume, resetResume]);

    // Auto-save logic
    const saveResume = useCallback(async () => {
        if (!id) return;
        setIsSaving(true);
        try {
            await fetch(`/api/resumes/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    data,
                    metadata,
                    isPublic
                }),
            });
            setIsSaving(false);
        } catch (err) {
            console.error("Auto-save failed", err);
            setIsSaving(false);
        }
    }, [id, title, data, metadata, isPublic, setIsSaving]);

    useEffect(() => {
        if (!id || !isDirty || isLoading || error) return;

        const timeoutId = setTimeout(() => {
            saveResume();
        }, 2000); // 2 second debounce

        return () => clearTimeout(timeoutId);
    }, [isDirty, isLoading, error, saveResume]);


    if (isLoading) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-3">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-primary/20" />
                    <Loader2 className="w-12 h-12 animate-spin text-primary absolute inset-0" />
                </div>
                <p className="text-muted-foreground text-sm font-mono animate-pulse">Loading workspace...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-4">
                <div className="p-6 rounded-2xl glass border-rose-500/20 bg-rose-500/5">
                    <p className="text-rose-400 text-sm font-mono">{error}</p>
                </div>
                <a href="/dashboard" className="glass-btn px-6 py-2.5 text-sm font-bold hover:bg-white/10">← Back to Dashboard</a>
            </div>
        );
    }

    return (
        <div className="h-screen w-full overflow-hidden bg-transparent flex gap-6 p-6">

            {/* Editor Panel — Glass Floating Card */}
            <div className="w-[45%] h-full flex flex-col glass-panel overflow-hidden shadow-2xl shadow-black/20">
                {/* Section Tabs Header */}
                <div className="sticky top-0 z-10 bg-slate-900/40 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar items-center">
                        {sections.map((section, idx) => (
                            <React.Fragment key={section.id}>
                                {section.id === "template" && (
                                    <div className="w-px h-6 bg-white/10 mx-2 shrink-0" />
                                )}
                                <button
                                    onClick={() => setActiveSection(section.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border border-transparent",
                                        activeSection === section.id
                                            ? "bg-primary/20 text-primary border-primary/20 shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                    )}
                                >
                                    <section.icon className="w-3.5 h-3.5" />
                                    {section.label}
                                </button>
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="ml-4 pl-4 border-l border-white/10 flex items-center gap-3 text-xs font-bold text-muted-foreground whitespace-nowrap">
                        <MagicImproveButton />
                        {isSaving ? (
                            <span className="flex items-center gap-1.5 text-white/50"><Loader2 className="w-3 h-3 animate-spin" /> Saving</span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-emerald-400"><CheckCircle className="w-3 h-3" /> Saved</span>
                        )}
                    </div>
                </div>

                {/* Section Content */}
                <div
                    className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-gradient-to-b from-transparent to-slate-900/20"
                    data-lenis-prevent
                >
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <ActiveComponent />
                    </motion.div>
                </div>
            </div>

            {/* Preview Panel — Glass Floating Card */}
            <div className="flex-1 h-full glass-panel overflow-hidden relative shadow-2xl shadow-black/40 flex flex-col">
                <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

                {/* Preview Toolbar */}
                <div className="absolute top-6 right-6 z-20 flex gap-3">
                    <button
                        onClick={() => window.print()}
                        className="glass-btn flex items-center gap-2 px-4 py-2 text-xs font-bold hover:bg-white/10 text-white border-white/20 print:hidden"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Download PDF
                    </button>
                </div>

                <div className="absolute top-6 left-6 z-20">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/5">
                        Live Preview <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </h3>
                </div>

                {/* Scrollable Preview Area */}
                <div
                    className="flex-1 overflow-y-auto p-12 custom-scrollbar"
                    data-lenis-prevent
                >
                    <div id="resume-preview" className="max-w-[210mm] mx-auto shadow-2xl transition-transform duration-500 ease-out origin-top hover:scale-[1.01]">
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </div>
    );
}
