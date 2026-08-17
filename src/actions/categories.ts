"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { categorySchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";

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
  revalidatePath("/admin/categorias");
}

export async function createCategoryAction(raw: unknown) {
  const { supabase } = await requireAdmin();
  const source = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const parsed = categorySchema.parse({
    ...source,
    slug: (source.slug as string | undefined) || slugify((source.name as string) || ""),
  });
  const payload = {
    ...parsed,
    image_url: parsed.image_url || null,
    cover_image_url: parsed.cover_image_url || null,
  };
  const { data, error } = await supabase.from("categories").insert(payload).select("*").single();
  if (error) throw new Error(error.message);
  revalidateAll();
  return data;
}

export async function updateCategoryAction(id: string, raw: unknown) {
  const { supabase } = await requireAdmin();
  const parsed = categorySchema.parse(raw);
  const payload = {
    ...parsed,
    image_url: parsed.image_url || null,
    cover_image_url: parsed.cover_image_url || null,
  };
  const { data, error } = await supabase
    .from("categories")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  revalidateAll();
  return data;
}

export async function toggleCategoryActiveAction(id: string, isActive: boolean) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("categories").update({ is_active: isActive }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateAll();
}

export async function deleteCategoryAction(params: {
  id: string;
  mode: "deactivate" | "move" | "delete-with-products";
  moveToCategoryId?: string;
}) {
  const { supabase } = await requireAdmin();

  if (params.mode === "deactivate") {
    const { error } = await supabase
      .from("categories")
      .update({ is_active: false })
      .eq("id", params.id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return;
  }

  if (params.mode === "move") {
    if (!params.moveToCategoryId) throw new Error("Selecciona categoría destino");
    const { error: moveError } = await supabase
      .from("products")
      .update({ category_id: params.moveToCategoryId })
      .eq("category_id", params.id);
    if (moveError) throw new Error(moveError.message);
    const { error } = await supabase.from("categories").delete().eq("id", params.id);
    if (error) throw new Error(error.message);
    revalidateAll();
    return;
  }

  const { error: productsError } = await supabase
    .from("products")
    .delete()
    .eq("category_id", params.id);
  if (productsError) throw new Error(productsError.message);
  const { error } = await supabase.from("categories").delete().eq("id", params.id);
  if (error) throw new Error(error.message);
  revalidateAll();
}
