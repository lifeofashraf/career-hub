import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
}

export function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
}
