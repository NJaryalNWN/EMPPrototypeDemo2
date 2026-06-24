import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import CheckIcon from "@mui/icons-material/Check";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import nwnLogo from "../../imports/nwn-logo.png";
import nwnLogoDark from "../../imports/nwn-logo-dark.png";
import { useTheme, type Theme } from "../context/ThemeContext";
import { Btn } from "./ui/Btn";
import { NotificationDrawer } from "./NotificationDrawer";

/* ── Amazon wordmark — inline SVG for reliable dark-mode control ── */
function AmazonWordmark({ dark }: { dark: boolean }) {
  const ink = dark ? "#FFFFFF" : "#0F1111";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 218 66"
      aria-label="Amazon"
      style={{ height: "100%", width: "auto", display: "block" }}
    >
      {/* Wordmark */}
      <text
        x="4" y="48"
        fontFamily='"Amazon Ember", "Arial Black", "Arial Bold", Arial, sans-serif'
        fontSize="50"
        fontWeight="900"
        fill={ink}
        letterSpacing="-2"
      >
        amazon
      </text>
      {/* Orange swoosh — from under 'a' to under 'z', with arrowhead */}
      <path
        d="M16 57 Q70 74 152 57"
        stroke="#FF9900" strokeWidth="5" fill="none"
        strokeLinecap="round"
      />
      <path
        d="M146 52 L155 57 L146 62"
        stroke="#FF9900" strokeWidth="4" fill="none"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Theme definitions ───────────────────────────────────── */
const themes: {
  value: Theme;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  swatches: string[];
}[] = [
  { value: "light", label: "Light",       icon: WbSunnyOutlinedIcon,         swatches: ["#F5F7FA", "#002855", "#FF6900"] },
  { value: "dark",  label: "Dark",        icon: DarkModeOutlinedIcon,        swatches: ["#1a1f2e", "#A8C8FF", "#FF8C3E"] },
  { value: "warm",  label: "Warm Amber",  icon: WbIncandescentOutlinedIcon,  swatches: ["#FFFBF5", "#B45309", "#F59E0B"] },
];

/* ── Theme picker popover ────────────────────────────────── */
function ThemePicker({ anchorEl, open, onClose }: {
  anchorEl: HTMLElement | null; open: boolean; onClose: () => void;
}) {
  const { theme, setTheme } = useTheme();
  const [pos, setPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (anchorEl && open) {
      const r = anchorEl.getBoundingClientRect();
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
  }, [anchorEl, open]);

  if (!open) return null;

  return createPortal(
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 9998 }} onClick={onClose} />
      <div style={{
        position: "fixed", zIndex: 9999,
        top: pos.top, right: pos.right,
        width: 240,
        backgroundColor: "var(--card)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.10)",
        border: "1px solid var(--border)",
        padding: "12px 10px",
      }}>
        <p style={{
          fontSize: 10, fontFamily: "var(--font-heading)", fontWeight: 700,
          color: "var(--muted-foreground)", textTransform: "uppercase",
          letterSpacing: "0.10em", padding: "0 6px 8px", margin: 0,
        }}>Theme</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {themes.map((t) => {
            const Icon = t.icon;
            const isActive = theme === t.value;
            return (
              <button key={t.value} type="button"
                onClick={() => { setTheme(t.value); onClose(); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 10px", borderRadius: 12,
                  border: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                  backgroundColor: isActive ? "var(--accent)" : "transparent",
                  cursor: "pointer", width: "100%", textAlign: "left",
                  transition: "background-color 0.15s, border-color 0.15s",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, backgroundColor: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon style={{ fontSize: 18, color: isActive ? "var(--primary)" : "var(--muted-foreground)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ display: "block", fontSize: 14, fontFamily: "var(--font-body)", fontWeight: isActive ? 700 : 500, color: "var(--foreground)", lineHeight: 1.2 }}>
                    {t.label}
                  </span>
                  <div style={{ display: "flex", gap: 4, marginTop: 5 }}>
                    {t.swatches.map((color, i) => (
                      <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: color, border: "1px solid rgba(0,0,0,0.10)" }} />
                    ))}
                  </div>
                </div>
                {isActive && <CheckIcon style={{ fontSize: 18, color: "var(--primary)", flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      </div>
    </>,
    document.body
  );
}

/* ── User menu popover ───────────────────────────────────── */
const userMenuItems = [
  { icon: PersonOutlinedIcon,    label: "Your Profile" },
  { icon: StarBorderOutlinedIcon, label: "Organization Settings" },
  { icon: AppsOutlinedIcon,      label: "Products & Billing" },
];

function UserMenu({ anchorEl, open, onClose }: {
  anchorEl: HTMLElement | null; open: boolean; onClose: () => void;
}) {
  const [pos, setPos] = useState({ top: 0, right: 0 });

  useEffect(() => {
    if (anchorEl && open) {
      const r = anchorEl.getBoundingClientRect();
      setPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
  }, [anchorEl, open]);

  if (!open) return null;

  return createPortal(
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 9998 }} onClick={onClose} />
      <div style={{
        position: "fixed", zIndex: 9999,
        top: pos.top, right: pos.right,
        width: 260,
        backgroundColor: "var(--card)",
        borderRadius: 16,
        boxShadow: "0 8px 32px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.10)",
        border: "1px solid var(--border)",
        overflow: "hidden",
      }}>
        {/* User info */}
        <div style={{ padding: "16px 18px 14px", borderBottom: "1px solid var(--border)" }}>
          <p style={{ fontSize: 15, fontFamily: "var(--font-body)", fontWeight: 700, color: "var(--foreground)", margin: 0, lineHeight: 1.3 }}>
            Nitin Jaryal
          </p>
          <p style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", margin: "2px 0 0" }}>
            nitin.jaryal@nwn.ai
          </p>
        </div>

        {/* Menu items */}
        <div style={{ padding: "6px 0" }}>
          {userMenuItems.map(({ icon: Icon, label }) => (
            <button key={label} type="button" onClick={onClose}
              className="w-full flex items-center gap-3 border-0 bg-transparent cursor-pointer text-left"
              style={{ padding: "11px 18px", transition: "background-color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <Icon style={{ fontSize: 20, color: "var(--foreground)" }} />
              <span style={{ fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 500, color: "var(--foreground)" }}>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* Sign out */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "6px 0 4px" }}>
          <button type="button" onClick={onClose}
            className="w-full flex items-center gap-3 border-0 bg-transparent cursor-pointer text-left"
            style={{ padding: "11px 18px", transition: "background-color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <LogoutOutlinedIcon style={{ fontSize: 20, color: "#FF6900" }} />
            <span style={{ fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 600, color: "#FF6900" }}>
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}

/* ── Header ──────────────────────────────────────────────── */
export function Header() {
  const { theme } = useTheme();
  const [pickerOpen,   setPickerOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen,    setNotifOpen]    = useState(false);

  const pickerBtnRef  = useRef<HTMLButtonElement>(null);
  const userBtnRef    = useRef<HTMLButtonElement>(null);

  return (
    <>
      <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0 transition-colors duration-200">
        {/* ── Enterprise brand lockup ───────────────────────────
             Primary: Amazon wordmark fills the logo zone
             Secondary: "Powered by NWN" — right-aligned below,
             following the ServiceNow / Salesforce partner pattern  */}
        <div className="flex items-center gap-4 flex-shrink-0">

          {/* Logo zone — stacked lockup */}
          <div className="flex flex-col" style={{ gap: 2 }}>

            {/* Amazon — primary brand, tall to fill header */}
            <div style={{ height: 30 }}>
              <AmazonWordmark dark={theme === "dark"} />
            </div>

            {/* Powered by NWN — right-aligned caption row */}
            <div className="flex items-center justify-end" style={{ gap: 5 }}>
              <span style={{
                fontSize: 7.5,
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "var(--muted-foreground)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}>
                Powered by
              </span>
              <img
                src={theme === "dark" ? nwnLogoDark : nwnLogo}
                alt="NWN"
                style={{ height: 11, width: "auto", opacity: 0.80 }}
              />
            </div>

          </div>

          {/* Divider + portal identity */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="w-px h-6 bg-border" />
            <div className="flex flex-col" style={{ lineHeight: 1.25 }}>
              <span className="text-foreground font-semibold tracking-tight" style={{ fontSize: 14, fontFamily: "var(--font-heading)" }}>EMP</span>
              <span className="text-muted-foreground" style={{ fontSize: 9.5, letterSpacing: "0.04em", fontFamily: "var(--font-body)" }}>
                Monitoring &amp; Reporting
              </span>
            </div>
          </div>

        </div>

        {/* Right side */}
        <div className="flex items-center gap-1">
          {/* Theme picker */}
          <Btn ref={pickerBtnRef} variant="icon" size="md" title="Switch theme"
            onClick={() => { setPickerOpen((o) => !o); setUserMenuOpen(false); }}
          >
            <PaletteOutlinedIcon style={{ fontSize: 20 }} />
          </Btn>

          {/* Notification bell */}
          <Btn variant="icon" size="md" className="relative" title="Notifications"
            onClick={() => { setNotifOpen(true); setPickerOpen(false); setUserMenuOpen(false); }}
          >
            <NotificationsNoneOutlinedIcon style={{ fontSize: 20 }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 pointer-events-none" />
          </Btn>

          {/* User chip */}
          <Btn ref={userBtnRef} variant="ghost" size="md" className="gap-2 pl-2 pr-2 sm:pr-3"
            onClick={() => { setUserMenuOpen((o) => !o); setPickerOpen(false); }}
          >
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0"
              style={{ fontSize: 11, fontWeight: 600 }}>
              NJ
            </div>
            <div className="hidden sm:flex flex-col text-left" style={{ lineHeight: 1.3 }}>
              <span className="text-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Nitin Jaryal</span>
              <span className="text-muted-foreground" style={{ fontSize: 11 }}>Administrator</span>
            </div>
            {userMenuOpen
              ? <KeyboardArrowUpIcon style={{ fontSize: 16 }} className="text-muted-foreground hidden sm:block" />
              : <KeyboardArrowDownIcon style={{ fontSize: 16 }} className="text-muted-foreground hidden sm:block" />
            }
          </Btn>
        </div>
      </header>

      <ThemePicker anchorEl={pickerBtnRef.current} open={pickerOpen} onClose={() => setPickerOpen(false)} />
      <UserMenu    anchorEl={userBtnRef.current}   open={userMenuOpen} onClose={() => setUserMenuOpen(false)} />
      <NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
}
