export default function Dicas() {
  const countries = [
    {
      country: "Dubai / EAU",
      flag: "🇦🇪",
      dressCode: "Shoppings e restaurantes: roupa casual OK. Mesquitas: mulheres devem cobrir braços, pernas e cabelo. Homens: calça comprida + camisa com manga. Na praia: biquíni/sunga OK, mas fora da praia nada de roupa de banho.",
      tipping: "Não é obrigatório mas apreciado. Restaurantes: 10% se não incluído. Táxi: arredondar para cima. Carregadores: AED 5-10.",
      scams: [
        "Táxi sem taxímetro — sempre peça para ligar ou use Uber/Careem",
        "Gold Souk — pechinche FORTE, preço inicial é 3-4x o real",
        "Safari no deserto — agências de rua vendem caro. Reserve online ou pelo hostel",
        "Câmbio na rua — sempre troque em casas oficiais",
      ],
      phrases: [
        { local: "Shukran", meaning: "Obrigado" },
        { local: "Salam alaikum", meaning: "Olá (formal)" },
        { local: "La", meaning: "Não" },
        { local: "Na'am", meaning: "Sim" },
        { local: "Kam?", meaning: "Quanto custa?" },
        { local: "Inshallah", meaning: "Se Deus quiser" },
      ],
    },
    {
      country: "Egito",
      flag: "🇪🇬",
      dressCode: "País conservador. Homens: calça comprida em mesquitas e áreas tradicionais. Bermuda OK em áreas turísticas. Mulheres: cobrir ombros e joelhos em mesquitas (lenço emprestado na entrada). No festival STARLIGHT: mais liberal, mas não exagere.",
      tipping: "ESSENCIAL no Egito — chamam de 'baksheesh'. Restaurante: 10-15%. Guias: EGP 50-100. Carregadores: EGP 10-20. Banheiro público: EGP 5. Gorjeta é esperada por QUALQUER serviço.",
      scams: [
        "Pirâmides: 'guias' não oficiais que pegam você na entrada — ignore e siga reto",
        "Camelo selfie: colocam você no camelo e cobram para descer (EGP 100+)",
        "Perfumaria/papiro: levam para lojas e ganham comissão. Só vá se quiser",
        "'Presente grátis' — nada é grátis. Se alguém colocar algo na sua mão, vai cobrar",
        "Táxi: NUNCA negocie preço — use Uber/Careem SEMPRE",
        "Água: só beba engarrafada. Evite gelo, saladas lavadas com água da torneira",
      ],
      phrases: [
        { local: "Shukran", meaning: "Obrigado" },
        { local: "Aiwa", meaning: "Sim" },
        { local: "La'", meaning: "Não" },
        { local: "Bekam?", meaning: "Quanto custa?" },
        { local: "Mish ayez", meaning: "Não quero" },
        { local: "Yalla", meaning: "Vamos / rápido" },
      ],
    },
    {
      country: "Grécia",
      flag: "🇬🇷",
      dressCode: "Bem tranquilo. Roupa casual em todo lugar. Igrejas ortodoxas: cobrir joelhos e ombros (às vezes lenço na porta). Praias: topless aceito em muitas praias das ilhas.",
      tipping: "Não obrigatório, mas arredonde a conta. Restaurante: deixe 5-10% ou o troco. Táxi: arredonde. Bares: € 0,50-1 por drink.",
      scams: [
        "Restaurantes turísticos: cardápio sem preço = conta surpresa. Peça o preço antes",
        "Atenas: cambistas de rua — use ATMs de bancos (Euronet cobra taxa alta)",
        "Santorini: burros pra subir a escadaria — são maltratados, suba a pé",
        "Táxis no aeroporto/porto: combine o preço antes ou use Uber (Beat em Atenas)",
      ],
      phrases: [
        { local: "Efcharistó", meaning: "Obrigado" },
        { local: "Yassas", meaning: "Olá (formal)" },
        { local: "Ne", meaning: "Sim" },
        { local: "Ochi", meaning: "Não" },
        { local: "Póso káni?", meaning: "Quanto custa?" },
        { local: "Parakaló", meaning: "Por favor" },
      ],
    },
    {
      country: "Turquia",
      flag: "🇹🇷",
      dressCode: "Istambul é cosmopolita — roupa casual. Mesquitas (Hagia Sophia, Mesquita Azul): tirar sapatos, cobrir joelhos e ombros. Mulheres: lenço para cabeça (emprestam na entrada).",
      tipping: "Restaurante: 5-10%. Guias de tour: TRY 50-100. Hamam (banho turco): TRY 50-100 para o massagista. Táxi: arredonde.",
      scams: [
        "'Amigo brasileiro!' — estranhos que falam português e levam para loja/bar. Ignore",
        "Engraxates: 'derrubam' a escova na sua frente, limpam seu sapato e cobram",
        "Bares em Taksim/Beyoğlu: convidam para drink, conta vem astronômica (golpe clássico)",
        "Tapetes: turcos são mestres em vender tapete. Só entre se quiser comprar",
        "Istanbulkart: compre na máquina, não de ambulantes (vendem mais caro)",
      ],
      phrases: [
        { local: "Teşekkür ederim", meaning: "Obrigado" },
        { local: "Merhaba", meaning: "Olá" },
        { local: "Evet", meaning: "Sim" },
        { local: "Hayır", meaning: "Não" },
        { local: "Ne kadar?", meaning: "Quanto custa?" },
        { local: "Lütfen", meaning: "Por favor" },
      ],
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Dicas culturais</h1>
      <p className="text-sm text-warm-400 mb-8">Dress code, gorjeta, golpes comuns e palavras úteis em cada país</p>

      <div className="space-y-10">
        {countries.map((c) => (
          <div key={c.country}>
            <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
              <span>{c.flag}</span> {c.country}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Dress code */}
              <div className="bg-white rounded-xl border border-warm-200/40 p-5">
                <p className="text-[11px] font-medium tracking-[1.5px] text-gold uppercase mb-2">Dress Code</p>
                <p className="text-sm text-warm-400">{c.dressCode}</p>
              </div>

              {/* Tipping */}
              <div className="bg-white rounded-xl border border-warm-200/40 p-5">
                <p className="text-[11px] font-medium tracking-[1.5px] text-gold uppercase mb-2">Gorjeta</p>
                <p className="text-sm text-warm-400">{c.tipping}</p>
              </div>
            </div>

            {/* Scams */}
            <div className="bg-red-50/50 rounded-xl border border-red-200/30 p-5 mb-4">
              <p className="text-[11px] font-medium tracking-[1.5px] text-red-500 uppercase mb-3">Golpes comuns / Cuidados</p>
              {c.scams.map((scam, i) => (
                <p key={i} className="text-sm text-red-700/80 py-1 flex items-start gap-2">
                  <span className="text-red-400 shrink-0">⚠</span> {scam}
                </p>
              ))}
            </div>

            {/* Phrases */}
            <div className="bg-white rounded-xl border border-warm-200/40 p-5">
              <p className="text-[11px] font-medium tracking-[1.5px] text-warm-400 uppercase mb-3">Palavras úteis</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {c.phrases.map((p, i) => (
                  <div key={i} className="bg-bg rounded-lg px-3 py-2">
                    <p className="font-semibold text-sm">{p.local}</p>
                    <p className="text-xs text-warm-400">{p.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
