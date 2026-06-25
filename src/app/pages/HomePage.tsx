import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { createPortal } from "react-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
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
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";

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

type TicketRow = {
  id: string; title: string; category: string;
  status: "In Progress" | "Pending" | "Approved" | "Closed" | "Resolved";
  created: string; updated: string;
};

const allTickets: TicketRow[] = [
  { id: "REQ0001234", title: "Laptop Replacement",          category: "Hardware", status: "In Progress", created: "2026-06-10", updated: "2026-06-15" },
  { id: "REQ0001198", title: "VPN Access Request",          category: "Network",  status: "Pending",     created: "2026-06-08", updated: "2026-06-08" },
  { id: "REQ0001150", title: "Adobe Creative Cloud License",category: "Software", status: "Approved",    created: "2026-06-01", updated: "2026-06-03" },
  { id: "REQ0001089", title: "Email Signature Update",      category: "Email",    status: "Closed",      created: "2026-05-22", updated: "2026-05-25" },
  { id: "REQ0001042", title: "Monitor Stand Request",       category: "Hardware", status: "Closed",      created: "2026-05-15", updated: "2026-05-20" },
  { id: "INC0011987", title: "Laptop Not Booting",          category: "Hardware", status: "Resolved",    created: "2026-05-28", updated: "2026-05-30" },
  { id: "INC0011850", title: "VPN Connection Drops",        category: "Network",  status: "Closed",      created: "2026-05-10", updated: "2026-05-12" },
  { id: "INC0011820", title: "Outlook Crashes on Startup",  category: "Software", status: "Resolved",    created: "2026-05-05", updated: "2026-05-08" },
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
  accentColor = "var(--primary)",
  noHover = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
  accentColor?: string;
  noHover?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";

  const h = noHover ? false : hovered;
  const p = noHover ? false : pressed;

  return (
    <div
      onMouseEnter={() => !noHover && setHovered(true)}
      onMouseLeave={() => { if (!noHover) { setHovered(false); setPressed(false); } }}
      onMouseDown={() => !noHover && setPressed(true)}
      onMouseUp={() => !noHover && setPressed(false)}
      className={`relative flex flex-col overflow-hidden rounded-2xl bg-card transition-all duration-200 cursor-default select-none ${className}`}
      style={{
        border: h ? `1px solid ${accentColor}` : "1px solid var(--border)",
        boxShadow: p
          ? dark ? "0 1px 4px rgba(0,0,0,0.30), 0 0 0 1px rgba(0,0,0,0.20)" : "0 1px 4px rgba(0,40,85,0.07), 0 0 0 1px rgba(0,40,85,0.05)"
          : h
          ? dark ? "0 8px 24px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.28)" : "0 8px 24px rgba(0,40,85,0.10), 0 2px 6px rgba(0,40,85,0.06)"
          : dark ? "0 2px 8px rgba(0,0,0,0.32), 0 1px 3px rgba(0,0,0,0.20)" : "0 2px 8px rgba(0,40,85,0.06), 0 1px 3px rgba(0,40,85,0.04)",
        transform: p ? "scale(0.997) translateY(1px)" : h ? "translateY(-2px)" : "none",
      }}
    >
      {/* M3 state layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-150"
        style={{ backgroundColor: "var(--primary)", opacity: p ? 0.03 : 0 }}
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
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onOpen?: () => void;  // kept for call-site compat, no longer rendered
  iconBg?: string;
}) {
  return (
    <div className="px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBg ?? "var(--primary-container)" }}
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
      className="w-full flex items-start gap-2.5 px-5 py-2 border-0 bg-transparent text-left cursor-pointer transition-colors duration-150 group"
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
function CardFooter({ label, stat1, stat2, stat3, onClick }: { label: string; stat1: string; stat2: string; stat3: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="px-5 py-2.5 flex items-center justify-between gap-2"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-2 min-w-0 overflow-hidden" style={{ fontSize: 11, color: "var(--muted-foreground)", fontFamily: "var(--font-body)" }}>
        <span className="truncate">{stat1}</span>
        {stat2 && <><span className="w-px h-3 bg-border flex-shrink-0 hidden sm:block" /><span className="truncate hidden sm:block">{stat2}</span></>}
        {stat3 && <><span className="w-px h-3 bg-border flex-shrink-0 hidden lg:block" /><span className="truncate hidden lg:block">{stat3}</span></>}
      </div>
      {/* MD3 text button — tertiary CTA */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-1 border-0 cursor-pointer transition-all duration-150 flex-shrink-0 rounded-lg"
        style={{
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "var(--font-body)",
          color: "var(--primary)",
          backgroundColor: hovered ? "var(--primary-container)" : "transparent",
          padding: "4px 8px",
          letterSpacing: "0.01em",
        }}
      >
        {label}
        <ArrowForwardIcon style={{ fontSize: 13, transition: "transform 0.15s", transform: hovered ? "translateX(3px)" : "none" }} />
      </button>
    </div>
  );
}

/* ── Hero banner — compact two-column strip ──────────────── */
function HeroBanner() {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div
      className="relative overflow-hidden rounded-2xl mb-6 flex items-center justify-between gap-6 px-8 py-4"
      style={{ background: "var(--banner-gradient)" }}
    >

      {/* Text — left */}
      <div className="min-w-0 flex-1">
        <h1
          className="text-white"
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3 }}
        >
          {greeting()}, Nitin
        </h1>
        <p style={{ fontSize: "clamp(11px, 1.2vw, 13px)", fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.70)", marginTop: 2, lineHeight: 1.5 }}>
          Welcome to the ServiceNow Portal. Access your knowledge base, request services, and manage tickets.
        </p>
      </div>

      {/* Search — compact pill */}
      <div
        className="flex items-center gap-2 flex-shrink-0"
        style={{
          backgroundColor: "rgba(255,255,255,0.90)",
          borderRadius: 9999,
          padding: "7px 16px",
          width: "clamp(160px, 25%, 280px)",
          border: focused ? "1px solid rgba(255,255,255,1)" : "1px solid rgba(255,255,255,0.60)",
          boxShadow: focused ? "0 0 0 2px rgba(255,255,255,0.20)" : "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      >
        <SearchOutlinedIcon style={{ fontSize: 16, color: "#64748b", flexShrink: 0 }} />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search the portal…"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent border-0 outline-none min-w-0"
          style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "#0A1628" }}
        />
      </div>
    </div>
  );
}

/* ── Nav card data ───────────────────────────────────────── */
type SubLink = { label: string; href: string };
type NavLink = { label: string; href?: string; subLinks?: SubLink[]; onClick?: () => void };

const controlLinks: NavLink[] = [
  {
    label: "Intelligent Infrastructure",
    subLinks: [
      { label: "AWS",                   href: "#aws" },
      { label: "BaaS",                  href: "#baas" },
      { label: "DRaaS",                 href: "#draas" },
      { label: "IaaS",                  href: "#iaas" },
      { label: "Meraki | Admin",        href: "#meraki" },
      { label: "Aruba | Admin",         href: "#aruba" },
      { label: "Intersight | Admin",    href: "#intersight" },
      { label: "HPE Infosight | Admin", href: "#hpe" },
    ],
  },
  {
    label: "Contact Center",
    subLinks: [
      { label: "Webex CC | Admin",        href: "#webex-cc" },
      { label: "Five9 | Admin",           href: "#five9" },
      { label: "Outbound Engagement",     href: "#outbound" },
      { label: "Desktop Administration",  href: "#desktop-admin" },
      { label: "Workforce Engagement",    href: "#wfe" },
      { label: "Agent Skilling",          href: "#agent-skilling" },
      { label: "CCE | Administration",    href: "#cce" },
      { label: "Genesys Cloud",           href: "#genesys" },
    ],
  },
  {
    label: "Managed Security",
    subLinks: [
      { label: "SecureX | Admin",       href: "#securex" },
      { label: "Meraki | Admin",        href: "#meraki-sec" },
      { label: "Threat Investigation",  href: "#threat" },
      { label: "Umbrella | Admin",      href: "#umbrella" },
      { label: "Cisco ISE | Admin",     href: "#ise" },
      { label: "Duo Security | Admin",  href: "#duo" },
    ],
  },
  {
    label: "Unified Communications",
    subLinks: [
      { label: "Webex | Admin",          href: "#webex-uc" },
      { label: "Cisco UCM | Admin",      href: "#ucm" },
      { label: "MS Teams | Admin",       href: "#msteams" },
      { label: "Unity Connection Admin", href: "#unity" },
      { label: "Expressway | Admin",     href: "#expressway" },
    ],
  },
  {
    label: "Visual Collaboration",
    subLinks: [
      { label: "Webex Meetings | Admin", href: "#webex-meetings" },
      { label: "Cisco TMS | Admin",      href: "#tms" },
      { label: "Poly | Admin",           href: "#poly" },
      { label: "Room OS | Admin",        href: "#room-os" },
    ],
  },
];

const monitorLinks: NavLink[] = [
  {
    label: "Intelligent Infrastructure",
    subLinks: [
      { label: "Contrivian | Northstar",  href: "#ii-contrivian" },
      { label: "Speedcast | Compass",     href: "#ii-speedcast" },
      { label: "Performance Monitoring",  href: "#ii-perf-1" },
      { label: "Performance Monitoring",  href: "#ii-perf-2" },
      { label: "Performance Monitoring",  href: "#ii-perf-3" },
    ],
  },
  {
    label: "Contact Center",
    subLinks: [
      { label: "Performance Monitoring", href: "#cc-perf-1" },
      { label: "Performance Monitoring", href: "#cc-perf-2" },
      { label: "Performance Monitoring", href: "#cc-perf-3" },
    ],
  },
  {
    label: "Devices",
    subLinks: [
      { label: "Performance Monitoring", href: "#dev-perf-1" },
      { label: "Performance Monitoring", href: "#dev-perf-2" },
      { label: "Performance Monitoring", href: "#dev-perf-3" },
    ],
  },
  {
    label: "Managed Security",
    subLinks: [
      { label: "Performance Monitoring", href: "#ms-perf-1" },
      { label: "Performance Monitoring", href: "#ms-perf-2" },
      { label: "Performance Monitoring", href: "#ms-perf-3" },
    ],
  },
  {
    label: "Unified Communications",
    subLinks: [
      { label: "Performance Monitoring",  href: "#uc-perf-1" },
      { label: "User Digital Experience", href: "#uc-ude" },
      { label: "Performance Monitoring",  href: "#uc-perf-2" },
      { label: "Performance Monitoring",  href: "#uc-perf-3" },
      { label: "Performance Monitoring",  href: "#uc-perf-4" },
    ],
  },
  {
    label: "Visual Collaboration",
    subLinks: [
      { label: "Performance Monitoring", href: "#vc-perf-1" },
      { label: "Performance Monitoring", href: "#vc-perf-2" },
      { label: "Performance Monitoring", href: "#vc-perf-3" },
      { label: "HP",                     href: "#vc-hp" },
      { label: "Poly",                   href: "#vc-poly" },
    ],
  },
  {
    label: "Security",
    subLinks: [
      { label: "DeepSeas", href: "#sec-deepseas" },
    ],
  },
];

