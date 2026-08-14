import { trip } from "@/data/trip";

const STATUS_STYLES: Record<string, string> = {
  OK: "text-green-700 bg-green-100",
  VERIFICAR: "text-gold bg-gold/10",
  CORRIGIR: "text-red-700 bg-red-50",
  "BAIXO RISCO": "text-warm-400 bg-warm-200/30",
};

export default function CheckIn() {
  const { airlines, nameAudit } = trip.checkinGuide;
  const issues = nameAudit.filter((n) => n.status !== "OK");

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Check-in & auditoria de nome</h1>
      <p className="text-sm text-warm-400 mb-8">Como fazer check-in em cada companhia + conferência do nome em toda passagem contra o passaporte</p>

      <div className={`rounded-xl p-6 mb-8 ${issues.length > 0 ? "bg-bg-dark text-white" : "bg-green-50 border border-green-200/50"}`}>
        <p className={`text-[11px] font-medium tracking-[2px] uppercase ${issues.length > 0 ? "text-gold" : "text-green-700"}`}>
          Auditoria de nome — {issues.length} pendência{issues.length !== 1 ? "s" : ""} de {nameAudit.length} passagens
        </p>
        <div className="mt-4 space-y-3">
          {nameAudit.map((n, i) => (
            <div key={i} className={`flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b last:border-0 ${issues.length > 0 ? "border-warm-500/20" : "border-green-200/40"}`}>
              <div>
                <p className={`text-sm font-semibold ${issues.length > 0 ? "text-white" : "text-bg-dark"}`}>{n.route} <span className="font-mono text-xs opacity-70">· {n.ref}</span></p>
                <p className={`text-xs mt-0.5 ${issues.length > 0 ? "text-warm-400" : "text-warm-400"}`}>Nome no bilhete: {n.nameOnTicket}</p>
                <p className={`text-xs mt-1 ${issues.length > 0 ? "text-warm-100" : "text-warm-400"}`}>{n.note}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap shrink-0 ${STATUS_STYLES[n.status]}`}>{n.status}</span>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-serif mb-4">Como fazer check-in — companhia por companhia</h2>
      <div className="space-y-3">
        {airlines.map((a, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5">
            <div className="flex justify-between items-start gap-3 mb-2">
              <div>
                <p className="font-semibold text-sm">{a.company}</p>
                <p className="text-xs text-warm-400">{a.route} · ref {a.ref}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap ${a.hasApp ? "text-green-700 bg-green-100" : "text-warm-400 bg-warm-200/30"}`}>
                {a.hasApp ? "TEM APP" : "SEM APP"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-warm-200/30 text-sm">
              <div>
                <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-0.5">App / canal</p>
                <p>{a.appName}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-0.5">Janela de check-in</p>
                <p>{a.window}</p>
              </div>
            </div>
            <p className="text-xs text-warm-400 mt-3"><strong className="text-bg-dark">Como fazer:</strong> {a.how}</p>
            <p className="text-xs text-gold mt-2">{a.note}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5 mt-6">
        <p className="text-sm font-semibold mb-2">O que fazer com as pendências</p>
        <ul className="text-sm text-warm-400 space-y-1.5">
          <li>🚨 <strong className="text-bg-dark">Go Bus ida (BW5302849):</strong> contatar o suporte do 12go pra corrigir nome ("Prado" faltando) e data de nascimento</li>
          <li>🟡 <strong className="text-bg-dark">Go Bus volta (BW5416971):</strong> conferir o voucher/PDF real, não só o e-mail de confirmação</li>
          <li>ℹ️ <strong className="text-bg-dark">Aegean e Emirates:</strong> acento no nome e sobrenome sem espaço são risco baixo — a imigração compara pelo MRZ do passaporte, que normaliza os dois. Não precisa corrigir</li>
        </ul>
      </div>
    </div>
  );
}
