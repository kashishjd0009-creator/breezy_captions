import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { aiProvider } from "@/lib/ai/index";
import { buildPrompt, type Platform, type Tone } from "@/lib/prompts";
import { getMockStream } from "@/lib/mock-ai";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const PLATFORMS = [
  "Instagram Post",
  "Instagram Stories",
  "LinkedIn",
  "YouTube",
  "Facebook",
  "WhatsApp Status",
  "Twitter / X",
  "TikTok",
  "Pinterest",
] as const;

const TONES = ["Funny", "Inspiring", "Professional", "Casual", "Promotional"] as const;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024;

const generateSchema = z.object({
  platform: z.enum(PLATFORMS),
  tone: z.enum(TONES),
  description: z.string().max(500, "Description must be under 500 characters.").optional(),
  imageMimeType: z.enum(ALLOWED_IMAGE_TYPES).optional(),
  imageBase64Data: z.string().min(1, "Image data is missing.").optional(),
}).superRefine((data, ctx) => {
  const hasDescription = (data.description?.trim().length ?? 0) > 0;
  const hasImage = Boolean(data.imageMimeType && data.imageBase64Data);

  if (!hasDescription && !hasImage) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Provide an image, a description, or both.",
      path: ["description"],
    });
  }
});

function getIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

function mapGenerationError(err: unknown): { message: string; status: number } {
  const raw = err instanceof Error ? err.message : String(err);
  const lower = raw.toLowerCase();

  if (lower.includes("missing gemini_api_key")) {
    return { message: "Server configuration error. Please contact support.", status: 500 };
  }

  if (lower.includes("503 service unavailable") || lower.includes("high demand")) {
    return {
      message: "AI service is busy right now. Please try again in a few moments.",
      status: 503,
    };
  }

  if (lower.includes("429")) {
    return {
      message: "AI service rate limit reached. Please wait a bit and try again.",
      status: 429,
    };
  }

  return { message: "Caption generation failed. Please try again.", status: 500 };
}

export async function POST(request: NextRequest) {
  const ip = getIP(request);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in an hour." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    const formData = await request.formData();
    const rawPlatform = formData.get("platform");
    const rawTone = formData.get("tone");
    const rawDescription = formData.get("description");
    const rawImage = formData.get("image");
    let imageMimeType: string | undefined;
    let imageBase64Data: string | undefined;

    if (rawImage instanceof File && rawImage.size > 0) {
      if (!ALLOWED_IMAGE_TYPES.includes(rawImage.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
        return NextResponse.json(
          { error: "Unsupported image format. Use JPG, PNG, or WEBP." },
          { status: 400 }
        );
      }

      if (rawImage.size > MAX_IMAGE_SIZE_BYTES) {
        return NextResponse.json(
          { error: "Image must be 4 MB or smaller." },
          { status: 400 }
        );
      }

      const bytes = Buffer.from(await rawImage.arrayBuffer());
      imageMimeType = rawImage.type;
      imageBase64Data = bytes.toString("base64");
    }

    body = {
      platform: typeof rawPlatform === "string" ? rawPlatform : "",
      tone: typeof rawTone === "string" ? rawTone : "",
      description: typeof rawDescription === "string" ? rawDescription : undefined,
      imageMimeType,
      imageBase64Data,
    };
  } catch {
    return NextResponse.json({ error: "Invalid form payload." }, { status: 400 });
  }

  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: issue?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  const { platform, tone, description, imageMimeType, imageBase64Data } = parsed.data;

  try {
    let stream: ReadableStream<string>;

    if (process.env.USE_MOCK_AI === "true") {
      stream = await getMockStream();
    } else {
      const prompt = buildPrompt({
        platform: platform as Platform,
        tone: tone as Tone,
        description:
          description?.trim() ||
          "No user-written description was provided. Infer the post context from the uploaded image.",
      });
      stream = await aiProvider.generateStream({
        prompt,
        image:
          imageMimeType && imageBase64Data
            ? {
                mimeType: imageMimeType,
                base64Data: imageBase64Data,
              }
            : undefined,
      });
    }

    const encoder = new TextEncoder();
    const encodedStream = new ReadableStream({
      async start(controller) {
        const reader = stream.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(encoder.encode(value));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(encodedStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    const mapped = mapGenerationError(err);
    return NextResponse.json({ error: mapped.message }, { status: mapped.status });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
