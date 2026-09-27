import { SubpageVisual } from "@/components/SubpageVisual";
import { format } from "date-fns"
import { GlassCard, PageShell } from "@/components/shell"
import { SupabaseSetupCard } from "@/components/premium/setup-card"
import { getSupabaseEnvStatus } from "@/lib/env"
import { createClientOrNull } from "@/lib/supabase-server"
import { buildDailyReport, fullChildName } from "@/lib/utils"

export default async function ParentDashboardPage() {
  const supabase = await createClientOrNull()
  const envStatus = getSupabaseEnvStatus()

  if (!supabase || !envStatus.ok) {
    return (
      <>
      <SubpageVisual variant="dashboard" />
      <PageShell>
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.22em] text-white/45">Parent dashboard</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">A daily report, ready to share at pickup.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
            ChildDevOS turns teacher observations into structured updates and assistive developmental insights. Connect Supabase to
            load the demo child and generate today’s report.
          </p>
        </div>
        <SupabaseSetupCard />
      </PageShell>
      </>
    )
  }

  const { data: children, error: childError } = await supabase
    .from("children")
    .select("id,first_name,last_name,birth_date,happiness_baseline,classroom_id,center_id")
    .order("created_at", { ascending: true })
    .limit(1)

  if (childError) {
    return (
      <PageShell>
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.22em] text-white/45">Parent dashboard</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Report generation is ready.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
            Supabase is connected, but the schema may not be applied yet. Run the SQL in{" "}
            <span className="font-mono">supabase/childdevos_schema.sql</span>.
          </p>
        </div>
        <GlassCard className="p-6">
          <div className="text-sm uppercase tracking-[0.22em] text-white/45">Schema error</div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
            {childError.message}
          </div>
        </GlassCard>
      </PageShell>
    )
  }

  const child = children?.[0]

  let reportText = "No child record found."
  let happinessAverage: number | null = null
  let learningFocus: string[] = []

  if (child) {
    const reportDate = format(new Date(), "yyyy-MM-dd")
    const { data: observations } = await supabase
      .from("observations")
      .select("id,child_id,category,title,note,happiness_level,learned_tags,occurred_at")
      .eq("child_id", child.id)
      .gte("occurred_at", `${reportDate}T00:00:00`)
      .lte("occurred_at", `${reportDate}T23:59:59`)
      .order("occurred_at", { ascending: true })

    const built = buildDailyReport(observations || [], fullChildName(child.first_name, child.last_name), reportDate)
    reportText = built.summary
    happinessAverage = built.happinessAvg
    learningFocus = built.learningFocus

    await supabase
      .from("daily_reports")
      .upsert(
        {
          child_id: child.id,
          report_date: reportDate,
          summary: built.summary,
          happiness_avg: built.happinessAvg,
          learning_focus: built.learningFocus,
        },
        { onConflict: "child_id,report_date" }
      )
  }

  return (
    <PageShell>
      <div className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <GlassCard className="p-6">
          <div className="text-sm uppercase tracking-[0.22em] text-white/45">Parent dashboard</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            {child ? fullChildName(child.first_name, child.last_name) : "Child profile"}
          </h1>
          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/55">Today’s report</div>
              <div className="mt-2 text-3xl font-semibold">Live</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/55">Observed happiness average</div>
              <div className="mt-2 text-3xl font-semibold">{happinessAverage ? `${happinessAverage}/5` : "—"}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="text-sm text-white/55">Learning focus</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {learningFocus.length ? (
                  learningFocus.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-white/55">No tags yet</span>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4 text-sm uppercase tracking-[0.22em] text-white/45">Generated daily report</div>
          <div className="whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/75">
            {reportText}
          </div>
        </GlassCard>
      </div>
    </PageShell>
  )
}
