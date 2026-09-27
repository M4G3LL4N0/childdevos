export default function GlowCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/20 to-white/5">
      <div className="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 shadow-[0_0_80px_rgba(0,0,0,0.6)]">
        {children}
      </div>
    </div>
  )
}
