import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

/* ── Types ───────────────────────────────────────────────── */
type NotifType = "error" | "ai" | "warning" | "info";
type FilterTab = "all" | "unread" | "customer" | "security";

interface Notif {
  id: number;
  type: NotifType;
  title: string;
  description: string;
  category: string;
  time: string;
  unread: boolean;
  actions?: boolean;
}

/* ── Mock data ───────────────────────────────────────────── */
const NOTIFS: Notif[] = [
  { id: 1, type: "error",   title: "Critical Security Alert",           description: "Suspicious login attempts detected from IP 192.168.45.23. Automatic lockout initiated.", category: "Security",              time: "3h ago", unread: true,  actions: true  },
  { id: 2, type: "ai",      title: "AiVA Agent: Network Issue Resolved", description: "I detected port 8080 was down on server PROD-WEB-03 and automatically redirected traffic to the backup node.", category: "aiva-agent", time: "3h ago", unread: true  },
  { id: 3, type: "warning", title: "Cloud Spend Alert",                 description: "AWS spending 23% over budget for December. Review auto-scaling policies.",               category: "Cloud",                 time: "3h ago", unread: true,  actions: true  },
  { id: 4, type: "warning", title: "Network Performance Degradation",   description: "Branch office Seattle experiencing 15% packet loss. ISP ticket opened.",                 category: "Connectivity",          time: "4h ago", unread: true  },
  { id: 5, type: "info",    title: "Office Capacity Alert",             description: "Building A at 78% capacity. Consider booking alternative workspace.",                    category: "Intelligent Workplace", time: "5h ago", unread: true  },
];

const TABS: { key: FilterTab; label: string; count?: number }[] = [
  { key: "all",      label: "All"      },
  { key: "unread",   label: "Unread",   count: 6 },
  { key: "customer", label: "Customer", count: 2 },
  { key: "security", label: "Security", count: 2 },
];

/* ── Icon config ─────────────────────────────────────────── */
const iconConfig: Record<NotifType, { icon: React.ComponentType<{ style?: React.CSSProperties }>; iconColor: string; bg: string }> = {
  error:   { icon: ErrorOutlineIcon,          iconColor: "#EF4444", bg: "#FEE2E2" },
  ai:      { icon: AutoAwesomeIcon,           iconColor: "#3B82F6", bg: "#DBEAFE" },
  warning: { icon: WarningAmberOutlinedIcon,  iconColor: "#F59E0B", bg: "#FEF3C7" },
  info:    { icon: InfoOutlinedIcon,          iconColor: "#6366F1", bg: "#EDE9FE" },
};

/* ── Single notification row ─────────────────────────────── */
function NotifRow({ notif, onDismiss }: { notif: Notif; onDismiss: (id: number) => void }) {
  const cfg = iconConfig[notif.type];
  const Icon = cfg.icon;

  return (
    <div style={{
      padding: "16px 20px",
      borderBottom: "1px solid var(--border)",
      display: "flex", gap: 12, alignItems: "flex-start",
      position: "relative",
    }}>
      {/* Unread dot */}
      {notif.unread && (
        <div style={{
          position: "absolute", left: 6, top: 22,
          width: 7, height: 7, borderRadius: "50%",
          backgroundColor: "var(--primary)",
        }} />
      )}

      {/* Type icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        backgroundColor: cfg.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon style={{ fontSize: 20, color: cfg.iconColor }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.3 }}>
            {notif.title}
          </span>
          <span style={{ fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", flexShrink: 0, whiteSpace: "nowrap" }}>
            {notif.time}
          </span>
        </div>

        <p style={{ fontSize: 13, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", lineHeight: 1.5, margin: "0 0 8px" }}>
          {notif.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <ChatBubbleOutlineIcon style={{ fontSize: 12, color: "var(--muted-foreground)" }} />
            <span style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>
              {notif.category}
            </span>
          </div>

          {notif.actions && (
            <div style={{ display: "flex", gap: 6 }}>
              <button
                type="button"
                style={{
                  padding: "5px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 600,
                  backgroundColor: "#166534", color: "#ffffff",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View Details
              </button>
              <button
                type="button"
                onClick={() => onDismiss(notif.id)}
                style={{
                  padding: "5px 12px", borderRadius: 8, cursor: "pointer",
                  fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 600,
                  backgroundColor: "transparent", color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Notification Drawer ─────────────────────────────────── */
export function NotificationDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [items, setItems]         = useState<Notif[]>(NOTIFS);

  const unreadCount = items.filter((n) => n.unread).length;

  const dismiss = (id: number) => setItems((prev) => prev.filter((n) => n.id !== id));
  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 1200, backgroundColor: "rgba(0,0,0,0.25)" }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 1300,
        width: 420,
        backgroundColor: "var(--card)",
        boxShadow: "-8px 0 32px rgba(0,0,0,0.16)",
        display: "flex", flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 20px 14px",
          borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--foreground)" }}>
              Notifications
            </span>
            {unreadCount > 0 && (
              <span style={{
                fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 700,
                backgroundColor: "#EF4444", color: "#ffffff",
                borderRadius: 20, padding: "2px 10px",
              }}>
                {unreadCount} new
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button type="button" style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--muted)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <TuneOutlinedIcon style={{ fontSize: 20, color: "var(--muted-foreground)" }} />
            </button>
            <button type="button" onClick={onClose} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer", backgroundColor: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--muted)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <CloseIcon style={{ fontSize: 20, color: "var(--muted-foreground)" }} />
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: "flex", gap: 6, padding: "12px 16px",
          borderBottom: "1px solid var(--border)", flexShrink: 0,
          overflowX: "auto", scrollbarWidth: "none",
        }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                  padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                  fontSize: 13, fontFamily: "var(--font-body)", fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? "var(--foreground)" : "transparent",
                  color: isActive ? "var(--card)" : "var(--foreground)",
                  border: isActive ? "none" : "1px solid var(--border)",
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
                {tab.count != null && (
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    backgroundColor: isActive ? "rgba(255,255,255,0.25)" : "#FF6900",
                    color: isActive ? "var(--card)" : "#ffffff",
                    borderRadius: 10, padding: "0 6px", lineHeight: "18px",
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Notification list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{
            padding: "10px 20px 6px",
            fontSize: 11, fontFamily: "var(--font-heading)", fontWeight: 700,
            color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em",
          }}>
            Today
          </div>
          {items.map((notif) => (
            <NotifRow key={notif.id} notif={notif} onDismiss={dismiss} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 20px",
          borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "center",
          flexShrink: 0,
        }}>
          <button
            type="button"
            onClick={markAllRead}
            style={{
              fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 600,
              color: "var(--primary)", backgroundColor: "transparent", border: "none", cursor: "pointer",
            }}
          >
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
}
