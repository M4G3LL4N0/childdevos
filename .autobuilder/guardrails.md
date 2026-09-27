# ChildDevOS Guardrails

## Product Truth
- ChildDevOS is an AI-powered childcare intelligence platform.
- It is an operating layer for structured observations, parent-ready reporting, and longitudinal development context.
- AI is assistive and reporting-oriented, not medical diagnosis.

## Public Positioning
- Use: assistive developmental insights, structured observations, parent-ready reports, center operating layer, longitudinal child development profile.
- Keep messaging premium, trustworthy, warm, and operationally serious.

## Do Not Expose
- Autobuilder internals.
- Private founder context.
- API keys or sensitive credentials.
- Claims of diagnosis, surveillance, or guaranteed outcomes.

## Do Not Delete
- `supabase/childdevos_schema.sql`
- `app/dashboard/teacher`
- `app/dashboard/parent`
- `app/api/teacher/log`
- `app/api/reports/daily`
- `app/api/health`
- `lib/env.ts`, `lib/supabase-server.ts`, `lib/supabase-browser.ts`
- `AUTOBUILDER_FOUNDATION.json`
- `.autobuilder/*`

## Do Not Drift Toward
- Generic SaaS templates.
- Unrelated startup pivots.
- Surveillance framing.
- Medical diagnosis language.

## Safe Improvements
- UI polish with premium visual consistency.
- Accessibility upgrades.
- Clearer setup states and env guards.
- Schema-safe dashboard enhancements.
- Documentation and build reliability improvements.

## Risky Improvements
- Deleting schema-backed flows.
- Altering schema name from `childdevos`.
- Shipping permissive RLS to production.
- Auto-deploying or auto-pushing.

## Build Rules
- Use pnpm only.
- Do not use npm.
- Do not deploy automatically.
- Do not push automatically.
- Keep project ready for manual `vercel --prod`.
- Preserve Supabase schema `childdevos`.
