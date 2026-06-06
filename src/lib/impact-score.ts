import type { Paper } from "@/types";

const TIER1_INSTITUTIONS = new Set([
  "massachusetts institute of technology",
  "stanford university",
  "carnegie mellon university",
  "university of california berkeley",
  "harvard university",
  "university of oxford",
  "university of cambridge",
  "california institute of technology",
  "princeton university",
  "eth zurich",
  "google",
  "google deepmind",
  "deepmind",
  "openai",
  "meta",
  "meta ai",
  "microsoft research",
  "microsoft",
  "apple",
  "nvidia",
  "ibm research",
  "allen institute for ai",
  "max planck",
]);

const TIER2_INSTITUTIONS = new Set([
  "university of toronto",
  "columbia university",
  "yale university",
  "university of michigan",
  "cornell university",
  "university of washington",
  "georgia institute of technology",
  "university of illinois",
  "new york university",
  "university of pennsylvania",
  "duke university",
  "university of chicago",
  "tsinghua university",
  "peking university",
  "university of tokyo",
  "imperial college london",
  "ucl",
  "university college london",
  "epfl",
  "amazon",
  "anthropic",
  "salesforce research",
  "adobe research",
  "baidu",
  "tencent",
  "bytedance",
]);

const TIER1_VENUES = new Set([
  "nature",
  "science",
  "cell",
  "the lancet",
  "new england journal of medicine",
  "proceedings of the national academy of sciences",
  "nature medicine",
  "nature methods",
  "nature machine intelligence",
  "nature communications",
  "neurips",
  "icml",
  "iclr",
  "cvpr",
  "acl",
  "emnlp",
  "aaai",
  "sigir",
  "kdd",
  "icse",
  "physical review letters",
  "the astrophysical journal",
  "ieee transactions on pattern analysis and machine intelligence",
]);

const TIER2_VENUES = new Set([
  "scientific reports",
  "plos one",
  "ieee access",
  "frontiers",
  "arxiv",
  "acm computing surveys",
  "journal of machine learning research",
  "artificial intelligence",
  "ieee transactions on neural networks",
  "transactions on information systems",
  "naacl",
  "eccv",
  "iccv",
  "wsdm",
  "www",
  "cikm",
]);

function matchesTier(name: string, tier: Set<string>): boolean {
  const lower = name.toLowerCase();
  for (const entry of tier) {
    if (lower.includes(entry)) return true;
  }
  return false;
}

export function computeImpactScore(paper: Paper): number {
  let score = 0;

  // Institution prestige (max ~40 points)
  const instNames = paper.institutions?.map((i) => i.name) ?? [];
  let bestInstScore = 0;
  for (const name of instNames) {
    if (matchesTier(name, TIER1_INSTITUTIONS)) {
      bestInstScore = Math.max(bestInstScore, 40);
    } else if (matchesTier(name, TIER2_INSTITUTIONS)) {
      bestInstScore = Math.max(bestInstScore, 25);
    }
  }
  if (bestInstScore === 0 && instNames.length > 0) bestInstScore = 10;
  score += bestInstScore;

  // Venue prestige (max ~35 points)
  const venue = paper.venue ?? "";
  if (matchesTier(venue, TIER1_VENUES)) {
    score += 35;
  } else if (matchesTier(venue, TIER2_VENUES)) {
    score += 20;
  } else if (venue) {
    score += 5;
  }

  // Early citation traction (max ~25 points)
  // For papers < 2 weeks old, even 1-2 citations is significant
  const citations = paper.citationCount ?? 0;
  if (citations >= 10) score += 25;
  else if (citations >= 5) score += 20;
  else if (citations >= 2) score += 15;
  else if (citations >= 1) score += 10;

  return score;
}

export function rankByImpact(papers: Paper[]): Paper[] {
  return [...papers].sort((a, b) => computeImpactScore(b) - computeImpactScore(a));
}
