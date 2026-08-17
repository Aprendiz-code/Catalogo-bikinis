-- =============================================================================
-- Catalogo digital - Migración inicial
-- Ejecutar en Supabase SQL Editor (en orden: esta migración, luego seed)
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Función reutilizable updated_at
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- categories
-- -----------------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  storage_path text,
  cover_image_url text,
  background_color text not null default '#E8FF88',
  text_color text not null default '#405352',
  layout_variant text not null default 'image-left'
    check (layout_variant in ('image-left', 'image-right', 'auto')),
  products_per_page integer check (products_per_page is null or products_per_page > 0),
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists categories_active_order_idx
  on public.categories (is_active, display_order);
create index if not exists categories_slug_idx on public.categories (slug);

create trigger categories_set_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- products
-- -----------------------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete restrict,
  name text not null,
  slug text unique not null,
  material text,
  short_description text,
  description text,
  price numeric(12, 2) not null check (price >= 0),
  compare_price numeric(12, 2) check (compare_price is null or compare_price >= 0),
  sizes text[] not null default '{}',
  image_url text,
  storage_path text,
  gallery jsonb not null default '[]'::jsonb,
  badge text check (
    badge is null
    or badge in ('Nuevo', 'Oferta', 'Agotado', 'Últimas unidades')
  ),
  stock_status text not null default 'available'
    check (stock_status in ('available', 'low', 'out_of_stock')),
  purchase_url text,
  whatsapp_message text,
  layout_variant text not null default 'auto'
    check (layout_variant in ('image-left', 'image-right', 'auto')),
  is_active boolean not null default true,
  is_featured boolean not null default false,
  is_deleted boolean not null default false,
  deleted_at timestamptz,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_order_idx
  on public.products (category_id, is_active, is_deleted, display_order);
create index if not exists products_slug_idx on public.products (slug);
create index if not exists products_search_idx
  on public.products using gin (to_tsvector('spanish', coalesce(name, '') || ' ' || coalesce(material, '')));
create index if not exists products_stock_idx on public.products (stock_status);
create index if not exists products_featured_idx on public.products (is_featured) where is_featured = true;

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- catalog_pages (editoriales)
-- -----------------------------------------------------------------------------
create table if not exists public.catalog_pages (
  id uuid primary key default gen_random_uuid(),
  page_type text not null
    check (page_type in ('cover', 'about', 'categories', 'contact', 'closing', 'custom')),
  slug text unique not null,
  title text,
  subtitle text,
  body text,
  background_color text not null default '#FFF9C9',
  text_color text not null default '#405352',
  background_image_url text,
  background_storage_path text,
  images jsonb not null default '[]'::jsonb,
  content jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists catalog_pages_type_order_idx
  on public.catalog_pages (page_type, is_active, display_order);

create trigger catalog_pages_set_updated_at
  before update on public.catalog_pages
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- catalog_settings
-- -----------------------------------------------------------------------------
create table if not exists public.catalog_settings (
  id uuid primary key default gen_random_uuid(),
  brand_name text not null,
  collection_name text,
  subtitle text,
  logo_url text,
  logo_storage_path text,
  cover_image_url text,
  website text,
  instagram text,
  phone text,
  whatsapp text,
  primary_color text not null default '#405352',
  secondary_color text not null default '#FFFFFF',
  default_background_color text not null default '#E8FF88',
  heading_font text,
  body_font text,
  products_per_page integer not null default 3 check (products_per_page > 0),
  catalog_width integer not null default 768,
  catalog_height integer not null default 1080,
  show_empty_categories boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger catalog_settings_set_updated_at
  before update on public.catalog_settings
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- admin_profiles
-- -----------------------------------------------------------------------------
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- Helper: ¿es administrador?
-- -----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

-- -----------------------------------------------------------------------------
-- RLS
-- -----------------------------------------------------------------------------
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.catalog_pages enable row level security;
alter table public.catalog_settings enable row level security;
alter table public.admin_profiles enable row level security;

-- categories
drop policy if exists "Public read active categories" on public.categories;
create policy "Public read active categories"
  on public.categories for select
  using (is_active = true or public.is_admin());

drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories"
  on public.categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- products
drop policy if exists "Public read active products" on public.products;
create policy "Public read active products"
  on public.products for select
  using (
    (is_active = true and is_deleted = false)
    or public.is_admin()
  );

drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

-- catalog_pages
drop policy if exists "Public read active pages" on public.catalog_pages;
create policy "Public read active pages"
  on public.catalog_pages for select
  using (is_active = true or public.is_admin());

drop policy if exists "Admins manage pages" on public.catalog_pages;
create policy "Admins manage pages"
  on public.catalog_pages for all
  using (public.is_admin())
  with check (public.is_admin());

-- catalog_settings
drop policy if exists "Public read settings" on public.catalog_settings;
create policy "Public read settings"
  on public.catalog_settings for select
  using (true);

drop policy if exists "Admins manage settings" on public.catalog_settings;
create policy "Admins manage settings"
  on public.catalog_settings for all
  using (public.is_admin())
  with check (public.is_admin());

-- admin_profiles
drop policy if exists "Admins read profiles" on public.admin_profiles;
create policy "Admins read profiles"
  on public.admin_profiles for select
  using (auth.uid() = id or public.is_admin());

drop policy if exists "Admins update own profile" on public.admin_profiles;
create policy "Admins update own profile"
  on public.admin_profiles for update
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

-- -----------------------------------------------------------------------------
-- Storage bucket + policies
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'catalog-images',
  'catalog-images',
  true,
  5242880,
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public read catalog images" on storage.objects;
create policy "Public read catalog images"
  on storage.objects for select
  using (bucket_id = 'catalog-images');

drop policy if exists "Admins upload catalog images" on storage.objects;
create policy "Admins upload catalog images"
  on storage.objects for insert
  with check (bucket_id = 'catalog-images' and public.is_admin());

drop policy if exists "Admins update catalog images" on storage.objects;
create policy "Admins update catalog images"
  on storage.objects for update
  using (bucket_id = 'catalog-images' and public.is_admin())
  with check (bucket_id = 'catalog-images' and public.is_admin());

drop policy if exists "Admins delete catalog images" on storage.objects;
create policy "Admins delete catalog images"
  on storage.objects for delete
  using (bucket_id = 'catalog-images' and public.is_admin());
