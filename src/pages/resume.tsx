import { useEffect, type ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Briefcase, Download, FileText, GraduationCap, Mail, Phone } from "lucide-react"
import { toast } from "sonner"

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { PageHeader, Reveal } from "@/components/reveal"
import { StatusBadge } from "@/components/status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { contact, education, experience, profile, skillGroups } from "@/data/resume"
import photo from "@/assets/profile.jpg"

function printResume() {
  toast.info("Opening print dialog", { description: "Choose “Save as PDF” to download your copy." })
  setTimeout(() => window.print(), 350)
}

function SectionTitle({ id, icon: Icon, children }: { id: string; icon: typeof Briefcase; children: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="no-print grid size-8 place-items-center rounded-lg border bg-surface-1 text-navy">
        <Icon className="size-4" aria-hidden />
      </span>
      <h2 id={id} className="scroll-mt-24 text-lg font-semibold">
        {children}
      </h2>
      <Separator className="flex-1" />
    </div>
  )
}

function Entry({
  title,
  org,
  period,
  status,
  description,
  highlights,
  extra,
}: {
  title: string
  org: string
  period: string
  status: Parameters<typeof StatusBadge>[0]["status"]
  description: string
  highlights: string[]
  extra?: ReactNode
}) {
  return (
    <Reveal>
      <Card className="print-plain transition-shadow hover:shadow-md">
        <CardContent className="grid gap-4 sm:grid-cols-[150px_1fr]">
          <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start">
            <p className="text-sm font-medium text-muted-foreground tabular-nums">{period}</p>
            <StatusBadge status={status} className="no-print" />
          </div>
          <div>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-sm font-medium text-brand">{org}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            {extra}
            <ul className="mt-3 space-y-2">
              {highlights.map((h) => (
                <li key={h} className="relative pl-5 text-sm leading-relaxed text-muted-foreground">
                  <span className="absolute top-[0.6em] left-1 size-1.5 rounded-full bg-brand" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  )
}

export default function ResumePage() {
  const location = useLocation()
  const navigate = useNavigate()

  // "Resume PDF" from the top bar lands here with { print: true }.
  useEffect(() => {
    if ((location.state as { print?: boolean } | null)?.print) {
      navigate(location.pathname, { replace: true, state: null })
      printResume()
    }
  }, [location, navigate])

  const timeline = [
    ...experience.map((e) => ({ kind: "Work", title: e.role, org: e.org, start: e.start, end: e.end, status: e.status })),
    ...education.map((e) => ({ kind: "Education", title: e.degree, org: e.school, start: e.start, end: e.end, status: e.status })),
  ].sort((a, b) => Number(b.start) - Number(a.start))

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Curriculum vitae"
        title="Resume"
        description={`${profile.name} — Software Engineering student and Full-Stack Developer.`}
        actions={
          <Button onClick={printResume} className="h-9">
            <Download /> Download PDF
          </Button>
        }
      />

      {/* Identity + contact */}
      <Reveal>
        <Card className="print-plain">
          <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="no-print size-16 rounded-xl">
                <AvatarImage src={photo} alt="Portrait of Elvis Shimwa" className="object-cover" />
                <AvatarFallback className="rounded-xl">{profile.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl font-semibold text-navy">{profile.name}</p>
                <p className="text-sm text-muted-foreground">Full-Stack Developer · Software Engineering student</p>
              </div>
            </div>
            <ul className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-4 shrink-0" aria-hidden />
                <a href={contact.phoneHref} className="tabular-nums hover:text-foreground">
                  {contact.phoneShort}
                </a>
              </li>
              <li className="flex min-w-0 items-center gap-2 text-muted-foreground">
                <Mail className="size-4 shrink-0" aria-hidden />
                <a href={`mailto:${contact.email}`} className="truncate hover:text-foreground">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <GithubIcon className="size-4 shrink-0" />
                <a href={contact.github.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  github.com/{contact.github.handle}
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <LinkedinIcon className="size-4 shrink-0" />
                <a href={contact.linkedin.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  linkedin.com/{contact.linkedin.handle}
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-10">
          <section aria-labelledby="summary">
            <SectionTitle id="summary" icon={FileText}>
              Professional Summary
            </SectionTitle>
            <Reveal>
              <Card className="print-plain border-l-4 border-l-[#184f90]">
                <CardContent>
                  <p className="leading-relaxed text-foreground">{profile.summary}</p>
                </CardContent>
              </Card>
            </Reveal>
          </section>

          <section aria-labelledby="experience">
            <SectionTitle id="experience" icon={Briefcase}>
              Work Experience
            </SectionTitle>
            <div className="space-y-4">
              {experience.map((e) => (
                <Entry
                  key={e.org}
                  title={e.role}
                  org={e.org}
                  period={`${e.start} – ${e.end}`}
                  status={e.status}
                  description={e.description}
                  highlights={e.highlights}
                />
              ))}
            </div>
          </section>

          <section aria-labelledby="education">
            <SectionTitle id="education" icon={GraduationCap}>
              Education
            </SectionTitle>
            <div className="space-y-4">
              {education.map((e) => (
                <Entry
                  key={e.school}
                  title={e.degree}
                  org={e.school}
                  period={`${e.start} – ${e.end}`}
                  status={e.status}
                  description={e.description}
                  highlights={e.highlights}
                  extra={
                    e.gpa && (
                      <p className="mt-3 inline-flex items-baseline gap-1.5 rounded-lg border bg-surface-1 px-3 py-1.5 text-sm">
                        <span className="text-muted-foreground">GPA</span>
                        <span className="font-semibold text-navy tabular-nums">{e.gpa.value}</span>
                        <span className="text-muted-foreground tabular-nums">/ {e.gpa.scale}</span>
                      </p>
                    )
                  }
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right rail */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section aria-labelledby="skills">
            <Reveal>
              <Card className="print-plain">
                <CardHeader>
                  <CardTitle id="skills" className="scroll-mt-24 text-navy">
                    Skills &amp; Expertise
                  </CardTitle>
                  <CardDescription>Grouped by type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {skillGroups.map((g) => (
                    <div key={g.label}>
                      <h3 className="mb-2 text-sm font-medium text-muted-foreground">{g.label}</h3>
                      <ul className="flex flex-wrap gap-1.5">
                        {g.items.map((s) => (
                          <li key={s}>
                            <Badge variant="outline" className="h-7 rounded-md px-2.5 text-[13px] font-normal">
                              {s}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Reveal>
          </section>

          <Reveal delay={0.05}>
            <Card className="print-plain">
              <CardHeader>
                <CardTitle className="text-navy">Timeline</CardTitle>
                <CardDescription>Work and education at a glance</CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Years</TableHead>
                      <TableHead className="pr-6">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeline.map((t) => (
                      <TableRow key={t.org}>
                        <TableCell className="pl-6 align-top text-muted-foreground tabular-nums">
                          {t.start}–{t.end === "Present" ? "now" : t.end.slice(-2)}
                        </TableCell>
                        <TableCell className="pr-6 whitespace-normal">
                          <p className="font-medium text-navy">{t.title}</p>
                          <p className="text-xs text-muted-foreground">{t.org}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
