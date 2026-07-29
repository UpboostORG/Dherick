"use client";
import { useState, useEffect, useMemo } from "react";
import { trip } from "@/data/trip";

const STATUS_STYLES: Record<string, string> = {
  PARCIAL: "text-gold bg-gold/10",
  "VALOR PENDENTE": "text-red-600 bg-red-50",
  "A RESERVAR": "text-warm-400 bg-warm-200/30",
  PAGO: "text-green-700 bg-green-100",
};

export default function CustosHospedagem() {
  const stays = trip.accommodationCosts.stays;
  const [rate, setRate] = useState(trip.accommodationCosts.eurRate);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const r = localStorage.getItem("__custos_eurrate");
    if (r) setRate(Number(r));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("__custos_eurrate", String(rate));
  }, [rate, loaded]);

  const calc = useMemo(() => {
    const paid = stays.reduce((s, x) => s + x.paidEur, 0);
    const due = stays.reduce((s, x) => s + x.dueEur, 0);
    const unknown = stays.filter((x) => x.status === "VALOR PENDENTE").length;
    const toReserve = stays.filter((x) => x.status === "A RESERVAR").length;
    return { paid, due, unknown, toReserve };
  }, [stays]);

  if (!loaded) return null;

  const brl = (eur: number) => `R$ ${Math.round(eur * rate).toLocaleString()}`;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Custos de hospedagem</h1>
      <p className="text-sm text-warm-400 mb-6">Quanto você já pagou, quanto vai pagar na viagem e o que ainda falta reservar — dinheiro separado dos US$ 3.000</p>

      <div className="bg-bg-dark text-white rounded-xl p-6 mb-6">
        <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase">A pagar no local — comprovantes reais</p>
        <p className="text-4xl font-light text-gold mt-2">€ {calc.due.toFixed(2)}</p>
        <p className="text-sm text-warm-400 mt-1">
          ≈ {brl(calc.due)} · cotação R${" "}
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value) || 0)}
            step="0.01"
            className="w-14 bg-warm-500/30 text-white text-center rounded px-1 py-0.5 text-sm font-mono inline"
          />
          {" "}/€
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-green-200/60 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">Já pago (sinais)</p>
          <p className="text-2xl font-light text-green-600 mt-2">€ {calc.paid.toFixed(2)}</p>
          <p className="text-xs text-warm-400 mt-1">{brl(calc.paid)} · Hostelworld (Dubai + Atenas)</p>
        </div>
        <div className="bg-white rounded-xl border-2 border-gold/30 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase">A pagar no local</p>
          <p className="text-2xl font-light text-gold mt-2">€ {calc.due.toFixed(2)}</p>
          <p className="text-xs text-warm-400 mt-1">{brl(calc.due)} · Dubai € 60,78 + Atenas € 42,71</p>
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
          <li>🇦🇪 Dubai e 🇪🇬 Egito: pagam em <strong className="text-bg-dark">USD em espécie ou AED/EGP</strong> — leve dólares para as diárias do Egito</li>
          <li>🇬🇷 Grécia: <strong className="text-bg-dark">euros</strong> — o Athens Hawks cobra € 42,71 no check-in</li>
          <li>Guarde esse valor separado dos US$ 3.000 do dia a dia (é o que a aba de metas controla)</li>
        </ul>
      </div>
    </div>
  );
}
