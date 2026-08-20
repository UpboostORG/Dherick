import { trip } from "@/data/trip";

const CELL = "text-xs align-top p-3 border-b border-warm-200/30";

function Verdict({ text }: { text: string }) {
  const bad = /PROIBIDO|Classe 1|NÃO É REGISTRADO|não existe/i.test(text);
  const warn = /autorização|Controlado|controlado|exige/i.test(text);
  const cls = bad ? "text-red-700 bg-red-50" : warn ? "text-gold bg-gold/10" : "text-green-700 bg-green-100";
  return <span className={`inline-block text-[11px] leading-snug px-2 py-1 rounded ${cls}`}>{text}</span>;
}

export default function Remedio() {
  const m = trip.medication;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Remédio & fronteiras</h1>
      <p className="text-sm text-warm-400 mb-6">O que pode entrar em cada país, onde dá pra comprar e o que fazer na alfândega</p>

      <div className="bg-red-50 border-l-4 border-l-red-500 rounded-xl p-5 mb-4">
        <p className="text-sm font-semibold text-red-800 mb-1">⚠️ O Venvanse não serve pra esta viagem</p>
        <p className="text-xs text-warm-400">{m.verdict}</p>
      </div>

      <div className="bg-bg-dark text-white rounded-xl p-5 mb-8">
        <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase mb-2">Regra universal</p>
        <p className="text-sm">{m.intro}</p>
      </div>

      <h2 className="text-xl font-serif mb-4">País por país</h2>
      <div className="space-y-4 mb-8">
        {m.countries.map((c, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 overflow-hidden">
            <div className="bg-bg px-4 py-3 border-b border-warm-200/40">
              <p className="font-semibold text-sm">{c.country}</p>
            </div>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className={`${CELL} font-medium w-28 text-warm-400`}>Venvanse</td>
                  <td className={CELL}><Verdict text={c.lisdex} /></td>
                </tr>
                <tr>
                  <td className={`${CELL} font-medium text-warm-400`}>Concerta</td>
                  <td className={CELL}><Verdict text={c.methyl} /></td>
                </tr>
                <tr>
                  <td className={`${CELL} font-medium text-warm-400`}>Atomoxetina</td>
                  <td className={CELL}><Verdict text={c.atomox} /></td>
                </tr>
                <tr>
                  <td className={`${CELL} font-medium text-warm-400`}>Comprar lá</td>
                  <td className={`${CELL} text-warm-400`}>{c.buy}</td>
                </tr>
                {c.penalty !== "—" && (
                  <tr>
                    <td className={`${CELL} font-medium text-warm-400 border-b-0`}>Pena</td>
                    <td className={`${CELL} text-red-700 border-b-0`}>{c.penalty}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-serif mb-4">Como carregar</h2>
      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5">
        <ul className="text-sm text-warm-400 space-y-2">
          {m.rules.map((r, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-gold shrink-0">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
