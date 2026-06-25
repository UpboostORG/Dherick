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
    const margin = 15;
    const contentW = W - margin * 2;
    let y = 20;

    function checkPage(needed: number) {
      if (y + needed > 275) { doc.addPage(); y = 20; }
    }

    function heading(text: string) {
      checkPage(15);
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(31, 27, 22);
      doc.text(text, margin, y);
      y += 3;
      doc.setDrawColor(224, 168, 107);
      doc.setLineWidth(0.5);
      doc.line(margin, y, margin + 50, y);
      y += 10;
    }

    function subheading(text: string) {
      checkPage(10);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(31, 27, 22);
      doc.text(text, margin, y);
      y += 7;
    }

    function line(label: string, value: string) {
      checkPage(7);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(140, 129, 120);
      doc.text(label, margin, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(31, 27, 22);
      doc.text(value, margin + 45, y);
      y += 5.5;
    }

    function text(t: string, size = 9) {
      checkPage(7);
      doc.setFontSize(size);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(92, 83, 73);
      const lines = doc.splitTextToSize(t, contentW);
      doc.text(lines, margin, y);
      y += lines.length * 4.5;
    }

    function separator() {
      y += 3;
      checkPage(5);
      doc.setDrawColor(212, 196, 176);
      doc.setLineWidth(0.2);
      doc.line(margin, y, W - margin, y);
      y += 6;
    }

    // ---- COVER ----
    doc.setFillColor(31, 27, 22);
    doc.rect(0, 0, W, 297, "F");
    doc.setTextColor(224, 168, 107);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("PLANEJAMENTO", W / 2, 80, { align: "center" });
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.text("Volta ao Mundo", W / 2, 100, { align: "center" });
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(168, 154, 140);
    doc.text("Dherick Prado Abreu · 2026", W / 2, 115, { align: "center" });
    doc.setFontSize(10);
    doc.setTextColor(140, 129, 120);
    doc.text(`Gerado em ${new Date().toLocaleDateString("pt-BR")}`, W / 2, 200, { align: "center" });

    // ---- DADOS PESSOAIS ----
    doc.addPage();
    y = 20;
    heading("Dados Pessoais");
    line("Nome", trip.documents.personal.name);
    line("Nascimento", trip.documents.personal.birth);
    line("CPF", trip.documents.personal.cpf);
    line("CIN válida até", trip.documents.personal.cinValid);
    line("E-mail", trip.documents.personal.email);
    line("Telefone", trip.documents.personal.phone);
    separator();

    // ---- ROTA ----
    heading("Rota");
    const routeStr = trip.route.map((r) => `${r.code} (${r.city})`).join(" → ");
    text(routeStr, 10);
    separator();

    // ---- ROTEIRO ----
    heading("Roteiro Completo");
    trip.itinerary.forEach((item) => {
      checkPage(14);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(140, 129, 120);
      doc.text(item.date, margin, y);
      doc.setTextColor(31, 27, 22);
      const title = item.from && item.to ? `${item.from} → ${item.to}` : item.place || "";
      doc.text(title, margin + 25, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(224, 168, 107);
      doc.text(`[${item.tag}]`, margin + 70, y);
      y += 4.5;
      doc.setTextColor(92, 83, 73);
      const detailLines = doc.splitTextToSize(item.detail, contentW - 25);
      doc.text(detailLines, margin + 25, y);
      y += detailLines.length * 4 + 3;
    });
    separator();

    // ---- PASSAGENS ----
    heading("Passagens Aéreas");
    subheading("Confirmadas");
    trip.flights.confirmed.forEach((f) => {
      checkPage(12);
      line(`${f.from} → ${f.to}`, `${f.airline} · ${f.date} · ${f.time} · Ref: ${f.ref}`);
    });
    y += 3;
    subheading("A Comprar");
    trip.flights.toBuy.forEach((f) => {
      checkPage(8);
      line(`${f.from} → ${f.to}`, `${f.note} [${f.priority}]`);
    });
    separator();

    // ---- HOSPEDAGEM ----
    heading("Hospedagem");
    subheading("Confirmada");
    trip.accommodation.confirmed.forEach((h) => {
      line("Hotel", `${h.city} — ${h.name}`);
      line("Endereço", h.address);
      line("Check-in", h.checkIn);
      line("Check-out", h.checkOut);
      line("Confirmação", h.confirmation);
      line("PIN", h.pin);
      line("Telefone", h.tel);
      text(h.note);
      y += 3;
    });
    subheading("A Reservar");
    trip.accommodation.toBook.forEach((h) => {
      line(h.city, `${h.dates} [${h.priority}]`);
    });
    separator();

    // ---- DOCUMENTOS & VISTOS ----
    heading("Documentos & Vistos");
    line("Passaporte", "Emitido ✓");
    trip.documents.docs.forEach((d) => { text("✓ " + d); });
    y += 3;
    subheading("Vistos por País");
    trip.documents.visas.forEach((v) => {
      checkPage(10);
      line(v.country, `${v.rule} · ${v.cost} [${v.tag}]`);
    });
    separator();

    // ---- VACINAS ----
    heading("Vacinação");
    line("Obrigatória", trip.vaccines.required.name);
    text(trip.vaccines.required.detail);
    y += 3;
    subheading("Em Dia");
    trip.vaccines.upToDate.forEach((v) => { line(v.name, v.date); });
    subheading("Recomendadas");
    trip.vaccines.recommended.forEach((v) => { line(v.name, v.reason); });
    separator();

    // ---- FINANCEIRO ----
    heading("Orçamento");
    line("Total disponível", `US$ ${trip.budget.total.toLocaleString()}`);
    trip.budget.distribution.forEach((d) => {
      line(d.destination, `US$ ${d.amount}`);
    });
    y += 3;
    subheading("Câmbio");
    trip.budget.currencies.forEach((c) => {
      line(`${c.code} (${c.name})`, `${c.rate} por 1 ${c.code}`);
    });
    separator();

    // ---- CHECKLIST ----
    heading("Checklist");
    const done = trip.checklist.filter((c) => c.done).length;
    text(`${done}/${trip.checklist.length} concluído (${Math.round((done / trip.checklist.length) * 100)}%)`);
    y += 2;
    trip.checklist.forEach((item) => {
      checkPage(6);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(31, 27, 22);
      const mark = item.done ? "☑" : "☐";
      doc.text(`${mark} ${item.text}`, margin, y);
      doc.setTextColor(140, 129, 120);
      doc.text(`[${item.done ? "OK" : item.priority}]`, W - margin - 15, y);
      y += 5;
    });
    separator();

    // ---- COMPRAS MÊS A MÊS ----
    heading("Compras Mês a Mês");
    trip.monthlyPurchases.forEach((month) => {
      subheading(month.month);
      text(month.note);
      month.items.forEach((item) => {
        checkPage(6);
        const mark = item.done ? "☑" : "☐";
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(31, 27, 22);
        doc.text(`${mark} ${item.text}`, margin, y);
        doc.setTextColor(224, 168, 107);
        doc.text(item.cost, W - margin - 20, y);
        y += 5;
      });
      y += 3;
    });

    // ---- UPLOADED DOCS ----
    const stored = JSON.parse(localStorage.getItem("__uploaded_docs") || "{}");
    const hasUploads = Object.values(stored).some((arr: any) => arr && arr.length > 0);
    if (hasUploads) {
      doc.addPage();
      y = 20;
      heading("Documentos Anexados");
      Object.entries(stored).forEach(([section, docs]: [string, any]) => {
        if (!docs || docs.length === 0) return;
        subheading(section.charAt(0).toUpperCase() + section.slice(1));
        docs.forEach((d: any) => {
          checkPage(10);
          line("Arquivo", d.name);
          if (d.text) {
            const preview = d.text.substring(0, 300) + (d.text.length > 300 ? "..." : "");
            text(preview);
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
