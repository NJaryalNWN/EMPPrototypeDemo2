import { useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

/* ── Data ───────────────────────────────────────────────── */
const kbArticles = [
  { category: "Standard Operating Procedures", title: "Collector Troubleshooting" },
  { category: "Policy/Information",            title: "YALE UNIVERSITY Disaster Recovery Plan" },
  { category: "Eagle",                         title: "NWN – Eagle: Link to RealMed (Availit…)" },
  { category: "ECG",                           title: "Avaya Aura™ Communication Manager…" },
  { category: "ECG",                           title: "Ribbon (Sonus): Core Series Reference…" },
];

const catalogItems = [
  { rank: 1, title: "DID Call Forward Add/Remove" },
  { rank: 2, title: "DID Disconnect" },
  { rank: 3, title: "DID Add New Number" },
  { rank: 4, title: "Move, Add, Change, Delete (MACD)" },
  { rank: 5, title: "Contact Center Request" },
];

const ticketStats = [
  { label: "Open",     value: 0, icon: InboxOutlinedIcon,               color: "var(--status-info-fg)",    bg: "var(--status-info-bg)" },
  { label: "Assigned", value: 0, icon: PersonOutlinedIcon,              color: "var(--status-warning-fg)", bg: "var(--status-warning-bg)" },
  { label: "Resolved", value: 0, icon: AssignmentTurnedInOutlinedIcon,  color: "var(--status-success-fg)", bg: "var(--status-success-bg)" },
  { label: "Closed",   value: 0, icon: LockOutlinedIcon,                color: "var(--muted-foreground)",  bg: "var(--muted)" },
];

const reportLinks = [
  { icon: EmojiEventsOutlinedIcon, label: "Customer Success", color: "var(--status-success-fg)", bg: "var(--status-success-bg)" },
  { icon: SecurityOutlinedIcon,    label: "Security Ops",     color: "var(--status-error-fg)",   bg: "var(--status-error-bg)" },
  { icon: SpeedOutlinedIcon,       label: "SLA Dashboard",   color: "var(--status-info-fg)",    bg: "var(--status-info-bg)" },
  { icon: InventoryOutlinedIcon,   label: "DID Inventory",   color: "var(--secondary)",         bg: "var(--secondary-container)" },
];

/* ── Shared card shell — elevation only, no border ──────── */
function PortalCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  accent?: boolean;   // kept for call-site compatibility, unused
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`relative flex flex-col overflow-hidden rounded-2xl bg-card transition-all duration-200 cursor-default select-none ${className}`}
      style={{
        boxShadow: pressed
          ? "0 1px 4px rgba(0,40,85,0.07), 0 0 0 1px rgba(0,40,85,0.05)"
          : hovered
          ? "0 8px 24px rgba(0,40,85,0.10), 0 2px 6px rgba(0,40,85,0.06)"
          : "0 2px 8px rgba(0,40,85,0.06), 0 1px 3px rgba(0,40,85,0.04)",
        transform: pressed ? "scale(0.997) translateY(1px)" : hovered ? "translateY(-2px)" : "none",
      }}
    >
      {/* M3 state layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-150"
        style={{ backgroundColor: "var(--primary)", opacity: pressed ? 0.03 : 0 }}
      />
      {children}
    </div>
  );
}

/* ── Card header ─────────────────────────────────────────── */
function CardHeader({
  icon,
  title,
  subtitle,
  onOpen,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onOpen?: () => void;
}) {
  return (
    <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "var(--primary-container)" }}
          >
            {icon}
          </div>
          <div>
            <h3
              className="text-foreground"
              style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3 }}
            >
              {title}
            </h3>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: 11, fontFamily: "var(--font-body)" }}>
              {subtitle}
            </p>
          </div>
        </div>
        {onOpen && (
          <button
            type="button"
            onClick={onOpen}
            className="w-7 h-7 flex items-center justify-center rounded-lg border-0 bg-transparent cursor-pointer transition-colors hover:bg-muted flex-shrink-0 mt-0.5"
            aria-label={`Open ${title}`}
            title={`Open ${title}`}
          >
            <OpenInNewIcon style={{ fontSize: 14, color: "var(--muted-foreground)" }} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Row item (KB article / catalog item) ────────────────── */
function RowItem({
  label,
  title,
  onClick,
}: {
  label: string;
  title: string;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-start gap-2.5 px-5 py-2.5 border-0 bg-transparent text-left cursor-pointer transition-colors duration-150 group"
      style={{
        backgroundColor: hovered ? "var(--state-hover)" : "transparent",
      }}
    >
      <DescriptionOutlinedIcon
        style={{
          fontSize: 14,
          color: hovered ? "var(--primary)" : "var(--muted-foreground)",
          marginTop: 2,
          flexShrink: 0,
          transition: "color 0.15s",
        }}
      />
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground" style={{ fontSize: 10, fontFamily: "var(--font-body)", lineHeight: 1.4 }}>
          {label}
        </p>
        <p
          className="text-foreground truncate mt-px"
          style={{
            fontSize: 12,
            fontWeight: 500,
            fontFamily: "var(--font-body)",
            lineHeight: 1.5,
            color: hovered ? "var(--primary)" : undefined,
            transition: "color 0.15s",
          }}
        >
          {title}
        </p>
      </div>
      <ChevronRightIcon
        style={{
          fontSize: 14,
          color: "var(--primary)",
          flexShrink: 0,
          marginTop: 3,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      />
    </button>
  );
}

/* ── Stat chip (ticket counts) ───────────────────────────── */
function StatChip({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  label: string;
  value: number;
  color: string;
  bg: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-start gap-2 rounded-xl p-3.5 border-0 cursor-pointer transition-all duration-200 text-left w-full"
      style={{
        backgroundColor: hovered ? bg : "var(--muted)",
        boxShadow: hovered ? "0 2px 8px rgba(0,40,85,0.10)" : "none",
        transform: hovered ? "translateY(-1px)" : "none",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: bg }}
      >
        <Icon style={{ fontSize: 16, color }} />
      </div>
      <div>
        <p
          className="text-foreground"
          style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, fontFamily: "var(--font-heading)" }}
        >
          {value}
        </p>
        <p className="text-muted-foreground mt-1" style={{ fontSize: 11, fontFamily: "var(--font-body)" }}>
          {label}
        </p>
      </div>
    </button>
  );
}

/* ── Report quick-link tile ──────────────────────────────── */
function ReportTile({
  icon: Icon,
  label,
  color,
  bg,
}: {
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  label: string;
  color: string;
  bg: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center justify-center gap-2.5 rounded-xl py-5 px-3 border-0 cursor-pointer transition-all duration-200 w-full"
      style={{
        backgroundColor: hovered ? bg : "var(--muted)",
        boxShadow: hovered ? `0 4px 14px rgba(0,40,85,0.10)` : "none",
        transform: hovered ? "translateY(-2px)" : "none",
        border: hovered ? `1px solid ${color}30` : "1px solid transparent",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200"
        style={{ backgroundColor: bg }}
      >
        <Icon style={{ fontSize: 22, color }} />
      </div>
      <span
        className="text-center leading-tight"
        style={{ fontSize: 11, fontWeight: 600, fontFamily: "var(--font-body)", color: hovered ? color : "var(--foreground)" }}
      >
        {label}
      </span>
    </button>
  );
}

/* ── Card footer link ────────────────────────────────────── */
function CardFooter({ label, stat1, stat2, stat3 }: { label: string; stat1: string; stat2: string; stat3: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="px-5 py-3 flex items-center justify-between gap-2"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-2 min-w-0 overflow-hidden" style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>
        <span className="truncate">{stat1}</span>
        <span className="w-px h-3 bg-border flex-shrink-0 hidden sm:block" />
        <span className="truncate hidden sm:block">{stat2}</span>
        <span className="w-px h-3 bg-border flex-shrink-0 hidden lg:block" />
        <span className="truncate hidden lg:block">{stat3}</span>
      </div>
      <button
        type="button"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-1 border-0 bg-transparent cursor-pointer transition-colors duration-150 flex-shrink-0"
        style={{
          fontSize: 11,
          fontWeight: 600,
          fontFamily: "var(--font-body)",
          color: hovered ? "var(--primary)" : "var(--muted-foreground)",
        }}
      >
        {label}
        <ArrowForwardIcon style={{ fontSize: 13, transition: "transform 0.15s", transform: hovered ? "translateX(2px)" : "none" }} />
      </button>
    </div>
  );
}

/* ── Search bar ──────────────────────────────────────────── */
function GlobalSearch() {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition-all duration-200 w-full sm:w-auto"
      style={{
        backgroundColor: "var(--card)",
        border: focused ? "1.5px solid var(--primary)" : "1px solid var(--border)",
        boxShadow: focused ? "0 0 0 3px var(--ring)" : "0 1px 3px rgba(0,40,85,0.06)",
        maxWidth: 420,
        minWidth: 0,
      }}
    >
      <SearchOutlinedIcon style={{ fontSize: 18, color: focused ? "var(--primary)" : "var(--muted-foreground)", flexShrink: 0 }} />
      <input
        type="text"
        placeholder="Search…"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground min-w-0"
        style={{ fontSize: 13, fontFamily: "var(--font-body)" }}
      />
      <kbd
        className="rounded px-1.5 py-0.5 text-muted-foreground flex-shrink-0 hidden sm:block"
        style={{ fontSize: 10, backgroundColor: "var(--muted)", fontFamily: "var(--font-body)" }}
      >
        ⌘K
      </kbd>
    </div>
  );
}

/* ── Main page ───────────────────────────────────────────── */
export function HomePage() {
  return (
    <div className="flex-1 overflow-y-auto bg-background transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Greeting + search row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1
              className="text-foreground mb-1"
              style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              {greeting()}, Nitin
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: 13, fontFamily: "var(--font-body)" }}>
              Welcome to the EMP Portal. Access your knowledge base, request services, and manage tickets.
            </p>
          </div>
          <GlobalSearch />
        </div>

        {/* Responsive portal grid: 1 col mobile → 2 col tablet → 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">

          {/* ── Knowledge Base ────────────────────────────── */}
          <PortalCard accent>
            <CardHeader
              icon={<MenuBookOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />}
              title="Knowledge Base"
              subtitle="Search articles and documentation"
              onOpen={() => {}}
            />
            <div className="flex flex-col py-1">
              {kbArticles.map((a) => (
                <RowItem
                  key={a.title}
                  label={a.category}
                  title={a.title}
                />
              ))}
            </div>
            <CardFooter label="Browse all" stat1="📄 12,304 articles" stat2="👥 5,071 users" stat3="👁 0 today" />
          </PortalCard>

          {/* ── Service Catalog ───────────────────────────── */}
          <PortalCard>
            <CardHeader
              icon={<ShoppingCartOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />}
              title="Service Catalog"
              subtitle="Request services and products"
              onOpen={() => {}}
            />
            <div className="flex flex-col py-1">
              {catalogItems.map(({ rank, title }) => (
                <RowItem
                  key={title}
                  label={`Most popular #${rank}`}
                  title={title}
                />
              ))}
            </div>
            <CardFooter label="Browse all" stat1="📦 169 services" stat2="🏷 169 categories" stat3="📋 0 requests" />
          </PortalCard>

          {/* ── My Tickets ────────────────────────────────── */}
          <PortalCard>
            <CardHeader
              icon={<ConfirmationNumberOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />}
              title="My Tickets"
              subtitle="View and manage your tickets"
              onOpen={() => {}}
            />
            <div className="grid grid-cols-2 gap-3 px-5 py-4 flex-1">
              {ticketStats.map(({ label, value, icon, color, bg }) => (
                <StatChip
                  key={label}
                  icon={icon}
                  label={label}
                  value={value}
                  color={color}
                  bg={bg}
                />
              ))}
            </div>
            <CardFooter label="View all tickets" stat1="📋 0 open" stat2="👤 0 assigned" stat3="✅ 0 resolved" />
          </PortalCard>

          {/* ── Reports ───────────────────────────────────── */}
          <PortalCard>
            <CardHeader
              icon={<BarChartOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />}
              title="Reports"
              subtitle="View and analyze service reports"
              onOpen={() => {}}
            />
            <div className="grid grid-cols-2 gap-3 px-5 py-4 flex-1">
              {reportLinks.map(({ icon, label, color, bg }) => (
                <ReportTile
                  key={label}
                  icon={icon}
                  label={label}
                  color={color}
                  bg={bg}
                />
              ))}
            </div>
            <CardFooter label="View all reports" stat1="4 report types" stat2="Updated daily" stat3="" />
          </PortalCard>

        </div>
      </div>
    </div>
  );
}
