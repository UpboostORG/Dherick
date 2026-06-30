export default function Starlight() {
  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Festival STARLIGHT</h1>
      <p className="text-sm text-warm-400 mb-8">O evento central da viagem — nas Pirâmides de Gizé</p>

      {/* Hero */}
      <div className="bg-bg-dark text-white rounded-xl p-6 mb-6">
        <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase">Grandes Pirâmides de Gizé</p>
        <h2 className="text-2xl font-serif mt-2">08 – 11 de Outubro 2026</h2>
        <p className="text-warm-400 mt-2 text-sm">3 dias + Welcome Party · o maior festival de música eletrônica no cenário mais icônico do planeta</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-[10px] tracking-[1.5px] text-warm-500 uppercase">Welcome Party</p>
            <p className="font-mono mt-1">08/10 · 12h</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[1.5px] text-warm-500 uppercase">Festival</p>
            <p className="font-mono mt-1">09-10/10</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[1.5px] text-warm-500 uppercase">Farewell</p>
            <p className="font-mono mt-1">11/10</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[1.5px] text-warm-500 uppercase">Local</p>
            <p className="font-mono mt-1">Gizé, Egito</p>
          </div>
        </div>
      </div>

      {/* Ingresso */}
      <div className="bg-red-50 rounded-xl border-2 border-red-200/50 p-5 mb-6">
        <div className="flex items-start gap-2">
          <span className="text-lg">🎫</span>
          <div>
            <h3 className="font-semibold text-red-800">Ingresso — PRIORIDADE CRÍTICA</h3>
            <p className="text-sm text-red-700 mt-1">
              Ingressos esgotam rápido. Compre o quanto antes pelo site oficial.
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-red-200/30">
                <span className="text-red-700">Site oficial</span>
                <span className="font-mono text-red-800">starlightfestival.com</span>
              </div>
              <div className="flex justify-between py-1 border-b border-red-200/30">
                <span className="text-red-700">Preço estimado</span>
                <span className="font-mono text-red-800">US$ 150–300+</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-red-700">Tipo</span>
                <span className="font-mono text-red-800">GA / VIP disponíveis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Como chegar */}
      <h2 className="text-xl font-serif mb-4">Como chegar em Gizé saindo do Cairo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <h3 className="font-semibold text-sm mb-2">🚇 Metrô + ônibus/táxi</h3>
          <p className="text-xs text-warm-400">Linha 2 até El Mounib → micro-ônibus ou táxi até Gizé. ~45min total.</p>
          <p className="text-xs text-gold font-mono mt-2">~EGP 10-20 (~R$ 1-2)</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <h3 className="font-semibold text-sm mb-2">🚕 Uber / Careem</h3>
          <p className="text-xs text-warm-400">Do centro do Cairo até Gizé. ~30-45min dependendo do trânsito.</p>
          <p className="text-xs text-gold font-mono mt-2">~EGP 80-150 (~R$ 8-15)</p>
        </div>
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <h3 className="font-semibold text-sm mb-2">🚐 Transfer do festival</h3>
          <p className="text-xs text-warm-400">Muitos festivais oferecem shuttle bus oficial. Verificar ao comprar ingresso.</p>
          <p className="text-xs text-gold font-mono mt-2">Verificar no site</p>
        </div>
      </div>

      {/* O que levar */}
      <h2 className="text-xl font-serif mb-4">O que levar para o deserto à noite</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-gold uppercase mb-3">Essencial</p>
          {[
            "Casaco/jaqueta leve — deserto esfria MUITO à noite (~15°C em outubro)",
            "Tênis fechado confortável — areia + chão irregular",
            "Protetor solar — durante o dia é forte",
            "Garrafa d'água reutilizável",
            "Documento com foto (passaporte ou cópia)",
            "Ingresso impresso ou no celular (com bateria!)",
            "Dinheiro em EGP para comida/água dentro",
          ].map((item, i) => (
            <p key={i} className="text-sm py-1.5 flex items-start gap-2">
              <span className="text-gold shrink-0">•</span> {item}
            </p>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-warm-200/40 p-5">
          <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-3">Recomendado</p>
          {[
            "Power bank carregado — celular vai gastar bateria rápido",
            "Lenço/bandana — areia voa com o vento",
            "Óculos de sol (para o dia)",
            "Protetor de ouvido (se ficar perto do palco)",
            "Pochete ou doleira — não leve mochila grande",
            "Máscara facial (poeira do deserto)",
            "Spray de inseto — mosquitos no fim da tarde",
          ].map((item, i) => (
            <p key={i} className="text-sm py-1.5 flex items-start gap-2">
              <span className="text-warm-400 shrink-0">•</span> {item}
            </p>
          ))}
        </div>
      </div>

      {/* Dicas */}
      <h2 className="text-xl font-serif mb-4">Dicas importantes</h2>
      <div className="space-y-3">
        {[
          { title: "Chegue cedo", desc: "Pôr do sol nas pirâmides é mágico — chegue antes das 17h para aproveitar" },
          { title: "Hidratação", desc: "Deserto desidrata rápido. Beba água o dia todo, mesmo sem sede" },
          { title: "Câmera", desc: "Pirâmides + luzes do festival = foto da vida. Celular com boa câmera ou GoPro" },
          { title: "Volta ao hostel", desc: "Festival acaba de madrugada. Combine Uber/Careem antes — táxis de rua cobram 5x mais" },
          { title: "Dress code", desc: "Casual, mas lembre que é Egito — evite roupas muito reveladoras fora do festival" },
        ].map((tip, i) => (
          <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-4 flex gap-3">
            <span className="text-gold font-bold shrink-0">{i + 1}</span>
            <div>
              <p className="font-semibold text-sm">{tip.title}</p>
              <p className="text-xs text-warm-400 mt-0.5">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
