import { getScoreGaugeColor } from "@/types";
import { useEffect, useRef, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}

const sizeMap = {
  sm: {
    radius: 32,
    stroke: 5,
    fontSize: "text-lg",
    labelSize: "text-xs",
    dim: 80,
  },
  md: {
    radius: 50,
    stroke: 7,
    fontSize: "text-2xl",
    labelSize: "text-sm",
    dim: 120,
  },
  lg: {
    radius: 70,
    stroke: 9,
    fontSize: "text-4xl",
    labelSize: "text-base",
    dim: 160,
  },
};

export function ScoreGauge({
  score,
  size = "md",
  showLabel = true,
  animated = true,
}: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  const [displayProgress, setDisplayProgress] = useState(animated ? 0 : score);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const { radius, stroke, fontSize, labelSize, dim } = sizeMap[size];
  const circumference = 2 * Math.PI * radius;
  const gap = circumference * 0.25;
  const arc = circumference - gap;

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      setDisplayProgress(score);
      return;
    }

    const duration = 1200;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(eased * score);
      setDisplayScore(current);
      setDisplayProgress(eased * score);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [score, animated]);

  const strokeDashoffset = arc - (displayProgress / 100) * arc;
  const color = getScoreGaugeColor(score);

  const cx = dim / 2;
  const cy = dim / 2;
  const startAngle = 135;
  const endAngle = 405;

  // Convert to radians for the arc
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;

  const trackX1 = cx + radius * Math.cos(startRad);
  const trackY1 = cy + radius * Math.sin(startRad);
  const trackX2 = cx + radius * Math.cos(endRad);
  const trackY2 = cy + radius * Math.sin(endRad);

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: dim, height: dim }}
    >
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        className="rotate-0"
        role="img"
        aria-label={`Score: ${score} out of 100`}
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
          strokeDasharray={`${arc} ${circumference - arc}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
        />
        {/* Progress */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${arc - strokeDashoffset} ${circumference - (arc - strokeDashoffset)}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
        {/* Glow dots - start */}
        <circle cx={trackX1} cy={trackY1} r={stroke / 2} fill="var(--border)" />
        {/* Glow dots - end */}
        <circle cx={trackX2} cy={trackY2} r={stroke / 2} fill="var(--border)" />
      </svg>

      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-mono font-bold leading-none ${fontSize}`}
          style={{ color }}
        >
          {displayScore}
        </span>
        {showLabel && (
          <span
            className={`text-muted-foreground font-body mt-0.5 ${labelSize}`}
          >
            / 100
          </span>
        )}
      </div>
    </div>
  );
}
