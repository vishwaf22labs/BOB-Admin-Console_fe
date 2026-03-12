import { useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Inbox } from "lucide-react"
import { isAxiosError } from "axios"
import { toast } from "sonner"

import { logout } from "@/api/auth.api"
import { getVoiceLanguage, updateVoiceLanguage } from "@/api/bankSettings.api"
import { listComplaints, resolveComplaint } from "@/api/complaints.api"
import { DashboardNavbar } from "@/components/DashboardNavbar"
import {
  ComplaintsTable,
  DashboardSkeleton,
  FilterBar,
  FilterChips,
  Pagination,
  SearchBar,
} from "@/components/complaints"
import { useAuth } from "@/hooks/useAuth"
import type {
  Complaint,
  ComplaintSourceChannel,
  ComplaintStatus,
} from "@/types/complaints"

type FilterStatus = "all" | ComplaintStatus
type FilterChannel = "all" | ComplaintSourceChannel
type FilterCategory = "all" | "transaction" | "atm" | "account_service"
type FilterAssignee = "all" | "m1" | "m2" | "m3"
type FilterKey =
  | "search"
  | "status"
  | "channel"
  | "category"
  | "assignedTo"
  | "page"
  | "limit"

function getApiErrorMessage(err: unknown, fallback = ""): string {
  const maybeMessage =
    isAxiosError(err) &&
    err.response?.data &&
    typeof err.response.data === "object" &&
    err.response.data !== null
      ? (err.response.data as any).message
      : err && typeof err === "object" && "message" in err
        ? (err as any).message
        : undefined
  return typeof maybeMessage === "string" && maybeMessage.trim()
    ? maybeMessage
    : fallback
}