const reportLinks2: NavLink[] = [
  {
    label: "Contact Center",
    subLinks: [
      { label: "Queue Performance",   href: "#queue-perf" },
      { label: "Agent Activity",      href: "#agent-act" },
      { label: "CDR Reports",         href: "#cdr-rep" },
      { label: "SLA Compliance",      href: "#cc-sla" },
    ],
  },
  {
    label: "Devices",
    subLinks: [
      { label: "Asset Inventory",   href: "#asset-inv" },
      { label: "License Summary",   href: "#license-sum" },
      { label: "EoL / EoS Report",  href: "#eol" },
    ],
  },
  {
    label: "Intelligent Infrastructure",
    subLinks: [
      { label: "Cloud Consumption",   href: "#cloud-con" },
      { label: "Network Health",      href: "#net-health" },
      { label: "Capacity Planning",   href: "#capacity" },
      { label: "Uptime Report",       href: "#uptime" },
    ],
  },
  {
    label: "Managed Security",
    subLinks: [
      { label: "Threat Summary",      href: "#threat-sum" },
      { label: "Compliance Report",   href: "#compliance" },
      { label: "Vulnerability Report",href: "#vuln" },
    ],
  },
  {
    label: "Unified Communications",
    subLinks: [
      { label: "Call Volume Report",  href: "#call-vol" },
      { label: "Voicemail Summary",   href: "#voicemail" },
      { label: "License Usage",       href: "#uc-license" },
    ],
  },
  {
    label: "Security",
    subLinks: [
      { label: "Security Posture",    href: "#sec-posture" },
      { label: "Incident Summary",    href: "#incidents" },
      { label: "Audit Log Report",    href: "#audit-log" },
    ],
  },
];

const supportLinks: NavLink[] = [
  { label: "New Case" },
  { label: "My Cases",                       href: "#my-cases" },
  { label: "SLA Dashboard",                  href: "#sla" },
  { label: "Cisco My Entitlements",          href: "#entitlements" },
  { label: "Security Alert Case Management", href: "#sacm" },
];

