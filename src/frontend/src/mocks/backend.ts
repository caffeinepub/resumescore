import type { backendInterface, Analysis, AnalysisSummary } from "../backend";
import { Priority } from "../backend";

const sampleAnalysis: Analysis = {
  id: BigInt(1),
  overallScore: BigInt(72),
  resumeText: "John Doe | Software Engineer\nExperience: 5 years React, Node.js\nEducation: B.S. Computer Science",
  timestamp: BigInt(Date.now() * 1000000),
  categoryScores: {
    formatting: BigInt(80),
    education: BigInt(70),
    clarity: BigInt(75),
    experience: BigInt(85),
    keywords: BigInt(60),
    skills: BigInt(65),
  },
  tips: [
    {
      text: "Add measurable achievements with numbers and percentages to your experience section.",
      category: "experience",
      priority: Priority.high,
    },
    {
      text: "Include more industry-relevant keywords to pass ATS screening systems.",
      category: "keywords",
      priority: Priority.high,
    },
    {
      text: "List your technical skills in a dedicated section for better visibility.",
      category: "skills",
      priority: Priority.medium,
    },
    {
      text: "Use consistent bullet point formatting throughout your resume.",
      category: "formatting",
      priority: Priority.low,
    },
  ],
};

const sampleSummary: AnalysisSummary = {
  id: BigInt(1),
  overallScore: BigInt(72),
  snippet: "John Doe | Software Engineer\nExperience: 5 years React, Node.js",
  timestamp: BigInt(Date.now() * 1000000),
  categoryScores: {
    formatting: BigInt(80),
    education: BigInt(70),
    clarity: BigInt(75),
    experience: BigInt(85),
    keywords: BigInt(60),
    skills: BigInt(65),
  },
};

export const mockBackend: backendInterface = {
  analyzeResume: async (_resumeText: string) => ({
    __kind__: "ok" as const,
    ok: sampleAnalysis,
  }),
  deleteAnalysis: async (_id) => true,
  getAnalysis: async (_id) => sampleAnalysis,
  listAnalyses: async () => [sampleSummary],
};
