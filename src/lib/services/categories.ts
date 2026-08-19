import { isMockDataEnabled, mockCategories } from "@/lib/mock-data";

export async function getPublicCategories() {
  return isMockDataEnabled() ? mockCategories : [];
}

export async function getAdminCategories(includeInactive = true) {
  void includeInactive;
  return isMockDataEnabled() ? mockCategories : [];
}

export async function getCategoryById(id: string) {
  return isMockDataEnabled() ? mockCategories.find((category) => category.id === id) ?? null : null;
}
