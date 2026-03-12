import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Hand, Lock, Mail, MessageSquare, Mic, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/api/auth.api"
import { useAuthStore } from "@/store/authStore"

export function LoginPage() {
  const navigate = useNavigate()
  const setUser = useAuthStore((s) => s.setUser)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { user } = await login(email, password)
      setUser(user)
      navigate("/dashboard", { replace: true })
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : "Login failed"
      setError(message ?? "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-svh flex-col md:flex-row"
      style={{
        backgroundColor: "var(--login-shell-bg)",
        color: "var(--login-shell-fg)",
      }}
    >
      {/* Left brand panel */}
      <div
        className="flex flex-1 items-center justify-center p-8"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, var(--login-left-gradient-from), var(--login-left-gradient-via), var(--login-left-gradient-to))",
        }}
      >
        <div className="flex max-w-xl flex-col gap-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold shadow-lg"
              style={{
                backgroundColor: "var(--brand-bg)",
                color: "var(--brand-text)",
              }}
            >
              BoB
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                Bank of Baroda · Admin Console
              </h1>
              <p className="text-xs" style={{ color: "var(--login-muted-2)" }}>
                AI-Powered Complaint Management System
              </p>
            </div>
          </div>

          <p className="max-w-md text-sm" style={{ color: "var(--login-muted-1)" }}>
            Accessible banking for everyone — handle voice, chat, and sign
            language complaints from a single, unified dashboard.
          </p>

          <div className="mt-2 flex flex-wrap gap-4 text-xs" style={{ color: "var(--login-muted-1)" }}>
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--login-icon-chip-bg)" }}
              >
                <Mic className="h-4 w-4" />
              </span>
              <span>
                <div className="font-semibold">Voice</div>
                <div className="text-[0.7rem]" style={{ color: "var(--login-muted-2)" }}>
                  IVR & call center integration
                </div>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--login-icon-chip-bg)" }}
              >
                <MessageSquare className="h-4 w-4" />
              </span>
              <span>
                <div className="font-semibold">Chat</div>
                <div className="text-[0.7rem]" style={{ color: "var(--login-muted-2)" }}>
                  Web & app chat channels
                </div>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--login-icon-chip-bg)" }}
              >
                <Hand className="h-4 w-4" />
              </span>
              <span>
                <div className="font-semibold">Sign</div>
                <div className="text-[0.7rem]" style={{ color: "var(--login-muted-2)" }}>
                  Sign language complaint intake
                </div>
              </span>
            </div>
          </div>

          <p className="mt-4 text-[0.7rem]" style={{ color: "var(--login-muted-3)" }}>
            Bank of Baroda POC — built with F22 Labs.
          </p>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex flex-1 items-center justify-center bg-background p-6 text-foreground">
        <Card className="w-full max-w-sm border-border bg-card shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Admin Login</CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Sign in to your bank dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <p className="rounded-md border border-destructive/30 bg-destructive/10 p-2 text-xs text-destructive">
                  {error}
                </p>
              )}

              <div className="space-y-1.5 text-xs">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-muted-foreground">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="pl-7 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2 text-muted-foreground">
                    <Lock className="h-3.5 w-3.5" />
                  </span>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="pr-7 pl-7 text-xs"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" className="mt-2 w-full" disabled={loading}>
                {loading ? "Signing in…" : "Login"}
              </Button>
            </form>
          </CardContent>
          <div className="border-t px-4 py-3 text-center text-[0.7rem] text-muted-foreground">
            Bank of Baroda POC — F22 Labs
          </div>
        </Card>
      </div>
    </div>
  )
}