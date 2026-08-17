import type { CatalogPage } from "@/types/database";

type Props = {
  page: CatalogPage;
};

export function AboutCollectionPage({ page }: Props) {
  const paragraphs = (page.body || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-[10%] py-[12%] text-center"
      style={{ backgroundColor: page.background_color, color: page.text_color }}
    >
      <h2 className="display-title mb-[8%] max-w-xl">{page.title || "SOBRE ESTA COLECCIÓN"}</h2>
      <div className="mx-auto flex max-w-xl flex-col gap-6 text-[clamp(0.85rem,1.6vw,1.05rem)] leading-relaxed">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
