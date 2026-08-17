"use client";

import { cn } from "@/lib/utils";

export function LoadingState({ label = "Cargando…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-16 text-sm text-brand-muted">{label}</div>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-brand-ink/20 bg-white p-10 text-center">
      <h3 className="font-display text-xl uppercase tracking-[0.12em]">{title}</h3>
      {description ? <p className="mt-2 text-sm text-brand-muted">{description}</p> : null}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {message}
    </div>
  );
}

export function DashboardCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="border border-brand-line bg-white p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-brand-muted">{title}</p>
      <p className="mt-2 font-display text-3xl tracking-wide">{value}</p>
      {hint ? <p className="mt-1 text-xs text-brand-muted">{hint}</p> : null}
    </div>
  );
}

export function Pagination({
  page,
  pageSize,
  total,
  onChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-brand-muted">
        Página {page} de {pages} · {total} elementos
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          className="border border-brand-line px-3 py-1 disabled:opacity-40"
        >
          Anterior
        </button>
        <button
          type="button"
          disabled={page >= pages}
          onClick={() => onChange(page + 1)}
          className="border border-brand-line px-3 py-1 disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md border border-brand-line bg-white p-6 shadow-page">
        <h3 className="font-display text-2xl uppercase tracking-[0.1em]">{title}</h3>
        {description ? <p className="mt-3 text-sm text-brand-muted">{description}</p> : null}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="border border-brand-line px-4 py-2 text-sm">
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-brand-ink px-4 py-2 text-sm text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeleteDialog({
  open,
  onSoftDelete,
  onHardDelete,
  onCancel,
}: {
  open: boolean;
  onSoftDelete: () => void;
  onHardDelete: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md border border-brand-line bg-white p-6">
        <h3 className="font-display text-2xl uppercase tracking-[0.1em]">Eliminar producto</h3>
        <p className="mt-3 text-sm text-brand-muted">
          Puedes enviarlo a la papelera (restaurable) o eliminarlo permanentemente.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <button type="button" onClick={onSoftDelete} className="border border-brand-line px-4 py-2 text-sm">
            Mover a papelera
          </button>
          <button type="button" onClick={onHardDelete} className="bg-red-700 px-4 py-2 text-sm text-white">
            Eliminar permanentemente
          </button>
          <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-brand-muted">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block space-y-1.5", className)}>
      <span className="text-xs uppercase tracking-[0.14em] text-brand-muted">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  "w-full border border-brand-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-ink";
export const buttonClass =
  "inline-flex items-center justify-center bg-brand-ink px-4 py-2 text-sm text-white disabled:opacity-50";
export const ghostButtonClass =
  "inline-flex items-center justify-center border border-brand-line px-4 py-2 text-sm";
