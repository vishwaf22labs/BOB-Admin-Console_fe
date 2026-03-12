import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
      <Select value={statusFilter} onValueChange={(val) => onUpdate("status", val)}>
        <SelectTrigger className="h-9 min-w-[130px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={channelFilter} onValueChange={(val) => onUpdate("channel", val)}>
        <SelectTrigger className="h-9 min-w-[130px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CHANNEL_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={categoryFilter} onValueChange={(val) => onUpdate("category", val)}>
        <SelectTrigger className="h-9 min-w-[150px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CATEGORY_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={assigneeFilter} onValueChange={(val) => onUpdate("assignedTo", val)}>
        <SelectTrigger className="h-9 min-w-[130px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ASSIGNEE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}