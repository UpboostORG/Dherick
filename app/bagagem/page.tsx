"use client";
import { useState, useEffect } from "react";
import { trip } from "@/data/trip";

export default function Bagagem() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("__packing_checked");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  function toggle(key: string) {
    const updated = { ...checked, [key]: !checked[key] };
    setChecked(updated);
    localStorage.setItem("__packing_checked", JSON.stringify(updated));
  }

  const allItems = Object.values(trip.packingList).flat();
  const doneCount = allItems.filter((item) => checked[item]).length;

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Mochila / Bagagem</h1>
      <p className="text-sm text-warm-400 mb-8">
        Itens essenciais para viagem longa em hostel · {doneCount}/{allItems.length} prontos
      </p>

      <div className="space-y-6">
        {Object.entries(trip.packingList).map(([category, items]) => {
          const catDone = items.filter((item) => checked[item]).length;
          return (
            <div key={category} className="bg-white rounded-xl border border-warm-200/40 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">{category}</h2>
                <span className="text-xs text-warm-400">{catDone}/{items.length}</span>
              </div>
              <div className="space-y-1">
                {items.map((item) => (
                  <label key={item} className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-warm-200/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!checked[item]}
                      onChange={() => toggle(item)}
                      className="w-4 h-4 rounded border-warm-300 text-gold focus:ring-gold/30"
                    />
                    <span className={`text-sm ${checked[item] ? "line-through text-warm-400" : ""}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
