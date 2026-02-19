// ============================================
// AI Configuration
// ============================================

const MODEL = process.env.OPENROUTER_MODEL || "stepfun/step-3.5-flash:free";

// ============================================
// Resume Data Schema (matching resumeStore.ts)
// ============================================

const RESUME_SCHEMA = `{
  "basics": {
    "name": "string",
    "headline": "string (professional title, e.g. 'Senior Software Engineer')",
    "email": "string",
    "phone": "string",
    "location": "string",
    "url": "string (portfolio or LinkedIn URL)",
    "summary": "string (2-3 sentence professional summary)"
  },
  "work": [
    {
      "id": "string (unique id)",
      "company": "string",
      "position": "string",
      "startDate": "string (YYYY-MM format)",
      "endDate": "string (YYYY-MM format, or 'Present')",
      "summary": "string (brief role description)",
      "highlights": ["string (achievement bullet point with metrics)"]
    }
  ],
  "education": [
    {
      "id": "string (unique id)",
      "institution": "string",
      "area": "string (field of study)",
      "studyType": "string (e.g. 'Bachelor of Science')",
      "startDate": "string (YYYY-MM format)",
      "endDate": "string (YYYY-MM format)",
      "score": "string (GPA or honors, optional)"
    }
  ],
  "skills": [
    {
      "id": "string (unique id)",
      "name": "string (skill category, e.g. 'Programming Languages')",
      "level": "string (e.g. 'Advanced')",
      "keywords": ["string (individual skill)"]
    }
  ],
  "projects": [
    {
      "id": "string (unique id)",
      "name": "string",
      "description": "string",
      "url": "string (optional)",
      "startDate": "string (YYYY-MM format)",
      "endDate": "string (YYYY-MM format)",
      "highlights": ["string (key achievement or feature)"]
    }
  ]
}`;

// ============================================
// Global Resume Optimization
// ============================================

export async function optimizeResumeGlobal(data: any) {
  const prompt = `You are an expert resume writer and career coach. Your task is to rewrite the entire resume to be "Industry Standard", ATS-friendly, and professional.

INPUT DATA:
${JSON.stringify(data, null, 2)}

INSTRUCTIONS:
1. **Professional Summary**: Rewrite to be punchy, using active voice and strong keywords.
2. **Experience**: 
   - Rewrite all descriptions/highlights into crisp bullet points.
   - Use strong action verbs (e.g., "Led", "Developed", "Optimized").
   - Quantify results where possible (if numbers exist, emphasize them).
   - Remove passive voice.
3. **Education/Skills/Projects**: Polish language and formatting.
4. **Formatting**: Ensure consistent capitalization and tone.
5. **Strict Rule**: DO NOT invent new facts. Only polish the existing information. If a field is empty, keep it empty.

OUTPUT:
Return the COMPLETE resume JSON with the same structure as the input, but with improved content.
RETURN ONLY JSON.`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        provider: {
          sort: "throughput"
        }
      })
    });

    if (!res.ok) {
      throw new Error(`OpenRouter API error: ${await res.text()}`);
    }

    const completion = await res.json();
    const rawContent = completion.choices?.[0]?.message?.content || "{}";
    let response = "";
    if (typeof rawContent === "string") {
      response = rawContent;
    } else if (Array.isArray(rawContent)) {
      response = rawContent.map((part: any) => part.text || "").join("");
    }

    const cleaned = response.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return { success: true, data: parsed };
  } catch (e: any) {
    console.error("[AI_GLOBAL_OPTIMIZE] API Failed:", e);
    return { success: false, error: e.message };
  }
}

// ============================================
// Parse Resume from Text (or Image Fallback)
// ============================================

