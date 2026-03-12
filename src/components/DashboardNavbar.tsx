import { Button } from "@/components/ui/button"
import { VOICE_LANGUAGE_OPTIONS } from "@/constants/filters"
import type { AuthRole } from "@/types/auth"

export function DashboardNavbar({
  userName,
  userRole,
  bankLabel,
  voiceLanguage,
  voiceLanguageSaving,
  onVoiceLanguageChange,
  onLogout,
}: {
  userName: string | undefined
  userRole: AuthRole | undefined
  bankLabel: string
  voiceLanguage: string | null
  voiceLanguageSaving: boolean
  onVoiceLanguageChange: (language: string) => void
  onLogout: () => void
}) {
  return (
    <header className="flex items-center justify-between border-b bg-card px-6 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold shadow"
          style={{
            backgroundColor: "var(--brand-bg)",
            color: "var(--brand-text)",
          }}
        >
          BoB
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            Complaint Management Console
          </span>
          <span className="text-xs text-muted-foreground">
            AI-powered escalation & resolution
          </span>
        </div>
      </div>

      <div className="hidden flex-col items-end text-right md:flex">
        <span className="text-sm font-medium">{userName}</span>
        <span className="text-xs text-muted-foreground">
          {userRole?.toUpperCase()} · {bankLabel}
        </span>
      </div>

      {userRole !== "super_admin" && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Voice Callback Language:
          </span>
          <select
            className="h-8 rounded-md border bg-background px-2 text-xs"
            value={voiceLanguage ?? "english"}
            onChange={(e) => onVoiceLanguageChange(e.target.value)}
            disabled={voiceLanguageSaving}
          >
            {VOICE_LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <Button variant="outline" size="sm" onClick={onLogout}>
        Logout
      </Button>
    </header>
  )
}