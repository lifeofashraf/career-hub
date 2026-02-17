import { create } from "zustand";
import { generateId } from "@/lib/utils";

// ============================================
// Types
// ============================================

export interface ResumeBasics {
    name: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    url: string;
    summary: string;
}

export interface WorkExperience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
    highlights: string[];
}

export interface Education {
    id: string;
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score: string;
}

export interface Skill {
    id: string;
    name: string;
    level: string;
    keywords: string[];
}

export interface Project {
    id: string;
    name: string;
    description: string;
    url: string;
    startDate: string;
    endDate: string;
    highlights: string[];
}

export interface ResumeData {
    basics: ResumeBasics;
    work: WorkExperience[];
    education: Education[];
    skills: Skill[];
    projects: Project[];
}

export interface ResumeMetadata {
    template: string;
    primaryColor: string;
    fontFamily: string;
    fontSize: number;
    pageSize: "a4" | "letter";
}

export interface ResumeState {
    // Identity
    id: string | null;
    title: string;
    slug: string | null;
    isPublic: boolean;

    // Content
    data: ResumeData;
    metadata: ResumeMetadata;

    // UI State
    activeSection: string;
    isDirty: boolean;
    isSaving: boolean;

    // Actions
    setId: (id: string) => void;
    setTitle: (title: string) => void;
    setSlug: (slug: string) => void;
    setIsPublic: (isPublic: boolean) => void;

    // Core Actions
    setResume: (resume: any) => void; // Load full resume from DB
    setActiveSection: (section: string) => void;

    // Form Actions
    updateBasics: (field: keyof ResumeBasics, value: string) => void;

    addWorkExperience: () => void;
    updateWorkExperience: (id: string, field: keyof WorkExperience, value: string | string[]) => void;
    removeWorkExperience: (id: string) => void;

    addEducation: () => void;
    updateEducation: (id: string, field: keyof Education, value: string) => void;
    removeEducation: (id: string) => void;

    addSkill: () => void;
    updateSkill: (id: string, field: keyof Skill, value: string | string[]) => void;
    removeSkill: (id: string) => void;

    addProject: () => void;
    updateProject: (id: string, field: keyof Project, value: string | string[]) => void;
    removeProject: (id: string) => void;

    updateMetadata: (field: keyof ResumeMetadata, value: string | number) => void;
    resetResume: () => void;
    setIsSaving: (isSaving: boolean) => void;
}

// ============================================
// Default State
// ============================================

const defaultBasics: ResumeBasics = {
    name: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    url: "",
    summary: "",
};

const defaultMetadata: ResumeMetadata = {
    template: "jake",
    primaryColor: "#6d28d9",
    fontFamily: "Inter",
    fontSize: 14,
    pageSize: "a4",
};

const defaultData: ResumeData = {
    basics: defaultBasics,
    work: [],
    education: [],
    skills: [],
    projects: [],
};

// ============================================
// Store
// ============================================

export const useResumeStore = create<ResumeState>((set) => ({
    id: null,
    title: "Untitled Resume",
    slug: null,
    isPublic: false,

    data: defaultData,
    metadata: defaultMetadata,
    activeSection: "basics",
    isDirty: false,
    isSaving: false,

    setId: (id) => set({ id }),
    setTitle: (title) => set({ title, isDirty: true }),
    setSlug: (slug) => set({ slug }),
    setIsPublic: (isPublic) => set({ isPublic, isDirty: true }),
    setIsSaving: (isSaving) => set({ isSaving }),

    setResume: (resume) => set({
        id: resume.id,
        title: resume.title,
        slug: resume.slug,
        isPublic: resume.isPublic,
        data: {
            ...defaultData,
            ...(resume.data || {}),
        },
        metadata: {
            ...defaultMetadata,
            ...(resume.metadata || {}),
        },
        isDirty: false,
    }),

    setActiveSection: (section) => set({ activeSection: section }),

    updateBasics: (field, value) =>
        set((state) => ({
            data: { ...state.data, basics: { ...state.data.basics, [field]: value } },
            isDirty: true,
        })),

    addWorkExperience: () =>
        set((state) => ({
            data: {
                ...state.data,
                work: [
                    ...state.data.work,
                    {
                        id: generateId(),
                        company: "",
                        position: "",
                        startDate: "",
                        endDate: "",
                        summary: "",
                        highlights: [],
                    },
                ],
            },
            isDirty: true,
        })),

    updateWorkExperience: (id, field, value) =>
        set((state) => ({
            data: {
                ...state.data,
                work: state.data.work.map((w) =>
                    w.id === id ? { ...w, [field]: value } : w
                ),
            },
            isDirty: true,
        })),

    removeWorkExperience: (id) =>
        set((state) => ({
            data: { ...state.data, work: state.data.work.filter((w) => w.id !== id) },
            isDirty: true,
        })),

    addEducation: () =>
        set((state) => ({
            data: {
                ...state.data,
                education: [
                    ...state.data.education,
                    {
                        id: generateId(),
                        institution: "",
                        area: "",
                        studyType: "",
                        startDate: "",
                        endDate: "",
                        score: "",
                    },
                ],
            },
            isDirty: true,
        })),

    updateEducation: (id, field, value) =>
        set((state) => ({
            data: {
                ...state.data,
                education: state.data.education.map((e) =>
                    e.id === id ? { ...e, [field]: value } : e
                ),
            },
            isDirty: true,
        })),

    removeEducation: (id) =>
        set((state) => ({
            data: {
                ...state.data,
                education: state.data.education.filter((e) => e.id !== id),
            },
            isDirty: true,
        })),

    addSkill: () =>
        set((state) => ({
            data: {
                ...state.data,
                skills: [
                    ...state.data.skills,
                    { id: generateId(), name: "", level: "Beginner", keywords: [] },
                ],
            },
            isDirty: true,
        })),

    updateSkill: (id, field, value) =>
        set((state) => ({
            data: {
                ...state.data,
                skills: state.data.skills.map((s) =>
                    s.id === id ? { ...s, [field]: value } : s
                ),
            },
            isDirty: true,
        })),

    removeSkill: (id) =>
        set((state) => ({
            data: {
                ...state.data,
                skills: state.data.skills.filter((s) => s.id !== id),
            },
            isDirty: true,
        })),

    addProject: () =>
        set((state) => ({
            data: {
                ...state.data,
                projects: [
                    ...state.data.projects,
                    {
                        id: generateId(),
                        name: "",
                        description: "",
                        url: "",
                        startDate: "",
                        endDate: "",
                        highlights: [],
                    },
                ],
            },
            isDirty: true,
        })),

    updateProject: (id, field, value) =>
        set((state) => ({
            data: {
                ...state.data,
                projects: state.data.projects.map((p) =>
                    p.id === id ? { ...p, [field]: value } : p
                ),
            },
            isDirty: true,
        })),

    removeProject: (id) =>
        set((state) => ({
            data: {
                ...state.data,
                projects: state.data.projects.filter((p) => p.id !== id),
            },
            isDirty: true,
        })),

    updateMetadata: (field, value) =>
        set((state) => ({
            metadata: { ...state.metadata, [field]: value },
            isDirty: true,
        })),

    resetResume: () =>
        set({
            id: null,
            title: "Untitled Resume",
            slug: null,
            isPublic: false,
            data: defaultData,
            metadata: defaultMetadata,
            isDirty: false,
            isSaving: false,
        }),
}));
