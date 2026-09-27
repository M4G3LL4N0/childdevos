import { ReactNode } from "react"

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(77,160,255,0.18),transparent_35%),linear-gradient(180deg,#06111f_0%,#030712_100%)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">{children}</div>
    </main>
  )
}

export function GlassCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  )
}
