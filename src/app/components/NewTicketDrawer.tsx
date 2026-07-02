import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

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

export function NewTicketDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
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

  /* Section label + divider — no icons */
  const SectionHeader = ({ title, first }: { title: string; first?: boolean }) => (
    <div style={{ marginTop: first ? 20 : 0 }}>
      {!first && <div style={{ height: 1, backgroundColor: "var(--border)", margin: "24px 0" }} />}
      <span style={{
        display: "block",
        fontFamily: "var(--font-heading)", fontSize: 11, fontWeight: 700,
        color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em",
        marginBottom: 12,
      }}>
        {title}
      </span>
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
        <div className="flex-1 overflow-y-auto px-6 pb-6">

          {/* ── Contact Information ───────────────────────── */}
          <SectionHeader title="Contact Information" first />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="grid grid-cols-2" style={{ gap: 12 }}>
              <TextField label="Contact" value="Nitin Jaryal" disabled size="small" fullWidth sx={fieldSx} />
              <TextField
                label="Callback #" required size="small" fullWidth
                value={callbackPhone} onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="Enter phone number" sx={fieldSx}
              />
            </div>
            <div className="grid grid-cols-2" style={{ gap: 12 }}>
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
          <SectionHeader title="Priority & Classification" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="grid grid-cols-2" style={{ gap: 12 }}>
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
            <div className="grid grid-cols-2" style={{ gap: 12 }}>
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
          <SectionHeader title="Case Details" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <TextField
              label="Subject" required fullWidth size="small"
              value={subject} onChange={(e) => setSubject(e.target.value.slice(0, 80))}
              placeholder="Brief summary of your issue"
              helperText={`${subject.length}/80 characters`}
              sx={fieldSx}
            />
            <TextField
              label="Description" required fullWidth multiline rows={4}
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide as much detail as possible"
              sx={fieldSx}
            />
            {/* Upload */}
            <div>
              <span style={{ display: "block", fontSize: 12, fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--foreground)", marginBottom: 8 }}>
                Attachments
              </span>
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
                  borderRadius: 10, padding: "24px 20px",
                  backgroundColor: dragOver ? "var(--primary-container)" : "var(--muted)",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "var(--font-body)", color: "var(--foreground)" }}>
                  {files.length > 0 ? files.map((f) => f.name).join(", ") : "Click or drag files here"}
                </span>
                <span style={{ fontSize: 11, fontFamily: "var(--font-body)", color: "var(--muted-foreground)", marginTop: 4 }}>
                  PDF, PNG, JPG, DOC, XLS — up to 50 MB each
                </span>
              </div>
            </div>
          </div>

          {/* ── Watchlist ─────────────────────────────────── */}
          <SectionHeader title="Watchlist" />
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
              style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)", borderRadius: 9999, padding: "10px 22px", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)" }}
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
