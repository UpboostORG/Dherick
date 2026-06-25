"use client";
import { trip } from "@/data/trip";
import PdfUpload from "@/components/PdfUpload";

export default function Documentos() {
  const d = trip.documents;
  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Documentos &amp; vistos</h1>
      <p className="text-sm text-warm-400 mb-8">Passaporte em mãos · foco agora nos vistos</p>

      {/* Passport */}
      <div className="bg-green-50 rounded-xl border border-green-200/50 p-6 mb-6">
        <div className="flex items-start gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 mt-1" />
          <div>
            <h3 className="font-semibold text-lg">PASSAPORTE — em mãos ✓</h3>
            <p className="text-sm text-warm-400 mt-1">
              Passaporte já emitido — a maior pendência está resolvida! Antes de embarcar, confira só estes três pontos.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {[
            { label: "Validade", value: "Mín. 6 meses após o retorno" },
            { label: "Páginas", value: "Ao menos 2 em branco" },
            { label: "Backup", value: "Cópia na nuvem + foto no cel" },
          ].map((item) => (
            <div key={item.label} className="bg-white/80 rounded-lg p-3">
              <p className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase">{item.label}</p>
              <p className="text-sm mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Docs + Personal data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-green-700 uppercase mb-3">Você tem</p>
          {d.docs.map((doc, i) => (
            <p key={i} className="text-sm py-1.5 flex items-start gap-2">
              <span className="text-green-500">✓</span> {doc}
            </p>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-3">Dados Pessoais</p>
          {Object.entries({
            Nome: d.personal.name,
            Nascimento: d.personal.birth,
            "CIN válida até": d.personal.cinValid,
            "E-mail": d.personal.email,
            Telefone: d.personal.phone,
          }).map(([label, value]) => (
            <div key={label} className="flex justify-between py-1.5 text-sm">
              <span className="text-warm-400">{label}</span>
              <span className="font-mono text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visas */}
      <h2 className="text-xl font-serif mb-4">Vistos por país</h2>
      <div className="bg-white rounded-xl border border-warm-200/40 overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {d.visas.map((v, i) => (
              <tr key={i} className="border-b border-warm-200/20 last:border-0">
                <td className="p-4 font-semibold whitespace-nowrap">{v.country}</td>
                <td className="p-4 text-warm-400">{v.rule}</td>
                <td className="p-4 text-right font-mono whitespace-nowrap">{v.cost}</td>
                <td className="p-4 text-right">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    v.tag === "NA CHEGADA" || v.tag === "ON ARRIVAL" ? "bg-amber-50 text-amber-700" :
                    v.tag === "ISENTO" ? "bg-blue-50 text-blue-700" :
                    "bg-warm-200/30 text-warm-500"
                  }`}>
                    {v.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PdfUpload section="documentos" onExtracted={(data) => console.log("Extracted doc data:", data)} />
    </div>
  );
}
