export interface ParsedOutput {
  caption: string;
  hashtags: string[];
}

export function parseOutput(raw: string): ParsedOutput {
  const hashtagsMarker = "## HASHTAGS";
  const captionMarker = "## CAPTION";

  const hashtagsIndex = raw.indexOf(hashtagsMarker);

  let captionRaw = "";
  let hashtagsRaw = "";

  if (hashtagsIndex === -1) {
    captionRaw = raw;
    hashtagsRaw = "";
  } else {
    captionRaw = raw.slice(0, hashtagsIndex);
    hashtagsRaw = raw.slice(hashtagsIndex + hashtagsMarker.length);
  }

  captionRaw = captionRaw.replace(captionMarker, "").trim();

  const hashtagTokens = hashtagsRaw
    .split(/[\s\n]+/)
    .map((t) => t.trim())
    .filter((t) => t.startsWith("#") && t.length > 1);

  return {
    caption: captionRaw,
    hashtags: hashtagTokens,
  };
}
