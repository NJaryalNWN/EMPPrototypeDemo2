import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import Tooltip from "@mui/material/Tooltip";

/* ── MUI icons ───────────────────────────────────────────── */
import HomeOutlinedIcon      from "@mui/icons-material/HomeOutlined";
import HomeIcon              from "@mui/icons-material/Home";
import MenuBookOutlinedIcon  from "@mui/icons-material/MenuBookOutlined";
import MenuBookIcon          from "@mui/icons-material/MenuBook";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon      from "@mui/icons-material/ShoppingCart";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import HeadsetMicIcon        from "@mui/icons-material/HeadsetMic";
import GppGoodOutlinedIcon   from "@mui/icons-material/GppGoodOutlined";
import GppGoodIcon           from "@mui/icons-material/GppGood";
import GroupsOutlinedIcon    from "@mui/icons-material/GroupsOutlined";
import GroupsIcon            from "@mui/icons-material/Groups";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import BusinessCenterIcon    from "@mui/icons-material/BusinessCenter";
import DevicesOutlinedIcon   from "@mui/icons-material/DevicesOutlined";
import DevicesIcon           from "@mui/icons-material/Devices";
import SettingsOutlinedIcon  from "@mui/icons-material/SettingsOutlined";
import SettingsIcon          from "@mui/icons-material/Settings";
import AssessmentOutlinedIcon      from "@mui/icons-material/AssessmentOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
/* sub-link icons */
import VideoCallOutlinedIcon    from "@mui/icons-material/VideoCallOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PhoneOutlinedIcon        from "@mui/icons-material/PhoneOutlined";
import SpeedOutlinedIcon        from "@mui/icons-material/SpeedOutlined";
import RouterOutlinedIcon       from "@mui/icons-material/RouterOutlined";
import SecurityOutlinedIcon     from "@mui/icons-material/SecurityOutlined";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import UpdateOutlinedIcon       from "@mui/icons-material/UpdateOutlined";
import PolicyOutlinedIcon       from "@mui/icons-material/PolicyOutlined";
import InsightsOutlinedIcon     from "@mui/icons-material/InsightsOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import CloudOutlinedIcon        from "@mui/icons-material/CloudOutlined";
import PrintOutlinedIcon        from "@mui/icons-material/PrintOutlined";
import HeadsetOutlinedIcon      from "@mui/icons-material/HeadsetOutlined";

/* ── Types ───────────────────────────────────────────────── */
type IconComponent = React.ComponentType<{ style?: React.CSSProperties }>;

interface SubLink {
  label: string;
  description?: string;
  icon?: IconComponent;
  href?: string;
}
interface SubSection { heading: string; links: SubLink[]; }
interface NavItem {
  icon: IconComponent;
  activeIcon: IconComponent;
  label: string;
  shortLabel?: string;
  subSections?: SubSection[];
}

/* ── Home contextual sub-menu items ─────────────────────── */
const homeSubMenuItems = [
  { label: "Home",    navTarget: "Home",     description: "Dashboard & overview",    icon: HomeOutlinedIcon },
  { label: "Tickets", navTarget: "My Cases", description: "View & manage your cases", icon: ConfirmationNumberOutlinedIcon },
  { label: "Reports", navTarget: "Reports",  description: "Analytics & insights",     icon: AssessmentOutlinedIcon },
];

