"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { CatalogPageRenderer } from "@/components/catalog/CatalogPageRenderer";
import { FlipbookControls } from "@/components/catalog/FlipbookControls";
import type { FlipbookPage } from "@/types/database";

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-a4 w-full max-w-[min(92vw,520px)] items-center justify-center bg-white/70 shadow-page">
      <p className="font-display tracking-[0.2em]">Cargando catálogo…</p>
    </div>
  ),
});

type Props = {
  pages: FlipbookPage[];
  width?: number;
  height?: number;
  whatsapp?: string | null;
};

export function CatalogFlipbook({ pages, width = 768, height = 1080, whatsapp }: Props) {
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; turnToPage: (n: number) => void; getCurrentPageIndex: () => number } } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewTriggerRef = useRef<HTMLElement | null>(null);
  const previewCloseRef = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(1);
  const [bookSize, setBookSize] = useState({ width: 420, height: 594 });
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);

  const total = pages.length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onImageClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const trigger = target.closest<HTMLElement>("[data-image-preview-src]");
      if (!trigger || !container.contains(trigger)) return;

      const src = trigger.dataset.imagePreviewSrc;
      if (!src) return;
      previewTriggerRef.current = trigger;
      setPreview({ src, alt: trigger.dataset.imagePreviewAlt || "Vista previa de gafas" });
    };

    container.addEventListener("click", onImageClick);
    return () => container.removeEventListener("click", onImageClick);
  }, []);

  useEffect(() => {
    if (!preview) return;

    const previousOverflow = document.body.style.overflow;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onEscape);
    };
  }, [preview]);

  useEffect(() => {
    if (preview) {
      previewCloseRef.current?.focus();
      return;
    }

    const trigger = previewTriggerRef.current;
    if (!trigger) return;
    requestAnimationFrame(() => trigger.focus());
    previewTriggerRef.current = null;
  }, [preview]);

  useEffect(() => {
    const update = () => {
      const maxWidth = Math.min(window.innerWidth - 32, width * 0.72, 560);
      const ratio = height / width;
      setBookSize({ width: maxWidth, height: maxWidth * ratio });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width, height]);

  const turnTo = useCallback((index: number) => {
    const api = bookRef.current?.pageFlip?.();
    if (!api) return;
    api.turnToPage(Math.max(0, Math.min(index, total - 1)));
  }, [total]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") bookRef.current?.pageFlip()?.flipNext();
      if (event.key === "ArrowLeft") bookRef.current?.pageFlip()?.flipPrev();
      if (event.key === "Home") turnTo(0);
      if (event.key === "End") turnTo(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, turnTo]);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: "Catálogo", url });
      return;
    }
    await navigator.clipboard.writeText(url);
  };

  const fullscreen = async () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await containerRef.current.requestFullscreen();
    }
  };

  const renderedPages = useMemo(
    () =>
      pages.map((item) => (
        <div key={item.key} className="bg-white" data-density="hard">
          <div className="h-full w-full overflow-hidden max-md:overflow-y-auto">
            <CatalogPageRenderer page={item} />
          </div>
        </div>
      )),
    [pages],
  );

  if (total === 0) {
    return (
      <div className="rounded-xl border border-dashed border-brand-ink/20 bg-white/70 p-10 text-center">
        No hay páginas activas en el catálogo.
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative flex w-full flex-col items-center">
      <HTMLFlipBook
        ref={bookRef as never}
        width={bookSize.width}
        height={bookSize.height}
        size="stretch"
        minWidth={280}
        maxWidth={560}
        minHeight={400}
        maxHeight={900}
        drawShadow
        flippingTime={700}
        usePortrait
        startPage={0}
        autoSize
        maxShadowOpacity={0.25}
        showCover
        mobileScrollSupport
        onFlip={(e: { data: number }) => setPage(e.data + 1)}
        className="shadow-page"
        style={{}}
        startZIndex={0}
        clickEventForward
        useMouseEvents
        swipeDistance={30}
        showPageCorners
        disableFlipByClick={false}
      >
        {renderedPages}
      </HTMLFlipBook>

      {preview ? (
        <div
          className="fixed inset-0 z-[9999] grid place-items-center bg-black/85 p-3 sm:p-6"
          role="presentation"
          onClick={() => setPreview(null)}
        >
          <section
            className="relative flex h-[88vh] w-[min(96vw,900px)] items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa de gafas"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              ref={previewCloseRef}
              className="absolute right-1 top-1 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-3xl leading-none text-[#2f2424] shadow-lg sm:-right-3 sm:-top-3"
              onClick={() => setPreview(null)}
              aria-label="Cerrar vista previa"
            >
              ×
            </button>
            <Image
              src={preview.src}
              alt={preview.alt}
              fill
              sizes="96vw"
              className="object-contain object-center"
            />
          </section>
        </div>
      ) : null}

      <FlipbookControls
        page={page}
        total={total}
        onPrev={() => bookRef.current?.pageFlip()?.flipPrev()}
        onNext={() => bookRef.current?.pageFlip()?.flipNext()}
        onFirst={() => turnTo(0)}
        onLast={() => turnTo(total - 1)}
        onFullscreen={fullscreen}
        onShare={share}
        whatsapp={whatsapp}
      />
    </div>
  );
}
