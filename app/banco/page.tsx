"use client";
import { useState, useEffect, useMemo } from "react";

const TARGET_EUR = 1000;
const TARGET_USD = 1000;

export default function BancoEmergencia() {
  const [eur, setEur] = useState(744);
  const [usd, setUsd] = useState(754);
  const [eurRate, setEurRate] = useState(5.90);
  const [usdRate, setUsdRate] = useState(5.20);
  const [vendaItens, setVendaItens] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const e = localStorage.getItem("__banco_eur_v4");
    const u = localStorage.getItem("__banco_usd_v4");
    const er = localStorage.getItem("__banco_eurrate");
    const ur = localStorage.getItem("__banco_usdrate");
    const v = localStorage.getItem("__banco_venda");
    if (e) setEur(Number(e));
    if (u) setUsd(Number(u));
    if (er) setEurRate(Number(er));
    if (ur) setUsdRate(Number(ur));
    if (v) setVendaItens(Number(v));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("__banco_eur_v4", String(eur));
    localStorage.setItem("__banco_usd_v4", String(usd));
    localStorage.setItem("__banco_eurrate", String(eurRate));
    localStorage.setItem("__banco_usdrate", String(usdRate));
    localStorage.setItem("__banco_venda", String(vendaItens));
  }, [eur, usd, eurRate, usdRate, vendaItens, loaded]);

  const calc = useMemo(() => {
    const eurBRL = eur * eurRate;
    const usdBRL = usd * usdRate;
    const faltaEur = Math.max(0, TARGET_EUR - eur);
    const faltaUsd = Math.max(0, TARGET_USD - usd);
    const faltaBRL = faltaEur * eurRate + faltaUsd * usdRate;
    const faltaLiquidaBRL = Math.max(0, faltaBRL - vendaItens);
    const pctEur = Math.min(100, Math.round((eur / TARGET_EUR) * 100));
    const pctUsd = Math.min(100, Math.round((usd / TARGET_USD) * 100));
    return { eurBRL, usdBRL, totalBRL: eurBRL + usdBRL, faltaEur, faltaUsd, faltaBRL, faltaLiquidaBRL, pctEur, pctUsd };
  }, [eur, usd, eurRate, usdRate, vendaItens]);

  if (!loaded) return null;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Banco de emergência</h1>
      <p className="text-sm text-warm-400 mb-8">Reserva no Revolut, separada do orçamento da viagem — só encostar se algo der errado · edite os valores que salva sozinho</p>

      <div className="bg-bg-dark text-white rounded-xl p-6 mb-6">
        <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase">Total da reserva</p>
        <p className="text-4xl font-light text-gold mt-2">R$ {Math.round(calc.totalBRL).toLocaleString()}</p>
        <p className="text-sm text-warm-400 mt-1">€ {eur.toLocaleString()} + US$ {usd.toLocaleString()} · convertidos nas cotações abaixo</p>
        <div className="mt-4 border-t border-warm-500/30 pt-3">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Meta: € {TARGET_EUR.toLocaleString()} + US$ {TARGET_USD.toLocaleString()}</p>
          {calc.faltaEur === 0 && calc.faltaUsd === 0 ? (
            <p className="text-sm text-green-400 mt-1">Meta batida! ✓</p>
          ) : (
            <p className="text-sm text-gold mt-1">
              Faltam: {calc.faltaEur > 0 ? `€ ${calc.faltaEur.toLocaleString()}` : ""}{calc.faltaEur > 0 && calc.faltaUsd > 0 ? " + " : ""}{calc.faltaUsd > 0 ? `US$ ${calc.faltaUsd.toLocaleString()}` : ""} · ≈ R$ {Math.round(calc.faltaBRL).toLocaleString()} a aportar
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gold/30 p-5 mb-6">
        <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">📦 Venda de itens (monitor, teclado etc.) — a caminho</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-warm-400">R$</span>
          <input
            type="number"
            value={vendaItens}
            onChange={(e) => setVendaItens(Number(e.target.value) || 0)}
            className="w-32 bg-bg border border-warm-200/60 text-right rounded px-2 py-1 text-2xl font-light font-mono"
          />
        </div>
        <p className="text-xs text-warm-400 mt-2">Ajuste conforme for vendendo — esse valor abate direto do que falta aportar na reserva</p>
        {vendaItens > 0 && (
          <p className="text-sm text-green-600 mt-3 border-t border-warm-200/30 pt-3">
            Falta aportar em dinheiro NOVO: <strong>R$ {Math.round(calc.faltaLiquidaBRL).toLocaleString()}</strong> (já descontados os R$ {vendaItens.toLocaleString()} da venda)
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border-2 border-gold/30 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Euros</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-warm-400">€</span>
            <input
              type="number"
              value={eur}
              onChange={(e) => setEur(Number(e.target.value) || 0)}
              className="w-28 bg-bg border border-warm-200/60 text-right rounded px-2 py-1 text-3xl font-light font-mono"
            />
          </div>
          <p className="text-xs text-warm-400 mt-2">
            ≈ R$ {Math.round(calc.eurBRL).toLocaleString()} · cotação R${" "}
            <input
              type="number"
              value={eurRate}
              onChange={(e) => setEurRate(Number(e.target.value) || 0)}
              step="0.01"
              className="w-14 bg-bg border border-warm-200/60 text-center rounded px-1 py-0.5 text-xs font-mono inline"
            />
            {" "}/€
          </p>
          <div className="h-1.5 bg-warm-200/30 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${calc.pctEur}%` }} />
          </div>
          <p className="text-xs text-warm-400 mt-1">{calc.pctEur}% da meta de € {TARGET_EUR.toLocaleString()}{calc.faltaEur > 0 ? ` · faltam € ${calc.faltaEur.toLocaleString()}` : " · batida ✓"}</p>
        </div>
        <div className="bg-white rounded-xl border-2 border-gold/30 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Dólares</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-warm-400">US$</span>
            <input
              type="number"
              value={usd}
              onChange={(e) => setUsd(Number(e.target.value) || 0)}
              className="w-28 bg-bg border border-warm-200/60 text-right rounded px-2 py-1 text-3xl font-light font-mono"
            />
          </div>
          <p className="text-xs text-warm-400 mt-2">
            ≈ R$ {Math.round(calc.usdBRL).toLocaleString()} · cotação R${" "}
            <input
              type="number"
              value={usdRate}
              onChange={(e) => setUsdRate(Number(e.target.value) || 0)}
              step="0.01"
              className="w-14 bg-bg border border-warm-200/60 text-center rounded px-1 py-0.5 text-xs font-mono inline"
            />
            {" "}/US$
          </p>
          <div className="h-1.5 bg-warm-200/30 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${calc.pctUsd}%` }} />
          </div>
          <p className="text-xs text-warm-400 mt-1">{calc.pctUsd}% da meta de US$ {TARGET_USD.toLocaleString()}{calc.faltaUsd > 0 ? ` · faltam US$ ${calc.faltaUsd.toLocaleString()}` : " · batida ✓"}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5">
        <p className="text-sm font-semibold mb-2">Pra que serve (e pra que NÃO serve)</p>
        <ul className="text-sm text-warm-400 space-y-1.5">
          <li>✅ Emergência médica, voo perdido/cancelado, roubo/perda de cartão, passagem de volta inesperada</li>
          <li>✅ Manter parte em espécie escondida na mala (não tudo junto com a carteira)</li>
          <li>❌ Não é pra hostel, passeio, festa ou "faltou dinheiro no fim do mês" — isso é o orçamento normal (US$ 4.000)</li>
        </ul>
      </div>
    </div>
  );
}
