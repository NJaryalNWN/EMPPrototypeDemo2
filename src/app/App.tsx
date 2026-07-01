import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { AivaPanel } from "./components/AivaPanel";
import { HomePage, KnowledgeBasePage, ServiceCatalogPage, MyTicketsPage, ReportsPage } from "./pages/HomePage";

function PageContent({ page, pageParam, onNav }: { page: string; pageParam?: string; onNav: (p: string, param?: string) => void }) {
  switch (page) {
    case "Home":
      return <HomePage onNav={onNav} />;
    case "Knowledge Base":
      return <KnowledgeBasePage onNav={onNav} />;
    case "Service Catalog":
      return <ServiceCatalogPage onNav={onNav} />;
    case "My Cases":
      return <MyTicketsPage onNav={onNav} />;
    case "Reports":
      return <ReportsPage onNav={onNav} initialReport={pageParam} />;
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
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);
  const [aivaOpen, setAivaOpen] = useState(false);

  const navigate = (page: string, param?: string) => {
    setActivePage(page);
    setPageParam(param);
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
      <div className="w-full h-screen flex overflow-hidden bg-background transition-colors duration-200">
        {/* Sidebar spans full viewport height */}
        <Sidebar activePage={activePage} onNav={navigate} onAiva={() => setAivaOpen(true)} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <Header />
          <PageContent page={activePage} pageParam={pageParam} onNav={navigate} />
        </div>
      </div>
      <AivaPanel open={aivaOpen} onClose={() => setAivaOpen(false)} />
    </ThemeProvider>
  );
}
