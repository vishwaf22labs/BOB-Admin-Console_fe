export type AuthRole = "super_admin" | "m1" | "m2" | "m3"

export interface AuthUser {
  id: string
  name: string
  email: string
  bankId: string | null
  role: AuthRole
}