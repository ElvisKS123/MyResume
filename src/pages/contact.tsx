import { useState, type FormEvent } from "react"
import { Check, Copy, Mail, Phone, Send } from "lucide-react"
import { toast } from "sonner"

import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from "@/components/brand-icons"
import { PageHeader, Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { contact, profile } from "@/data/resume"

const channels = [
  { label: "Phone", value: contact.phoneDisplay, href: contact.phoneHref, icon: Phone, copy: "+250787932359" },
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: Mail, copy: contact.email },
  { label: "WhatsApp", value: contact.phoneShort, href: contact.whatsappHref, icon: WhatsappIcon, external: true },
  { label: "Instagram", value: contact.instagram.handle, href: contact.instagram.href, icon: InstagramIcon, external: true },
  { label: "LinkedIn", value: contact.linkedin.handle, href: contact.linkedin.href, icon: LinkedinIcon, external: true },
  { label: "GitHub", value: contact.github.handle, href: contact.github.href, icon: GithubIcon, external: true },
]

const topics = ["Job opportunity", "Collaboration", "General inquiry"]

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Copy ${label.toLowerCase()}`}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(value)
              setCopied(true)
              toast.success(`${label} copied`, { description: value })
              setTimeout(() => setCopied(false), 1600)
            } catch {
              toast.error("Couldn’t copy", { description: value })
            }
          }}
        >
          {copied ? <Check className="text-emerald-600" /> : <Copy />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copied" : "Copy"}</TooltipContent>
    </Tooltip>
  )
}

function MessageForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [topic, setTopic] = useState(topics[0])
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = "Please enter your name."
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email address."
    if (message.trim().length < 10) next.message = "Please write at least a short message."
    setErrors(next)
    if (Object.keys(next).length) return

    const body = `${message}\n\n— ${name} (${email})`
    const subject = `${topic} — from ${name}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    toast.success("Opening your email app", { description: "Your message is ready to send." })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-navy">Send a message</CardTitle>
        <CardDescription>Feel free to reach out for {profile.availability}.</CardDescription>
      </CardHeader>
      <CardContent>
        <form noValidate onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-destructive">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-destructive">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id="topic" className="w-full">
                <SelectValue placeholder="Choose a topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : "message-hint"}
            />
            {errors.message ? (
              <p id="message-error" className="text-xs text-destructive">
                {errors.message}
              </p>
            ) : (
              <p id="message-hint" className="text-xs text-muted-foreground">
                A few lines about the role or project is perfect.
              </p>
            )}
          </div>

          <Button type="submit" className="h-10 w-full px-4 sm:w-auto">
            <Send /> Send message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Contact" title="Get in touch!" description={profile.contactTagline} />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <ul className="grid gap-3">
            {channels.map(({ label, value, href, icon: Icon, copy, external }) => (
              <li key={label}>
                <Card className="py-0 transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 px-4 py-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-1 text-brand">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground">{label}</p>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block truncate font-medium text-navy tabular-nums hover:text-brand"
                      >
                        {value}
                      </a>
                    </div>
                    {copy && <CopyButton value={copy} label={label} />}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.05}>
          <MessageForm />
        </Reveal>
      </div>
    </div>
  )
}
