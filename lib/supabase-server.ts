import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { getSupabaseEnvStatus, requireSupabaseEnv } from "@/lib/env"

export async function createClient() {
  const cookieStore = await cookies()
  const { supabaseUrl, supabaseAnonKey, supabaseSchema } = requireSupabaseEnv()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll() {
      },
    },
    db: { schema: supabaseSchema },
  })
}

export async function createClientOrNull() {
  const status = getSupabaseEnvStatus()
  if (!status.ok) return null

  const cookieStore = await cookies()
  const { supabaseUrl, supabaseAnonKey, supabaseSchema } = status.env

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll() {
      },
    },
    db: { schema: supabaseSchema },
  })
}
