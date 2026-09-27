import { NextResponse } from "next/server"
import { getSupabaseEnvStatus } from "@/lib/env"
import { createClientOrNull } from "@/lib/supabase-server"
import { buildDailyReport, fullChildName } from "@/lib/utils"

export async function GET(request: Request) {
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
  const { searchParams } = new URL(request.url)
  const childId = searchParams.get("childId")
  const reportDate = searchParams.get("date") || new Date().toISOString().slice(0, 10)

  if (!childId) {
    return NextResponse.json({ ok: false, error: "Missing childId" }, { status: 400 })
  }

  const { data: child, error: childError } = await supabase
    .from("children")
    .select("id,first_name,last_name")
    .eq("id", childId)
    .single()

  if (childError || !child) {
    return NextResponse.json({ ok: false, error: "Child not found" }, { status: 404 })
  }

  const { data: observations, error: observationError } = await supabase
    .from("observations")
    .select("id,child_id,category,title,note,happiness_level,learned_tags,occurred_at")
    .eq("child_id", childId)
    .gte("occurred_at", `${reportDate}T00:00:00`)
    .lte("occurred_at", `${reportDate}T23:59:59`)
    .order("occurred_at", { ascending: true })

  if (observationError) {
    return NextResponse.json({ ok: false, error: observationError.message }, { status: 400 })
  }

  const built = buildDailyReport(observations || [], fullChildName(child.first_name, child.last_name), reportDate)

  const { error: upsertError } = await supabase.from("daily_reports").upsert(
    {
      child_id: childId,
      report_date: reportDate,
      summary: built.summary,
      happiness_avg: built.happinessAvg,
      learning_focus: built.learningFocus,
    },
    { onConflict: "child_id,report_date" }
  )

  if (upsertError) {
    return NextResponse.json({ ok: false, error: upsertError.message }, { status: 400 })
  }

  return NextResponse.json({
    ok: true,
    report_date: reportDate,
    summary: built.summary,
    happiness_avg: built.happinessAvg,
    learning_focus: built.learningFocus,
  })
}
