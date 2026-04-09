import { Badge } from "@/components/ui/badge";
import type { Tip } from "@/types";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";

interface TipCardProps {
  tip: Tip;
  compact?: boolean;
}

const priorityConfig = {
  high: {
    label: "High",
    icon: AlertTriangle,
    badgeClass: "bg-red-500/15 text-red-400 border-red-500/30",
    iconClass: "text-red-400",
  },
  medium: {
    label: "Medium",
    icon: Info,
    badgeClass: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    iconClass: "text-yellow-400",
  },
  low: {
    label: "Low",
    icon: Lightbulb,
    badgeClass: "bg-primary/15 text-primary border-primary/30",
    iconClass: "text-primary",
  },
};

export function TipCard({ tip, compact = false }: TipCardProps) {
  const config = priorityConfig[tip.priority];
  const Icon = config.icon;

  if (compact) {
    return (
      <div className="flex items-start gap-2 py-1" data-ocid="tip-card-compact">
        <Icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${config.iconClass}`} />
        <p className="text-xs text-muted-foreground leading-relaxed">
          {tip.text}
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-smooth"
      data-ocid="tip-card"
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-1.5 rounded-md bg-card border ${config.badgeClass} shrink-0`}
        >
          <Icon className={`w-3.5 h-3.5 ${config.iconClass}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-sm font-medium text-foreground">
              {tip.category}
            </span>
            <Badge
              className={`text-xs px-2 py-0.5 border font-medium ${config.badgeClass}`}
              variant="outline"
            >
              {config.label} Priority
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {tip.text}
          </p>
        </div>
      </div>
    </div>
  );
}
