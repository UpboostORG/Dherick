"use client";
import { trip } from "@/data/trip";
import PdfUpload from "@/components/PdfUpload";

export default function Passagens() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Passagens aéreas</h1>
      <p className="text-sm text-warm-400 mb-8">
        {trip.flights.confirmed.length} trechos confirmados · clique para editar detalhes
      </p>

      <p className="text-[11px] font-medium tracking-[1.5px] text-green-700 uppercase mb-4">Confirmadas</p>
      <div className="space-y-3 mb-10">
        {trip.flights.confirmed.map((f, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold whitespace-nowrap">{f.from} → {f.to}</span>
              <div>
                <p className="text-sm font-medium">{f.airline}</p>
                <p className="text-xs text-warm-400">{f.date} · {f.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[10px] text-warm-400 uppercase">Ref</p>
                <p className="text-sm font-mono font-semibold">{f.ref}</p>
              </div>
              <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">Confirmado</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] font-medium tracking-[1.5px] text-red-500 uppercase mb-4">A Comprar</p>
      <div className="space-y-3">
        {trip.flights.toBuy.map((f, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{f.from} → {f.to}</p>
              <p className="text-sm text-warm-400">{f.note}</p>
            </div>
            <span className={`text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap ${
              f.priority === "ALTA" ? "text-red-600 bg-red-50" :
              f.priority === "MÉDIA" ? "text-amber-600 bg-amber-50" :
              "text-warm-400 bg-warm-200/30"
            }`}>
              {f.priority}
            </span>
          </div>
        ))}
      </div>

      <PdfUpload section="passagens" onExtracted={(data) => console.log("Extracted flight data:", data)} />
    </div>
  );
}
