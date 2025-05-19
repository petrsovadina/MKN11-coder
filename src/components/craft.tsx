import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn("w-full py-12 md:py-24 lg:py-32", className)}>
      {children}
    </section>
  )
}

export function Container({ children, className }: SectionProps) {
  return (
    <div className={cn("container px-4 md:px-6", className)}>
      {children}
    </div>
  )
}
