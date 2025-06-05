import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs",
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// تبدیل کامپوننت به forwardRef تا ری‌ف قبول کنه
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants(), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
