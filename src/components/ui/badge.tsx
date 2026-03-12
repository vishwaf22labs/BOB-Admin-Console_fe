import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants =
  "inline-flex items-center rounded-full border px-2 py-0.5 text-[0.7rem] font-medium transition-colors"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "ghost"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base =
      variant === "outline"
        ? "border-border bg-background text-foreground"
        : variant === "ghost"
          ? "border-transparent bg-transparent text-foreground"
          : "border-transparent bg-primary/10 text-primary"

    return (
      <div
        ref={ref}
        className={cn(badgeVariants, base, className)}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }