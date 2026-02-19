import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { parseResumeWithAI } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Parse multipart form data
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { error: "Only PDF files are supported" },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size must be under 5MB" },
                { status: 400 }
            );
        }
        console.log("[PDF_PARSE] File received:", file.name, "Size:", file.size, "Type:", file.type);

        // Convert file to buffer and extract text
        const buffer = Buffer.from(await file.arrayBuffer());

        // Dynamic import for pdf-parse (CommonJS module)
        // Bypassing index.js to avoid debug mode that tries to read test files
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require("pdf-parse/lib/pdf-parse.js");

        // Polyfill DOMMatrix for PDFs that use transforms (just in case)
        if (typeof global.DOMMatrix === "undefined") {
            (global as any).DOMMatrix = class DOMMatrix {
                a = 1; b = 0; c = 0; d = 1; e = 0; f = 0;
                constructor(init?: string | number[]) {
                    if (Array.isArray(init)) {
                        [this.a, this.b, this.c, this.d, this.e, this.f] = init;
                    }
                }
            };
        }

        // Custom render to extract EVERYTHING
        const render_page = async (pageData: any) => {
            const render_options = {
                normalizeWhitespace: true,
                disableCombineTextItems: false
            };

            try {
                const textContent = await pageData.getTextContent(render_options);
                let lastY, text = '';
                // Simple concatenation of all text items
                for (const item of textContent.items) {
                    if (item.str) {
                        text += item.str + ' ';
                    }
                }
                return text;
            } catch (e) {
                console.error("[PDF_RENDER] Error rendering page:", e);
                return "";
            }
        };

        // Use default render logic for better compatibility
        const options = {
            // pagerender: render_page 
        };

        let pdfData;
        try {
            pdfData = await pdfParse(buffer, options);
        } catch (e: any) {
            console.error("[PDF_PARSE] Library Error:", e);
            return NextResponse.json(
                { error: "Failed to read PDF file. It might be corrupted or encrypted." },
                { status: 422 }
            );
        }

        console.log("[PDF_EXTRACT] Info:", JSON.stringify(pdfData.info));
        console.log("[PDF_EXTRACT] Metadata:", JSON.stringify(pdfData.metadata));
        console.log("[PDF_EXTRACT] Extracted length:", pdfData.text.length);
        console.log("[PDF_EXTRACT] Preview:", pdfData.text.substring(0, 500).replace(/\n/g, "\\n"));

        // Low text yield check
        if (!pdfData.text || pdfData.text.trim().length < 50) {
            console.warn("[PDF_EXTRACT] Low text yield (" + (pdfData.text ? pdfData.text.length : 0) + " chars). Attempting AI Vision fallback...");

            try {
                // Cloud Fallback
                const base64Pdf = buffer.toString("base64");
                console.log("[AI_PARSE] Sending PDF binary to AI (Vision Mode)...");

                const result = await parseResumeWithAI("", base64Pdf);

                if (result.success) {
                    console.log("[AI_PARSE] Cloud Success. Name:", result.data?.basics?.name);
                    return NextResponse.json({
                        success: true,
                        data: result.data,
                        meta: {
                            pages: pdfData.numpages,
                            textLength: 0,
                            cloudMode: true
                        },
                    });
                }

                console.error("[AI_PARSE] Cloud Fallback Failed:", result.error);
                // If vision fails, FALL THROUGH to try text parsing anyway
                console.log("[AI_PARSE] Falling back to available text (even if low yield)...");

            } catch (fallbackErr) {
                console.error("[AI_PARSE] Vision fallback exception:", fallbackErr);
                // Fall through
            }
        }

        // Send extracted text to Gemini for structured parsing
        console.log("[AI_PARSE] Sending extracted text to AI...");
        const result = await parseResumeWithAI(pdfData.text);

        if (!result.success) {
            console.error("[AI_PARSE] Failed:", result.error);
            return NextResponse.json(
                { error: result.error || "AI parsing failed" },
                { status: 500 }
            );
        }

        console.log("[AI_PARSE] Success. Name:", result.data?.basics?.name);

        return NextResponse.json({
            success: true,
            data: result.data,
            meta: {
                pages: pdfData.numpages,
                textLength: pdfData.text.length,
            },
        });
    } catch (error: any) {
        console.error("[RESUME_PARSER]", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
