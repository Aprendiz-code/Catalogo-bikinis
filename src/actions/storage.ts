"use server";

import { createClient } from "@/lib/supabase/server";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/lib/utils";

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

export async function uploadCatalogImageAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const file = formData.get("file") as File | null;
  const folder = String(formData.get("folder") || "uploads");

  if (!file) throw new Error("Archivo requerido");
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Solo se permiten JPG, PNG o WebP");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("La imagen no puede superar 5MB");
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from("catalog-images").upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("catalog-images").getPublicUrl(path);

  return { url: publicUrl, storage_path: path };
}

export async function deleteCatalogImageAction(storagePath: string) {
  const { supabase } = await requireAdmin();
  if (!storagePath) return;
  const { error } = await supabase.storage.from("catalog-images").remove([storagePath]);
  if (error) throw new Error(error.message);
}

export async function listCatalogImagesAction(prefix = "") {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase.storage.from("catalog-images").list(prefix || undefined, {
    limit: 100,
    sortBy: { column: "created_at", order: "desc" },
  });
  if (error) throw new Error(error.message);
  return data || [];
}
