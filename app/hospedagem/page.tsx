"use client";
import { trip } from "@/data/trip";
import PdfUpload from "@/components/PdfUpload";
import { useChecklist } from "@/hooks/useChecklist";

export default function Hospedagem() {
  const { items, loaded } = useChecklist();
  const confirmed = trip.accommodation.confirmed;
  const toBook = trip.accommodation.toBook;
  const tips = trip.accommodation.hostelTips;

  function isBooked(city: string) {
    return items.some((i) => i.done && i.text.toLowerCase().includes("hostel") && i.text.toLowerCase().includes(city.toLowerCase()));
  }

  const pendingToBook = toBook.filter((h) => !isBooked(h.city.split(" ")[0]));
  const doneToBook = toBook.filter((h) => isBooked(h.city.split(" ")[0]));

  if (!loaded) return null;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Hospedagem</h1>
      <p className="text-sm text-warm-400 mb-8">
        {confirmed.length + doneToBook.length} confirmada{confirmed.length + doneToBook.length > 1 ? "s" : ""} · {pendingToBook.length} hostel{pendingToBook.length !== 1 ? "s" : ""} a reservar
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

      {/* Marked as done in checklist */}
      {doneToBook.length > 0 && (
        <>
          <p className="text-[11px] font-medium tracking-[1.5px] text-green-600 uppercase mb-4 mt-8">Marcados como Reservados</p>
          <div className="space-y-3 mb-10">
            {doneToBook.map((h, i) => (
              <div key={i} className="bg-white rounded-xl border border-green-200/60 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{h.city}</p>
                    <p className="text-sm text-warm-400">{h.dates}</p>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
                    Reservado ✓
                  </span>
                </div>
                {h.estimate && (
                  <p className="text-xs text-green-600 mt-2 font-mono">{h.estimate}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Still pending */}
      {pendingToBook.length > 0 && (
        <>
          <p className="text-[11px] font-medium tracking-[1.5px] text-red-500 uppercase mb-4 mt-8">Hostels a Reservar</p>
          <div className="space-y-3 mb-10">
            {pendingToBook.map((h, i) => (
              <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5">
                <div className="flex items-center justify-between">
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
                {h.estimate && (
                  <p className="text-xs text-green-600 mt-2 font-mono">{h.estimate}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="text-xl font-serif mb-4">Hostels recomendados por destino</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {tips.map((t, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-sm">{t.city}</h3>
              <span className="text-xs text-gold font-mono">{t.priceRange}</span>
            </div>
            {t.hostels.map((name, j) => (
              <p key={j} className="text-sm text-warm-400 py-0.5">• {name}</p>
            ))}
          </div>
        ))}
      </div>

      <PdfUpload section="hospedagem" onExtracted={(data) => console.log("Extracted hotel data:", data)} />
    </div>
  );
}
