create schema if not exists childdevos;

create extension if not exists pgcrypto;

create table if not exists childdevos.centers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table if not exists childdevos.classrooms (
  id uuid primary key default gen_random_uuid(),
  center_id uuid not null references childdevos.centers(id) on delete cascade,
  name text not null,
  age_group text,
  created_at timestamptz not null default now()
);

create table if not exists childdevos.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique,
  role text not null check (role in ('admin','teacher','parent')),
  created_at timestamptz not null default now()
);

create table if not exists childdevos.children (
  id uuid primary key default gen_random_uuid(),
  center_id uuid not null references childdevos.centers(id) on delete cascade,
  classroom_id uuid references childdevos.classrooms(id) on delete set null,
  first_name text not null,
  last_name text not null,
  birth_date date,
  happiness_baseline integer default 3 check (happiness_baseline between 1 and 5),
  created_at timestamptz not null default now()
);

create table if not exists childdevos.child_enrollments (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references childdevos.children(id) on delete cascade,
  parent_profile_id uuid references childdevos.profiles(id) on delete cascade,
  relation text default 'parent',
  created_at timestamptz not null default now(),
  unique (child_id, parent_profile_id)
);

create table if not exists childdevos.observations (
  id uuid primary key default gen_random_uuid(),
  center_id uuid not null references childdevos.centers(id) on delete cascade,
  classroom_id uuid references childdevos.classrooms(id) on delete set null,
  child_id uuid not null references childdevos.children(id) on delete cascade,
  teacher_profile_id uuid references childdevos.profiles(id) on delete set null,
  category text not null check (category in ('activity','meal','nap','mood','milestone','behavior','learning','health','bathroom','photo')),
  title text not null,
  note text not null,
  happiness_level integer check (happiness_level between 1 and 5),
  learned_tags text[] not null default '{}',
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists observations_child_id_occurred_at_idx on childdevos.observations (child_id, occurred_at desc);
create index if not exists observations_center_id_occurred_at_idx on childdevos.observations (center_id, occurred_at desc);

create table if not exists childdevos.daily_reports (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references childdevos.children(id) on delete cascade,
  report_date date not null,
  summary text not null,
  happiness_avg numeric(4,2),
  learning_focus text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (child_id, report_date)
);

create or replace function childdevos.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_daily_reports_updated_at on childdevos.daily_reports;
create trigger trg_daily_reports_updated_at
before update on childdevos.daily_reports
for each row
execute function childdevos.set_updated_at();

alter table childdevos.centers enable row level security;
alter table childdevos.classrooms enable row level security;
alter table childdevos.profiles enable row level security;
alter table childdevos.children enable row level security;
alter table childdevos.child_enrollments enable row level security;
alter table childdevos.observations enable row level security;
alter table childdevos.daily_reports enable row level security;

-- MVP/demo policies:
-- These policies are intentionally permissive for local demos and prototyping.
-- Before production childcare data, replace with strict tenant-aware, role-based policies.
drop policy if exists centers_all_access on childdevos.centers;
create policy centers_all_access on childdevos.centers for all to anon, authenticated using (true) with check (true);

drop policy if exists classrooms_all_access on childdevos.classrooms;
create policy classrooms_all_access on childdevos.classrooms for all to anon, authenticated using (true) with check (true);

drop policy if exists profiles_all_access on childdevos.profiles;
create policy profiles_all_access on childdevos.profiles for all to anon, authenticated using (true) with check (true);

drop policy if exists children_all_access on childdevos.children;
create policy children_all_access on childdevos.children for all to anon, authenticated using (true) with check (true);

drop policy if exists child_enrollments_all_access on childdevos.child_enrollments;
create policy child_enrollments_all_access on childdevos.child_enrollments for all to anon, authenticated using (true) with check (true);

drop policy if exists observations_all_access on childdevos.observations;
create policy observations_all_access on childdevos.observations for all to anon, authenticated using (true) with check (true);

drop policy if exists daily_reports_all_access on childdevos.daily_reports;
create policy daily_reports_all_access on childdevos.daily_reports for all to anon, authenticated using (true) with check (true);

insert into childdevos.centers (name, slug)
values ('ChildDevOS Demo Center', 'childdevos-demo')
on conflict (slug) do nothing;

with selected_center as (
  select id from childdevos.centers where slug = 'childdevos-demo' limit 1
)
insert into childdevos.classrooms (center_id, name, age_group)
select id, 'Sun Room', '3-4 years' from selected_center
where not exists (
  select 1 from childdevos.classrooms where name = 'Sun Room'
);

insert into childdevos.profiles (full_name, email, role)
values
  ('Ava Teacher', 'ava.teacher@childdevos.local', 'teacher'),
  ('Noah Parent', 'noah.parent@childdevos.local', 'parent')
on conflict (email) do nothing;

with selected_center as (
  select id from childdevos.centers where slug = 'childdevos-demo' limit 1
),
selected_classroom as (
  select id from childdevos.classrooms where name = 'Sun Room' limit 1
)
insert into childdevos.children (center_id, classroom_id, first_name, last_name, birth_date, happiness_baseline)
select sc.id, cr.id, 'Emma', 'Rivera', current_date - interval '4 years', 4
from selected_center sc
cross join selected_classroom cr
where not exists (
  select 1 from childdevos.children where first_name = 'Emma' and last_name = 'Rivera'
);

with c as (
  select id from childdevos.children where first_name = 'Emma' and last_name = 'Rivera' limit 1
),
p as (
  select id from childdevos.profiles where email = 'noah.parent@childdevos.local' limit 1
)
insert into childdevos.child_enrollments (child_id, parent_profile_id, relation)
select c.id, p.id, 'parent'
from c cross join p
on conflict (child_id, parent_profile_id) do nothing;
