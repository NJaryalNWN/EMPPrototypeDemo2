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
import { cn } from "./ui/utils";

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

/* Inject M3 panel-entrance keyframes once (Tailwind has no built-in equivalent) */
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
      {/* Invisible hover bridge — dynamic position, must stay inline */}
      <div
        className="fixed z-[9998] top-0 h-screen"
        style={{ left: panelLeft - 6, width: 6 }}
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      />

      {/* Panel */}
      <div
        className="fixed z-[9999] top-0 h-screen w-[264px] flex flex-col overflow-y-auto bg-white [scrollbar-width:thin] [scrollbar-color:rgba(0,40,85,0.10)_transparent] border-l-[1.5px] border-l-[rgba(0,40,85,0.13)] border-r border-r-[rgba(0,40,85,0.07)] shadow-[6px_0_24px_rgba(0,0,0,0.07)] animate-[m3PanelIn_0.18s_cubic-bezier(0.2,0,0,1)_both]"
        style={{ left: panelLeft }}
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      >
        {/* Section title */}
        <p className="m-0 px-5 pt-6 pb-3 text-[11px] font-[var(--font-heading)] font-bold text-muted-foreground uppercase tracking-[0.10em]">
          {config.sectionTitle}
        </p>

        {/* Sections with optional group headings */}
        <div className="flex-1 px-2.5 pb-6">
          {(() => {
            /* Placeholder sub-items within a rail often share the same
               navTarget (no distinct page built yet) — only the first
               match should ever read as active, otherwise every item
               sharing that target lights up at once. */
            let firstMatchClaimed = false;
            return config.sections!.map((section, si) => (
            <div key={si}>
              {/* Group heading (CONTROL / MONITOR / REPORT) */}
              {section.heading && (
                <p className={cn(
                  "text-[10px] font-[var(--font-heading)] font-bold text-muted-foreground uppercase tracking-[0.12em] ml-2.5 mb-1",
                  si === 0 ? "mt-0" : "mt-3",
                )}>
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
                    className={cn(
                      "w-full flex items-center gap-2 mb-px px-3.5 py-2.5 rounded-lg border-0 text-left cursor-pointer transition-colors duration-150",
                      isActive
                        ? "bg-[var(--sidebar-active-container)]"
                        : "bg-transparent hover:bg-[rgba(0,40,85,0.05)]",
                    )}
                  >
                    <span className={cn(
                      "flex-1 text-sm font-[var(--font-body)] leading-[1.4]",
                      isActive ? "font-semibold text-[var(--sidebar-active-fg)]" : "font-normal text-foreground",
                    )}>
                      {item.label}
                    </span>
                    {item.isExternal && (
                      <OpenInNewIcon style={{ fontSize: 13 }} className="flex-shrink-0 text-muted-foreground opacity-60" />
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
      <aside className="w-[88px] flex-shrink-0 flex flex-col items-center bg-sidebar border-r-[1.5px] border-r-[rgba(0,40,85,0.13)]">

        {/* ── Aiva icon — global AI assistant (offering color #00A3E0) ── */}
        <div className="w-full flex justify-center pt-3.5 pb-3">
          <button
            type="button"
            aria-label="Open Aiva AI assistant"
            onClick={onAiva}
            className="w-12 h-12 rounded-[14px] flex items-center justify-center border-0 cursor-pointer bg-[#00A3E0] shadow-[0_2px_8px_rgba(0,163,224,0.35)] transition-[transform,box-shadow] duration-150 hover:scale-[1.06] hover:shadow-[0_4px_14px_rgba(0,163,224,0.48)]"
          >
            <AutoAwesomeIcon style={{ fontSize: 22 }} className="text-white" />
          </button>
        </div>

        {/* Divider below Aiva */}
        <div className="w-12 h-px bg-sidebar-border mb-2" />

        {/* ── Nav items ─────────────────────────────────────── */}
        <nav
          className="flex-1 w-full flex flex-col items-center overflow-y-auto [scrollbar-width:none]"
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
                className="w-full flex flex-col items-center gap-[3px] pt-2 pb-2.5 border-0 bg-transparent cursor-pointer outline-none"
              >
                {/* Stadium pill indicator — MD3 nav-rail active indicator shape: neutral on hover, brand on active */}
                <div className={cn(
                  "w-16 h-10 rounded-full flex items-center justify-center transition-colors duration-150",
                  isActive ? "bg-[var(--sidebar-active-container)]" : isHovered ? "bg-[var(--sidebar-hover)]" : "bg-transparent",
                )}>
                  <Icon style={{
                    fontSize: 22,
                    color: isActive
                      ? "var(--sidebar-active-fg)"
                      : isHovered ? "var(--sidebar-hover-fg)" : "var(--sidebar-icon)",
                  }} />
                </div>

                {/* label — fixed 2-line height keeps all items uniform */}
                <span className={cn(
                  "block w-[72px] h-[26px] text-center text-[10px] font-[var(--font-body)] leading-[1.3] overflow-hidden break-words transition-colors duration-150",
                  isActive
                    ? "font-bold text-[var(--sidebar-active-fg)]"
                    : isHovered ? "font-medium text-[var(--sidebar-hover-fg)]" : "font-medium text-[var(--sidebar-icon)]",
                )}>
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
