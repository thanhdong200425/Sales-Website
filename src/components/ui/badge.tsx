import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = {
  default: "bg-slate-900 text-white",
  secondary: "bg-slate-100 text-slate-900",
  destructive: "bg-red-100 text-red-600",
}

type BadgeVariant = keyof typeof badgeVariants

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = "default", ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide",
      badgeVariants[variant],
      className,
    )}
    {...props}
  />
))
Badge.displayName = "Badge"

export { Badge }

