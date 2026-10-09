create type public.debt_type as enum ('owed_to_me', 'i_owe');

create table public.debts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    type public.debt_type not null,
    counterpart_name text not null,
    amount bigint not null,
    note text,
    due_date date,
    settled_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint debts_counterpart_name_length
        check (char_length(trim(counterpart_name)) between 1 and 100),
    constraint debts_amount_range
        check (amount > 0 and amount <= 9007199254740991),
    constraint debts_note_length
        check (note is null or char_length(note) <= 200)
);

create index debts_user_id_idx on public.debts(user_id);
create index debts_user_status_idx on public.debts(user_id, settled_at);
create index debts_user_type_idx on public.debts(user_id, type);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger debts_set_updated_at
before update on public.debts
for each row execute function public.set_updated_at();

alter table public.debts enable row level security;

revoke all on table public.debts from anon;
grant select, insert, update, delete on table public.debts to authenticated;

create policy "Users can read their own debts"
on public.debts for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own debts"
on public.debts for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own debts"
on public.debts for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own debts"
on public.debts for delete
to authenticated
using ((select auth.uid()) = user_id);