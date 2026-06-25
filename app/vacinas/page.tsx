import { trip } from "@/data/trip";

export default function Vacinas() {
  const v = trip.vaccines;
  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Vacinação</h1>
      <p className="text-sm text-warm-400 mb-8">
        1 obrigatória (em dia) + {v.recommended.length} recomendadas · o resto é opcional
      </p>

      {/* Required */}
      <div className="bg-green-50 rounded-xl border border-green-200/50 p-6 mb-6">
        <div className="flex items-start gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 mt-1" />
          <div>
            <h3 className="font-semibold text-lg">{v.required.name}</h3>
            <p className="text-sm text-warm-400 mt-1">{v.required.detail}</p>
          </div>
        </div>
      </div>

      {/* Up to date + Recommended */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-500 uppercase mb-3">Em dia</p>
          {v.upToDate.map((vax, i) => (
            <div key={i} className="flex justify-between py-2 text-sm border-b border-warm-200/20 last:border-0">
              <span className="flex items-center gap-2">
                <span className="text-green-500">✓</span> {vax.name}
              </span>
              <span className="text-warm-400 font-mono">{vax.date}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border-2 border-red-200/50 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-red-500 uppercase mb-3">Recomendadas</p>
          {v.recommended.map((vax, i) => (
            <div key={i} className="py-2 text-sm border-b border-warm-200/20 last:border-0">
              <div className="flex justify-between items-center">
                <span className="font-medium">{vax.name}</span>
                <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded">Recomendada</span>
              </div>
              <p className="text-warm-400 text-xs mt-0.5">{vax.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="bg-bg-dark/5 rounded-xl p-5">
        <p className="text-sm text-warm-400">{v.note}</p>
      </div>
    </div>
  );
}
