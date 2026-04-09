import { createActor } from "@/backend";
import type { Analysis, AnalysisSummary, Tip } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Helper to simulate analysis from plain backend call
// Since backend.d.ts is minimal, we build a local analysis engine for demo
function analyzeResumeLocally(resumeText: string): Analysis {
  const text = resumeText.toLowerCase();

  const keywords = Math.min(
    100,
    40 +
      (text.includes("javascript") ? 8 : 0) +
      (text.includes("typescript") ? 8 : 0) +
      (text.includes("react") ? 7 : 0) +
      (text.includes("node") ? 6 : 0) +
      (text.includes("python") ? 6 : 0) +
      (text.includes("aws") ? 5 : 0) +
      (text.includes("docker") ? 5 : 0) +
      (text.includes("sql") ? 5 : 0) +
      (text.includes("git") ? 5 : 0) +
      (text.includes("api") ? 5 : 0),
  );

  const experience = Math.min(
    100,
    30 +
      (text.includes("years") ? 15 : 0) +
      (text.includes("senior") ? 15 : 0) +
      (text.includes("lead") ? 12 : 0) +
      (text.includes("manager") ? 10 : 0) +
      (text.includes("built") ? 8 : 0) +
      (text.includes("developed") ? 8 : 0) +
      (text.includes("launched") ? 7 : 0),
  );

  const technicalSkills = Math.min(
    100,
    35 +
      (text.includes("javascript") || text.includes("typescript") ? 12 : 0) +
      (text.includes("react") ||
      text.includes("vue") ||
      text.includes("angular")
        ? 10
        : 0) +
      (text.includes("backend") ||
      text.includes("node") ||
      text.includes("python")
        ? 10
        : 0) +
      (text.includes("database") ||
      text.includes("sql") ||
      text.includes("mongo")
        ? 8
        : 0) +
      (text.includes("cloud") || text.includes("aws") || text.includes("azure")
        ? 8
        : 0) +
      (text.includes("ci/cd") ||
      text.includes("devops") ||
      text.includes("docker")
        ? 7
        : 0),
  );

  const education = Math.min(
    100,
    40 +
      (text.includes("bachelor") ||
      text.includes("b.s.") ||
      text.includes("bs ")
        ? 15
        : 0) +
      (text.includes("master") || text.includes("m.s.") ? 20 : 0) +
      (text.includes("phd") || text.includes("doctorate") ? 25 : 0) +
      (text.includes("computer science") || text.includes("software")
        ? 10
        : 0) +
      (text.includes("certification") || text.includes("certified") ? 10 : 0),
  );

  const formatting = Math.min(
    100,
    50 +
      (resumeText.length > 500 ? 10 : 0) +
      (resumeText.length > 1000 ? 10 : 0) +
      (resumeText.includes("\n") ? 10 : 0) +
      (text.includes("summary") || text.includes("objective") ? 10 : 0) +
      (text.includes("experience") ? 10 : 0),
  );

  const clarity = Math.min(
    100,
    45 +
      (text.includes("achieved") || text.includes("improved") ? 10 : 0) +
      (text.includes("%") || text.includes("percent") ? 10 : 0) +
      (text.includes("team") ? 8 : 0) +
      (text.includes("project") ? 8 : 0) +
      (text.includes("delivered") || text.includes("shipped") ? 9 : 0) +
      (text.includes("designed") || text.includes("implemented") ? 10 : 0),
  );

  const overall = Math.round(
    keywords * 0.2 +
      experience * 0.25 +
      technicalSkills * 0.2 +
      education * 0.15 +
      formatting * 0.1 +
      clarity * 0.1,
  );

  const tips: Tip[] = [];
  if (keywords < 70)
    tips.push({
      id: "t1",
      category: "Keywords",
      text: "Add more industry-specific keywords relevant to your target role. Recruiters use ATS systems that scan for these.",
      priority: "high" as const,
    });
  if (experience < 60)
    tips.push({
      id: "t2",
      category: "Experience",
      text: "Quantify your achievements with metrics (e.g., 'Reduced load time by 40%'). Numbers make impact tangible.",
      priority: "high" as const,
    });
  if (technicalSkills < 65)
    tips.push({
      id: "t3",
      category: "Technical Skills",
      text: "Add a dedicated skills section listing frameworks, languages, and tools. Be specific about proficiency levels.",
      priority: "medium" as const,
    });
  if (education < 55)
    tips.push({
      id: "t4",
      category: "Education",
      text: "Include your degree, institution, and graduation year. Add relevant certifications (AWS, GCP, etc.).",
      priority: "medium" as const,
    });
  if (formatting < 65)
    tips.push({
      id: "t5",
      category: "Formatting",
      text: "Use clear section headers, consistent bullet points, and proper spacing. A clean layout aids readability.",
      priority: "low" as const,
    });
  if (clarity < 60)
    tips.push({
      id: "t6",
      category: "Clarity",
      text: "Use strong action verbs (built, shipped, designed, led). Begin each bullet with a verb for impact.",
      priority: "medium" as const,
    });
  tips.push({
    id: "t7",
    category: "General",
    text: "Tailor your resume for each job posting. Mirror the language used in the job description.",
    priority: "high" as const,
  });
  if (overall >= 75)
    tips.push({
      id: "t8",
      category: "General",
      text: "Strong resume! Consider adding a GitHub portfolio link and open-source contributions to stand out further.",
      priority: "low" as const,
    });

  const skillsFound = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "SQL",
    "Git",
    "GraphQL",
    "MongoDB",
    "REST APIs",
  ].filter((s) => text.includes(s.toLowerCase()));

  return {
    id: `analysis-${Date.now()}`,
    resumeText,
    overallScore: overall,
    categoryScores: {
      keywords,
      experience,
      technicalSkills,
      education,
      formatting,
      clarity,
    },
    tips,
    topSkills: skillsFound.slice(0, 6),
    summary:
      overall >= 75
        ? "Strong resume with good technical depth and clear experience narrative."
        : overall >= 50
          ? "Decent resume with room to improve keyword density and quantifiable achievements."
          : "Resume needs significant improvement in technical skills coverage and experience clarity.",
    createdAt: BigInt(Date.now()) * 1_000_000n,
  };
}

