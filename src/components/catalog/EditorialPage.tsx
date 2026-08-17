import { AboutCollectionPage } from "@/components/catalog/AboutCollectionPage";
import { ContactPage } from "@/components/catalog/ContactPage";
import type { CatalogPage, CatalogSettings } from "@/types/database";

type Props = {
  page: CatalogPage;
  settings?: CatalogSettings | null;
};

/** Página editorial genérica (about / contact / custom). */
export function EditorialPage({ page, settings }: Props) {
  if (page.page_type === "about") {
    return <AboutCollectionPage page={page} />;
  }

  if (!settings) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center px-[10%] text-center"
        style={{ backgroundColor: page.background_color, color: page.text_color }}
      >
        <h2 className="display-title mb-4">{page.title}</h2>
        {page.subtitle ? <p className="script-title mb-4">{page.subtitle}</p> : null}
        <p className="max-w-md whitespace-pre-line text-sm leading-relaxed">{page.body}</p>
      </div>
    );
  }

  return <ContactPage page={page} settings={settings} />;
}
