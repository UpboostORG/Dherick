"use client";
import { useState } from "react";
import { trip } from "@/data/trip";
import PdfUpload from "@/components/PdfUpload";
import { useChecklist } from "@/hooks/useChecklist";
import { useEditableData } from "@/hooks/useEditableData";

type Confirmed = typeof trip.flights.confirmed[0];
type ToBuy = typeof trip.flights.toBuy[0];

export default function Passagens() {
  const { items, loaded: checkLoaded } = useChecklist();
  const { data: confirmed, loaded: l1, updateItem: updateConfirmed, addItem: addConfirmed, removeItem: removeConfirmed } = useEditableData<Confirmed>("flights-confirmed", trip.flights.confirmed);
  const { data: toBuy, loaded: l2, updateItem: updateToBuy, addItem: addToBuy, removeItem: removeToBuy } = useEditableData<ToBuy>("flights-tobuy", trip.flights.toBuy);

  const [editConf, setEditConf] = useState<number | null>(null);
  const [editBuy, setEditBuy] = useState<number | null>(null);
  const [draftConf, setDraftConf] = useState<Partial<Confirmed>>({});
  const [draftBuy, setDraftBuy] = useState<Partial<ToBuy>>({});
  const [addingConf, setAddingConf] = useState(false);
  const [addingBuy, setAddingBuy] = useState(false);
  const [newConf, setNewConf] = useState<Partial<Confirmed>>({});
  const [newBuy, setNewBuy] = useState<Partial<ToBuy>>({});

  function isBought(from: string, to: string) {
    const f = from.toLowerCase();
    const t = to.toLowerCase();
    return items.some((i) => {
      if (!i.done) return false;
      const txt = i.text.toLowerCase();
      if (!txt.includes("passagem")) return false;
      return (txt.includes(f) && txt.includes(t)) ||
             txt.includes(`${f}→${t}`) || txt.includes(`${f} → ${t}`) ||
             txt.includes(`${f}→${t.split(" ")[0]}`) || txt.includes(`${f} → ${t.split(" ")[0]}`);
    });
  }

  const bought = toBuy.filter((f) => isBought(f.from, f.to));
  const pending = toBuy.filter((f) => !isBought(f.from, f.to));

  if (!checkLoaded || !l1 || !l2) return null;

  const inputCls = "w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm";
  const labelCls = "text-[10px] text-warm-400 uppercase";

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Passagens aéreas</h1>
      <p className="text-sm text-warm-400 mb-8">
        {confirmed.length + bought.length} trecho{confirmed.length + bought.length !== 1 ? "s" : ""} confirmado{confirmed.length + bought.length !== 1 ? "s" : ""} · {pending.length} a comprar · ✏️ para editar
      </p>

      <p className="text-[11px] font-medium tracking-[1.5px] text-green-700 uppercase mb-4">Confirmadas</p>
      <div className="space-y-3 mb-4">
        {confirmed.map((f, i) => {
          if (editConf === i) {
            return (
              <div key={i} className="bg-white rounded-xl border-2 border-gold/40 p-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div><label className={labelCls}>De</label><input className={inputCls} value={draftConf.from || ""} onChange={(e) => setDraftConf({ ...draftConf, from: e.target.value })} /></div>
                  <div><label className={labelCls}>Para</label><input className={inputCls} value={draftConf.to || ""} onChange={(e) => setDraftConf({ ...draftConf, to: e.target.value })} /></div>
                  <div><label className={labelCls}>Cia aérea</label><input className={inputCls} value={draftConf.airline || ""} onChange={(e) => setDraftConf({ ...draftConf, airline: e.target.value })} /></div>
                  <div><label className={labelCls}>Ref</label><input className={inputCls} value={draftConf.ref || ""} onChange={(e) => setDraftConf({ ...draftConf, ref: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><label className={labelCls}>Data</label><input className={inputCls} value={draftConf.date || ""} onChange={(e) => setDraftConf({ ...draftConf, date: e.target.value })} /></div>
                  <div><label className={labelCls}>Horário</label><input className={inputCls} value={draftConf.time || ""} onChange={(e) => setDraftConf({ ...draftConf, time: e.target.value })} /></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { updateConfirmed(i, draftConf); setEditConf(null); }} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Salvar</button>
                  <button onClick={() => setEditConf(null)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
                  <button onClick={() => { removeConfirmed(i); setEditConf(null); }} className="text-xs text-red-500 px-4 py-1.5 rounded-lg border border-red-200/40 ml-auto">Remover</button>
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold whitespace-nowrap">{f.from} → {f.to}</span>
                <div>
                  <p className="text-sm font-medium">{f.airline}</p>
                  <p className="text-xs text-warm-400">{f.date} · {f.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] text-warm-400 uppercase">Ref</p>
                  <p className="text-sm font-mono font-semibold">{f.ref}</p>
                </div>
                <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">Confirmado</span>
                <button onClick={() => { setEditConf(i); setDraftConf({ ...f }); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-warm-400 hover:text-gold text-sm">✏️</button>
              </div>
            </div>
          );
        })}
      </div>
      {addingConf ? (
        <div className="bg-white rounded-xl border-2 border-gold/40 p-4 mb-10">
          <p className="text-xs font-medium text-gold uppercase mb-3">Novo voo confirmado</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div><label className={labelCls}>De</label><input className={inputCls} value={newConf.from || ""} onChange={(e) => setNewConf({ ...newConf, from: e.target.value })} /></div>
            <div><label className={labelCls}>Para</label><input className={inputCls} value={newConf.to || ""} onChange={(e) => setNewConf({ ...newConf, to: e.target.value })} /></div>
            <div><label className={labelCls}>Cia aérea</label><input className={inputCls} value={newConf.airline || ""} onChange={(e) => setNewConf({ ...newConf, airline: e.target.value })} /></div>
            <div><label className={labelCls}>Ref</label><input className={inputCls} value={newConf.ref || ""} onChange={(e) => setNewConf({ ...newConf, ref: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><label className={labelCls}>Data</label><input className={inputCls} value={newConf.date || ""} onChange={(e) => setNewConf({ ...newConf, date: e.target.value })} /></div>
            <div><label className={labelCls}>Horário</label><input className={inputCls} value={newConf.time || ""} onChange={(e) => setNewConf({ ...newConf, time: e.target.value })} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { addConfirmed(newConf as Confirmed); setAddingConf(false); setNewConf({}); }} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Adicionar</button>
            <button onClick={() => setAddingConf(false)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAddingConf(true)} className="text-sm text-gold hover:text-gold/80 font-medium mb-10 flex items-center gap-1">+ Adicionar voo confirmado</button>
      )}

      {bought.length > 0 && (
        <>
          <p className="text-[11px] font-medium tracking-[1.5px] text-green-600 uppercase mb-4">Compradas (marcadas no checklist)</p>
          <div className="space-y-3 mb-10">
            {bought.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-green-200/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{f.from} → {f.to}</p>
                  <p className="text-sm text-warm-400">{f.note}</p>
                </div>
                <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">Comprada ✓</span>
              </div>
            ))}
          </div>
        </>
      )}

      {pending.length > 0 && (
        <>
          <p className="text-[11px] font-medium tracking-[1.5px] text-red-500 uppercase mb-4">A Comprar</p>
          <div className="space-y-3 mb-4">
            {pending.map((f, idx) => {
              const realIdx = toBuy.indexOf(f);
              if (editBuy === realIdx) {
                return (
                  <div key={idx} className="bg-white rounded-xl border-2 border-gold/40 p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                      <div><label className={labelCls}>De</label><input className={inputCls} value={draftBuy.from || ""} onChange={(e) => setDraftBuy({ ...draftBuy, from: e.target.value })} /></div>
                      <div><label className={labelCls}>Para</label><input className={inputCls} value={draftBuy.to || ""} onChange={(e) => setDraftBuy({ ...draftBuy, to: e.target.value })} /></div>
                      <div>
                        <label className={labelCls}>Prioridade</label>
                        <select className={`${inputCls} bg-white`} value={draftBuy.priority || "MÉDIA"} onChange={(e) => setDraftBuy({ ...draftBuy, priority: e.target.value })}>
                          <option value="ALTA">ALTA</option>
                          <option value="MÉDIA">MÉDIA</option>
                          <option value="BAIXA">BAIXA</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className={labelCls}>Nota</label>
                      <input className={inputCls} value={draftBuy.note || ""} onChange={(e) => setDraftBuy({ ...draftBuy, note: e.target.value })} />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { updateToBuy(realIdx, draftBuy); setEditBuy(null); }} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Salvar</button>
                      <button onClick={() => setEditBuy(null)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
                      <button onClick={() => { removeToBuy(realIdx); setEditBuy(null); }} className="text-xs text-red-500 px-4 py-1.5 rounded-lg border border-red-200/40 ml-auto">Remover</button>
                    </div>
                  </div>
                );
              }
              return (
                <div key={idx} className="bg-white rounded-xl border border-warm-200/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                  <div>
                    <p className="font-semibold">{f.from} → {f.to}</p>
                    <p className="text-sm text-warm-400">{f.note}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap ${
                      f.priority === "ALTA" ? "text-red-600 bg-red-50" :
                      f.priority === "MÉDIA" ? "text-amber-600 bg-amber-50" :
                      "text-warm-400 bg-warm-200/30"
                    }`}>
                      {f.priority}
                    </span>
                    <button onClick={() => { setEditBuy(realIdx); setDraftBuy({ ...f }); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-warm-400 hover:text-gold text-sm">✏️</button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {addingBuy ? (
        <div className="bg-white rounded-xl border-2 border-gold/40 p-4 mb-6">
          <p className="text-xs font-medium text-gold uppercase mb-3">Nova passagem a comprar</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            <div><label className={labelCls}>De</label><input className={inputCls} value={newBuy.from || ""} onChange={(e) => setNewBuy({ ...newBuy, from: e.target.value })} /></div>
            <div><label className={labelCls}>Para</label><input className={inputCls} value={newBuy.to || ""} onChange={(e) => setNewBuy({ ...newBuy, to: e.target.value })} /></div>
            <div>
              <label className={labelCls}>Prioridade</label>
              <select className={`${inputCls} bg-white`} value={newBuy.priority || "MÉDIA"} onChange={(e) => setNewBuy({ ...newBuy, priority: e.target.value })}>
                <option value="ALTA">ALTA</option>
                <option value="MÉDIA">MÉDIA</option>
                <option value="BAIXA">BAIXA</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className={labelCls}>Nota</label>
            <input className={inputCls} value={newBuy.note || ""} onChange={(e) => setNewBuy({ ...newBuy, note: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => { addToBuy(newBuy as ToBuy); setAddingBuy(false); setNewBuy({}); }} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Adicionar</button>
            <button onClick={() => setAddingBuy(false)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAddingBuy(true)} className="text-sm text-gold hover:text-gold/80 font-medium mb-6 flex items-center gap-1">+ Adicionar passagem</button>
      )}

      <PdfUpload section="passagens" onExtracted={(data) => console.log("Extracted flight data:", data)} />
    </div>
  );
}
