import { ReactNode } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
  target?: string;
  delta?: number;
  deltaLabel?: string;
  subLabel?: string;
  subValue?: string | number;
  subBadge?: number;
  sparkColor?: string;
}

export function MetricCard({
  icon,
  label,
  value,
  suffix,
  target,
  delta,
  deltaLabel,
  subLabel,
  subValue,
  subBadge,
  sparkColor = "var(--chart-1)",
}: MetricCardProps) {
  const isPositive = delta !== undefined && delta >= 0;

  return (
    <div
      className="rounded-xl border border-border p-4 flex flex-col gap-2 min-w-0 h-full shadow-sm transition-colors duration-200"
      style={{ backgroundColor: "var(--card)" }}
    >
      <div className="flex items-center gap-1.5 text-muted-foreground" style={{ fontSize: 12 }}>
        <span style={{ color: "var(--primary)" }}>{icon}</span>
        <span>{label}</span>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-foreground" style={{ fontSize: 28, fontWeight: 600, lineHeight: 1 }}>
          {value}
        </span>
        {suffix && (
          <span className="text-muted-foreground mb-0.5" style={{ fontSize: 14 }}>{suffix}</span>
        )}
      </div>

      <div className="h-7 w-full">
        <svg viewBox="0 0 80 28" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            points="0,24 15,18 30,20 45,10 60,8 80,4"
            fill="none"
            stroke={sparkColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="flex items-center justify-between" style={{ fontSize: 11 }}>
        <span className="text-muted-foreground">{target}</span>
        {delta !== undefined && (
          <span
            className="flex items-center gap-0.5"
            style={{ color: isPositive ? "var(--status-success-fg)" : "var(--status-error-fg)" }}
          >
            {isPositive
              ? <TrendingUpIcon style={{ fontSize: 13 }} />
              : <TrendingDownIcon style={{ fontSize: 13 }} />}
            {isPositive ? "+" : ""}{delta}{deltaLabel}
          </span>
        )}
      </div>

      {subLabel && (
        <div className="flex items-center justify-between border-t border-border pt-2 mt-1" style={{ fontSize: 11 }}>
          <span className="text-muted-foreground">{subLabel}: {subValue}</span>
          {subBadge !== undefined && (
            <span style={{ color: "var(--primary)", fontWeight: 500 }}>{subBadge}%</span>
          )}
        </div>
      )}
    </div>
  );
}
