"use client";
import { useState } from "react";
import { trip } from "@/data/trip";

export default function Compras() {
  const [months, setMonths] = useState(
    trip.monthlyPurchases.map((m) => ({
      ...m,
      items: m.items.map((item) => ({ ...item })),
    }))
  );

  function toggle(monthIdx: number, itemIdx: number) {
    setMonths((prev) =>
      prev.map((m, mi) =>
        mi === monthIdx
          ? { ...m, items: m.items.map((item, ii) => (ii === itemIdx ? { ...item, done: !item.done } : item)) }
          : m
      )
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Compras mês a mês</h1>
      <p className="text-sm text-warm-400 mb-8">
        Plano para chegar com tudo pago — marque o que já comprou · clique nos textos para editar
      </p>

      <div className="space-y-6">
        {months.map((month, mi) => {
          const done = month.items.filter((i) => i.done).length;
          const total = month.items.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;

          return (
            <div key={mi} className="bg-white rounded-xl border border-warm-200/40 p-6">
              <div className="flex justify-between items-baseline mb-1">
                <h2 className="text-xl font-serif">{month.month}</h2>
                <span className="text-sm text-warm-400 font-mono">{done}/{total} · {pct}%</span>
              </div>
              <p className="text-sm text-warm-400 mb-4">{month.note}</p>

              <div className="space-y-2">
                {month.items.map((item, ii) => (
                  <div key={ii} className={`flex items-center justify-between py-3 px-4 rounded-lg border border-warm-200/20 ${item.done ? "opacity-50" : ""}`}>
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggle(mi, ii)}
                        className="w-5 h-5 rounded border-warm-300 accent-gold"
                      />
                      <span className={`text-sm ${item.done ? "line-through text-warm-400" : ""}`}>{item.text}</span>
                    </label>
                    <span className="text-sm font-mono text-gold ml-2 whitespace-nowrap">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
