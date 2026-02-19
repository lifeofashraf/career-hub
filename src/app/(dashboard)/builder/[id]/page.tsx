"use client";


import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Trash2, GripVertical, User, Briefcase, GraduationCap, Wrench, FolderOpen,
    Save, Loader2, CheckCircle, Sparkles, ExternalLink, Download, Layout, Upload, X
} from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { cn } from "@/lib/utils";

import TemplateSelector from "@/components/builder/TemplateSelector";
import MagicImproveButton from "@/components/builder/MagicImproveButton";
import FontSelector, { FONTS } from "@/components/builder/FontSelector";
import ResumeUploader from "@/components/builder/ResumeUploader";

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

// ============================================
// Form Components
// ============================================

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
    return (
        <div className="group space-y-1.5">
            <label className="block text-xs font-bold text-black uppercase tracking-wider">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="input-brutal min-h-[120px] resize-y leading-relaxed"
                    placeholder={`Enter ${label.toLowerCase()}...`}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="input-brutal"
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
        <div className="mt-8 p-6 bg-white border-2 border-black brutal-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 text-neutral-100 group-hover:text-neutral-200 transition-colors">
                <Sparkles className="w-24 h-24 text-black -rotate-12" />
            </div>
            <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-black text-white shrink-0">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-sans font-black text-lg uppercase mb-1 tracking-tight">
                        {title}
                    </h4>
                    <p className="text-sm font-mono text-neutral-600 mb-4 leading-relaxed max-w-md">
                        {description}
                    </p>
                    <a
                        href={actionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-all brutal-shadow-sm hover:brutal-shadow-hover"
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
    const getValue = (val: string | undefined) => val || "";

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Full Name" value={getValue(data.basics.name)} onChange={(v) => updateBasics("name", v)} />
                <InputField label="Headline" value={getValue(data.basics.headline)} onChange={(v) => updateBasics("headline", v)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Email" value={getValue(data.basics.email)} onChange={(v) => updateBasics("email", v)} type="email" />
                <InputField label="Phone" value={getValue(data.basics.phone)} onChange={(v) => updateBasics("phone", v)} type="tel" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Location" value={getValue(data.basics.location)} onChange={(v) => updateBasics("location", v)} />
                <InputField label="Website" value={getValue(data.basics.url)} onChange={(v) => updateBasics("url", v)} type="url" />
            </div>
            <InputField label="Professional Summary" value={getValue(data.basics.summary)} onChange={(v) => updateBasics("summary", v)} multiline />

            <ProTip
                title="Fix typos instantly"
                description="Recruiters toss resumes with typos. Use Grammarly to catch errors and improve clarity."
                actionUrl="https://grammarly.com"
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
        <div className="space-y-6">
            {data.work?.map((exp) => (
                <div key={exp.id} className="p-6 border-2 border-black bg-white space-y-4 brutal-shadow-sm group transition-all hover:brutal-shadow-hover">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                        <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-4 h-4 text-black" />
                            <span className="text-xs font-bold uppercase tracking-wider text-black">Position #{exp.id.slice(0, 3)}</span>
                        </div>
                        <button onClick={() => removeWorkExperience(exp.id)} className="p-1 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Company" value={exp.company || ""} onChange={(v) => updateWorkExperience(exp.id, "company", v)} />
                        <InputField label="Position" value={exp.position || ""} onChange={(v) => updateWorkExperience(exp.id, "position", v)} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Start Date" value={exp.startDate || ""} onChange={(v) => updateWorkExperience(exp.id, "startDate", v)} />
                        <InputField label="End Date" value={exp.endDate || ""} onChange={(v) => updateWorkExperience(exp.id, "endDate", v)} />
                    </div>
                    <InputField label="Description" value={exp.summary || ""} onChange={(v) => updateWorkExperience(exp.id, "summary", v)} multiline />
                </div>
            ))}
            <button
                onClick={addWorkExperience}
                className="w-full py-4 border-2 border-dashed border-black font-bold uppercase tracking-wider text-xs text-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
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
        <div className="space-y-6">
            {data.education?.map((edu) => (
                <div key={edu.id} className="p-6 border-2 border-black bg-white space-y-4 brutal-shadow-sm group transition-all hover:brutal-shadow-hover">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                        <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-4 h-4 text-black" />
                            <span className="text-xs font-bold uppercase tracking-wider text-black">Education #{edu.id.slice(0, 3)}</span>
                        </div>
                        <button onClick={() => removeEducation(edu.id)} className="p-1 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Institution" value={edu.institution || ""} onChange={(v) => updateEducation(edu.id, "institution", v)} />
                        <InputField label="Field of Study" value={edu.area || ""} onChange={(v) => updateEducation(edu.id, "area", v)} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <InputField label="Degree" value={edu.studyType || ""} onChange={(v) => updateEducation(edu.id, "studyType", v)} />
                        <InputField label="Start Date" value={edu.startDate || ""} onChange={(v) => updateEducation(edu.id, "startDate", v)} />
                        <InputField label="End Date" value={edu.endDate || ""} onChange={(v) => updateEducation(edu.id, "endDate", v)} />
                    </div>
                </div>
            ))}
            <button
                onClick={addEducation}
                className="w-full py-4 border-2 border-dashed border-black font-bold uppercase tracking-wider text-xs text-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
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
                <div key={skill.id} className="p-3 border-2 border-black bg-white flex items-center gap-3 transition-all hover:brutal-shadow-sm group">
                    <GripVertical className="w-4 h-4 text-black cursor-grab flex-shrink-0" />
                    <input
                        value={skill.name || ""}
                        onChange={(e) => updateSkill(skill.id, "name", e.target.value)}
                        className="flex-1 px-3 py-2 bg-transparent border-b-2 border-transparent focus:border-black text-sm text-black focus:outline-none font-mono placeholder:text-neutral-400"
                        placeholder="Skill name..."
                    />
                    <select
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, "level", e.target.value)}
                        className="px-3 py-2 bg-neutral-100 border-2 border-transparent focus:border-black text-sm text-black focus:outline-none"
                    >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Expert</option>
                    </select>
                    <button onClick={() => removeSkill(skill.id)} className="p-2 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black transition-colors flex-shrink-0">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ))}
            <button
                onClick={addSkill}
                className="w-full py-4 border-2 border-dashed border-black font-bold uppercase tracking-wider text-xs text-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
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
        <div className="space-y-6">
            {data.projects?.map((proj) => (
                <div key={proj.id} className="p-6 border-2 border-black bg-white space-y-4 brutal-shadow-sm group transition-all hover:brutal-shadow-hover">
                    <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2">
                        <div className="flex items-center gap-2 cursor-grab active:cursor-grabbing">
                            <GripVertical className="w-4 h-4 text-black" />
                            <span className="text-xs font-bold uppercase tracking-wider text-black">Project #{proj.id.slice(0, 3)}</span>
                        </div>
                        <button onClick={() => removeProject(proj.id)} className="p-1 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InputField label="Project Name" value={proj.name || ""} onChange={(v) => updateProject(proj.id, "name", v)} />
                        <InputField label="URL" value={proj.url || ""} onChange={(v) => updateProject(proj.id, "url", v)} type="url" />
                    </div>
                    <InputField label="Description" value={proj.description || ""} onChange={(v) => updateProject(proj.id, "description", v)} multiline />
                </div>
            ))}
            <button
                onClick={addProject}
                className="w-full py-4 border-2 border-dashed border-black font-bold uppercase tracking-wider text-xs text-black hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
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
            <div className="border-t-2 border-black pt-8">
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
                                <div><span className="font-bold text-[12px]">{edu.institution || "Institution"}</span> <span className="text-[11px] italic text-gray-600">{edu.studyType}{edu.area ? ` in ${edu.area}` : ""}</span></div>
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
                                    <p className="text-[10px] text-gray-500 italic">{edu.studyType}{edu.area ? ` in ${edu.area}` : ""}</p>
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
                                <p className="text-[11px] text-gray-600">{edu.studyType}{edu.area ? ` in ${edu.area}` : ""}</p>
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
// Main Builder Page Component
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

    const activeSection = useResumeStore(state => state.activeSection);
    const setActiveSection = useResumeStore(state => state.setActiveSection);
    const setResume = useResumeStore(state => state.setResume);
    const isSaving = useResumeStore(state => state.isSaving);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    // Fetch resume data
    useEffect(() => {
        if (!id) return;

        const fetchResume = async () => {
            try {
                // Determine API endpoint path
                const endpoint = id === "new" ? "/api/resumes/new" : `/api/resumes/${id}`;

                const res = await fetch(endpoint);

                if (!res.ok) {
                    if (res.status === 404) {
                        setError("Resume not found");
                        return;
                    }
                    throw new Error("Failed to fetch resume");
                }

                const data = await res.json();

                if (data) {
                    setResume(data);
                }
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResume();
    }, [id, setResume]);


    // PDF Export Logic (Browser-Native Rendering via html-to-image)
    const handleExportPdf = async () => {
        setIsExporting(true);
        try {
            // Dynamic imports
            const { toPng } = await import("html-to-image");
            const { jsPDF } = await import("jspdf");

            const element = document.getElementById("resume-preview-content");
            if (!element) throw new Error("Resume content not found");

            // 1. Render element to PNG data URL
            // scale: 2 for high resolution (Retina-like quality)
            // No filter needed for fonts since they are now self-hosted (same-origin)
            const dataUrl = await toPng(element, {
                quality: 0.95,
                pixelRatio: 2
            });

            // 2. Create PDF
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4"
            });

            // 3. Add image to PDF
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`resume-${id}.pdf`);

        } catch (err: any) {
            console.error("Export error:", err);
            setError(`Export failed: ${err.message}`);
        } finally {
            setIsExporting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-black" />
                    <p className="font-mono text-sm uppercase tracking-wider animate-pulse">Loading Builder...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-white p-6">
                <div className="max-w-md w-full border-4 border-black p-8 brutal-shadow text-center">
                    <h2 className="text-3xl font-black uppercase mb-4">Error</h2>
                    <p className="font-mono mb-8">{error}</p>
                    <a href="/dashboard" className="btn-brutal inline-block w-full text-center py-3">
                        Return to Dashboard
                    </a>
                </div>
            </div>
        );
    }

    const ActiveComponent = sectionComponents[activeSection] || BasicsForm;

    return (
        <div className="min-h-screen w-full bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white relative">
            {/* Header */}
            <header className="h-16 border-b-4 border-black flex items-center justify-between px-3 md:px-6 bg-white shrink-0 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <a href="/dashboard" className="w-10 h-10 bg-black text-white flex items-center justify-center font-black text-xl hover:rotate-3 transition-transform cursor-pointer">
                        C
                    </a>
                    <span className="font-black text-2xl tracking-tighter uppercase hidden sm:block">
                        Builder
                    </span>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    <div className="flex items-center gap-2 mr-2 md:mr-4 border-r-2 border-black pr-2 md:pr-6 h-8">
                        {isSaving ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400">
                                <Loader2 className="w-3 h-3 animate-spin" /> <span className="hidden sm:inline">Saving...</span>
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-600">
                                <CheckCircle className="w-3 h-3" /> <span className="hidden sm:inline">Saved</span>
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="bg-neutral-100 hover:bg-neutral-200 text-black border-2 border-black px-2 md:px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 h-10 transition-colors"
                        >
                            <Upload className="w-4 h-4" /> <span className="hidden sm:inline">Import</span>
                        </button>

                        <MagicImproveButton />

                        <button
                            onClick={handleExportPdf}
                            disabled={isExporting}
                            className="btn-brutal px-2 md:px-4 py-2 text-xs flex items-center gap-2 h-10 print:hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                            <span className="hidden sm:inline">{isExporting ? "Exporting..." : "Export PDF"}</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
                {/* Left Panel: Editor */}
                <div className="w-full lg:w-[450px] xl:w-[500px] border-r-4 border-black bg-neutral-50 flex flex-col h-full overflow-hidden shrink-0 z-10">
                    <div className="overflow-x-auto border-b-4 border-black bg-white shrink-0 scrollbar-hide">
                        <div className="flex p-2 gap-2 min-w-max">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 min-w-[80px] border-2 transition-all",
                                        activeSection === section.id
                                            ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] translate-y-[-2px]"
                                            : "bg-white text-black border-transparent hover:border-black hover:bg-neutral-100"
                                    )}
                                >
                                    <section.icon className="w-5 h-5 mb-1" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{section.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                        <div className="max-w-2xl mx-auto pb-20">
                            <h2 className="text-3xl font-black uppercase mb-6 tracking-tighter flex items-center gap-3">
                                {sections.find(s => s.id === activeSection)?.label}
                                <div className="h-1 flex-1 bg-black" />
                            </h2>
                            <ActiveComponent />
                        </div>
                    </div>
                </div>

                {/* Right Panel: Preview */}
                <div className="flex-1 bg-neutral-100 overflow-y-auto p-4 md:p-8 flex justify-center scrollbar-thin relative">
                    <div className="w-full max-w-[210mm] relative z-0 mb-20 origin-top">
                        <div className="uppercase text-xs font-bold tracking-widest text-neutral-400 mb-4 text-center">
                            Live Preview
                        </div>
                        <div id="resume-preview-content">
                            <ResumePreview />
                        </div>
                    </div>
                </div>
            </div>

            {/* Import Modal */}
            <AnimatePresence>
                {showImportModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowImportModal(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg bg-white border-4 border-black p-6 brutal-shadow z-10"
                        >
                            <button
                                onClick={() => setShowImportModal(false)}
                                className="absolute top-4 right-4 p-1 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h3 className="text-xl font-black uppercase mb-2">Import Resume</h3>
                            <p className="text-sm text-neutral-600 mb-6 font-mono">
                                Upload a PDF to create a <span className="font-bold text-black bg-yellow-300 px-1">NEW</span> resume.
                            </p>

                            <ResumeUploader />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
