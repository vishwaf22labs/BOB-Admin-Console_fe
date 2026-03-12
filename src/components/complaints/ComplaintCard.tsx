import {
  AlertCircle,
  CheckCircle2,
  Hand,
  Mail,
  MessageSquare,
  Mic,
  Phone,
  User,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AuthRole } from "@/types/auth"
import type {
  Complaint,
  ComplaintSourceChannel,
  ComplaintStatus,
} from "@/types/complaints"
import {
  formatAssignee,
  formatCategory,
  formatChannel,
  formatDateTime,
} from "@/utils/format"

const STATUS_BADGE_STYLE: Record<
  ComplaintStatus,
  { backgroundColor: string; color: string; borderColor: string }
> = {
  open: {
    backgroundColor: "var(--status-open-bg)",
    color: "var(--status-open-text)",
    borderColor: "var(--status-open-border)",
  },
  resolved: {
    backgroundColor: "var(--status-resolved-bg)",
    color: "var(--status-resolved-text)",
    borderColor: "var(--status-resolved-border)",
  },
}

const CHANNEL_BADGE_STYLE: Record<
  ComplaintSourceChannel,
  { backgroundColor: string; color: string; borderColor: string }
> = {
  voice: {
    backgroundColor: "var(--channel-voice-bg)",
    color: "var(--channel-voice-text)",
    borderColor: "var(--channel-voice-border)",
  },
  chat: {
    backgroundColor: "var(--channel-chat-bg)",
    color: "var(--channel-chat-text)",
    borderColor: "var(--channel-chat-border)",
  },
  sign: {
    backgroundColor: "var(--channel-sign-bg)",
    color: "var(--channel-sign-text)",
    borderColor: "var(--channel-sign-border)",
  },
}

