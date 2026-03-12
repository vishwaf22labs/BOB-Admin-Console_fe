import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  const displayName = userName && userName.trim() !== "" 
    ? userName 
    : (userRole === "super_admin" ? "Administrator" : "Bank Staff")

  const initial = displayName.charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card shadow-sm">
      <div className="flex h-14 items-center justify-between gap-4 px-6">

        {/* Left — Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold shadow-sm"
            style={{ backgroundColor: "var(--brand-bg)", color: "var(--brand-text)" }}
          >
            BoB
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-foreground">
              Complaint Management
            </span>
            <span className="text-[0.65rem] text-muted-foreground">
              AI-powered escalation & resolution
            </span>
          </div>
        </div>

        {/* Center — User info pill */}
        <div className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full text-[0.6rem] font-bold text-white shrink-0"
            style={{ backgroundColor: "var(--brand-bg)" }}
          >
            {initial}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-foreground">
              {displayName}
            </span>
            <span className="text-[0.65rem] text-muted-foreground">
              {userRole?.toUpperCase()} · {bankLabel}
            </span>
          </div>
        </div>

        {/* Right — Voice language + Logout */}
        <div className="flex items-center gap-3 shrink-0">
          {userRole !== "super_admin" && (
            <div className="flex items-center gap-2">
              <span className="hidden text-[0.7rem] font-medium text-muted-foreground md:block whitespace-nowrap">
                Voice Language
              </span>
              <Select
                value={voiceLanguage ?? "english"}
                onValueChange={onVoiceLanguageChange}
                disabled={voiceLanguageSaving}
              >
                <SelectTrigger className="h-8 min-w-[110px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VOICE_LANGUAGE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>

      </div>
    </header>
  )
}