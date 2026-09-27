import { NextResponse } from "next/server"
import { getSupabaseEnvStatus } from "@/lib/env"
import { createClientOrNull } from "@/lib/supabase-server"

export async function GET() {
  try {
    const envStatus = getSupabaseEnvStatus()
    if (!envStatus.ok) {
      return NextResponse.json({
        ok: false,
        error: "Supabase env not configured",
        missing: envStatus.missing,
        schema: envStatus.env.supabaseSchema || "childdevos",
      })
    }

    const supabase = await createClientOrNull()
    if (!supabase) {
      return NextResponse.json({ ok: false, error: "Supabase client unavailable" })
    }

    const { data, error } = await supabase
      .from("children")
      .select("id")
      .limit(1)

    if (error) {
      return NextResponse.json({ ok: false, error: error.message })
    }

    return NextResponse.json({ ok: true, data })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown health check error"
    return NextResponse.json({ ok: false, error: message })
  }
}