/* ── Primary nav items ───────────────────────────────────── */
const navItems: NavItem[] = [
  { icon: HomeOutlinedIcon,           activeIcon: HomeIcon,           label: "Home" },
  { icon: MenuBookOutlinedIcon,       activeIcon: MenuBookIcon,       label: "Knowledge Base" },
  { icon: ShoppingCartOutlinedIcon,   activeIcon: ShoppingCartIcon,   label: "Service Catalog" },
  {
    icon: HeadsetMicOutlinedIcon, activeIcon: HeadsetMicIcon, label: "Contact Center",
    subSections: [
      {
        heading: "ADMIN",
        links: [
          { label: "Webex CC | Admin",  description: "Call center platform",      icon: VideoCallOutlinedIcon },
          { label: "CCDM | Admin",      description: "Contact center management", icon: ManageAccountsOutlinedIcon },
          { label: "Five9 | Admin",     description: "Cloud contact solution",    icon: PhoneOutlinedIcon },
        ],
      },
      {
        heading: "MONITOR",
        links: [
          { label: "Performance Monitoring", description: "System health & metrics",  icon: SpeedOutlinedIcon },
          { label: "Performance Monitoring", description: "Network throughput stats", icon: SpeedOutlinedIcon },
          { label: "Performance Monitoring", description: "Endpoint health checks",   icon: SpeedOutlinedIcon },
        ],
      },
      {
        heading: "REPORT",
        links: [
          { label: "Webex CC | Report", description: "CC analytics & activity", icon: AssessmentOutlinedIcon },
          { label: "SIP Reporting",     description: "SIP trunk call reports",  icon: RouterOutlinedIcon },
          { label: "SIP Reporting",     description: "SIP quality metrics",     icon: RouterOutlinedIcon },
        ],
      },
    ],
  },
  {
    icon: GppGoodOutlinedIcon, activeIcon: GppGoodIcon, label: "Managed Security",
    subSections: [
      {
        heading: "ADMIN",
        links: [
          { label: "SecureX | Admin",      description: "Security platform",    icon: SecurityOutlinedIcon },
          { label: "Meraki | Admin",       description: "Network management",   icon: RouterOutlinedIcon },
          { label: "Threat Investigation", description: "Threat analysis",      icon: ManageSearchOutlinedIcon },
        ],
      },
      {
        heading: "MONITOR",
        links: [
          { label: "Performance Monitoring", description: "Security health metrics", icon: SpeedOutlinedIcon },
          { label: "Performance Monitoring", description: "Network threat watch",    icon: SpeedOutlinedIcon },
        ],
      },
      {
        heading: "REPORT",
        links: [
          { label: "Patch Reporting", description: "Patch compliance status", icon: UpdateOutlinedIcon },
          { label: "SOC Reporting",   description: "SOC activity & events",   icon: PolicyOutlinedIcon },
          { label: "Threat Insights", description: "Threat intelligence",     icon: InsightsOutlinedIcon },
        ],
      },
    ],
  },
  {
    icon: GroupsOutlinedIcon, activeIcon: GroupsIcon, label: "Visual Collaboration",
    subSections: [
      {
        heading: "ADMIN",
        links: [
          { label: "Crestron | Admin",          description: "AV control systems",   icon: DesktopWindowsOutlinedIcon },
          { label: "Microsoft | Admin",         description: "Teams & M365 admin",   icon: CloudOutlinedIcon },
          { label: "Cisco Control Hub | Admin", description: "Webex administration", icon: RouterOutlinedIcon },
        ],
      },
      {
        heading: "MONITOR",
        links: [
          { label: "Performance Monitoring", description: "System health & metrics",  icon: SpeedOutlinedIcon },
          { label: "Performance Monitoring", description: "Collab endpoint health",   icon: SpeedOutlinedIcon },
          { label: "HP",   description: "HP device monitoring",  icon: PrintOutlinedIcon },
          { label: "Poly", description: "Poly endpoint status",  icon: HeadsetOutlinedIcon },
        ],
      },
    ],
  },
  { icon: BusinessCenterOutlinedIcon, activeIcon: BusinessCenterIcon, label: "Intelligent Workplace", shortLabel: "Workplace" },
  { icon: DevicesOutlinedIcon,        activeIcon: DevicesIcon,        label: "Managed Devices",      shortLabel: "Devices" },
];

/* ── Home contextual sub-menu row ────────────────────────── */
function HomeSubMenuItem({ label, description, icon: Icon, isActive, onClick }: {
  label: string; description: string; icon: IconComponent; isActive: boolean; onClick: () => void; navTarget?: string;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="text-left flex items-center gap-3 border-0 cursor-pointer"
      style={{
        display: "flex",
        padding: "10px 12px",
        margin: "2px 8px",
        width: "calc(100% - 16px)",
        borderRadius: 12,
        backgroundColor: isActive
          ? "#FF6900"
          : hov
          ? "var(--sidebar-hover)"
          : "transparent",
        transition: "background-color 0.15s",
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        backgroundColor: isActive ? "rgba(255,255,255,0.22)" : hov ? "var(--sidebar-active-container)" : "var(--sidebar-accent)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background-color 0.15s",
      }}>
        <Icon style={{
          fontSize: 18,
          color: isActive ? "#FFFFFF" : hov ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)",
          transition: "color 0.15s",
        }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <span style={{
          fontSize: 13, fontFamily: "var(--font-body)",
          fontWeight: isActive ? 700 : hov ? 600 : 500,
          color: isActive ? "#FFFFFF" : hov ? "var(--sidebar-hover-fg)" : "var(--sidebar-foreground)",
          lineHeight: 1.25,
          transition: "color 0.15s",
        }}>
          {label}
        </span>
        <span style={{
          fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 400,
          color: isActive ? "rgba(255,255,255,0.80)" : "var(--sidebar-icon)",
          lineHeight: 1.25, marginTop: 2,
          transition: "color 0.15s",
        }}>
          {description}
        </span>
      </div>
    </button>
  );
}

