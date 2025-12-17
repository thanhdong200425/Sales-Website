import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)} // Đã sửa bg-muted thành bg-slate-200 cho dễ thấy
      {...props}
    />
  )
}

export { Skeleton }