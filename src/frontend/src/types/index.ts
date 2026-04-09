export type Priority = "high" | "medium" | "low";

export interface Tip {
  id: string;
  category: string;
  text: string;
  priority: Priority;
}

export interface CategoryScores {
  keywords: number;
  experience: number;
  technicalSkills: number;
  education: number;
  formatting: number;
  clarity: number;
}

export interface Analysis {
  id: string;
  resumeText: string;
  overallScore: number;
  categoryScores: CategoryScores;
  tips: Tip[];
  topSkills: string[];
  summary: string;
  createdAt: bigint;
}

export interface AnalysisSummary {
  id: string;
  overallScore: number;
  summary: string;
  topSkills: string[];
  createdAt: bigint;
}

export type ScoreLevel = "excellent" | "good" | "fair" | "poor";

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 75) return "excellent";
  if (score >= 50) return "good";
  if (score >= 30) return "fair";
  return "poor";
}

export function getScoreColor(score: number): string {
  if (score >= 75) return "text-emerald-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

export function getScoreGaugeColor(score: number): string {
  if (score >= 75) return "oklch(0.72 0.17 150)";
  if (score >= 50) return "oklch(0.82 0.17 85)";
  return "oklch(0.65 0.19 22)";
}

export function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
