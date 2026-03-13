import { useState } from "react"
import { ChevronDown, ChevronUp, Hand, MessageSquare, Mic } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  formatDateTime12h,
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

const CATEGORY_BADGE_STYLE: Record<
  string,
  { backgroundColor: string; color: string; borderColor: string }
> = {
  transaction: {
    backgroundColor: "var(--category-transaction-bg)",
    color: "var(--category-transaction-text)",
    borderColor: "var(--category-transaction-border)",
  },
  atm: {
    backgroundColor: "var(--category-atm-bg)",
    color: "var(--category-atm-text)",
    borderColor: "var(--category-atm-border)",
  },
  account_service: {
    backgroundColor: "var(--category-account-bg)",
    color: "var(--category-account-text)",
    borderColor: "var(--category-account-border)",
  },
}

const ASSIGNEE_BADGE_STYLE: Record<
  string,
  { backgroundColor: string; color: string; borderColor: string }
> = {
  m1: {
    backgroundColor: "var(--assignee-m1-bg)",
    color: "var(--assignee-m1-text)",
    borderColor: "var(--assignee-m1-border)",
  },
  m2: {
    backgroundColor: "var(--assignee-m2-bg)",
    color: "var(--assignee-m2-text)",
    borderColor: "var(--assignee-m2-border)",
  },
  m3: {
    backgroundColor: "var(--assignee-m3-bg)",
    color: "var(--assignee-m3-text)",
    borderColor: "var(--assignee-m3-border)",
  },
}

