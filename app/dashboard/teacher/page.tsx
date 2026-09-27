import { SubpageVisual } from "@/components/SubpageVisual";
import { revalidatePath } from "next/cache"
import { GlassCard, PageShell } from "@/components/shell"
import { SupabaseSetupCard } from "@/components/premium/setup-card"
import { getSupabaseEnvStatus } from "@/lib/env"
import { createClientOrNull } from "@/lib/supabase-server"
import { fullChildName } from "@/lib/utils"

async function logObservation(formData: FormData) {
  "use server"

  const supabase = await createClientOrNull()
  if (!supabase) return

  const payload = {
    center_id: String(formData.get("center_id") || ""),
    classroom_id: String(formData.get("classroom_id") || ""),
    child_id: String(formData.get("child_id") || ""),
    category: String(formData.get("category") || "activity"),
    title: String(formData.get("title") || ""),
    note: String(formData.get("note") || ""),
    happiness_level: formData.get("happiness_level") ? Number(formData.get("happiness_level")) : null,
    learned_tags: String(formData.get("learned_tags") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  }

  await supabase.from("observations").insert(payload)
  revalidatePath("/dashboard/teacher")
  revalidatePath("/dashboard/parent")
}

export default async function TeacherDashboardPage() {
  const supabase = await createClientOrNull()
  const envStatus = getSupabaseEnvStatus()

  if (!supabase || !envStatus.ok) {
    return (
      <>
      <SubpageVisual variant="dashboard" />
      <PageShell>
        <div className="mb-8">
          <div className="text-sm uppercase tracking-[0.22em] text-white/45">Teacher console</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Log the child’s day in seconds.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
            ChildDevOS is built to convert classroom observations into parent-ready reporting and longitudinal development context.
            Connect Supabase to enable logging.
          </p>
        </div>

        <SupabaseSetupCard />
      </PageShell>
      </>
    )
  }

  const [{ data: centers, error: centersError }, { data: classrooms, error: classroomsError }, { data: children, error: childrenError }, { data: observations, error: observationsError }] =
    await Promise.all([
      supabase.from("centers").select("id,name,slug").order("created_at", { ascending: true }),
      supabase.from("classrooms").select("id,name,center_id,age_group").order("created_at", { ascending: true }),
      supabase
        .from("children")
        .select("id,first_name,last_name,classroom_id,center_id,birth_date,happiness_baseline")
        .order("created_at", { ascending: true }),
      supabase
        .from("observations")
        .select("id,child_id,category,title,note,happiness_level,learned_tags,occurred_at")
        .order("occurred_at", { ascending: false })
        .limit(12),
    ])

  const schemaError = centersError || classroomsError || childrenError || observationsError

  const defaultCenterId = centers?.[0]?.id || ""
  const defaultClassroomId = classrooms?.[0]?.id || ""
  const defaultChildId = children?.[0]?.id || ""

  return (
    <PageShell>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.22em] text-white/45">Teacher console</div>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Log the child’s day in seconds.</h1>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-6">
          {schemaError ? (
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/70">
              <div className="font-medium text-white/85">Database not ready</div>
              <div className="mt-2">
                Supabase is connected, but the <span className="font-mono">childdevos</span> schema may not be applied yet.
                Run <span className="font-mono">supabase/childdevos_schema.sql</span> in the Supabase SQL editor.
              </div>
              <div className="mt-2 text-xs text-white/45">Error: {schemaError.message}</div>
            </div>
          ) : (
            <form action={logObservation} className="grid gap-4">
            <input type="hidden" name="center_id" defaultValue={defaultCenterId} />
            <input type="hidden" name="classroom_id" defaultValue={defaultClassroomId} />

            <div>
              <label className="mb-2 block text-sm text-white/60">Child</label>
              <select
                name="child_id"
                defaultValue={defaultChildId}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
              >
                {children?.map((child) => (
                  <option key={child.id} value={child.id}>
                    {fullChildName(child.first_name, child.last_name)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">Category</label>
              <select
                name="category"
                defaultValue="activity"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
              >
                <option value="activity">Activity</option>
                <option value="meal">Meal</option>
                <option value="nap">Nap</option>
                <option value="mood">Mood</option>
                <option value="milestone">Milestone</option>
                <option value="behavior">Behavior</option>
                <option value="learning">Learning</option>
                <option value="health">Health</option>
                <option value="bathroom">Bathroom</option>
                <option value="photo">Photo</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">Title</label>
              <input
                name="title"
                placeholder="Circle time confidence"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/60">Observation note</label>
              <textarea
                name="note"
                placeholder="Shared ideas clearly, helped peers clean up, and stayed engaged during reading."
                className="min-h-36 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/60">Happiness level</label>
                <select
                  name="happiness_level"
                  defaultValue="4"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm text-white/60">Learning tags</label>
                <input
                  name="learned_tags"
                  placeholder="language, teamwork, counting"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
                />
              </div>
            </div>

            <button className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:scale-[1.01]">
              Save observation
            </button>
          </form>
          )}
        </GlassCard>

        <div className="grid gap-6">
          <GlassCard className="p-6">
            <div className="mb-4 text-sm uppercase tracking-[0.22em] text-white/45">Children</div>
            <div className="grid gap-3 md:grid-cols-2">
              {children?.map((child) => (
                <div key={child.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-lg font-semibold">{fullChildName(child.first_name, child.last_name)}</div>
                  <div className="mt-1 text-sm text-white/55">Baseline happiness {child.happiness_baseline ?? "—"}/5</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="mb-4 text-sm uppercase tracking-[0.22em] text-white/45">Latest observations</div>
            <div className="grid gap-3">
              {observations?.length ? (
                observations.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">{item.category}</div>
                      <div className="text-xs text-white/45">{new Date(item.occurred_at).toLocaleString()}</div>
                    </div>
                    <div className="mt-2 text-lg font-semibold">{item.title}</div>
                    <div className="mt-2 text-sm leading-6 text-white/65">{item.note}</div>
                    {item.learned_tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.learned_tags.map((tag: string) => (
                          <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                  No observations yet.
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageShell>
  )
}
