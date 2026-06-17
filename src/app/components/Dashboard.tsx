import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import AddIcon from "@mui/icons-material/Add";
import { Btn } from "./ui/Btn";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PsychologyAltOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import CloudOffOutlinedIcon from "@mui/icons-material/CloudOffOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import ElevatorOutlinedIcon from "@mui/icons-material/ElevatorOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import GridLayout, { Layout, WidthProvider } from "react-grid-layout/legacy";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { MetricCard } from "./MetricCard";
import { AddDrawer } from "./AddDrawer";

const GridLayoutWithWidth = WidthProvider(GridLayout);

interface OverviewMetric {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
  target?: string;
  delta?: number;
  deltaLabel?: string;
  sparkColor?: string;
}

const floorData = [
  { floor: "Floor 1", value: 72 },
  { floor: "Floor 2", value: 85 },
  { floor: "Floor 3", value: 78 },
  { floor: "Floor 4", value: 91 },
  { floor: "Floor 5", value: 69 },
];

const overviewMetrics: OverviewMetric[] = [
  { id: "space-utilization",    icon: <PercentOutlinedIcon style={{ fontSize: 14 }} />,              label: "Space Utilization",    value: "78",   suffix: "%", target: "Target: 75%", delta: 3,   deltaLabel: "%", sparkColor: "var(--chart-1)" },
  { id: "employee-satisfaction",icon: <SentimentSatisfiedAltOutlinedIcon style={{ fontSize: 14 }} />, label: "Employee Satisfaction",value: "4.6",  suffix: "/5", target: "Target: 4.5", delta: 0.2,                  sparkColor: "var(--chart-5)" },
  { id: "energy-efficiency",    icon: <BoltOutlinedIcon style={{ fontSize: 14 }} />,                 label: "Energy Efficiency",    value: "82",   suffix: "%", target: "Target: 80%", delta: 5,   deltaLabel: "%", sparkColor: "var(--chart-2)" },
  { id: "booking-rate",         icon: <EventAvailableOutlinedIcon style={{ fontSize: 14 }} />,       label: "Booking Rate",         value: "91",   suffix: "%", target: "Target: 85%", delta: 7,   deltaLabel: "%", sparkColor: "var(--chart-4)" },
  { id: "active-employees",     icon: <PeopleAltOutlinedIcon style={{ fontSize: 14 }} />,            label: "Active Employees",     value: "2,847",             target: "Capacity: 3,000", delta: 47,              sparkColor: "var(--chart-3)" },
  { id: "meeting-rooms",        icon: <MeetingRoomOutlinedIcon style={{ fontSize: 14 }} />,          label: "Meeting Rooms",        value: "142",               target: "Available: 31",   delta: 22, deltaLabel: "%", sparkColor: "var(--chart-5)" },
];

const anomalies = [
  { score: 92, risk: "high",   title: "Unusual volume of file downloads to external storage", user: "john.s***@Engineering", time: "2 hrs ago", label: "Investigating" },
  { score: 88, risk: "high",   title: "Access to sensitive financial systems from unusual location", user: "jane.d***@finance.com", time: "4 hrs ago", label: "Investigating" },
  { score: 65, risk: "medium", title: "Repeated late-night access to data center", user: "mike.r***@IT", time: "Yesterday", label: "Reviewing" },
  { score: 58, risk: "medium", title: "Spike in unauthorized cloud storage usage", user: "M.Wong***@Logistics", time: "2 days ago", label: "Reviewing" },
];

const shadowApps = [
  { name: "Personal Dropbox",      users: 198, risk: "high" },
  { name: "WhatsApp Web",          users: 224, risk: "medium" },
  { name: "Notion (Personal)",     users: 88,  risk: "medium" },
  { name: "ChatGPT",               users: 448, risk: "medium" },
  { name: "Personal Google Drive", users: 312, risk: "high" },
];

const deptProductivity = [
  { dept: "Engineering", value: 82 },
  { dept: "Operations",  value: 76 },
  { dept: "Sales",       value: 81 },
  { dept: "Finance",     value: 77 },
  { dept: "HR",          value: 75 },
];

