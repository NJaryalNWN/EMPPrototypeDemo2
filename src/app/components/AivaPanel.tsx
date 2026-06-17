import { useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendIcon from "@mui/icons-material/Send";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";

interface Message {
  id: number;
  role: "user" | "aiva";
  text: string;
}

const SUGGESTIONS = [
  "Summarize today's tickets",
  "Show high-risk anomalies",
  "What's my meeting room usage?",
  "Top 3 insights this week",
];

let msgId = 0;

interface AivaPanelProps {
  open: boolean;
  onClose: () => void;
}

export function AivaPanel({ open, onClose }: AivaPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: ++msgId,
      role: "aiva",
      text: "Hi! I'm Aiva, your AI assistant. Ask me anything about your workspace, tickets, or reports.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: ++msgId, role: "user", text: trimmed }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: ++msgId,
          role: "aiva",
          text: `I received your message: "${trimmed}". In a live integration I'd pull real data from your connected sources and give you an actionable answer here.`,
        },
      ]);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] transition-opacity duration-200"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <aside
        className="fixed top-0 right-0 h-full z-40 flex flex-col transition-transform duration-300 ease-out"
        style={{
          width: 380,
          backgroundColor: "var(--card)",
          borderLeft: "1px solid var(--border)",
          boxShadow: open ? "-8px 0 32px rgba(0,0,0,0.12)" : "none",
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
        aria-label="Aiva AI assistant"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <AutoAwesomeIcon style={{ fontSize: 16, color: "var(--primary-foreground)" }} />
            </div>
            <div>
              <p className="text-foreground font-semibold" style={{ fontSize: 14, lineHeight: 1.2 }}>Aiva</p>
              <p className="text-muted-foreground" style={{ fontSize: 11 }}>AI Support Assistant</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors border-0 bg-transparent cursor-pointer"
            aria-label="Close Aiva"
          >
            <CloseIcon style={{ fontSize: 18, color: "var(--muted-foreground)" }} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "aiva" && (
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center mr-2 mt-0.5 flex-shrink-0"
                  style={{ backgroundColor: "var(--primary-container)" }}
                >
                  <AutoAwesomeIcon style={{ fontSize: 12, color: "var(--primary)" }} />
                </div>
              )}
              <div
                className="max-w-[75%] px-3 py-2.5 rounded-2xl leading-relaxed"
                style={{
                  fontSize: 13,
                  backgroundColor:
                    msg.role === "user" ? "var(--primary)" : "var(--muted)",
                  color:
                    msg.role === "user" ? "var(--primary-foreground)" : "var(--foreground)",
                  borderRadius:
                    msg.role === "user"
                      ? "1rem 1rem 0.25rem 1rem"
                      : "1rem 1rem 1rem 0.25rem",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="px-3 py-1.5 rounded-full border cursor-pointer transition-colors hover:bg-muted bg-transparent"
                style={{
                  fontSize: 11,
                  color: "var(--primary)",
                  borderColor: "var(--primary)",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div
          className="px-4 py-3 flex-shrink-0 border-t flex items-center gap-2"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full border-0 bg-transparent cursor-pointer hover:bg-muted transition-colors flex-shrink-0"
            aria-label="Voice input"
          >
            <MicNoneOutlinedIcon style={{ fontSize: 18, color: "var(--muted-foreground)" }} />
          </button>
          <input
            type="text"
            placeholder="Ask Aiva anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground"
            style={{ fontSize: 13 }}
          />
          <button
            type="button"
            onClick={() => send(input)}
            disabled={!input.trim()}
            className="w-8 h-8 flex items-center justify-center rounded-full border-0 cursor-pointer transition-all flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: input.trim() ? "var(--primary)" : "var(--muted)" }}
            aria-label="Send"
          >
            <SendIcon style={{ fontSize: 15, color: input.trim() ? "var(--primary-foreground)" : "var(--muted-foreground)" }} />
          </button>
        </div>
      </aside>
    </>
  );
}