let localAnalyses: Analysis[] = [];

export function useAnalyzeResume() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (resumeText: string): Promise<Analysis> => {
      if (actor) {
        try {
          // Try real backend call
          const result = await (
            actor as unknown as {
              analyzeResume: (t: string) => Promise<Analysis>;
            }
          ).analyzeResume(resumeText);
          return result;
        } catch {
          // Fall back to local analysis
        }
      }
      const analysis = analyzeResumeLocally(resumeText);
      localAnalyses = [analysis, ...localAnalyses];
      return analysis;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analyses"] });
    },
  });
}

export function useListAnalyses() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<AnalysisSummary[]>({
    queryKey: ["analyses"],
    queryFn: async () => {
      if (actor && !isFetching) {
        try {
          const result = await (
            actor as unknown as {
              listAnalyses: () => Promise<AnalysisSummary[]>;
            }
          ).listAnalyses();
          return result;
        } catch {
          // Fall back to local
        }
      }
      return localAnalyses.map((a) => ({
        id: a.id,
        overallScore: a.overallScore,
        summary: a.summary,
        topSkills: a.topSkills,
        createdAt: a.createdAt,
      }));
    },
    enabled: true,
    refetchInterval: 5000,
  });
}

export function useGetAnalysis(id: string | undefined) {
  const { actor } = useActor(createActor);

  return useQuery<Analysis | null>({
    queryKey: ["analysis", id],
    queryFn: async () => {
      if (!id) return null;
      if (actor) {
        try {
          const result = await (
            actor as unknown as {
              getAnalysis: (id: string) => Promise<Analysis | null>;
            }
          ).getAnalysis(id);
          return result;
        } catch {
          // Fall back to local
        }
      }
      return localAnalyses.find((a) => a.id === id) ?? null;
    },
    enabled: !!id,
  });
}

export function useDeleteAnalysis() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      if (actor) {
        try {
          const result = await (
            actor as unknown as {
              deleteAnalysis: (id: string) => Promise<boolean>;
            }
          ).deleteAnalysis(id);
          return result;
        } catch {
          // Fall back to local
        }
      }
      localAnalyses = localAnalyses.filter((a) => a.id !== id);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["analyses"] });
    },
  });
}
