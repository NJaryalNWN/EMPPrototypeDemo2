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
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
  accentColor?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`relative flex flex-col overflow-hidden rounded-2xl bg-card transition-all duration-200 cursor-default select-none ${className}`}
      style={{
        border: hovered ? `1px solid ${accentColor}` : "1px solid var(--border)",
        boxShadow: pressed
          ? dark ? "0 1px 4px rgba(0,0,0,0.30), 0 0 0 1px rgba(0,0,0,0.20)" : "0 1px 4px rgba(0,40,85,0.07), 0 0 0 1px rgba(0,40,85,0.05)"
          : hovered
          ? dark ? "0 8px 24px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.28)" : "0 8px 24px rgba(0,40,85,0.10), 0 2px 6px rgba(0,40,85,0.06)"
          : dark ? "0 2px 8px rgba(0,0,0,0.32), 0 1px 3px rgba(0,0,0,0.20)" : "0 2px 8px rgba(0,40,85,0.06), 0 1px 3px rgba(0,40,85,0.04)",
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
      <div className="flex-shrink-0">
        <h1
          className="text-white"
          style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(15px, 2vw, 20px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3 }}
        >
          {greeting()}, Nitin
        </h1>
        <p style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.70)", marginTop: 2, lineHeight: 1.5 }}>
          Welcome to the ServiceNow Portal. Access your knowledge base, request services, and manage tickets.
        </p>
      </div>

      {/* Search — compact pill */}
      <div
        className="flex items-center gap-2"
        style={{
          backgroundColor: "rgba(255,255,255,0.90)",
          borderRadius: 9999,
          padding: "7px 16px",
          width: "100%",
          maxWidth: 280,
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
type NavLink = { label: string; href?: string; subLinks?: SubLink[] };

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
        return <DrillSubLink key={link.label} label={link.label} href={link.href ?? "#"} accentColor={accentColor} accentBg={accentBg} />;
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

function DrillSubLink({ label, href, accentColor = "var(--primary)", accentBg = "var(--state-hover)" }: { label: string; href: string; accentColor?: string; accentBg?: string }) {
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
  "In Progress": { label: "In Progress", textColor: "#92400E", bg: "#FFF4E0" },
  "Pending":     { label: "Pending",     textColor: "#78350F", bg: "#FEF3C7" },
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
      className="w-full flex items-center gap-3 border-0 bg-transparent text-left cursor-pointer transition-colors duration-150"
      style={{
        padding: "10px 16px",
        backgroundColor: hov ? "var(--state-hover)" : "transparent",
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
      <div className="flex flex-col items-end gap-1 flex-shrink-0 pr-4">
        <span
          style={{
            fontSize: 10, fontWeight: 700, fontFamily: "var(--font-body)",
            color: s.textColor, backgroundColor: s.bg,
            borderRadius: 6, padding: "2px 8px", whiteSpace: "nowrap",
            letterSpacing: "0.02em",
          }}
        >
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
            <DrillDownNavMenu links={supportLinks} accentColor={supp.color} accentBg={supp.bg} />
            {/* Contact options — bottom of card */}
            <div className="pb-2">
              <SupportContactRow href="mailto:itsupport@nwncarousel.com" icon={<EmailOutlinedIcon style={{ fontSize: 14, flexShrink: 0, transition: "color 0.15s" }} />} value="itsupport@nwncarousel.com" accentColor={supp.color} accentBg={supp.bg} />
              <SupportContactRow href="tel:+18664084596" icon={<PhoneOutlinedIcon style={{ fontSize: 14, flexShrink: 0, transition: "color 0.15s" }} />} value="(866) 408-4596" accentColor={supp.color} accentBg={supp.bg} />
            </div>
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
                  <ConfirmationNumberOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />
                </div>
                <div className="min-w-0">
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3, color: "var(--foreground)" }}>My Cases</h3>
                  <p style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 2 }}>Active cases requiring your attention</p>
                </div>
                {/* Stat chips inline */}
                <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
                  {[
                    { label: "Active",   count: allTickets.filter(t => t.status === "In Progress" || t.status === "Pending" || t.status === "Approved").length, color: "#1D4ED8", bg: "#DBEAFE" },
                    { label: "Resolved", count: allTickets.filter(t => t.status === "Resolved").length,                                                          color: "#065F46", bg: "#D1FAE5" },
                    { label: "Closed",   count: allTickets.filter(t => t.status === "Closed").length,                                                            color: "#374151", bg: "#F3F4F6" },
                  ].map(({ label, count, color, bg }) => (
                    <div key={label} className="flex items-center gap-1 rounded-md px-2 py-0.5" style={{ backgroundColor: bg }}>
                      <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-heading)", color, lineHeight: 1 }}>{count}</span>
                      <span style={{ fontSize: 9, fontWeight: 600, fontFamily: "var(--font-body)", color, opacity: 0.75, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
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
                label="View all cases"
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
              <CardFooter label="Browse all articles" stat1="12,304 articles" stat2="5,071 users" stat3="" onClick={() => onNav?.("Knowledge Base")} />
            </PortalCard>
          </div>

          {/* ── Right column — Contact Support + Action Needed stacked ── */}
          <div className="col-span-12 xl:col-span-3 flex flex-col gap-6 self-start">

            {/* Action Needed */}
            <PortalCard accentColor="#C2410C">
              <CardHeader
                icon={<AssignmentTurnedInOutlinedIcon style={{ fontSize: 17, color: "#C2410C" }} />}
                iconBg="#FFEDD5"
                title="Action Needed"
                subtitle="Cases awaiting your response"
              />
              <div className="flex items-center justify-center flex-1 px-5 py-5">
                <p style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", lineHeight: 1.5, textAlign: "center" }}>
                  You currently have no cases awaiting your info.
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
  const map: Record<TicketRow["status"], { color: string; bg: string; border: string }> = {
    "In Progress": { color: "#92400E", bg: "#FFF4E0", border: "#F59E0B" },
    "Pending":     { color: "#92400E", bg: "transparent", border: "#F59E0B" },
    "Approved":    { color: "#166534", bg: "#D4F0E0", border: "#16A34A" },
    "Closed":      { color: "#ffffff", bg: "#166534", border: "#166534" },
    "Resolved":    { color: "#166534", bg: "transparent", border: "#16A34A" },
  };
  const s = map[status];
  return (
    <span
      style={{
        fontSize: 11, fontWeight: 600, fontFamily: "var(--font-body)",
        color: s.color, backgroundColor: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 9999, padding: "2px 10px", whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

/* ── Reusable enterprise page header ─────────────────────── */
function PageHeader({
  title, tag, subtitle, breadcrumb, onNav, actions,
}: {
  title: string;
  tag?: string;
  subtitle: string;
  breadcrumb?: { label: string; page?: string }[];
  onNav?: (p: string) => void;
  actions?: React.ReactNode;
}) {
  return (
    <div style={{ backgroundColor: "var(--card)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="pt-4 pb-1">
            <Breadcrumb items={breadcrumb} onNav={onNav} />
          </div>
        )}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 ${breadcrumb && breadcrumb.length > 0 ? "" : "pt-4"}`}>
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

/* ── Knowledge Base page ─────────────────────────────────── */
export function KnowledgeBasePage({ onNav }: { onNav?: (p: string) => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-background transition-colors duration-200">
      <PageHeader
        title="Knowledge Base"
        subtitle="Search articles, SOPs, and technical documentation."
        onNav={onNav}
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-8">
            <PortalCard>
              <CardHeader icon={<MenuBookOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />} title="Recent Articles" subtitle="Browse the latest knowledge articles" onOpen={() => {}} />
              <div className="flex flex-col py-1">
                {kbArticles.map((a) => <RowItem key={a.title} label={a.category} title={a.title} />)}
              </div>
              <CardFooter label="Browse all" stat1="📄 12,304 articles" stat2="👥 5,071 users" stat3="👁 0 today" />
            </PortalCard>
          </div>
          <div className="col-span-12 xl:col-span-4">
            <PortalCard>
              <CardHeader icon={<MenuBookOutlinedIcon style={{ fontSize: 17, color: "var(--primary)" }} />} title="Stats" subtitle="Knowledge base at a glance" />
              <div className="grid grid-cols-2 gap-3 px-5 py-4">
                {([
                  { label: "Articles",    value: "12,304", color: "var(--status-info-fg)",    bg: "var(--status-info-bg)" },
                  { label: "Users",       value: "5,071",  color: "var(--status-success-fg)", bg: "var(--status-success-bg)" },
                  { label: "Categories",  value: "84",     color: "var(--secondary)",          bg: "var(--secondary-container)" },
                  { label: "Views today", value: "0",      color: "var(--muted-foreground)",   bg: "var(--muted)" },
                ] as const).map(({ label, value, color, bg }) => (
                  <div key={label} className="rounded-xl p-3.5 flex flex-col gap-2" style={{ backgroundColor: bg }}>
                    <p style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-heading)", color, lineHeight: 1 }}>{value}</p>
                    <p style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </PortalCard>
          </div>
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
        padding: "20px",
      }}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 44, height: 44, backgroundColor: iconBg }}>
          <Icon style={{ fontSize: 22, color: iconColor }} />
        </div>
        <div className="min-w-0 flex-1">
          <p style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--foreground)", lineHeight: 1.3 }}>{label}</p>
          <p style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 3, lineHeight: 1.5 }}>{description}</p>
          <span
            className="inline-block mt-3"
            style={{ fontSize: 11, fontWeight: 500, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", backgroundColor: "var(--muted)", borderRadius: 9999, padding: "2px 10px", border: "1px solid var(--border)" }}
          >
            {items} items
          </span>
        </div>
      </div>
    </div>
  );
}

export function ServiceCatalogPage({ onNav }: { onNav?: (p: string) => void }) {
  return (
    <div className="flex-1 overflow-y-auto bg-background transition-colors duration-200">
      <PageHeader
        title="Service Catalog"
        subtitle="Request services, products, and changes."
        onNav={onNav}
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">

        {/* All Categories header */}
        <div className="flex items-center gap-2 mb-4">
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 16, fontWeight: 700, color: "var(--foreground)" }}>All Categories</span>
          <span
            className="flex items-center justify-center rounded-full"
            style={{ width: 24, height: 24, fontSize: 12, fontWeight: 700, fontFamily: "var(--font-body)", backgroundColor: "var(--muted)", color: "var(--muted-foreground)" }}
          >
            {catalogCategories.length}
          </span>
        </div>

        {/* Category grid — MD3 filled cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {catalogCategories.map((cat) => (
            <CatalogCategoryCard key={cat.label} cat={cat} />
          ))}
        </div>

        {/* Bottom row — Popular Items + My Wishlist */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-5">
            <PortalCard>
              <div className="px-5 pt-4 pb-3 flex items-center gap-2" style={{ borderBottom: "1px solid var(--border)" }}>
                <FavoriteBorderOutlinedIcon style={{ fontSize: 17, color: "#E11D48" }} />
                <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>Popular Items</span>
              </div>
              <div className="flex flex-col py-1">
                {popularItems.map((item) => (
                  <RowItem key={item} label="" title={item} />
                ))}
              </div>
            </PortalCard>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <PortalCard>
              <div className="px-5 pt-4 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <p style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>My Wishlist</p>
                <p style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 3 }}>Save items for later or share with your manager.</p>
              </div>
              <div className="px-5 py-4">
                <button
                  type="button"
                  className="w-full rounded-xl border cursor-pointer transition-all duration-150"
                  style={{ padding: "10px", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", color: "var(--primary)", backgroundColor: "transparent", borderColor: "var(--primary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--primary-container)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  View Wishlist
                </button>
              </div>
            </PortalCard>
          </div>
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
    { key: "ALL",    label: `ALL (${allTickets.length})` },
    { key: "OPEN",   label: `OPEN (${open.length})` },
    { key: "CLOSED", label: `CLOSED (${closed.length})` },
  ] as const;

  const thStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, fontFamily: "var(--font-heading)",
    color: "var(--foreground)", padding: "10px 16px", textAlign: "left",
    borderBottom: "2px solid var(--border)", whiteSpace: "nowrap",
  };
  const tdStyle: React.CSSProperties = {
    fontSize: 12, fontFamily: "var(--font-body)",
    color: "var(--foreground)", padding: "12px 16px",
    borderBottom: "1px solid var(--border)", verticalAlign: "middle",
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background transition-colors duration-200">

      <NewTicketDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* ── Enterprise page header — card surface, full-width ── */}
      <div style={{ backgroundColor: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb row */}
          <div className="pt-4 pb-1">
            <Breadcrumb items={[{ label: "Home", page: "Home" }, { label: "My Cases" }]} onNav={onNav} />
          </div>

          {/* Title row — title+tag+subtitle left, search+actions right */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  My Cases
                </h1>
                <span style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--muted-foreground)", backgroundColor: "var(--muted)", border: "1px solid var(--border)", borderRadius: 9999, padding: "2px 10px" }}>
                  my_cases
                </span>
              </div>
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
        <PortalCard>
          {/* MD3 Tab bar */}
          <div className="flex items-end px-2 gap-0" style={{ borderBottom: "1px solid var(--border)" }}>
            {tabs.map(({ key, label }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className="border-0 bg-transparent cursor-pointer transition-all duration-150"
                  style={{
                    padding: "14px 20px 12px",
                    fontSize: 13, fontWeight: active ? 700 : 500,
                    fontFamily: "var(--font-body)",
                    color: active ? "var(--primary)" : "var(--muted-foreground)",
                    borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                    marginBottom: -1,
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* MD3 data table */}
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--muted)" }}>
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
                      <button
                        type="button"
                        className="border-0 bg-transparent cursor-pointer rounded-lg transition-colors duration-150"
                        style={{ padding: "4px", color: "var(--muted-foreground)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.backgroundColor = "var(--state-hover)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--muted-foreground)"; e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        <OpenInNewIcon style={{ fontSize: 14, display: "block" }} />
                      </button>
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
