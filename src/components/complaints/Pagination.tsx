import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}) {
  if (total <= 0) return null

  const from = Math.max(1, page - 2)
  const to = Math.min(totalPages, page + 2)
  const pages: number[] = []
  for (let p = from; p <= to; p += 1) pages.push(p)

  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
      <p className="text-sm text-muted-foreground">
        Showing {start} to {end} of {total} complaints
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {pages.map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="sm"
            className={p === page ? "bg-primary text-white" : ""}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}