export function DashboardPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { user, clearUser } = useAuth()
  const searchFromUrl = searchParams.get("search") ?? ""
  const statusFilter = (searchParams.get("status") ?? "all") as FilterStatus
  const channelFilter = (searchParams.get("channel") ?? "all") as FilterChannel
  const categoryFilter = (searchParams.get("category") ??
    "all") as FilterCategory
  const assigneeFilter = (searchParams.get("assignedTo") ??
    "all") as FilterAssignee
  const page = Number(searchParams.get("page")) || 1
  const limit = Number(searchParams.get("limit") ?? "10")

  const bankLabel =
    user?.role === "super_admin"
      ? "All Banks"
      : (user?.bankId ?? "Unknown Bank")
  const [searchInput, setSearchInput] = useState(searchFromUrl)
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [resolutionNotes, setResolutionNotes] = useState<
    Record<string, string>
  >({})
  const [resolvingIds, setResolvingIds] = useState<Set<string>>(new Set())
  const [voiceLanguage, setVoiceLanguage] = useState<string | null>(null)
  const [voiceLanguageSaving, setVoiceLanguageSaving] = useState(false)

  function updateParams(updates: Partial<Record<FilterKey, string | null>>) {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "all" || value === "") next.delete(key)
      else next.set(key, value)
    })
    setSearchParams(next, { replace: true })
  }

  useEffect(() => setSearchInput(searchFromUrl), [searchFromUrl])

  async function handleLogout() {
    try {
      await logout()
    } finally {
      clearUser()
      navigate("/login", { replace: true })
    }
  }

  async function fetchComplaints() {
    setLoading(true)
    try {
      const result = await listComplaints({
        status: statusFilter === "all" ? undefined : statusFilter,
        sourceChannel: channelFilter === "all" ? undefined : channelFilter,
        complaintCategory:
          categoryFilter === "all" ? undefined : categoryFilter,
        assignedTo: assigneeFilter === "all" ? undefined : assigneeFilter,
        search: searchFromUrl || undefined,
        page,
        limit,
      })
      setComplaints(result.complaints)
      setTotal(result.total)
      setTotalPages(result.totalPages)
    } catch (err: unknown) {
      toast.error("Failed to load complaints", {
        description: getApiErrorMessage(err, "Failed to load complaints"),
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchComplaints()
  }, [searchParams.toString()])

  function handleSearchChange(value: string) {
    setSearchInput(value)
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current)
    searchDebounceRef.current = setTimeout(
      () => updateParams({ search: value.trim() || null, page: null }),
      500
    )
  }

  const handlePageChange = (p: number) => {
    updateParams({ page: p === 1 ? null : String(p) })
  }

  const handleLimitChange = (newLimit: number) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev)
      p.set("limit", String(newLimit))
      p.delete("page")
      return p
    })
  }

  useEffect(() => {
    if (user?.role === "super_admin") return
    void (async () => {
      try {
        const res = await getVoiceLanguage()
        if (res.voiceCallLanguage != null)
          setVoiceLanguage(res.voiceCallLanguage)
      } catch {
        setVoiceLanguage("english")
      }
    })()
  }, [user?.role])

  async function handleResolve(complaint: Complaint) {
    const note = (resolutionNotes[complaint.id] ?? "").trim()
    if (!note) return void toast.error("Resolution note is required")

    setResolvingIds((prev) => new Set(prev).add(complaint.id))
    try {
      await resolveComplaint(complaint.id, note)
      setResolutionNotes((prev) => ({ ...prev, [complaint.id]: "" }))
      await fetchComplaints()

      toast.success("Complaint resolved", {
        description: `Ticket ${complaint.ticketId} has been marked as resolved.`,
      })

      const ch = complaint.sourceChannel
      if ((ch === "chat" || ch === "sign") && complaint.userEmail) {
        toast.success("Resolution email sent", {
          description: `Email notification sent to ${complaint.userEmail}`,
        })
      } else if (ch === "voice") {
        toast.info("Resolution saved", {
          description: "Voice callback will be triggered for this complaint.",
        })
      }
    } catch (err: unknown) {
      toast.error("Failed to resolve complaint", {
        description:
          getApiErrorMessage(err) || "Something went wrong. Please try again.",
      })
    } finally {
      setResolvingIds((prev) => {
        const copy = new Set(prev)
        copy.delete(complaint.id)
        return copy
      })
    }
  }

  async function handleVoiceLanguageChange(newLanguage: string) {
    if (!newLanguage || voiceLanguageSaving) return
    setVoiceLanguageSaving(true)
    try {
      const res = await updateVoiceLanguage(newLanguage)
      setVoiceLanguage(res.voiceCallLanguage)
      toast.success("Language updated", {
        description: "Voice callback language saved.",
      })
    } catch {
      toast.error("Failed to update language")
    } finally {
      setVoiceLanguageSaving(false)
    }
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <DashboardNavbar
        userName={user?.name}
        userRole={user?.role}
        bankLabel={bankLabel}
        voiceLanguage={voiceLanguage}
        voiceLanguageSaving={voiceLanguageSaving}
        onVoiceLanguageChange={(lang) => void handleVoiceLanguageChange(lang)}
        onLogout={() => void handleLogout()}
      />

      <header className="flex-none bg-background px-4 pb-1 pt-4 md:px-6">
        <div className="mb-3 w-full max-sm:max-w-xs md:max-w-sm">
          <SearchBar value={searchInput} onChange={handleSearchChange} />
        </div>
        <div className="mb-2">
          <FilterBar
            statusFilter={statusFilter}
            channelFilter={channelFilter}
            categoryFilter={categoryFilter}
            assigneeFilter={assigneeFilter}
            onUpdate={(key, value) => updateParams({ [key]: value, page: null })}
          />
        </div>
        <FilterChips
          searchFromUrl={searchFromUrl}
          statusFilter={statusFilter}
          channelFilter={channelFilter}
          categoryFilter={categoryFilter}
          assigneeFilter={assigneeFilter}
          onRemove={(key) => updateParams({ [key]: null, page: null })}
          onReset={() => {
            setSearchParams({}, { replace: true })
            setSearchInput("")
          }}
        />
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto px-4 pt-0 md:px-6">
        {loading ? (
          <DashboardSkeleton />
        ) : complaints.length === 0 ? (
          <div className="flex min-h-50 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <Inbox className="h-10 w-10" />
            <span>No complaints found.</span>
          </div>
        ) : (
          <ComplaintsTable
            complaints={complaints}
            userRole={user?.role ?? "m1"}
            resolutionNotes={resolutionNotes}
            resolvingIds={resolvingIds}
            onNoteChange={(id, val) =>
              setResolutionNotes((p) => ({ ...p, [id]: val }))
            }
            onResolve={(c) => void handleResolve(c)}
          />
        )}
        {/* Padding for fixed footer */}
        <div className="h-16" />
      </main>

      {!loading && total > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-background px-4 py-2 md:px-6">
          <Pagination
            page={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </footer>
      )}
    </div>
  )
}