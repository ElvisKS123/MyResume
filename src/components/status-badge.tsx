import { Badge } from "@/components/ui/badge"
import type { Status } from "@/data/resume"
import { cn } from "@/lib/utils"

// Each status gets its own subtle tint so it reads at a glance without
// pulling focus from the content.
const styles: Record<Status, { label: string; className: string; dot: string }> = {
  current: {
    label: "Current",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  "in-progress": {
    label: "In progress",
    className:
      "bg-sky-50 text-[#184f90] border-sky-200/70 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20",
    dot: "bg-[#184f90] dark:bg-sky-400",
  },
  completed: {
    label: "Completed",
    className:
      "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-500/10 dark:text-slate-300 dark:border-slate-500/20",
    dot: "bg-slate-400",
  },
  prototype: {
    label: "Prototype",
    className:
      "bg-amber-50 text-amber-700 border-amber-200/70 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
    dot: "bg-amber-500",
  },
  live: {
    label: "Live",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  group: {
    label: "Group project",
    className:
      "bg-violet-50 text-violet-700 border-violet-200/70 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20",
    dot: "bg-violet-500",
  },
}

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const s = styles[status]
  return (
    <Badge variant="outline" className={cn("gap-1.5 font-medium", s.className, className)}>
      <span className={cn("size-1.5 rounded-full", s.dot)} aria-hidden />
      {s.label}
    </Badge>
  )
}
