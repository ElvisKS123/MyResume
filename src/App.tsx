import { lazy, Suspense } from "react"
import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import { ThemeProvider } from "@/components/theme-provider"

import { AppShell } from "@/components/app-shell"
import { Skeleton } from "@/components/ui/skeleton"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

const OverviewPage = lazy(() => import("@/pages/overview"))
const ResumePage = lazy(() => import("@/pages/resume"))
const ProjectsPage = lazy(() => import("@/pages/projects"))
const ContactPage = lazy(() => import("@/pages/contact"))

function PageSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-72" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-xl" />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <TooltipProvider delayDuration={200}>
          {/* HashRouter keeps deep links working on GitHub Pages */}
          <HashRouter>
            <Routes>
              <Route
                element={
                  <AppShell>
                    <Suspense fallback={<PageSkeleton />}>
                      <Routes>
                        <Route index element={<OverviewPage />} />
                        <Route path="resume" element={<ResumePage />} />
                        <Route path="projects" element={<ProjectsPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Suspense>
                  </AppShell>
                }
                path="/*"
              />
            </Routes>
          </HashRouter>
          <Toaster position="bottom-right" richColors={false} />
        </TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
