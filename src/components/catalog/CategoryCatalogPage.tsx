"use client";

import { ProductEditorialCard } from "@/components/catalog/ProductEditorialCard";
import type { Category, Product } from "@/types/database";

type Props = {
  category: Category;
  products: Product[];
  pageIndex?: number;
  totalPages?: number;
};

export function CategoryCatalogPage({
  category,
  products,
  pageIndex = 1,
  totalPages = 1,
}: Props) {
  return (
    <div
      className="catalog-outer category-page h-full"
      data-category={category.slug}
      style={{ backgroundColor: category.background_color }}
    >
      <div className="catalog-sheet min-h-0 px-[6%] py-[5%]" style={{ color: category.text_color }}>
        <header className="catalog-header mb-[4%] text-center">
          <h2 className="display-title text-[clamp(2.1rem,4vw,4.4rem)] uppercase tracking-[-0.04em]">
            {category.name}
          </h2>
          {totalPages > 1 ? (
            <p className="mt-1 text-xs tracking-[0.2em] text-brand-muted">
              {pageIndex} / {totalPages}
            </p>
          ) : null}
        </header>

        <div
          className="products-container flex min-h-0 flex-1 flex-col gap-[4%]"
          style={{ "--product-count": Math.max(products.length, 1) } as React.CSSProperties}
        >
          {products.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-center text-sm text-brand-muted">
              Próximamente productos en esta categoría.
            </div>
          ) : (
            products.map((product) => (
              <ProductEditorialCard
                key={product.id}
                product={product}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
