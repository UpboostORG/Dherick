"use client";
import { useState } from "react";
import { trip } from "@/data/trip";
import PdfUpload from "@/components/PdfUpload";
import { useChecklist } from "@/hooks/useChecklist";
import { useEditableData } from "@/hooks/useEditableData";

type Confirmed = typeof trip.accommodation.confirmed[0];
type ToBook = typeof trip.accommodation.toBook[0];

export default function Hospedagem() {
  const { items, loaded: checkLoaded } = useChecklist();
  const { data: confirmed, loaded: l1, updateItem: updateConf, addItem: addConf, removeItem: removeConf } = useEditableData<Confirmed>("accom-confirmed", trip.accommodation.confirmed);
  const { data: toBook, loaded: l2, updateItem: updateBook, addItem: addBook, removeItem: removeBook } = useEditableData<ToBook>("accom-tobook", trip.accommodation.toBook);
  const tips = trip.accommodation.hostelTips;

  const [editConf, setEditConf] = useState<number | null>(null);
  const [editBook, setEditBook] = useState<number | null>(null);
  const [draftConf, setDraftConf] = useState<Partial<Confirmed>>({});
  const [draftBook, setDraftBook] = useState<Partial<ToBook>>({});
  const [addingConf, setAddingConf] = useState(false);
  const [addingBook, setAddingBook] = useState(false);
  const [newConf, setNewConf] = useState<Partial<Confirmed>>({});
  const [newBook, setNewBook] = useState<Partial<ToBook>>({});

  function isBooked(city: string) {
    return items.some((i) => i.done && i.text.toLowerCase().includes("hostel") && i.text.toLowerCase().includes(city.toLowerCase()));
  }

  const pendingToBook = toBook.filter((h) => !isBooked(h.city.split(" ")[0]));
  const doneToBook = toBook.filter((h) => isBooked(h.city.split(" ")[0]));

  if (!checkLoaded || !l1 || !l2) return null;

  const inputCls = "w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm";
  const labelCls = "text-[10px] text-warm-400 uppercase";

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Hospedagem</h1>
      <p className="text-sm text-warm-400 mb-8">
        {confirmed.length + doneToBook.length} confirmada{confirmed.length + doneToBook.length > 1 ? "s" : ""} · {pendingToBook.length} hostel{pendingToBook.length !== 1 ? "s" : ""} a reservar · ✏️ para editar
      </p>

      <div className="bg-bg-dark text-white rounded-xl p-5 mb-8">
        <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase mb-3">💵 Dinheiro da hospedagem — levar separado dos US$ 3.000</p>
        <div className="space-y-1.5 text-sm">
          {confirmed.map((h, i) => (
            <div key={i} className="flex justify-between gap-3">
              <span className="text-warm-100">{h.city} · {h.checkIn?.split(" ")[0]} → {h.checkOut?.split(" ")[0]}</span>
              <span className="font-mono text-gold whitespace-nowrap">{h.price || "a confirmar"}</span>
            </div>
          ))}
          {pendingToBook.map((h, i) => (
            <div key={i} className="flex justify-between gap-3 opacity-60">
              <span className="text-warm-100">{h.city} · {h.dates} · a reservar</span>
              <span className="font-mono whitespace-nowrap">{h.estimate?.split("(")[0].trim()}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-warm-400 mt-3 border-t border-warm-500/30 pt-2">Reservas com pagamento no local: leve o valor em espécie (USD no Egito, EUR na Grécia). Preencha o valor de cada reserva no ✏️ do card para fechar o total.</p>
      </div>

      {confirmed.map((h, i) => {
        if (editConf === i) {
          return (
            <div key={i} className="bg-white rounded-xl border-2 border-gold/40 p-5 mb-6">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><label className={labelCls}>Cidade</label><input className={inputCls} value={draftConf.city || ""} onChange={(e) => setDraftConf({ ...draftConf, city: e.target.value })} /></div>
                <div><label className={labelCls}>Nome</label><input className={inputCls} value={draftConf.name || ""} onChange={(e) => setDraftConf({ ...draftConf, name: e.target.value })} /></div>
              </div>
              <div className="mb-3"><label className={labelCls}>Endereço</label><input className={inputCls} value={draftConf.address || ""} onChange={(e) => setDraftConf({ ...draftConf, address: e.target.value })} /></div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                <div><label className={labelCls}>Check-in</label><input className={inputCls} value={draftConf.checkIn || ""} onChange={(e) => setDraftConf({ ...draftConf, checkIn: e.target.value })} /></div>
                <div><label className={labelCls}>Check-out</label><input className={inputCls} value={draftConf.checkOut || ""} onChange={(e) => setDraftConf({ ...draftConf, checkOut: e.target.value })} /></div>
                <div><label className={labelCls}>Confirmação</label><input className={inputCls} value={draftConf.confirmation || ""} onChange={(e) => setDraftConf({ ...draftConf, confirmation: e.target.value })} /></div>
                <div><label className={labelCls}>Pin</label><input className={inputCls} value={draftConf.pin || ""} onChange={(e) => setDraftConf({ ...draftConf, pin: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                <div><label className={labelCls}>Telefone</label><input className={inputCls} value={draftConf.tel || ""} onChange={(e) => setDraftConf({ ...draftConf, tel: e.target.value })} /></div>
                <div><label className={labelCls}>Nota</label><input className={inputCls} value={draftConf.note || ""} onChange={(e) => setDraftConf({ ...draftConf, note: e.target.value })} /></div>
                <div><label className={labelCls}>Valor a pagar</label><input className={inputCls} placeholder="ex: US$ 180 no local" value={draftConf.price || ""} onChange={(e) => setDraftConf({ ...draftConf, price: e.target.value })} /></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { updateConf(i, draftConf); setEditConf(null); }} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Salvar</button>
                <button onClick={() => setEditConf(null)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
                <button onClick={() => { removeConf(i); setEditConf(null); }} className="text-xs text-red-500 px-4 py-1.5 rounded-lg border border-red-200/40 ml-auto">Remover</button>
              </div>
            </div>
          );
        }
        return (
          <div key={i} className="bg-white rounded-xl border-2 border-warm-200/60 p-6 mb-6 group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold">{h.city} — {h.name}</h3>
                <p className="text-sm text-warm-400">{h.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">Confirmado</span>
                <button onClick={() => { setEditConf(i); setDraftConf({ ...h }); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-warm-400 hover:text-gold text-sm">✏️</button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 mt-4 text-sm">
              <div><p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Check-in</p><p className="font-mono">{h.checkIn}</p></div>
              <div><p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Check-out</p><p className="font-mono">{h.checkOut}</p></div>
              <div><p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Confirmação</p><p className="font-mono">{h.confirmation}</p></div>
              <div><p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Pin</p><p className="font-mono">{h.pin}</p></div>
              <div><p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Tel</p><p className="font-mono">{h.tel}</p></div>
              <div><p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-1">Valor</p><p className="font-mono text-gold">{h.price || "—"}</p></div>
            </div>
            <p className="text-xs text-warm-400 mt-4 border-t border-warm-200/30 pt-3">{h.note}</p>
          </div>
        );
      })}

      {addingConf ? (
        <div className="bg-white rounded-xl border-2 border-gold/40 p-5 mb-6">
          <p className="text-xs font-medium text-gold uppercase mb-3">Nova hospedagem confirmada</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><label className={labelCls}>Cidade</label><input className={inputCls} value={newConf.city || ""} onChange={(e) => setNewConf({ ...newConf, city: e.target.value })} /></div>
            <div><label className={labelCls}>Nome</label><input className={inputCls} value={newConf.name || ""} onChange={(e) => setNewConf({ ...newConf, name: e.target.value })} /></div>
          </div>
          <div className="mb-3"><label className={labelCls}>Endereço</label><input className={inputCls} value={newConf.address || ""} onChange={(e) => setNewConf({ ...newConf, address: e.target.value })} /></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <div><label className={labelCls}>Check-in</label><input className={inputCls} value={newConf.checkIn || ""} onChange={(e) => setNewConf({ ...newConf, checkIn: e.target.value })} /></div>
            <div><label className={labelCls}>Check-out</label><input className={inputCls} value={newConf.checkOut || ""} onChange={(e) => setNewConf({ ...newConf, checkOut: e.target.value })} /></div>
            <div><label className={labelCls}>Confirmação</label><input className={inputCls} value={newConf.confirmation || ""} onChange={(e) => setNewConf({ ...newConf, confirmation: e.target.value })} /></div>
            <div><label className={labelCls}>Pin</label><input className={inputCls} value={newConf.pin || ""} onChange={(e) => setNewConf({ ...newConf, pin: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            <div><label className={labelCls}>Telefone</label><input className={inputCls} value={newConf.tel || ""} onChange={(e) => setNewConf({ ...newConf, tel: e.target.value })} /></div>
            <div><label className={labelCls}>Nota</label><input className={inputCls} value={newConf.note || ""} onChange={(e) => setNewConf({ ...newConf, note: e.target.value })} /></div>
            <div><label className={labelCls}>Valor a pagar</label><input className={inputCls} placeholder="ex: US$ 180 no local" value={newConf.price || ""} onChange={(e) => setNewConf({ ...newConf, price: e.target.value })} /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { addConf(newConf as Confirmed); setAddingConf(false); setNewConf({}); }} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Adicionar</button>
            <button onClick={() => setAddingConf(false)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAddingConf(true)} className="text-sm text-gold hover:text-gold/80 font-medium mb-8 flex items-center gap-1">+ Adicionar hospedagem confirmada</button>
      )}

      {doneToBook.length > 0 && (
        <>
          <p className="text-[11px] font-medium tracking-[1.5px] text-green-600 uppercase mb-4 mt-8">Marcados como Reservados</p>
          <div className="space-y-3 mb-10">
            {doneToBook.map((h, i) => (
              <div key={i} className="bg-white rounded-xl border border-green-200/60 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{h.city}</p>
                    <p className="text-sm text-warm-400">{h.dates}</p>
                  </div>
                  <span className="text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">Reservado ✓</span>
                </div>
                {h.estimate && <p className="text-xs text-green-600 mt-2 font-mono">{h.estimate}</p>}
              </div>
            ))}
          </div>
        </>
      )}

      {pendingToBook.length > 0 && (
        <>
          <p className="text-[11px] font-medium tracking-[1.5px] text-red-500 uppercase mb-4 mt-8">Hostels a Reservar</p>
          <div className="space-y-3 mb-4">
            {pendingToBook.map((h, idx) => {
              const realIdx = toBook.indexOf(h);
              if (editBook === realIdx) {
                return (
                  <div key={idx} className="bg-white rounded-xl border-2 border-gold/40 p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                      <div><label className={labelCls}>Cidade</label><input className={inputCls} value={draftBook.city || ""} onChange={(e) => setDraftBook({ ...draftBook, city: e.target.value })} /></div>
                      <div><label className={labelCls}>Datas</label><input className={inputCls} value={draftBook.dates || ""} onChange={(e) => setDraftBook({ ...draftBook, dates: e.target.value })} /></div>
                      <div>
                        <label className={labelCls}>Prioridade</label>
                        <select className={`${inputCls} bg-white`} value={draftBook.priority || "FALTA"} onChange={(e) => setDraftBook({ ...draftBook, priority: e.target.value })}>
                          <option value="URGENTE">URGENTE</option>
                          <option value="FALTA">FALTA</option>
                          <option value="PENDENTE">PENDENTE</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-3"><label className={labelCls}>Estimativa</label><input className={inputCls} value={draftBook.estimate || ""} onChange={(e) => setDraftBook({ ...draftBook, estimate: e.target.value })} /></div>
                    <div className="flex gap-2">
                      <button onClick={() => { updateBook(realIdx, draftBook); setEditBook(null); }} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Salvar</button>
                      <button onClick={() => setEditBook(null)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
                      <button onClick={() => { removeBook(realIdx); setEditBook(null); }} className="text-xs text-red-500 px-4 py-1.5 rounded-lg border border-red-200/40 ml-auto">Remover</button>
                    </div>
                  </div>
                );
              }
              return (
                <div key={idx} className="bg-white rounded-xl border border-warm-200/40 p-5 group">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{h.city}</p>
                      <p className="text-sm text-warm-400">{h.dates}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-lg ${
                        h.priority === "URGENTE" ? "text-red-700 bg-red-50" :
                        h.priority === "FALTA" ? "text-red-500 bg-red-50" :
                        "text-amber-600 bg-amber-50"
                      }`}>{h.priority}</span>
                      <button onClick={() => { setEditBook(realIdx); setDraftBook({ ...h }); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-warm-400 hover:text-gold text-sm">✏️</button>
                    </div>
                  </div>
                  {h.estimate && <p className="text-xs text-green-600 mt-2 font-mono">{h.estimate}</p>}
                </div>
              );
            })}
          </div>
        </>
      )}

      {addingBook ? (
        <div className="bg-white rounded-xl border-2 border-gold/40 p-4 mb-6">
          <p className="text-xs font-medium text-gold uppercase mb-3">Novo hostel a reservar</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
            <div><label className={labelCls}>Cidade</label><input className={inputCls} value={newBook.city || ""} onChange={(e) => setNewBook({ ...newBook, city: e.target.value })} /></div>
            <div><label className={labelCls}>Datas</label><input className={inputCls} value={newBook.dates || ""} onChange={(e) => setNewBook({ ...newBook, dates: e.target.value })} /></div>
            <div>
              <label className={labelCls}>Prioridade</label>
              <select className={`${inputCls} bg-white`} value={newBook.priority || "FALTA"} onChange={(e) => setNewBook({ ...newBook, priority: e.target.value })}>
                <option value="URGENTE">URGENTE</option>
                <option value="FALTA">FALTA</option>
                <option value="PENDENTE">PENDENTE</option>
              </select>
            </div>
          </div>
          <div className="mb-3"><label className={labelCls}>Estimativa</label><input className={inputCls} value={newBook.estimate || ""} onChange={(e) => setNewBook({ ...newBook, estimate: e.target.value })} /></div>
          <div className="flex gap-2">
            <button onClick={() => { addBook(newBook as ToBook); setAddingBook(false); setNewBook({}); }} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Adicionar</button>
            <button onClick={() => setAddingBook(false)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAddingBook(true)} className="text-sm text-gold hover:text-gold/80 font-medium mb-10 flex items-center gap-1">+ Adicionar hostel</button>
      )}

      <h2 className="text-xl font-serif mb-4">Hostels recomendados por destino</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {tips.map((t, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-sm">{t.city}</h3>
              <span className="text-xs text-gold font-mono">{t.priceRange}</span>
            </div>
            {t.hostels.map((name, j) => (
              <p key={j} className="text-sm text-warm-400 py-0.5">• {name}</p>
            ))}
          </div>
        ))}
      </div>

      <PdfUpload section="hospedagem" onExtracted={(data) => console.log("Extracted hotel data:", data)} />
    </div>
  );
}
