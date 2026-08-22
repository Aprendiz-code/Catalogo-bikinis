import { buildWhatsAppUrl } from "@/lib/utils";
import type { CatalogPage, CatalogSettings } from "@/types/database";
import { Globe2, Instagram, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import closingImage from "../../../img/Portada trasera.avif";

type Props = {
  page: CatalogPage;
  settings: CatalogSettings;
};

export function ContactPage({ page, settings }: Props) {
  if (page.page_type === "closing") {
    return <ClosingPage page={page} settings={settings} />;
  }

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

function ClosingPage({ page, settings }: Props) {
  const wa = buildWhatsAppUrl(
    settings.whatsapp,
    "Hola, quiero conocer las novedades de la colección",
  );
  const farewell = page.title || "Gracias por elegirnos";
  const message =
    page.body ||
    "Esperamos que encuentres el bikini perfecto para disfrutar cada momento bajo el sol.";
  const followText =
    page.subtitle ||
    "Síguenos en redes sociales y descubre nuestras novedades, nuevos diseños y promociones especiales.";
  const instagramUrl = settings.instagram
    ? `https://instagram.com/${settings.instagram.replace(/^@/, "")}`
    : undefined;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#d8c2b3] text-[#fffaf4]">
      <Image
        src={closingImage.src}
        alt="Modelo luciendo un bikini de la colección"
        fill
        sizes="(max-width: 640px) 100vw, 800px"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,29,28,0.2)_0%,rgba(43,29,28,0.04)_35%,rgba(43,29,28,0.76)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(43,29,28,0.7)_0%,rgba(43,29,28,0.18)_55%,transparent_100%)] sm:w-[78%]"
        aria-hidden="true"
      />

      <div className="relative flex h-full min-h-0 flex-col justify-between px-[8%] py-[9%] sm:px-[10%] sm:py-[10%] md:px-[11%] md:py-[12%]">
        <div className="max-w-[75%] sm:max-w-[62%]">
          <p className="font-display text-[0.65rem] uppercase tracking-[0.28em] text-white/85 sm:text-xs">
            {settings.brand_name}
          </p>
          <div className="mt-3 h-px w-14 bg-white/70 sm:mt-5 sm:w-20" />
        </div>

        <div className="max-w-[90%] sm:max-w-[58%] md:max-w-[52%]">
          <p className="script-title mb-2 text-white/90 sm:mb-3">Hasta pronto</p>
          <h2 className="font-display text-[clamp(2rem,7vw,4.8rem)] font-semibold uppercase leading-[0.95] tracking-[0.05em] text-white">
            {farewell}
          </h2>
          <p className="script-title mt-4 max-w-md leading-relaxed text-white/95 sm:mt-6 sm:text-sm md:text-base">
            {message}
          </p>
          <p className="script-title mt-3 flex max-w-md flex-wrap items-center justify-center gap-2 leading-relaxed text-white/90 sm:mt-5 sm:text-xs md:text-sm">
            {followText}
            <Instagram size={18} strokeWidth={1.5} aria-label="Instagram" />
          </p>
          <p className="mt-4 font-display text-xs uppercase tracking-[0.18em] text-white sm:mt-6 sm:text-sm">
            Tu próximo look de playa comienza aquí.
          </p>
        </div>

        <div className="border-t border-white/40 pt-4 sm:pt-5">
          <div className="grid grid-cols-2 gap-x-3 gap-y-3 text-[0.62rem] text-white sm:grid-cols-4 sm:gap-4 sm:text-xs">
            <ContactDetail icon={<Instagram size={14} strokeWidth={1.5} />} value={settings.instagram || "[INSTAGRAM DE LA MARCA]"} href={instagramUrl} />
            <ContactDetail icon={<MessageCircle size={14} strokeWidth={1.5} />} value={settings.phone || settings.whatsapp || "[WHATSAPP]"} href={wa || undefined} />
            <ContactDetail icon={<Mail size={14} strokeWidth={1.5} />} value="[CORREO ELECTRÓNICO]" />
            <ContactDetail icon={<Globe2 size={14} strokeWidth={1.5} />} value={settings.website || "[SITIO WEB]"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactDetail({
  icon,
  value,
  href,
}: {
  icon: React.ReactNode;
  value: string;
  href?: string;
}) {
  const content = (
    <span className="flex min-w-0 items-center gap-2">
      <span className="shrink-0 text-white/90">{icon}</span>
      <span className="min-w-0 break-words leading-tight">{value}</span>
    </span>
  );

  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-75">
      {content}
    </a>
  ) : (
    content
  );
}
