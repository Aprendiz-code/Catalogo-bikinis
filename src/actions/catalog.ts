"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isMockDataEnabled } from "@/lib/mock-data";
import { catalogPageSchema, catalogSettingsSchema } from "@/lib/validations";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");
  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile) throw new Error("No autorizado");
  return { supabase };
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/catalogo/grid");
  revalidatePath("/admin/paginas");
  revalidatePath("/admin/configuracion");
}

export async function updateCatalogPageAction(id: string, raw: unknown) {
  const { supabase } = await requireAdmin();
  const parsed = catalogPageSchema.parse(raw);
  const payload = {
    ...parsed,
    background_image_url: parsed.background_image_url || null,
  };
  const { data, error } = await supabase
    .from("catalog_pages")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  revalidateAll();
  return data;
}

export async function createCatalogPageAction(raw: unknown) {
  const { supabase } = await requireAdmin();
  const parsed = catalogPageSchema.parse(raw);
  const { data, error } = await supabase.from("catalog_pages").insert(parsed).select("*").single();
  if (error) throw new Error(error.message);
  revalidateAll();
  return data;
}

export async function updateCatalogSettingsAction(id: string, raw: unknown) {
  const { supabase } = await requireAdmin();
  const parsed = catalogSettingsSchema.parse(raw);
  const payload = {
    ...parsed,
    logo_url: parsed.logo_url || null,
    cover_image_url: parsed.cover_image_url || null,
  };
  const { data, error } = await supabase
    .from("catalog_settings")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  revalidateAll();
  return data;
}

export async function signOutAction() {
  if (isMockDataEnabled()) {
    const cookieStore = await cookies();
    cookieStore.set("mock_admin_session", "", { path: "/", expires: new Date(0) });
    revalidatePath("/", "layout");
    return;
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}
