import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"
import {
  FileText,
  FolderGit2,
  LayoutDashboard,
  Mail,
  Menu,
  Monitor,
  Moon,
  Search,
  Sun,
} from "lucide-react"

import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from "@/components/brand-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { allSkills, contact, education, experience, profile, projects } from "@/data/resume"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/contact", label: "Contact", icon: Mail },
]

const socials = [
  { label: "GitHub", href: contact.github.href, icon: GithubIcon },
  { label: "LinkedIn", href: contact.linkedin.href, icon: LinkedinIcon },
  { label: "WhatsApp", href: contact.whatsappHref, icon: WhatsappIcon },
  { label: "Instagram", href: contact.instagram.href, icon: InstagramIcon },
]

/* ---------- Logo ---------- */
export function Logo({ className }: { className?: string }) {
  return (
    <NavLink to="/" className={cn("flex items-center gap-2.5 rounded-lg", className)} aria-label={`${profile.name}, overview`}>
      <span className="grid size-8 place-items-center rounded-lg bg-[#142238] text-[13px] font-semibold tracking-wide text-white shadow-sm ring-1 ring-black/5 dark:bg-[#184f90]">
        {profile.initials}
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-navy">{profile.name}</span>
    </NavLink>
  )
}

/* ---------- Navigation list (shared by sidebar + sheet) ---------- */
/* Horizontal links for the navbar (desktop) */
function NavbarLinks() {
  return (
    <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
      {navItems.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              "inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              isActive && "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

/* Vertical list for the mobile slide-in menu */
function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Main" className="flex flex-col gap-1">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "group flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              isActive && "bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
            )
          }
        >
          <Icon className="size-4" aria-hidden />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

function MobileMenuBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="px-1 pt-1">
        <Logo />
      </div>
      <div className="space-y-2">
        <p className="px-3 text-xs font-medium text-muted-foreground">Menu</p>
        <NavList onNavigate={onNavigate} />
      </div>

      <div className="mt-auto space-y-4">
        <div className="rounded-xl border bg-card p-4 shadow-xs">
          <p className="text-sm font-medium text-navy">Open to</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Feel free to reach out for {profile.availability}.
          </p>
          <Button asChild size="sm" className="mt-3 w-full">
            <NavLink to="/contact" onClick={onNavigate}>
              Get in touch
            </NavLink>
          </Button>
        </div>
        <Separator />
        <div className="flex items-center gap-1 px-1">
          {socials.map(({ label, href, icon: Icon }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="size-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Search ---------- */
type SearchItem = { label: string; hint: string; to: string; section?: string }

function useSearchIndex(): SearchItem[] {
  return useMemo(
    () => [
      ...navItems.map((n) => ({ label: n.label, hint: "Page", to: n.to })),
      ...experience.map((e) => ({ label: `${e.role} · ${e.org}`, hint: "Experience", to: "/resume", section: "experience" })),
      ...education.map((e) => ({ label: `${e.degree} · ${e.school}`, hint: "Education", to: "/resume", section: "education" })),
      ...allSkills.map((s) => ({ label: s, hint: "Skill", to: "/resume", section: "skills" })),
      ...projects.map((p) => ({ label: p.name, hint: "Project", to: "/projects", section: p.slug })),
      { label: contact.email, hint: "Email", to: "/contact" },
    ],
    []
  )
}

function SearchDialog() {
  const index = useSearchIndex()
  const navigate = useNavigate()
  const listId = useId()
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return index.filter((i) => i.hint === "Page" || i.hint === "Project").slice(0, 8)
    return index.filter((i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)).slice(0, 10)
  }, [index, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]")
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const onOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      setQuery("")
      setActive(0)
    }
  }

  const go = (item: SearchItem) => {
    onOpenChange(false)
    navigate(item.to, { state: item.section ? { section: item.section } : undefined })
  }

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" })
  }, [active, listId])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Search">
              <Search className="size-4" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Search</TooltipContent>
      </Tooltip>

      <DialogContent showCloseButton={false} className="top-[15%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Search the resume</DialogTitle>
        <DialogDescription className="sr-only">
          Search pages, experience, education, skills and projects.
        </DialogDescription>

        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="Search the resume"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            autoComplete="off"
            autoFocus
            placeholder="Search skills, roles, projects…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, results.length - 1))
              } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              } else if (e.key === "Enter" && results[active]) {
                e.preventDefault()
                go(results[active])
              }
            }}
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
          <div className="flex items-center justify-between px-3 pt-1 pb-2">
            <p className="text-xs font-medium text-muted-foreground">{query.trim() ? "Results" : "Suggestions"}</p>
            <button
                type="button"
                className="rounded-sm text-xs font-medium text-brand hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                onClick={() => {
                  setQuery("")
                  setActive(0)
                  inputRef.current?.focus()
                }}
              >
                Clear all
              </button>
          </div>
          {results.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-muted-foreground">No results for “{query}”</p>
          ) : (
            <ul id={listId} role="listbox" aria-label="Search results">
              {results.map((r, i) => (
                <li
                  key={`${r.hint}-${r.label}`}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(r)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm",
                    i === active && "bg-accent text-accent-foreground"
                  )}
                >
                  <span className="truncate">{r.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* ---------- Theme menu ---------- */
function ThemeMenu() {
  const { theme, setTheme } = useTheme()
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Change theme">
              <Sun className="size-4 dark:hidden" />
              <Moon className="hidden size-4 dark:block" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Theme</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light">
            <Sun /> Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon /> Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">
            <Monitor /> System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ---------- Shell ---------- */
export function AppShell({ children }: { children?: ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const location = useLocation()

  // Scroll to a requested section (from search), otherwise to the top.
  useEffect(() => {
    setSheetOpen(false)
    const section = (location.state as { section?: string } | null)?.section
    if (section) {
      requestAnimationFrame(() =>
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" })
      )
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [location])

  return (
    <div className="min-h-svh bg-background">
      <a
        href="#content"
        className="sr-only z-[60] rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <div>
        {/* Navbar */}
        <header className="no-print sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
          <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-background p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>Pages of Elvis SHIMWA's resume</SheetDescription>
                </SheetHeader>
                <MobileMenuBody onNavigate={() => setSheetOpen(false)} />
              </SheetContent>
            </Sheet>

            <Logo className="shrink-0" />

            <NavbarLinks />

            <div className="ml-auto flex items-center gap-2">
              <SearchDialog />
              <ThemeMenu />
            </div>
          </div>
        </header>

        <main id="content" className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto w-full max-w-6xl">{children ?? <Outlet />}</div>
        </main>

        <footer className="no-print border-t px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © <span className="tabular-nums">{new Date().getFullYear()}</span> {profile.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a href={contact.phoneHref} className="tabular-nums hover:text-foreground">
                {contact.phoneShort}
              </a>
              <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                {contact.email}
              </a>
              <div className="flex items-center gap-0.5">
                {socials.map(({ label, href, icon: Icon }) => (
                  <Button key={label} asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                      <Icon className="size-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