/* ── Nav sub-panel link row (card-style reference) ───────── */
function SubPanelLink({ label, description, icon: Icon, href }: SubLink) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href ?? "#"}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="no-underline"
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "9px 12px",
        margin: "2px 8px",
        width: "calc(100% - 16px)",
        borderRadius: 12,
        backgroundColor: hov ? "var(--sidebar-hover)" : "transparent",
        transition: "background-color 0.15s",
        boxSizing: "border-box",
      }}
    >
      {Icon && (
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          backgroundColor: hov ? "var(--sidebar-active-container)" : "var(--sidebar-accent)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background-color 0.15s",
        }}>
          <Icon style={{
            fontSize: 18,
            color: hov ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)",
            transition: "color 0.15s",
          }} />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <span style={{
          fontSize: 13, fontFamily: "var(--font-body)",
          fontWeight: hov ? 600 : 500,
          color: hov ? "var(--sidebar-hover-fg)" : "var(--sidebar-foreground)",
          lineHeight: 1.25, whiteSpace: "normal",
          transition: "color 0.15s",
        }}>
          {label}
        </span>
        {description && (
          <span style={{
            fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 400,
            color: "var(--sidebar-icon)", lineHeight: 1.25, marginTop: 2,
          }}>
            {description}
          </span>
        )}
      </div>
    </a>
  );
}

