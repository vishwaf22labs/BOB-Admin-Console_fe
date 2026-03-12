import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"

import { ProtectedRoute } from "@/components/ProtectedRoute"
import { PublicRoute } from "@/components/PublicRoute"
import { LoginPage } from "@/pages/LoginPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { me } from "@/api/auth.api"
import { useAuthStore } from "@/store/authStore"

export function App() {
  const setUser = useAuthStore((s) => s.setUser)
  const clearUser = useAuthStore((s) => s.clearUser)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await me()
        if (res.user && !res.user.name) {
          console.warn("User name missing from /auth/me response", res.user)
        }
        setUser(res.user)
      } catch {
        clearUser()
      } finally {
        setHasCheckedAuth(true)
      }
    }
    checkAuth()
  }, [])

  if (!hasCheckedAuth) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App