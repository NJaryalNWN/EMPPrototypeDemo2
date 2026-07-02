import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import AutoAwesomeIcon            from "@mui/icons-material/AutoAwesome";
import HomeOutlinedIcon           from "@mui/icons-material/HomeOutlined";
import HomeIcon                   from "@mui/icons-material/Home";
import StorageOutlinedIcon        from "@mui/icons-material/StorageOutlined";
import StorageIcon                from "@mui/icons-material/Storage";
import HeadsetMicOutlinedIcon     from "@mui/icons-material/HeadsetMicOutlined";
import HeadsetMicIcon             from "@mui/icons-material/HeadsetMic";
import GppGoodOutlinedIcon        from "@mui/icons-material/GppGoodOutlined";
import GppGoodIcon                from "@mui/icons-material/GppGood";
import VideocamOutlinedIcon       from "@mui/icons-material/VideocamOutlined";
import VideocamIcon               from "@mui/icons-material/Videocam";
import GroupsOutlinedIcon         from "@mui/icons-material/GroupsOutlined";
import GroupsIcon                 from "@mui/icons-material/Groups";
import DevicesOutlinedIcon        from "@mui/icons-material/DevicesOutlined";
import DevicesIcon                from "@mui/icons-material/Devices";
import SettingsOutlinedIcon       from "@mui/icons-material/SettingsOutlined";
import SettingsIcon               from "@mui/icons-material/Settings";
import OpenInNewIcon              from "@mui/icons-material/OpenInNew";

type IconComp = React.ComponentType<{ style?: React.CSSProperties }>;

interface SubItem  { label: string; navTarget: string; isExternal?: boolean; }
interface Section  { heading?: string; items: SubItem[]; }
interface NavConfig {
  label: string;
  icon: IconComp;
  activeIcon: IconComp;
  navTarget?: string;
  sectionTitle?: string;
  sections?: Section[];
}

