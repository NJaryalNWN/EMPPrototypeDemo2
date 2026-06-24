import { useState, useEffect } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { ThemeProvider } from "./context/ThemeContext";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { AivaPanel } from "./components/AivaPanel";
import { HomePage, KnowledgeBasePage, ServiceCatalogPage, MyTicketsPage } from "./pages/HomePage";

function PageContent({ page, onNav }: { page: string; onNav: (p: string) => void }) {
  switch (page) {
    case "Home":
      return <HomePage onNav={onNav} />;
    case "Knowledge Base":
      return <KnowledgeBasePage onNav={onNav} />;
    case "Service Catalog":
      return <ServiceCatalogPage onNav={onNav} />;
    case "My Cases":
      return <MyTicketsPage onNav={onNav} />;
    default:
      return (
        <div className="flex-1 flex items-center justify-center bg-background transition-colors duration-200">
          <div className="text-center">
            <p className="text-foreground font-semibold mb-1" style={{ fontSize: 18 }}>{page}</p>
            <p className="text-muted-foreground" style={{ fontSize: 13 }}>This section is coming soon.</p>
          </div>
        </div>
      );
  }
}

function pageToSlug(page: string) {
  return page === "Home" ? "/" : `/${page.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [aivaOpen, setAivaOpen] = useState(false);

  const navigate = (page: string) => {
    setActivePage(page);
    window.history.pushState({ page }, "", pageToSlug(page));
  };

  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      if (e.state?.page) setActivePage(e.state.page);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <ThemeProvider>
      <div className="w-full h-screen flex flex-col overflow-hidden bg-background transition-colors duration-200">
        <Header />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <Sidebar
            activePage={activePage}
            onNav={navigate}
          />
          <PageContent page={activePage} onNav={navigate} />
        </div>
      </div>
      {/* Aiva FAB — fixed bottom-right */}
      <button
        type="button"
        aria-label="Open Aiva AI assistant"
        onClick={() => setAivaOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-2xl border-0 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:outline-none"
        style={{ backgroundColor: "#00a3e0" }}
      >
        <AutoAwesomeIcon style={{ fontSize: 24, color: "#ffffff" }} />
      </button>

      <AivaPanel open={aivaOpen} onClose={() => setAivaOpen(false)} />
    </ThemeProvider>
  );
}
