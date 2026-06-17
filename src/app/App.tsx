import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { AivaPanel } from "./components/AivaPanel";
import { HomePage } from "./pages/HomePage";

function PageContent({ page }: { page: string }) {
  switch (page) {
    case "Home":
      return <HomePage />;
    default:
      // All other pages are stubs — active nav shows label, content coming soon
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

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [aivaOpen, setAivaOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="w-full h-screen flex flex-col overflow-hidden bg-background transition-colors duration-200">
        <Header />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <Sidebar
            activePage={activePage}
            onNav={setActivePage}
            onAiva={() => setAivaOpen(true)}
          />
          <PageContent page={activePage} />
        </div>
      </div>
      <AivaPanel open={aivaOpen} onClose={() => setAivaOpen(false)} />
    </ThemeProvider>
  );
}
