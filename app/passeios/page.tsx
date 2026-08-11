"use client";
import { useState } from "react";
import { trip } from "@/data/trip";

const META: Record<string, { flag: string; country: string }> = {
  "Dubai": { flag: "🇦🇪", country: "Emirados" },
  "Abu Dhabi": { flag: "🇦🇪", country: "Emirados" },
  "Cairo": { flag: "🇪🇬", country: "Egito" },
  "Luxor": { flag: "🇪🇬", country: "Egito" },
  "Alexandria": { flag: "🇪🇬", country: "Egito" },
  "Atenas": { flag: "🇬🇷", country: "Grécia" },
  "Santorini": { flag: "🇬🇷", country: "Grécia" },
  "Istambul": { flag: "🇹🇷", country: "Turquia" },
};

export default function Passeios() {
  const cities = Object.entries(trip.activities);
  const [active, setActive] = useState(cities[0][0]);

  const current = trip.activities[active as keyof typeof trip.activities];
  const meta = META[active] || { flag: "📍", country: "" };

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Passeios</h1>
      <p className="text-sm text-warm-400 mb-5">
        O que fazer em cada destino — escolha a cidade abaixo
      </p>

      {/* Abas por cidade */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {cities.map(([city, data]) => {
          const m = META[city] || { flag: "📍", country: "" };
          const isActive = city === active;
          return (
            <button
              key={city}
              onClick={() => setActive(city)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-colors border ${
                isActive
                  ? "bg-bg-dark text-white border-bg-dark font-medium"
                  : "bg-white text-warm-400 border-warm-200/40 hover:border-gold/40 hover:text-bg-dark"
              }`}
            >
              <span>{m.flag}</span>
              <span>{city}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? "bg-gold/20 text-gold" : "bg-warm-200/30 text-warm-400"}`}>
                {data.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cabeçalho da cidade ativa */}
      <div className="bg-bg-dark text-white rounded-xl p-5 mb-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div>
            <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase">{meta.country}</p>
            <h2 className="text-2xl font-serif mt-0.5">{meta.flag} {active}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-warm-400 font-mono">{current.period}</p>
            <p className="text-xs text-warm-400">{current.items.length} passeios mapeados</p>
          </div>
        </div>
      </div>

      {/* Passeios da cidade ativa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {current.items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
              <h3 className="font-semibold">{item.name}</h3>
            </div>
            <p className="text-sm text-warm-400 ml-4">{item.desc}</p>
            {item.tip && (
              <p className="text-xs text-gold font-mono mt-3 ml-4">💡 {item.tip}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