/* ── Hover nav link — sub-links via portal, escapes all overflow ── */
function HoverNavLinkItem({ link }: { link: NavLink }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const hasChildren = !!link.subLinks?.length;

  useEffect(() => {
    if (hovered && rowRef.current) {
      const r = rowRef.current.getBoundingClientRect();
      setPos({ top: r.top + window.scrollY, left: r.right + 6 });
    }
  }, [hovered]);

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Parent row */}
      <div
        className="flex items-center gap-2.5 px-5 py-3 transition-colors duration-150 cursor-default"
        style={{ backgroundColor: hovered ? "var(--state-hover)" : "transparent" }}
      >
        <DescriptionOutlinedIcon
          style={{ fontSize: 14, color: hovered ? "var(--primary)" : "var(--muted-foreground)", flexShrink: 0, transition: "color 0.15s" }}
        />
        <span
          className="flex-1 truncate"
          style={{ fontSize: 12, fontWeight: 500, fontFamily: "var(--font-body)", color: hovered ? "var(--primary)" : "var(--foreground)", transition: "color 0.15s" }}
        >
          {link.label}
        </span>
        {hasChildren && (
          <ChevronRightIcon
            style={{ fontSize: 14, color: hovered ? "var(--primary)" : "var(--muted-foreground)", flexShrink: 0, transition: "color 0.15s, opacity 0.15s", opacity: hovered ? 1 : 0.4 }}
          />
        )}
      </div>

      {/* Portal popover — renders at document.body level, never clipped */}
      {hasChildren && hovered && createPortal(
        <div
          className="fixed z-[9999] flex flex-col"
          style={{
            top: pos.top,
            left: pos.left,
            minWidth: 210,
            backgroundColor: "var(--card)",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,40,85,0.16), 0 2px 8px rgba(0,40,85,0.10)",
            border: "1px solid var(--border)",
            padding: "6px 0",
          }}
        >
          {link.subLinks!.map((sub, i) => (
            <PopoverSubLink key={`${sub.label}-${i}`} label={sub.label} href={sub.href} />
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

function PopoverSubLink({ label, href }: { label: string; href: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="flex items-center gap-2.5 no-underline transition-colors duration-150"
      style={{ padding: "8px 16px", backgroundColor: hov ? "var(--state-hover)" : "transparent" }}
    >
      <span
        style={{ fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 500, color: hov ? "var(--primary)" : "var(--foreground)", transition: "color 0.15s", flex: 1 }}
      >
        {label}
      </span>
      <OpenInNewIcon
        style={{ fontSize: 11, color: hov ? "var(--primary)" : "var(--muted-foreground)", flexShrink: 0, opacity: hov ? 1 : 0.45, transition: "opacity 0.15s, color 0.15s" }}
      />
    </a>
  );
}

/* ── Nav link row — leaf link or accordion parent ────────── */
function NavLinkItem({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasChildren = !!link.subLinks?.length;

  /* Parent with sub-links: toggle accordion, no navigation */
  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-expanded={open}
          className="w-full flex items-center gap-2.5 px-5 py-3 border-0 bg-transparent text-left cursor-pointer transition-colors duration-150"
          style={{ backgroundColor: hovered ? "var(--state-hover)" : "transparent" }}
        >
          <DescriptionOutlinedIcon
            style={{ fontSize: 14, color: hovered ? "var(--primary)" : "var(--muted-foreground)", flexShrink: 0, transition: "color 0.15s" }}
          />
          <span
            className="flex-1 truncate"
            style={{ fontSize: 12, fontWeight: 500, fontFamily: "var(--font-body)", color: hovered ? "var(--primary)" : "var(--foreground)", transition: "color 0.15s" }}
          >
            {link.label}
          </span>
          <ExpandMoreIcon
            style={{ fontSize: 15, color: "var(--muted-foreground)", flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
          />
        </button>

        {open && (
          <div>
            {link.subLinks!.map((sub, i) => (
              <SubLinkAnchor key={`${sub.label}-${i}`} label={sub.label} href={sub.href} />
            ))}
          </div>
        )}
      </div>
    );
  }

  /* Leaf link — full row is a real anchor */
  return (
    <a
      href={link.href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5 px-5 py-3 no-underline transition-colors duration-150"
      style={{ backgroundColor: hovered ? "var(--state-hover)" : "transparent" }}
    >
      <DescriptionOutlinedIcon
        style={{ fontSize: 14, color: hovered ? "var(--primary)" : "var(--muted-foreground)", flexShrink: 0, transition: "color 0.15s" }}
      />
      <span
        className="flex-1 truncate"
        style={{ fontSize: 12, fontWeight: 500, fontFamily: "var(--font-body)", color: hovered ? "var(--primary)" : "var(--foreground)", transition: "color 0.15s" }}
      >
        {link.label}
      </span>
      <OpenInNewIcon
        style={{ fontSize: 12, color: hovered ? "var(--primary)" : "var(--muted-foreground)", flexShrink: 0, opacity: hovered ? 1 : 0.45, transition: "opacity 0.15s, color 0.15s" }}
        aria-hidden="true"
      />
    </a>
  );
}

/* ── Sub-link anchor — MD3 nested list item ─────────────── */
function SubLinkAnchor({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center no-underline transition-colors duration-150"
      style={{
        padding: "9px 20px 9px 44px",
        backgroundColor: hovered ? "var(--state-hover)" : "transparent",
      }}
    >
      <span
        className="flex-1 truncate"
        style={{ fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 400, color: hovered ? "var(--primary)" : "var(--muted-foreground)", transition: "color 0.15s" }}
      >
        {label}
      </span>
      <OpenInNewIcon
        style={{ fontSize: 11, color: hovered ? "var(--primary)" : "var(--muted-foreground)", flexShrink: 0, opacity: hovered ? 1 : 0.45, transition: "opacity 0.15s, color 0.15s" }}
        aria-hidden="true"
      />
    </a>
  );
}

/* ── Support contact row (icon + value, DrillSubLink style) ── */
function SupportContactRow({ href, icon, value, accentColor = "#7C3AED", accentBg = "#F5F3FF" }: {
  href: string; icon: React.ReactNode; value: string; accentColor?: string; accentBg?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5 no-underline transition-colors duration-150"
      style={{ padding: "9px 20px", backgroundColor: hovered ? accentBg : "transparent" }}
    >
      <span style={{ color: hovered ? accentColor : "var(--muted-foreground)", display: "flex" }}>{icon}</span>
      <span className="truncate" style={{ fontSize: 12, fontWeight: 500, fontFamily: "var(--font-body)", color: hovered ? accentColor : "var(--foreground)", transition: "color 0.15s" }}>{value}</span>
    </a>
  );
}

/* ── Drill-down nav menu — parent list → sub-list ───────── */
function DrillDownNavMenu({ links, accentColor = "var(--primary)", accentBg = "var(--state-hover)" }: { links: NavLink[]; accentColor?: string; accentBg?: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (activeIndex !== null) {
    const active = links[activeIndex];
    return (
      <div className="flex flex-col" style={{ maxHeight: 264, overflowY: "auto" }}>
        <button
          type="button"
          onClick={() => setActiveIndex(null)}
          className="flex items-center gap-2 px-5 py-2.5 border-0 bg-transparent cursor-pointer text-left w-full flex-shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = accentBg; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <ArrowBackIcon style={{ fontSize: 13, color: "var(--muted-foreground)", flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {active.label}
          </span>
        </button>
        <div className="flex flex-col py-1">
          {active.subLinks!.map((sub, i) => (
            <DrillSubLink key={`${sub.label}-${i}`} label={sub.label} href={sub.href} accentColor={accentColor} accentBg={accentBg} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-2" style={{ maxHeight: 264, overflowY: "auto" }}>
      {links.map((link, i) => {
        if (link.subLinks?.length) {
          return (
            <DrillParentRow key={link.label} link={link} onClick={() => setActiveIndex(i)} accentColor={accentColor} accentBg={accentBg} />
          );
        }
        return <DrillSubLink key={link.label} label={link.label} href={link.href ?? "#"} onClick={link.onClick} accentColor={accentColor} accentBg={accentBg} />;
      })}
    </div>
  );
}

function DrillParentRow({ link, onClick, accentColor = "var(--primary)", accentBg = "var(--state-hover)" }: { link: NavLink; onClick: () => void; accentColor?: string; accentBg?: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full flex items-center gap-2.5 px-5 py-3 border-0 bg-transparent text-left cursor-pointer transition-colors duration-150"
      style={{ backgroundColor: hovered ? accentBg : "transparent" }}
    >
      <DescriptionOutlinedIcon
        style={{ fontSize: 14, color: "var(--muted-foreground)", flexShrink: 0, transition: "color 0.15s" }}
      />
      <span
        className="flex-1 truncate"
        style={{ fontSize: 12, fontWeight: 500, fontFamily: "var(--font-body)", color: "var(--foreground)", transition: "color 0.15s" }}
      >
        {link.label}
      </span>
      <ChevronRightIcon
        style={{ fontSize: 14, color: hovered ? accentColor : "var(--muted-foreground)", flexShrink: 0, transition: "color 0.15s" }}
      />
    </button>
  );
}

function DrillSubLink({ label, href, onClick, accentColor = "var(--primary)", accentBg = "var(--state-hover)" }: { label: string; href: string; onClick?: () => void; accentColor?: string; accentBg?: string }) {
  const [hovered, setHovered] = useState(false);

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full flex items-center gap-2.5 border-0 bg-transparent text-left cursor-pointer transition-colors duration-150"
        style={{ padding: "9px 20px", backgroundColor: hovered ? accentBg : "transparent" }}
      >
        <span
          className="flex-1 truncate"
          style={{ fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 400, color: hovered ? accentColor : "var(--foreground)", transition: "color 0.15s" }}
        >
          {label}
        </span>
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5 no-underline transition-colors duration-150"
      style={{ padding: "9px 20px", backgroundColor: hovered ? accentBg : "transparent" }}
    >
      <span
        className="flex-1 truncate"
        style={{ fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 400, color: "var(--foreground)", transition: "color 0.15s" }}
      >
        {label}
      </span>
      <OpenInNewIcon
        style={{ fontSize: 11, color: "var(--muted-foreground)", flexShrink: 0, opacity: hovered ? 1 : 0.45, transition: "opacity 0.15s, color 0.15s" }}
        aria-hidden="true"
      />
    </a>
  );
}

/* ── Active ticket row (home card) — MD3 refresh ─────────── */
const statusMeta: Record<TicketRow["status"], { label: string; textColor: string; bg: string }> = {
  "In Progress": { label: "Active",   textColor: "#1D4ED8", bg: "#DBEAFE" },
  "Pending":     { label: "Pending",  textColor: "#92400E", bg: "#FFF4E0" },
  "Approved":    { label: "Approved",    textColor: "#166534", bg: "#DCFCE7" },
  "Closed":      { label: "Closed",      textColor: "#374151", bg: "#F3F4F6" },
  "Resolved":    { label: "Resolved",    textColor: "#065F46", bg: "#D1FAE5" },
};

function relativeDate(iso: string) {
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days}d ago`;
}

function ActiveTicketRow({ ticket, isLast, onClick }: { ticket: TicketRow; isLast: boolean; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  const s = statusMeta[ticket.status];

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={`${ticket.title} — ${s.label}`}
      className="w-full flex items-center gap-3 border-0 text-left cursor-pointer transition-colors duration-150"
      style={{
        padding: "10px 16px",
        backgroundColor: hov ? "color-mix(in srgb, var(--primary-container) 28%, transparent)" : "var(--card)",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
      }}
    >
      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span style={{ fontSize: 10, fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--muted-foreground)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
            {ticket.category}
          </span>
          <span style={{ fontSize: 10, color: "var(--muted-foreground)" }}>·</span>
          <span style={{ fontSize: 10, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>
            {ticket.id}
          </span>
        </div>
        <p
          className="truncate"
          style={{ fontSize: 13, fontWeight: 500, fontFamily: "var(--font-body)", color: hov ? "var(--primary)" : "var(--foreground)", lineHeight: 1.4, transition: "color 0.15s" }}
        >
          {ticket.title}
        </p>
      </div>

      {/* Right side: status chip + date */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        {/* State label — outlined pill, dot as the color cue */}
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 10, fontWeight: 600, fontFamily: "var(--font-body)",
          color: s.textColor,
          backgroundColor: "transparent",
          border: `1.5px solid ${s.textColor}50`,
          borderRadius: 9999,
          padding: "2px 8px 2px 6px",
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: s.textColor, flexShrink: 0, display: "inline-block" }} />
          {s.label}
        </span>
        <span style={{ fontSize: 10, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>
          {relativeDate(ticket.updated)}
        </span>
      </div>
    </button>
  );
}

/* ── Main page ───────────────────────────────────────────── */
export function HomePage({ onNav }: { onNav?: (p: string) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";

  /* Per-card palettes — dark uses lighter hues readable on dark surfaces */
  const ctrl    = { color: dark ? "#93C5FD" : "#1D4ED8", bg: dark ? "rgba(147,197,253,0.10)" : "#EFF6FF", iconColor: dark ? "#93C5FD" : "#1D4ED8", iconBg: dark ? "rgba(147,197,253,0.14)" : "#DBEAFE" };
  const monitor = { color: dark ? "#2DD4BF" : "#0D9488", bg: dark ? "rgba(45,212,191,0.10)"  : "#F0FDFA", iconColor: dark ? "#2DD4BF" : "#0D9488", iconBg: dark ? "rgba(45,212,191,0.14)"  : "#CCFBF1" };
  const rpt     = { color: dark ? "#FB923C" : "#C2410C", bg: dark ? "rgba(251,146,60,0.10)"  : "#FFF7ED", iconColor: dark ? "#FB923C" : "#C2410C", iconBg: dark ? "rgba(251,146,60,0.14)"  : "#FFEDD5" };
  const supp    = { color: dark ? "#C4B5FD" : "#7C3AED", bg: dark ? "rgba(196,181,253,0.10)" : "#F5F3FF", iconColor: dark ? "#C4B5FD" : "#7C3AED", iconBg: dark ? "rgba(196,181,253,0.14)" : "#EDE9FE" };

  return (
    <div className="flex-1 overflow-y-auto bg-background transition-colors duration-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <HeroBanner />

        {/* Nav cards: Control, Monitor, Report, Support */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

          {/* ── Control ──────────────────────────────────── */}
          <PortalCard accentColor={ctrl.color}>
            <CardHeader
              icon={<SettingsOutlinedIcon style={{ fontSize: 17, color: ctrl.iconColor }} />}
              iconBg={ctrl.iconBg}
              title="Control"
              subtitle="Manage infrastructure and services"
              onOpen={() => {}}
            />
            <DrillDownNavMenu links={controlLinks} accentColor={ctrl.color} accentBg={ctrl.bg} />
          </PortalCard>

          {/* ── Monitor ──────────────────────────────────── */}
          <PortalCard accentColor={monitor.color}>
            <CardHeader
              icon={<VisibilityOutlinedIcon style={{ fontSize: 17, color: monitor.iconColor }} />}
              iconBg={monitor.iconBg}
              title="Monitor"
              subtitle="Track performance and health"
              onOpen={() => {}}
            />
            <DrillDownNavMenu links={monitorLinks} accentColor={monitor.color} accentBg={monitor.bg} />
          </PortalCard>

          {/* ── Report ───────────────────────────────────── */}
          <PortalCard accentColor={rpt.color}>
            <CardHeader
              icon={<AssessmentOutlinedIcon style={{ fontSize: 17, color: rpt.iconColor }} />}
              iconBg={rpt.iconBg}
              title="Report"
              subtitle="View analytics and service reports"
              onOpen={() => {}}
            />
            <DrillDownNavMenu links={reportLinks2} accentColor={rpt.color} accentBg={rpt.bg} />
          </PortalCard>

          {/* ── Support ──────────────────────────────────── */}
          <PortalCard accentColor={supp.color}>
            <CardHeader
              icon={<HelpOutlineOutlinedIcon style={{ fontSize: 17, color: supp.iconColor }} />}
              iconBg={supp.iconBg}
              title="Support"
              subtitle="Cases, entitlements, and alerts"
              onOpen={() => {}}
            />
            <DrillDownNavMenu
              links={supportLinks.map((l) =>
                l.label === "New Case"  ? { ...l, onClick: () => setDrawerOpen(true) } :
                l.label === "My Cases" ? { ...l, onClick: () => onNav?.("My Cases") } :
                l
              )}
              accentColor={supp.color}
              accentBg={supp.bg}
            />
          </PortalCard>

        </div>

        <NewTicketDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* Portal grid — 12-col base, My Tickets leads at col-span-6 */}
        <div className="grid grid-cols-12 gap-6">

          {/* ── My Tickets — col-span-6, first ────────────── */}
          <div className="col-span-12 xl:col-span-6 flex">
            <PortalCard className="flex-1" accentColor="var(--primary)">
              <div className="px-5 pt-4 pb-3 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--primary-container)" }}>
                  <AssignmentTurnedInOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />
                </div>
                <div className="min-w-0">
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3, color: "var(--foreground)" }}>My Cases</h3>
                  <p style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 2 }}>Active cases requiring your attention</p>
                </div>
                {/* Stat chips — KPI counter style: filled pill, number is the hero */}
                <div className="flex items-center gap-2 ml-auto flex-shrink-0">
                  {[
                    { label: "Active",   count: allTickets.filter(t => t.status === "In Progress" || t.status === "Pending" || t.status === "Approved").length, color: "#1D4ED8", bg: "#DBEAFE" },
                    { label: "Resolved", count: allTickets.filter(t => t.status === "Resolved").length,                                                          color: "#065F46", bg: "#D1FAE5" },
                    { label: "Closed",   count: allTickets.filter(t => t.status === "Closed").length,                                                            color: "#374151", bg: "#F3F4F6" },
                  ].map(({ label, count, color, bg }) => (
                    <div key={label} style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "4px 10px",
                      borderRadius: 9999,
                      backgroundColor: bg,
                      border: `1px solid ${color}28`,
                    }}>
                      <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "var(--font-heading)", color, lineHeight: 1 }}>{count}</span>
                      <span style={{ fontSize: 9, fontWeight: 600, fontFamily: "var(--font-body)", color, opacity: 0.65, lineHeight: 1 }}>{label}</span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Create new case"
                  className="flex items-center gap-1 cursor-pointer border-0 transition-all duration-150 flex-shrink-0"
                  style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: 9999, padding: "6px 12px", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-body)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  <AddOutlinedIcon style={{ fontSize: 13 }} />
                  New Case
                </button>
              </div>

              {/* Active ticket rows */}
              <div className="flex flex-col overflow-y-auto" style={{ maxHeight: 228 }}>
                {allTickets
                  .filter((t) => t.status === "In Progress" || t.status === "Pending" || t.status === "Approved")
                  .map((ticket, i, arr) => (
                    <ActiveTicketRow
                      key={ticket.id}
                      ticket={ticket}
                      isLast={i === arr.length - 1}
                      onClick={() => onNav?.("My Cases")}
                    />
                  ))}
              </div>
              <CardFooter
                label="View All"
                stat1={`${allTickets.length} total cases`}
                stat2={`${allTickets.filter(t => t.status === "Resolved" || t.status === "Closed").length} completed`}
                stat3=""
                onClick={() => onNav?.("My Cases")}
              />
            </PortalCard>
          </div>

          {/* ── Knowledge Base — col-span-3 (matches Report card width) ── */}
          <div className="col-span-12 xl:col-span-3 flex">
            <PortalCard className="flex-1" accentColor="var(--primary)">
              <CardHeader
                icon={<MenuBookOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />}
                title="Knowledge Base"
                subtitle="Browse articles and documentation"
              />
              <div className="flex flex-col flex-1">
                {kbArticles.slice(0, 3).map((a) => (
                  <RowItem key={a.title} label={a.category} title={a.title} />
                ))}
              </div>
              <CardFooter label="View All" stat1="12,304 articles" stat2="5,071 users" stat3="" onClick={() => onNav?.("Knowledge Base")} />
            </PortalCard>
          </div>

          {/* ── Right column — Contact Support + Action Needed stacked ── */}
          <div className="col-span-12 xl:col-span-3 flex flex-col gap-6 self-start">

            {/* Contact Support */}
            <PortalCard accentColor="var(--primary)">
              {/* Inline header with New Case CTA right-aligned */}
              <div className="px-5 pt-4 pb-3 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--muted)" }}>
                  <SupportAgentOutlinedIcon style={{ fontSize: 17, color: "var(--foreground)" }} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3, color: "var(--foreground)" }}>Contact Support</h3>
                  <p style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 2 }}>Get help from our team</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="flex items-center gap-1 cursor-pointer border-0 transition-all duration-150 flex-shrink-0"
                  style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: 9999, padding: "6px 12px", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-body)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  <AddOutlinedIcon style={{ fontSize: 13 }} />
                  New Case
                </button>
              </div>
              <div className="flex flex-col">
                <a
                  href="mailto:itsupport@nwncarousel.com"
                  className="flex items-center gap-2.5 no-underline transition-colors duration-150"
                  style={{ padding: "7px 16px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--state-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <EmailOutlinedIcon style={{ fontSize: 15, color: "var(--muted-foreground)", flexShrink: 0 }} />
                  <div className="min-w-0">
                    <p style={{ fontSize: 9, fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--muted-foreground)", lineHeight: 1.2 }}>Email</p>
                    <p className="truncate" style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--primary)", lineHeight: 1.3 }}>itsupport@nwncarousel.com</p>
                  </div>
                </a>
                <a
                  href="tel:+18664084596"
                  className="flex items-center gap-2.5 no-underline transition-colors duration-150"
                  style={{ padding: "7px 16px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--state-hover)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <PhoneOutlinedIcon style={{ fontSize: 15, color: "var(--muted-foreground)", flexShrink: 0 }} />
                  <div className="min-w-0">
                    <p style={{ fontSize: 9, fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--muted-foreground)", lineHeight: 1.2 }}>Phone</p>
                    <p style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.3 }}>(866) 408-4596</p>
                  </div>
                </a>
              </div>
            </PortalCard>

            {/* Action Needed */}
            <PortalCard accentColor="#C2410C">
              <CardHeader
                icon={<AssignmentTurnedInOutlinedIcon style={{ fontSize: 17, color: "#C2410C" }} />}
                iconBg="#FFEDD5"
                title="Action Needed"
                subtitle="Cases awaiting your response"
              />
              <div className="flex items-center gap-2 px-5 py-3">
                <AssignmentTurnedInOutlinedIcon style={{ fontSize: 15, color: "var(--muted-foreground)", flexShrink: 0 }} />
                <p style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", lineHeight: 1.4 }}>
                  No cases awaiting your response.
                </p>
              </div>
            </PortalCard>

          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Shared breadcrumb ───────────────────────────────────── */
function Breadcrumb({ items, onNav }: { items: { label: string; page?: string }[]; onNav?: (p: string) => void }) {
  return (
    <nav className="flex items-center gap-1 mb-4" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1">
          {i > 0 && <NavigateNextIcon style={{ fontSize: 16, color: "var(--muted-foreground)" }} />}
          {item.page && onNav ? (
            <button
              type="button"
              onClick={() => onNav(item.page!)}
              className="border-0 bg-transparent cursor-pointer p-0 transition-colors duration-150"
              style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "var(--primary)", fontWeight: i === items.length - 1 ? 600 : 400 }}
            >
              {item.label}
            </button>
          ) : (
            <span style={{ fontSize: 13, fontFamily: "var(--font-body)", color: i === items.length - 1 ? "var(--foreground)" : "var(--muted-foreground)", fontWeight: i === items.length - 1 ? 600 : 400 }}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ── Ticket status chip ──────────────────────────────────── */
function StatusChip({ status }: { status: TicketRow["status"] }) {
  const map: Record<TicketRow["status"], { label: string; color: string }> = {
    "In Progress": { label: "Active",   color: "#1D4ED8" },
    "Pending":     { label: "Pending",  color: "#92400E" },
    "Approved":    { label: "Approved", color: "#166534" },
    "Closed":      { label: "Closed",   color: "#374151" },
    "Resolved":    { label: "Resolved", color: "#065F46" },
  };
  const s = map[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      fontSize: 11, fontWeight: 600, fontFamily: "var(--font-body)",
      color: s.color,
      border: `1.5px solid ${s.color}50`,
      borderRadius: 9999,
      padding: "3px 9px 3px 7px",
      whiteSpace: "nowrap",
      letterSpacing: "0.01em",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: s.color, flexShrink: 0 }} />
      {s.label}
    </span>
  );
}

/* ── Reusable enterprise page header ─────────────────────── */
function PageHeader({
  title, tag, subtitle, breadcrumb, onNav, actions, transparent = false,
}: {
  title: string;
  tag?: string;
  subtitle: string;
  breadcrumb?: { label: string; page?: string }[];
  onNav?: (p: string) => void;
  actions?: React.ReactNode;
  transparent?: boolean;
}) {
  return (
    <div style={transparent ? {} : { backgroundColor: "var(--card)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="pt-4 pb-1">
            <Breadcrumb items={breadcrumb} onNav={onNav} />
          </div>
        )}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 ${breadcrumb && breadcrumb.length > 0 ? "" : "pt-3"}`}>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                {title}
              </h1>
              {tag && (
                <span style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--muted-foreground)", backgroundColor: "var(--muted)", border: "1px solid var(--border)", borderRadius: 9999, padding: "2px 10px" }}>
                  {tag}
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 3 }}>{subtitle}</p>
          </div>
          {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

/* ── KB + Catalog shared helpers ─────────────────────────── */

type KBArticleItem = { id: string; title: string; category: string; views: number; rating: number; date: string };
const kbArticlesDetail: KBArticleItem[] = [
  { id: "KB0001", title: "Collector Troubleshooting",                                                          category: "Standard Operating Procedures", views: 0, rating: 4.5, date: "Aug 2, 2023"  },
  { id: "KB0002", title: "YALE UNIVERSITY Disaster Recovery Documentation",                                    category: "Policy/Information",            views: 0, rating: 0,   date: "Jun 22, 2017" },
  { id: "KB0003", title: "NWN – Eagle: Link to RealMed (Availit…)",                                          category: "Eagle",                         views: 0, rating: 0,   date: "Nov 27, 2025" },
  { id: "KB0004", title: "Avaya Aura™ Communication Manager Branch and Adjunct Software Compatibility Matrix", category: "ECG",                          views: 0, rating: 0,   date: "Feb 8, 2022"  },
  { id: "KB0005", title: "Ribbon (Sonus): Core Series: Reference: About Private Call Routing",                category: "ECG",                          views: 0, rating: 0,   date: "Oct 4, 2022"  },
  { id: "KB0006", title: "Keolis – Overview of NetworkNow (Desktop Version)",                                 category: "KCS",                          views: 0, rating: 0,   date: "Aug 13, 2025" },
  { id: "KB0007", title: "IDEX Moving users between the HQ locations",                                        category: "Uncategorized",                views: 0, rating: 0,   date: "Jun 5, 2025"  },
  { id: "KB0008", title: "Crane - Proficy Historian Excel Add In Installation",                               category: "Installs",                     views: 0, rating: 0,   date: "Jul 31, 2018" },
  { id: "KB0009", title: "Shift Handoff - 11.29.2021 - Second to Third",                                     category: "Second Shift to Third Shift",  views: 0, rating: 0,   date: "Nov 29, 2021" },
  { id: "KB0010", title: "Shift Handoff - 05.27.2023 - Second to Third",                                     category: "Second Shift to Third Shift",  views: 0, rating: 1,   date: "May 27, 2023" },
];

type ServiceItemType = { id: string; title: string; description: string; category: string };
const serviceItemsData: ServiceItemType[] = [
  { id: "SI001", title: "DID Call Forward Add/Remove",                 description: "Add or Remove Call Forwarding for your DID.",                                    category: "Telephony"        },
  { id: "SI002", title: "DID Disconnect",                             description: "Disconnect your DID.",                                                           category: "Telephony"        },
  { id: "SI003", title: "DID Add New Number",                         description: "Request a new DID number assignment.",                                           category: "Telephony"        },
  { id: "SI004", title: "Move, Add, Change, Delete (MACD) Request",   description: "Request MACD Services.",                                                         category: "Telephony"        },
  { id: "SI005", title: "Contact Center Request",                     description: "Request a functional change to your NWN service.",                               category: "Contact Center"   },
  { id: "SI006", title: "Device Request",                             description: "Request a functional change to your Service.",                                   category: "Hardware"         },
  { id: "SI007", title: "Service Desk Functional Change",             description: "Request a functional change for Service Desk.",                                  category: "IT Support"       },
  { id: "SI008", title: "Monitoring or Management Request",           description: "Request a functional change to your managed service.",                           category: "Managed Services" },
  { id: "SI009", title: "On Demand Request",                         description: "Request On Demand Support.",                                                     category: "IT Support"       },
  { id: "SI010", title: "Bulk TimeCard Import",                       description: "Upload your spreadsheet to create Time Cards for the selected project task.",    category: "Operations"       },
  { id: "SI011", title: "License Entitlement Delivery (LED) Request", description: "The LED request aids in the Licensing of Avaya Telephony platforms.",           category: "Licensing"        },
  { id: "SI012", title: "Project Intake Form",                        description: "Submit a Project Intake Form for new project requests.",                        category: "Projects"         },
];

const kbCategoryColors: Record<string, { color: string; bg: string }> = {
  "Standard Operating Procedures": { color: "#1D4ED8", bg: "#DBEAFE" },
  "Policy/Information":            { color: "#7C3AED", bg: "#EDE9FE" },
  "Eagle":                         { color: "#0D9488", bg: "#CCFBF1" },
  "ECG":                           { color: "#C2410C", bg: "#FFEDD5" },
  "KCS":                           { color: "#065F46", bg: "#D1FAE5" },
  "Installs":                      { color: "#0369A1", bg: "#CCF0FF" },
  "Second Shift to Third Shift":   { color: "#92400E", bg: "#FFF4E0" },
};
function kbCatStyle(cat: string) { return kbCategoryColors[cat] ?? { color: "#374151", bg: "#F3F4F6" }; }

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
      {[1,2,3,4,5].map((i) => {
        const full = rating >= i;
        const half = !full && rating >= i - 0.5;
        return (
          <span key={i} style={{ fontSize: 13, color: full || half ? "#FBBF24" : "#D1D5DB", lineHeight: 1 }}>
            {full ? "★" : half ? "⭐" : "☆"}
          </span>
        );
      })}
      {rating > 0 && <span style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginLeft: 4 }}>{rating.toFixed(1)}</span>}
    </div>
  );
}

function DataPagination({ total, page, perPage, onPage, onPerPage, itemLabel = "items", perPageOptions = [10, 25, 50, 100] }: {
  total: number; page: number; perPage: number;
  onPage: (p: number) => void; onPerPage: (n: number) => void; itemLabel?: string; perPageOptions?: number[];
}) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage + 1;
  const end   = Math.min(page * perPage, total);

  const nums: (number | "…")[] = [];
  if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) nums.push(i); }
  else {
    nums.push(1);
    if (page > 3) nums.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) nums.push(i);
    if (page < totalPages - 2) nums.push("…");
    nums.push(totalPages);
  }

  const btnBase: React.CSSProperties = {
    width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", backgroundColor: "transparent", flexShrink: 0,
    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--muted-foreground)",
    transition: "all 0.15s",
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-2 px-6 py-3" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="flex items-center gap-2">
        <span style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>
          Showing {start.toLocaleString()}–{end.toLocaleString()} of {total.toLocaleString()} {itemLabel}
        </span>
        <select value={perPage} onChange={(e) => { onPerPage(Number(e.target.value)); onPage(1); }}
          style={{ border: "1px solid var(--border)", borderRadius: 8, padding: "3px 8px", fontSize: 12, fontFamily: "var(--font-body)", color: "var(--foreground)", backgroundColor: "var(--card)", cursor: "pointer" }}>
          {perPageOptions.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
        <span style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>per page</span>
      </div>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onPage(1)} disabled={page === 1} style={{ ...btnBase, opacity: page === 1 ? 0.35 : 1 }}>
          <span style={{ fontSize: 9, letterSpacing: -1 }}>|◀</span>
        </button>
        <button type="button" onClick={() => onPage(page - 1)} disabled={page === 1} style={{ ...btnBase, opacity: page === 1 ? 0.35 : 1 }}>
          <span style={{ fontSize: 9 }}>◀</span>
        </button>
        {nums.map((n, i) => n === "…"
          ? <span key={`el${i}`} style={{ width: 32, textAlign: "center", fontSize: 12, color: "var(--muted-foreground)" }}>…</span>
          : <button key={n} type="button" onClick={() => onPage(n as number)} style={{ ...btnBase, backgroundColor: page === n ? "var(--primary)" : "transparent", color: page === n ? "#fff" : "var(--foreground)", border: page === n ? "1px solid var(--primary)" : "1px solid var(--border)", fontWeight: page === n ? 700 : 500 }}>{n}</button>
        )}
        <button type="button" onClick={() => onPage(page + 1)} disabled={page === totalPages} style={{ ...btnBase, opacity: page === totalPages ? 0.35 : 1 }}>
          <span style={{ fontSize: 9 }}>▶</span>
        </button>
        <button type="button" onClick={() => onPage(totalPages)} disabled={page === totalPages} style={{ ...btnBase, opacity: page === totalPages ? 0.35 : 1 }}>
          <span style={{ fontSize: 9, letterSpacing: -1 }}>▶|</span>
        </button>
      </div>
    </div>
  );
}

