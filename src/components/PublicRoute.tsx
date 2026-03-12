import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}