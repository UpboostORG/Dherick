import { trip } from "@/data/trip";

export default function Financeiro() {
  const b = trip.budget;
  const distributed = b.distribution.reduce((s, d) => s + d.amount, 0);
  const hs = b.hostelSavings;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Orçamento &amp; notas</h1>
      <p className="text-sm text-warm-400 mb-8">Seu dinheiro de gasto, moedas e dicas · ajuste os valores</p>

      {/* Budget header */}
      <div className="bg-bg-dark text-white rounded-xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase">Dinheiro para gastar lá</p>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-sm text-warm-400">US$</span>
              <span className="text-5xl font-light">{b.total.toLocaleString()}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Distribuído</p>
            <p className="text-2xl font-semibold mt-1">US$ {distributed.toLocaleString()}</p>
            <p className="text-xs text-green-400">US$ {b.total - distributed} ainda livre</p>
          </div>
        </div>
        <p className="text-xs text-warm-400 mt-4">livres para alimentação, passeios e compras</p>
        <div className="h-1.5 bg-warm-500/30 rounded-full mt-2">
          <div className="h-full bg-gold rounded-full" style={{ width: `${(distributed / b.total) * 100}%` }} />
        </div>
      </div>

      {/* Hostel savings card */}
      <div className="bg-green-50 rounded-xl border border-green-200/50 p-5 mb-6">
        <div className="flex items-start gap-2">
          <span className="text-lg">🏠</span>
          <div>
            <h3 className="font-semibold text-green-800">Economia com hostels: ~US$ {hs.saved.toLocaleString()}</h3>
            <p className="text-sm text-green-700 mt-1">
              Total hospedagem em hostels: ~US$ {hs.hostelTotal} (contra ~US$ {hs.hotelTotal.toLocaleString()}+ em hotéis).
              Dinheiro extra para passeios, balão da Capadócia, ferry nas ilhas, etc.
            </p>
          </div>
        </div>
      </div>

      {/* Distribution */}
      <div className="bg-white rounded-xl border border-warm-200/40 overflow-hidden mb-6">
        {b.distribution.map((d, i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-warm-200/20 last:border-0">
            <span className="text-sm">{d.destination}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-warm-400">US$</span>
              <span className="font-mono font-semibold bg-bg-dark text-white px-3 py-1.5 rounded-lg text-sm min-w-[60px] text-center">
                {d.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Meta */}
      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5 mb-6">
        <p className="font-semibold mb-2">Meta: viajar com tudo pago ✈</p>
        <p className="text-sm text-warm-400">
          A ideia é deixar passagens, hospedagens e ingressos 100% pagos antes de embarcar — assim os US$ 3.000 ficam livres só para o dia a dia. O que ainda falta:
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          {b.pending.map((p, i) => (
            <span key={i} className="text-xs text-gold border border-gold/30 px-3 py-1 rounded-full">{p}</span>
          ))}
        </div>
      </div>

      {/* Currencies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {b.currencies.map((c, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-bg-dark rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
              {c.code}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{c.name}</p>
              <p className="text-xs text-warm-400">{c.desc}</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-sm">{c.rate}</p>
              <p className="text-[10px] text-warm-400 uppercase">por 1 {c.code}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
