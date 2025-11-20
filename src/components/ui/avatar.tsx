import * as React from "react"

import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(({ className, src, alt, fallback, ...props }, ref) => (
  <div ref={ref} className={cn("relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-slate-200", className)} {...props}>
    {src ? <img alt={alt} className="size-full object-cover" src={src} /> : <span className="text-sm font-semibold text-slate-600">{fallback}</span>}
  </div>
))
Avatar.displayName = "Avatar"

export { Avatar }

