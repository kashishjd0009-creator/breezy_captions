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

const generateSchema = z.object({
  platform: z.enum(PLATFORMS),
  tone: z.enum(TONES),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters.")
    .max(500, "Description must be under 500 characters."),
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
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { error: issue?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  const { platform, tone, description } = parsed.data;

  try {
    let stream: ReadableStream<string>;

    if (process.env.USE_MOCK_AI === "true") {
      stream = await getMockStream();
    } else {
      const prompt = buildPrompt({
        platform: platform as Platform,
        tone: tone as Tone,
        description,
      });
      stream = await aiProvider.generateStream({ prompt });
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
    const message = err instanceof Error ? err.message : "Generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
