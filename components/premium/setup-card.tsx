import GlowCard from "@/components/premium/glow-card"
import { getSupabaseEnvStatus } from "@/lib/env"

export function SupabaseSetupCard() {
  const status = getSupabaseEnvStatus()
  const missing = !status.ok ? status.missing : []

  return (
    <GlowCard>
      <div className="text-sm uppercase tracking-[0.22em] text-white/45">Setup required</div>
      <h2 className="mt-2 text-2xl font-semibold">Connect Supabase to unlock dashboard data</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
        Add your project environment values and apply <span className="font-mono">supabase/childdevos_schema.sql</span>.
        ChildDevOS uses the <span className="font-mono">childdevos</span> schema for centers, classrooms, children, observations,
        and daily reports.
      </p>

      <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
        <div className="font-medium text-white/90">Required environment variables</div>
        <ul className="mt-2 space-y-1">
          <li>
            <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL</span>
          </li>
          <li>
            <span className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
          </li>
          <li>
            <span className="font-mono">NEXT_PUBLIC_SUPABASE_SCHEMA=childdevos</span>
          </li>
        </ul>
        {!status.ok ? (
          <div className="mt-3 text-xs text-amber-200">Missing or placeholder: {missing.join(", ")}</div>
        ) : null}
      </div>
    </GlowCard>
  )
}
