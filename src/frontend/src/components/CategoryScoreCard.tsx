import { Badge } from "@/components/ui/badge";
import type { Tip } from "@/types";
import { getScoreColor } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { TipCard } from "./TipCard";

interface CategoryScoreCardProps {
  label: string;
  categoryKey: string;
  score: number;
  tips?: Tip[];
  icon?: React.ReactNode;
}

export function CategoryScoreCard({
  label,
  categoryKey,
  score,
  tips = [],
  icon,
}: CategoryScoreCardProps) {
  const [expanded, setExpanded] = useState(false);
  const relevantTips = tips.filter(
    (t) => t.category.toLowerCase() === categoryKey.toLowerCase(),
  );
  const hasExpansion = relevantTips.length > 0;
  const scoreColor = getScoreColor(score);

  const barWidth = `${score}%`;
  const barColor =
    score >= 75
      ? "bg-emerald-500"
      : score >= 50
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <div
      className={`bg-secondary/30 border border-border rounded-lg overflow-hidden transition-smooth ${
        hasExpansion ? "cursor-pointer hover:border-primary/40" : ""
      }`}
      data-ocid={`category-card-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div
        className="px-4 py-3 flex items-center gap-3"
        onClick={() => hasExpansion && setExpanded((e) => !e)}
        role={hasExpansion ? "button" : undefined}
        aria-expanded={hasExpansion ? expanded : undefined}
        tabIndex={hasExpansion ? 0 : undefined}
        onKeyDown={(e) => {
          if (hasExpansion && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setExpanded((prev) => !prev);
          }
        }}
      >
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-foreground truncate">
              {label}
            </span>
            <div className="flex items-center gap-2 ml-2 shrink-0">
              <span className={`font-mono text-sm font-bold ${scoreColor}`}>
                {score}
              </span>
              {hasExpansion &&
                (expanded ? (
                  <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                ))}
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
              style={{ width: barWidth }}
            />
          </div>
        </div>
      </div>

      {/* Expanded tips */}
      {expanded && relevantTips.length > 0 && (
        <div className="px-4 pb-3 pt-1 border-t border-border/50 space-y-2">
          {relevantTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} compact />
          ))}
        </div>
      )}
    </div>
  );
}
