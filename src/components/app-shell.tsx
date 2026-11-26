import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useTheme } from "@/components/theme-provider"
import {
  ArrowUpRight,
  Download,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { allSkills, contact, education, experience, profile, projects } from "@/data/resume"
import { cn } from "@/lib/utils"
import photo from "@/assets/profile.jpg"

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
    <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
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
      <div className="sm:hidden">
        <SearchBox />
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

function SearchBox() {
  const index = useSearchIndex()
  const navigate = useNavigate()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return index.filter((i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)).slice(0, 8)
  }, [index, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && e.target.closest("input, textarea, [contenteditable]")
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const go = (item: SearchItem) => {
    navigate(item.to, { state: item.section ? { section: item.section } : undefined })
    setQuery("")
    setOpen(false)
    inputRef.current?.blur()
  }

  const showList = open && query.trim().length > 0

  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <label htmlFor="global-search" className="sr-only">
        Search the resume
      </label>
      <Input
        id="global-search"
        ref={inputRef}
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && results[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        placeholder="Search skills, roles, projects…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActive(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
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
          } else if (e.key === "Escape") {
            setQuery("")
            setOpen(false)
          }
        }}
        className="h-9 bg-background pr-12 pl-9 shadow-xs [&::-webkit-search-cancel-button]:hidden"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded-md border bg-muted px-1.5 py-0.5 font-sans text-[11px] text-muted-foreground sm:block">
        Ctrl K
      </kbd>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95"
        >
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">No results for “{query}”</li>
          ) : (
            results.map((r, i) => (
              <li
                key={`${r.hint}-${r.label}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm",
                  i === active && "bg-accent"
                )}
              >
                <span className="truncate">{r.label}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{r.hint}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
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

/* ---------- Profile menu ---------- */
function ProfileMenu() {
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 gap-2 rounded-full pr-1 pl-1 sm:pr-3" aria-label="Profile menu">
          <Avatar className="size-7">
            <AvatarImage src={photo} alt="" className="object-cover" />
            <AvatarFallback>{profile.initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-navy md:inline">Elvis</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium text-foreground">{profile.name}</p>
          <p className="truncate text-xs text-muted-foreground">{contact.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => navigate("/resume", { state: { print: true } })}>
            <Download /> Download resume (PDF)
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => navigate("/contact")}>
            <Mail /> Contact
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {socials.slice(0, 2).map(({ label, href, icon: Icon }) => (
            <DropdownMenuItem key={label} asChild>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon /> {label}
                <ArrowUpRight className="ml-auto text-muted-foreground" />
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ---------- Shell ---------- */
export function AppShell({ children }: { children?: ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

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
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
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

            <div className="hidden min-w-0 flex-1 justify-end sm:flex lg:max-w-xs lg:ml-auto">
              <SearchBox />
            </div>

            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-9 xl:inline-flex"
                onClick={() => navigate("/resume", { state: { print: true } })}
              >
                <Download className="size-4" /> Resume PDF
              </Button>
              <ThemeMenu />
              <ProfileMenu />
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
