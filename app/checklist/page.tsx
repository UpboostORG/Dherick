"use client";
import { useState, useEffect, useCallback } from "react";
import { trip } from "@/data/trip";

type Filter = "Todos" | "Pendentes" | "Críticos" | "Altas" | "Concluídos";

const STORAGE_KEY = "checklist-state";

function loadChecklist() {
  if (typeof window === "undefined") return trip.checklist;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return trip.checklist;
    const parsed = JSON.parse(saved);
    const base = trip.checklist.map((item) => {
      const match = parsed.find((s: { text: string }) => s.text === item.text);
      return match ? { ...item, done: match.done } : item;
    });
    const custom = parsed.filter(
      (s: { text: string; custom?: boolean }) =>
        s.custom && !trip.checklist.some((t) => t.text === s.text)
    );
    return [...base, ...custom];
  } catch {
    return trip.checklist;
  }
}

export default function Checklist() {
  const [items, setItems] = useState(trip.checklist);
  const [filter, setFilter] = useState<Filter>("Todos");
  const [newItem, setNewItem] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(loadChecklist());
    setLoaded(true);
  }, []);

  const save = useCallback((updated: typeof items) => {
    setItems(updated);
    const toSave = updated.map((item) => ({
      text: item.text,
      done: item.done,
      priority: item.priority,
      custom: !trip.checklist.some((t) => t.text === item.text),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, []);

  const done = items.filter((c) => c.done).length;
  const total = items.length;
  const pct = Math.round((done / total) * 100);

  const filtered = items.filter((item) => {
    if (filter === "Todos") return true;
    if (filter === "Pendentes") return !item.done;
    if (filter === "Críticos") return !item.done && (item.priority === "CRÍTICA" || item.priority === "ALTA");
    if (filter === "Altas") return item.priority === "ALTA";
    if (filter === "Concluídos") return item.done;
    return true;
  });

  const counts: Record<Filter, number> = {
    Todos: items.length,
    Pendentes: items.filter((i) => !i.done).length,
    Críticos: items.filter((i) => !i.done && (i.priority === "CRÍTICA" || i.priority === "ALTA")).length,
    Altas: items.filter((i) => i.priority === "ALTA").length,
    Concluídos: items.filter((i) => i.done).length,
  };

  function toggle(idx: number) {
    const updated = items.map((item, i) => i === idx ? { ...item, done: !item.done } : item);
    save(updated);
  }

  function addItem() {
    if (!newItem.trim()) return;
    const updated = [...items, { text: newItem.trim(), done: false, priority: "MÉDIA" as const }];
    save(updated);
    setNewItem("");
  }

  if (!loaded) return null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-6">
        <div>
          <h1 className="text-3xl font-serif mb-1">Checklist</h1>
          <p className="text-sm text-warm-400">Marque o que já resolveu — salva automaticamente</p>
        </div>
        <span className="text-sm text-warm-400 font-mono mt-2 sm:mt-0">{done}/{total} · {pct}%</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(["Todos", "Pendentes", "Críticos", "Altas", "Concluídos"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              filter === f
                ? "bg-bg-dark text-white border-bg-dark"
                : "bg-white border-warm-200/40 text-warm-400 hover:border-warm-300"
            }`}
          >
            {f} {counts[f]}
          </button>
        ))}
      </div>

      {/* Add new */}
      <div className="flex gap-2 mb-6">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Adicionar um item ao checklist..."
          className="flex-1 px-4 py-3 border border-warm-200/40 rounded-xl text-sm outline-none focus:border-gold"
        />
        <button onClick={addItem} className="px-5 py-3 bg-bg-dark text-white rounded-xl text-sm font-medium hover:bg-bg-dark/90">
          Adicionar
        </button>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {filtered.map((item) => {
          const realIdx = items.indexOf(item);
          return (
            <div key={realIdx} className={`flex items-center justify-between py-3.5 px-4 bg-white rounded-xl border border-warm-200/40 ${item.done ? "opacity-60" : ""}`}>
              <label className="flex items-center gap-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggle(realIdx)}
                  className="w-5 h-5 rounded border-warm-300 text-gold focus:ring-gold accent-gold"
                />
                <span className={`text-sm ${item.done ? "line-through text-warm-400" : ""}`}>{item.text}</span>
              </label>
              <span className={`text-xs font-medium px-2 py-1 rounded ml-2 whitespace-nowrap ${
                item.done ? "text-green-600 bg-green-50" :
                item.priority === "CRÍTICA" ? "text-red-700 bg-red-100" :
                item.priority === "ALTA" ? "text-red-500 bg-red-50" :
                item.priority === "MÉDIA" ? "text-amber-600 bg-amber-50" :
                "text-warm-400 bg-warm-200/30"
              }`}>
                {item.done ? "OK" : item.priority}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
