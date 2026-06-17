import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import nwnLogo from "../../imports/nwn-logo.png";
import { useTheme, type Theme } from "../context/ThemeContext";
import { Btn } from "./ui/Btn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const themes: { value: Theme; label: string; swatch: string }[] = [
  { value: "light", label: "Light",  swatch: "#002855" },
  { value: "dark",  label: "Dark",   swatch: "#A8C8FF" },
  { value: "ocean", label: "Ocean",  swatch: "#0061A4" },
  { value: "warm",  label: "Warm",   swatch: "#8B3A00" },
];

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0 transition-colors duration-200">
      {/* NWN Logo + title */}
      <div className="flex items-center gap-3">
        <img
          src={nwnLogo}
          alt="NWN"
          className="h-8 w-auto transition-[filter] duration-200"
          style={theme === "dark" ? { filter: "brightness(0) invert(1)" } : undefined}
        />
        <div className="hidden sm:flex items-center gap-3">
          <span className="w-px h-5 bg-border" />
          <div className="flex flex-col" style={{ lineHeight: 1.25 }}>
            <span className="text-foreground font-semibold tracking-tight" style={{ fontSize: 15, fontFamily: "var(--font-heading)" }}>EMP</span>
            <span className="text-muted-foreground" style={{ fontSize: 10, letterSpacing: "0.04em", fontFamily: "var(--font-body)" }}>
              Monitoring &amp; Reporting
            </span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        {/* Theme switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Btn variant="icon" size="md" title="Switch theme">
              <PaletteOutlinedIcon style={{ fontSize: 20 }} />
            </Btn>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themes.map((t) => (
              <DropdownMenuItem
                key={t.value}
                onClick={() => setTheme(t.value)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-border flex-shrink-0"
                  style={{ backgroundColor: t.swatch }}
                />
                <span className="flex-1">{t.label}</span>
                {theme === t.value && (
                  <CheckIcon style={{ fontSize: 14 }} className="text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notification bell */}
        <Btn variant="icon" size="md" className="relative" title="Notifications">
          <NotificationsNoneOutlinedIcon style={{ fontSize: 20 }} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 pointer-events-none" />
        </Btn>

        {/* User chip */}
        <Btn variant="ghost" size="md" className="gap-2 pl-2 pr-2 sm:pr-3">
          <div
            className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0"
            style={{ fontSize: 11, fontWeight: 600 }}
          >
            NJ
          </div>
          <div className="hidden sm:flex flex-col text-left" style={{ lineHeight: 1.3 }}>
            <span className="text-foreground" style={{ fontSize: 13, fontWeight: 500 }}>Nitin Jaryal</span>
            <span className="text-muted-foreground" style={{ fontSize: 11 }}>Administrator</span>
          </div>
          <KeyboardArrowDownIcon style={{ fontSize: 16 }} className="text-muted-foreground hidden sm:block" />
        </Btn>
      </div>
    </header>
  );
}
