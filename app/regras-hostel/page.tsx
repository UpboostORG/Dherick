import { trip } from "@/data/trip";

export default function RegrasHostel() {
  const { universal, perHostel } = trip.hostelRules;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Regras dos hostels</h1>
      <p className="text-sm text-warm-400 mb-8">O que ninguém te conta na primeira viagem — regras gerais e as específicas de cada reserva</p>

      <div className="bg-bg-dark text-white rounded-xl p-6 mb-8">
        <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase mb-4">Regras que valem em qualquer hostel</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {universal.map((r, i) => (
            <div key={i}>
              <p className="text-sm font-semibold text-gold">{r.title}</p>
              <p className="text-xs text-warm-100/70 mt-0.5">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-serif mb-4">Reserva por reserva</h2>
      <div className="space-y-4">
        {perHostel.map((h, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5">
            <div className="flex justify-between items-start gap-3 mb-3 pb-3 border-b border-warm-200/30">
              <div>
                <p className="font-semibold">{h.city} — {h.name}</p>
                <p className="text-xs text-warm-400">{h.dates}</p>
              </div>
              {h.ref !== "—" && (
                <span className="text-[10px] font-mono text-warm-400 whitespace-nowrap">ref {h.ref}</span>
              )}
            </div>
            <ul className="space-y-1.5">
              {h.rules.map((rule, j) => (
                <li key={j} className="text-sm text-warm-400 flex gap-2">
                  <span className="text-gold shrink-0">·</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5 mt-6">
        <p className="text-sm text-warm-400">
          Vai adicionando aqui o que descobrir nas regras de cada reserva — quanto mais detalhe, menos surpresa no balcão.
        </p>
      </div>
    </div>
  );
}
