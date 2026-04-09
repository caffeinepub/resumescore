import { CategoryScoreCard } from "@/components/CategoryScoreCard";
import { AnalyzingLoader } from "@/components/LoadingSpinner";
import { ScoreGauge } from "@/components/ScoreGauge";
import { TipCard } from "@/components/TipCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAnalyzeResume } from "@/hooks/useBackend";
import type { Analysis } from "@/types";
import { getScoreLevel } from "@/types";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  FileText,
  Trash2,
  Upload,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

const PLACEHOLDER = `John Doe
Senior Full Stack Developer
john@example.com | github.com/johndoe | linkedin.com/in/johndoe

SUMMARY
Experienced full stack developer with 5+ years building scalable web applications using React, TypeScript, Node.js, and AWS. Led teams of 4-6 engineers and delivered products used by 100K+ users.

SKILLS
JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, MongoDB, Docker, AWS, Git, REST APIs, GraphQL

EXPERIENCE
Senior Software Engineer — TechCorp (2021–Present)
• Built and shipped 3 major product features serving 100K+ active users
• Reduced API response time by 40% through query optimization and caching
• Led migration from monolith to microservices architecture
• Mentored 2 junior developers

Full Stack Developer — StartupXYZ (2019–2021)
• Developed React frontend and Node.js backend for SaaS platform
• Implemented CI/CD pipeline reducing deployment time by 60%

EDUCATION
B.S. Computer Science — State University (2019)

CERTIFICATIONS
AWS Certified Developer – Associate (2022)`;

const categoryLabels: Record<string, string> = {
  keywords: "Keywords & Tech Stack",
  experience: "Relevant Experience",
  technicalSkills: "Technical Skills",
  education: "Education & Certifications",
  formatting: "Formatting & Structure",
  clarity: "Overall Clarity & Impact",
};

export default function AnalyzePage() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [activeTab, setActiveTab] = useState("input");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const analyze = useAnalyzeResume();

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    const analysis = await analyze.mutateAsync(resumeText);
    setResult(analysis);
    setActiveTab("results");
  };

  const handleReset = () => {
    setResult(null);
    setResumeText("");
    setActiveTab("input");
  };

  const scoreLevel = result ? getScoreLevel(result.overallScore) : null;
  const scoreLevelConfig = {
    excellent: {
      label: "Excellent",
      icon: CheckCircle2,
      color: "text-emerald-400",
      badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    good: {
      label: "Good",
      icon: CheckCircle2,
      color: "text-yellow-400",
      badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    },
    fair: {
      label: "Fair",
      icon: AlertCircle,
      color: "text-yellow-500",
      badge: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
    },
    poor: {
      label: "Needs Work",
      icon: AlertCircle,
      color: "text-red-400",
      badge: "bg-red-500/15 text-red-400 border-red-500/30",
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12" data-ocid="analyze-page">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2">
          Resume Analysis
        </h1>
        <p className="text-muted-foreground">
          Paste your resume below and get an AI-powered score with actionable
          improvement tips.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="analyze-tabs"
      >
        <TabsList className="bg-secondary/50 border border-border mb-6">
          <TabsTrigger
            value="input"
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            Input
          </TabsTrigger>
          <TabsTrigger
            value="results"
            disabled={!result}
            className="data-[state=active]:bg-card data-[state=active]:text-foreground"
          >
            Results
          </TabsTrigger>
        </TabsList>

        {/* Input Tab */}
        <TabsContent value="input">
          <AnimatePresence mode="wait">
            {analyze.isPending ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-card border border-border rounded-xl"
              >
                <AnalyzingLoader />
              </motion.div>
            ) : (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Upload zone */}
                <button
                  type="button"
                  className="w-full bg-card border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:border-primary/40 transition-smooth cursor-pointer group"
                  onClick={() => textareaRef.current?.focus()}
                  data-ocid="upload-zone"
                  aria-label="Click to focus resume text input"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <Upload className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Paste your resume text below or click to focus
                  </p>
                </button>

                {/* Textarea */}
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder={PLACEHOLDER}
                    className="w-full h-64 bg-card border border-border rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground/40 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-smooth"
                    data-ocid="resume-textarea"
                    aria-label="Resume text input"
                  />
                  {resumeText && (
                    <button
                      type="button"
                      className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                      onClick={() => setResumeText("")}
                      aria-label="Clear resume text"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Word count */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {resumeText.trim().split(/\s+/).filter(Boolean).length}{" "}
                    words
                  </span>
                  {resumeText.length > 0 && resumeText.length < 100 && (
                    <span className="text-yellow-500">
                      Add more content for better analysis
                    </span>
                  )}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 shadow-elevated gap-2"
                  onClick={handleAnalyze}
                  disabled={!resumeText.trim() || resumeText.trim().length < 50}
                  data-ocid="analyze-submit"
                >
                  <FileText className="w-4 h-4" />
                  Analyze Resume <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score Overview */}
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="shrink-0 flex flex-col items-center gap-3">
                    <ScoreGauge
                      score={result.overallScore}
                      size="lg"
                      animated
                    />
                    {scoreLevel && (
                      <Badge
                        className={`px-3 py-1 border font-medium ${scoreLevelConfig[scoreLevel].badge}`}
                        variant="outline"
                        data-ocid="score-level-badge"
                      >
                        {scoreLevelConfig[scoreLevel].label}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                      Overall Score
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {result.summary}
                    </p>
                    {result.topSkills.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                          Top Skills Identified
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.topSkills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="bg-primary/10 text-primary border-primary/30 text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Category Scores */}
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                  Category Breakdown
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {Object.entries(result.categoryScores).map(([key, score]) => (
                    <CategoryScoreCard
                      key={key}
                      label={categoryLabels[key] ?? key}
                      categoryKey={key}
                      score={score as number}
                      tips={result.tips}
                    />
                  ))}
                </div>
              </div>

              {/* Improvement Tips */}
              {result.tips.length > 0 && (
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                    Improvement Tips
                  </h3>
                  <div className="space-y-3">
                    {result.tips
                      .sort((a, b) => {
                        const order = { high: 0, medium: 1, low: 2 };
                        return order[a.priority] - order[b.priority];
                      })
                      .map((tip) => (
                        <TipCard key={tip.id} tip={tip} />
                      ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="border-border hover:bg-secondary"
                  onClick={handleReset}
                  data-ocid="analyze-again-btn"
                >
                  Analyze Another Resume
                </Button>
              </div>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
