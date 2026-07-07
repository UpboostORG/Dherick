"use client";
import { useState } from "react";
import { trip } from "@/data/trip";
import { useChecklist } from "@/hooks/useChecklist";
import { useEditableData } from "@/hooks/useEditableData";

const statusOverrides: Record<string, { checkText: string; okTag: string }> = {
  "Dubai": { checkText: "Reservar hostel Dubai", okTag: "5 dias · hostel OK" },
  "Cairo": { checkText: "Reservar hostel Cairo", okTag: "hostel OK" },
  "Luxor": { checkText: "Reservar hostel Luxor", okTag: "3 noites · OK" },
  "STARLIGHT": { checkText: "Comprar ingressos festival STARLIGHT", okTag: "Ingresso OK" },
  "Atenas": { checkText: "Reservar hostel Atenas", okTag: "3 noites · hostel OK" },
  "Santorini": { checkText: "Reservar hostel Santorini", okTag: "hostel OK" },
  "Istambul": { checkText: "Reservar hostel Istambul", okTag: "~4 noites · hostel OK" },
};

interface ItineraryItem { date: string; from?: string; to?: string; place?: string; status: string; tag: string; detail: string; }

export default function Roteiro() {
  const { items, loaded: checkLoaded } = useChecklist();
  const { data: itinerary, loaded: dataLoaded, updateItem, addItem, removeItem } = useEditableData<ItineraryItem>("itinerary", trip.itinerary as ItineraryItem[]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<Partial<ItineraryItem>>({});
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ItineraryItem>>({ date: "", place: "", status: "warning", tag: "", detail: "" });

  function isDone(checkText: string) {
    return items.some((i) => i.done && i.text.includes(checkText));
  }

  function resolveItem(item: ItineraryItem) {
    const place = item.place || "";
    for (const [key, override] of Object.entries(statusOverrides)) {
      if (place.includes(key)) {
        if (isDone(override.checkText)) {
          return { status: "ok" as const, tag: override.okTag, detail: item.detail.replace(/Hostel ainda não reservado\.?/, "Hostel reservado.").replace(/Hostel a reservar\.?/, "Hostel reservado.").replace(/Hostel a definir\.?/, "Hostel reservado.") };
        }
      }
    }
    return { status: item.status, tag: item.tag, detail: item.detail };
  }

  function startEdit(i: number) {
    setEditIdx(i);
    setDraft({ ...itinerary[i] });
  }

  function saveEdit() {
    if (editIdx === null) return;
    updateItem(editIdx, draft);
    setEditIdx(null);
    setDraft({});
  }

  function handleAdd() {
    const item = {
      date: newItem.date || "a definir",
      place: newItem.place || "Novo destino",
      status: "warning" as const,
      tag: newItem.tag || "A definir",
      detail: newItem.detail || "",
    } as ItineraryItem;
    addItem(item);
    setAdding(false);
    setNewItem({ date: "", place: "", status: "warning", tag: "", detail: "" });
  }

  if (!checkLoaded || !dataLoaded) return null;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Roteiro</h1>
      <p className="text-sm text-warm-400 mb-8">Ida sem volta definida · clique no ✏️ para editar</p>

      <div className="relative">
        <div className="absolute left-[72px] top-0 bottom-0 w-px bg-warm-200/40 hidden sm:block" />

        <div className="space-y-0">
          {itinerary.map((item, i) => {
            const resolved = resolveItem(item);
            const isOk = item.status === "ok" || resolved.status === "ok";
            const isEditing = editIdx === i;

            if (isEditing) {
              return (
                <div key={i} className="bg-white rounded-xl border-2 border-gold/40 p-4 my-2">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-[10px] text-warm-400 uppercase">Data</label>
                      <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" value={draft.date || ""} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-[10px] text-warm-400 uppercase">Tag</label>
                      <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" value={draft.tag || ""} onChange={(e) => setDraft({ ...draft, tag: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-[10px] text-warm-400 uppercase">{draft.from ? "De" : "Local"}</label>
                      {draft.from !== undefined ? (
                        <div className="flex gap-2">
                          <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" value={draft.from || ""} onChange={(e) => setDraft({ ...draft, from: e.target.value })} placeholder="De" />
                          <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" value={draft.to || ""} onChange={(e) => setDraft({ ...draft, to: e.target.value })} placeholder="Para" />
                        </div>
                      ) : (
                        <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" value={draft.place || ""} onChange={(e) => setDraft({ ...draft, place: e.target.value })} />
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] text-warm-400 uppercase">Status</label>
                      <select className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm bg-white" value={draft.status || "warning"} onChange={(e) => setDraft({ ...draft, status: e.target.value as "ok" | "warning" })}>
                        <option value="ok">OK</option>
                        <option value="warning">Pendente</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="text-[10px] text-warm-400 uppercase">Detalhe</label>
                    <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" value={draft.detail || ""} onChange={(e) => setDraft({ ...draft, detail: e.target.value })} />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Salvar</button>
                    <button onClick={() => setEditIdx(null)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
                    <button onClick={() => { removeItem(i); setEditIdx(null); }} className="text-xs text-red-500 px-4 py-1.5 rounded-lg border border-red-200/40 ml-auto">Remover</button>
                  </div>
                </div>
              );
            }

            return (
              <div key={i} className="flex gap-4 sm:gap-6 py-4 group">
                <div className="w-16 sm:w-20 text-right text-sm text-warm-400 font-mono shrink-0 pt-0.5">
                  {item.date}
                </div>
                <div className="relative flex items-start">
                  <div className={`w-3 h-3 rounded-full mt-1 shrink-0 z-10 ${isOk ? "bg-green-500" : "bg-red-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">
                      {item.from && item.to ? `${item.from} → ${item.to}` : item.place}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                      isOk ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
                    }`}>
                      {resolved.tag}
                    </span>
                    <button onClick={() => startEdit(i)} className="opacity-0 group-hover:opacity-100 transition-opacity text-warm-400 hover:text-gold text-sm ml-1">✏️</button>
                  </div>
                  <p className="text-sm text-warm-400 mt-1">{resolved.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {adding ? (
        <div className="bg-white rounded-xl border-2 border-gold/40 p-4 mt-4">
          <p className="text-xs font-medium text-gold uppercase mb-3">Novo item no roteiro</p>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] text-warm-400 uppercase">Data</label>
              <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" placeholder="ex: 20/10" value={newItem.date || ""} onChange={(e) => setNewItem({ ...newItem, date: e.target.value })} />
            </div>
            <div>
              <label className="text-[10px] text-warm-400 uppercase">Local</label>
              <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" placeholder="ex: Roma" value={newItem.place || ""} onChange={(e) => setNewItem({ ...newItem, place: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] text-warm-400 uppercase">Tag</label>
              <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" placeholder="ex: ~3 noites" value={newItem.tag || ""} onChange={(e) => setNewItem({ ...newItem, tag: e.target.value })} />
            </div>
            <div>
              <label className="text-[10px] text-warm-400 uppercase">Detalhe</label>
              <input className="w-full border border-warm-200/40 rounded px-2 py-1.5 text-sm" placeholder="Descrição..." value={newItem.detail || ""} onChange={(e) => setNewItem({ ...newItem, detail: e.target.value })} />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="text-xs bg-gold text-white px-4 py-1.5 rounded-lg font-medium">Adicionar</button>
            <button onClick={() => setAdding(false)} className="text-xs text-warm-400 px-4 py-1.5 rounded-lg border border-warm-200/40">Cancelar</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="mt-4 text-sm text-gold hover:text-gold/80 font-medium flex items-center gap-1">
          + Adicionar etapa
        </button>
      )}
    </div>
  );
}
