import { AboutCollectionPage } from "@/components/catalog/AboutCollectionPage";
import { CatalogCover } from "@/components/catalog/CatalogCover";
import { CategoriesOverviewPage } from "@/components/catalog/CategoriesOverviewPage";
import { CategoryCatalogPage } from "@/components/catalog/CategoryCatalogPage";
import { ContactPage } from "@/components/catalog/ContactPage";
import type { FlipbookPage } from "@/types/database";

export function CatalogPageRenderer({ page }: { page: FlipbookPage }) {
  if (page.kind === "category") {
    return (
      <CategoryCatalogPage
        category={page.category}
        products={page.products}
        pageIndex={page.pageIndex}
        totalPages={page.totalPages}
      />
    );
  }

  switch (page.page.page_type) {
    case "cover":
      return (
        <CatalogCover page={page.page} settings={page.settings} products={page.products || []} />
      );
    case "about":
      return <AboutCollectionPage page={page.page} />;
    case "categories":
      return (
        <CategoriesOverviewPage page={page.page} categories={page.categories || []} />
      );
    case "contact":
    case "closing":
    case "custom":
    default:
      return <ContactPage page={page.page} settings={page.settings} />;
  }
}
