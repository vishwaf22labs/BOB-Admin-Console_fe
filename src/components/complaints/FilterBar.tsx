import {
  ASSIGNEE_OPTIONS,
  CATEGORY_OPTIONS,
  CHANNEL_OPTIONS,
  STATUS_OPTIONS,
} from "@/constants/filters"

type FilterKey = "status" | "channel" | "category" | "assignedTo"

export function FilterBar({
  statusFilter,
  channelFilter,
  categoryFilter,
  assigneeFilter,
  onUpdate,
}: {
  statusFilter: string
  channelFilter: string
  categoryFilter: string
  assigneeFilter: string
  onUpdate: (key: FilterKey, value: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border bg-card p-3 text-xs shadow-sm">
      <select
        className="h-8 rounded-md border bg-background px-2 text-xs"
        value={statusFilter}
        onChange={(e) => onUpdate("status", e.target.value)}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        className="h-8 rounded-md border bg-background px-2 text-xs"
        value={channelFilter}
        onChange={(e) => onUpdate("channel", e.target.value)}
      >
        {CHANNEL_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        className="h-8 rounded-md border bg-background px-2 text-xs"
        value={categoryFilter}
        onChange={(e) => onUpdate("category", e.target.value)}
      >
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        className="h-8 rounded-md border bg-background px-2 text-xs"
        value={assigneeFilter}
        onChange={(e) => onUpdate("assignedTo", e.target.value)}
      >
        {ASSIGNEE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}