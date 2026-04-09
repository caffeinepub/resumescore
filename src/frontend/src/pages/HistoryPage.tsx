import { ScoreGauge } from "@/components/ScoreGauge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteAnalysis, useListAnalyses } from "@/hooks/useBackend";
import { formatDate, getScoreLevel } from "@/types";
import { Link } from "@tanstack/react-router";
import { BarChart2, ChevronRight, ClipboardList, Trash2 } from "lucide-react";
import { motion } from "motion/react";

const scoreLevelBadge: Record<string, string> = {
  excellent: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  good: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  fair: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
  poor: "bg-red-500/15 text-red-400 border-red-500/30",
};

const scoreLevelLabel: Record<string, string> = {
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  poor: "Needs Work",
};

export default function HistoryPage() {
  const { data: analyses, isLoading } = useListAnalyses();
  const deleteAnalysis = useDeleteAnalysis();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12" data-ocid="history-page">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2">
            Analysis History
          </h1>
          <p className="text-muted-foreground">
            Review past resume analyses and track your improvement over time.
          </p>
        </div>
        <Link to="/analyze">
          <Button
            className="bg-primary text-primary-foreground hover:opacity-90 shadow-elevated gap-2 hidden sm:flex"
            data-ocid="history-analyze-cta"
          >
            <BarChart2 className="w-4 h-4" /> New Analysis
          </Button>
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-5 space-y-3"
            >
              <Skeleton className="h-4 w-24 bg-secondary" />
              <Skeleton className="h-16 w-16 rounded-full mx-auto bg-secondary" />
              <Skeleton className="h-3 w-full bg-secondary" />
              <Skeleton className="h-3 w-2/3 bg-secondary" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && (!analyses || analyses.length === 0) && (
        <motion.div
          className="flex flex-col items-center justify-center py-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          data-ocid="history-empty"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
            <ClipboardList className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-display font-semibold text-xl text-foreground mb-2">
            No analyses yet
          </h2>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Analyze your first resume to see scores, breakdowns, and improvement
            tips here.
          </p>
          <Link to="/analyze">
            <Button
              className="bg-primary text-primary-foreground hover:opacity-90 gap-2"
              data-ocid="empty-analyze-cta"
            >
              Analyze a Resume <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      )}

      {/* Analyses grid */}
      {!isLoading && analyses && analyses.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyses.map((analysis, i) => {
            const level = getScoreLevel(analysis.overallScore);
            return (
              <motion.div
                key={analysis.id}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-smooth group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid="history-card"
              >
                {/* Delete button */}
                <button
                  type="button"
                  className="absolute top-3 right-3 p-1.5 rounded-md text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-smooth opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteAnalysis.mutate(analysis.id);
                  }}
                  aria-label="Delete analysis"
                  data-ocid="history-delete-btn"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/history/$id"
                  params={{ id: analysis.id }}
                  className="block"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <ScoreGauge
                      score={analysis.overallScore}
                      size="sm"
                      animated={false}
                    />
                    <div className="flex-1 min-w-0">
                      <Badge
                        className={`text-xs px-2 py-0.5 border mb-1 ${scoreLevelBadge[level]}`}
                        variant="outline"
                      >
                        {scoreLevelLabel[level]}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(analysis.createdAt)}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {analysis.summary}
                  </p>

                  {analysis.topSkills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.topSkills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="bg-secondary/50 text-muted-foreground border-border text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {analysis.topSkills.length > 3 && (
                        <Badge
                          variant="outline"
                          className="bg-secondary/50 text-muted-foreground border-border text-xs"
                        >
                          +{analysis.topSkills.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-smooth">
                    View Details <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
