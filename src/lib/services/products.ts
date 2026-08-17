import { createClient } from "@/lib/supabase/server";
import { isMockDataEnabled, mockProducts } from "@/lib/mock-data";
import type { Product } from "@/types/database";

export type ProductFilters = {
  search?: string;
  categoryId?: string;
  stockStatus?: string;
  activeOnly?: boolean;
  includeDeleted?: boolean;
  sort?: "price_asc" | "price_desc" | "name" | "newest" | "order";
  page?: number;
  pageSize?: number;
};

export async function getPublicProducts() {
  if (isMockDataEnabled()) {
    return mockProducts;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("is_active", true)
    .eq("is_deleted", false)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return (data || []) as Product[];
}

export async function getAdminProducts(filters: ProductFilters = {}) {
  if (isMockDataEnabled()) {
    return {
      items: mockProducts,
      total: mockProducts.length,
      page: filters.page || 1,
      pageSize: filters.pageSize || 20,
    };
  }

  const supabase = await createClient();
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("products")
    .select("*, category:categories(*)", { count: "exact" });

  if (!filters.includeDeleted) {
    query = query.eq("is_deleted", false);
  }
  if (filters.activeOnly) {
    query = query.eq("is_active", true);
  }
  if (filters.categoryId) {
    query = query.eq("category_id", filters.categoryId);
  }
  if (filters.stockStatus) {
    query = query.eq("stock_status", filters.stockStatus);
  }
  if (filters.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,material.ilike.%${filters.search}%,slug.ilike.%${filters.search}%`,
    );
  }

  switch (filters.sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "name":
      query = query.order("name", { ascending: true });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    default:
      query = query.order("display_order", { ascending: true });
  }

  const { data, error, count } = await query.range(from, to);
  if (error) throw error;

  return {
    items: (data || []) as Product[],
    total: count || 0,
    page,
    pageSize,
  };
}

export async function getProductById(id: string) {
  if (isMockDataEnabled()) {
    return mockProducts.find((product) => product.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as Product | null;
}

export async function getProductBySlug(slug: string) {
  if (isMockDataEnabled()) {
    return mockProducts.find((product) => product.slug === slug) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("slug", slug)
    .eq("is_deleted", false)
    .maybeSingle();
  if (error) throw error;
  return data as Product | null;
}
