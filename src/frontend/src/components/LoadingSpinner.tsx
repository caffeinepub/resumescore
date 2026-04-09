interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

export function LoadingSpinner({
  size = "md",
  label,
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      aria-label={label ?? "Loading"}
    >
      <div className={`${sizeMap[size]} relative`}>
        <svg
          className={`animate-spin ${sizeMap[size]}`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="oklch(0.24 0 0)"
            strokeWidth="3"
          />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="oklch(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 4px oklch(var(--primary)))" }}
          />
        </svg>
      </div>
      {label && (
        <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
      )}
    </div>
  );
}

export function AnalyzingLoader() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 py-16"
      data-ocid="analyzing-loader"
    >
      <div className="relative w-20 h-20">
        <svg
          className="animate-spin w-20 h-20"
          viewBox="0 0 80 80"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="40"
            cy="40"
            r="34"
            stroke="oklch(0.24 0 0)"
            strokeWidth="4"
          />
          <path
            d="M40 6a34 34 0 0 1 34 34"
            stroke="oklch(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 8px oklch(var(--primary)))" }}
          />
          <path
            d="M40 6a34 34 0 0 0 -34 34"
            stroke="oklch(var(--accent) / 0.5)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-foreground font-display font-semibold text-lg">
          Analyzing Resume
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Scoring across 6 dimensions…
        </p>
      </div>
      <div className="flex gap-1.5" aria-hidden="true">
        {[
          "Keywords",
          "Experience",
          "Skills",
          "Education",
          "Formatting",
          "Clarity",
        ].map((cat, i) => (
          <div
            key={cat}
            className="h-1.5 rounded-full bg-primary/40 animate-pulse"
            style={{ width: 48, animationDelay: `${i * 0.15}s` }}
            title={cat}
          />
        ))}
      </div>
    </div>
  );
}
