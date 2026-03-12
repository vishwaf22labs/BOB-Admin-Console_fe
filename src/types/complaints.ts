export type ComplaintStatus = "open" | "resolved"

export type ComplaintSourceChannel = "voice" | "chat" | "sign"

export interface Complaint {
  id: string
  ticketId: string
  userName: string | null
  userEmail: string | null
  userPhone: string | null
  userBankId: string
  complaintText: string | null
  complaintSummary: string | null
  complaintCategory: string | null
  sourceChannel: ComplaintSourceChannel | null
  languageDetected: string | null
  audioUrl: string | null
  videoUrl: string | null
  rawChatText: string | null
  status: ComplaintStatus
  assignedTo: "m1" | "m2" | "m3"
  resolutionNote: string | null
  resolvedBy: string | null
  resolvedAt: string | null
  escalatedToM2At: string | null
  escalatedToM3At: string | null
  emailSent: boolean
  emailSentAt: string | null
  callSent: boolean
  callSentAt: string | null
  createdAt: string
  updatedAt: string
}

export interface ComplaintsListResponse {
  complaints: Complaint[]
  total: number
  page: number
  limit: number
  totalPages: number
}