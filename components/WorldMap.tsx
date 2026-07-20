"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const destinations = [
  { code: "CGB", city: "Cuiabá", lat: -15.601, lng: -56.097, active: false },
  { code: "GRU", city: "São Paulo", lat: -23.432, lng: -46.470, active: false },
  { code: "DXB", city: "Dubai", lat: 25.253, lng: 55.365, active: true },
  { code: "CAI", city: "Cairo", lat: 30.044, lng: 31.235, active: true },
  { code: "LXR", city: "Luxor", lat: 25.687, lng: 32.639, active: true },
  { code: "ATH", city: "Atenas", lat: 37.936, lng: 23.947, active: true },
  { code: "JTR", city: "Santorini", lat: 36.399, lng: 25.479, active: true },
  { code: "IST", city: "Istambul", lat: 41.015, lng: 28.979, active: true },
];

const routeOrder = [0, 1, 2, 3, 4, 3, 5, 6, 5, 7];

export default function WorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [25, 10],
      zoom: 2.5,
      minZoom: 2,
      maxZoom: 6,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { subdomains: "abcd", maxZoom: 19 }
    ).addTo(map);

    const routeCoords = routeOrder.map((i) =>
      L.latLng(destinations[i].lat, destinations[i].lng)
    );
    L.polyline(routeCoords, {
      color: "#E0A86B",
      weight: 2.5,
      opacity: 0.7,
      dashArray: "8 6",
    }).addTo(map);

    destinations.forEach((d, i) => {
      const isActive = d.active;
      const activeIdx = destinations.filter((x, j) => x.active && j <= i).length;

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          position:relative;
          width:${isActive ? 28 : 18}px;
          height:${isActive ? 28 : 18}px;
          display:flex;
          align-items:center;
          justify-content:center;
        ">
          ${isActive ? `<div style="
            position:absolute;
            inset:0;
            border-radius:50%;
            border:2px solid #E0A86B;
            opacity:0.4;
            animation:pulse-ring 2s ease-out infinite;
          "></div>` : ""}
          <div style="
            width:${isActive ? 14 : 10}px;
            height:${isActive ? 14 : 10}px;
            border-radius:50%;
            background:${isActive ? "#E0A86B" : "#8C8178"};
            border:2px solid #1F1B16;
            position:relative;
            z-index:2;
          "></div>
          ${isActive ? `<div style="
            position:absolute;
            top:-8px;
            right:-8px;
            width:18px;
            height:18px;
            border-radius:50%;
            background:#E0A86B;
            color:#1F1B16;
            font-size:10px;
            font-weight:700;
            display:flex;
            align-items:center;
            justify-content:center;
            z-index:3;
          ">${activeIdx}</div>` : ""}
        </div>`,
        iconSize: [isActive ? 28 : 18, isActive ? 28 : 18],
        iconAnchor: [isActive ? 14 : 9, isActive ? 14 : 9],
      });

      L.marker([d.lat, d.lng], { icon })
        .addTo(map)
        .bindTooltip(
          `<strong>${d.code}</strong> — ${d.city}`,
          {
            className: "map-tooltip",
            direction: "top",
            offset: [0, -16],
          }
        );
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="rounded-xl overflow-hidden border border-warm-200/20">
      <div className="bg-bg-dark px-4 py-3 flex justify-between items-center">
        <h2 className="text-gold text-sm font-medium tracking-wide uppercase">
          Mapa da rota
        </h2>
        <div className="flex gap-3 text-[10px] text-warm-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gold inline-block" /> Destino
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-warm-500 inline-block" /> Escala
          </span>
        </div>
      </div>
      <div ref={mapRef} style={{ height: 420, width: "100%" }} />
      <style jsx global>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        .map-tooltip {
          background: #1F1B16 !important;
          color: #E0A86B !important;
          border: 1px solid #3d3630 !important;
          border-radius: 8px !important;
          padding: 4px 10px !important;
          font-size: 12px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
        }
        .map-tooltip::before {
          border-top-color: #1F1B16 !important;
        }
        .leaflet-control-zoom a {
          background: #1F1B16 !important;
          color: #E0A86B !important;
          border-color: #3d3630 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #2a2520 !important;
        }
      `}</style>
    </div>
  );
}
