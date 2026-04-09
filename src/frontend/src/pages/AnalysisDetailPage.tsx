import { CategoryScoreCard } from "@/components/CategoryScoreCard";
import { ScoreGauge } from "@/components/ScoreGauge";
import { TipCard } from "@/components/TipCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAnalysis } from "@/hooks/useBackend";
import { formatDate, getScoreLevel } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, ChevronRight, FileText } from "lucide-react";
import { motion } from "motion/react";

const categoryLabels: Record<string, string> = {
  keywords: "Keywords & Tech Stack",
  experience: "Relevant Experience",
  technicalSkills: "Technical Skills",
  education: "Education & Certifications",
  formatting: "Formatting & Structure",
  clarity: "Overall Clarity & Impact",
};

const scoreLevelConfig: Record<string, { label: string; badge: string }> = {
  excellent: {
    label: "Excellent",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  good: {
    label: "Good",
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  },
  fair: {
    label: "Fair",
    badge: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
  },
  poor: {
    label: "Needs Work",
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
  },
};

export default function AnalysisDetailPage() {
  const { id } = useParams({ from: "/history/$id" });
  const { data: analysis, isLoading } = useGetAnalysis(id);

  if (isLoading) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-12 space-y-6"
        data-ocid="detail-loading"
      >
        <Skeleton className="h-8 w-48 bg-secondary" />
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex gap-8">
            <Skeleton className="h-40 w-40 rounded-full bg-secondary" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-32 bg-secondary" />
              <Skeleton className="h-4 w-full bg-secondary" />
              <Skeleton className="h-4 w-3/4 bg-secondary" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div
        className="max-w-4xl mx-auto px-4 py-12 text-center"
        data-ocid="detail-not-found"
      >
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-4 mx-auto">
          <FileText className="w-7 h-7 text-destructive" />
        </div>
        <h2 className="font-display font-semibold text-xl text-foreground mb-2">
          Analysis not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This analysis may have been deleted or doesn't exist.
        </p>
        <Link to="/history">
          <Button variant="outline" className="border-border gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to History
          </Button>
        </Link>
      </div>
    );
  }

  const level = getScoreLevel(analysis.overallScore);
  const cfg = scoreLevelConfig[level];

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-12 space-y-6"
      data-ocid="detail-page"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to="/history"
          className="hover:text-foreground transition-colors duration-200 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> History
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground">Analysis Detail</span>
      </div>

      {/* Overview card */}
      <motion.div
        className="bg-card border border-border rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0 flex flex-col items-center gap-3">
            <ScoreGauge score={analysis.overallScore} size="lg" animated />
            <Badge
              className={`px-3 py-1 border font-medium ${cfg.badge}`}
              variant="outline"
            >
              {cfg.label}
            </Badge>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(analysis.createdAt)}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {analysis.summary}
            </p>

            {analysis.topSkills.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
                  Identified Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.topSkills.map((skill) => (
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
      </motion.div>

      {/* Category Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="font-display font-semibold text-lg text-foreground mb-3">
          Category Breakdown
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {Object.entries(analysis.categoryScores).map(([key, score]) => (
            <CategoryScoreCard
              key={key}
              label={categoryLabels[key] ?? key}
              categoryKey={key}
              score={score as number}
              tips={analysis.tips}
            />
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      {analysis.tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display font-semibold text-lg text-foreground mb-3">
            Improvement Tips
          </h2>
          <div className="space-y-3">
            {analysis.tips
              .sort((a, b) => {
                const order = { high: 0, medium: 1, low: 2 };
                return order[a.priority] - order[b.priority];
              })
              .map((tip) => (
                <TipCard key={tip.id} tip={tip} />
              ))}
          </div>
        </motion.div>
      )}

      {/* Resume text */}
      {analysis.resumeText && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display font-semibold text-lg text-foreground mb-3">
            Resume Text
          </h2>
          <div className="bg-card border border-border rounded-xl p-4">
            <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap leading-relaxed overflow-auto max-h-64">
              {analysis.resumeText}
            </pre>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Link to="/history">
          <Button
            variant="outline"
            className="border-border hover:bg-secondary gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to History
          </Button>
        </Link>
        <Link to="/analyze">
          <Button
            className="bg-primary text-primary-foreground hover:opacity-90 gap-2"
            data-ocid="detail-analyze-again"
          >
            Analyze Another <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
