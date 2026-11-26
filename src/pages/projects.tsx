import { useState } from "react"
import {
  ArrowUpRight,
  BellRing,
  Calculator,
  ExternalLink,
  Files,
  Gamepad2,
  HeartPulse,
  Maximize2,
  ReceiptText,
  ShoppingBag,
  UtensilsCrossed,
  WalletCards,
} from "lucide-react"

import { GithubIcon } from "@/components/brand-icons"
import { PageHeader, Reveal } from "@/components/reveal"
import { StatusBadge } from "@/components/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { projects, type Project, type ProjectLink } from "@/data/resume"

const icons: Record<string, typeof Calculator> = {
  vouchify: ReceiptText,
  chars: HeartPulse,
  "smart-file-convert": Files,
  sokopop: ShoppingBag,
  "food-del": UtensilsCrossed,
  "e-wallet": WalletCards,
  "snake-game": Gamepad2,
  "grade-calculator": Calculator,
  "submission-reminder-app": BellRing,
}

function LinkIcon({ link }: { link: ProjectLink }) {
  return link.type === "code" ? <GithubIcon /> : <ExternalLink />
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = icons[project.slug] ?? Calculator
  return (
    <Reveal delay={(index % 3) * 0.05} className="h-full">
      <Card id={project.slug} className="group relative h-full scroll-mt-24 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(400px_130px_at_0%_0%,color-mix(in_oklab,var(--brand-blue)_12%,transparent),transparent)]"
        />
        <CardHeader className="relative">
          <span className="mb-4 grid size-11 place-items-center rounded-xl border bg-card text-brand shadow-xs">
            <Icon className="size-5" aria-hidden />
          </span>
          <CardTitle className="text-lg text-navy">{project.name}</CardTitle>
          <CardDescription>{project.kind}</CardDescription>
          <CardAction>
            <span className="text-xs text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          </CardAction>
        </CardHeader>
        <CardContent className="relative flex-1 space-y-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            {project.tags
              .filter((t) => t !== "Group Project" && t !== "Prototype")
              .map((t) => (
                <Badge key={t} variant="secondary" className="rounded-md font-normal">
                  {t}
                </Badge>
              ))}
          </div>
        </CardContent>
        <CardFooter className="relative gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Maximize2 /> Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <div className="mb-2 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border bg-surface-1 text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <StatusBadge status={project.status} />
                </div>
                <DialogTitle className="text-navy">{project.name}</DialogTitle>
                <DialogDescription>{project.kind}</DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                {project.details.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <Badge key={t} variant="outline" className="rounded-md font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
              <DialogFooter>
                {project.links.map((link, i) => (
                  <Button key={link.href} asChild variant={i === 0 ? "default" : "outline"}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <LinkIcon link={link} /> {link.label}
                    </a>
                  </Button>
                ))}
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <div className="ml-auto flex items-center gap-1">
            {project.links.map((link) => (
              <Button key={link.href} asChild variant="ghost" size="sm">
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.type === "code" ? "Code" : link.label} <ArrowUpRight />
                </a>
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Reveal>
  )
}

const kindLabels: Record<Project["kind"], string> = {
  "Web app": "Web apps",
  "Mobile app": "Mobile",
  Game: "Games",
  Prototype: "Prototypes",
}

const filters = [
  { value: "all", label: "All" },
  ...(Object.keys(kindLabels) as Project["kind"][])
    .filter((k) => projects.some((p) => p.kind === k))
    .map((k) => ({ value: k, label: kindLabels[k] })),
]

export default function ProjectsPage() {
  const [tab, setTab] = useState<string>("all")

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Selected work" title="Projects" description="Here are some of my works." />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {filters.map((f) => {
            const count = f.value === "all" ? projects.length : projects.filter((p) => p.kind === f.value).length
            return (
              <TabsTrigger key={f.value} value={f.value} className="gap-1.5">
                {f.label}
                <span className="text-xs text-muted-foreground tabular-nums">{count}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>
        {filters.map((f) => {
          const list = f.value === "all" ? projects : projects.filter((p) => p.kind === f.value)
          return (
            <TabsContent key={f.value} value={f.value} className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {list.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={projects.indexOf(p) ?? i} />
                ))}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
