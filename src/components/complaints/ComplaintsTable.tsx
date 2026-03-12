import { ComplaintRow } from "./ComplaintRow"
import type { Complaint } from "@/types/complaints"
import type { AuthRole } from "@/types/auth"

export function ComplaintsTable({
  complaints,
  userRole,
  resolutionNotes,
  resolvingIds,
  onNoteChange,
  onResolve,
}: {
  complaints: Complaint[]
  userRole: AuthRole
  resolutionNotes: Record<string, string>
  resolvingIds: Set<string>
  onNoteChange: (id: string, val: string) => void
  onResolve: (complaint: Complaint) => void
}) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-225">
        <thead className="sticky top-0 z-10">
          <tr className="border-b border-border bg-muted/40">
            {[
              "Ticket ID",
              "Created At",
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
          {complaints.map((c) => (
            <ComplaintRow
              key={c.id}
              complaint={c}
              userRole={userRole}
              resolutionNote={resolutionNotes[c.id] ?? ""}
              isResolving={resolvingIds.has(c.id)}
              onNoteChange={(val) => onNoteChange(c.id, val)}
              onResolve={() => onResolve(c)}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