/* ── Primary nav — mirrors getEmpMenu API (labels/routes only, icons unchanged) ── */
const navConfig: NavConfig[] = [
  {
    label: "Home", icon: HomeOutlinedIcon, activeIcon: HomeIcon,
    sectionTitle: "HOME",
    sections: [{ items: [
      { label: "Knowledge Base",  navTarget: "Knowledge Base" },
      { label: "Service Catalog", navTarget: "Service Catalog" },
      { label: "Tickets",         navTarget: "My Cases" },
    ]}],
  },
  {
    label: "Intelligent Infrastructure",
    icon: StorageOutlinedIcon, activeIcon: StorageIcon,
    sectionTitle: "INTELLIGENT INFRASTRUCTURE",
    sections: [
      { heading: "CONTROL", items: [
        { label: "Meraki | Admin",        navTarget: "https://account.meraki.com/secure/login/dashboard_login", isExternal: true },
        { label: "DNA Center Cloud",      navTarget: "https://dnacentercloud.cisco.com/auth/login", isExternal: true },
        { label: "Aruba | Admin",         navTarget: "https://portal-prod2.central.arubanetworks.com/platform/login/user", isExternal: true },
        { label: "Intersight | Admin",    navTarget: "https://intersight.com/", isExternal: true },
        { label: "HPE Infosight | Admin", navTarget: "https://infosight.hpe.com/app/login", isExternal: true },
      ]},
      { heading: "MONITOR", items: [
        { label: "Contrivian | Northstar",  navTarget: "https://connectivitymgr.nwn.ai/", isExternal: true },
        { label: "Speedcast | Compass",     navTarget: "https://compass.speedcast.com/login", isExternal: true },
        { label: "Performance Monitoring",  navTarget: "https://nwnc.zenoss.io/", isExternal: true },
        { label: "Performance Monitoring",  navTarget: "https://its.ez.nwnit.com/", isExternal: true },
      ]},
      { heading: "REPORT", items: [
        { label: "Contrivian | Northstar", navTarget: "https://connectivitymgr.nwn.ai/", isExternal: true },
        { label: "Speedcast | Compass",    navTarget: "https://compass.speedcast.com/login", isExternal: true },
      ]},
    ],
  },
  {
    label: "Contact Center",
    icon: HeadsetMicOutlinedIcon, activeIcon: HeadsetMicIcon,
    sectionTitle: "CONTACT CENTER",
    sections: [
      { heading: "CONTROL", items: [
        { label: "Webex CC | Admin",  navTarget: "https://admin.webex.com/login", isExternal: true },
        { label: "CCDM | Admin",      navTarget: "https://ccdm.nwncloud.com/Portal", isExternal: true },
        { label: "Five9 | Admin",     navTarget: "https://admin.us.five9.net", isExternal: true },
      ]},
      { heading: "MONITOR", items: [
        { label: "Performance Monitoring", navTarget: "https://nwnc.zenoss.io/", isExternal: true },
        { label: "Performance Monitoring", navTarget: "https://its.ez.nwnit.com/", isExternal: true },
        { label: "Performance Monitoring", navTarget: "https://its.ez.nwnit.com/", isExternal: true },
      ]},
      { heading: "REPORT", items: [
        { label: "Webex CC | Report", navTarget: "https://admin.webex.com/login", isExternal: true },
        { label: "SIP Reporting",     navTarget: "https://customer.nwncloud.com/SSO/Login.aspx?ClientID=NWNCommReporting", isExternal: true },
        { label: "SIP Reporting",     navTarget: "https://customer.nwncloud.com/SSO/Login.aspx?ClientID=NWNCommReporting", isExternal: true },
      ]},
    ],
  },
  {
    label: "Managed Security",
    icon: GppGoodOutlinedIcon, activeIcon: GppGoodIcon,
    sectionTitle: "MANAGED SECURITY",
    sections: [
      { heading: "CONTROL", items: [
        { label: "SecureX | Admin",      navTarget: "https://sign-on.security.cisco.com/", isExternal: true },
        { label: "Meraki | Admin",       navTarget: "https://account.meraki.com/secure/login/dashboard_login", isExternal: true },
        { label: "Threat Investigation", navTarget: "https://us1-prosearch.proficio.com/", isExternal: true },
      ]},
      { heading: "MONITOR", items: [
        { label: "Performance Monitoring", navTarget: "https://nwnc.zenoss.io/", isExternal: true },
        { label: "Performance Monitoring", navTarget: "https://its.ez.nwnit.com/", isExternal: true },
      ]},
      { heading: "REPORT", items: [
        { label: "Patch Reporting", navTarget: "https://pa.ez.nwnit.com", isExternal: true },
        { label: "SOC Reporting",   navTarget: "https://deepwatch.okta.com/signin", isExternal: true },
        { label: "Threat Insights", navTarget: "https://login.proficio.com", isExternal: true },
      ]},
    ],
  },
  {
    label: "Unified Communications",
    icon: VideocamOutlinedIcon, activeIcon: VideocamIcon,
    sectionTitle: "UNIFIED COMMUNICATIONS",
    sections: [
      { heading: "CONTROL", items: [
        { label: "Webex Control Hub | Admin", navTarget: "https://admin.webex.com/login", isExternal: true },
        { label: "Webex | Selfcare",          navTarget: "https://settings.webex.com/login", isExternal: true },
        { label: "Number Management",         navTarget: "https://carousel.ipilot.io", isExternal: true },
      ]},
      { heading: "MONITOR", items: [
        { label: "Performance Monitoring", navTarget: "https://nwnc.zenoss.io/", isExternal: true },
        { label: "Performance Monitoring", navTarget: "https://its.ez.nwnit.com/", isExternal: true },
        { label: "Performance Monitoring", navTarget: "https://its.ez.nwnit.com/", isExternal: true },
      ]},
      { heading: "REPORT", items: [
        { label: "Webex Call Detail", navTarget: "https://admin.webex.com/login", isExternal: true },
        { label: "Webex SIP Usage",   navTarget: "https://customer.nwncloud.com/SSO/Login.aspx?ClientID=NWNCommReporting", isExternal: true },
        { label: "Analytics",         navTarget: "https://customer.nwncloud.com/SSO/Login.aspx?ClientID=NWNCommReporting", isExternal: true },
      ]},
    ],
  },
  {
    label: "Visual Collaboration",
    icon: GroupsOutlinedIcon, activeIcon: GroupsIcon,
    sectionTitle: "VISUAL COLLABORATION",
    sections: [
      { heading: "CONTROL", items: [
        { label: "Crestron | Admin",          navTarget: "https://portal.crestron.io/", isExternal: true },
        { label: "Microsoft | Admin",         navTarget: "https://portal.rooms.microsoft.com/", isExternal: true },
        { label: "Cisco Control Hub | Admin", navTarget: "https://admin.webex.com/login", isExternal: true },
      ]},
      { heading: "MONITOR", items: [
        { label: "Performance Monitoring", navTarget: "https://nwnc.zenoss.io/", isExternal: true },
        { label: "Performance Monitoring", navTarget: "https://portal.crestron.io/", isExternal: true },
        { label: "HP",                     navTarget: "https://www.hpdaas.com/", isExternal: true },
        { label: "Poly",                   navTarget: "https://lens.poly.com/", isExternal: true },
      ]},
    ],
  },
  {
    label: "Devices",
    icon: DevicesOutlinedIcon, activeIcon: DevicesIcon,
    sectionTitle: "DEVICES",
    sections: [
      { heading: "MONITOR", items: [
        { label: "Performance Monitoring", navTarget: "https://nwnc.zenoss.io/", isExternal: true },
        { label: "Performance Monitoring", navTarget: "http://hpdaas.com", isExternal: true },
      ]},
      { heading: "REPORT", items: [
        { label: "Analytics",          navTarget: "http://hpdaas.com", isExternal: true },
        { label: "CSC Call Analytics", navTarget: "https://customer.nwncloud.com/SSO/Login.aspx?ClientID=NWNCommReporting", isExternal: true },
      ]},
    ],
  },
  {
    label: "Settings", icon: SettingsOutlinedIcon, activeIcon: SettingsIcon,
    navTarget: "Settings",
  },
];