function KBArticleRow({ article, isLast }: { article: KBArticleItem; isLast: boolean }) {
  const [hov, setHov] = useState(false);
  const cat = kbCatStyle(article.category);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="flex items-center gap-4 px-6 py-2.5 cursor-pointer transition-colors duration-150"
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)", backgroundColor: hov ? "var(--state-hover)" : "transparent" }}>
      <div className="flex items-center justify-center flex-shrink-0 rounded-xl transition-colors duration-150"
        style={{ width: 34, height: 34, backgroundColor: hov ? "var(--primary-container)" : "var(--muted)" }}>
        <MenuBookOutlinedIcon style={{ fontSize: 18, color: hov ? "var(--primary)" : "var(--muted-foreground)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", color: hov ? "var(--primary)" : "var(--foreground)", lineHeight: 1.4, transition: "color 0.15s" }}>
          {article.title}
        </p>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span style={{ fontSize: 10, fontWeight: 600, fontFamily: "var(--font-body)", color: cat.color, backgroundColor: cat.bg, borderRadius: 9999, padding: "2px 8px", whiteSpace: "nowrap" }}>
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <VisibilityOutlinedIcon style={{ fontSize: 12, color: "var(--muted-foreground)" }} />
            <span style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>{article.views}</span>
          </span>
          <StarRating rating={article.rating} />
          <span style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>{article.date}</span>
        </div>
      </div>
      <ChevronRightIcon style={{ fontSize: 16, color: "var(--primary)", flexShrink: 0, opacity: hov ? 1 : 0, transition: "opacity 0.15s" }} />
    </div>
  );
}

