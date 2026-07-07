import { trip } from "@/data/trip";

export default function Passeios() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Passeios</h1>
      <p className="text-sm text-warm-400 mb-8">
        Ideias por destino — Dubai, Egito, Grécia e Turquia · clique nas descrições para editar
      </p>

      {Object.entries(trip.activities).map(([city, data]) => (
        <div key={city} className="mb-10">
          <div className="flex items-baseline gap-3 mb-4">
            <h2 className="text-2xl font-serif">{city}</h2>
            <span className="text-sm text-warm-400 font-mono">{data.period}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.items.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
                <p className="text-sm text-warm-400 ml-4">{item.desc}</p>
                {item.tip && (
                  <p className="text-xs text-gold font-mono mt-3 ml-4">{item.tip}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
