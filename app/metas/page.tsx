"use client";
import { useState, useEffect, useMemo } from "react";

export default function Metas() {
  const [exchangeRate, setExchangeRate] = useState(5.20);
  const [invested, setInvested] = useState(1000);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedRate = localStorage.getItem("__metas_rate");
    const savedInv = localStorage.getItem("__metas_invested");
    if (savedRate) setExchangeRate(Number(savedRate));
    if (savedInv) setInvested(Number(savedInv));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("__metas_rate", String(exchangeRate));
    localStorage.setItem("__metas_invested", String(invested));
  }, [exchangeRate, invested, loaded]);
  const totalUSD = 3000;

  const calc = useMemo(() => {
    const totalBRL = totalUSD * exchangeRate;
    const investedBRL = invested * exchangeRate;
    const remaining = totalUSD - invested;
    const remainingBRL = remaining * exchangeRate;
    const departureDate = new Date("2026-09-24");
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const startFrom = nextMonth > departureDate ? now : nextMonth;
    const daysLeft = Math.max(1, Math.ceil((departureDate.getTime() - startFrom.getTime()) / 86400000));
    const weeksLeft = Math.max(1, Math.ceil(daysLeft / 7));
    const monthsLeft = Math.max(0.1, daysLeft / 30);
    const pct = Math.round((invested / totalUSD) * 100);
    return {
      totalBRL, investedBRL, remaining, remainingBRL,
      perMonth: Math.ceil(remainingBRL / monthsLeft),
      perWeek: Math.ceil(remainingBRL / weeksLeft),
      perDay: Math.ceil(remainingBRL / daysLeft),
      monthsLeft: monthsLeft.toFixed(1),
      weeksLeft: `~${weeksLeft}`,
      daysLeft,
      pct,
    };
  }, [exchangeRate, invested]);

  if (!loaded) return null;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Metas de investimento</h1>
      <p className="text-sm text-warm-400 mb-8">Quanto guardar por mês, semana e dia até a partida · ajuste o já investido e a cotação</p>

      {/* Main card */}
      <div className="bg-bg-dark text-white rounded-xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase">Meta Total</p>
            <p className="text-4xl font-light text-gold mt-2">US$ {totalUSD.toLocaleString()}</p>
            <p className="text-sm text-warm-400 mt-1">
              ≈ R$ {calc.totalBRL.toLocaleString()} · cotação R${" "}
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(Number(e.target.value) || 0)}
                step="0.01"
                className="w-14 bg-warm-500/30 text-white text-center rounded px-1 py-0.5 text-sm font-mono inline"
              />
              {" "}/US$
            </p>
            <p className="text-xs text-warm-400 mt-1">Ajuste a cotação acima se necessário</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Já investido</p>
            <div className="flex items-center gap-2 mt-1 justify-end">
              <span className="text-sm text-warm-400">US$</span>
              <input
                type="number"
                value={invested}
                onChange={(e) => setInvested(Number(e.target.value) || 0)}
                className="w-20 bg-warm-500/30 text-white text-right rounded px-2 py-1 text-2xl font-semibold font-mono"
              />
            </div>
            <p className="text-xs text-green-400 mt-1">≈ R$ {calc.investedBRL.toLocaleString()} guardados</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-2 bg-warm-500/30 rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${Math.min(100, calc.pct)}%` }} />
          </div>
          <div className="flex justify-between text-xs text-warm-400 mt-2">
            <span>{calc.pct}% da meta concluído</span>
            <span>Faltam US$ {calc.remaining.toLocaleString()} · R$ {calc.remainingBRL.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border-2 border-gold/30 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Por mês</p>
          <p className="text-3xl font-light text-gold mt-2">R$ {calc.perMonth.toLocaleString()}</p>
          <p className="text-xs text-warm-400 mt-1">≈ US$ {Math.ceil(calc.remaining / Number(calc.monthsLeft))} · por ~{calc.monthsLeft} meses</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Por semana</p>
          <p className="text-3xl font-light mt-2">R$ {calc.perWeek.toLocaleString()}</p>
          <p className="text-xs text-warm-400 mt-1">por {calc.weeksLeft} semanas</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Por dia</p>
          <p className="text-3xl font-light mt-2">R$ {calc.perDay.toLocaleString()}</p>
          <p className="text-xs text-warm-400 mt-1">faltam {calc.daysLeft} dias</p>
        </div>
      </div>

      {/* Tip */}
      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5">
        <p className="text-sm text-warm-400">
          Guardando <strong className="text-bg-dark">R$ {calc.perMonth.toLocaleString()} por mês</strong> (ou R$ {calc.perWeek.toLocaleString()} por semana) você chega aos US$ {totalUSD.toLocaleString()} antes de embarcar. Mude o valor já investido ou a cotação do dólar acima que tudo recalcula sozinho.
        </p>
      </div>
    </div>
  );
}
