export function formatDateTime(value: string | null): string {
  if (!value) return "-"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleString()
}

export function formatDateTime12h(value: string | null): string {
  if (!value) return "-"
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return "-"
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export function formatCategory(cat: string): string {
  if (cat === "account_service") return "Account Service"
  if (cat === "atm") return "ATM"
  if (cat === "transaction") return "Transaction"
  return cat
}

export function formatChannel(ch: string): string {
  if (ch === "voice") return "Voice"
  if (ch === "chat") return "Chat"
  if (ch === "sign") return "Sign"
  return ch
}

export function formatAssignee(role: string): string {
  if (role === "m1") return "M1"
  if (role === "m2") return "M2"
  if (role === "m3") return "M3"
  return role
}