/* ── Knowledge Base page ─────────────────────────────────── */
export function KnowledgeBasePage({ onNav }: { onNav?: (p: string) => void }) {
  const [kbSearch,  setKbSearch]  = useState("");
  const [kbPage,    setKbPage]    = useState(1);
  const [kbPerPage, setKbPerPage] = useState(5);
  const totalArticles = 13108;

  const visible = kbArticlesDetail.filter((a) =>
    !kbSearch || a.title.toLowerCase().includes(kbSearch.toLowerCase()) || a.category.toLowerCase().includes(kbSearch.toLowerCase())
  );
  const paged = visible.slice((kbPage - 1) * kbPerPage, kbPage * kbPerPage);

  const filterGroups = [
    { label: "All Knowledge Bases", opts: ["All Knowledge Bases"] },
    { label: "All Categories", opts: ["All Categories", "Standard Operating Procedures", "Policy/Information", "ECG", "KCS", "Eagle", "Installs", "Uncategorized"] },
    { label: "All Authors",    opts: ["All Authors"] },
    { label: "Most Viewed",    opts: ["Most Viewed", "Least Viewed", "Newest", "Oldest"] },
    { label: "All Time",       opts: ["All Time", "Last 7 days", "Last 30 days", "Last Year"] },
    { label: "All Ratings",    opts: ["All Ratings", "4+ Stars", "3+ Stars"] },
    { label: "All Views",      opts: ["All Views", "0 views", "1–10 views", "10+ views"] },
  ];

  return (
    <div className="flex-1 overflow-hidden bg-background transition-colors duration-200">
      <PageHeader
        title="Knowledge Base"
        subtitle="Search articles and documentation to find the answers you need."
        onNav={onNav}
        transparent
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">

        {/* Articles card — search + filters folded into header */}
        <div className="rounded-2xl bg-card overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {/* Header row: title left · search right */}
          <div className="flex items-center justify-between gap-3 px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2 flex-shrink-0">
              <TrendingUpIcon style={{ fontSize: 16, color: "var(--primary)" }} />
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>
                Articles ({totalArticles.toLocaleString()})
              </span>
            </div>
            <div className="flex items-center gap-2"
              style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)", borderRadius: 9999, padding: "5px 14px", width: 260 }}>
              <SearchOutlinedIcon style={{ fontSize: 14, color: "var(--muted-foreground)", flexShrink: 0 }} />
              <input type="text" value={kbSearch} placeholder="Search articles…"
                onChange={(e) => { setKbSearch(e.target.value); setKbPage(1); }}
                className="flex-1 bg-transparent border-0 outline-none"
                style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--foreground)" }} />
            </div>
          </div>
          {/* Filter strip */}
          <div className="flex items-center gap-2 px-6 py-2 flex-wrap" style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--muted)" }}>
            {filterGroups.map(({ label, opts }) => (
              <div key={label} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                <select style={{ appearance: "none", WebkitAppearance: "none", border: "1px solid var(--border)", borderRadius: 9999, padding: "3px 24px 3px 10px", fontSize: 11, fontFamily: "var(--font-body)", color: "var(--foreground)", backgroundColor: "var(--card)", cursor: "pointer", outline: "none" }}>
                  {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <ExpandMoreIcon style={{ position: "absolute", right: 6, fontSize: 12, color: "var(--muted-foreground)", pointerEvents: "none" }} />
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            {paged.map((a, i) => <KBArticleRow key={a.id} article={a} isLast={i === paged.length - 1} />)}
            {paged.length === 0 && (
              <p className="px-6 py-6 text-center" style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>No articles found.</p>
            )}
          </div>
          <DataPagination total={totalArticles} page={kbPage} perPage={kbPerPage} onPage={setKbPage} onPerPage={setKbPerPage} itemLabel="articles" perPageOptions={[5, 10, 25, 50]} />
        </div>

      </div>
    </div>
  );
}

/* ── Service Catalog page ────────────────────────────────── */
type CatalogCategory = { label: string; description: string; items: number; icon: React.ComponentType<{ style?: React.CSSProperties }>; iconColor: string; iconBg: string };

const catalogCategories: CatalogCategory[] = [
  { label: "Hardware",          description: "Laptops, monitors, peripherals", items: 24, icon: LaptopOutlinedIcon,       iconColor: "#0369A1", iconBg: "#CCF0FF" },
  { label: "Software",          description: "Applications, licenses, tools",  items: 18, icon: AppsOutlinedIcon,         iconColor: "#4338CA", iconBg: "#EDE9FE" },
  { label: "Network & Telecom", description: "VPN, Wi-Fi, phone services",     items: 12, icon: WifiOutlinedIcon,         iconColor: "#0D9488", iconBg: "#CCFBF1" },
  { label: "Access & Security", description: "Permissions, credentials",       items:  9, icon: GppGoodOutlinedIcon,      iconColor: "#1D4ED8", iconBg: "#DBEAFE" },
  { label: "Printing",          description: "Printers and scanning",           items:  6, icon: PrintOutlinedIcon,        iconColor: "#C2410C", iconBg: "#FFEDD5" },
  { label: "HR Services",       description: "Onboarding, benefits",            items: 15, icon: PeopleOutlinedIcon,       iconColor: "#15803D", iconBg: "#DCFCE7" },
  { label: "Facilities",        description: "Office requests, moves",          items:  8, icon: ApartmentOutlinedIcon,    iconColor: "#7C3AED", iconBg: "#EDE9FE" },
  { label: "IT Support",        description: "General IT assistance",           items: 30, icon: SupportAgentOutlinedIcon, iconColor: "#B91C1C", iconBg: "#FFE4E6" },
];

const popularItems = [
  "New Employee Laptop Setup",
  "Microsoft 365 License",
  "VPN Access Request",
  "Password Reset",
  "Software Installation Request",
];

function CatalogCategoryCard({ cat }: { cat: CatalogCategory }) {
  const [hov, setHov] = useState(false);
  const { label, description, items, icon: Icon, iconColor, iconBg } = cat;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="rounded-2xl cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: "var(--card)",
        boxShadow: hov ? "0 8px 24px rgba(0,40,85,0.10)" : "0 2px 8px rgba(0,40,85,0.06)",
        transform: hov ? "translateY(-2px)" : "none",
        padding: "14px",
      }}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 38, height: 38, backgroundColor: iconBg }}>
          <Icon style={{ fontSize: 18, color: iconColor }} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--foreground)", lineHeight: 1.3 }}>{label}</p>
            <span style={{ fontSize: 10, fontWeight: 500, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", backgroundColor: "var(--muted)", borderRadius: 9999, padding: "2px 8px", border: "1px solid var(--border)", whiteSpace: "nowrap", flexShrink: 0 }}>
              {items} items
            </span>
          </div>
          <p style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 2, lineHeight: 1.4 }}>{description}</p>
        </div>
      </div>
    </div>
  );
}

