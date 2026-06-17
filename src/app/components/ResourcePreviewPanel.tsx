import React, { useMemo, useState } from "react";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DataSourceConfig, analyzeDataStructure } from "./dataSourceInference";

type ChartType = "line" | "bar" | "pie";

const CHART_COLORS = ["#4f6ef7", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const SOURCE_COLOR: Record<string, string> = {
  "Space Utilization":    "#4f6ef7",
  "Employee Satisfaction":"#10b981",
  "Energy Efficiency":    "#f59e0b",
  "Booking Rate":         "#8b5cf6",
  "Active Employees":     "#ec4899",
};

const PREVIEW_METRIC: Record<string, { value: string | number; unit: string; trend: number; target: string }> = {
  "Space Utilization":    { value: 78,      unit: "%",  trend: 3,   target: "Target: 75%" },
  "Employee Satisfaction":{ value: 4.6,     unit: "/5", trend: 0.2, target: "Target: 4.5" },
  "Energy Efficiency":    { value: 82,      unit: "%",  trend: 5,   target: "Target: 80%" },
  "Booking Rate":         { value: 91,      unit: "%",  trend: 7,   target: "Target: 85%" },
  "Active Employees":     { value: "2,847", unit: "",   trend: 47,  target: "Capacity: 3,000" },
};

// ── Shared ghost placeholder ──────────────────────────────────────────────────

const GhostCell: React.FC<{ height: number }> = ({ height }) => (
  <div style={{
    height,
    borderRadius: 10,
    border: "1.5px dashed #c8cfe0",
    background: "rgba(255,255,255,0.45)",
  }} />
);

// ── Small: compact metric + sparkline ─────────────────────────────────────────

const SmallWidget: React.FC<{ sourceName: string; dataSource: DataSourceConfig }> = ({ sourceName, dataSource }) => {
  const color = SOURCE_COLOR[sourceName] ?? "#4f6ef7";
  const fallback = dataSource.metrics?.[0];
  const pm = PREVIEW_METRIC[sourceName] ?? {
    value: fallback?.value ?? "—",
    unit: fallback?.unit ?? "",
    trend: fallback?.trend ?? 0,
    target: "",
  };
  const isPos = pm.trend >= 0;

  return (
    <div style={{
      background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb",
      padding: "10px 12px", display: "flex", flexDirection: "column", gap: 4, height: 100,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 500, color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {sourceName}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#111827", lineHeight: 1 }}>{pm.value}</span>
        {pm.unit && <span style={{ fontSize: 10, color: "#6b7280", marginBottom: 1 }}>{pm.unit}</span>}
      </div>

      <div style={{ flex: 1, minHeight: 0 }}>
        <svg viewBox="0 0 80 18" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
          <polyline
            points="0,16 15,10 30,12 45,5 60,4 80,1"
            fill="none" stroke={color} strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 8, color: "#9ca3af" }}>{pm.target}</span>
        <span style={{ fontSize: 9, display: "flex", alignItems: "center", gap: 1, color: isPos ? "#16a34a" : "#ef4444" }}>
          {isPos ? <TrendingUpIcon style={{ fontSize: 10 }} /> : <TrendingDownIcon style={{ fontSize: 10 }} />}
          {isPos ? "+" : ""}{pm.trend}{pm.unit === "%" ? "%" : ""}
        </span>
      </div>
    </div>
  );
};

// ── Medium: chart with MUI chart-type switcher ────────────────────────────────

const MediumWidget: React.FC<{ sourceName: string; dataSource: DataSourceConfig }> = ({ sourceName, dataSource }) => {
  const [chartType, setChartType] = useState<ChartType>("line");
  const color = SOURCE_COLOR[sourceName] ?? "#4f6ef7";

  const { data, xKey, dataKeys } = useMemo(() => {
    if (dataSource.timeSeries?.length) {
      const keys = Object.keys(dataSource.timeSeries[0]);
      return { data: dataSource.timeSeries, xKey: keys[0], dataKeys: keys.slice(1, 3) };
    }
    return { data: [], xKey: "x", dataKeys: [] };
  }, [dataSource]);

  const pieData = useMemo(() =>
    dataSource.categories?.map((c, i) => ({ ...c, fill: c.color || CHART_COLORS[i % CHART_COLORS.length] })) ?? [],
    [dataSource]
  );

  const showPieLegend = chartType === "pie" && pieData.length > 0;

  return (
    <div style={{
      background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb",
      padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8,
      height: showPieLegend ? 200 : 180,
    }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 500, color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {sourceName}
          </span>
        </div>

        <ToggleButtonGroup
          exclusive
          value={chartType}
          onChange={(_, v) => { if (v) setChartType(v); }}
          size="small"
          onClick={e => e.stopPropagation()}
          sx={{
            gap: "2px",
            "& .MuiToggleButtonGroup-grouped": {
              border: "1px solid #e5e7eb !important",
              borderRadius: "6px !important",
              padding: "2px 5px",
              minWidth: 0,
              color: "#9ca3af",
              "&.Mui-selected": {
                backgroundColor: "#4f6ef7",
                color: "#fff",
                "&:hover": { backgroundColor: "#3d5ee8" },
              },
              "&:hover:not(.Mui-selected)": { backgroundColor: "#f3f4f6" },
            },
          }}
        >
          <ToggleButton value="line" disableRipple title="Line chart">
            <ShowChartOutlinedIcon style={{ fontSize: 12 }} />
          </ToggleButton>
          <ToggleButton value="bar" disableRipple title="Bar chart">
            <BarChartOutlinedIcon style={{ fontSize: 12 }} />
          </ToggleButton>
          <ToggleButton value="pie" disableRipple title="Pie chart">
            <DonutLargeOutlinedIcon style={{ fontSize: 12 }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Chart */}
      <div style={{ height: 128, flexShrink: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
            <LineChart data={data} margin={{ top: 4, right: 6, bottom: 0, left: -22 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 7, fill: "#9ca3af" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 7, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
              {dataKeys.map((k, i) => (
                <Line key={k} type="monotone" dataKey={k} stroke={CHART_COLORS[i]} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          ) : chartType === "bar" ? (
            <BarChart data={data} margin={{ top: 4, right: 6, bottom: 0, left: -22 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 7, fill: "#9ca3af" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 7, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
              {dataKeys.map((k, i) => (
                <Bar key={k} dataKey={k} fill={CHART_COLORS[i]} radius={[3, 3, 0, 0]} />
              ))}
            </BarChart>
          ) : (
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={52} dataKey="count" paddingAngle={2}>
                {pieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, border: "1px solid #e5e7eb" }} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Pie legend */}
      {showPieLegend && (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3px 8px", flexShrink: 0 }}>
          {pieData.map(item => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 8, color: "#6b7280" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.fill }} />
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Large: data table ─────────────────────────────────────────────────────────

const statusStyle = (val: string): React.CSSProperties => {
  const s = val.toLowerCase();
  if (s.includes("active") || s.includes("won") || s.includes("progress") || s.includes("review"))
    return { background: "#d1fae5", color: "#065f46" };
  if (s.includes("pending") || s.includes("negotiation") || s.includes("todo") || s.includes("to do"))
    return { background: "#fef3c7", color: "#92400e" };
  if (s.includes("resolved") || s.includes("closed"))
    return { background: "#dbeafe", color: "#1e40af" };
  if (s.includes("high"))  return { background: "#fee2e2", color: "#991b1b" };
  if (s.includes("medium"))return { background: "#fef3c7", color: "#92400e" };
  if (s.includes("low"))   return { background: "#d1fae5", color: "#065f46" };
  return { background: "#f3f4f6", color: "#374151" };
};

const LargeWidget: React.FC<{ sourceName: string; dataSource: DataSourceConfig }> = ({ sourceName, dataSource }) => {
  const color = SOURCE_COLOR[sourceName] ?? "#4f6ef7";
  const rows = dataSource.details ?? [];
  const columns = rows.length ? Object.keys(rows[0]).slice(0, 4) : [];

  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 12px", borderBottom: "1px solid #f3f4f6", background: "#fafafa",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 600, color: "#374151" }}>{sourceName}</span>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} style={{
                padding: "5px 10px", textAlign: "left",
                fontSize: 8, fontWeight: 600, color: "#9ca3af",
                letterSpacing: "0.06em", textTransform: "uppercase",
                borderBottom: "1px solid #f3f4f6",
              }}>
                {col.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, 4).map((row, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #f9fafb" }}>
              {columns.map(col => {
                const val = String(row[col]);
                const isBadge = col.toLowerCase().includes("status") || col.toLowerCase().includes("priority");
                return (
                  <td key={col} style={{ padding: "5px 10px" }}>
                    {isBadge ? (
                      <span style={{
                        padding: "2px 7px", borderRadius: 99,
                        fontSize: 8, fontWeight: 500,
                        display: "inline-block",
                        ...statusStyle(val),
                      }}>
                        {val}
                      </span>
                    ) : (
                      <span style={{
                        fontSize: 9, color: "#374151",
                        display: "block", overflow: "hidden",
                        textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 100,
                      }}>
                        {val}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ── XLarge: full-column table, first 2 cols sticky, horizontal scroll ─────────

const XLargeWidget: React.FC<{ sourceName: string; dataSource: DataSourceConfig }> = ({ sourceName, dataSource }) => {
  const color = SOURCE_COLOR[sourceName] ?? "#4f6ef7";
  const rows = dataSource.details ?? [];
  const columns = rows.length ? Object.keys(rows[0]) : [];

  const stickyBase: React.CSSProperties = {
    position: "sticky",
    background: "#fff",
    zIndex: 1,
  };

  const stickyHead: React.CSSProperties = {
    ...stickyBase,
    background: "#fafafa",
  };

  // Fixed pixel offsets for the two sticky cols
  const COL_W = 90;
  const stickyLeft = [0, COL_W];

  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden" }}>
      {/* Title bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "8px 12px", borderBottom: "1px solid #f3f4f6", background: "#fafafa",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 600, color: "#374151" }}>{sourceName}</span>
        <span style={{ marginLeft: "auto", fontSize: 8, color: "#9ca3af" }}>← scroll →</span>
      </div>

      {/* Scrollable table wrapper */}
      <div style={{ overflowX: "auto", overflowY: "hidden" }}>
        <table style={{ borderCollapse: "collapse", minWidth: columns.length * COL_W }}>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col}
                  style={{
                    padding: "5px 10px",
                    textAlign: "left",
                    fontSize: 8,
                    fontWeight: 600,
                    color: i < 2 ? "#4f6ef7" : "#9ca3af",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #f3f4f6",
                    borderRight: i === 1 ? "1.5px solid #e5e7eb" : undefined,
                    whiteSpace: "nowrap",
                    width: COL_W,
                    minWidth: COL_W,
                    ...(i < 2 ? { ...stickyHead, left: stickyLeft[i] } : {}),
                  }}
                >
                  {col.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 4).map((row, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #f9fafb" }}>
                {columns.map((col, i) => {
                  const val = String(row[col]);
                  const isBadge = col.toLowerCase().includes("status") || col.toLowerCase().includes("priority");
                  return (
                    <td
                      key={col}
                      style={{
                        padding: "5px 10px",
                        borderRight: i === 1 ? "1.5px solid #e5e7eb" : undefined,
                        ...(i < 2 ? { ...stickyBase, left: stickyLeft[i] } : {}),
                      }}
                    >
                      {isBadge ? (
                        <span style={{
                          padding: "2px 6px",
                          borderRadius: 99,
                          fontSize: 8,
                          fontWeight: 500,
                          display: "inline-block",
                          whiteSpace: "nowrap",
                          ...statusStyle(val),
                        }}>
                          {val}
                        </span>
                      ) : (
                        <span style={{
                          fontSize: 9,
                          color: i < 2 ? "#111827" : "#6b7280",
                          fontWeight: i < 2 ? 500 : 400,
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: COL_W - 20,
                        }}>
                          {val}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ── Size metadata ─────────────────────────────────────────────────────────────

const SIZE_META: Record<string, { grid: string; desc: string }> = {
  Compact: { grid: "2×2",  desc: "KPI / status widget" },
  Small:   { grid: "4×3",  desc: "Default informational widget" },
  Medium:  { grid: "6×4",  desc: "Chart widget · Line, Bar, Pie" },
  Large:   { grid: "8×5",  desc: "Table widget · Analytics & reports" },
  XLarge:  { grid: "12×6", desc: "Full-width table · Detailed insights" },
};

// ── 12-col grid ghost canvas (empty state) ───────────────────────────────────
// Mirrors MUI Grid xs/sm/md breakpoints: 2+2+2+3+3 = 12 cols in row 1,
// 4+4+4 = 12 in row 2, 6+6 = 12 in row 3.

const GRID = 12;
const GAP  = 5;

const GridGhost: React.FC<{ span: number; height: number; totalCols?: number }> = ({
  span, height, totalCols = GRID,
}) => (
  <div style={{
    gridColumn: `span ${span}`,
    height,
    borderRadius: 8,
    border: "1.5px dashed #c8cfe0",
    background: "rgba(255,255,255,0.45)",
    position: "relative",
    overflow: "hidden",
  }}>
    {/* subtle col-count label */}
    <span style={{
      position: "absolute", bottom: 4, right: 6,
      fontSize: 7, color: "#b0b8cc", fontWeight: 600, letterSpacing: "0.04em",
    }}>
      {span}/{totalCols}
    </span>
  </div>
);

const EmptyCanvas: React.FC = () => (
  <div style={{ background: "#dde2ed", borderRadius: 14, padding: 10, display: "flex", flexDirection: "column", gap: GAP }}>
    {/* Row 1 — 4 equal cols (3+3+3+3) */}
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: GAP }}>
      <GridGhost span={3} height={72} />
      <GridGhost span={3} height={72} />
      <GridGhost span={3} height={72} />
      <GridGhost span={3} height={72} />
    </div>
    {/* Row 2 — 3 equal cols (4+4+4) */}
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: GAP }}>
      <GridGhost span={4} height={56} />
      <GridGhost span={4} height={56} />
      <GridGhost span={4} height={56} />
    </div>
    {/* Row 3 — 2 equal cols (6+6) */}
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: GAP }}>
      <GridGhost span={6} height={44} />
      <GridGhost span={6} height={44} />
    </div>
  </div>
);

// ── Main panel ────────────────────────────────────────────────────────────────

interface ResourcePreviewPanelProps {
  dataSource: DataSourceConfig | null;
  sourceName?: string;
  widgetSize?: string;
  onWidgetSizeChange?: (size: string) => void;
}

export function ResourcePreviewPanel({ dataSource, sourceName = "", widgetSize = "Small" }: ResourcePreviewPanelProps) {
  const analysis = useMemo(() => analyzeDataStructure(dataSource), [dataSource]);

  const sizeMeta = SIZE_META[widgetSize] ?? SIZE_META["Small"];
  const displayLabel = widgetSize === "XLarge" ? "X Large" : widgetSize;

  if (!dataSource) {
    return (
      <div style={{ width: 420 }} className="h-full bg-[#f8f9fc] border-r border-border flex flex-col">
        <div className="px-4 py-4 border-b border-border bg-white">
          <h3 className="text-gray-900" style={{ fontSize: 14, fontWeight: 600 }}>Data Preview</h3>
          <p className="text-muted-foreground" style={{ fontSize: 11, marginTop: 2 }}>Select a data source to preview</p>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ padding: 16 }}>
          <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9ca3af", marginBottom: 10 }}>
            Dashboard Layout Preview
          </p>
          <EmptyCanvas />
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 10 }}>
            Choose a data source to preview the widget layout.
          </p>
        </div>
      </div>
    );
  }

  // Row 1 always uses 4 equal columns (3/12 each), matching the empty-state skeleton.
  // Widget spans 1–4 of those columns; remaining slots are individual ghost cells.
  const ROW1_COLS = 4;
  const WIDGET_CELLS: Record<string, number> = {
    Compact: 1,
    Small:   1,
    Medium:  2,
    Large:   3,
    XLarge:  4,
  };
  const widgetCells  = WIDGET_CELLS[widgetSize] ?? 1;
  const ghostCells   = ROW1_COLS - widgetCells;
  const widgetH = widgetSize === "Compact" ? 76 : widgetSize === "Small" ? 100 : 148;

  return (
    <div style={{ width: 420 }} className="h-full bg-[#f8f9fc] border-r border-border flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border bg-white">
        <h3 className="text-gray-900" style={{ fontSize: 14, fontWeight: 600 }}>Data Preview</h3>
        <p className="text-muted-foreground" style={{ fontSize: 11, marginTop: 1, display: "flex", flexWrap: "wrap", gap: "0 4px", alignItems: "center" }}>
          <span>{sourceName || dataSource.type.replace(/_/g, " ").toUpperCase()}</span>
          {analysis.metricCount > 0 && <span>· {analysis.metricCount} metrics</span>}
          <span>·</span>
          <span style={{ color: "#4f6ef7", fontWeight: 500 }}>{displayLabel}</span>
          <span style={{ color: "#9ca3af" }}>— {sizeMeta.desc}</span>
        </p>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
        <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#9ca3af", margin: 0, flexShrink: 0 }}>
          Dashboard Layout Preview · 12-col grid
        </p>

        {/* Canvas */}
        <div style={{ background: "#dde2ed", borderRadius: 14, padding: 10, display: "flex", flexDirection: "column", gap: GAP }}>

          {/* Row 1: 4 equal columns — widget spans widgetCells, rest are individual ghosts */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${ROW1_COLS}, 1fr)`, gap: GAP, alignItems: "stretch" }}>
            <div style={{ gridColumn: `span ${widgetCells}` }}>
              {(widgetSize === "Compact" || widgetSize === "Small") && <SmallWidget  sourceName={sourceName} dataSource={dataSource} />}
              {widgetSize === "Medium"  && <MediumWidget sourceName={sourceName} dataSource={dataSource} />}
              {widgetSize === "Large"   && <LargeWidget  sourceName={sourceName} dataSource={dataSource} />}
              {widgetSize === "XLarge"  && <XLargeWidget sourceName={sourceName} dataSource={dataSource} />}
            </div>
            {Array.from({ length: ghostCells }).map((_, i) => (
              <GhostCell key={i} height={widgetH} />
            ))}
          </div>

          {/* Row 2: 3 equal columns (4+4+4) */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: GAP }}>
            <GridGhost span={4} height={52} />
            <GridGhost span={4} height={52} />
            <GridGhost span={4} height={52} />
          </div>

          {/* Row 3: 2 equal columns (6+6) */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID}, 1fr)`, gap: GAP }}>
            <GridGhost span={6} height={40} />
            <GridGhost span={6} height={40} />
          </div>
        </div>

        <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>
          <span style={{ color: "#4f6ef7", fontWeight: 500 }}>{sizeMeta.grid}</span>
          {" — "}{sizeMeta.desc}
        </p>
      </div>
    </div>
  );
}
