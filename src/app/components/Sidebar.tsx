import { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

type IconComponent = React.ComponentType<{ style?: React.CSSProperties }>;

interface NavItem {
  icon: IconComponent;
  activeIcon: IconComponent;
  label: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: HomeOutlinedIcon,            activeIcon: HomeIcon,                   label: "Home",                    badge: 2 },
  { icon: PeopleAltOutlinedIcon,       activeIcon: PeopleAltOutlinedIcon,      label: "Customer Experience" },
  { icon: GroupsOutlinedIcon,          activeIcon: GroupsOutlinedIcon,         label: "Visual Collaboration" },
  { icon: BusinessCenterOutlinedIcon,  activeIcon: BusinessCenterOutlinedIcon, label: "Intelligent Workplace" },
  { icon: DevicesOutlinedIcon,         activeIcon: DevicesOutlinedIcon,        label: "Managed Devices" },
  { icon: VerifiedUserOutlinedIcon,    activeIcon: VerifiedUserOutlinedIcon,   label: "Asset Assurance" },
  { icon: HubOutlinedIcon,             activeIcon: HubOutlinedIcon,            label: "Intelligent Connectivity" },
  { icon: CloudOutlinedIcon,           activeIcon: CloudOutlinedIcon,          label: "Intelligent Cloud" },
  { icon: SecurityOutlinedIcon,        activeIcon: SecurityOutlinedIcon,       label: "Security" },
];

interface SidebarProps {
  activePage: string;
  onNav: (label: string) => void;
  onAiva: () => void;
}

/* Tooltip that appears to the right of the icon */
function NavTooltip({ label, visible }: { label: string; visible: boolean }) {
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute left-full ml-3 z-50 whitespace-nowrap rounded-lg px-3 py-1.5 transition-all duration-150"
      style={{
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
        fontSize: 12,
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-4px)",
        pointerEvents: "none",
        top: "50%",
        marginTop: "-14px",
      }}
    >
      {label}
      {/* Arrow */}
      <span
        className="absolute right-full top-1/2 -mt-[5px]"
        style={{
          borderWidth: "5px 5px 5px 0",
          borderStyle: "solid",
          borderColor: `transparent var(--foreground) transparent transparent`,
        }}
      />
    </div>
  );
}

export function Sidebar({ activePage, onNav, onAiva }: SidebarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside
      className="w-[64px] flex flex-col items-center h-full flex-shrink-0 py-3 transition-colors duration-200"
      style={{
        backgroundColor: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
      }}
    >
      {/* Nav items */}
      <nav className="flex-1 w-full flex flex-col items-center gap-0.5 mt-1" aria-label="Main navigation">
        {navItems.map(({ icon: Icon, activeIcon: ActiveIcon, label, badge }) => {
          const isActive = activePage === label;
          const isHovered = hovered === label;
          const DisplayIcon = isActive ? ActiveIcon : Icon;

          return (
            <div key={label} className="relative w-full flex items-center justify-center">
              <button
                type="button"
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className="relative w-full flex items-center justify-center cursor-pointer select-none border-0 bg-transparent py-1 focus-visible:outline-none"
                onClick={() => onNav(label)}
                onMouseEnter={() => setHovered(label)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(label)}
                onBlur={() => setHovered(null)}
              >
                <div
                  className="relative flex items-center justify-center w-12 h-8 rounded-full transition-all duration-150"
                  style={{
                    backgroundColor: isActive
                      ? "var(--sidebar-active-container)"
                      : isHovered
                      ? "color-mix(in srgb, var(--sidebar-active-container) 40%, transparent)"
                      : "transparent",
                  }}
                >
                  <DisplayIcon
                    style={{
                      fontSize: 21,
                      color: isActive ? "var(--sidebar-active-fg)" : "var(--sidebar-icon)",
                      transition: "color 0.15s ease",
                    }}
                  />
                  {badge && !isActive && (
                    <span
                      className="absolute top-0 right-1.5 min-w-[14px] h-3.5 px-[3px] rounded-full bg-red-500 text-white flex items-center justify-center font-semibold"
                      style={{ fontSize: 8 }}
                    >
                      {badge}
                    </span>
                  )}
                </div>
              </button>
              <NavTooltip label={label} visible={isHovered} />
            </div>
          );
        })}
      </nav>

      {/* Bottom: Settings + AIVA */}
      <div className="flex flex-col items-center gap-2 pb-1">
        {/* Settings */}
        <div className="relative w-full flex items-center justify-center">
          <button
            type="button"
            aria-label="Settings"
            className="flex items-center justify-center w-12 h-8 rounded-full cursor-pointer border-0 bg-transparent transition-all duration-150 focus-visible:outline-none"
            style={{
              backgroundColor:
                activePage === "Settings"
                  ? "var(--sidebar-active-container)"
                  : hovered === "Settings"
                  ? "color-mix(in srgb, var(--sidebar-active-container) 40%, transparent)"
                  : "transparent",
            }}
            onMouseEnter={() => setHovered("Settings")}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered("Settings")}
            onBlur={() => setHovered(null)}
            onClick={() => onNav("Settings")}
          >
            <SettingsOutlinedIcon
              style={{
                fontSize: 21,
                color: activePage === "Settings" ? "var(--sidebar-active-fg)" : "var(--sidebar-icon)",
              }}
            />
          </button>
          <NavTooltip label="Settings" visible={hovered === "Settings"} />
        </div>

        {/* AIVA floating button */}
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            aria-label="Open Aiva AI assistant"
            onClick={onAiva}
            onMouseEnter={() => setHovered("Aiva")}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered("Aiva")}
            onBlur={() => setHovered(null)}
            className="flex items-center justify-center w-10 h-10 rounded-2xl cursor-pointer border-0 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus-visible:outline-none"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <AutoAwesomeIcon style={{ fontSize: 18, color: "var(--primary-foreground)" }} />
          </button>
          <NavTooltip label="Ask Aiva" visible={hovered === "Aiva"} />
        </div>
      </div>
    </aside>
  );
}