function ServiceItemCard({ item }: { item: ServiceItemType }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="flex flex-col rounded-2xl transition-all duration-200"
      style={{ backgroundColor: "var(--card)", border: hov ? "1px solid var(--primary)" : "1px solid var(--border)", boxShadow: hov ? "0 4px 16px rgba(0,40,85,0.10)" : "0 1px 4px rgba(0,40,85,0.05)", padding: 14, transform: hov ? "translateY(-2px)" : "none" }}>
      <div className="flex items-start gap-3 mb-2">
        <div className="rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-150"
          style={{ width: 38, height: 38, backgroundColor: hov ? "var(--primary-container)" : "var(--muted)" }}>
          <DescriptionOutlinedIcon style={{ fontSize: 18, color: hov ? "var(--primary)" : "var(--muted-foreground)" }} />
        </div>
        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--foreground)", lineHeight: 1.3, paddingTop: 2 }}>{item.title}</p>
      </div>
      <p style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", lineHeight: 1.5, flex: 1 }}>{item.description}</p>
      <button type="button" className="mt-3 w-full cursor-pointer border rounded-xl transition-all duration-150"
        style={{ padding: "6px 14px", fontSize: 11, fontWeight: 600, fontFamily: "var(--font-body)", color: hov ? "#fff" : "var(--primary)", backgroundColor: hov ? "var(--primary)" : "transparent", borderColor: "var(--primary)" }}>
        View Details
      </button>
    </div>
  );
}

function ServiceItemRow({ item, isLast }: { item: ServiceItemType; isLast: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="flex items-center gap-4 px-6 py-3.5 transition-colors duration-150 cursor-pointer"
      style={{ borderBottom: isLast ? "none" : "1px solid var(--border)", backgroundColor: hov ? "var(--state-hover)" : "transparent" }}>
      <div className="rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-150"
        style={{ width: 38, height: 38, backgroundColor: hov ? "var(--primary-container)" : "var(--muted)" }}>
        <DescriptionOutlinedIcon style={{ fontSize: 18, color: hov ? "var(--primary)" : "var(--muted-foreground)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", color: hov ? "var(--primary)" : "var(--foreground)", transition: "color 0.15s" }}>{item.title}</p>
        <p style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 2 }}>{item.description}</p>
      </div>
      <span style={{ fontSize: 10, fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--muted-foreground)", backgroundColor: "var(--muted)", border: "1px solid var(--border)", borderRadius: 9999, padding: "2px 10px", whiteSpace: "nowrap", flexShrink: 0 }}>{item.category}</span>
      <button type="button" className="cursor-pointer border rounded-xl flex-shrink-0 transition-all duration-150"
        style={{ padding: "5px 14px", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-body)", color: "var(--primary)", backgroundColor: "transparent", borderColor: "var(--primary)" }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--primary)"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--primary)"; }}>
        View Details
      </button>
    </div>
  );
}

