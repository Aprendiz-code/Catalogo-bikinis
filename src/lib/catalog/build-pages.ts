import { chunkArray } from "@/lib/utils";
import type {
  CatalogPage,
  CatalogSettings,
  Category,
  FlipbookPage,
  Product,
} from "@/types/database";

export function buildFlipbookPages(params: {
  settings: CatalogSettings;
  editorialPages: CatalogPage[];
  categories: Category[];
  products: Product[];
}): FlipbookPage[] {
  const { settings, editorialPages, categories, products } = params;
  const pages: FlipbookPage[] = [];

  const byType = (type: CatalogPage["page_type"]) =>
    editorialPages
      .filter((p) => p.page_type === type && p.is_active)
      .sort((a, b) => a.display_order - b.display_order);

  for (const page of byType("cover")) {
    const featuredIds = (page.content?.featuredProductIds as string[] | undefined) || [];
    const featured =
      featuredIds.length > 0
        ? products.filter((p) => featuredIds.includes(p.id)).slice(0, 3)
        : products.filter((p) => p.is_featured).slice(0, 3);

    pages.push({
      kind: "editorial",
      key: `cover-${page.id}`,
      page,
      settings,
      products: featured,
      categories,
    });
  }

  for (const page of byType("about")) {
    pages.push({
      kind: "editorial",
      key: `about-${page.id}`,
      page,
      settings,
    });
  }

  for (const page of byType("categories")) {
    pages.push({
      kind: "editorial",
      key: `categories-${page.id}`,
      page,
      settings,
      categories,
      products,
    });
  }

  const activeCategories = categories
    .filter((c) => c.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  for (const category of activeCategories) {
    const categoryProducts = products
      .filter((p) => p.category_id === category.id && p.is_active && !p.is_deleted)
      .sort((a, b) => a.display_order - b.display_order);

    if (categoryProducts.length === 0 && !settings.show_empty_categories) {
      continue;
    }

    const perPage = category.products_per_page || settings.products_per_page || 3;
    const chunks =
      categoryProducts.length === 0 ? [[]] : chunkArray(categoryProducts, perPage);

    chunks.forEach((chunk, index) => {
      pages.push({
        kind: "category",
        key: `category-${category.id}-${index}`,
        category,
        products: chunk,
        pageIndex: index + 1,
        totalPages: chunks.length,
        settings,
      });
    });
  }

  for (const page of [...byType("contact"), ...byType("closing"), ...byType("custom")]) {
    pages.push({
      kind: "editorial",
      key: `${page.page_type}-${page.id}`,
      page,
      settings,
      categories,
    });
  }

  return pages;
}
