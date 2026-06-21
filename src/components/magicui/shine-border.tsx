import { cn } from "@/lib/utils"

interface ShineBorderProps {
  className?: string
  color?: string | string[]
  borderWidth?: number
  duration?: number
}

export function ShineBorder({
  className,
  color = ["#06b6d4", "#3b82f6", "#6366f1"],
  borderWidth = 1.5,
  duration = 14,
}: ShineBorderProps) {
  const colors = Array.isArray(color) ? color.join(", ") : color

  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          "--background-color": "transparent",
          "--color-gradient": `linear-gradient(to right, ${colors})`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "before:absolute before:inset-0 before:aspect-square before:w-full before:animate-border-beam before:[background:linear-gradient(135deg,#06b6d4,#3b82f6,#6366f1,#06b6d4)] before:[offset-path:rect(0_auto_auto_0_round_10px)]",
        className
      )}
    />
  )
}
export default ShineBorder
