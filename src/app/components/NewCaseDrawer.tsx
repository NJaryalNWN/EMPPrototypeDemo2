import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { Btn } from "./ui/Btn";

const fieldSx = {
  width: "100%",
  padding: "10px 12px",
  fontSize: 13,
  fontFamily: "var(--font-body)",
  color: "var(--foreground)",
  backgroundColor: "var(--input-background, #F4F7FC)",
  border: "1.5px solid var(--border)",
  borderRadius: 8,
  outline: "none",
  transition: "border-color 0.15s",
  resize: "none" as const,
} as React.CSSProperties;

const CATEGORIES = ["Network", "Security", "Cloud", "Workplace", "Contact Center", "Unified Communications", "Devices", "Other"];
const PRIORITIES: { label: string; color: string; bg: string }[] = [
  { label: "Low",      color: "#16A34A", bg: "#DCFCE7" },
  { label: "Medium",   color: "#D97706", bg: "#FEF3C7" },
  { label: "High",     color: "#EA580C", bg: "#FFEDD5" },
  { label: "Critical", color: "#DC2626", bg: "#FEE2E2" },
];

interface NewCaseDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function NewCaseDrawer({ open, onClose }: NewCaseDrawerProps) {
  const [subject,     setSubject]     = useState("");
  const [category,    setCategory]    = useState("");
  const [priority,    setPriority]    = useState("Medium");
  const [description, setDescription] = useState("");
  const [submitted,   setSubmitted]   = useState(false);

  function reset() {
    setSubject(""); setCategory(""); setPriority("Medium"); setDescription("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject || !category || !description) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
      onClose();
    }, 2000);
  }

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9990] bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-[9991] flex flex-col w-[480px] shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--foreground)" }}>
                Open a New Case
              </h2>
              <p style={{ margin: "4px 0 0", fontSize: 12, fontFamily: "var(--font-body)", color: "var(--muted-foreground)" }}>
                Our support team typically responds within 2 hours
              </p>
            </div>
            <Btn variant="icon" size="sm" onClick={handleClose} type="button">
              <CloseIcon style={{ fontSize: 18 }} />
            </Btn>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12 }}>
              <CheckCircleOutlineIcon style={{ fontSize: 56, color: "#16A34A" }} />
              <p style={{ fontSize: 17, fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>
                Case Submitted!
              </p>
              <p style={{ fontSize: 13, color: "var(--muted-foreground)", margin: 0 }}>
                You'll receive a confirmation email shortly.
              </p>
            </div>
          ) : (
            <form id="new-case-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Subject */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-body)" }}>
                  Subject <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <input
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief summary of the issue"
                  style={fieldSx}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
                />
              </div>

              {/* Category */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-body)" }}>
                  Category <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      style={{
                        padding: "9px 12px",
                        borderRadius: 8,
                        border: category === c ? "1.5px solid var(--primary)" : "1.5px solid var(--border)",
                        backgroundColor: category === c ? "var(--sidebar-active-container, #D6E5FF)" : "var(--input-background, #F4F7FC)",
                        cursor: "pointer",
                        textAlign: "left",
                        fontSize: 12,
                        fontFamily: "var(--font-body)",
                        fontWeight: category === c ? 600 : 400,
                        color: category === c ? "var(--sidebar-active-fg, #001A3D)" : "var(--foreground)",
                        transition: "all 0.12s",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-body)" }}>
                  Priority
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setPriority(p.label)}
                      style={{
                        flex: 1,
                        padding: "8px 4px",
                        borderRadius: 20,
                        border: priority === p.label ? `1.5px solid ${p.color}` : "1.5px solid var(--border)",
                        backgroundColor: priority === p.label ? p.bg : "var(--input-background, #F4F7FC)",
                        cursor: "pointer",
                        fontSize: 11,
                        fontFamily: "var(--font-body)",
                        fontWeight: priority === p.label ? 700 : 500,
                        color: priority === p.label ? p.color : "var(--muted-foreground)",
                        transition: "all 0.12s",
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-body)" }}>
                  Description <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail — steps to reproduce, error messages, affected systems…"
                  style={{ ...fieldSx }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
                />
              </div>

              {/* Attachment hint */}
              <button
                type="button"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "10px 14px", borderRadius: 8,
                  border: "1.5px dashed var(--border)",
                  backgroundColor: "transparent", cursor: "pointer",
                  color: "var(--muted-foreground)", fontSize: 12,
                  fontFamily: "var(--font-body)",
                  transition: "border-color 0.12s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted-foreground)"; }}
              >
                <AttachFileOutlinedIcon style={{ fontSize: 16 }} />
                Add attachment (screenshots, logs…)
              </button>

            </form>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", flexShrink: 0, display: "flex", gap: 12, backgroundColor: "var(--card)" }}>
            <Btn variant="outlined" size="md" fullWidth type="button" onClick={handleClose}>
              Cancel
            </Btn>
            <Btn variant="filled" size="md" fullWidth type="submit" form="new-case-form">
              Submit Case
            </Btn>
          </div>
        )}
      </div>
    </>
  );
}