/* Which rail item owns the active page */
function getRailOwner(page: string): string {
  for (const n of navConfig) {
    if (n.navTarget === page) return n.label;
    if (n.sections?.some((s) => s.items.some((i) => !i.isExternal && i.navTarget === page))) return n.label;
  }
  return "Home";
}

/* Inject M3 panel animation once */
const ANIMATION_ID = "m3-panel-anim";
if (typeof document !== "undefined" && !document.getElementById(ANIMATION_ID)) {
  const s = document.createElement("style");
  s.id = ANIMATION_ID;
  s.textContent = `
    @keyframes m3PanelIn {
      from { opacity: 0; transform: translateX(-10px); }
      to   { opacity: 1; transform: translateX(0); }
    }
  `;
  document.head.appendChild(s);
}

/* ── Full-height floating panel ──────────────────────────── */
function FloatingPanel({
  config, activePage, panelLeft, onNav, onMouseEnter, onMouseLeave,
}: {
  config: NavConfig; activePage: string; panelLeft: number;
  onNav: (p: string) => void; onMouseEnter: () => void; onMouseLeave: () => void;
}) {
  return createPortal(
    <>
      {/* Invisible hover bridge */}
      <div
        style={{ position: "fixed", zIndex: 9998, top: 0, left: panelLeft - 6, width: 6, height: "100vh", pointerEvents: "auto" }}
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed", zIndex: 9999,
          top: 0, left: panelLeft, width: 264, height: "100vh",
          backgroundColor: "#FFFFFF",
          borderLeft: "1.5px solid rgba(0,40,85,0.13)",
          borderRight: "1px solid rgba(0,40,85,0.07)",
          boxShadow: "6px 0 24px rgba(0,0,0,0.07)",
          display: "flex", flexDirection: "column",
          overflowY: "auto", scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,40,85,0.10) transparent",
          animation: "m3PanelIn 0.18s cubic-bezier(0.2, 0, 0, 1) both",
        }}
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      >
        {/* Section title */}
        <p style={{
          margin: 0, padding: "24px 20px 12px",
          fontSize: 11, fontFamily: "var(--font-heading)", fontWeight: 700,
          color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.10em",
        }}>
          {config.sectionTitle}
        </p>

        {/* Sections with optional group headings */}
        <div style={{ padding: "0 10px 24px", flex: 1 }}>
          {(() => {
            /* Placeholder sub-items within a rail often share the same
               navTarget (no distinct page built yet) — only the first
               match should ever read as active, otherwise every item
               sharing that target lights up at once. */
            let firstMatchClaimed = false;
            return config.sections!.map((section, si) => (
            <div key={si}>
              {/* Group heading (ADMIN / MONITOR / REPORT) */}
              {section.heading && (
                <p style={{
                  margin: si === 0 ? "0 0 4px 10px" : "12px 0 4px 10px",
                  fontSize: 10, fontFamily: "var(--font-heading)", fontWeight: 700,
                  color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.12em",
                }}>
                  {section.heading}
                </p>
              )}

              {/* Items */}
              {section.items.map((item, ii) => {
                const matchesTarget = activePage === item.navTarget;
                const isActive = matchesTarget && !firstMatchClaimed;
                if (matchesTarget) firstMatchClaimed = true;
                return (
                  <button
                    key={`${si}-${ii}`}
                    type="button"
                    onClick={() => {
                      if (item.isExternal) window.open(item.navTarget, "_blank", "noopener,noreferrer");
                      else onNav(item.navTarget);
                    }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 8,
                      padding: "11px 14px", marginBottom: 1,
                      borderRadius: 8,
                      border: 0, cursor: "pointer", textAlign: "left",
                      backgroundColor: isActive ? "var(--sidebar-active-container)" : "transparent",
                      transition: "background-color 0.12s",
                    }}
                    onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,40,85,0.05)"; }}
                    onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                  >
                    <span style={{
                      flex: 1, fontSize: 14, fontFamily: "var(--font-body)",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--sidebar-active-fg)" : "var(--foreground)",
                      lineHeight: 1.4,
                    }}>
                      {item.label}
                    </span>
                    {item.isExternal && (
                      <OpenInNewIcon style={{ fontSize: 13, color: "var(--muted-foreground)", flexShrink: 0, opacity: 0.6 }} />
                    )}
                  </button>
                );
              })}
            </div>
            ));
          })()}
        </div>
      </div>
    </>,
    document.body
  );
}

