import { trip } from "@/data/trip";
import Countdown from "@/components/Countdown";
import GeneratePdf from "@/components/GeneratePdf";

export default function Home() {
  const done = trip.checklist.filter((c) => c.done).length;
  const total = trip.checklist.length;
  const pct = Math.round((done / total) * 100);
  const pending = trip.checklist.filter((c) => !c.done && c.priority === "ALTA");

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <GeneratePdf />
      </div>
      <Countdown target={trip.departureDate} />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Prontidão</p>
          <p className="text-3xl font-light text-gold mt-1">{pct}%</p>
          <p className="text-sm text-warm-400">{done} de {total} itens prontos</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Pendências Críticas</p>
          <p className="text-3xl font-light text-bg-dark mt-1">0</p>
          <p className="text-sm text-warm-400">exigem ação imediata</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Países na Rota</p>
          <p className="text-3xl font-light text-bg-dark mt-1">6</p>
          <p className="text-sm text-warm-400">EAU · Egito · Grécia · Turquia · Macedônia</p>
        </div>
      </div>

      {/* Route */}
      <div className="bg-white rounded-xl border border-warm-200/40 p-6">
        <h2 className="text-xl font-serif mb-4">A rota</h2>
        <div className="flex flex-wrap items-center gap-2">
          {trip.route.map((r, i) => (
            <div key={r.code} className="flex items-center gap-2">
              <div className="text-center">
                <span className="inline-block px-3 py-1.5 border border-warm-200 rounded-lg text-sm font-semibold">
                  {r.code}
                </span>
                <p className="text-[11px] text-warm-400 mt-1">{r.city}</p>
              </div>
              {i < trip.route.length - 1 && <span className="text-warm-300">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Pending */}
      <div className="bg-white rounded-xl border border-warm-200/40 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-serif">Próximas pendências</h2>
          <a href="/checklist" className="text-sm text-gold hover:underline">Ver tudo →</a>
        </div>
        <div className="space-y-3">
          {pending.slice(0, 5).map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 px-4 bg-bg rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-sm">{item.text}</span>
              </div>
              <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded">ALTA</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
