import { TrustStrip } from "@/components/TrustStrip";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { ProcessFlowSection } from "@/components/ProcessFlowSection";
import { HeroProductPanel } from "@/components/HeroProductPanel";
import PremiumBackground from "@/components/premium/background"
import Hero from "@/components/premium/hero"
import GlowCard from "@/components/premium/glow-card"
import VentureCard from "@/components/premium/venture-card"
import { PageShell } from "@/components/shell"
import { ArrowRight, BookOpen, Building2, ShieldCheck, Sparkles } from "lucide-react"

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs uppercase tracking-[0.32em] text-white/45">{eyebrow}</div>
      <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-4 text-sm md:text-base leading-7 text-white/65">{desc}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen text-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <TrustStrip />
        </div>

      <PremiumBackground />
      <PageShell>
        <Hero />

        <section className="pb-14 md:pb-20">
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow="The problem"
              title="Parents deserve clarity. Teachers deserve speed."
              desc="Daily updates are often fragmented, rushed, and inconsistent. ChildDevOS makes structured observations effortless, so centers can ship meaningful parent communication without adding admin burden."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <GlowCard>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <BookOpen className="h-5 w-5 text-orange-200" />
                  </div>
                  <div>
                    <div className="font-semibold">Structured observations</div>
                    <div className="mt-1 text-sm leading-6 text-white/65">
                      Quick entries throughout the day that become durable developmental context over time.
                    </div>
                  </div>
                </div>
              </GlowCard>

              <GlowCard>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Sparkles className="h-5 w-5 text-cyan-200" />
                  </div>
                  <div>
                    <div className="font-semibold">Parent-ready reporting</div>
                    <div className="mt-1 text-sm leading-6 text-white/65">
                      Daily summaries, happiness averages, and learning tags that feel thoughtful—not generic.
                    </div>
                  </div>
                </div>
              </GlowCard>

              <GlowCard>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-200" />
                  </div>
                  <div>
                    <div className="font-semibold">Privacy-conscious foundation</div>
                    <div className="mt-1 text-sm leading-6 text-white/65">
                      Built as an assistive intelligence layer, designed to avoid medical claims and surveillance language.
                    </div>
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <SectionTitle
            eyebrow="How it works"
            title="Teacher input becomes center-grade intelligence."
            desc="ChildDevOS starts with a simple loop: log → organize → report. Over time, the platform supports weekly, monthly, quarterly, and yearly views for longitudinal development context."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <VentureCard
              title="1) Log"
              desc="Teachers capture observations: category, title, note, happiness, and learning tags."
              color="from-orange-500/30 via-pink-500/20 to-white/5"
            />
            <VentureCard
              title="2) Organize"
              desc="Observations attach to children, classrooms, and centers inside the childdevos Supabase schema."
              color="from-cyan-500/25 via-blue-500/20 to-white/5"
            />
            <VentureCard
              title="3) Report"
              desc="Parents view daily reports with trends and focus areas—assistive insights, not diagnosis."
              color="from-emerald-500/25 via-teal-500/15 to-white/5"
            />
          </div>
        </section>

        <section className="py-14 md:py-20">
          <SectionTitle
            eyebrow="MVP surfaces"
            title="Two dashboards. One shared data model."
            desc="This demo focuses on the teacher logging workflow and the parent daily report experience, backed by the childdevos schema."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <GlowCard>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-[0.22em] text-white/45">Teacher</div>
                  <div className="mt-2 text-2xl font-semibold">Log observations in seconds</div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Capture classroom moments without slowing down the day.
                  </div>
                </div>
                <a
                  href="/dashboard/teacher"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium backdrop-blur-xl transition hover:bg-white/10"
                >
                  Open <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </GlowCard>

            <GlowCard>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm uppercase tracking-[0.22em] text-white/45">Parent</div>
                  <div className="mt-2 text-2xl font-semibold">Receive a daily report</div>
                  <div className="mt-2 text-sm leading-6 text-white/65">
                    Happiness averages, learning tags, and narrative summaries.
                  </div>
                </div>
                <a
                  href="/dashboard/parent"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium backdrop-blur-xl transition hover:bg-white/10"
                >
                  Open <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </GlowCard>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
              <GlowCard>
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Building2 className="h-5 w-5 text-white/80" />
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-[0.22em] text-white/45">Roadmap</div>
                    <div className="mt-2 text-2xl font-semibold">Weekly, monthly, quarterly, yearly</div>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      ChildDevOS is designed for longitudinal development context: trends, focus areas, and center-wide reporting—
                      while staying privacy-conscious and avoiding medical diagnosis claims.
                    </p>
                  </div>
                </div>
              </GlowCard>

              <GlowCard>
                <div className="text-sm uppercase tracking-[0.22em] text-white/45">Get started</div>
                <div className="mt-2 text-2xl font-semibold">Run the demo locally</div>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  Add Supabase env values, run the schema SQL, and open the dashboards.
                </p>
                <div className="mt-5 grid gap-3">
                  <a
                    href="/dashboard/teacher"
                    className="rounded-2xl bg-white px-5 py-3 text-center font-medium text-slate-950 transition hover:scale-[1.02]"
                  >
                    Open teacher dashboard
                  </a>
                  <a
                    href="/dashboard/parent"
                    className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-center font-medium text-white backdrop-blur-xl transition hover:bg-white/10"
                  >
                    Open parent dashboard
                  </a>
                </div>
              </GlowCard>
            </div>
          </div>
        </section>
      </PageShell>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6"><HeroProductPanel /></section>
      <ProcessFlowSection />
    <MarketingGraphicsStack />
    </main>
  )
}