const topTeams = [
  { name: "Product Design",    score: 94, members: 12 },
  { name: "Cloud Engineering", score: 91, members: 18 },
  { name: "Customer Success",  score: 89, members: 24 },
];

const recentAlerts = [
  { text: "Unusual login pattern detected — Engineering", time: "12 min ago", sev: "high" },
  { text: "Shadow IT app usage exceeded threshold",        time: "1 hr ago",  sev: "medium" },
  { text: "Badge access denied 3x — Floor 4 server room", time: "3 hrs ago", sev: "high" },
];

const insights = [
  {
    icon: MeetingRoomOutlinedIcon,
    iconBg: "var(--status-warning-bg)", iconColor: "var(--status-warning-fg)",
    title: "Conference Room Crisis",
    body: "85% of meeting rooms booked but only 62% utilized. Ghost bookings causing frustration. Implement check-in system or auto-release policy.",
    stats: [{ label: "GHOST BOOKINGS", value: "23%" }, { label: "LOST HOURS/WEEK", value: "142" }],
    actions: [{ label: "Configure Auto-Release", primary: true }, { label: "View Patterns", primary: false }],
  },
  {
    icon: AcUnitOutlinedIcon,
    iconBg: "var(--status-info-bg)", iconColor: "var(--status-info-fg)",
    title: "HVAC Inefficiency Detected",
    body: "Building zones 3A and 3B running 24/7 climate control despite 30% weekend occupancy. Potential savings of $4,200/month.",
    stats: [{ label: "ENERGY WASTE", value: "38%" }, { label: "CO2 IMPACT", value: "2.4 tons" }],
    actions: [{ label: "Optimize Schedule", primary: true }, { label: "Energy Report", primary: false }],
  },
  {
    icon: WorkOutlinedIcon,
    iconBg: "var(--primary-container)", iconColor: "var(--primary)",
    title: "Hybrid Work Pattern Shift",
    body: "Tuesday–Thursday showing 95% occupancy while Monday/Friday at 45%. Recommend hot-desking or space reallocation to optimize costs.",
    stats: [{ label: "PEAK DAYS", value: "Tue–Thu" }, { label: "SPACE UTILIZATION", value: "68%" }],
    actions: [{ label: "Desk Booking System", primary: true }, { label: "Occupancy Trends", primary: false }],
  },
  {
    icon: KitchenOutlinedIcon,
    iconBg: "var(--status-success-bg)", iconColor: "var(--status-success-fg)",
    title: "Cafeteria Optimization Success",
    body: "AI-driven menu planning reduced food waste by 42% this quarter. Peak lunch traffic now served 18% faster with staggered schedules.",
    stats: [{ label: "FOOD WASTE REDUCED", value: "42%" }, { label: "SERVICE TIME", value: "−18%" }],
    actions: [{ label: "View Report", primary: true }, { label: "Schedule Planning", primary: false }],
  },
  {
    icon: ElevatorOutlinedIcon,
    iconBg: "var(--secondary-container)", iconColor: "var(--secondary)",
    title: "Elevator Traffic Analysis",
    body: "Morning rush (8–9 AM) causing 4.2 min average wait on Floors 4–6. Smart routing could reduce wait by 60%.",
    stats: [{ label: "AVG WAIT TIME", value: "4.2 min" }, { label: "PEAK FLOOR", value: "Floor 5" }],
    actions: [{ label: "Optimize Routing", primary: true }, { label: "Traffic Report", primary: false }],
  },
  {
    icon: DirectionsCarOutlinedIcon,
    iconBg: "var(--muted)", iconColor: "var(--muted-foreground)",
    title: "Parking Underutilization",
    body: "Executive parking at 35% capacity while general employee parking is at 94%. Reallocation policy could improve satisfaction.",
    stats: [{ label: "EXEC UTILIZATION", value: "35%" }, { label: "GENERAL UTILIZATION", value: "94%" }],
    actions: [{ label: "Reallocation Policy", primary: true }, { label: "Parking Data", primary: false }],
  },
];

