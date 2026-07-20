"use client";
import { useState, useEffect, useMemo } from "react";

export default function BancoEmergencia() {
  const [eur, setEur] = useState(530);
  const [usd, setUsd] = useState(500);
  const [eurRate, setEurRate] = useState(5.90);
  const [usdRate, setUsdRate] = useState(5.20);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const e = localStorage.getItem("__banco_eur");
    const u = localStorage.getItem("__banco_usd");
    const er = localStorage.getItem("__banco_eurrate");
    const ur = localStorage.getItem("__banco_usdrate");
    if (e) setEur(Number(e));
    if (u) setUsd(Number(u));
    if (er) setEurRate(Number(er));
    if (ur) setUsdRate(Number(ur));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("__banco_eur", String(eur));
    localStorage.setItem("__banco_usd", String(usd));
    localStorage.setItem("__banco_eurrate", String(eurRate));
    localStorage.setItem("__banco_usdrate", String(usdRate));
  }, [eur, usd, eurRate, usdRate, loaded]);

  const calc = useMemo(() => {
    const eurBRL = eur * eurRate;
    const usdBRL = usd * usdRate;
    return { eurBRL, usdBRL, totalBRL: eurBRL + usdBRL };
  }, [eur, usd, eurRate, usdRate]);

  if (!loaded) return null;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Banco de emergência</h1>
      <p className="text-sm text-warm-400 mb-8">Reserva separada do orçamento da viagem — só encostar se algo der errado · edite os valores que salva sozinho</p>

      <div className="bg-bg-dark text-white rounded-xl p-6 mb-6">
        <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase">Total da reserva</p>
        <p className="text-4xl font-light text-gold mt-2">R$ {Math.round(calc.totalBRL).toLocaleString()}</p>
        <p className="text-sm text-warm-400 mt-1">€ {eur.toLocaleString()} + US$ {usd.toLocaleString()} · convertidos nas cotações abaixo</p>
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
        </div>
      </div>

      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5">
        <p className="text-sm font-semibold mb-2">Pra que serve (e pra que NÃO serve)</p>
        <ul className="text-sm text-warm-400 space-y-1.5">
          <li>✅ Emergência médica, voo perdido/cancelado, roubo/perda de cartão, passagem de volta inesperada</li>
          <li>✅ Manter parte em espécie escondida na mala (não tudo junto com a carteira)</li>
          <li>❌ Não é pra hostel, passeio, festa ou "faltou dinheiro no fim do mês" — isso é o orçamento normal (US$ 3.000)</li>
        </ul>
      </div>
    </div>
  );
}
