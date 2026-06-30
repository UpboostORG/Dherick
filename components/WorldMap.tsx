"use client";

const points = [
  { code: "CGB", city: "Cuiabá", x: 170, y: 245, active: false },
  { code: "GRU", city: "São Paulo", x: 185, y: 260, active: false },
  { code: "DXB", city: "Dubai", x: 420, y: 165, active: true },
  { code: "CAI", city: "Cairo", x: 370, y: 155, active: true },
  { code: "ATH", city: "Atenas", x: 360, y: 135, active: true },
  { code: "IST", city: "Istambul", x: 370, y: 128, active: true },
  { code: "SKP", city: "Skopje", x: 355, y: 130, active: true },
];

const routes = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
];

export default function WorldMap() {
  return (
    <div className="bg-bg-dark rounded-xl p-4 sm:p-6 overflow-hidden">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-gold text-sm font-medium tracking-wide uppercase">Mapa da rota</h2>
        <div className="flex gap-3 text-[10px] text-warm-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gold inline-block" /> Destino</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warm-500 inline-block" /> Escala</span>
        </div>
      </div>
      <svg viewBox="0 0 600 340" className="w-full" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified world map continents */}
        <g fill="#2a2520" stroke="#3d3630" strokeWidth="0.5">
          {/* North America */}
          <path d="M30,60 L60,30 L120,25 L160,40 L170,70 L155,100 L140,120 L120,130 L100,125 L85,135 L70,120 L50,100 L30,90 Z" />
          {/* Central America */}
          <path d="M85,135 L100,125 L120,130 L115,150 L105,165 L95,170 L80,160 L75,145 Z" />
          {/* South America */}
          <path d="M120,170 L145,165 L175,180 L195,210 L200,240 L195,265 L180,285 L165,295 L150,290 L140,270 L135,250 L130,220 L120,195 Z" />
          {/* Europe */}
          <path d="M290,30 L320,25 L350,30 L370,40 L385,55 L380,75 L370,90 L355,100 L340,110 L325,120 L310,115 L295,100 L285,80 L280,60 L285,45 Z" />
          {/* UK */}
          <path d="M275,50 L285,45 L290,55 L282,65 L275,60 Z" />
          {/* Africa */}
          <path d="M300,130 L330,125 L360,130 L385,140 L400,160 L405,190 L395,220 L380,250 L360,270 L340,280 L320,275 L305,260 L295,235 L290,210 L285,180 L290,155 Z" />
          {/* Middle East */}
          <path d="M385,120 L410,115 L435,130 L445,155 L435,170 L415,175 L400,165 L390,145 Z" />
          {/* India */}
          <path d="M445,130 L470,120 L490,140 L485,170 L470,195 L455,200 L445,185 L440,160 Z" />
          {/* Russia/Central Asia */}
          <path d="M350,30 L400,15 L450,10 L500,15 L540,25 L560,40 L555,60 L540,75 L510,80 L480,75 L450,70 L420,65 L400,55 L385,45 L370,40 Z" />
          {/* East Asia */}
          <path d="M480,75 L510,80 L540,90 L555,100 L560,120 L550,135 L530,140 L510,130 L495,120 L485,105 L480,90 Z" />
          {/* Southeast Asia */}
          <path d="M495,145 L520,140 L540,150 L545,170 L530,185 L510,180 L500,165 Z" />
          {/* Japan */}
          <path d="M555,85 L565,80 L570,90 L565,105 L558,100 Z" />
          {/* Australia */}
          <path d="M500,240 L540,230 L570,240 L580,260 L570,280 L545,290 L520,285 L505,270 L500,255 Z" />
          {/* Indonesia */}
          <path d="M490,195 L510,190 L530,195 L520,205 L500,205 Z" />
        </g>

        {/* Route lines */}
        {routes.map(([from, to], i) => (
          <line
            key={i}
            x1={points[from].x}
            y1={points[from].y}
            x2={points[to].x}
            y2={points[to].y}
            stroke="#E0A86B"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            opacity="0.6"
          />
        ))}

        {/* Route arcs for long distances */}
        <path
          d={`M ${points[1].x} ${points[1].y} Q 300 80 ${points[2].x} ${points[2].y}`}
          fill="none"
          stroke="#E0A86B"
          strokeWidth="1.5"
          strokeDasharray="6 3"
          opacity="0.6"
        />

        {/* Points */}
        {points.map((p, i) => (
          <g key={i}>
            {/* Pulse ring for active destinations */}
            {p.active && (
              <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="#E0A86B" strokeWidth="1" opacity="0.3">
                <animate attributeName="r" values="6;12;6" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Point */}
            <circle
              cx={p.x}
              cy={p.y}
              r={p.active ? 4 : 3}
              fill={p.active ? "#E0A86B" : "#8C8178"}
              stroke="#1F1B16"
              strokeWidth="1.5"
            />
            {/* Label */}
            <text
              x={p.x}
              y={p.y - 8}
              textAnchor="middle"
              fill={p.active ? "#E0A86B" : "#8C8178"}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {p.code}
            </text>
          </g>
        ))}

        {/* Order numbers along route */}
        {points.filter(p => p.active).map((p, i) => (
          <g key={`num-${i}`}>
            <circle cx={p.x + 10} cy={p.y + 2} r="6" fill="#E0A86B" />
            <text x={p.x + 10} y={p.y + 5} textAnchor="middle" fill="#1F1B16" fontSize="7" fontWeight="bold">
              {i + 1}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 justify-center">
        {points.filter(p => p.active).map((p, i) => (
          <span key={i} className="text-[11px] text-warm-400">
            <span className="text-gold font-bold">{i + 1}</span> {p.city}
          </span>
        ))}
      </div>
    </div>
  );
}
