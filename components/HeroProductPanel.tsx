"use client";
export function HeroProductPanel() {
  return (
    <div className="relative w-full" aria-label="Product preview">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal-500/20 to-transparent blur-2xl" aria-hidden />
      <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 ring-1 ring-teal-500/20 backdrop-blur sm:p-6">
        <p className="text-xs font-semibold uppercase text-teal-300">Care pathway</p>
        <span className="ml-2 rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] text-teal-300">Clinical education UI</span>
        <div className="mt-4 grid grid-cols-3 gap-2"><div key="Sessions" className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><p className="text-[10px] uppercase text-slate-500">Sessions</p><p className="mt-0.5 text-sm font-semibold text-white">12</p></div><div key="Goals" className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><p className="text-[10px] uppercase text-slate-500">Goals</p><p className="mt-0.5 text-sm font-semibold text-white">4</p></div><div key="Progress" className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><p className="text-[10px] uppercase text-slate-500">Progress</p><p className="mt-0.5 text-sm font-semibold text-white">On track</p></div></div>
        <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-3 space-y-2"><div key="Intake" className="flex items-center gap-2 text-xs text-slate-300"><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[10px]">1</span>Intake</div><div key="Plan" className="flex items-center gap-2 text-xs text-slate-300"><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[10px]">2</span>Plan</div><div key="Check-in" className="flex items-center gap-2 text-xs text-slate-300"><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[10px]">3</span>Check-in</div><div key="Summary" className="flex items-center gap-2 text-xs text-slate-300"><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[10px]">4</span>Summary</div></div>
        <p className="mt-4 text-[10px] text-slate-500">Sample metrics — local review only.</p>
      </div>
    </div>
  );
}