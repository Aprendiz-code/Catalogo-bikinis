import { buildWhatsAppUrl } from "@/lib/utils";
import type { CatalogPage, CatalogSettings } from "@/types/database";

type Props = {
  page: CatalogPage;
  settings: CatalogSettings;
};

export function ContactPage({ page, settings }: Props) {
  const wa = buildWhatsAppUrl(
    settings.whatsapp,
    "Hola, quiero más información sobre la colección",
  );
  const cta = (page.content?.ctaLabel as string) || "Escribir por WhatsApp";

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-[10%] text-center"
      style={{ backgroundColor: page.background_color, color: page.text_color }}
    >
      <h2 className="display-title mb-3">{page.title || "CONTÁCTANOS"}</h2>
      {page.subtitle ? <p className="script-title mb-6">{page.subtitle}</p> : null}
      <p className="mb-8 max-w-md text-sm leading-relaxed">{page.body}</p>
      <div className="flex flex-col items-center gap-3">
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="border border-current px-6 py-3 font-display text-sm uppercase tracking-[0.2em]"
          >
            {cta}
          </a>
        ) : null}
        {settings.instagram && page.content?.showInstagram !== false ? (
          <p className="text-sm tracking-wide">{settings.instagram}</p>
        ) : null}
        {settings.website && page.content?.showWebsite !== false ? (
          <p className="font-display text-sm tracking-[0.2em]">
            {settings.website.replace(/^https?:\/\//, "").toUpperCase()}
          </p>
        ) : null}
      </div>
    </div>
  );
}
