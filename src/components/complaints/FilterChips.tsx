import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatAssignee, formatCategory, formatChannel } from "@/utils/format"

type ChipKey = "search" | "status" | "channel" | "category" | "assignedTo"

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {label}
      <button
        type="button"
        aria-label="Remove filter"
        onClick={onRemove}
        className="ml-1 hover:text-destructive"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}

export function FilterChips({
  searchFromUrl,
  statusFilter,
  channelFilter,
  categoryFilter,
  assigneeFilter,
  onRemove,
  onReset,
}: {
  searchFromUrl: string
  statusFilter: string
  channelFilter: string
  categoryFilter: string
  assigneeFilter: string
  onRemove: (key: ChipKey) => void
  onReset: () => void
}) {
  const hasActiveFilters =
    searchFromUrl !== "" ||
    statusFilter !== "all" ||
    channelFilter !== "all" ||
    categoryFilter !== "all" ||
    assigneeFilter !== "all"

  if (!hasActiveFilters) return null

  return (
    <div className="mb-5 mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
      {searchFromUrl !== "" && (
        <Chip label={searchFromUrl} onRemove={() => onRemove("search")} />
      )}
      {statusFilter !== "all" && (
        <Chip
          label={
            statusFilter === "open"
              ? "Open"
              : statusFilter === "resolved"
                ? "Resolved"
                : statusFilter
          }
          onRemove={() => onRemove("status")}
        />
      )}
      {channelFilter !== "all" && (
        <Chip
          label={formatChannel(channelFilter)}
          onRemove={() => onRemove("channel")}
        />
      )}
      {categoryFilter !== "all" && (
        <Chip
          label={formatCategory(categoryFilter)}
          onRemove={() => onRemove("category")}
        />
      )}
      {assigneeFilter !== "all" && (
        <Chip
          label={`Assigned: ${formatAssignee(assigneeFilter)}`}
          onRemove={() => onRemove("assignedTo")}
        />
      )}
      <Button
        type="button"
        variant="destructive"
        size="xs"
        onClick={onReset}
        className="rounded-full"
      >
        Reset All
      </Button>
    </div>
  )
}