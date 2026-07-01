export default function Transporte() {
  const cities = [
    {
      city: "Dubai",
      flag: "🇦🇪",
      options: [
        { name: "Dubai Metro", desc: "Limpo, eficiente, cobre toda a cidade. Linha vermelha (Burj Khalifa, Marina) e verde (Deira, Creek). Ar condicionado.", price: "~AED 3-8 (R$ 4-11)", tip: "Compre o NOL Card (cartão recarregável) na estação — economiza vs ticket avulso" },
        { name: "Ônibus RTA", desc: "Complementa o metrô. Cobre áreas que o metrô não chega (Palm Jumeirah, etc).", price: "~AED 3 (R$ 4)", tip: "Mesmo NOL Card do metrô funciona" },
        { name: "Abra (barco)", desc: "Barquinho de madeira tradicional que cruza o Dubai Creek. Experiência cultural obrigatória.", price: "AED 1 (R$ 1,40)", tip: "Pague em moeda — não aceita cartão" },
        { name: "Uber/Careem", desc: "Funciona perfeitamente. Bom para Desert Safari ou horários noturnos.", price: "Variável", tip: "Careem é a versão local, às vezes mais barato" },
      ],
    },
    {
      city: "Cairo",
      flag: "🇪🇬",
      options: [
        { name: "Metrô do Cairo", desc: "3 linhas. Cobre centro, Tahrir, estação Gizé. Vagão feminino disponível. Um dos mais baratos do mundo.", price: "EGP 5-10 (R$ 0,50-1)", tip: "Absurdamente barato. Evite horário de pico (lotado)" },
        { name: "Uber/Careem", desc: "Obrigatório em Cairo. Táxi de rua tenta cobrar 10x o preço. Uber resolve tudo.", price: "~EGP 30-80 por corrida", tip: "SEMPRE use Uber — nunca negocie táxi de rua" },
        { name: "Micro-ônibus", desc: "Vans lotação que cobrem toda a cidade. Baratíssimo mas caótico.", price: "EGP 2-5 (centavos)", tip: "Só para aventureiros — pergunte a locais para onde vai" },
        { name: "Trem (para Luxor/Alexandria)", desc: "Trem noturno Cairo→Luxor ou trem rápido Cairo→Alexandria (~2h30).", price: "EGP 50-200", tip: "Reserve 1ª classe no app ENR — ar condicionado" },
      ],
    },
    {
      city: "Atenas",
      flag: "🇬🇷",
      options: [
        { name: "Metrô de Atenas", desc: "3 linhas modernas. Liga aeroporto, centro (Syntagma/Monastiraki), Pireu (porto). Estações são museus.", price: "€ 1,20 (R$ 7)", tip: "Bilhete de 5 dias: € 8,20 — vale muito a pena" },
        { name: "Ônibus/Trólebus", desc: "Rede extensa. Útil para bairros que o metrô não cobre.", price: "€ 1,20 (mesmo bilhete)", tip: "Mesmo bilhete serve para metrô, ônibus e tram" },
        { name: "Ferry (para ilhas)", desc: "Do porto de Pireu. Blue Star Ferries, SeaJets (rápido), Hellenic Seaways.", price: "€ 20-60 por trecho", tip: "Reserve no ferryhopper.com — compara preços" },
        { name: "A pé", desc: "Centro de Atenas é compacto. Acrópole, Plaka, Monastiraki — tudo a pé.", price: "Grátis", tip: "Melhor forma de conhecer a cidade" },
      ],
    },
    {
      city: "Istambul",
      flag: "🇹🇷",
      options: [
        { name: "Istanbulkart", desc: "Cartão recarregável que funciona em TUDO: metrô, tram, ferry, ônibus. Indispensável.", price: "TRY 70 (cartão) + TRY 10-20/viagem", tip: "Compre na primeira estação de metrô ou ferry — funciona em todo transporte" },
        { name: "Tram T1", desc: "A linha mais turística: Sultanahmet (Hagia Sophia) → Galata → Taksim. Beira o Bósforo.", price: "~TRY 15 (R$ 1,65)", tip: "Passe pelo Istanbulkart — avulso é mais caro" },
        { name: "Ferry Bósforo", desc: "Travessia Europa↔Ásia pelo Bósforo. Vista incrível das mesquitas e palácios.", price: "~TRY 15 (R$ 1,65)", tip: "Funciona com Istanbulkart. Faça ao pôr do sol" },
        { name: "Dolmuş", desc: "Micro-ônibus/van compartilhada. Rotas fixas, preço fixo.", price: "TRY 15-30", tip: "Pague em dinheiro ao motorista" },
      ],
    },
    {
      city: "Capadócia",
      flag: "🇹🇷",
      options: [
        { name: "Tour organizado", desc: "Red Tour e Green Tour cobrem os pontos principais. Guia + transporte + almoço incluídos.", price: "~€ 30-50/dia", tip: "Reserve no hostel — preços melhores que online" },
        { name: "Aluguel de scooter/ATV", desc: "Para explorar vales e formações por conta própria. Liberdade total.", price: "~€ 15-25/dia", tip: "CNH internacional recomendada" },
        { name: "A pé", desc: "Trilhas pelos vales (Love Valley, Rose Valley) são incríveis e gratuitas.", price: "Grátis", tip: "Leve água e protetor solar — sol forte" },
        { name: "Balão", desc: "O passeio icônico. Voo ao nascer do sol sobre as chaminés de fada.", price: "€ 150-250", tip: "Reserve com antecedência — cancela por mau tempo" },
      ],
    },
    {
      city: "Santorini",
      flag: "🇬🇷",
      options: [
        { name: "Ferry entre ilhas", desc: "SeaJets (rápido, caro), Blue Star (lento, barato). Rotas: Atenas↔Santorini, Santorini↔Mykonos.", price: "€ 20-70 por trecho", tip: "ferryhopper.com para comparar e reservar" },
        { name: "Ônibus local (KTEL)", desc: "Cada ilha tem seu sistema de ônibus. Cobre praias e vilas principais.", price: "€ 1-3", tip: "Horários limitados — confira antes" },
        { name: "Aluguel de quadriciclo/moto", desc: "Forma mais popular de explorar Santorini e Mykonos.", price: "€ 20-40/dia", tip: "Cuidado com estradas de terra em Santorini" },
        { name: "A pé", desc: "Trilha Fira→Oia em Santorini (~3h) é obrigatória. Vista insana.", price: "Grátis", tip: "Vá pela manhã — sombra e menos calor" },
      ],
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Transporte local</h1>
      <p className="text-sm text-warm-400 mb-8">Como se locomover em cada destino — economize e evite táxi turístico</p>

      <div className="space-y-8">
        {cities.map((city) => (
          <div key={city.city}>
            <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
              <span>{city.flag}</span> {city.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {city.options.map((opt, i) => (
                <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{opt.name}</h3>
                    <span className="text-xs text-gold font-mono whitespace-nowrap ml-2">{opt.price}</span>
                  </div>
                  <p className="text-xs text-warm-400">{opt.desc}</p>
                  {opt.tip && (
                    <p className="text-xs text-green-600 mt-2 bg-green-50 rounded px-2 py-1">
                      💡 {opt.tip}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
