"use client";

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Expand,
  Share2,
} from "lucide-react";

type Props = {
  page: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
  onFullscreen: () => void;
  onShare: () => void;
  whatsapp?: string | null;
};

export function FlipbookControls({
  page,
  total,
  onPrev,
  onNext,
  onFirst,
  onLast,
  onFullscreen,
  onShare,
}: Props) {
  return (
    <div className="mx-auto mt-4 flex w-full max-w-3xl flex-wrap items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3">
      <button
        type="button"
        onClick={onFirst}
        className="rounded-full border border-brand-ink/15 bg-white p-1.5 sm:p-2 hover:bg-white/80 transition-all"
        aria-label="Primera página"
        title="Primera página"
      >
        <ChevronFirst className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
      <button
        type="button"
        onClick={onPrev}
        className="rounded-full border border-brand-ink/15 bg-white p-1.5 sm:p-2 hover:bg-white/80 transition-all"
        aria-label="Anterior"
        title="Anterior"
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
      <span className="min-w-16 sm:min-w-24 text-center font-display text-xs sm:text-sm tracking-[0.14em]">
        {page} / {total}
      </span>
      <button
        type="button"
        onClick={onNext}
        className="rounded-full border border-brand-ink/15 bg-white p-1.5 sm:p-2 hover:bg-white/80 transition-all"
        aria-label="Siguiente"
        title="Siguiente"
      >
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
      <button
        type="button"
        onClick={onLast}
        className="rounded-full border border-brand-ink/15 bg-white p-1.5 sm:p-2 hover:bg-white/80 transition-all"
        aria-label="Última página"
        title="Última página"
      >
        <ChevronLast className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
      <div className="h-6 w-px bg-brand-line" />
      <button
        type="button"
        onClick={onFullscreen}
        className="rounded-full border border-brand-ink/15 bg-white p-1.5 sm:p-2 hover:bg-white/80 transition-all"
        aria-label="Pantalla completa"
        title="Pantalla completa"
      >
        <Expand className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
      <button
        type="button"
        onClick={onShare}
        className="rounded-full border border-brand-ink/15 bg-white p-1.5 sm:p-2 hover:bg-white/80 transition-all"
        aria-label="Compartir"
        title="Compartir"
      >
        <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
    </div>
  );
}
