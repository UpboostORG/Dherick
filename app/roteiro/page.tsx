import { trip } from "@/data/trip";

export default function Roteiro() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Roteiro</h1>
      <p className="text-sm text-warm-400 mb-8">Ida sem volta definida · clique nas notas para editar</p>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[72px] top-0 bottom-0 w-px bg-warm-200/40 hidden sm:block" />

        <div className="space-y-0">
          {trip.itinerary.map((item, i) => {
            const isOk = item.status === "ok";
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
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm text-warm-400 mt-1">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
