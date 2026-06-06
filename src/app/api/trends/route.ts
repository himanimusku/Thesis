import { NextResponse } from "next/server";
import type { TrendSignal } from "@/types";

const mockTrends: TrendSignal[] = [
  {
    id: "1",
    name: "AI Agents for Scientific Discovery",
    description:
      "A rapid increase in research exploring how autonomous AI agents can accelerate scientific research, from hypothesis generation to experimental design.",
    trendType: "research_explosion",
    confidenceScore: 0.92,
    momentumScore: 0.88,
    growthRate: 340,
    evidence: [
      "24 new papers in 7 days",
      "3 major research labs involved",
      "Rapid citation acceleration",
      "Multiple preprint servers showing concurrent submissions",
    ],
    detectedAt: "2026-05-30",
    topic: { id: "9", name: "AI Agents", slug: "ai-agents" },
  },
  {
    id: "2",
    name: "Memory Architectures for Long-Horizon Robotics",
    description:
      "Growing convergence of memory systems research with robotic planning, focusing on enabling robots to operate effectively over extended time periods.",
    trendType: "emerging_concept",
    confidenceScore: 0.85,
    momentumScore: 0.76,
    growthRate: 180,
    evidence: [
      "12 new papers this month",
      "Cross-pollination from NLP memory research",
      "New benchmarks being established",
    ],
    detectedAt: "2026-05-28",
    topic: { id: "1", name: "Conversational Robotics", slug: "conversational-robotics" },
  },
  {
    id: "3",
    name: "Topological Methods in Machine Learning",
    description:
      "Increasing adoption of algebraic topology tools (persistent homology, Betti numbers) as features and architectural components in deep learning.",
    trendType: "novel_methodology",
    confidenceScore: 0.78,
    momentumScore: 0.82,
    growthRate: 220,
    evidence: [
      "Applications spanning drug discovery, protein folding, and computer vision",
      "New theoretical foundations being established",
      "Multiple tutorial papers published",
    ],
    detectedAt: "2026-05-25",
    topic: { id: "2", name: "Computational Biology", slug: "computational-biology" },
  },
  {
    id: "4",
    name: "Scaling Laws Beyond Language",
    description:
      "Research extending neural scaling law analysis to domains beyond language: scientific reasoning, robotics, and multi-modal systems.",
    trendType: "citation_acceleration",
    confidenceScore: 0.89,
    momentumScore: 0.91,
    growthRate: 290,
    evidence: [
      "Key papers gaining 50+ citations/week",
      "Every major lab publishing extensions",
      "New theoretical frameworks emerging",
    ],
    detectedAt: "2026-05-29",
  },
  {
    id: "5",
    name: "Quantum-Classical Hybrid Algorithms",
    description:
      "New approaches combining quantum and classical computing for practical advantages on near-term quantum hardware.",
    trendType: "interdisciplinary_convergence",
    confidenceScore: 0.83,
    momentumScore: 0.69,
    growthRate: 150,
    evidence: [
      "Convergence of quantum physics and ML communities",
      "Industry adoption signals",
      "New benchmark results",
    ],
    detectedAt: "2026-05-24",
    topic: { id: "6", name: "Quantum Computing", slug: "quantum-computing" },
  },
];

export async function GET() {
  return NextResponse.json({ trends: mockTrends });
}