const tabs = [
  { id: "overview",  label: "Overview",            icon: GridViewOutlinedIcon },
  { id: "behavior",  label: "Behavior Analytics",  icon: PsychologyAltOutlinedIcon },
  { id: "insights",  label: "Insights",             icon: InsightsOutlinedIcon },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState<Record<string, string> | undefined>(undefined);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [customResources, setCustomResources] = useState<Record<string, string>[]>([]);

  const filteredCustomResources = customResources.filter((resource) => {
    const name = resource.name?.toLowerCase() || "";
    const type = resource.type?.toLowerCase() || "";
    return !(name.includes("service desk") || type.includes("service desk"));
  });

  const allOverviewCards = useMemo(
    () => [
      ...overviewMetrics,
      ...filteredCustomResources.map((resource, index) => ({
        id: `custom-${index}-${resource.name}`,
        icon: <GridViewOutlinedIcon style={{ fontSize: 14 }} />,
        label: resource.name || "Custom Resource",
        value: resource.floor || "—",
        suffix: resource.aiAnalysisEnabled === "Yes" ? "🤖" : undefined,
        target: `Type: ${resource.type || "Unknown"}`,
        sparkColor: "var(--chart-3)",
      })),
    ],
    [filteredCustomResources]
  );

  const [layout, setLayout] = useState<Layout[]>(() =>
    allOverviewCards.map((item, idx) => ({
      i: item.id, x: idx % 6, y: Math.floor(idx / 6), w: 1, h: 1, minW: 1, minH: 1,
    }))
  );

  useEffect(() => {
    setLayout((previous) =>
      allOverviewCards.map((item, idx) =>
        previous.find((l) => l.i === item.id) ?? {
          i: item.id, x: idx % 6, y: Math.floor(idx / 6),
          w: item.id === "active-employees" ? 2 : 1,
          h: item.id === "active-employees" ? 2 : 1,
          minW: item.id === "active-employees" ? 2 : 1,
          minH: item.id === "active-employees" ? 2 : 1,
        }
      )
    );
  }, [allOverviewCards]);

  function handleAddResource(data: Record<string, string>) {
    setCustomResources(prev => [...prev, data]);
  }

  function openEdit(metric: OverviewMetric) {
    setEditData({ name: metric.label, floor: metric.label, status: "Small", type: "", company: "", notes: "" });
    setDrawerOpen(true);
  }

  function handleMenuEdit(metric: OverviewMetric) { setOpenMenuId(null); openEdit(metric); }
  function handleMenuDelete(id: string) {
    setOpenMenuId(null);
    setCustomResources(prev => prev.filter((_, i) => `custom-${i}-${prev[i].name}` !== id));
  }

  const resizeHandle = (axis: string, ref: React.Ref<HTMLDivElement>) => (
    <div ref={ref} title="Resize" className={`react-resizable-handle react-resizable-handle-${axis} cursor-se-resize`}>
      <span className="sr-only">Resize</span>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden bg-background transition-colors duration-200">

      {/* Page header */}
      <div className="px-8 pt-5 pb-0 bg-card border-b border-border transition-colors duration-200">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-foreground" style={{ fontSize: 20, fontWeight: 600 }}>
              Intelligent Workplace Dashboard
            </h1>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: 13 }}>
              Monitor and optimize workplace operations and employee experience
            </p>
          </div>
          <Btn
            variant="filled"
            size="md"
            icon={<AddIcon style={{ fontSize: 18 }} />}
            onClick={() => { setEditData(undefined); setDrawerOpen(true); }}
          >
            Add Resource
          </Btn>
        </div>

        {/* MD3-style tab bar */}
        <div className="flex gap-0 mt-4">
          {tabs.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-1.5 px-4 py-2.5 border-b-2 transition-all duration-150 cursor-pointer"
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                  borderColor: isActive ? "var(--primary)" : "transparent",
                  background: "none",
                }}
              >
                <Icon style={{ fontSize: 15 }} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-5">
            <GridLayoutWithWidth
              className="layout"
              layout={layout}
              cols={6}
              rowHeight={160}
              margin={[16, 16]}
              containerPadding={[16, 16]}
              isResizable isDraggable isBounded
              compactType="vertical"
              draggableHandle=".drag-handle"
              resizeHandles={["se"]}
              resizeHandle={resizeHandle}
              onLayoutChange={(newLayout) => setLayout(newLayout)}
            >
              {allOverviewCards.map((metric) => (
                <div key={metric.id} className="group relative h-full">
                  {/* Card controls */}
                  <div className={`absolute right-2 top-2 z-20 flex items-center gap-1 transition-opacity duration-150 ${openMenuId === metric.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                    <div
                      className="drag-handle w-7 h-7 inline-flex cursor-grab items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur-sm shadow-sm text-muted-foreground hover:bg-card active:cursor-grabbing transition-colors"
                      title="Drag to reorder"
                    >
                      <DragIndicatorOutlinedIcon style={{ fontSize: 14 }} />
                    </div>
                    <div className="relative">
                      <Btn
                        variant="icon"
                        size="sm"
                        className="border border-border bg-card/90 backdrop-blur-sm shadow-sm"
                        onClick={e => { e.stopPropagation(); setOpenMenuId(openMenuId === metric.id ? null : metric.id); }}
                      >
                        <MoreVertOutlinedIcon style={{ fontSize: 14 }} />
                      </Btn>
                      {openMenuId === metric.id && (
                        <div className="absolute right-0 top-8 w-40 bg-card rounded-xl border border-border shadow-xl z-30 py-1 overflow-hidden">
                          <Btn variant="ghost" size="sm" fullWidth className="justify-start gap-2.5 px-3 rounded-none"
                            onClick={e => { e.stopPropagation(); handleMenuEdit(metric); }}>
                            <EditOutlinedIcon style={{ fontSize: 14, color: "var(--primary)" }} />Edit
                          </Btn>
                          <Btn variant="ghost" size="sm" fullWidth className="justify-start gap-2.5 px-3 rounded-none"
                            onClick={e => { e.stopPropagation(); setOpenMenuId(null); }}>
                            <TuneOutlinedIcon style={{ fontSize: 14, color: "var(--muted-foreground)" }} />Configure
                          </Btn>
                          <div className="border-t border-border my-1" />
                          <Btn variant="danger" size="sm" fullWidth className="justify-start gap-2.5 px-3 rounded-none"
                            onClick={e => { e.stopPropagation(); handleMenuDelete(metric.id); }}>
                            <DeleteOutlineOutlinedIcon style={{ fontSize: 14 }} />Delete
                          </Btn>
                        </div>
                      )}
                    </div>
                  </div>
                  <MetricCard
                    icon={metric.icon}
                    label={metric.label}
                    value={metric.value}
                    suffix={metric.suffix}
                    target={metric.target}
                    delta={metric.delta}
                    deltaLabel={metric.deltaLabel}
                    sparkColor={metric.sparkColor}
                  />
                </div>
              ))}
            </GridLayoutWithWidth>
          </div>
        )}

        {/* ── BEHAVIOR ANALYTICS ── */}
        {activeTab === "behavior" && (
          <div className="flex flex-col gap-4">
            {/* Top metric row */}
            <div className="grid grid-cols-6 gap-3">
              {[
                { icon: TrendingUpIcon,              color: "var(--primary)",         bg: "var(--primary-container)",        label: "Productivity Score",  value: "78%",   sub: "+3.2% vs last week" },
                { icon: PeopleAltOutlinedIcon,        color: "var(--status-success-fg)",bg: "var(--status-success-bg)",       label: "Active Today",        value: "2,156", sub: "324 remote, 1,834 on-site" },
                { icon: WarningAmberOutlinedIcon,     color: "var(--status-warning-fg)",bg: "var(--status-warning-bg)",       label: "Behavior Anomalies",  value: "12",    sub: "3 high risk, investigating" },
                { icon: HubOutlinedIcon,              color: "var(--chart-4)",          bg: "var(--secondary-container)",     label: "Collaboration Index", value: "82%",   sub: "6.2 meetings avg/day" },
                { icon: PhoneAndroidOutlinedIcon,     color: "var(--status-error-fg)",  bg: "var(--status-error-bg)",         label: "Shadow IT Apps",      value: "5",     sub: "2 high-risk detected" },
                { icon: BadgeOutlinedIcon,            color: "var(--chart-3)",          bg: "var(--status-info-bg)",          label: "Badge Sign-ins Today",value: "1264",  sub: "Avg arrival: 8:21 AM" },
              ].map(({ icon: Icon, color, bg, label, value, sub }) => (
                <div key={label} className="bg-card rounded-xl border border-border p-3.5 flex flex-col gap-1.5 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: bg }}>
                    <Icon style={{ fontSize: 16, color }} />
                  </div>
                  <p className="text-foreground" style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.2 }}>{value}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 11 }}>{label}</p>
                  <p className="text-muted-foreground" style={{ fontSize: 10, opacity: 0.8 }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Three panels */}
            <div className="grid grid-cols-3 gap-4">
              {/* Active Behavior Anomalies */}
              <div className="bg-card rounded-xl border border-border overflow-hidden transition-colors duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <PersonSearchOutlinedIcon style={{ fontSize: 16, color: "var(--muted-foreground)" }} />
                    <span className="text-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Active Behavior Anomalies</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 600, backgroundColor: "var(--status-error-bg)", color: "var(--status-error-fg)" }}>3 HIGH RISK</span>
                </div>
                <div className="flex flex-col divide-y divide-border">
                  {anomalies.map((a) => (
                    <div key={a.title} className="px-4 py-3 flex items-start gap-3 hover:bg-accent/40 transition-colors">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: a.risk === "high" ? "var(--status-error-bg)" : "var(--status-warning-bg)" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: a.risk === "high" ? "var(--status-error-fg)" : "var(--status-warning-fg)" }}>{a.score}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground leading-snug" style={{ fontSize: 12 }}>{a.title}</p>
                        <p className="text-muted-foreground mt-0.5" style={{ fontSize: 10 }}>{a.user} · {a.time}</p>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium flex-shrink-0"
                        style={{ backgroundColor: a.risk === "high" ? "var(--status-error-bg)" : "var(--status-warning-bg)", color: a.risk === "high" ? "var(--status-error-fg)" : "var(--status-warning-fg)" }}>
                        {a.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shadow IT Detection */}
              <div className="bg-card rounded-xl border border-border overflow-hidden transition-colors duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <CloudOffOutlinedIcon style={{ fontSize: 16, color: "var(--muted-foreground)" }} />
                    <span className="text-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Shadow IT Detection</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 600, backgroundColor: "var(--status-warning-bg)", color: "var(--status-warning-fg)" }}>6 DETECTED</span>
                </div>
                <div className="flex flex-col divide-y divide-border">
                  {shadowApps.map((app) => (
                    <div key={app.name} className="px-4 py-3 flex items-center justify-between hover:bg-accent/40 transition-colors">
                      <div>
                        <p className="text-foreground" style={{ fontSize: 12, fontWeight: 500 }}>{app.name}</p>
                        <p className="text-muted-foreground" style={{ fontSize: 10 }}>{app.users} users</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full" style={{
                        fontSize: 10, fontWeight: 600,
                        backgroundColor: app.risk === "high" ? "var(--status-error-bg)" : "var(--status-warning-bg)",
                        color: app.risk === "high" ? "var(--status-error-fg)" : "var(--status-warning-fg)",
                      }}>
                        {app.risk === "high" ? "HIGH RISK" : "MEDIUM RISK"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Productivity */}
              <div className="bg-card rounded-xl border border-border overflow-hidden transition-colors duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <EmojiEventsOutlinedIcon style={{ fontSize: 16, color: "var(--muted-foreground)" }} />
                    <span className="text-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Department Productivity</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 px-4 py-4">
                  {deptProductivity.map(({ dept, value }) => (
                    <div key={dept} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground" style={{ fontSize: 12 }}>{dept}</span>
                        <span className="text-foreground" style={{ fontSize: 12, fontWeight: 500 }}>{value}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--muted)" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: "var(--primary)" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border px-4 py-3">
                  <p className="text-muted-foreground mb-2" style={{ fontSize: 11, fontWeight: 500 }}>TOP PERFORMING TEAMS</p>
                  <div className="flex flex-col gap-2">
                    {topTeams.map((t) => (
                      <div key={t.name} className="flex items-center justify-between">
                        <div>
                          <p className="text-foreground" style={{ fontSize: 11, fontWeight: 500 }}>{t.name}</p>
                          <p className="text-muted-foreground" style={{ fontSize: 10 }}>{t.members} members</p>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--status-success-fg)" }}>{t.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3 transition-colors duration-200">
                <p className="text-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Workspace Utilization</p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-foreground" style={{ fontSize: 30, fontWeight: 700 }}>47.2%</p>
                    <p className="text-muted-foreground" style={{ fontSize: 11 }}>Current occupancy</p>
                  </div>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--muted)" }}>
                    <div className="h-full rounded-full" style={{ width: "47.2%", backgroundColor: "var(--primary)" }} />
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={80}>
                  <BarChart data={floorData} barSize={12} margin={{ top: 0, right: 0, bottom: 0, left: -28 }}>
                    <XAxis dataKey="floor" tick={{ fontSize: 9, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Bar dataKey="value" fill="var(--primary-container)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="col-span-2 bg-card rounded-xl border border-border overflow-hidden transition-colors duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <NotificationsActiveOutlinedIcon style={{ fontSize: 16, color: "var(--muted-foreground)" }} />
                    <span className="text-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Recent Alerts</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, fontWeight: 600, backgroundColor: "var(--status-error-bg)", color: "var(--status-error-fg)" }}>3 ACTIVE</span>
                </div>
                <div className="flex flex-col divide-y divide-border">
                  {recentAlerts.map((alert) => (
                    <div key={alert.text} className="flex items-center gap-3 px-4 py-3 hover:bg-accent/40 transition-colors">
                      <div className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: alert.sev === "high" ? "var(--status-error-fg)" : "var(--status-warning-fg)" }} />
                      <div className="flex-1">
                        <p className="text-foreground" style={{ fontSize: 12 }}>{alert.text}</p>
                        <p className="text-muted-foreground" style={{ fontSize: 10 }}>{alert.time}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full" style={{
                        fontSize: 10, fontWeight: 500,
                        backgroundColor: alert.sev === "high" ? "var(--status-error-bg)" : "var(--status-warning-bg)",
                        color: alert.sev === "high" ? "var(--status-error-fg)" : "var(--status-warning-fg)",
                      }}>
                        {alert.sev === "high" ? "Critical" : "Warning"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── INSIGHTS ── */}
        {activeTab === "insights" && (
          <div className="grid grid-cols-3 gap-4">
            {insights.map(({ icon: Icon, iconBg, iconColor, title, body, stats, actions }) => (
              <div key={title} className="bg-card rounded-xl border border-border p-5 flex flex-col gap-4 transition-colors duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
                    <Icon style={{ fontSize: 18, color: iconColor }} />
                  </div>
                  <h3 className="text-foreground leading-snug" style={{ fontSize: 14, fontWeight: 600 }}>{title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 12 }}>{body}</p>
                <div className="flex gap-6">
                  {stats.map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-muted-foreground" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em" }}>{label}</p>
                      <p className="text-foreground" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  {actions.map(({ label, primary }) => (
                    <Btn
                      key={label}
                      variant={primary ? "filled" : "outlined"}
                      size="sm"
                      fullWidth
                    >
                      {label}
                    </Btn>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {openMenuId && (
        <div className="fixed inset-0 z-20" onClick={() => setOpenMenuId(null)} />
      )}

      <AddDrawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setEditData(undefined); }}
        onAdd={handleAddResource}
        initialData={editData}
      />
    </div>
  );
}
