import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "warm";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem("nwn-theme") as Theme) ?? "light";
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("nwn-theme", t);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.removeAttribute("data-theme");
    root.setAttribute("data-theme", theme);
    // keep .dark class in sync for components that rely on it
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
