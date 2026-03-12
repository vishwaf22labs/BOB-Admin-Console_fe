import type {
  ComplaintStatus,
  ComplaintSourceChannel,
  Complaint,
  ComplaintsListResponse,
} from "../types/complaints"
import { api } from "@/lib/axios"

export interface ListComplaintsFilters {
  status?: ComplaintStatus
  sourceChannel?: ComplaintSourceChannel
  complaintCategory?: string
  assignedTo?: "m1" | "m2" | "m3"
  search?: string
  page?: number
  limit?: number
}

interface ResolveComplaintResponse {
  complaint: Complaint
}

export async function listComplaints(
  filters: ListComplaintsFilters = {}
): Promise<ComplaintsListResponse> {
  const params: Record<string, string> = {}

  if (filters.status) params.status = filters.status
  if (filters.sourceChannel) params.sourceChannel = filters.sourceChannel
  if (filters.complaintCategory)
    params.complaintCategory = filters.complaintCategory
  if (filters.assignedTo) params.assignedTo = filters.assignedTo
  if (filters.search !== undefined && filters.search !== "")
    params.search = filters.search
  if (filters.page !== undefined) params.page = String(filters.page)
  if (filters.limit !== undefined) params.limit = String(filters.limit)

  const { data } = await api.get<ComplaintsListResponse>("/complaints", {
    params,
  })
  return data
}

export async function resolveComplaint(
  id: string,
  resolutionNote: string
): Promise<Complaint> {
  const { data } = await api.patch<ResolveComplaintResponse>(
    `/complaints/${id}/resolve`,
    { resolutionNote }
  )
  return data.complaint
}