export function ComplaintCard({
  complaint,
  userRole,
  resolutionNote,
  isResolving,
  onNoteChange,
  onResolve,
}: {
  complaint: Complaint
  userRole: AuthRole
  resolutionNote: string
  isResolving: boolean
  onNoteChange: (val: string) => void
  onResolve: () => void
}) {
  const c = complaint

  let channelIcon: React.ReactNode = null
  if (c.sourceChannel === "voice") channelIcon = <Mic className="h-3 w-3" />
  if (c.sourceChannel === "chat")
    channelIcon = <MessageSquare className="h-3 w-3" />
  if (c.sourceChannel === "sign") channelIcon = <Hand className="h-3 w-3" />

  return (
    <Card className="flex h-full flex-col border border-border bg-card p-0 shadow-md transition-shadow hover:shadow-lg">
      <CardHeader className="border-b pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm font-semibold">
              {c.ticketId}
            </CardTitle>
            <div className="mt-1 flex flex-wrap gap-1 text-[0.7rem]">
              <Badge className="border" style={STATUS_BADGE_STYLE[c.status]}>
                {c.status === "open" ? (
                  <span className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Open
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Resolved
                  </span>
                )}
              </Badge>

              {c.sourceChannel && (
                <Badge
                  className="border"
                  style={CHANNEL_BADGE_STYLE[c.sourceChannel]}
                >
                  <span className="flex items-center gap-1">
                    {channelIcon}
                    {formatChannel(c.sourceChannel)}
                  </span>
                </Badge>
              )}

              <Badge className="border border-border bg-muted text-muted-foreground">
                Assigned: {formatAssignee(c.assignedTo)}
              </Badge>

              {c.complaintCategory && (
                <Badge className="border border-border bg-muted text-muted-foreground">
                  {formatCategory(c.complaintCategory)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 p-5 text-xs">
        <section className="space-y-2">
          <div className="mb-3 flex items-center gap-1 border-b pb-1 text-sm font-semibold text-foreground">
            <User className="h-3 w-3" />
            User
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Name
              </div>
              <div className="text-sm font-medium text-foreground">
                {c.userName ?? "-"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <Mail className="h-3 w-3" />
                Email
              </div>
              <div className="text-sm font-medium text-foreground">
                {c.userEmail ?? "-"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <Phone className="h-3 w-3" />
                Phone
              </div>
              <div className="text-sm font-medium text-foreground">
                {c.userPhone ?? "-"}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Language Detected
              </div>
              <div className="text-sm font-medium text-foreground">
                {c.languageDetected ?? "-"}
              </div>
            </div>
            {userRole === "super_admin" && (
              <div>
                <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Bank ID
                </div>
                <div className="text-sm font-medium text-foreground">
                  {c.userBankId ?? "-"}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-2">
          <div className="border-b pb-1 text-sm font-semibold text-foreground">
            Complaint
          </div>
          <div>
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Complaint Text
            </div>
            <p className="text-sm font-medium whitespace-pre-wrap text-foreground">
              {c.complaintText ?? "-"}
            </p>
          </div>
          <div>
            <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Complaint Summary
            </div>
            <p className="text-sm whitespace-pre-wrap text-foreground italic">
              {c.complaintSummary ?? "-"}
            </p>
          </div>
        </section>

        {c.sourceChannel === "sign" && (
          <section className="space-y-2">
            <div className="border-b pb-1 text-sm font-semibold text-foreground">
              Sign Language
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Confidence
              </span>
              <Badge className="border border-border bg-muted text-muted-foreground">
                {c.signConfidencePct ? `${c.signConfidencePct}%` : "-"}
              </Badge>
            </div>
          </section>
        )}

        <section className="space-y-2">
          <div className="border-b pb-1 text-sm font-semibold text-foreground">
            Escalation
          </div>
          <div className="flex items-start justify-between gap-3 text-[0.7rem]">
            {[
              { level: "m1" as const, timestamp: null },
              { level: "m2" as const, timestamp: c.escalatedToM2At },
              { level: "m3" as const, timestamp: c.escalatedToM3At },
            ].map((step, index) => {
              const { level, timestamp } = step
              const isCurrent = c.assignedTo === level
              const isPast =
                (level === "m1" &&
                  (c.assignedTo === "m2" || c.assignedTo === "m3")) ||
                (level === "m2" && c.assignedTo === "m3")
              const isFuture = !isCurrent && !isPast

              let circleClass =
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold uppercase transition"
              if (isCurrent) circleClass += " bg-primary text-white"
              else if (isPast) circleClass += " bg-muted text-muted-foreground"
              else if (isFuture)
                circleClass +=
                  " bg-white border-2 border-muted text-muted-foreground"

              return (
                <div
                  key={level}
                  className="flex min-w-12 flex-col items-center gap-1"
                >
                  <div className="flex items-center gap-1">
                    <div className={circleClass}>{level}</div>
                    {index < 2 && (
                      <span className="text-xs text-muted-foreground">→</span>
                    )}
                  </div>
                  {timestamp && (
                    <div className="text-center text-[0.65rem] text-muted-foreground">
                      {formatDateTime(timestamp)}
                    </div>
                  )}
                  {level === "m3" &&
                    c.assignedTo === "m3" &&
                    c.escalatedToM3At && (
                      <div
                        className="text-center text-[0.65rem] font-semibold"
                        style={{ color: "var(--escalation-rbi-text)" }}
                      >
                        (RBI)
                      </div>
                    )}
                </div>
              )
            })}
          </div>
        </section>

        {(c.status === "resolved" ||
          (c.status === "open" && userRole !== "super_admin")) && (
          <section className="space-y-2">
            <div className="border-b pb-1 text-sm font-semibold text-foreground">
              Resolution
            </div>
            {c.status === "open" ? (
              <div className="space-y-2">
                <textarea
                  className="min-h-18 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="Add resolution note..."
                  value={resolutionNote}
                  onChange={(e) => onNoteChange(e.target.value)}
                />
                <Button
                  size="sm"
                  className="w-full"
                  onClick={onResolve}
                  disabled={isResolving}
                >
                  {isResolving ? "Marking…" : "Mark as Resolved"}
                </Button>
              </div>
            ) : (
              <div className="space-y-1 text-xs">
                <div>
                  <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Resolution note
                  </div>
                  <p className="text-sm font-medium whitespace-pre-wrap text-foreground">
                    {c.resolutionNote ?? "-"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Resolved by
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {c.resolvedBy ?? "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Resolved at
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {formatDateTime(c.resolvedAt)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {(c.emailSent || c.callSent) && (
          <section className="space-y-2 text-xs">
            <div className="border-b pb-1 text-sm font-semibold text-foreground">
              Notifications
            </div>
            <div className="grid grid-cols-2 gap-2">
              {c.emailSent && (
                <div>
                  <div
                    className="flex items-center gap-1"
                    style={{ color: "var(--notification-success-text)" }}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    <span className="text-xs font-medium tracking-wide uppercase">
                      Email Sent
                    </span>
                  </div>
                  <div className="text-[0.7rem] text-muted-foreground">
                    {formatDateTime(c.emailSentAt)}
                  </div>
                </div>
              )}
              {c.callSent && (
                <div>
                  <div
                    className="flex items-center gap-1"
                    style={{ color: "var(--notification-success-text)" }}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    <span className="text-xs font-medium tracking-wide uppercase">
                      Call Sent
                    </span>
                  </div>
                  <div className="text-[0.7rem] text-muted-foreground">
                    {formatDateTime(c.callSentAt)}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </CardContent>

      <div className="border-t bg-muted/40 px-4 py-2 text-[0.7rem] text-muted-foreground">
        Created at {formatDateTime(c.createdAt)}
      </div>
    </Card>
  )
}