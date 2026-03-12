import type { AuthUser } from "@/types/auth"
import { api } from "@/lib/axios"

export interface LoginResponse {
  user: AuthUser
}

export interface MeResponse {
  user: AuthUser
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  })
  return data
}

export async function me(): Promise<MeResponse> {
  const { data } = await api.get<MeResponse>("/auth/me")
  return data
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout")
}