function SkeletonLine({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-md bg-muted/60 ${className}`} />
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border bg-card shadow-sm">
      <div className="border-b p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="h-4 w-36 rounded bg-muted/60" />
            <div className="flex flex-wrap gap-2">
              <div className="h-5 w-16 rounded-full bg-muted/60" />
              <div className="h-5 w-16 rounded-full bg-muted/60" />
              <div className="h-5 w-24 rounded-full bg-muted/60" />
              <div className="h-5 w-14 rounded-full bg-muted/60" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="h-4 w-16 rounded bg-muted/60" />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-muted/60" />
              <div className="h-4 w-28 rounded bg-muted/60" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-muted/60" />
              <div className="h-4 w-32 rounded bg-muted/60" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-muted/60" />
              <div className="h-4 w-24 rounded bg-muted/60" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-muted/60" />
              <div className="h-4 w-20 rounded bg-muted/60" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-muted/60" />
          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-muted/60" />
            <div className="h-12 w-full rounded bg-muted/60" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-28 rounded bg-muted/60" />
            <div className="h-10 w-full rounded bg-muted/60" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-muted/60" />
          <div className="flex items-center justify-between gap-2">
            <div className="h-8 w-8 rounded-full bg-muted/60" />
            <div className="h-8 w-8 rounded-full bg-muted/60" />
            <div className="h-8 w-8 rounded-full bg-muted/60" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-muted/60" />
          <div className="h-20 w-full rounded bg-muted/60" />
          <div className="h-9 w-full rounded bg-muted/60" />
        </div>
      </div>

      <div className="border-t px-4 py-3">
        <div className="h-3 w-40 rounded bg-muted/60" />
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="w-full max-w-sm">
        <SkeletonLine className="h-9 w-full" />
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-3 shadow-sm">
        <SkeletonLine className="h-8 w-28" />
        <SkeletonLine className="h-8 w-28" />
        <SkeletonLine className="h-8 w-28" />
        <SkeletonLine className="h-8 w-28" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SkeletonLine className="h-7 w-28 rounded-full" />
        <SkeletonLine className="h-7 w-24 rounded-full" />
        <SkeletonLine className="h-7 w-20 rounded-full" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    </div>
  )
}