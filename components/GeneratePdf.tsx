"use client";
import { useState } from "react";
import { trip } from "@/data/trip";

export default function GeneratePdf() {
  const [generating, setGenerating] = useState(false);

  async function generate() {
    setGenerating(true);
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = 210;
    const m = 15;
    const cw = W - m * 2;
    let y = 20;

    function pg(n: number) { if (y + n > 275) { doc.addPage(); y = 20; } }

    function h1(t: string) {
      pg(12);
      doc.setFontSize(16); doc.setFont("helvetica", "bold"); doc.setTextColor(31, 27, 22);
      doc.text(t, m, y);
      y += 2; doc.setDrawColor(224, 168, 107); doc.setLineWidth(0.5);
      doc.line(m, y, m + 40, y); y += 8;
    }

    function h2(t: string) {
      pg(8); doc.setFontSize(11); doc.setFont("helvetica", "bold"); doc.setTextColor(31, 27, 22);
      doc.text(t, m, y); y += 6;
    }

    function row(label: string, value: string) {
      pg(6); doc.setFontSize(9);
      doc.setFont("helvetica", "bold"); doc.setTextColor(120, 110, 100); doc.text(label, m, y);
      doc.setFont("helvetica", "normal"); doc.setTextColor(31, 27, 22);
      const lines = doc.splitTextToSize(value, cw - 45);
      doc.text(lines, m + 45, y);
      y += lines.length * 4.5 + 1;
    }

    function sep() { y += 2; pg(4); doc.setDrawColor(200, 190, 180); doc.setLineWidth(0.15); doc.line(m, y, W - m, y); y += 5; }

    // CAPA
    doc.setFillColor(31, 27, 22); doc.rect(0, 0, W, 297, "F");
    doc.setTextColor(224, 168, 107); doc.setFontSize(10); doc.setFont("helvetica", "normal");
    doc.text("PLANEJAMENTO DE VIAGEM", W / 2, 85, { align: "center" });
    doc.setFontSize(28); doc.setFont("helvetica", "bold");
    doc.text("Volta ao Mundo 2026", W / 2, 100, { align: "center" });
    doc.setFontSize(12); doc.setTextColor(160, 150, 140); doc.setFont("helvetica", "normal");
    doc.text("Dherick Prado Abreu", W / 2, 112, { align: "center" });
    doc.setFontSize(9); doc.setTextColor(120, 110, 100);
    doc.text(`Gerado em ${new Date().toLocaleDateString("pt-BR")}`, W / 2, 200, { align: "center" });

    // DADOS PESSOAIS
    doc.addPage(); y = 20;
    h1("Dados Pessoais");
    row("Nome", trip.documents.personal.name);
    row("Nascimento", trip.documents.personal.birth);
    row("CPF", trip.documents.personal.cpf);
    row("CIN válida até", trip.documents.personal.cinValid);
    row("E-mail", trip.documents.personal.email);
    row("Telefone", trip.documents.personal.phone);
    sep();

    // ROTA
    h1("Rota");
    doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.setTextColor(31, 27, 22);
    doc.text(trip.route.map((r) => r.code).join(" → "), m, y);
    y += 5;
    doc.setFontSize(8); doc.setTextColor(120, 110, 100);
    doc.text(trip.route.map((r) => `${r.code} = ${r.city}`).join("  ·  "), m, y);
    y += 5;
    sep();

    // ROTEIRO
    h1("Roteiro");
    trip.itinerary.forEach((item) => {
      pg(10);
      doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.setTextColor(31, 27, 22);
      const title = item.from && item.to ? `${item.from} → ${item.to}` : item.place || "";
      doc.text(`${item.date}  ${title}`, m, y);
      doc.setFont("helvetica", "normal"); doc.setTextColor(224, 168, 107);
      doc.text(item.tag, W - m, y, { align: "right" });
      y += 5;
    });
    sep();

    // PASSAGENS
    h1("Passagens Aéreas");
    h2("Confirmadas");
    trip.flights.confirmed.forEach((f) => {
      pg(6);
      row(`${f.from} → ${f.to}`, `${f.airline} · ${f.date} · ${f.time} · Ref: ${f.ref}`);
    });
    h2("A Comprar");
    trip.flights.toBuy.forEach((f) => {
      row(`${f.from} → ${f.to}`, `[${f.priority}]`);
    });
    sep();

    // HOSPEDAGEM
    h1("Hospedagem");
    h2("Confirmada");
    trip.accommodation.confirmed.forEach((h) => {
      row("Hotel", `${h.city} — ${h.name}`);
      row("Endereço", h.address);
      row("Check-in/out", `${h.checkIn} → ${h.checkOut}`);
      row("Confirmação", h.confirmation);
      row("PIN / Tel", `${h.pin} · ${h.tel}`);
      y += 2;
    });
    h2("A Reservar");
    trip.accommodation.toBook.forEach((h) => {
      row(h.city, `${h.dates} [${h.priority}]`);
    });
    sep();

    // DOCUMENTOS & VISTOS
    h1("Documentos & Vistos");
    row("Passaporte", "Emitido ✓");
    trip.documents.docs.forEach((d) => {
      pg(5); doc.setFontSize(9); doc.setFont("helvetica", "normal"); doc.setTextColor(31, 27, 22);
      doc.text(`✓ ${d}`, m, y); y += 4.5;
    });
    y += 2; h2("Vistos");
    trip.documents.visas.forEach((v) => {
      row(v.country, `${v.cost} · ${v.tag}`);
    });
    sep();

    // VACINAS
    h1("Vacinas");
    row("Obrigatória", trip.vaccines.required.name);
    trip.vaccines.upToDate.forEach((v) => { row(v.name, v.date); });
    trip.vaccines.recommended.forEach((v) => { row(v.name, `Recomendada`); });
    sep();

    // ORÇAMENTO
    h1("Orçamento");
    row("Total", `US$ ${trip.budget.total.toLocaleString()}`);
    trip.budget.distribution.forEach((d) => { row(d.destination, `US$ ${d.amount}`); });
    y += 2; h2("Câmbio");
    trip.budget.currencies.forEach((c) => { row(c.code, `${c.rate} por 1 ${c.code}`); });
    sep();

    // CHECKLIST (from localStorage)
    h1("Checklist");
    let checklistItems = trip.checklist;
    try {
      const saved = localStorage.getItem("checklist-state");
      if (saved) {
        const parsed = JSON.parse(saved);
        checklistItems = trip.checklist.map((item) => {
          const match = parsed.find((s: any) => s.text === item.text);
          return match ? { ...item, done: match.done } : item;
        });
        const custom = parsed.filter((s: any) => s.custom && !trip.checklist.some((t) => t.text === s.text));
        checklistItems = [...checklistItems, ...custom];
      }
    } catch {}
    const chkDone = checklistItems.filter((c) => c.done).length;
    doc.setFontSize(9); doc.setFont("helvetica", "bold"); doc.setTextColor(31, 27, 22);
    doc.text(`${chkDone}/${checklistItems.length} (${Math.round((chkDone / checklistItems.length) * 100)}%)`, m, y);
    y += 6;
    checklistItems.forEach((item) => {
      pg(5); doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(31, 27, 22);
      doc.text(`${item.done ? "✓" : "○"} ${item.text}`, m, y);
      if (!item.done) { doc.setTextColor(200, 100, 80); doc.text(item.priority, W - m, y, { align: "right" }); }
      y += 4.5;
    });
    sep();

    // COMPRAS MÊS A MÊS
    h1("Compras Mês a Mês");
    trip.monthlyPurchases.forEach((month) => {
      h2(month.month);
      month.items.forEach((item) => {
        pg(5); doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(31, 27, 22);
        doc.text(`${item.done ? "✓" : "○"} ${item.text}`, m, y);
        doc.setTextColor(224, 168, 107); doc.text(item.cost, W - m, y, { align: "right" });
        y += 4.5;
      });
      y += 2;
    });

    // CONTATOS DE EMERGÊNCIA
    h1("Contatos de Emergência");
    trip.emergencyContacts.forEach((c) => {
      pg(6);
      row(c.country, `Embaixada: ${c.embassy} · Emerg: ${c.emergency} · Polícia: ${c.police} · Amb: ${c.ambulance}`);
    });
    sep();

    // BAGAGEM
    h1("Bagagem");
    Object.entries(trip.packingList).forEach(([cat, items]) => {
      h2(cat);
      (items as string[]).forEach((item) => {
        pg(4); doc.setFontSize(8); doc.setFont("helvetica", "normal"); doc.setTextColor(31, 27, 22);
        doc.text(`○ ${item}`, m, y); y += 4;
      });
      y += 2;
    });
    sep();

    // DOCS ANEXADOS
    const stored = JSON.parse(localStorage.getItem("__uploaded_docs") || "{}");
    const hasUploads = Object.values(stored).some((arr: any) => arr && arr.length > 0);
    if (hasUploads) {
      doc.addPage(); y = 20;
      h1("Documentos Anexados");
      Object.entries(stored).forEach(([section, docs]: [string, any]) => {
        if (!docs || docs.length === 0) return;
        h2(section.charAt(0).toUpperCase() + section.slice(1));
        docs.forEach((d: any) => {
          pg(8); row("Arquivo", d.name);
          if (d.text) {
            doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(100, 90, 80);
            const preview = doc.splitTextToSize(d.text.substring(0, 200), cw);
            doc.text(preview, m, y); y += preview.length * 3.5;
          }
          y += 2;
        });
      });
    }

    doc.save("Volta-ao-Mundo-2026.pdf");
    setGenerating(false);
  }

  return (
    <button
      onClick={generate}
      disabled={generating}
      className="flex items-center gap-2 px-4 py-2.5 bg-bg-dark text-white rounded-xl text-sm font-medium hover:bg-bg-dark/90 transition-colors disabled:opacity-50"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
      {generating ? "Gerando..." : "Gerar PDF da viagem"}
    </button>
  );
}
