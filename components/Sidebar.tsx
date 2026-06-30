"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useChecklistStats } from "@/hooks/useChecklist";

const links = [
  { href: "/", label: "Visão geral" },
  { href: "/roteiro", label: "Roteiro" },
  { href: "/starlight", label: "★ STARLIGHT" },
  { href: "/passeios", label: "Passeios" },
  { href: "/transporte", label: "Transporte local" },
  { href: "/dicas", label: "Dicas culturais" },
  { href: "/passagens", label: "Passagens" },
  { href: "/hospedagem", label: "Hospedagem" },
  { href: "/documentos", label: "Documentos" },
  { href: "/vacinas", label: "Vacinas" },
  { href: "/checklist", label: "Checklist" },
  { href: "/bagagem", label: "Bagagem" },
  { href: "/financeiro", label: "Financeiro" },
  { href: "/metas", label: "Metas de investimento" },
  { href: "/compras", label: "Compras mês a mês" },
  { href: "/emergencia", label: "Emergências" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { done, total, pct } = useChecklistStats();

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        aria-label="Menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="#1F1B16" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <>
              <path d="M3 5h14M3 10h14M3 15h14" stroke="#1F1B16" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-warm-200/50 z-40 flex flex-col transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 pb-4">
          <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase">Planejamento</p>
          <h1 className="text-xl font-bold text-bg-dark mt-1">Volta ao Mundo</h1>
          <p className="text-sm text-warm-400 mt-0.5">Dherick Prado Abreu · 2026</p>
        </div>

        <nav className="flex-1 px-3 overflow-y-auto">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                  active
                    ? "bg-bg-dark text-white font-medium"
                    : "text-warm-400 hover:text-bg-dark hover:bg-warm-200/20"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-gold" : "bg-warm-300"}`} />
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-warm-200/30">
          <div className="flex justify-between text-xs text-warm-400 mb-1">
            <span className="font-medium uppercase tracking-wider">Progresso</span>
            <span>{done}/{total}</span>
          </div>
          <div className="h-1.5 bg-warm-200/30 rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[11px] text-warm-400 mt-1">{pct}% concluído</p>
        </div>
      </aside>
    </>
  );
}
