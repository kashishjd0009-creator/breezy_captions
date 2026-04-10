export type Platform =
  | "Instagram Post"
  | "Instagram Stories"
  | "LinkedIn"
  | "YouTube"
  | "Facebook"
  | "WhatsApp Status"
  | "Twitter / X"
  | "TikTok"
  | "Pinterest";

export type Tone = "Funny" | "Inspiring" | "Professional" | "Casual" | "Promotional";

interface BuildPromptOptions {
  platform: Platform;
  tone: Tone;
  description: string;
}

const PLATFORM_INSTRUCTIONS: Record<Platform, string> = {
  "Instagram Post": `
- Write a vibrant, storytelling caption between 150 and 220 characters (not counting hashtags).
- The caption should feel personal and engaging — like a friend sharing something real.
- End the caption with a soft call to action or a question to encourage comments.
- Then on a new line, provide exactly 12 relevant hashtags as a space-separated list.
- Mix broad reach hashtags (e.g. #photography) with niche ones (e.g. #morningcoffeevibes).`,

  "Instagram Stories": `
- Write an ultra-short, punchy caption of 1–2 sentences maximum (under 80 characters ideal).
- The tone should feel spontaneous and conversational, like something you'd type in the moment.
- Stories are fleeting — make every word count.
- Provide 5–7 hashtags as a space-separated list (these help Stories reach Explore).`,

  LinkedIn: `
- Write a professional, thoughtful caption even if the tone is set to "casual" — LinkedIn has norms.
- Format as 1–3 short paragraphs. The first line must hook the reader and stand alone as a teaser.
- You may use a single line break between thoughts for scanability.
- Avoid excessive emojis — use 0–2 max, purposefully.
- LinkedIn posts without links in the body get significantly more reach — do NOT include any URLs.
- Provide exactly 3–5 hashtags (LinkedIn hashtags are professional and topic-specific, not trendy).`,

  YouTube: `
- Write a video description-style caption. The very first sentence must hook search intent and describe what the video covers.
- Use natural keyword placement — write for humans but think about discoverability.
- 2–3 sentences total. Friendly but informative.
- Provide 5–8 hashtags as a space-separated list. These appear above the title on YouTube.`,

  Facebook: `
- Write a conversational, warm caption suited for a Facebook post. You can be slightly longer here — 2–4 sentences is fine.
- Facebook audiences appreciate context, stories, and genuine emotion. Don't be too brief.
- End with a question or prompt to drive comments (e.g. "What do you think?" or "Drop your answer below 👇").
- Provide 3–5 hashtags — Facebook hashtags have lower impact than Instagram, keep them topical.`,

  "WhatsApp Status": `
- Write a VERY short caption — 1–2 sentences maximum, under 100 characters if possible.
- WhatsApp Status is personal and intimate. Write like you're sending it to your closest contacts.
- Emoji-friendly — a well-placed emoji adds personality without being excessive.
- Do NOT include any hashtags — hashtags are not used in WhatsApp Status.`,

  "Twitter / X": `
- The entire output (caption + hashtags) must fit under 280 characters total. Count carefully.
- Be punchy, direct, and witty. Twitter rewards short, quotable sentences.
- Use 2–4 hashtags embedded naturally within the tweet or at the end. No more.
- If the description suggests controversy or a hot take, lean into it — engagement is the currency.`,

  TikTok: `
- Write an energetic, trend-aware caption. TikTok has a Gen-Z sensibility regardless of the tone selected.
- Keep it short — under 150 characters. TikTok captions are read quickly while videos play.
- Use TikTok-native phrases where appropriate (e.g. "POV:", "This is your sign to...", "Not me...").
- Provide 5–8 hashtags. Mix trending TikTok tags (e.g. #fyp #foryoupage) with topic-specific ones.`,

  Pinterest: `
- Write a descriptive, keyword-rich caption that helps the Pin get discovered through Pinterest search.
- Pinterest is a visual search engine — treat this like SEO-optimized copy that still sounds human.
- 2–3 sentences. Describe what's in the image, why it's useful or beautiful, and where the inspiration leads.
- Provide 3–5 hashtags that are keyword-focused rather than trending.`,
};

const TONE_MODIFIERS: Record<Tone, string> = {
  Funny:
    "The tone should be playful, witty, and light-hearted. Use humor naturally — a well-timed joke, clever wordplay, or a relatable observation. Don't force it.",
  Inspiring:
    "The tone should be uplifting and motivational. Speak to the reader's aspirations. Use vivid, energizing language that makes them feel something.",
  Professional:
    "The tone should be polished and authoritative. Clear, confident, and well-structured. Avoid slang. Sound like a brand that knows what it's doing.",
  Casual:
    "The tone should be relaxed and conversational — like texting a friend. Contractions welcome. Nothing stiff or corporate.",
  Promotional:
    "The tone should highlight value and create desire. Emphasize benefits over features. Create a sense of excitement or mild urgency without being pushy.",
};

export function buildPrompt({ platform, tone, description }: BuildPromptOptions): string {
  const platformInstructions = PLATFORM_INSTRUCTIONS[platform];
  const toneModifier = TONE_MODIFIERS[tone];

  return `You are a professional social media copywriter specializing in high-performing content for creators and businesses.

Your task: Write a ready-to-post ${platform} caption based on the description below.

PLATFORM: ${platform}
TONE: ${tone}

PLATFORM-SPECIFIC RULES:
${platformInstructions}

TONE GUIDANCE:
${toneModifier}

POST DESCRIPTION:
${description}

OUTPUT FORMAT — follow this exactly, with no extra commentary before or after:

## CAPTION

[write the caption here]

## HASHTAGS

[write hashtags here as a space-separated list, each starting with #]

Do not add any explanation, preamble, or notes outside of these two sections. Output only the two sections above.`;
}
