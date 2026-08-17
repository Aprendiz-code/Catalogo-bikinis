"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isMockDataEnabled, mockCategories, mockProducts } from "@/lib/mock-data";
import { productSchema } from "@/lib/validations";
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
  return { supabase, user };
}

function revalidateCatalog() {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/catalogo/grid");
  revalidatePath("/admin");
  revalidatePath("/admin/productos");
}

export async function createProductAction(raw: unknown) {
  const source = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const parsed = productSchema.parse({
    ...source,
    slug: (source.slug as string | undefined) || slugify((source.name as string) || ""),
  });

  if (isMockDataEnabled()) {
    const newProduct = {
      ...parsed,
      id: `prod-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      image_url: parsed.image_url || null,
      purchase_url: parsed.purchase_url || null,
      compare_price: parsed.compare_price || null,
      sizes: parsed.sizes || [],
      gallery: parsed.gallery || [],
      storage_path: parsed.storage_path || null,
      material: parsed.material || null,
      short_description: parsed.short_description || null,
      description: parsed.description || null,
      whatsapp_message: parsed.whatsapp_message || null,
      is_deleted: false,
      deleted_at: null,
      display_order: Number(parsed.display_order ?? mockProducts.length + 1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: mockCategories.find((cat) => cat.id === parsed.category_id) || null,
    };

    mockProducts.unshift(newProduct as (typeof mockProducts)[number]);
    revalidateCatalog();
    return newProduct;
  }

  const { supabase } = await requireAdmin();
  const payload = {
    ...parsed,
    image_url: parsed.image_url || null,
    purchase_url: parsed.purchase_url || null,
    compare_price: parsed.compare_price || null,
  };

  const { data, error } = await supabase.from("products").insert(payload).select("*").single();
  if (error) throw new Error(error.message);
  revalidateCatalog();
  return data;
}

export async function updateProductAction(id: string, raw: unknown) {
  const parsed = productSchema.parse(raw);

  if (isMockDataEnabled()) {
    const index = mockProducts.findIndex((product) => product.id === id);
    if (index === -1) throw new Error("Producto no encontrado");

    const updated = {
      ...mockProducts[index],
      ...parsed,
      image_url: parsed.image_url || null,
      purchase_url: parsed.purchase_url || null,
      compare_price: parsed.compare_price || null,
      storage_path: parsed.storage_path || null,
      sizes: parsed.sizes || [],
      gallery: parsed.gallery || [],
      material: parsed.material || null,
      short_description: parsed.short_description || null,
      description: parsed.description || null,
      whatsapp_message: parsed.whatsapp_message || null,
      updated_at: new Date().toISOString(),
      category: mockCategories.find((cat) => cat.id === parsed.category_id) || mockProducts[index].category || null,
    };

    mockProducts[index] = updated;
    revalidateCatalog();
    return updated;
  }

  const { supabase } = await requireAdmin();
  const payload = {
    ...parsed,
    image_url: parsed.image_url || null,
    purchase_url: parsed.purchase_url || null,
    compare_price: parsed.compare_price || null,
  };

  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  revalidateCatalog();
  return data;
}

export async function toggleProductActiveAction(id: string, isActive: boolean) {
  if (isMockDataEnabled()) {
    const product = mockProducts.find((item) => item.id === id);
    if (!product) throw new Error("Producto no encontrado");
    product.is_active = isActive;
    product.updated_at = new Date().toISOString();
    revalidateCatalog();
    return;
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").update({ is_active: isActive }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCatalog();
}

export async function softDeleteProductAction(id: string) {
  if (isMockDataEnabled()) {
    const product = mockProducts.find((item) => item.id === id);
    if (!product) throw new Error("Producto no encontrado");
    product.is_deleted = true;
    product.is_active = false;
    product.deleted_at = new Date().toISOString();
    product.updated_at = new Date().toISOString();
    revalidateCatalog();
    return;
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("products")
    .update({ is_deleted: true, is_active: false, deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCatalog();
}

export async function restoreProductAction(id: string) {
  if (isMockDataEnabled()) {
    const product = mockProducts.find((item) => item.id === id);
    if (!product) throw new Error("Producto no encontrado");
    product.is_deleted = false;
    product.deleted_at = null;
    product.is_active = true;
    product.updated_at = new Date().toISOString();
    revalidateCatalog();
    return;
  }

  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("products")
    .update({ is_deleted: false, deleted_at: null, is_active: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCatalog();
}

export async function hardDeleteProductAction(id: string) {
  if (isMockDataEnabled()) {
    const index = mockProducts.findIndex((product) => product.id === id);
    if (index === -1) throw new Error("Producto no encontrado");
    mockProducts.splice(index, 1);
    revalidateCatalog();
    return;
  }

  const { supabase } = await requireAdmin();
  const { data: product } = await supabase
    .from("products")
    .select("storage_path, gallery")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);

  if (product?.storage_path) {
    await supabase.storage.from("catalog-images").remove([product.storage_path]);
  }
  const galleryPaths =
    (product?.gallery as { storage_path?: string }[] | null)?.map((g) => g.storage_path).filter(Boolean) ||
    [];
  if (galleryPaths.length) {
    await supabase.storage.from("catalog-images").remove(galleryPaths as string[]);
  }

  revalidateCatalog();
}

export async function duplicateProductAction(id: string) {
  const { supabase } = await requireAdmin();
  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error || !product) throw new Error(error?.message || "Producto no encontrado");

  const { id: _id, created_at, updated_at, deleted_at, ...rest } = product;
  const payload = {
    ...rest,
    name: `${product.name} (copia)`,
    slug: `${product.slug}-copia-${Date.now()}`,
    is_active: false,
    is_deleted: false,
    deleted_at: null,
  };

  const { data, error: insertError } = await supabase
    .from("products")
    .insert(payload)
    .select("*")
    .single();
  if (insertError) throw new Error(insertError.message);
  revalidateCatalog();
  return data;
}

export async function replaceProductAction(params: {
  id: string;
  data: unknown;
  mode: "update" | "duplicate-deactivate";
}) {
  const { supabase } = await requireAdmin();
  const parsed = productSchema.parse(params.data);

  if (params.mode === "update") {
    const { data, error } = await supabase
      .from("products")
      .update({
        ...parsed,
        image_url: parsed.image_url || null,
        purchase_url: parsed.purchase_url || null,
      })
      .eq("id", params.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    revalidateCatalog();
    return data;
  }

  const { data: original } = await supabase.from("products").select("*").eq("id", params.id).single();
  if (!original) throw new Error("Producto original no encontrado");

  await supabase
    .from("products")
    .update({ is_active: false })
    .eq("id", params.id);

  const { data, error } = await supabase
    .from("products")
    .insert({
      ...parsed,
      display_order: original.display_order,
      image_url: parsed.image_url || null,
      purchase_url: parsed.purchase_url || null,
    })
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  revalidateCatalog();
  return data;
}

export async function quickUpdateProductPriceAction(id: string, price: number) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").update({ price }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCatalog();
}

export async function quickUpdateProductStockAction(
  id: string,
  stock_status: "available" | "low" | "out_of_stock",
) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").update({ stock_status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCatalog();
}

export async function updateProductOrderAction(id: string, display_order: number) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("products").update({ display_order }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCatalog();
}
