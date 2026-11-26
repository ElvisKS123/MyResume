import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, Code2, FileText, GraduationCap, Mail, Route, Sparkles } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { StatusBadge } from "@/components/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { allSkills, education, experience, journey, profile, projects, skillGroups } from "@/data/resume"
import photo from "@/assets/profile.jpg"

const ease = [0.22, 1, 0.36, 1] as const

function Hero() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section>
      <div className="grid items-center gap-10 py-4 sm:py-8 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-4xl leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl"
          >
            Creative Coder, <span className="text-brand">Consistent Builder.</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.18 }}
          >
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{profile.intro}</p>
            <p className="mt-2 font-medium text-navy">{profile.closing}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-10 px-4">
                <Link to="/resume">
                  <FileText /> Resume
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-10 bg-background px-4">
                <Link to="/projects">
                  Projects <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-10 px-4">
                <Link to="/contact">
                  <Mail /> Contact
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="relative mx-auto grid w-full max-w-sm place-items-center"
        >
          {/* Circular portrait */}
          <div className="relative aspect-square w-64 overflow-hidden rounded-full bg-muted shadow-2xl shadow-[#142238]/20 sm:w-72 lg:w-80">
            {!loaded && <Skeleton className="absolute inset-0 rounded-full" />}
            <img
              src={photo}
              alt="Portrait of Elvis Shimwa"
              onLoad={() => setLoaded(true)}
              className="size-full object-cover object-[50%_25%] transition-opacity duration-500 data-[loaded=false]:opacity-0"
              data-loaded={loaded}
            />
          </div>
          <figcaption className="mt-5 text-center">
            <p className="text-sm font-semibold text-navy">{profile.name}</p>
            <p className="text-xs text-muted-foreground">{profile.title}</p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}

const stats = [
  {
    label: "Experience since",
    value: experience[experience.length - 1].start,
    hint: `${experience.length} roles`,
    icon: Briefcase,
  },
  {
    label: "University GPA",
    value: education[0].gpa ? `${education[0].gpa.value}` : "—",
    suffix: education[0].gpa ? ` / ${education[0].gpa.scale}` : "",
    hint: education[0].school,
    icon: GraduationCap,
  },
  { label: "Core skills", value: String(allSkills.length), hint: "Languages, tools & practice", icon: Code2 },
  { label: "Projects", value: String(projects.length), hint: "Web apps & prototypes", icon: Sparkles },
]

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <Hero />

      <section aria-label="At a glance" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, suffix, hint, icon: Icon }, i) => (
          <Reveal key={label} delay={i * 0.05}>
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <CardDescription className="text-sm font-medium">{label}</CardDescription>
                <Icon className="size-4 text-muted-foreground" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight text-navy tabular-nums">
                  {value}
                  {suffix && <span className="text-base font-medium text-muted-foreground">{suffix}</span>}
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground">{hint}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>

      <Reveal>
        <section id="journey" aria-labelledby="journey-title">
          <Card>
            <CardHeader>
              <CardTitle id="journey-title" className="flex items-center gap-2 text-navy">
                <Route className="size-4 text-brand" aria-hidden /> My journey
              </CardTitle>
              <CardDescription>How I found my way into technology</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                {journey.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
              <blockquote className="self-start rounded-lg border-l-4 border-brand bg-surface-1 p-5 text-base leading-relaxed font-medium text-navy dark:bg-muted/40">
                {journey.closing}
              </blockquote>
            </CardContent>
          </Card>
        </section>
      </Reveal>

      <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Card>
            <CardHeader>
              <CardTitle className="text-navy">Recent experience</CardTitle>
              <CardDescription>Work history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {experience.map((e) => (
                <div key={e.org} className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-muted/60">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg border bg-surface-1 text-navy">
                    <Briefcase className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="font-medium text-navy">{e.role}</p>
                      <StatusBadge status={e.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {e.org} · <span className="tabular-nums">{e.start} – {e.end}</span>
                    </p>
                  </div>
                </div>
              ))}
              <Button asChild variant="link" className="mt-2 px-3">
                <Link to="/resume">
                  View full resume <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-navy">Skills &amp; expertise</CardTitle>
              <CardDescription>Languages, tools &amp; practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillGroups.map((g) => (
                <div key={g.label}>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">{g.label}</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <li key={s}>
                        <Badge variant="secondary" className="h-7 rounded-md px-2.5 text-[13px] font-normal">
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
      </div>

      <Reveal>
        <section className="relative overflow-hidden rounded-2xl bg-[#142238] p-8 text-white sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-[#184f90] opacity-60 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">{profile.closing}</h2>
              <p className="mt-1 text-white/70">Feel free to reach out for {profile.availability}.</p>
            </div>
            <Button asChild size="lg" variant="secondary" className="h-10 bg-white px-4 text-[#142238] hover:bg-white/90">
              <Link to="/contact">
                <Mail /> Get in touch
              </Link>
            </Button>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