/* ── Generic floating nav sub-panel ─────────────────────── */
function NavSubPanel({ title, sections, pos, onMouseEnter, onMouseLeave }: {
  title: string;
  sections: SubSection[];
  pos: { top: number; left: number; centerY: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return createPortal(
    <>
      {/* Pointer triangle bridging the gap */}
      <div style={{
        position: "fixed", zIndex: 10000,
        top: pos.centerY - 6, left: pos.left - 8,
        width: 0, height: 0,
        borderTop: "6px solid transparent",
        borderBottom: "6px solid transparent",
        borderLeft: "8px solid var(--sidebar-submenu)",
        pointerEvents: "none",
      }} />
    <div
      style={{
        position: "fixed", zIndex: 9999,
        top: pos.top, left: pos.left,
        minWidth: 272,
        maxHeight: `calc(100vh - ${pos.top}px - 16px)`,
        backgroundColor: "var(--sidebar-submenu)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.48), 0 2px 8px rgba(0,0,0,0.32)",
        border: "1px solid var(--sidebar-border)",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={{
        paddingTop: 8, paddingBottom: 8,
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "var(--sidebar-ring) transparent",
      }}>
        <p style={{
          fontSize: 9, fontFamily: "var(--font-heading)", fontWeight: 700,
          color: "var(--sidebar-ring)", textTransform: "uppercase", letterSpacing: "0.12em",
          padding: "4px 20px 8px", margin: 0,
          borderBottom: "1px solid var(--sidebar-border)",
          marginBottom: 4,
        }}>
          {title}
        </p>
        {sections.map((section, si) => (
          <div key={`${section.heading}-${si}`}>
            {si > 0 && (
              <div style={{ height: 1, backgroundColor: "var(--sidebar-border)", margin: "6px 16px" }} />
            )}
            <p style={{
              fontSize: 9, fontFamily: "var(--font-heading)", fontWeight: 700,
              color: "var(--sidebar-ring)", textTransform: "uppercase", letterSpacing: "0.12em",
              padding: "8px 20px 4px", margin: 0,
            }}>
              {section.heading}
            </p>
            {section.links.map((link, li) => (
              <SubPanelLink key={`${link.label}-${li}`} {...link} />
            ))}
          </div>
        ))}
      </div>
    </div>
    </>,
    document.body
  );
}

/* ── Sidebar ─────────────────────────────────────────────── */
interface SidebarProps { activePage: string; onNav: (label: string) => void; }

export function Sidebar({ activePage, onNav }: SidebarProps) {
  const [hovered,     setHovered]     = useState<string | null>(null);
  const [homeSubOpen, setHomeSubOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const homeButtonRef = useRef<HTMLButtonElement>(null);
  const homeSubPos    = useRef({ top: 0, left: 0, centerY: 0 });
  const subMenuPos    = useRef({ top: 0, left: 0, centerY: 0 });
  const homeTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subTimer      = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Home sub-menu */
  const openHomeSub = () => {
    if (homeTimer.current) clearTimeout(homeTimer.current);
    if (homeButtonRef.current) {
      const r = homeButtonRef.current.getBoundingClientRect();
      homeSubPos.current = { top: r.top, left: r.right + 8, centerY: r.top + r.height / 2 };
    }
    setHomeSubOpen(true);
  };
  const scheduleCloseHomeSub = () => {
    homeTimer.current = setTimeout(() => setHomeSubOpen(false), 140);
  };

  /* Generic nav sub-panel */
  const openSub = (label: string, el: HTMLButtonElement) => {
    if (subTimer.current) clearTimeout(subTimer.current);
    const r = el.getBoundingClientRect();
    subMenuPos.current = { top: r.top, left: r.right + 8, centerY: r.top + r.height / 2 };
    setOpenSubMenu(label);
  };
  const scheduleCloseSub = () => {
    subTimer.current = setTimeout(() => setOpenSubMenu(null), 140);
  };

  /* Pages reached via the Home sub-menu — Home stays active in the rail */
  const homeSubTargets = new Set(["Home", "My Cases", "Reports"]);
  const effectiveActive = homeSubTargets.has(activePage) ? "Home" : activePage;

  const renderNavItem = (item: NavItem) => {
    const { icon: Icon, activeIcon: ActiveIcon, label, shortLabel, subSections } = item;
    const isActive  = effectiveActive === label;
    const isHovered = hovered === label;
    const DisplayIcon = isActive ? ActiveIcon : Icon;

    return (
      <Tooltip
        key={label}
        title={label}
        placement="right"
        arrow
        disableHoverListener={!!subSections}
        slotProps={{
          tooltip: {
            style: {
              backgroundColor: "#001f45",
              color: "rgba(255,255,255,0.92)",
              fontFamily: "var(--font-body)",
              fontSize: 12, fontWeight: 600,
              padding: "5px 10px", borderRadius: 8,
              boxShadow: "0 4px 16px rgba(0,0,0,0.40)",
              border: "1px solid rgba(255,255,255,0.10)",
            },
          },
          arrow: { style: { color: "#001f45" } },
        }}
      >
        <button
          type="button"
          aria-label={label}
          aria-current={isActive ? "page" : undefined}
          className="w-full flex flex-col items-center gap-1 pt-2 pb-1.5 px-0 cursor-pointer border-0 bg-transparent focus-visible:outline-none"
          onClick={() => onNav(label)}
          onMouseEnter={(e) => {
            setHovered(label);
            if (subSections) openSub(label, e.currentTarget);
          }}
          onMouseLeave={() => {
            setHovered(null);
            if (subSections) scheduleCloseSub();
          }}
        >
          <div
            style={{
              width: 56, height: 32, borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: isActive
                ? "var(--sidebar-active-container)"
                : isHovered
                ? "var(--sidebar-hover)"
                : "transparent",
              transition: "background-color 0.2s",
            }}
          >
            <DisplayIcon style={{
              fontSize: 24,
              color: isActive ? "var(--sidebar-active-fg)" : isHovered ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)",
              transition: "color 0.15s ease",
            }} />
          </div>
          <span style={{
            fontSize: 11, fontFamily: "var(--font-body)",
            fontWeight: isActive ? 700 : isHovered ? 600 : 500,
            color: isActive ? "var(--sidebar-active-fg)" : isHovered ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)",
            letterSpacing: "0.01em", lineHeight: 1.3,
            transition: "color 0.15s ease", textAlign: "center",
            maxWidth: 72, whiteSpace: "normal", wordBreak: "break-word",
          }}>
            {shortLabel ?? label}
          </span>
        </button>
      </Tooltip>
    );
  };

  const isHomeActive  = effectiveActive === "Home";
  const isHomeHovered = hovered === "Home";
  const activeSubItem = navItems.find((n) => n.label === openSubMenu);

  return (
    <>
      <aside
        style={{
          width: 80, flexShrink: 0,
          display: "flex", flexDirection: "column", alignItems: "center", height: "100%",
          backgroundColor: "var(--sidebar)",
          boxShadow: "2px 0 8px rgba(0,0,0,0.18)",
        }}
      >
        <nav
          style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", scrollbarWidth: "none", paddingTop: 8 }}
          aria-label="Main navigation"
        >
          {/* Home */}
          <button
            ref={homeButtonRef}
            type="button"
            aria-label="Home"
            aria-current={isHomeActive ? "page" : undefined}
            className="w-full flex flex-col items-center gap-1 pt-2 pb-1.5 px-0 cursor-pointer border-0 bg-transparent focus-visible:outline-none"
            onClick={() => onNav("Home")}
            onMouseEnter={() => { setHovered("Home"); openHomeSub(); }}
            onMouseLeave={() => { setHovered(null); scheduleCloseHomeSub(); }}
          >
            <div style={{
              width: 56, height: 32, borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: isHomeActive ? "var(--sidebar-active-container)" : isHomeHovered ? "var(--sidebar-hover)" : "transparent",
              transition: "background-color 0.2s",
            }}>
              {isHomeActive
                ? <HomeIcon style={{ fontSize: 24, color: "var(--sidebar-active-fg)", transition: "color 0.15s" }} />
                : <HomeOutlinedIcon style={{ fontSize: 24, color: isHomeHovered ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)", transition: "color 0.15s" }} />
              }
            </div>
            <span style={{
              fontSize: 11, fontFamily: "var(--font-body)",
              fontWeight: isHomeActive ? 700 : isHomeHovered ? 600 : 500,
              color: isHomeActive ? "var(--sidebar-active-fg)" : isHomeHovered ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)",
              letterSpacing: "0.01em", lineHeight: 1.3, transition: "color 0.15s", textAlign: "center",
            }}>
              Home
            </span>
          </button>

          {navItems.slice(1).map(renderNavItem)}
        </nav>

        {/* Settings */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 12 }}>
          <div style={{ width: 40, height: 1, backgroundColor: "var(--sidebar-border)", margin: "0 auto 4px" }} />
          <button
            type="button"
            aria-label="Settings"
            aria-current={activePage === "Settings" ? "page" : undefined}
            className="w-full flex flex-col items-center gap-1 pt-2 pb-1.5 cursor-pointer border-0 bg-transparent focus-visible:outline-none"
            onClick={() => onNav("Settings")}
            onMouseEnter={() => setHovered("Settings")}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{
              width: 56, height: 32, borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              backgroundColor: activePage === "Settings" ? "var(--sidebar-active-container)" : hovered === "Settings" ? "var(--sidebar-hover)" : "transparent",
              transition: "background-color 0.2s",
            }}>
              {activePage === "Settings"
                ? <SettingsIcon style={{ fontSize: 24, color: "var(--sidebar-active-fg)" }} />
                : <SettingsOutlinedIcon style={{ fontSize: 24, color: hovered === "Settings" ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)" }} />
              }
            </div>
            <span style={{
              fontSize: 11, fontFamily: "var(--font-body)",
              fontWeight: activePage === "Settings" ? 700 : hovered === "Settings" ? 600 : 500,
              color: activePage === "Settings" ? "var(--sidebar-active-fg)" : hovered === "Settings" ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)",
              letterSpacing: "0.01em", lineHeight: 1.3, transition: "color 0.15s",
            }}>
              Settings
            </span>
          </button>
        </div>
      </aside>

      {/* Home floating contextual sheet */}
      {homeSubOpen && createPortal(
        <>
          {/* Pointer triangle */}
          <div style={{
            position: "fixed", zIndex: 10000,
            top: homeSubPos.current.centerY - 6,
            left: homeSubPos.current.left - 8,
            width: 0, height: 0,
            borderTop: "6px solid transparent",
            borderBottom: "6px solid transparent",
            borderLeft: "8px solid var(--sidebar-submenu)",
            pointerEvents: "none",
          }} />
          <div
            style={{
              position: "fixed", zIndex: 9999,
              top: homeSubPos.current.top, left: homeSubPos.current.left,
              minWidth: 252,
              backgroundColor: "var(--sidebar-submenu)",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.48), 0 2px 8px rgba(0,0,0,0.32)",
              border: "1px solid var(--sidebar-border)",
              overflow: "hidden",
            }}
            onMouseEnter={openHomeSub}
            onMouseLeave={scheduleCloseHomeSub}
          >
            <div style={{ paddingTop: 8, paddingBottom: 8 }}>
              {homeSubMenuItems.map((item) => (
                <HomeSubMenuItem
                  key={item.label}
                  label={item.label}
                  description={item.description}
                  icon={item.icon}
                  isActive={activePage === item.navTarget}
                  onClick={() => { setHomeSubOpen(false); onNav(item.navTarget); }}
                />
              ))}
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Generic nav item floating sub-panel */}
      {openSubMenu && activeSubItem?.subSections && (
        <NavSubPanel
          title={activeSubItem.label}
          sections={activeSubItem.subSections}
          pos={subMenuPos.current}
          onMouseEnter={() => { if (subTimer.current) clearTimeout(subTimer.current); }}
          onMouseLeave={scheduleCloseSub}
        />
      )}
    </>
  );
}
