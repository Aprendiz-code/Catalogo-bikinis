-- Crear administrador después de registrar el usuario en Auth
-- Reemplaza el UUID

insert into public.admin_profiles (id, full_name, role)
values ('00000000-0000-0000-0000-000000000000', 'Administrador', 'admin')
on conflict (id) do update set role = excluded.role;
