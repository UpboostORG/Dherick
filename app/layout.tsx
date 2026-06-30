import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import LoginGuard from "@/components/LoginGuard";

export const metadata: Metadata = {
  title: "Volta ao Mundo — Dherick 2026",
  description: "Planejamento completo da volta ao mundo",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <LoginGuard>
          <Sidebar />
          <main className="lg:ml-64 min-h-screen px-4 py-5 pt-14 lg:pt-5 lg:px-8 lg:py-6">
            <div className="max-w-[1100px]">
              {children}
            </div>
          </main>
        </LoginGuard>
      </body>
    </html>
  );
}
