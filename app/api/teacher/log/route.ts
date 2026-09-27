import { NextResponse } from "next/server"
import { getSupabaseEnvStatus } from "@/lib/env"
import { createClientOrNull } from "@/lib/supabase-server"

export async function POST(request: Request) {
  const envStatus = getSupabaseEnvStatus()
  if (!envStatus.ok) {
    return NextResponse.json(
      { ok: false, error: "Supabase env not configured", missing: envStatus.missing },
      { status: 503 }
    )
  }

  const supabase = await createClientOrNull()
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Supabase client unavailable" }, { status: 503 })
  }
  const body = await request.json()

  const payload = {
    center_id: body.center_id,
    classroom_id: body.classroom_id || null,
    child_id: body.child_id,
    category: body.category,
    title: body.title,
    note: body.note,
    happiness_level: typeof body.happiness_level === "number" ? body.happiness_level : null,
    learned_tags: Array.isArray(body.learned_tags) ? body.learned_tags : [],
  }

  const { data, error } = await supabase.from("observations").insert(payload).select("*").single()

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ ok: true, observation: data })
}