/* ── Sidebar ─────────────────────────────────────────────── */
interface SidebarProps { activePage: string; onNav: (page: string) => void; onAiva?: () => void; }

export function Sidebar({ activePage, onNav, onAiva }: SidebarProps) {
  const activeRail              = getRailOwner(activePage);
  const [hovered, setHovered]   = useState<string | null>(null);
  const [panelLeft, setPanelLeft] = useState(88);
  const hideTimer               = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelHide  = () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  const scheduleHide = () => { hideTimer.current = setTimeout(() => setHovered(null), 140); };

  const hoveredConfig = navConfig.find((n) => n.label === hovered);
  const showPanel     = !!hoveredConfig?.sections?.length;

  return (
    <>
      <aside style={{
        width: 88, flexShrink: 0,
        display: "flex", flexDirection: "column", alignItems: "center",
        backgroundColor: "var(--sidebar)",
        borderRight: "1.5px solid rgba(0,40,85,0.13)",
      }}>

        {/* ── Aiva icon — global AI assistant ──────────────── */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "14px 0 12px" }}>
          <button
            type="button"
            aria-label="Open Aiva AI assistant"
            onClick={onAiva}
            style={{
              width: 48, height: 48, borderRadius: 14,
              backgroundColor: "#00A3E0",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: 0, cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,163,224,0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(0,163,224,0.48)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,163,224,0.35)"; }}
          >
            <AutoAwesomeIcon style={{ fontSize: 22, color: "#FFFFFF" }} />
          </button>
        </div>

        {/* Divider below Aiva */}
        <div style={{ width: 48, height: 1, backgroundColor: "var(--sidebar-border)", marginBottom: 8 }} />

        {/* ── Nav items ─────────────────────────────────────── */}
        <nav
          style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto", scrollbarWidth: "none" }}
          aria-label="Main navigation"
        >
          {navConfig.map((item) => {
            const isActive  = activeRail === item.label;
            const isHovered = hovered    === item.label;
            const Icon      = (isActive || isHovered) ? item.activeIcon : item.icon;

            return (
              <button
                key={item.label}
                type="button"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                onClick={() => { if (item.navTarget) onNav(item.navTarget); }}
                onMouseEnter={(e) => {
                  cancelHide();
                  setHovered(item.label);
                  if (item.sections?.length) setPanelLeft(e.currentTarget.getBoundingClientRect().right);
                }}
                onMouseLeave={() => { item.sections?.length ? scheduleHide() : setHovered(null); }}
                style={{
                  width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
                  gap: 3, paddingTop: 8, paddingBottom: 10,
                  border: 0, background: "transparent", cursor: "pointer", outline: "none",
                }}
              >
                {/* Rounded-square indicator */}
                <div style={{
                  width: 44, height: 44, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  backgroundColor: isActive
                    ? "var(--sidebar-active-container)"
                    : isHovered ? "var(--sidebar-hover)" : "transparent",
                  transition: "background-color 0.15s",
                }}>
                  <Icon style={{
                    fontSize: 22,
                    color: isActive
                      ? "var(--sidebar-active-fg)"
                      : isHovered ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)",
                    transition: "color 0.12s",
                  }} />
                </div>

                {/* label — fixed 2-line height keeps all items uniform */}
                <span style={{
                  display: "block",
                  fontSize: 10, fontFamily: "var(--font-body)", fontWeight: isActive ? 700 : 500,
                  color: isActive
                    ? "var(--sidebar-active-fg)"
                    : isHovered ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)",
                  textAlign: "center", lineHeight: 1.3,
                  width: 72,
                  height: 26,
                  overflow: "hidden",
                  wordBreak: "break-word",
                  transition: "color 0.12s",
                }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Full-height floating panel on hover ─────────────── */}
      {showPanel && hoveredConfig && (
        <FloatingPanel
          config={hoveredConfig}
          activePage={activePage}
          panelLeft={panelLeft}
          onNav={(page) => { onNav(page); setHovered(null); }}
          onMouseEnter={cancelHide}
          onMouseLeave={scheduleHide}
        />
      )}
    </>
  );
}