export async function parseResumeWithAI(text: string, base64Pdf?: string) {
  const prompt = `You are an expert resume parser. Extract structured data from the following resume text and return it as a JSON object.

IMPORTANT RULES:
1. Extract ALL information present in the resume
2. Generate unique IDs for each work, education, skill, and project entry (use format like "work_1", "edu_1", "skill_1", "proj_1")
3. Convert dates to YYYY-MM format when possible. Use "Present" for current positions
4. Group related skills into categories (e.g., "Programming Languages", "Frameworks", "Tools")
5. If information is missing or unclear, use empty strings — never make up data
6. Return ONLY valid JSON, no markdown code blocks or extra text

OUTPUT SCHEMA:
${RESUME_SCHEMA}

RESUME TEXT:
${text}

RETURN THE RESPONSE AS RAW JSON ONLY. DO NOT USE MARKDOWN BLOCK FORMATTING (no triple backticks). JUST RETURN THE RAW JSON OBJECT.
  `;

  try {
    const messages: any[] = [{ role: "user", content: prompt }];

    // Handle PDF-as-Image Fallback
    if (!text && base64Pdf) {
      console.log("[AI_PARSE] text empty, using Vision Fallback with base64 PDF");
      const visionPrompt = "Please extract data from this PDF.\n" + prompt;
      messages[0].content = [
        { type: "text", text: visionPrompt },
        {
          type: "image_url",
          image_url: {
            url: `data:application/pdf;base64,${base64Pdf}`
          }
        }
      ];
    } else {
      console.log("[AI_PARSE] Using text-only extraction mode");
    }

    console.log(`[AI_PARSE] Sending request to OpenRouter SDK (Model: ${MODEL})...`);

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        provider: {
          sort: "throughput"
        }
      })
    });

    if (!res.ok) {
      throw new Error(`OpenRouter API error: ${await res.text()}`);
    }

    const completion = await res.json();
    const rawContentData = completion.choices?.[0]?.message?.content || "{}";
    let rawContent = "";
    if (typeof rawContentData === "string") {
      rawContent = rawContentData;
    } else if (Array.isArray(rawContentData)) {
      rawContent = rawContentData.map((part: any) => part.text || "").join("");
    }

    console.log("[AI_PARSE] Raw Content Length:", rawContent.length);

    // 1. Strip <think>...</think> blocks common in reasoning models
    let cleaned = rawContent.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    // 2. Strip Markdown code blocks
    cleaned = cleaned
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    // 3. Find the first '{' and last '}' to extract the JSON object
    const firstOpen = cleaned.indexOf("{");
    const lastClose = cleaned.lastIndexOf("}");

    if (firstOpen !== -1 && lastClose !== -1) {
      cleaned = cleaned.substring(firstOpen, lastClose + 1);
    } else {
      console.warn("[AI_PARSE] No JSON brackets found, attempting parse on raw cleaned string...");
    }

    try {
      const parsed = JSON.parse(cleaned);
      return { success: true, data: parsed };
    } catch (jsonErr) {
      console.error("[AI_PARSE] JSON Parse Error. Cleaned content snippet:", cleaned.substring(0, 200));
      throw new Error("Failed to parse valid JSON from AI response");
    }

  } catch (e: any) {
    console.error("[AI_PARSE] Critical Failure:", e);
    return { success: false, error: e.message || "Failed to parse AI response" };
  }
}

// ============================================
// Optimize Resume Section
// ============================================

type OptimizableSection = "summary" | "work" | "projects";

const sectionPrompts: Record<OptimizableSection, string> = {
  summary: `You are an expert resume writer. Rewrite the following professional summary to be:
- formatted as 3-4 short, impactful bullet points
- using "•" as the bullet character
- ATS-optimized with relevant keywords
- written in first person without "I"
- highlighting key strengths and value proposition`,

  work: `You are an expert resume writer. Optimize the following work experience bullet points to be:
- Action-verb driven (Led, Developed, Increased, etc.)
- Quantified with specific metrics where possible (%, $, numbers)
- ATS-optimized with industry keywords
- Concise but impactful (one line each)
- Following the XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]"`,

  projects: `You are an expert resume writer. Optimize the following project descriptions to be:
- Highlighting technical skills used
- Showing measurable impact where possible
- ATS-optimized with relevant tech keywords
- Concise and compelling`,
};

export async function optimizeSection(
  section: OptimizableSection,
  content: any,
  jobDescription?: string
) {
  let contextNote = "";
  if (jobDescription) {
    contextNote = `\n\nTARGET JOB DESCRIPTION (tailor the content to match these requirements):\n${jobDescription}`;
  }

  const prompt = `${sectionPrompts[section]}${contextNote}

CURRENT CONTENT:
${JSON.stringify(content, null, 2)}

Return the optimized content as a JSON object with the EXACT SAME structure as the input. Do not change field names or add/remove fields. Return ONLY valid JSON.`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "user", content: prompt }],
        provider: {
          sort: "throughput"
        }
      })
    });

    if (!res.ok) {
      throw new Error(`OpenRouter API error: ${await res.text()}`);
    }

    const completion = await res.json();
    const rawContent = completion.choices?.[0]?.message?.content || "{}";
    let response = "";
    if (typeof rawContent === "string") {
      response = rawContent;
    } else if (Array.isArray(rawContent)) {
      response = rawContent.map((part: any) => part.text || "").join("");
    }

    let cleaned = response
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    // Find the first '{' and last '}' to extract the JSON object if there is extra text
    const firstOpen = cleaned.indexOf("{");
    const lastClose = cleaned.lastIndexOf("}");

    if (firstOpen !== -1 && lastClose !== -1) {
      cleaned = cleaned.substring(firstOpen, lastClose + 1);
    }

    const parsed = JSON.parse(cleaned);
    return { success: true, data: parsed };
  } catch (e: any) {
    console.error("[AI_OPTIMIZE] Failed:", e);
    return { success: false, error: e.message || "Failed to parse AI response" };
  }
}
