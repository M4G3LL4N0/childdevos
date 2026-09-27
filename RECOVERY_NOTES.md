# Project Recovery Notes

## Startup Identity
- Startup name: ChildDevOS
- Project folder: /Users/joshuadavis/startups/childdevos
- Domain: not deployed (TBD)
- One-line description: AI operating system for childcare centers that turns classroom activity into parent reports and longitudinal child development intelligence.
- Category: childcare SaaS, edtech, parent communication, developmental intelligence
- Stage: MVP / recovery / demo-ready

## Product Vision
- Target user: childcare centers, preschools, daycare providers, teachers, admins, parents
- Core problem: fragmented classroom reporting and low parent visibility into day-to-day development signals
- Core solution: schema-based teacher observation logging and parent-ready daily reports
- Differentiation: operations + communication + longitudinal child development layer, not basic messaging software
- MVP goal: demo teacher logging + parent daily report flows with Supabase schema-backed data
- Long-term vision: weekly/monthly/quarterly/yearly reporting and safer assistive developmental insights

## Website/App Structure
- Main routes: `/`, `/dashboard/teacher`, `/dashboard/parent`
- Key components: premium background, hero, glow cards, venture cards, shared glass shell
- Data/content files: `supabase/childdevos_schema.sql`, `AUTOBUILDER_FOUNDATION.json`, `.autobuilder/*`
- API routes: `/api/teacher/log`, `/api/reports/daily`, `/api/health`
- Auth/database needs: Supabase schema `childdevos`; production role-based auth and strict RLS still required

## Design Direction
- Visual style: dark cinematic, glassmorphism, aurora glows, subtle grid, motion depth
- Tone: premium, warm, trustworthy, operator-grade
- Layout principles: responsive hierarchy, clean sectioning, visible CTAs, no clutter
- Brand notes: “One system for childhood development.” + assistive insight language only

## What Was Preserved
- Useful pages: homepage + teacher dashboard + parent dashboard
- Useful components: premium shell and card system
- Useful copy: ChildDevOS operating-system positioning and safe AI framing
- Useful assets: public assets and app route structure
- Useful technical decisions: pnpm-only + Supabase schema-first approach

## What Was Fixed
- Build issues: missing dashboard setup component created; Next turbopack root pinned
- TypeScript issues: removed explicit `any` usage in API/report helper code
- Dependency issues: pnpm install verified; no npm/yarn/bun lock drift found
- Routing issues: removed unrelated stale `/api/checkout` placeholder route
- Design/content issues: premium animated aurora background upgraded and setup UX hardened

## What Was Removed
- Generated artifacts: `node_modules`, `.next`
- Duplicate files: none
- Broken code: stale empty `lib/supabase.ts`
- Unused dependencies: none removed in this pass
- Large files: generated binary in `node_modules` removed during cleanup with directory purge

## Current Build Status
- pnpm install: pass
- pnpm lint: pass
- pnpm typecheck: not run (no `typecheck` script present)
- pnpm build: pass
- Vercel readiness: ready for manual deploy after reinstall

## Manual Deploy Command

cd /Users/joshuadavis/startups/childdevos
pnpm install
pnpm build
vercel --prod

## Return-Later Commands

cd /Users/joshuadavis/startups/childdevos
pnpm install
pnpm build

## Next Best Tasks
1. Add role-based auth for teacher/admin/parent.
2. Harden Supabase RLS for real childcare data.
3. Add child selector and parent-child permissions.
4. Add real AI report generation behind safe server route.
5. Add weekly/monthly/quarterly/yearly reports.

## Autobuilder Guardrails
- Do not use npm.
- Do not deploy automatically.
- Do not push automatically.
- Do not delete Supabase schema or app routes.
- Preserve schema-based ChildDevOS positioning.
- Avoid generic SaaS drift.

## Security/Policy Notes
- `supabase/childdevos_schema.sql` currently applies permissive MVP/demo RLS policies for anon/authenticated access.
- Production childcare data requires strict tenant and role-scoped RLS before launch.
