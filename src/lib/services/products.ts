import { isMockDataEnabled, mockProducts } from "@/lib/mock-data";

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
  return isMockDataEnabled() ? mockProducts : [];
}

export async function getAdminProducts(filters: ProductFilters = {}) {
  void filters;

  return {
    items: isMockDataEnabled() ? mockProducts : [],
    total: isMockDataEnabled() ? mockProducts.length : 0,
    page: filters.page || 1,
    pageSize: filters.pageSize || 20,
  };
}

export async function getProductById(id: string) {
  return isMockDataEnabled() ? mockProducts.find((product) => product.id === id) ?? null : null;
}

export async function getProductBySlug(slug: string) {
  return isMockDataEnabled() ? mockProducts.find((product) => product.slug === slug) ?? null : null;
}
