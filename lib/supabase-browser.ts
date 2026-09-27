"use client"

import { createBrowserClient } from "@supabase/ssr"
import { getSupabaseEnvStatus } from "@/lib/env"

export function createClientOrNull() {
  const status = getSupabaseEnvStatus()
  if (!status.ok) return null

  const { supabaseUrl, supabaseAnonKey, supabaseSchema } = status.env

  return createBrowserClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: supabaseSchema },
  })
}
