import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react"

// Minimal light / dark / system theme switcher. The matching inline script in
// index.html applies the class before first paint so there is no flash.

export type Theme = "light" | "dark" | "system"
type Ctx = { theme: Theme; resolvedTheme: "light" | "dark"; setTheme: (t: string) => void }

const STORAGE_KEY = "theme"
const ThemeContext = createContext<Ctx | null>(null)

function readStored(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === "light" || v === "dark" || v === "system") return v
  } catch {
    /* storage unavailable */
  }
  return "system"
}

const media = () => window.matchMedia("(prefers-color-scheme: dark)")

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStored)
  const [systemDark, setSystemDark] = useState(() => media().matches)

  useEffect(() => {
    const mq = media()
    const onChange = () => setSystemDark(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const resolvedTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", resolvedTheme === "dark")
    root.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  const setTheme = useCallback((t: string) => {
    const next: Theme = t === "light" || t === "dark" ? t : "system"
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
  }, [])

  return <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>")
  return ctx
}
