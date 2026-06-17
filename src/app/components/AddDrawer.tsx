import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Btn } from "./ui/Btn";
import { ResourcePreviewPanel } from "./ResourcePreviewPanel";
import { getDataBySource } from "./dataSourceSchemas";

const resourceTypes = [
  { label: "ITSM" },
  { label: "HR" },
  { label: "Contact Center" },
  { label: "Workplace" },
];

const floors = ["Space Utilization", "Employee Satisfaction", "Energy Efficiency", "Booking Rate", "Active Employees"];

const emptyForm = {
  name: "",
  company: "",
  floor: "",
  capacity: "",
  status: "Small",
  aiAnalysisEnabled: "",
  notes: "",
};

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    fontSize: 13,
    borderRadius: "8px",
    backgroundColor: "var(--input-background)",
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary)" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary)", borderWidth: "1.5px" },
    "&.Mui-focused": { backgroundColor: "var(--card)" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--primary)" },
  "& .MuiInputLabel-root": { fontSize: 13 },
};

interface AddDrawerProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: Record<string, string>) => void;
  initialData?: Record<string, string>;
}

export function AddDrawer({ open, onClose, onAdd, initialData }: AddDrawerProps) {
  const isEdit = !!initialData;

  const [selectedType, setSelectedType] = useState("");
  const [selectedDataSource, setSelectedDataSource] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (initialData) {
      setForm({
        name: initialData.name || "",
        company: initialData.company || "",
        floor: initialData.floor || "",
        capacity: initialData.capacity || "",
        status: initialData.status || "Small",
        aiAnalysisEnabled: initialData.aiAnalysisEnabled || "",
        notes: initialData.notes || "",
      });
      setSelectedType(initialData.type || "");
      const sourceData = initialData.floor ? getDataBySource(initialData.floor) : null;
      setSelectedDataSource(sourceData);
      setPreviewOpen(!!sourceData);
    } else {
      setForm(emptyForm);
      setSelectedType("");
      setSelectedDataSource(null);
      setPreviewOpen(false);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedType || !form.name) return;
    onAdd({ type: selectedType, ...form });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedType("");
      setSelectedDataSource(null);
      setPreviewOpen(false);
      setForm(emptyForm);
      onClose();
    }, 1500);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Preview Panel + Drawer Container */}
      <div
        className={`fixed top-0 right-0 h-full z-50 flex transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Preview Panel */}
        <div
          className={`transition-all duration-300 ease-out overflow-hidden h-full ${
            selectedDataSource && previewOpen ? "w-[420px]" : "w-0"
          }`}
        >
          <ResourcePreviewPanel
            dataSource={selectedDataSource}
            sourceName={form.floor}
            widgetSize={form.status}
            onWidgetSizeChange={size => setForm(f => ({ ...f, status: size }))}
          />
        </div>

        {/* Toggle button */}
        {selectedDataSource && (
          <div className="relative flex items-center">
            <Btn
              variant="icon"
              size="sm"
              type="button"
              onClick={() => setPreviewOpen(v => !v)}
              className="absolute left-0 -translate-x-1/2 z-10 w-6 h-12 border border-border bg-card shadow-md"
              style={{ borderRadius: "999px" }}
            >
              {previewOpen
                ? <ChevronRightIcon style={{ fontSize: 16 }} />
                : <ChevronLeftIcon style={{ fontSize: 16 }} />
              }
            </Btn>
          </div>
        )}

        {/* Drawer */}
        <div className="w-[420px] shadow-2xl flex flex-col h-full" style={{ backgroundColor: "var(--card)" }}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h2 className="text-foreground" style={{ fontSize: 17, fontWeight: 600 }}>
                {isEdit ? "Edit Resource" : "Add Resource"}
              </h2>
              <p className="text-muted-foreground" style={{ fontSize: 12 }}>
                {isEdit ? "Update workplace resource details" : "Register a new workplace resource"}
              </p>
            </div>
            <Btn variant="icon" size="sm" onClick={onClose} type="button">
              <CloseIcon style={{ fontSize: 18 }} />
            </Btn>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
            {submitted ? (
              <div className="flex flex-col items-center justify-center flex-1 gap-3">
                <CheckCircleOutlineIcon style={{ fontSize: 52, color: "var(--status-success-fg)" }} />
                <p className="text-foreground" style={{ fontSize: 15, fontWeight: 500 }}>
                  {isEdit ? "Changes Saved!" : "Resource Added!"}
                </p>
                <p className="text-muted-foreground" style={{ fontSize: 13 }}>Closing drawer…</p>
              </div>
            ) : (
              <form id="resource-form" onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Name */}
                <TextField
                  required
                  label="Name"
                  size="small"
                  fullWidth
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Enter Name"
                  sx={fieldSx}
                />

                {/* Resource Type */}
                <div className="flex flex-col gap-2">
                  <span className="text-muted-foreground" style={{ fontSize: 12 }}>Resource Type *</span>
                  <div className="grid grid-cols-2 gap-2">
                    {resourceTypes.map(({ label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedType(label)}
                        className={`px-3 py-2 rounded-lg border-2 transition-all text-left`}
                        style={{
                          borderColor: selectedType === label ? "var(--primary)" : "var(--border)",
                          backgroundColor: selectedType === label ? "var(--primary-container)" : "var(--input-background)",
                        }}
                      >
                        <span style={{ fontSize: 12, fontWeight: 500, color: selectedType === label ? "var(--on-primary-container)" : "var(--muted-foreground)" }}>
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Data Source */}
                <FormControl size="small" fullWidth sx={fieldSx}>
                  <InputLabel>Data Source</InputLabel>
                  <Select
                    label="Data Source"
                    value={form.floor}
                    onChange={e => {
                      const sourceName = e.target.value;
                      setForm(f => ({ ...f, floor: sourceName, status: "Small" }));
                      const sourceData = getDataBySource(sourceName);
                      setSelectedDataSource(sourceData);
                      setPreviewOpen(!!sourceData);
                    }}
                    sx={{ fontSize: 13, borderRadius: "8px" }}
                  >
                    <MenuItem value=""><em style={{ fontSize: 13, color: "#9ca3af" }}>Choose an option</em></MenuItem>
                    {floors.map(f => (
                      <MenuItem key={f} value={f} sx={{ fontSize: 13 }}>{f}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Dashboard Widget Configuration */}
                {selectedDataSource && (
                  <div className="flex flex-col gap-2">
                    <span className="text-muted-foreground" style={{ fontSize: 12 }}>Dashboard Widget Size</span>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {([
                        { value: "Compact", grid: "2×2",  desc: "KPI / status" },
                        { value: "Small",   grid: "4×3",  desc: "Informational" },
                        { value: "Medium",  grid: "6×4",  desc: "Chart view" },
                        { value: "Large",   grid: "8×5",  desc: "Table · Analytics" },
                        { value: "XLarge",  grid: "12×6", desc: "Table · Full detail" },
                      ] as const).map(({ value, grid, desc }, idx, arr) => {
                        const selected = form.status === value;
                        const isLast = idx === arr.length - 1;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setForm(f => ({ ...f, status: value }))}
                            style={{
                              gridColumn: isLast ? "span 2" : undefined,
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "8px 10px",
                              borderRadius: 10,
                              border: selected ? `1.5px solid var(--primary)` : `1.5px solid var(--border)`,
                              background: selected ? "var(--primary-container)" : "var(--input-background)",
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "all 0.15s",
                            }}
                          >
                            <div style={{
                              flexShrink: 0,
                              width: 34, height: 22,
                              borderRadius: 5,
                              background: selected ? "var(--primary)" : "var(--muted)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                              <span style={{ fontSize: 8, fontWeight: 700, color: selected ? "var(--primary-foreground)" : "var(--muted-foreground)" }}>
                                {grid}
                              </span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 11, fontWeight: selected ? 600 : 500, color: selected ? "var(--on-primary-container)" : "var(--foreground)" }}>
                                {value === "XLarge" ? "X Large" : value}
                              </div>
                              <div style={{ fontSize: 10, color: "var(--muted-foreground)", marginTop: 1 }}>{desc}</div>
                            </div>
                            {selected && (
                              <div style={{
                                width: 14, height: 14, borderRadius: "50%",
                                background: "var(--primary)", flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}>
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                  <path d="M1.5 4l1.8 1.8L6.5 2" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Organization */}
                <TextField
                  label="Organization"
                  size="small"
                  fullWidth
                  value={form.company}
                  onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  placeholder="Customer Account"
                  sx={fieldSx}
                />

                {/* Notes */}
                <TextField
                  label="Notes"
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="Any additional details…"
                  sx={{
                    ...fieldSx,
                    "& .MuiOutlinedInput-root": {
                      ...fieldSx["& .MuiOutlinedInput-root"],
                      resize: "none",
                    },
                  }}
                />

              </form>
            )}
          </div>

          {/* Sticky footer */}
          {!submitted && (
            <div className="px-6 py-4 border-t border-border flex gap-3" style={{ backgroundColor: "var(--card)" }}>
              <Btn variant="outlined" size="md" fullWidth type="button" onClick={onClose}>
                Cancel
              </Btn>
              <Btn variant="filled" size="md" fullWidth type="submit" form="resource-form">
                {isEdit ? "Save Changes" : "Add Resource"}
              </Btn>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
