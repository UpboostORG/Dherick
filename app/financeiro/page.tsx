"use client";
import { useState } from "react";
import { trip } from "@/data/trip";
import { useChecklist } from "@/hooks/useChecklist";
import { useEditableData } from "@/hooks/useEditableData";

type Dist = { destination: string; amount: number };

export default function Financeiro() {
  const b = trip.budget;
  const hs = b.hostelSavings;
  const { items, loaded: checkLoaded } = useChecklist();
  const { data: distribution, loaded: distLoaded, updateItem, addItem, removeItem } = useEditableData<Dist>("budget-dist", b.distribution);

  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<Partial<Dist>>({});
  const [adding, setAdding] = useState(false);
  const [newDist, setNewDist] = useState<Partial<Dist>>({});

  const distributed = distribution.reduce((s, d) => s + d.amount, 0);

  const hostelsPending = items.filter((i) => !i.done && i.text.toLowerCase().includes("hostel")).length;
  const flightsPending = items.filter((i) => !i.done && i.text.toLowerCase().includes("passagem")).length;
  const seguroPending = items.some((i) => !i.done && i.text.toLowerCase().includes("seguro"));

  const pendingTags: string[] = [];
  if (hostelsPending > 0) pendingTags.push(`${hostelsPending} hostel${hostelsPending > 1 ? "s" : ""} a reservar`);
  if (flightsPending > 0) pendingTags.push(`${flightsPending} passagen${flightsPending > 1 ? "s" : ""} a comprar`);
  if (seguroPending) pendingTags.push("Seguro viagem");

  if (!checkLoaded || !distLoaded) return null;

  const inputCls = "w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm";

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Orçamento &amp; notas</h1>
      <p className="text-sm text-warm-400 mb-8">Seu dinheiro de gasto, moedas e dicas · ✏️ para editar valores</p>

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
          <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${(distributed / b.total) * 100}%` }} />
        </div>
      </div>

      <div className="bg-green-50 rounded-xl border border-green-200/50 p-5 mb-6">
        <div className="flex items-start gap-2">
          <span className="text-lg">🏠</span>
          <div>
            <h3 className="font-semibold text-green-800">Economia com hostels: ~US$ {hs.saved.toLocaleString()}</h3>
            <p className="text-sm text-green-700 mt-1">
              Total hospedagem em hostels: ~US$ {hs.hostelTotal} (contra ~US$ {hs.hotelTotal.toLocaleString()}+ em hotéis).
              Dinheiro extra para passeios, balão da Capadócia, ferry em Santorini, etc.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-warm-200/40 overflow-hidden mb-4">
        {distribution.map((d, i) => {
          if (editIdx === i) {
            return (
              <div key={i} className="flex items-center gap-3 p-4 border-b border-warm-200/20 last:border-0 bg-gold/5">
                <input className={`${inputCls} flex-1`} value={draft.destination || ""} onChange={(e) => setDraft({ ...draft, destination: e.target.value })} />
                <div className="flex items-center gap-1">
                  <span className="text-xs text-warm-400">US$</span>
                  <input type="number" className="w-20 border border-warm-200/40 rounded px-2 py-1.5 text-sm font-mono text-right" value={draft.amount ?? 0} onChange={(e) => setDraft({ ...draft, amount: Number(e.target.value) || 0 })} />
                </div>
                <button onClick={() => { updateItem(i, draft); setEditIdx(null); }} className="text-xs bg-gold text-white px-3 py-1.5 rounded-lg">OK</button>
                <button onClick={() => setEditIdx(null)} className="text-xs text-warm-400">✕</button>
                <button onClick={() => { removeItem(i); setEditIdx(null); }} className="text-xs text-red-400">🗑</button>
              </div>
            );
          }
          return (
            <div key={i} className="flex items-center justify-between p-4 border-b border-warm-200/20 last:border-0 group">
              <span className="text-sm">{d.destination}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-warm-400">US$</span>
                <span className="font-mono font-semibold bg-bg-dark text-white px-3 py-1.5 rounded-lg text-sm min-w-[60px] text-center">
                  {d.amount}
                </span>
                <button onClick={() => { setEditIdx(i); setDraft({ ...d }); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-warm-400 hover:text-gold text-sm">✏️</button>
              </div>
            </div>
          );
        })}
      </div>

      {adding ? (
        <div className="flex items-center gap-3 mb-6 bg-white rounded-xl border-2 border-gold/40 p-4">
          <input className={`${inputCls} flex-1`} placeholder="Destino" value={newDist.destination || ""} onChange={(e) => setNewDist({ ...newDist, destination: e.target.value })} />
          <div className="flex items-center gap-1">
            <span className="text-xs text-warm-400">US$</span>
            <input type="number" className="w-20 border border-warm-200/40 rounded px-2 py-1.5 text-sm font-mono text-right" value={newDist.amount ?? ""} onChange={(e) => setNewDist({ ...newDist, amount: Number(e.target.value) || 0 })} />
          </div>
          <button onClick={() => { addItem(newDist as Dist); setAdding(false); setNewDist({}); }} className="text-xs bg-gold text-white px-3 py-1.5 rounded-lg">OK</button>
          <button onClick={() => setAdding(false)} className="text-xs text-warm-400">✕</button>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="text-sm text-gold hover:text-gold/80 font-medium mb-6 flex items-center gap-1">+ Adicionar destino</button>
      )}

      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5 mb-6">
        <p className="font-semibold mb-2">Meta: viajar com tudo pago ✈</p>
        <p className="text-sm text-warm-400">
          A ideia é deixar passagens, hospedagens e ingressos 100% pagos antes de embarcar — assim os US$ 3.000 ficam livres só para o dia a dia.
          {pendingTags.length > 0 ? " O que ainda falta:" : ""}
        </p>
        {pendingTags.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-3">
            {pendingTags.map((p, i) => (
              <span key={i} className="text-xs text-gold border border-gold/30 px-3 py-1 rounded-full">{p}</span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-green-600 font-medium mt-3">Tudo reservado e pago! ✓</p>
        )}
      </div>

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
