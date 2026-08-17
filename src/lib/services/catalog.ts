import { createClient } from "@/lib/supabase/server";
import { isMockDataEnabled, mockCatalogSettings, mockCategories, mockProducts, mockEditorialPages } from "@/lib/mock-data";
import type { CatalogPage, CatalogSettings } from "@/types/database";

export async function getCatalogSettings() {
  if (isMockDataEnabled()) {
    return mockCatalogSettings;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("catalog_settings").select("*").limit(1).maybeSingle();
  if (error) throw error;
  return data as CatalogSettings | null;
}

export async function getEditorialPages(activeOnly = true) {
  if (isMockDataEnabled()) {
    return mockEditorialPages as CatalogPage[];
  }

  const supabase = await createClient();
  let query = supabase.from("catalog_pages").select("*").order("display_order", { ascending: true });
  if (activeOnly) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as CatalogPage[];
}

export async function getCatalogPageById(id: string) {
  if (isMockDataEnabled()) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("catalog_pages").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as CatalogPage | null;
}

export async function getFullCatalogData() {
  if (isMockDataEnabled()) {
    return {
      settings: mockCatalogSettings,
      editorialPages: mockEditorialPages,
      categories: mockCategories,
      products: mockProducts,
    };
  }

  const [settings, editorialPages, categories, products] = await Promise.all([
    getCatalogSettings(),
    getEditorialPages(true),
    (await import("@/lib/services/categories")).getPublicCategories(),
    (await import("@/lib/services/products")).getPublicProducts(),
  ]);

  if (!settings) {
    throw new Error("Configura catalog_settings en Supabase antes de ver el catálogo.");
  }

  return { settings, editorialPages, categories, products };
}