export function ComplaintRow({
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
  const [expanded, setExpanded] = useState(false)
  const c = complaint

  let channelIcon: React.ReactNode = null
  if (c.sourceChannel === "voice") channelIcon = <Mic className="h-3 w-3" />
  if (c.sourceChannel === "chat")
    channelIcon = <MessageSquare className="h-3 w-3" />
  if (c.sourceChannel === "sign") channelIcon = <Hand className="h-3 w-3" />

  return (
    <>
      {/* Main row */}
      <tr
        className="cursor-pointer border-b border-border bg-card transition-colors hover:bg-muted/40"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <td className="whitespace-nowrap px-3 py-3 text-xs font-semibold text-foreground">
          {c.ticketId}
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-xs text-muted-foreground">
          {formatDateTime12h(c.createdAt)}
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-xs text-foreground">
          {c.userName ?? "-"}
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-xs text-muted-foreground">
          {c.userEmail ?? "-"}
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-xs text-muted-foreground">
          {c.userPhone ?? "-"}
        </td>
        <td className="whitespace-nowrap px-3 py-3 text-xs text-muted-foreground capitalize">
          {c.languageDetected ?? "-"}
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          {c.sourceChannel ? (
            <Badge
              className="border text-[0.65rem] font-medium"
              style={CHANNEL_BADGE_STYLE[c.sourceChannel]}
            >
              <span className="flex items-center gap-1">
                {channelIcon}
                {formatChannel(c.sourceChannel)}
              </span>
            </Badge>
          ) : (
            "-"
          )}
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          <Badge
            className="border text-[0.65rem] font-medium"
            style={
              c.complaintCategory
                ? CATEGORY_BADGE_STYLE[c.complaintCategory] ?? {}
                : {}
            }
          >
            {c.complaintCategory ? formatCategory(c.complaintCategory) : "-"}
          </Badge>
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          <Badge
            className="border text-[0.65rem] font-medium"
            style={ASSIGNEE_BADGE_STYLE[c.assignedTo] ?? {}}
          >
            {formatAssignee(c.assignedTo)}
          </Badge>
        </td>
        <td className="whitespace-nowrap px-3 py-3">
          <Badge
            className="border text-[0.65rem] font-medium"
            style={STATUS_BADGE_STYLE[c.status]}
          >
            {c.status === "open" ? "Open" : "Resolved"}
          </Badge>
        </td>
        <td className="px-3 py-3 text-center">
          <button
            type="button"
            className="text-muted-foreground transition-colors hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation()
              setExpanded((prev) => !prev)
            }}
            aria-label="Expand row"
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </td>
      </tr>

      {/* Expanded row */}
      {expanded && (
        <tr
          className="border-b border-border bg-muted/20"
          onClick={(e) => e.stopPropagation()}
        >
          <td colSpan={11} className="px-6 py-5">
            <div className="flex gap-6">
              {/* Left column */}
              <div className="flex w-1/2 min-w-0 flex-col gap-5">
                {/* Complaint section */}
                <div className="space-y-2">
                  <div className="border-b pb-1 text-xs font-semibold text-foreground">
                    Complaint
                  </div>
                  <div>
                    <div className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                      Complaint Text
                    </div>
                    {c.complaintText ? (
                      <p className="mt-0.5 text-xs text-foreground">
                        {c.complaintText}
                      </p>
                    ) : (
                      <p className="mt-0.5 text-xs italic text-muted-foreground">
                        No complaint text available
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                      Summary
                    </div>
                    {c.complaintSummary ? (
                      <p className="mt-0.5 text-xs italic text-foreground">
                        {c.complaintSummary}
                      </p>
                    ) : (
                      <p className="mt-0.5 text-xs italic text-muted-foreground">
                        No summary available
                      </p>
                    )}
                  </div>
                </div>

                {c.transcript && c.transcript.length > 0 && (
                  <div className="space-y-2">
                    <div className="border-b pb-1 text-xs font-semibold text-foreground">
                      Conversation Transcript
                    </div>
                    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                      {c.transcript.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex flex-col gap-0.5 ${
                            msg.role === "user" ? "items-end" : "items-start"
                          }`}
                        >
                          <span className="text-[0.6rem] font-medium uppercase tracking-wide text-muted-foreground">
                            {msg.role === "agent" ? "AI Agent" : "User"}
                            {msg.timestamp ? ` · ${formatDateTime12h(msg.timestamp)}` : ""}
                          </span>
                          <div
                            className={`max-w-[85%] rounded-lg px-3 py-1.5 text-xs ${
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Escalation */}
                <div className="space-y-2">
                  <div className="border-b pb-1 text-xs font-semibold text-foreground">
                    Escalation
                  </div>
                  <div className="flex items-start gap-4 rounded-lg bg-muted/30 px-3 py-3 text-[0.7rem]">
                    {[
                      { level: "m1" as const, timestamp: null },
                      { level: "m2" as const, timestamp: c.escalatedToM2At },
                      { level: "m3" as const, timestamp: c.escalatedToM3At },
                    ].map((step, index) => {
                      const isCurrent = c.assignedTo === step.level
                      const isPast =
                        (step.level === "m1" &&
                          (c.assignedTo === "m2" || c.assignedTo === "m3")) ||
                        (step.level === "m2" && c.assignedTo === "m3")
                      const isFuture = !isCurrent && !isPast

                      let circleClass =
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold uppercase transition"
                      if (isCurrent) circleClass += " bg-primary text-white"
                      else if (isPast)
                        circleClass += " bg-muted text-muted-foreground"
                      else if (isFuture)
                        circleClass +=
                          " bg-card border-2 border-muted text-muted-foreground"

                      return (
                        <div
                          key={step.level}
                          className="flex min-w-12 flex-col items-center gap-1"
                        >
                          <div className="flex items-center gap-1">
                            <div className={circleClass}>{step.level}</div>
                            {index < 2 && (
                              <span className="text-muted-foreground">→</span>
                            )}
                          </div>
                          {step.timestamp && (
                            <div className="text-center text-[0.7rem] font-medium text-foreground mt-0.5">
                              {formatDateTime12h(step.timestamp)}
                            </div>
                          )}
                          {step.level === "m3" &&
                            c.assignedTo === "m3" &&
                            c.escalatedToM3At && (
                              <div
                                className="text-center text-[0.6rem] font-semibold"
                                style={{
                                  color: "var(--escalation-rbi-text)",
                                }}
                              >
                                (RBI)
                              </div>
                            )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Resolution */}
                {(c.status === "resolved" ||
                  (c.status === "open" && userRole !== "super_admin")) && (
                  <div className="space-y-2">
                    <div className="border-b pb-1 text-xs font-semibold text-foreground">
                      Resolution
                    </div>
                    {c.status === "open" ? (
                      <div className="space-y-2">
                        <textarea
                          className="min-h-16 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-xs focus:border-primary focus:outline-none disabled:opacity-60"
                          placeholder="Add resolution note..."
                          value={resolutionNote}
                          onChange={(e) => onNoteChange(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={(e) => {
                            e.stopPropagation()
                            onResolve()
                          }}
                          disabled={isResolving}
                        >
                          {isResolving ? "Marking…" : "Mark as Resolved"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs">
                        <div>
                          <div className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                            Note
                          </div>
                          <p className="mt-0.5 text-xs text-foreground">
                            {c.resolutionNote ?? "-"}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                              Resolved by
                            </div>
                            <div className="text-xs font-medium text-foreground">
                              {c.resolvedBy ?? "-"}
                            </div>
                          </div>
                          <div>
                            <div className="text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                              Resolved at
                            </div>
                            <div className="text-xs font-medium text-foreground">
                              {formatDateTime12h(c.resolvedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Notifications */}
                {(c.emailSent || c.callSent) && (
                  <div className="space-y-2">
                    <div className="border-b pb-1 text-xs font-semibold text-foreground">
                      Notifications
                    </div>
                    <div className="flex flex-col gap-1 text-xs">
                      {c.emailSent && (
                        <div
                          style={{
                            color: "var(--notification-success-text)",
                          }}
                        >
                          ✓ Email sent — {formatDateTime12h(c.emailSentAt)}
                        </div>
                      )}
                      {c.callSent && (
                        <div
                          style={{
                            color: "var(--notification-success-text)",
                          }}
                        >
                          ✓ Call sent — {formatDateTime12h(c.callSentAt)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right column — media */}
              <div className="flex w-1/2 shrink-0 flex-col gap-3">
                {c.sourceChannel === "voice" && (
                  <div className="space-y-2">
                    <div className="border-b pb-1 text-xs font-semibold text-foreground">
                      Voice Recording
                    </div>
                    {c.audioUrl ? (
                      <audio controls className="w-full" src={c.audioUrl} />
                    ) : (
                      <p className="text-xs italic text-muted-foreground">
                        No recording available
                      </p>
                    )}
                    {/* TODO: call transcript text — add transcriptText field when confirmed from webhook */}
                  </div>
                )}

                {c.sourceChannel === "sign" && (
                  <div className="space-y-2">
                    <div className="border-b pb-1 text-xs font-semibold text-foreground">
                      Sign Language Video
                    </div>
                    {c.videoUrl ? (
                      <video
                        controls
                        className="max-h-52 w-full rounded-md"
                        src={c.videoUrl}
                      />
                    ) : (
                      <p className="text-xs italic text-muted-foreground">
                        No video available
                      </p>
                    )}
                  </div>
                )}

                {c.sourceChannel === "chat" && (
                  <div className="space-y-2">
                    <div className="border-b pb-1 text-xs font-semibold text-foreground">
                      Original Message
                    </div>
                    {c.rawChatText ? (
                      <p className="whitespace-pre-wrap text-xs text-foreground">
                        {c.rawChatText}
                      </p>
                    ) : (
                      <p className="text-xs italic text-muted-foreground">
                        No original message available
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

