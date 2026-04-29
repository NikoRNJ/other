create extension if not exists pgcrypto;

create type social_network as enum ('instagram', 'facebook');
create type post_status as enum ('draft', 'scheduled', 'published', 'failed');
create type message_intent as enum ('price', 'interest', 'support', 'spam', 'unknown');

create table if not exists brand_settings (
  id uuid primary key default gen_random_uuid(),
  brand_name text not null default 'IronStack Studio',
  voice text not null,
  whatsapp_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists social_accounts (
  id uuid primary key default gen_random_uuid(),
  network social_network not null,
  external_account_id text,
  display_name text,
  access_token_encrypted text,
  is_connected boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  base_idea text not null,
  caption text,
  short_version text,
  hashtags text[] not null default '{}',
  cta text,
  networks social_network[] not null default '{}',
  media_url text,
  link_url text,
  status post_status not null default 'draft',
  scheduled_at timestamptz,
  published_at timestamptz,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists incoming_messages (
  id uuid primary key default gen_random_uuid(),
  network social_network not null,
  external_message_id text,
  author_name text,
  author_external_id text,
  text text not null,
  intent message_intent not null default 'unknown',
  suggested_reply text,
  is_lead boolean not null default false,
  approved_reply text,
  replied_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  source_message_id uuid references incoming_messages(id) on delete set null,
  name text,
  contact text,
  business_type text,
  need text,
  status text not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists publishing_logs (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade,
  network social_network not null,
  success boolean not null default false,
  request_payload jsonb,
  response_payload jsonb,
  error_message text,
  created_at timestamptz not null default now()
);

insert into brand_settings (voice, whatsapp_url)
values (
  'Profesional, serio, breve, claro, humano, directo, seguro y sin tecnicismos innecesarios. Enfocado en explicar cómo una web ayuda a verse más confiable, recibir contactos y ordenar el negocio.',
  'https://wa.me/56900000000'
)
on conflict do nothing;
