"use client";

import { usePathname } from "next/navigation";
import { buildWhatsAppUrl } from "@/lib/utils";

export function FloatingQuickActions() {
  const pathname = usePathname();
  const showWhatsApp = pathname === "/catalogo" || pathname.startsWith("/catalogo/");

  if (!showWhatsApp) return null;

  const whatsappUrl = buildWhatsAppUrl(
    "+573174291254",
    "Hola, quiero hacer mi pedido",
  );

  return (
    <div className="floating-actions">
      <a
        href={whatsappUrl || "https://wa.me/573174291254"}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Haz tu pedido por WhatsApp"
      >
        <span className="whatsapp-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.49 0 .13 5.35.13 11.9c0 2.1.55 4.13 1.6 5.93L0 24l6.3-1.65a11.9 11.9 0 0 0 5.75 1.74h.01c6.57 0 11.93-5.35 11.93-11.9 0-3.17-1.23-6.15-3.48-8.71Zm-8.47 18.3h-.01a9.84 9.84 0 0 1-5.02-1.36l-.36-.21-3.74.98 1-3.64-.24-.37A9.77 9.77 0 0 1 2.15 11.9a9.84 9.84 0 1 1 17.08 6.92 9.78 9.78 0 0 1-7.18 3.96Zm5.36-7.37c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.94 1.14-.17.19-.35.21-.64.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.45-1.73-1.62-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.35.44-.52.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.5-.07-.15-.66-1.6-.91-2.2-.24-.58-.49-.5-.66-.51-.17-.01-.36-.01-.56-.01-.2 0-.52.07-.8.36-.28.29-1.06 1.04-1.06 2.52 0 1.48 1.09 2.93 1.24 3.13.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.72-.7 1.96-1.38.24-.67.24-1.25.17-1.37-.07-.12-.26-.2-.54-.35Z" />
          </svg>
        </span>
        <span>Haz tu pedido</span>
      </a>
    </div>
  );
}
