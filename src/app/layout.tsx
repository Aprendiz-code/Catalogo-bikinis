import type { Metadata } from "next";
import { Toaster } from "sonner";
import { FloatingQuickActions } from "@/components/layout/FloatingQuickActions";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catálogo Digital",
  description: "Catálogo flipbook dinámico para moda de verano",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <FloatingQuickActions />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
