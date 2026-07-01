"use client";
import { trip } from "@/data/trip";
import { useChecklistStats } from "@/hooks/useChecklist";
import { useChecklist } from "@/hooks/useChecklist";

const statusOverrides: Record<string, { checkText: string; okTag: string }> = {
  "Dubai": { checkText: "Reservar hostel Dubai", okTag: "5 dias · hostel OK" },
  "Cairo": { checkText: "Reservar hostel Cairo", okTag: "hostel OK" },
  "STARLIGHT": { checkText: "Comprar ingressos festival STARLIGHT", okTag: "Ingresso OK" },
  "Atenas": { checkText: "Reservar hostel Atenas", okTag: "~5 noites · hostel OK" },
  "Santorini": { checkText: "Reservar hostel Santorini", okTag: "hostel OK" },
  "Istambul": { checkText: "Reservar hostel Turquia", okTag: "~4 noites · hostel OK" },
  "Capadócia": { checkText: "Reservar hostel Turquia", okTag: "~2 noites · hostel OK" },
  "Macedônia": { checkText: "Definir e reservar Macedônia", okTag: "Reservado" },
};

export default function Roteiro() {
  const { items, loaded } = useChecklist();

  function isDone(checkText: string) {
    return items.some((i) => i.done && i.text.includes(checkText));
  }

  function resolveItem(item: typeof trip.itinerary[0]) {
    const place = item.place || "";
    for (const [key, override] of Object.entries(statusOverrides)) {
      if (place.includes(key)) {
        if (isDone(override.checkText)) {
          return { status: "ok" as const, tag: override.okTag, detail: item.detail.replace(/Hostel ainda não reservado\.?/, "Hostel reservado.").replace(/Hostel a reservar\.?/, "Hostel reservado.").replace(/Hostel a definir\.?/, "Hostel reservado.") };
        }
      }
    }
    return { status: item.status, tag: item.tag, detail: item.detail };
  }

  if (!loaded) return null;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Roteiro</h1>
      <p className="text-sm text-warm-400 mb-8">Ida sem volta definida · status sincronizado com o checklist</p>

      <div className="relative">
        <div className="absolute left-[72px] top-0 bottom-0 w-px bg-warm-200/40 hidden sm:block" />

        <div className="space-y-0">
          {trip.itinerary.map((item, i) => {
            const resolved = resolveItem(item);
            const isOk = item.status === "ok" || resolved.status === "ok";
            return (
              <div key={i} className="flex gap-4 sm:gap-6 py-4 group">
                <div className="w-16 sm:w-20 text-right text-sm text-warm-400 font-mono shrink-0 pt-0.5">
                  {item.date}
                </div>
                <div className="relative flex items-start">
                  <div className={`w-3 h-3 rounded-full mt-1 shrink-0 z-10 ${isOk ? "bg-green-500" : "bg-red-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">
                      {item.from && item.to ? `${item.from} → ${item.to}` : item.place}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                      isOk ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                    }`}>
                      {resolved.tag}
                    </span>
                  </div>
                  <p className="text-sm text-warm-400 mt-1">{resolved.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
