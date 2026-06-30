"use client";
import { useState, useEffect } from "react";
import { trip } from "@/data/trip";

export default function Emergencia() {
  const [personalContacts, setPersonalContacts] = useState([
    { name: "", phone: "" },
  ]);
  const [insurance, setInsurance] = useState({ policy: "", phone24h: "", app: "" });

  useEffect(() => {
    const saved = localStorage.getItem("__emergency_data");
    if (saved) {
      const data = JSON.parse(saved);
      if (data.personalContacts) setPersonalContacts(data.personalContacts);
      if (data.insurance) setInsurance(data.insurance);
    }
  }, []);

  function save(contacts: typeof personalContacts, ins: typeof insurance) {
    localStorage.setItem("__emergency_data", JSON.stringify({ personalContacts: contacts, insurance: ins }));
  }

  function updateContact(i: number, field: "name" | "phone", value: string) {
    const updated = [...personalContacts];
    updated[i] = { ...updated[i], [field]: value };
    setPersonalContacts(updated);
    save(updated, insurance);
  }

  function addContact() {
    const updated = [...personalContacts, { name: "", phone: "" }];
    setPersonalContacts(updated);
    save(updated, insurance);
  }

  function updateInsurance(field: string, value: string) {
    const updated = { ...insurance, [field]: value };
    setInsurance(updated);
    save(personalContacts, updated);
  }

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Contatos de Emergência</h1>
      <p className="text-sm text-warm-400 mb-8">Embaixadas, polícia, ambulância — tudo num lugar só</p>

      {/* Emergency contacts by country */}
      <div className="bg-white rounded-xl border border-warm-200/40 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-dark text-white">
                <th className="text-left p-4 font-medium">País</th>
                <th className="text-left p-4 font-medium">Embaixada BR</th>
                <th className="text-left p-4 font-medium">Emergência</th>
                <th className="text-left p-4 font-medium">Polícia</th>
                <th className="text-left p-4 font-medium">Ambulância</th>
              </tr>
            </thead>
            <tbody>
              {trip.emergencyContacts.map((c, i) => (
                <tr key={i} className="border-b border-warm-200/20 last:border-0">
                  <td className="p-4 font-semibold whitespace-nowrap">{c.country}</td>
                  <td className="p-4 font-mono text-sm">{c.embassy}</td>
                  <td className="p-4 font-mono">{c.emergency}</td>
                  <td className="p-4 font-mono">{c.police}</td>
                  <td className="p-4 font-mono">{c.ambulance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Personal emergency contacts */}
      <h2 className="text-xl font-serif mb-4">Contatos pessoais de emergência</h2>
      <div className="bg-white rounded-xl border border-warm-200/40 p-5 mb-8">
        <p className="text-xs text-warm-400 mb-4">Familiar ou amigo no Brasil para emergências</p>
        {personalContacts.map((c, i) => (
          <div key={i} className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Nome"
              value={c.name}
              onChange={(e) => updateContact(i, "name", e.target.value)}
              className="flex-1 border border-warm-200/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            <input
              type="text"
              placeholder="Telefone"
              value={c.phone}
              onChange={(e) => updateContact(i, "phone", e.target.value)}
              className="flex-1 border border-warm-200/40 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>
        ))}
        <button onClick={addContact} className="text-sm text-gold hover:underline">+ Adicionar contato</button>
      </div>

      {/* Insurance */}
      <h2 className="text-xl font-serif mb-4">Seguro viagem</h2>
      <div className="bg-white rounded-xl border border-warm-200/40 p-5">
        <p className="text-xs text-warm-400 mb-4">Preencha quando contratar o seguro</p>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase">Nº da apólice</label>
            <input
              type="text"
              placeholder="Ex: APL-123456"
              value={insurance.policy}
              onChange={(e) => updateInsurance("policy", e.target.value)}
              className="w-full border border-warm-200/40 rounded-lg px-3 py-2 text-sm font-mono mt-1 focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>
          <div>
            <label className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase">Telefone 24h da seguradora</label>
            <input
              type="text"
              placeholder="Ex: 0800-XXX-XXXX"
              value={insurance.phone24h}
              onChange={(e) => updateInsurance("phone24h", e.target.value)}
              className="w-full border border-warm-200/40 rounded-lg px-3 py-2 text-sm font-mono mt-1 focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>
          <div>
            <label className="text-[10px] font-medium tracking-[1.5px] text-warm-400 uppercase">App da seguradora</label>
            <input
              type="text"
              placeholder="Ex: Allianz Travel"
              value={insurance.app}
              onChange={(e) => updateInsurance("app", e.target.value)}
              className="w-full border border-warm-200/40 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
