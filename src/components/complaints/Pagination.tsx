import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const PAGE_SIZE_OPTIONS = [10, 50, 100]

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
}: {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}) {
  const from = total === 0 ? 0 : (page - 1) * limit + 1
  const to = Math.min(page * limit, total)

  return (
    <div className="flex items-center justify-between gap-4 text-xs">
      {/* Left — count */}
      <span className="text-muted-foreground whitespace-nowrap">
        Showing {from} to {to} of {total} complaints
      </span>

      {/* Center — page buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="rounded border border-border px-2 py-1 text-xs disabled:opacity-40 hover:bg-muted transition-colors"
        >
          ‹ Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce<(number | "...")[]>((acc, p, i, arr) => {
            if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...")
            acc.push(p)
            return acc
          }, [])
          .map((p, i) =>
            p === "..." ? (
              <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`min-w-[2rem] rounded border px-2 py-1 text-xs transition-colors ${
                  p === page
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:bg-muted"
                }`}
              >
                {p}
              </button>
            )
          )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="rounded border border-border px-2 py-1 text-xs disabled:opacity-40 hover:bg-muted transition-colors"
        >
          Next ›
        </button>
      </div>

      {/* Right — page size */}
      <Select
        value={String(limit)}
        onValueChange={(v) => onLimitChange(Number(v))}
      >
        <SelectTrigger className="h-8 w-24 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZE_OPTIONS.map((s) => (
            <SelectItem key={s} value={String(s)} className="text-xs">
              {s} / page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}