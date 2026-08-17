import { createClient } from "@/lib/supabase/server";
import { isMockDataEnabled, mockCategories } from "@/lib/mock-data";
import type { Category } from "@/types/database";

export async function getPublicCategories() {
  if (isMockDataEnabled()) {
    return mockCategories;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) throw error;
  return (data || []) as Category[];
}

export async function getAdminCategories(includeInactive = true) {
  if (isMockDataEnabled()) {
    return mockCategories;
  }

  const supabase = await createClient();
  let query = supabase.from("categories").select("*").order("display_order", { ascending: true });
  if (!includeInactive) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as Category[];
}

export async function getCategoryById(id: string) {
  if (isMockDataEnabled()) {
    return mockCategories.find((category) => category.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as Category | null;
}
