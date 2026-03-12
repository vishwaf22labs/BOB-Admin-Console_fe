function SkeletonCell({ className }: { className?: string }) {
  return (
    <div
      className={`h-4 animate-pulse rounded bg-muted/60 ${
        className ?? "w-24"
      }`}
    />
  )
}

function SkeletonRow() {
  return (
    <tr className="border-b border-border">
      <td className="px-3 py-3">
        <SkeletonCell className="w-24" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-32" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-28" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-36" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-24" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-16" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-14" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-20" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-10" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-16" />
      </td>
      <td className="px-3 py-3">
        <SkeletonCell className="w-6" />
      </td>
    </tr>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">

      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              {[
                "Ticket ID",
                "Created",
                "Name",
                "Email",
                "Phone",
                "Language",
                "Channel",
                "Category",
                "Assigned",
                "Status",
                "",
              ].map((h, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-3 py-2 text-left text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}