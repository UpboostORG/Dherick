import { trip } from "@/data/trip";

const RISK_STYLES: Record<string, string> = {
  OK: "text-green-700 bg-green-100",
  PLANEJAR: "text-gold bg-gold/10",
  APERTADO: "text-red-700 bg-red-50",
};

const SEVERITY_STYLES: Record<string, string> = {
  ALTA: "text-red-700 bg-red-50 border-l-red-500",
  MÉDIA: "text-gold bg-gold/10 border-l-gold",
  BAIXA: "text-warm-400 bg-warm-200/30 border-l-warm-300",
};

const FATIGUE_COLORS = ["bg-green-400", "bg-green-400", "bg-lime-400", "bg-amber-400", "bg-orange-500", "bg-red-600"];
const FATIGUE_LABELS: Record<number, string> = { 1: "tranquilo", 2: "leve", 3: "puxado", 4: "pesado", 5: "extremo" };

export default function Logistica() {
  const { connections, fatigue, risks, openQuestions, baggageChain } = trip.logistics;

  const tight = connections.filter((c) => c.risk !== "OK");
  const highRisks = risks.filter((r) => r.severity === "ALTA");
  const noBedNights = fatigue.filter((f) => f.bed.toLowerCase().includes("nenhuma") || f.bed.toLowerCase().includes("ônibus") || f.bed.toLowerCase().includes("avião"));

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Logística & riscos</h1>
      <p className="text-sm text-warm-400 mb-8">Cada conexão cruzada com o deslocamento real, os dias que vão te derrubar e o que ainda falta decidir</p>

      {/* Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="bg-bg-dark text-white rounded-xl p-5">
          <p className="text-[10px] font-medium tracking-[1.5px] text-gold uppercase">Conexões a vigiar</p>
          <p className="text-3xl font-light text-gold mt-1">{tight.length}</p>
          <p className="text-xs text-warm-400">de {connections.length} trechos</p>
        </div>
        <div className="bg-bg-dark text-white rounded-xl p-5">
          <p className="text-[10px] font-medium tracking-[1.5px] text-gold uppercase">Riscos altos</p>
          <p className="text-3xl font-light text-gold mt-1">{highRisks.length}</p>
          <p className="text-xs text-warm-400">exigem ação antes de viajar</p>
        </div>
        <div className="bg-bg-dark text-white rounded-xl p-5">
          <p className="text-[10px] font-medium tracking-[1.5px] text-gold uppercase">Noites sem cama</p>
          <p className="text-3xl font-light text-gold mt-1">{noBedNights.length}</p>
          <p className="text-xs text-warm-400">avião, ônibus ou aeroporto</p>
        </div>
      </div>

      {/* Conexões */}
      <h2 className="text-xl font-serif mb-1">Conexão por conexão</h2>
      <p className="text-xs text-warm-400 mb-4">Doméstico 1h30 · internacional 2h30-3h · low-cost europeu só com mão 2h</p>
      <div className="space-y-3 mb-10">
        {connections.map((c, i) => (
          <div key={i} className={`bg-white rounded-xl border p-5 ${c.risk === "APERTADO" ? "border-red-200/70" : c.risk === "PLANEJAR" ? "border-gold/40" : "border-warm-200/40"}`}>
            <div className="flex justify-between items-start gap-3 mb-3">
              <div>
                <p className="font-semibold text-sm">{c.leg}</p>
                <p className="text-xs text-warm-400">{c.date} · partida {c.depart}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap shrink-0 ${RISK_STYLES[c.risk]}`}>{c.risk}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-warm-200/30 text-sm">
              <div>
                <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-0.5">Estar lá</p>
                <p className="text-xs">{c.beThere}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-0.5">Sair de onde</p>
                <p className="text-xs">{c.leaveFrom}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-0.5">Folga</p>
                <p className="text-xs font-mono">{c.margin}</p>
              </div>
            </div>
            <p className="text-xs text-warm-400 mt-3">{c.note}</p>
          </div>
        ))}
      </div>

      {/* Cansaço */}
      <h2 className="text-xl font-serif mb-1">Mapa de cansaço</h2>
      <p className="text-xs text-warm-400 mb-4">Onde a viagem cobra o preço — 1 tranquilo, 5 extremo</p>
      <div className="space-y-2 mb-10">
        {fatigue.map((f, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-4">
            <div className="flex items-start gap-3">
              <div className="flex gap-0.5 shrink-0 mt-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className={`w-1.5 h-5 rounded-sm ${n <= f.level ? FATIGUE_COLORS[f.level] : "bg-warm-200/40"}`} />
                ))}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <p className="text-sm font-semibold">{f.label}</p>
                  <p className="text-xs text-warm-400 font-mono whitespace-nowrap">{f.date} · {FATIGUE_LABELS[f.level]}</p>
                </div>
                <p className="text-[11px] text-warm-400 mt-0.5">Dorme em: <span className="font-medium">{f.bed}</span></p>
                <p className="text-xs text-warm-400 mt-1.5">{f.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bagagem */}
      <h2 className="text-xl font-serif mb-1">{baggageChain.title}</h2>
      <p className="text-xs text-warm-400 mb-4">{baggageChain.intro}</p>
      <div className="bg-white rounded-xl border border-warm-200/40 overflow-hidden mb-4">
        {baggageChain.legs.map((l, i) => (
          <div key={i} className={`p-4 border-b border-warm-200/20 last:border-0 ${l.verdict === "GARGALO" ? "bg-red-50/60" : ""}`}>
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-semibold">{l.leg}</p>
                <p className="text-xs text-warm-400 mt-0.5 font-mono">{l.allow}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap shrink-0 ${l.verdict === "GARGALO" ? "text-red-700 bg-red-100" : "text-green-700 bg-green-100"}`}>{l.verdict}</span>
            </div>
            <p className="text-xs text-warm-400 mt-2">{l.note}</p>
          </div>
        ))}
      </div>
      <div className="bg-bg-dark text-white rounded-xl p-5 mb-10">
        <p className="text-sm">{baggageChain.conclusion}</p>
      </div>

      {/* Riscos */}
      <h2 className="text-xl font-serif mb-4">O que pode dar errado</h2>
      <div className="space-y-3 mb-10">
        {risks.map((r, i) => (
          <div key={i} className={`rounded-xl border-l-4 p-5 ${SEVERITY_STYLES[r.severity]}`}>
            <div className="flex justify-between items-start gap-3 mb-2">
              <p className="font-semibold text-sm text-bg-dark">{r.title}</p>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap shrink-0 ${SEVERITY_STYLES[r.severity]}`}>{r.severity}</span>
            </div>
            <p className="text-xs text-warm-400">{r.what}</p>
            <p className="text-xs text-bg-dark mt-2"><strong>O que fazer:</strong> {r.mitigation}</p>
          </div>
        ))}
      </div>

      {/* Pendências */}
      <h2 className="text-xl font-serif mb-4">Decisões que ainda são suas</h2>
      <div className="space-y-3">
        {openQuestions.map((q, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5">
            <p className="font-semibold text-sm mb-1">❓ {q.title}</p>
            <p className="text-xs text-warm-400">{q.why}</p>
            <p className="text-xs text-gold mt-2">→ {q.how}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
