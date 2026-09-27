export type SupabaseEnv = {
  supabaseUrl: string
  supabaseAnonKey: string
  supabaseSchema: string
}

export type SupabaseEnvStatus =
  | { ok: true; env: SupabaseEnv }
  | { ok: false; env: SupabaseEnv; missing: Array<keyof SupabaseEnv>; reason: string }

function isPlaceholder(value: string) {
  const v = value.trim().toLowerCase()
  if (!v) return true
  return (
    v.includes("placeholder") ||
    v.includes("your_") ||
    v.includes("replace_me") ||
    v.includes("example") ||
    v === "changeme"
  )
}

export function getPublicEnv(): SupabaseEnv {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    supabaseSchema: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "childdevos",
  }
}

export function getSupabaseEnvStatus(): SupabaseEnvStatus {
  const env = getPublicEnv()
  const missing: Array<keyof SupabaseEnv> = []

  if (isPlaceholder(env.supabaseUrl)) missing.push("supabaseUrl")
  if (isPlaceholder(env.supabaseAnonKey)) missing.push("supabaseAnonKey")
  if (isPlaceholder(env.supabaseSchema)) missing.push("supabaseSchema")

  if (missing.length) {
    return {
      ok: false,
      env,
      missing,
      reason:
        "Supabase env is not configured. Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and NEXT_PUBLIC_SUPABASE_SCHEMA=childdevos.",
    }
  }

  return { ok: true, env }
}

export function requireSupabaseEnv(): SupabaseEnv {
  const status = getSupabaseEnvStatus()
  if (!status.ok) {
    const missing = status.missing.join(", ")
    throw new Error(`Missing or placeholder Supabase env: ${missing}`)
  }
  return status.env
}
