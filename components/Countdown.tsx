"use client";
import { useState, useEffect } from "react";

export default function Countdown({ target }: { target: string }) {
  const [diff, setDiff] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    function calc() {
      const now = new Date().getTime();
      const t = new Date(target).getTime() - now;
      if (t <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
      return {
        days: Math.floor(t / 86400000),
        hours: Math.floor((t % 86400000) / 3600000),
        mins: Math.floor((t % 3600000) / 60000),
        secs: Math.floor((t % 60000) / 1000),
      };
    }
    setDiff(calc());
    const id = setInterval(() => setDiff(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="bg-bg-dark text-white rounded-xl p-6 lg:p-8">
      <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase mb-3">Contagem Regressiva</p>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-5xl lg:text-6xl font-light text-gold">{diff.days}</span>
        <span className="text-lg text-gold/80">dias</span>
        <div className="flex gap-3 ml-4">
          <div className="text-center">
            <span className="text-2xl font-semibold">{String(diff.hours).padStart(2, "0")}</span>
            <p className="text-[10px] uppercase tracking-wider text-warm-400">Horas</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-semibold">{String(diff.mins).padStart(2, "0")}</span>
            <p className="text-[10px] uppercase tracking-wider text-warm-400">Min</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-semibold">{String(diff.secs).padStart(2, "0")}</span>
            <p className="text-[10px] uppercase tracking-wider text-warm-400">Seg</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-warm-300">
        Para a maior aventura da sua vida — sua <strong className="text-white">primeira viagem pelo mundo.</strong>
      </p>
      <p className="text-sm text-warm-400">Partida de Cuiabá em 24/09/2026, 02h00.</p>
    </div>
  );
}
