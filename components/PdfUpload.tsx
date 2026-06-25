"use client";
import { useState, useRef } from "react";

interface Props {
  section: string;
  onExtracted?: (data: Record<string, string>) => void;
}

export default function PdfUpload({ section, onExtracted }: Props) {
  const [files, setFiles] = useState<{ name: string; url: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function extractText(file: File): Promise<string> {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: any) => item.str).join(" ");
      fullText += strings + "\n";
    }
    return fullText;
  }

  function parseFlightData(text: string): Record<string, string> {
    const data: Record<string, string> = {};
    const dateMatch = text.match(/(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/);
    if (dateMatch) data.date = dateMatch[1];
    const flightMatch = text.match(/([A-Z]{2})\s*(\d{3,4})/);
    if (flightMatch) data.flight = `${flightMatch[1]} ${flightMatch[2]}`;
    const airportMatch = text.match(/([A-Z]{3})\s*(?:→|->|to|–)\s*([A-Z]{3})/i);
    if (airportMatch) { data.from = airportMatch[1]; data.to = airportMatch[2]; }
    const timeMatch = text.match(/(\d{1,2}:\d{2})\s*(?:→|->|–|-)\s*(\d{1,2}:\d{2})/);
    if (timeMatch) { data.departure = timeMatch[1]; data.arrival = timeMatch[2]; }
    const refMatch = text.match(/(?:ref|booking|confirmation|locator|pnr)[:\s]*([A-Z0-9]{5,8})/i);
    if (refMatch) data.ref = refMatch[1];
    return data;
  }

  function parseHotelData(text: string): Record<string, string> {
    const data: Record<string, string> = {};
    const nameMatch = text.match(/(?:hotel|hostel|resort|inn|lodge|airbnb)[:\s]*(.+)/i);
    if (nameMatch) data.hotel = nameMatch[1].trim().substring(0, 60);
    const checkInMatch = text.match(/check[\s-]*in[:\s]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
    if (checkInMatch) data.checkIn = checkInMatch[1];
    const checkOutMatch = text.match(/check[\s-]*out[:\s]*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
    if (checkOutMatch) data.checkOut = checkOutMatch[1];
    const confMatch = text.match(/(?:confirm|reserv|booking)[a-zçã]*[:\s#]*([A-Z0-9\.\-]{4,20})/i);
    if (confMatch) data.confirmation = confMatch[1];
    return data;
  }

  function parseGenericData(text: string): Record<string, string> {
    const data: Record<string, string> = {};
    const dates = text.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/g);
    if (dates) data.dates = dates.join(", ");
    const names = text.match(/(?:nome|name|passenger|passageiro)[:\s]*([A-Za-zÀ-ÿ\s]+)/i);
    if (names) data.name = names[1].trim();
    return data;
  }

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setLoading(true);
    const newFiles = [...files];

    for (const file of Array.from(e.target.files)) {
      try {
        const text = await extractText(file);
        const url = URL.createObjectURL(file);
        newFiles.push({ name: file.name, url, text });

        let parsed: Record<string, string> = {};
        if (section === "passagens") parsed = parseFlightData(text);
        else if (section === "hospedagem") parsed = parseHotelData(text);
        else parsed = parseGenericData(text);

        if (onExtracted && Object.keys(parsed).length > 0) {
          onExtracted(parsed);
        }
      } catch (err) {
        console.error("Error processing PDF:", err);
      }
    }

    setFiles(newFiles);
    setLoading(false);

    const stored = JSON.parse(localStorage.getItem("__uploaded_docs") || "{}");
    stored[section] = newFiles.map((f) => ({ name: f.name, text: f.text }));
    localStorage.setItem("__uploaded_docs", JSON.stringify(stored));
  }

  function removeFile(idx: number) {
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    const stored = JSON.parse(localStorage.getItem("__uploaded_docs") || "{}");
    stored[section] = updated.map((f) => ({ name: f.name, text: f.text }));
    localStorage.setItem("__uploaded_docs", JSON.stringify(stored));
  }

  return (
    <div className="mt-6 p-4 border-2 border-dashed border-warm-200/50 rounded-xl bg-white/50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E0A86B" strokeWidth="2" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="18" x2="12" y2="12" />
            <line x1="9" y1="15" x2="15" y2="15" />
          </svg>
          <span className="text-sm font-medium text-warm-400">Anexar PDF</span>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          className="text-xs px-3 py-1.5 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors font-medium"
        >
          {loading ? "Processando..." : "Escolher arquivo"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFiles}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-warm-200/30 text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4924F" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span className="truncate text-warm-500">{f.name}</span>
              </div>
              <button onClick={() => removeFile(i)} className="text-warm-300 hover:text-red-400 ml-2 shrink-0">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
