"use client";
import { trip } from "@/data/trip";
import PdfUpload from "@/components/PdfUpload";

export default function Hospedagem() {
  const confirmed = trip.accommodation.confirmed;
  const toBook = trip.accommodation.toBook;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Hospedagem</h1>
      <p className="text-sm text-warm-400 mb-8">
        {confirmed.length} confirmada · {toBook.length} a reservar
      </p>

      {confirmed.map((h, i) => (
        <div key={i} className="bg-white rounded-xl border-2 border-warm-200/60 p-6 mb-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold">{h.city} — {h.name}</h3>
              <p className="text-sm text-warm-400">{h.address}</p>
            </div>
            <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">Confirmado</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4 text-sm">
            <div>
              <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Check-in</p>
              <p className="font-mono">{h.checkIn}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Check-out</p>
              <p className="font-mono">{h.checkOut}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Confirmação</p>
              <p className="font-mono">{h.confirmation}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Pin</p>
              <p className="font-mono">{h.pin}</p>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Tel</p>
              <p className="font-mono">{h.tel}</p>
            </div>
          </div>
          <p className="text-xs text-warm-400 mt-4 border-t border-warm-200/30 pt-3">{h.note}</p>
        </div>
      ))}

      <p className="text-[11px] font-medium tracking-[1.5px] text-red-500 uppercase mb-4 mt-8">A Reservar</p>
      <div className="space-y-3">
        {toBook.map((h, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5 flex items-center justify-between">
            <div>
              <p className="font-semibold">{h.city}</p>
              <p className="text-sm text-warm-400">{h.dates}</p>
            </div>
            <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ${
              h.priority === "URGENTE" ? "text-red-700 bg-red-50" :
              h.priority === "FALTA" ? "text-red-500 bg-red-50" :
              "text-amber-600 bg-amber-50"
            }`}>
              {h.priority}
            </span>
          </div>
        ))}
      </div>

      <PdfUpload section="hospedagem" onExtracted={(data) => console.log("Extracted hotel data:", data)} />
    </div>
  );
}
