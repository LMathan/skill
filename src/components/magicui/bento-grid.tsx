import { ReactNode } from "react"
import { ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn("grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6", className)}>
      {children}
    </div>
  )
}

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string
  className?: string
  background?: ReactNode
  Icon: React.ComponentType<{ className?: string; size?: number }>
  description: string
  href: string
  cta: string
}) => {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-cyan/20",
        className
      )}
    >
      {/* Background graphic */}
      <div className="absolute inset-0 z-0">{background}</div>

      {/* Top Header */}
      <div className="relative z-10 flex flex-col gap-2 pointer-events-none">
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 w-fit text-slate-700 dark:text-slate-200 transition-transform group-hover:scale-105">
          <Icon size={20} />
        </div>
        <h3 className="text-xl font-bold font-display text-slate-950 dark:text-white mt-2">
          {name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[280px]">
          {description}
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <span />
        <a
          href={href}
          className={cn(
            "pointer-events-auto inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-brand-cyan transition-colors"
          )}
        >
          <span>{cta}</span>
          <ArrowRightIcon size={12} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}
