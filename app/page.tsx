import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ChildDevOS — observations that become parent-ready reports",
  description:
    "ChildDevOS helps childcare centers log structured teacher observations and turn them into parent-ready reports and a longitudinal child profile. Assistive insights, not medical advice.",
};

const categories = ["Activity", "Language", "Social", "Motor", "Care"];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fff7ef] text-[#2a1a12]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          ChildDevOS
        </Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/dashboard/parent" className="text-[#6b4a38] hover:underline">
            Parent view
          </Link>
          <Link
            href="/dashboard/teacher"
            className="rounded-full bg-[#c45c26] px-4 py-2 font-semibold text-white"
          >
            Open teacher log
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <section className="grid items-start gap-10 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c45c26]">
              Childcare intelligence
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              Log the day in seconds. Send home a report parents can actually read.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5a4032] sm:text-lg">
              Teachers capture structured observations. The system drafts a
              parent-ready daily report and keeps a longitudinal profile over
              time. Insights are assistive — not a diagnosis, not medical advice.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard/teacher"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#2a1a12] px-6 text-sm font-semibold text-[#fff7ef]"
              >
                Open the teacher dashboard
              </Link>
              <a
                href="mailto:?subject=ChildDevOS%20center%20briefing&body=I%20run%20or%20advise%20a%20childcare%20center%20and%20want%20a%20briefing."
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#2a1a12]/20 px-6 text-sm font-semibold"
              >
                Request a center briefing
              </a>
            </div>
          </div>

          <aside
            aria-label="Example observation card"
            className="rounded-[28px] border border-[#e8d3c0] bg-white p-5 shadow-[0_20px_50px_rgba(80,40,10,0.08)]"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#a07860]">
              Example observation — labeled demo
            </p>
            <h2 className="mt-2 text-xl font-semibold">Block-area language</h2>
            <p className="mt-3 text-sm leading-6 text-[#5a4032]">
              Teacher note fields in the product: category, title, what happened,
              optional happiness level, and learned tags. This card is a sample
              layout, not a real child record.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-[#fff1e4] px-3 py-1 text-xs font-semibold text-[#8a4b24]"
                >
                  {c}
                </span>
              ))}
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-[#fff7ef] p-3">
                <dt className="text-xs uppercase tracking-[0.16em] text-[#a07860]">Teacher</dt>
                <dd className="mt-1 font-medium">Quick structured log</dd>
              </div>
              <div className="rounded-2xl bg-[#fff7ef] p-3">
                <dt className="text-xs uppercase tracking-[0.16em] text-[#a07860]">Parent</dt>
                <dd className="mt-1 font-medium">Daily report view</dd>
              </div>
            </dl>
            <div className="mt-5 rounded-2xl border border-dashed border-[#e8d3c0] bg-[#fffaf5] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#a07860]">
                Draft report preview — not a real child
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5a4032]">
                “Used new words while building with a peer. Shared blocks after a
                prompt. Assistive summary only — staff still reviews before send.”
              </p>
            </div>
          </aside>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c45c26]">
            The problem
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Parents deserve clarity. Teachers deserve speed.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5a4032]">
            Daily updates are often fragmented, rushed, and inconsistent.
            ChildDevOS makes structured observations fast so centers can send
            meaningful parent communication without extra admin.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            [
              "Structured observations",
              "Fast entries during the day that stay attached to one child over time.",
            ],
            [
              "Parent-ready reports",
              "Daily summaries drafted from the logs so pickup is not a scramble.",
            ],
            [
              "Longitudinal profile",
              "A center-owned development record — assistive context, not a diagnosis.",
            ],
          ].map(([title, body]) => (
            <article key={title} className="rounded-3xl border border-[#e8d3c0] bg-white p-6">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#5a4032]">{body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c45c26]">
            How it works
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Teacher input becomes center-grade intelligence.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5a4032]">
            The loop is log → organize → report. Over time the same records
            support weekly, monthly, quarterly, and yearly views.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              ["1) Log", "Teachers capture category, title, note, optional happiness, and learning tags."],
              ["2) Organize", "Observations attach to a child, classroom, and center over time."],
              ["3) Report", "Parents see a daily report with assistive insights — not a diagnosis."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-3xl border border-[#e8d3c0] bg-white p-6">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#5a4032]">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c45c26]">
            MVP surfaces
          </p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
            Two dashboards. One shared record.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl border border-[#e8d3c0] bg-white p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#a07860]">Teacher</p>
              <h2 className="mt-2 text-xl font-semibold">Log observations in seconds</h2>
              <p className="mt-3 text-sm leading-6 text-[#5a4032]">
                Capture classroom moments without slowing down the day.
              </p>
              <Link
                href="/dashboard/teacher"
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-[#c45c26]"
              >
                Open teacher dashboard
              </Link>
            </article>
            <article className="rounded-3xl border border-[#e8d3c0] bg-white p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#a07860]">Parent</p>
              <h2 className="mt-2 text-xl font-semibold">Receive a daily report</h2>
              <p className="mt-3 text-sm leading-6 text-[#5a4032]">
                A readable summary from the day&apos;s logs — assistive, not medical.
              </p>
              <Link
                href="/dashboard/parent"
                className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-[#c45c26]"
              >
                Open parent dashboard
              </Link>
            </article>
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-[#e8d3c0] bg-white p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#a07860]">Roadmap</p>
          <h2 className="mt-2 text-2xl font-semibold">Weekly, monthly, quarterly, yearly</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5a4032]">
            ChildDevOS is designed for longitudinal development context: trends,
            focus areas, and center-owned reporting — while staying
            privacy-conscious and avoiding medical diagnosis claims.
          </p>
        </section>
      </main>

      <footer className="border-t border-[#e8d3c0] px-4 py-8 text-center text-xs text-[#8a6a58] sm:px-6">
        ChildDevOS · assistive developmental insights · not medical advice
      </footer>
    </div>
  );
}