export function ServiceCatalogPage({ onNav }: { onNav?: (p: string) => void }) {
  const [scSearch,  setScSearch]  = useState("");
  const [scCat,     setScCat]     = useState("All");
  const [scView,    setScView]    = useState<"grid" | "list">("grid");
  const [scPage,    setScPage]    = useState(1);
  const [scPerPage, setScPerPage] = useState(8);

  const catOptions = ["All", ...Array.from(new Set(serviceItemsData.map((i) => i.category)))];
  const filtered = serviceItemsData.filter((item) => {
    const ms = !scSearch || item.title.toLowerCase().includes(scSearch.toLowerCase()) || item.description.toLowerCase().includes(scSearch.toLowerCase());
    const mc = scCat === "All" || item.category === scCat;
    return ms && mc;
  });
  const paged = filtered.slice((scPage - 1) * scPerPage, scPage * scPerPage);

  return (
    <div className="flex-1 overflow-hidden bg-background transition-colors duration-200">
      <PageHeader
        title="Service Catalog"
        subtitle="Browse and request services from our service catalog."
        onNav={onNav}
        transparent
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">

        {/* Service items card — search + category + toggle folded into header */}
        <div className="rounded-2xl bg-card overflow-hidden mb-4" style={{ border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between gap-3 px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            {/* Left: title + category */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <TrendingUpIcon style={{ fontSize: 16, color: "var(--primary)" }} />
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>Service Items ({filtered.length})</span>
              <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                <select value={scCat} onChange={(e) => { setScCat(e.target.value); setScPage(1); }}
                  style={{ appearance: "none", WebkitAppearance: "none", border: "1px solid var(--border)", borderRadius: 9999, padding: "5px 28px 5px 11px", fontSize: 12, fontFamily: "var(--font-body)", color: "var(--foreground)", backgroundColor: "var(--muted)", cursor: "pointer", outline: "none" }}>
                  {catOptions.map((c) => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
                </select>
                <ExpandMoreIcon style={{ position: "absolute", right: 7, fontSize: 13, color: "var(--muted-foreground)", pointerEvents: "none" }} />
              </div>
            </div>
            {/* Right: search + toggle */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-2"
                style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)", borderRadius: 9999, padding: "6px 14px", width: 240 }}>
                <SearchOutlinedIcon style={{ fontSize: 14, color: "var(--muted-foreground)", flexShrink: 0 }} />
                <input type="text" value={scSearch} placeholder="Search services…"
                  onChange={(e) => { setScSearch(e.target.value); setScPage(1); }}
                  className="flex-1 bg-transparent border-0 outline-none"
                  style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--foreground)" }} />
              </div>
              <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                {(["grid", "list"] as const).map((v) => (
                  <button key={v} type="button" onClick={() => setScView(v)}
                    className="flex items-center justify-center cursor-pointer border-0 transition-all duration-150"
                    style={{ width: 34, height: 34, backgroundColor: scView === v ? "var(--primary)" : "transparent", color: scView === v ? "#fff" : "var(--muted-foreground)" }}>
                    {v === "grid" ? <AppsOutlinedIcon style={{ fontSize: 16 }} /> : <ViewListOutlinedIcon style={{ fontSize: 16 }} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {scView === "grid"
            ? <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 p-4">{paged.map((item) => <ServiceItemCard key={item.id} item={item} />)}</div>
            : <div className="flex flex-col">{paged.map((item, i) => <ServiceItemRow key={item.id} item={item} isLast={i === paged.length - 1} />)}</div>
          }
          {paged.length === 0 && <p className="px-6 py-6 text-center" style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>No services found.</p>}

          <DataPagination total={filtered.length} page={scPage} perPage={scPerPage} onPage={setScPage} onPerPage={setScPerPage} itemLabel="services" perPageOptions={[4, 8, 12, 25]} />
        </div>

        {/* Browse by category — existing view preserved */}
        <div className="flex items-center gap-2 mt-6 mb-3">
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 700, color: "var(--foreground)" }}>Browse by Category</span>
          <span className="flex items-center justify-center rounded-full"
            style={{ width: 20, height: 20, fontSize: 10, fontWeight: 700, fontFamily: "var(--font-body)", backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}>
            {catalogCategories.length}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {catalogCategories.map((cat) => <CatalogCategoryCard key={cat.label} cat={cat} />)}
        </div>

      </div>
    </div>
  );
}

/* ── New Case Drawer ─────────────────────────────────────── */
const CASE_TYPES    = ["Issue", "Request", "Question", "Problem"];
const URGENCIES     = ["1 - Critical", "2 - High", "3 - Moderate", "4 - Low"];
const LOCATIONS     = ["None", "HQ - Boston", "Remote", "Branch Office"];
const ASSIGN_GROUPS = ["None", "IT Support", "Network Team", "Security"];
const SERVICES      = ["Managed Services", "Cloud Services", "Contact Center", "Unified Communications"];
const ASSETS        = ["None", "Laptop - NJ001", "Server - SRV01", "Phone - PH001"];

const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "var(--card)",
      boxShadow: "0 8px 24px rgba(0,40,85,0.12)",
      borderRadius: "10px",
      "& .MuiMenuItem-root": {
        fontSize: 14, fontFamily: "var(--font-body)", color: "var(--foreground)",
        "&:hover": { backgroundColor: "var(--state-hover)" },
        "&.Mui-selected": { backgroundColor: "var(--primary-container)", color: "var(--primary)" },
        "&.Mui-selected:hover": { backgroundColor: "var(--primary-container)" },
      },
    },
  },
};

function NewTicketDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [callbackPhone,    setCallbackPhone]    = useState("");
  const [purchasedService, setPurchasedService] = useState("");
  const [asset,            setAsset]            = useState("None");
  const [caseType,         setCaseType]         = useState("Issue");
  const [urgency,          setUrgency]          = useState("");
  const [affectedLocation, setAffectedLocation] = useState("None");
  const [assignmentGroup,  setAssignmentGroup]  = useState("None");
  const [subject,          setSubject]          = useState("");
  const [description,      setDescription]      = useState("");
  const [watchlistEmails,  setWatchlistEmails]  = useState<string[]>([]);
  const [files,            setFiles]            = useState<File[]>([]);
  const [dragOver,         setDragOver]         = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setCallbackPhone(""); setPurchasedService(""); setAsset("None");
    setCaseType("Issue"); setUrgency(""); setAffectedLocation("None");
    setAssignmentGroup("None"); setSubject(""); setDescription("");
    setWatchlistEmails([]); setFiles([]);
  };

  const handleClose = () => { reset(); onClose(); };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      fontSize: 14,
      fontFamily: "var(--font-body)",
      "& fieldset": { borderColor: "var(--border)" },
      "&:hover fieldset": { borderColor: "var(--foreground)" },
      "&.Mui-focused fieldset": { borderColor: "var(--primary)", borderWidth: "2px" },
      "&.Mui-disabled": { opacity: 0.5 },
    },
    "& .MuiInputLabel-root": {
      fontFamily: "var(--font-body)", fontSize: 14, color: "var(--muted-foreground)",
      "&.Mui-focused": { color: "var(--primary)" },
      "&.Mui-disabled": { color: "var(--muted-foreground)" },
    },
    "& .MuiFormLabel-asterisk": { color: "#C2410C" },
    "& .MuiInputBase-input": {
      color: "var(--foreground)",
      "&.Mui-disabled": { WebkitTextFillColor: "var(--muted-foreground)" },
    },
    "& .MuiSelect-icon": { color: "var(--muted-foreground)" },
    "& .MuiFormHelperText-root": {
      fontFamily: "var(--font-body)", fontSize: 11, color: "var(--muted-foreground)", margin: "4px 0 0",
    },
  };

  const SectionHeader = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
    <div className="flex items-center gap-2" style={{ marginTop: 28, marginBottom: 12 }}>
      <span style={{ color: "var(--primary)", display: "flex" }}>{icon}</span>
      <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 700, color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{title}</span>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{ backgroundColor: "rgba(0,0,0,0.32)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="New Case"
        className="fixed top-0 right-0 z-50 h-full flex flex-col transition-transform duration-300 ease-out"
        style={{
          width: 680,
          maxWidth: "95vw",
          backgroundColor: "var(--card)",
          boxShadow: "-8px 0 32px rgba(0,40,85,0.14)",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-6 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                New Case
              </h2>
              <p style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 3 }}>
                Please provide the following details to help us assist you at the earliest.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close drawer"
              className="flex items-center justify-center rounded-full border-0 cursor-pointer transition-colors duration-150 flex-shrink-0"
              style={{ width: 36, height: 36, backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--state-pressed)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--muted)"; }}
            >
              <CloseOutlinedIcon style={{ fontSize: 18 }} />
            </button>
          </div>
        </div>

        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto px-6 py-2">

          {/* ── Contact Information ───────────────────────── */}
          <SectionHeader icon={<PersonOutlinedIcon style={{ fontSize: 17 }} />} title="Contact Information" />
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Contact" value="Nitin Jaryal" disabled size="small" fullWidth sx={fieldSx} />
              <TextField
                label="Callback #" required size="small" fullWidth
                value={callbackPhone} onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="Enter phone number" sx={fieldSx}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormControl required size="small" fullWidth sx={fieldSx}>
                <InputLabel>My Purchased Service</InputLabel>
                <Select value={purchasedService} onChange={(e) => setPurchasedService(e.target.value as string)} label="My Purchased Service" MenuProps={menuProps}>
                  <MenuItem value=""><em>-- Select --</em></MenuItem>
                  {SERVICES.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl size="small" fullWidth sx={fieldSx}>
                <InputLabel>Asset</InputLabel>
                <Select value={asset} onChange={(e) => setAsset(e.target.value as string)} label="Asset" MenuProps={menuProps}>
                  {ASSETS.map((a) => <MenuItem key={a} value={a}>{a === "None" ? "-- None --" : a}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* ── Priority & Classification ─────────────────── */}
          <SectionHeader icon={<FilterListOutlinedIcon style={{ fontSize: 17 }} />} title="Priority & Classification" />
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormControl required size="small" fullWidth sx={fieldSx}>
                <InputLabel>Case Type</InputLabel>
                <Select value={caseType} onChange={(e) => setCaseType(e.target.value as string)} label="Case Type" MenuProps={menuProps}>
                  {CASE_TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl required size="small" fullWidth sx={fieldSx}>
                <InputLabel>Urgency</InputLabel>
                <Select value={urgency} onChange={(e) => setUrgency(e.target.value as string)} label="Urgency" MenuProps={menuProps}>
                  <MenuItem value=""><em>-- Select --</em></MenuItem>
                  {URGENCIES.map((u) => <MenuItem key={u} value={u}>{u}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormControl size="small" fullWidth sx={fieldSx}>
                <InputLabel>Affected Location</InputLabel>
                <Select value={affectedLocation} onChange={(e) => setAffectedLocation(e.target.value as string)} label="Affected Location" MenuProps={menuProps}>
                  {LOCATIONS.map((l) => <MenuItem key={l} value={l}>{l === "None" ? "-- None --" : l}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl size="small" fullWidth sx={fieldSx}>
                <InputLabel>Assignment Group</InputLabel>
                <Select value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value as string)} label="Assignment Group" MenuProps={menuProps}>
                  {ASSIGN_GROUPS.map((g) => <MenuItem key={g} value={g}>{g === "None" ? "-- None --" : g}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* ── Case Details ──────────────────────────────── */}
          <SectionHeader icon={<DescriptionOutlinedIcon style={{ fontSize: 17 }} />} title="Case Details" />
          <div className="flex flex-col gap-4">
            <TextField
              label="Subject" required fullWidth size="small"
              value={subject} onChange={(e) => setSubject(e.target.value.slice(0, 80))}
              placeholder="Brief summary of your issue"
              helperText={`Brief summary of your issue (${subject.length}/80 characters)`}
              sx={fieldSx}
            />
            <TextField
              label="Description" required fullWidth multiline rows={4}
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide as much detail as possible"
              helperText="Please provide as much detail as possible"
              sx={fieldSx}
            />
            {/* Upload */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-1.5">
                <CloudUploadOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />
                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", color: "var(--foreground)" }}>Upload Attachments</span>
              </div>
              <p style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginBottom: 10 }}>
                Drag and drop files or click to select files to attach to this case.
              </p>
              <input ref={fileRef} type="file" multiple className="hidden" accept=".pdf,.png,.jpg,.doc,.docx,.xls,.xlsx"
                onChange={(e) => { if (e.target.files) setFiles(Array.from(e.target.files)); }} />
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files) setFiles(Array.from(e.dataTransfer.files)); }}
                className="flex flex-col items-center justify-center cursor-pointer transition-all duration-150"
                style={{
                  border: `1.5px dashed ${dragOver ? "var(--primary)" : "var(--border)"}`,
                  borderRadius: 10, padding: "28px 20px",
                  backgroundColor: dragOver ? "var(--primary-container)" : "var(--muted)",
                }}
              >
                <AddOutlinedIcon style={{ fontSize: 22, color: "var(--muted-foreground)", marginBottom: 6 }} />
                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", color: "var(--foreground)" }}>
                  {files.length > 0 ? files.map((f) => f.name).join(", ") : "Click or drag files here"}
                </span>
                <span style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 4 }}>
                  PDF, PNG, JPG, DOC, XLS up to 50MB each
                </span>
              </div>
            </div>
          </div>

          {/* ── Watchlist ─────────────────────────────────── */}
          <SectionHeader icon={<PeopleOutlinedIcon style={{ fontSize: 17 }} />} title="Watchlist" />
          <div className="flex flex-col gap-4">
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={watchlistEmails}
              onChange={(_, newValue) => setWatchlistEmails(newValue as string[])}
              renderTags={(value, getTagProps) =>
                value.map((email, index) => (
                  <Chip
                    key={email}
                    label={email}
                    size="small"
                    {...getTagProps({ index })}
                    sx={{
                      backgroundColor: "var(--primary-container)",
                      color: "var(--primary)",
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: 500,
                      borderRadius: "6px",
                      "& .MuiChip-deleteIcon": { color: "var(--primary)", opacity: 0.7, "&:hover": { opacity: 1 } },
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Email Addresses"
                  placeholder={watchlistEmails.length === 0 ? "Type an email and press Enter" : ""}
                  helperText="Type an email address and press Enter to add"
                  size="small"
                  sx={fieldSx}
                />
              )}
            />
          </div>

          <div style={{ height: 24 }} />
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex items-center px-6 py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <span style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>
            <span style={{ color: "#C2410C" }}>*</span> Required fields
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <button
              type="button" onClick={handleClose}
              className="border-0 bg-transparent cursor-pointer transition-colors duration-150"
              style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", padding: "10px 16px" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--foreground)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; }}
            >
              Cancel
            </button>
            <button
              type="button" onClick={handleClose}
              className="flex items-center gap-2 cursor-pointer border-0 transition-all duration-150"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: 9999, padding: "10px 22px", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <SendOutlinedIcon style={{ fontSize: 16 }} />
              Submit Case
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Row actions kebab menu ──────────────────────────────── */
function RowActionsMenu() {
  const [open, setOpen] = useState(false);
  const [pos,  setPos]  = useState({ top: 0, right: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, right: window.innerWidth - r.right });
    }
    setOpen((o) => !o);
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={toggle}
        aria-label="Row actions"
        className="border-0 bg-transparent cursor-pointer rounded-lg transition-all duration-150 flex items-center justify-center"
        style={{ width: 28, height: 28, color: "var(--muted-foreground)" }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--state-hover)"; e.currentTarget.style.color = "var(--foreground)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--muted-foreground)"; }}
      >
        <MoreVertIcon style={{ fontSize: 18 }} />
      </button>

      {open && createPortal(
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 9998 }} onClick={() => setOpen(false)} />
          <div style={{
            position: "fixed", zIndex: 9999,
            top: pos.top, right: pos.right,
            minWidth: 156,
            backgroundColor: "var(--card)",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,40,85,0.14), 0 2px 8px rgba(0,40,85,0.08)",
            border: "1px solid var(--border)",
            padding: "4px 0",
            overflow: "hidden",
          }}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 border-0 bg-transparent cursor-pointer text-left transition-colors duration-150"
              style={{ padding: "10px 16px" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--state-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <EditOutlinedIcon style={{ fontSize: 16, color: "var(--muted-foreground)" }} />
              <span style={{ fontSize: 13, fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--foreground)" }}>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-2.5 border-0 bg-transparent cursor-pointer text-left transition-colors duration-150"
              style={{ padding: "10px 16px" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF1F2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <DeleteOutlineIcon style={{ fontSize: 16, color: "#DC2626" }} />
              <span style={{ fontSize: 13, fontFamily: "var(--font-body)", fontWeight: 500, color: "#DC2626" }}>Delete</span>
            </button>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

/* ── My Tickets page ─────────────────────────────────────── */
export function MyTicketsPage({ onNav }: { onNav?: (p: string) => void }) {
  const [tab, setTab] = useState<"ALL" | "OPEN" | "CLOSED">("ALL");
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const open   = allTickets.filter((t) => t.status === "In Progress" || t.status === "Pending" || t.status === "Approved");
  const closed = allTickets.filter((t) => t.status === "Closed" || t.status === "Resolved");
  const base   = tab === "ALL" ? allTickets : tab === "OPEN" ? open : closed;
  const rows   = base.filter((t) =>
    !search || t.id.toLowerCase().includes(search.toLowerCase()) || t.title.toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { key: "ALL"    as const, label: "All",    count: allTickets.length },
    { key: "OPEN"   as const, label: "Open",   count: open.length },
    { key: "CLOSED" as const, label: "Closed", count: closed.length },
  ];

  const thStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 600, fontFamily: "var(--font-body)",
    color: "var(--muted-foreground)", padding: "11px 16px", textAlign: "left",
    borderBottom: "1px solid var(--border)", whiteSpace: "nowrap",
    letterSpacing: "0.03em",
  };
  const tdStyle: React.CSSProperties = {
    fontSize: 13, fontFamily: "var(--font-body)",
    color: "var(--foreground)", padding: "13px 16px",
    borderBottom: "1px solid var(--border)", verticalAlign: "middle",
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background transition-colors duration-200">

      <NewTicketDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* ── Enterprise page header — transparent, blends with background ── */}
      <div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb row */}
          <div className="pt-4 pb-1">
            <Breadcrumb items={[{ label: "Home", page: "Home" }, { label: "My Cases" }]} onNav={onNav} />
          </div>

          {/* Title row — title+tag+subtitle left, search+actions right */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4">
            {/* Left */}
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                My Cases
              </h1>
              <p style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 3 }}>
                Track your open and closed service requests and incidents.
              </p>
            </div>

            {/* Right — search + New Request + Filter */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* MD3 outlined search pill */}
              <div
                className="flex items-center gap-2"
                style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)", borderRadius: 9999, padding: "7px 16px", width: 260 }}
              >
                <SearchOutlinedIcon style={{ fontSize: 17, color: "var(--muted-foreground)", flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search requests…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-none min-w-0"
                  style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "var(--foreground)" }}
                />
              </div>

              {/* New Request — MD3 filled tonal button */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 cursor-pointer border-0 transition-all duration-150 flex-shrink-0"
                style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: 9999, padding: "9px 20px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                <AddOutlinedIcon style={{ fontSize: 17 }} />
                New Case
              </button>

              {/* Filter — MD3 outlined icon button */}
              <button
                type="button"
                className="flex items-center justify-center cursor-pointer transition-all duration-150 flex-shrink-0"
                style={{ width: 40, height: 40, backgroundColor: "transparent", border: "1px solid var(--border)", borderRadius: 9999, color: "var(--muted-foreground)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--state-hover)"; e.currentTarget.style.color = "var(--foreground)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--muted-foreground)"; }}
                aria-label="Filter"
              >
                <FilterListOutlinedIcon style={{ fontSize: 18 }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Page content ──────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">

        {/* MD3 card — tabs flush top, table inside */}
        <PortalCard noHover>
          {/* MD3 Tab bar */}
          <div className="flex items-end px-2 gap-0" style={{ borderBottom: "1px solid var(--border)" }}>
            {tabs.map(({ key, label, count }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className="flex items-center gap-2 border-0 bg-transparent cursor-pointer transition-all duration-150"
                  style={{
                    padding: "13px 18px 11px",
                    fontSize: 13, fontWeight: active ? 700 : 500,
                    fontFamily: "var(--font-body)",
                    color: active ? "var(--primary)" : "var(--muted-foreground)",
                    borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                    marginBottom: -1,
                  }}
                >
                  {label}
                  <span style={{
                    fontSize: 10, fontWeight: 700, fontFamily: "var(--font-heading)",
                    color: active ? "var(--primary)" : "var(--muted-foreground)",
                    backgroundColor: active ? "var(--primary-container)" : "var(--muted)",
                    borderRadius: 9999, padding: "1px 7px", lineHeight: 1.6,
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* MD3 data table */}
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Request #</th>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Created</th>
                  <th style={thStyle}>Last Updated</th>
                  <th style={{ ...thStyle, width: 44 }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    style={{ transition: "background-color 0.15s", height: 52 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "var(--state-hover)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "transparent"; }}
                  >
                    <td style={{ ...tdStyle, color: "var(--primary)", fontWeight: 600 }}>{row.id}</td>
                    <td style={tdStyle}>{row.title}</td>
                    <td style={tdStyle}>
                      <span style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", backgroundColor: "var(--muted)", border: "1px solid var(--border)", borderRadius: 9999, padding: "3px 10px", whiteSpace: "nowrap" }}>
                        {row.category}
                      </span>
                    </td>
                    <td style={tdStyle}><StatusChip status={row.status} /></td>
                    <td style={{ ...tdStyle, color: "var(--muted-foreground)" }}>{row.created}</td>
                    <td style={{ ...tdStyle, color: "var(--muted-foreground)" }}>{row.updated}</td>
                    <td style={{ ...tdStyle, textAlign: "center" }}>
                      <RowActionsMenu />
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ ...tdStyle, textAlign: "center", color: "var(--muted-foreground)", padding: "32px" }}>
                      No cases found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </PortalCard>
      </div>
    </div>
  );
}
