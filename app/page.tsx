"use client";
import dynamic from "next/dynamic";
import { trip } from "@/data/trip";
import Countdown from "@/components/Countdown";
import GeneratePdf from "@/components/GeneratePdf";
import { useChecklistStats } from "@/hooks/useChecklist";

const WorldMap = dynamic(() => import("@/components/WorldMap"), { ssr: false });

export default function Home() {
  const { done, total, pct, pending, loaded } = useChecklistStats();
  const criticalCount = pending.filter(c => c.priority === "CRÍTICA").length;

  if (!loaded) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <GeneratePdf />
      </div>
      <Countdown target={trip.departureDate} />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-warm-200/30 p-4 shadow-sm">
          <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase">Prontidão</p>
          <p className="text-3xl font-light text-gold mt-1">{pct}%</p>
          <p className="text-xs text-warm-400">{done} de {total} itens prontos</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-200/30 p-4 shadow-sm">
          <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase">Pendências Críticas</p>
          <p className="text-3xl font-light text-bg-dark mt-1">{criticalCount}</p>
          <p className="text-xs text-warm-400">exigem ação imediata</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-200/30 p-4 shadow-sm">
          <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase">Países na Rota</p>
          <p className="text-3xl font-light text-bg-dark mt-1">6</p>
          <p className="text-xs text-warm-400">EAU · Egito · Grécia · Turquia · Macedônia</p>
        </div>
      </div>

      {/* World Map */}
      <WorldMap />

      {/* Route + Pending side by side on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2 bg-white rounded-xl border border-warm-200/30 p-5 shadow-sm">
          <h2 className="text-lg font-serif mb-3">A rota</h2>
          <div className="space-y-2">
            {trip.route.map((r, i) => (
              <div key={r.code} className="flex items-center gap-2">
                <span className="inline-block w-10 text-center px-2 py-1 border border-warm-200/60 rounded text-xs font-semibold bg-bg">
                  {r.code}
                </span>
                <span className="text-xs text-warm-400">{r.city}</span>
                {i < trip.route.length - 1 && <span className="text-warm-300 ml-auto text-xs">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-xl border border-warm-200/30 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-serif">Próximas pendências</h2>
            <a href="/checklist" className="text-xs text-gold hover:underline">Ver tudo →</a>
          </div>
          <div className="space-y-2">
            {pending.length === 0 ? (
              <p className="text-sm text-green-600 py-4 text-center">Tudo em dia!</p>
            ) : (
              pending.slice(0, 6).map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-3 bg-bg rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.priority === "CRÍTICA" ? "bg-red-600" : "bg-red-400"}`} />
                    <span className="text-xs">{item.text}</span>
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                    item.priority === "CRÍTICA" ? "text-red-700 bg-red-100" : "text-red-500 bg-red-50"
                  }`}>{item.priority}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
