import Image from "next/image";
import Link from "next/link";
import type { CatalogPage, Category } from "@/types/database";

type Props = {
  page: CatalogPage;
  categories: Category[];
};

export function CategoriesOverviewPage({ page, categories }: Props) {
  const featuredSlug = (page.content?.featuredCategorySlug as string) || categories[0]?.slug;
  const featured = categories.find((c) => c.slug === featuredSlug) || categories[0];
  const images = page.images || [];
  const rows = [
    {
      text:
        featured?.description ||
        page.body ||
        "Descubre piezas pensadas para resaltar tu estilo con comodidad y frescura.",
      image: images[0]?.url || featured?.image_url || featured?.cover_image_url,
    },
    {
      text:
        "Encuentra el look perfecto para disfrutar del sol, la playa y los días más cálidos.",
      image: images[1]?.url || categories[1]?.image_url,
    },
    {
      text:
        "Luce increíble esta temporada con diseños creados para acompañarte en cada momento.",
      image: images[2]?.url || categories[2]?.image_url,
    },
  ];

  return (
    <div className="catalog-outer h-full" style={{ backgroundColor: page.background_color }}>
      <div className="catalog-sheet px-[7%] py-[6%]" style={{ color: page.text_color }}>
        <header className="mb-4 text-center">
          <h2 className="display-title">{page.title || "CATEGORÍAS"}</h2>
          <nav className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-display text-sm uppercase tracking-[0.12em]">
            {categories.map((category) => (
              <span key={category.id}>{category.name}</span>
            ))}
          </nav>
        </header>

        <div className="flex flex-1 flex-col justify-center gap-5">
          {rows.map((row, index) => {
            const imageLeft = index % 2 === 1;
            return (
              <div
                key={index}
                className={`grid items-center gap-4 md:grid-cols-2 ${imageLeft ? "" : ""}`}
              >
                <p
                  className={`text-center text-sm leading-relaxed md:text-[0.95rem] ${
                    imageLeft ? "md:order-2" : ""
                  }`}
                >
                  {row.text}
                </p>
                <div
                  className={`relative mx-auto aspect-[5/4] w-[88%] overflow-hidden rounded-tr-[3.5rem] bg-[#EEF3F2] ${
                    imageLeft ? "md:order-1" : ""
                  }`}
                >
                  {row.image ? (
                    <Image src={row.image} alt="" fill className="object-cover" sizes="320px" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#D6F0FF] to-[#FFD6E8] font-display text-xl uppercase tracking-widest text-brand-ink/40">
                      Editorial
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {featured ? (
          <div className="mt-4 text-center">
            <Link
              href={`/catalogo/grid?categoria=${featured.slug}`}
              className="font-display text-sm uppercase tracking-[0.18em] underline underline-offset-4"
            >
              {(page.content?.ctaLabel as string) || `Ver ${featured.name}`}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
