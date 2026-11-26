import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="no-print fixed right-4 bottom-4 z-40 grid size-11 place-items-center rounded-md text-navy transition-colors hover:text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:right-6 sm:bottom-6 dark:text-white dark:hover:text-[#6c9fdc]"
        >
          <ArrowUp className="size-7" strokeWidth={2.25} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
