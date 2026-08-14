"use client";
import { useState, useEffect } from "react";

const PLACES = [
  { city: "Cuiabá", tz: "America/Cuiaba", flag: "🇧🇷", note: "casa · família", home: true },
  { city: "São Paulo / Brasília", tz: "America/Sao_Paulo", flag: "🇧🇷", note: "horário comercial da Upboost", home: true },
  { city: "Dubai", tz: "Asia/Dubai", flag: "🇦🇪", note: "25-30/09" },
  { city: "Cairo & Luxor", tz: "Africa/Cairo", flag: "🇪🇬", note: "30/09-12/10" },
  { city: "Atenas & Santorini", tz: "Europe/Athens", flag: "🇬🇷", note: "12-20/10" },
  { city: "Istambul", tz: "Europe/Istanbul", flag: "🇹🇷", note: "20/10 em diante" },
];

const REF = "America/Sao_Paulo";

function offsetMinutes(date: Date, tz: string) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const map: Record<string, string> = {};
  dtf.formatToParts(date).forEach((p) => { map[p.type] = p.value; });
  const asUTC = Date.UTC(+map.year, +map.month - 1, +map.day, +map.hour, +map.minute, +map.second);
  return (asUTC - date.getTime()) / 60000;
}

function clock(date: Date, tz: string) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: tz, hourCycle: "h23", hour: "2-digit", minute: "2-digit" }).format(date);
}

function weekday(date: Date, tz: string) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: tz, weekday: "short", day: "2-digit", month: "2-digit" }).format(date);
}

function shiftHour(hour: number, diffHours: number) {
  const h = ((hour + diffHours) % 24 + 24) % 24;
  const nextDay = hour + diffHours >= 24;
  const prevDay = hour + diffHours < 0;
  return { label: `${String(Math.floor(h)).padStart(2, "0")}h${h % 1 ? "30" : ""}`, nextDay, prevDay };
}

export default function Fuso() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!now) return null;

  const refOffset = offsetMinutes(now, REF);
  const rows = PLACES.map((p) => {
    const diff = (offsetMinutes(now, p.tz) - refOffset) / 60;
    return { ...p, diff, time: clock(now, p.tz), day: weekday(now, p.tz) };
  });

  const destinations = rows.filter((r) => !r.home);

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Fuso horário</h1>
      <p className="text-sm text-warm-400 mb-8">Que horas são lá e aqui — para seguir trabalhando no ritmo do Brasil</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {rows.map((p) => (
          <div key={p.tz} className={`rounded-xl p-4 ${p.home ? "bg-bg-dark text-white" : "bg-white border border-warm-200/40"}`}>
            <div className="flex items-baseline gap-1.5">
              <span>{p.flag}</span>
              <p className={`text-xs font-medium ${p.home ? "text-gold" : "text-warm-400"}`}>{p.city}</p>
            </div>
            <p className={`text-3xl font-light mt-1 font-mono ${p.home ? "text-white" : "text-bg-dark"}`}>{p.time}</p>
            <p className={`text-[11px] ${p.home ? "text-warm-400" : "text-warm-400"}`}>{p.day}</p>
            {!p.home && (
              <p className="text-xs font-medium text-gold mt-1">
                {p.diff >= 0 ? "+" : ""}{p.diff}h vs Brasília
              </p>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-serif mb-1">O expediente brasileiro no seu relógio</h2>
      <p className="text-sm text-warm-400 mb-4">Horário comercial 9h-18h (Brasília) convertido para cada destino</p>
      <div className="bg-white rounded-xl border border-warm-200/40 overflow-hidden mb-8">
        <div className="grid grid-cols-4 gap-2 px-4 py-2.5 bg-bg text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase">
          <span>Destino</span>
          <span>Brasil abre 9h</span>
          <span>Almoço 12h</span>
          <span>Brasil fecha 18h</span>
        </div>
        {destinations.map((p) => {
          const open = shiftHour(9, p.diff);
          const noon = shiftHour(12, p.diff);
          const close = shiftHour(18, p.diff);
          return (
            <div key={p.tz} className="grid grid-cols-4 gap-2 px-4 py-3 border-t border-warm-200/20 text-sm items-center">
              <span className="font-medium text-xs sm:text-sm">{p.flag} {p.city}</span>
              <span className="font-mono text-gold">{open.label}</span>
              <span className="font-mono">{noon.label}</span>
              <span className="font-mono">
                {close.label}
                {close.nextDay && <span className="text-[10px] text-red-500 ml-1">+1 dia</span>}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border-2 border-gold/30 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-2">✅ Melhor janela para reuniões</p>
          <ul className="text-sm text-warm-400 space-y-1.5">
            <li><strong className="text-bg-dark">Egito, Grécia e Turquia (+6h):</strong> manhã do Brasil (9h-13h) = 15h-19h no seu relógio. Perfeito: você passeia de manhã e trabalha no fim da tarde.</li>
            <li><strong className="text-bg-dark">Dubai (+7h):</strong> 9h-12h do Brasil = 16h-19h aí. Depois das 20h aí o Brasil ainda está trabalhando, mas você já jantou.</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-2">🌙 Quando o Brasil dorme</p>
          <ul className="text-sm text-warm-400 space-y-1.5">
            <li>Sua <strong className="text-bg-dark">manhã inteira</strong> (até ~14h local) é madrugada no Brasil — ninguém te cobra nada. É a janela livre pra passeios e para trabalho concentrado sem notificação.</li>
            <li>Ligar pra família em Cuiabá: entre <strong className="text-bg-dark">18h e 23h no seu horário</strong> pega eles das 11h às 16h.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl border-l-4 border-l-gold p-5">
        <p className="text-sm font-semibold mb-2">Detalhes que confundem</p>
        <ul className="text-sm text-warm-400 space-y-1.5">
          <li><strong className="text-bg-dark">O Brasil não tem horário de verão</strong> desde 2019 — a referência daqui nunca muda.</li>
          <li><strong className="text-bg-dark">Cuiabá é 1h atrás de Brasília/SP</strong>. Como a Upboost roda no horário comercial de Brasília, use a coluna de Brasília para trabalho e lembre da diferença ao ligar pra casa.</li>
          <li><strong className="text-bg-dark">Grécia e Egito mudam o relógio no fim de outubro</strong> (dia 25 e 29), atrasando 1h — mas você já terá saído dos dois. Na prática, sua viagem inteira fica com fuso estável.</li>
          <li><strong className="text-bg-dark">Turquia e Emirados não têm horário de verão</strong>, nunca mudam.</li>
          <li>Os relógios acima são <strong className="text-bg-dark">ao vivo</strong> e já consideram qualquer mudança automaticamente.</li>
        </ul>
      </div>
    </div>
  );
}
