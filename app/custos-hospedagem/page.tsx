"use client";
import { useState, useEffect, useMemo } from "react";
import { trip } from "@/data/trip";

const STATUS_STYLES: Record<string, string> = {
  PARCIAL: "text-gold bg-gold/10",
  "PAGAR NO LOCAL": "text-gold bg-gold/10",
  "VALOR PENDENTE": "text-red-600 bg-red-50",
  "A RESERVAR": "text-warm-400 bg-warm-200/30",
  PAGO: "text-green-700 bg-green-100",
};

export default function CustosHospedagem() {
  const stays = trip.accommodationCosts.stays;
  const [rate, setRate] = useState(trip.accommodationCosts.eurRate);
  const [usdRate, setUsdRate] = useState(5.20);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const r = localStorage.getItem("__custos_eurrate");
    const u = localStorage.getItem("__custos_usdrate");
    if (r) setRate(Number(r));
    if (u) setUsdRate(Number(u));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("__custos_eurrate", String(rate));
    localStorage.setItem("__custos_usdrate", String(usdRate));
  }, [rate, usdRate, loaded]);

  const refunds = trip.accommodationCosts.refundsIncoming || [];
  const refundUsdTotal = refunds.reduce((s, r) => s + r.amountUsd, 0);

  const calc = useMemo(() => {
    const paid = stays.reduce((s, x) => s + x.paidEur, 0);
    const due = stays.reduce((s, x) => s + x.dueEur, 0);
    const dueUsd = stays.reduce((s, x) => s + x.dueUsd, 0);
    const unknown = stays.filter((x) => x.status === "VALOR PENDENTE").length;
    const toReserve = stays.filter((x) => x.status === "A RESERVAR").length;
    return { paid, due, dueUsd, unknown, toReserve };
  }, [stays]);

  if (!loaded) return null;

  const brl = (eur: number) => `R$ ${Math.round(eur * rate).toLocaleString()}`;
  const brlTotal = () => `R$ ${Math.round(calc.due * rate + calc.dueUsd * usdRate).toLocaleString()}`;

  // Aplica o reembolso primeiro no USD devido, sobra vira crédito em EUR (via ponte BRL)
  const usdAfterRefund = Math.max(0, calc.dueUsd - refundUsdTotal);
  const usdSurplus = Math.max(0, refundUsdTotal - calc.dueUsd);
  const eurSurplusCredit = usdSurplus > 0 ? (usdSurplus * usdRate) / rate : 0;
  const eurAfterRefund = Math.max(0, calc.due - eurSurplusCredit);
  const netBrlAfterRefund = Math.round(eurAfterRefund * rate + usdAfterRefund * usdRate);

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Custos de hospedagem</h1>
      <p className="text-sm text-warm-400 mb-6">Quanto você já pagou, quanto vai pagar na viagem e o que ainda falta reservar — dinheiro separado dos US$ 4.000</p>

      <div className="bg-bg-dark text-white rounded-xl p-6 mb-6">
        <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase">A pagar no local — comprovantes reais</p>
        <p className="text-4xl font-light text-gold mt-2">€ {calc.due.toFixed(2)} + US$ {calc.dueUsd.toFixed(2)}</p>
        <p className="text-sm text-warm-400 mt-1">
          ≈ {brlTotal()} no total · cotações R${" "}
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            step="0.01"
            className="w-14 bg-warm-500/30 text-white text-center rounded px-1 py-0.5 text-sm font-mono inline"
          />
          {" "}/€ e R${" "}
          <input
            type="number"
            value={usdRate}
            onChange={(e) => setUsdRate(Number(e.target.value) || 0)}
            step="0.01"
            className="w-14 bg-warm-500/30 text-white text-center rounded px-1 py-0.5 text-sm font-mono inline"
          />
          {" "}/US$
        </p>
        <div className="text-xs text-warm-400 mt-3 border-t border-warm-500/30 pt-2 space-y-1">
          {calc.unknown > 0 && (
            <p className="text-red-300">⚠️ {calc.unknown} reserva{calc.unknown > 1 ? "s" : ""} do Egito sem valor — pegar no app do Booking (o total sobe quando entrar)</p>
          )}
          {calc.toReserve > 0 && (
            <p>{calc.toReserve} estadia{calc.toReserve > 1 ? "s" : ""} ainda sem reserva — sem valor até você reservar</p>
          )}
        </div>
      </div>

      {refunds.length > 0 && (
        <div className="bg-green-50 rounded-xl border border-green-200/50 p-5 mb-6">
          <p className="text-[11px] font-medium tracking-[1.5px] text-green-700 uppercase mb-3">💸 Reembolso a caminho — abate o valor dos hotéis</p>
          {refunds.map((r, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex justify-between items-start gap-3">
                <p className="text-sm font-semibold text-green-800">{r.name}</p>
                <p className="text-sm font-mono text-green-700">{r.amountLabel}</p>
              </div>
              <p className="text-xs text-green-700 mt-1">{r.status}</p>
              <p className="text-xs text-green-700">{r.deadline}</p>
              <p className="text-xs text-warm-400 mt-1">{r.note}</p>
            </div>
          ))}
          <div className="border-t border-green-200/50 mt-3 pt-3">
            <p className="text-xs text-warm-400">Dinheiro NOVO que ainda precisa entrar no Nomad, já descontando esse reembolso:</p>
            <p className="text-lg font-mono text-green-700 mt-1">
              € {eurAfterRefund.toFixed(2)} + US$ {usdAfterRefund.toFixed(2)} <span className="text-xs text-warm-400">(≈ R$ {netBrlAfterRefund.toLocaleString()})</span>
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-green-200/60 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Já pago (sinais)</p>
          <p className="text-2xl font-light text-green-600 mt-2">€ {calc.paid.toFixed(2)}</p>
          <p className="text-xs text-warm-400 mt-1">{brl(calc.paid)} · sinais no Hostelworld (Dubai, Atenas, Caveland)</p>
        </div>
        <div className="bg-white rounded-xl border-2 border-gold/30 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">A pagar no local</p>
          <p className="text-2xl font-light text-gold mt-2">€ {calc.due.toFixed(2)} + US$ {calc.dueUsd.toFixed(2)}</p>
          <p className="text-xs text-warm-400 mt-1">Dubai € 60,78 + Atenas € 42,71 + Caveland € 81,74 + Egito US$ 207,10 · só o Cairo aceita cartão, o resto é dinheiro</p>
        </div>
      </div>

      <div className="space-y-3">
        {stays.map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5">
            <div className="flex justify-between items-start gap-3 mb-2">
              <div>
                <p className="font-semibold text-sm">{s.city} — {s.name}</p>
                <p className="text-xs text-warm-400">{s.dates}{s.ref !== "—" ? ` · ref ${s.ref}` : ""}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap ${STATUS_STYLES[s.status]}`}>{s.status}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-warm-200/30">
              <div>
                <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-0.5">Total</p>
                <p className="text-sm font-mono">{s.totalLabel}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-0.5">Pago</p>
                <p className="text-sm font-mono text-green-600">{s.paidLabel}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-0.5">Falta pagar</p>
                <p className="text-sm font-mono text-gold">{s.dueLabel}</p>
              </div>
            </div>
            <p className="text-xs text-warm-400 mt-3">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5 mt-6">
        <p className="text-sm font-semibold mb-2">Como levar esse dinheiro</p>
        <ul className="text-sm text-warm-400 space-y-1.5">
          <li>🇪🇬 Egito paga em <strong className="text-bg-dark">USD</strong> (lei p/ estrangeiros): King's Gate US$ 124,20 aceita cartão · <strong className="text-bg-dark">Luxor US$ 82,90 SÓ DINHEIRO — leve ~US$ 85 em espécie</strong></li>
          <li>🇬🇷 Grécia: <strong className="text-bg-dark">euros em espécie</strong> — Athens Hawks € 42,71 + Caveland € 81,74 (valor exato) + € 10 de caução = leve ~€ 220 em notas</li>
          <li>💳 Divisão dos cartões: dia a dia sai do <strong className="text-bg-dark">Wise (US$ 4.000)</strong> · hotéis saem do <strong className="text-bg-dark">Nomad</strong> · <strong className="text-bg-dark">Revolut</strong> é só a reserva de emergência — não encostar</li>
          <li>Luxor (US$ 82,90) é o único que exige espécie — nenhum cartão resolve, separa as notas</li>
        </ul>
      </div>
    </div>
  );
}
