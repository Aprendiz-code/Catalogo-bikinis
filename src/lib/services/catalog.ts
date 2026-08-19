import { isMockDataEnabled, mockCatalogSettings, mockCategories, mockProducts, mockEditorialPages } from "@/lib/mock-data";
import type { CatalogPage } from "@/types/database";

export async function getCatalogSettings() {
  return isMockDataEnabled() ? mockCatalogSettings : null;
}

export async function getEditorialPages(activeOnly = true) {
  void activeOnly;
  return isMockDataEnabled() ? (mockEditorialPages as CatalogPage[]) : [];
}

export async function getCatalogPageById(id: string) {
  return isMockDataEnabled()
    ? (mockEditorialPages.find((page) => page.id === id) as CatalogPage | undefined) ?? null
    : null;
}

export async function getFullCatalogData() {
  return {
    settings: mockCatalogSettings,
    editorialPages: mockEditorialPages,
    categories: mockCategories,
    products: mockProducts,
  };
}
