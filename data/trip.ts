export const trip = {
  title: "Volta ao Mundo",
  owner: "Dherick Prado Abreu",
  year: 2026,
  departureDate: "2026-09-24T02:00:00",
  departureFrom: "Cuiabá",

  route: [
    { code: "CGB", city: "Cuiabá" },
    { code: "GRU", city: "São Paulo" },
    { code: "DXB", city: "Dubai" },
    { code: "CAI", city: "Cairo" },
    { code: "ATH", city: "Atenas" },
    { code: "GR", city: "Ilhas" },
    { code: "TR", city: "Turquia" },
    { code: "MK", city: "Macedônia" },
  ],

  itinerary: [
    { date: "24/09", from: "CGB", to: "GRU", status: "ok", tag: "Voo · OK", detail: "GOL G3 1469 · 02h00 → 05h20 · confirmado" },
    { date: "25/09", from: "GRU", to: "DXB", status: "ok", tag: "Voo · OK", detail: "Emirates EK 262 · 01h05 → chegada 23h00 · confirmado" },
    { date: "25-30/09", place: "Dubai", status: "warning", tag: "5 dias · hotel falta", detail: "Explorar Dubai — Burj Khalifa, Marina, Gold Souk. Hospedagem ainda não reservada." },
    { date: "30/09", from: "DXB", to: "CAI", status: "ok", tag: "Voo · OK", detail: "Kuwait Airways KU672+KU541 · 13h05 → chegada Cairo 18h00" },
    { date: "30/09-03/10", place: "Cairo", status: "ok", tag: "3 noites · OK", detail: "Pirâmides, Museu Egípcio, Khan el-Khalili. Hotel Pyramids Sunshine View confirmado." },
    { date: "03-08/10", place: "Cairo", status: "warning", tag: "5 noites · hotel falta", detail: "Bate-volta Luxor, Alexandria, explorar mais o Cairo. Hospedagem a reservar." },
    { date: "08/10", place: "Giza · STARLIGHT", status: "warning", tag: "Welcome Party", detail: "Welcome Party do festival a partir das 12h, na Grande Pirâmide." },
    { date: "09-10/10", place: "Giza · STARLIGHT", status: "warning", tag: "Festival", detail: "Festival principal nos dois dias." },
    { date: "11/10", place: "Giza · STARLIGHT", status: "warning", tag: "Farewell", detail: "Farewell Party — encerramento." },
    { date: "12/10", from: "CAI", to: "ATH", status: "ok", tag: "Voo · OK", detail: "Aegean A3931 · 04h00 → chegada Atenas 06h00" },
    { date: "12/10+", place: "Atenas", status: "warning", tag: "Hotel falta", detail: "Acrópole, Plaka, Monastiraki. Hospedagem a reservar." },
    { date: "a definir", place: "Ilhas Gregas", status: "warning", tag: "Falta tudo", detail: "Santorini / Mykonos / Creta / Rhodes. Passagem + hotel a reservar (temporada alta!)." },
    { date: "a definir", place: "Turquia", status: "warning", tag: "A definir", detail: "Istambul, Capadócia. Passagem e hotel a definir." },
    { date: "a definir", place: "Macedônia do Norte", status: "warning", tag: "Opcional", detail: "Skopje, Ohrid. Depende do tempo e orçamento." },
  ],

  activities: {
    "Dubai": {
      period: "25-30/09 · 5 dias",
      items: [
        { name: "Burj Khalifa — At the Top", desc: "Prédio mais alto do mundo (828 m). Mirante nos andares 124/125 ou 148. Vá no fim da tarde para pegar o dia e a vista noturna iluminada.", tip: "Ingresso online sai mais barato" },
        { name: "Dubai Mall & Dubai Fountain", desc: "Maior shopping do mundo, com aquário gigante e pista de gelo. À noite, show gratuito de fontes dançantes a cada 30 min em frente ao Burj Khalifa.", tip: "Show das fontes é grátis" },
        { name: "Old Dubai & Dubai Creek", desc: "Bairro histórico de Al Fahidi, com casas de vento e becos de arte. Atravesse o Creek num abra (barquinho de madeira) tradicional.", tip: "Abra custa ~1 AED" },
        { name: "Gold & Spice Souk (Deira)", desc: "Mercados tradicionais de ouro e especiarias no Dubai antigo. Pechinchar faz parte da experiência.", tip: "" },
        { name: "Palm Jumeirah & Atlantis", desc: "Ilha artificial em formato de palmeira. Mirante The View at The Palm e parque aquático Aquaventure no Atlantis.", tip: "" },
        { name: "Desert Safari", desc: "Passeio de 4x4 nas dunas, sandboard, jantar beduíno e pôr do sol no deserto. Ocupa meio período (tarde/noite).", tip: "Reserve com agência" },
        { name: "Museum of the Future", desc: "Arquitetura icônica em forma de anel prateado. Exposições imersivas sobre tecnologia e futuro.", tip: "Esgota — reserve antes" },
        { name: "Dubai Marina & JBR", desc: "Orla moderna com arranha-céus, restaurantes e praia urbana (The Beach / JBR). Ótimo para o fim de tarde.", tip: "" },
      ],
    },
    "Abu Dhabi": {
      period: "Bate-volta · ~1h30 de Dubai",
      items: [
        { name: "Sheikh Zayed Grand Mosque", desc: "Mesquita de mármore branco, uma das mais belas do mundo. Entrada gratuita — imperdível.", tip: "Roupa adequada obrigatória" },
        { name: "Louvre Abu Dhabi", desc: "Museu sob uma cúpula que cria uma 'chuva de luz', com obras de arte de todo o mundo.", tip: "" },
        { name: "Qasr Al Watan", desc: "Palácio presidencial aberto ao público. Arquitetura deslumbrante em branco e ouro.", tip: "" },
        { name: "Ferrari World (Yas Island)", desc: "Parque temático com a montanha-russa mais rápida do mundo (240 km/h).", tip: "" },
      ],
    },
  },

  flights: {
    confirmed: [
      { from: "CGB", to: "GRU", airline: "GOL · G3 1469", date: "24/09", time: "02h00 → 05h20", ref: "ELAAQM" },
      { from: "GRU", to: "DXB", airline: "Emirates · EK 262", date: "25/09", time: "01h05 → 23h00", ref: "BYYAHN" },
      { from: "DXB", to: "CAI", airline: "Kuwait · KU672+KU541", date: "30/09", time: "13h05 → 18h00", ref: "X44YYV" },
      { from: "CAI", to: "ATH", airline: "Aegean · A3931", date: "12/10", time: "04h00 → 06h00", ref: "XZECPY" },
    ],
    toBuy: [
      { from: "ATH", to: "Ilhas Gregas", note: "A partir de 12/10 (ex: Santorini/Mykonos)", priority: "ALTA" },
      { from: "Entre ilhas", to: "gregas", note: "Ferry ou voo, conforme roteiro", priority: "MÉDIA" },
      { from: "Grécia", to: "Turquia", note: "Após as ilhas (ex: ATH → IST ou ferry)", priority: "ALTA" },
      { from: "Turquia", to: "Macedônia do Norte", note: "Após Turquia (se for)", priority: "MÉDIA" },
      { from: "Retorno", to: "ao Brasil", note: "Em aberto — sem data definida", priority: "BAIXA" },
    ],
  },

  accommodation: {
    confirmed: [
      {
        city: "Cairo",
        name: "Pyramids Sunshine View",
        address: "Al Mansoureya Rd, Cairo · Quarto duplo c/ varanda · Café incluso",
        checkIn: "30/09 · 12h-14h",
        checkOut: "03/10 · 12h-13h",
        confirmation: "5876.376.598",
        pin: "5077",
        tel: "+20 11 09171466",
        note: "Cancelamento gratuito até 30/09 18h · Pagamento em USD no local",
      },
    ],
    toBook: [
      { city: "Dubai", dates: "25/09 a 30/09 · 5 noites", priority: "URGENTE" },
      { city: "Cairo (após 03/10)", dates: "03/10 a 12/10 · ~9 noites", priority: "FALTA" },
      { city: "Atenas", dates: "A partir de 12/10", priority: "FALTA" },
      { city: "Ilhas Gregas", dates: "A definir · temporada alta!", priority: "FALTA" },
      { city: "Turquia", dates: "A definir", priority: "FALTA" },
      { city: "Macedônia do Norte", dates: "A definir (se for)", priority: "PENDENTE" },
    ],
  },

  documents: {
    passport: { status: "ok", note: "Passaporte já emitido" },
    personal: {
      name: "Dherick Prado Abreu",
      birth: "28/09/2006 · 19a",
      cinValid: "10/04/2034",
      email: "upboostpro@gmail.com",
      phone: "+55 65 99297-9719",
      cpf: "080.658.851-95",
    },
    docs: [
      "Passaporte brasileiro — emitido ✓",
      "Carteira de Identidade Nacional (CIN) — válida até 10/04/2034",
      "CPF regular (080.658.851-95)",
    ],
    visas: [
      { country: "Dubai (EAU)", rule: "Isento p/ turismo — carimbo de 90 dias na chegada (acordo Brasil-EAU)", cost: "grátis", tag: "NA CHEGADA" },
      { country: "Egito", rule: "Visto on arrival ou e-visa · exige CIVP de febre amarela (vindo do Brasil)", cost: "USD 25", tag: "ON ARRIVAL" },
      { country: "Grécia (Schengen)", rule: "Sem visto até 90 dias — só passaporte (ETIAS só a partir de 2027)", cost: "grátis", tag: "LIVRE" },
      { country: "Turquia", rule: "Isento p/ turismo — até 90 dias em 180 (entrada gratuita c/ passaporte válido 6+ meses)", cost: "grátis", tag: "ISENTO" },
      { country: "Macedônia do Norte", rule: "Sem visto até 90 dias — só passaporte", cost: "grátis", tag: "LIVRE" },
    ],
  },

  vaccines: {
    required: {
      name: "Febre Amarela — ÚNICA OBRIGATÓRIA ✓",
      detail: "Exigida pelo Egito por você sair do Brasil (país de risco). Seu CIVP é válido desde 28/05/2026 e vale para a vida toda. Leve o certificado impresso.",
    },
    upToDate: [
      { name: "Febre Amarela + CIVP", date: "18/05/2026" },
      { name: "Difteria e Tétano (reforço)", date: "07/01/2021" },
    ],
    recommended: [
      { name: "Hepatite A", reason: "Egito — risco alto por água/alimentos" },
      { name: "Febre Tifoide", reason: "Egito — água/alimentos" },
    ],
    note: "Hep A e Tifoide não são obrigatórias, mas o Egito tem risco alto por água/alimentos — vale tomar numa clínica de viajantes ~2 semanas antes. Fora isso, evite água de torneira e gelo no Egito.",
  },

  checklist: [
    { text: "Passaporte emitido", done: true, priority: "OK" },
    { text: "Turquia — isento de visto p/ turismo (até 90 dias)", done: true, priority: "OK" },
    { text: "Entrada Dubai (EAU) — isento, visto na chegada", done: true, priority: "OK" },
    { text: "Reservar hospedagem Dubai (25-30/set)", done: false, priority: "ALTA" },
    { text: "Reservar hospedagem Cairo após 03/10", done: false, priority: "ALTA" },
    { text: "Comprar passagem ATH → Ilhas Gregas", done: false, priority: "ALTA" },
    { text: "Reservar hospedagem Atenas", done: false, priority: "ALTA" },
    { text: "Reservar hospedagem Ilhas Gregas", done: false, priority: "ALTA" },
    { text: "Comprar passagem Grécia → Turquia", done: false, priority: "ALTA" },
    { text: "Seguro viagem internacional (longa duração)", done: false, priority: "ALTA" },
    { text: "Reservar hospedagem Turquia", done: false, priority: "MÉDIA" },
    { text: "Definir e reservar Macedônia do Norte", done: false, priority: "MÉDIA" },
    { text: "Vacina Hepatite A (recomendada p/ Egito)", done: false, priority: "MÉDIA" },
    { text: "Vacina Febre Tifoide (recomendada p/ Egito)", done: false, priority: "MÉDIA" },
    { text: "eSIM / chip internacional (Airalo)", done: false, priority: "MÉDIA" },
    { text: "Seguro viagem contratado", done: false, priority: "MÉDIA" },
    { text: "Comprar dólares em espécie", done: false, priority: "MÉDIA" },
    { text: "Mochila / mala definida", done: false, priority: "BAIXA" },
    { text: "Lista de roupas e itens", done: false, priority: "BAIXA" },
    { text: "Backup documentos na nuvem", done: false, priority: "BAIXA" },
    { text: "Foto do passaporte no celular", done: false, priority: "BAIXA" },
    { text: "Avisar banco sobre viagem internacional", done: true, priority: "OK" },
    { text: "Cartão internacional sem IOF (Wise/C6)", done: true, priority: "OK" },
    { text: "CIVP (Febre Amarela) emitido", done: true, priority: "OK" },
    { text: "Passagem CGB→GRU confirmada", done: true, priority: "OK" },
    { text: "Passagem GRU→DXB confirmada", done: true, priority: "OK" },
    { text: "Passagem DXB→CAI confirmada", done: true, priority: "OK" },
    { text: "Passagem CAI→ATH confirmada", done: true, priority: "OK" },
    { text: "Hotel Cairo (30/09-03/10) confirmado", done: true, priority: "OK" },
  ],

  budget: {
    total: 3000,
    currency: "USD",
    distribution: [
      { destination: "Dubai & Abu Dhabi", amount: 900 },
      { destination: "Egito (Cairo + festival)", amount: 700 },
      { destination: "Grécia (Atenas + ilhas)", amount: 800 },
      { destination: "Turquia", amount: 400 },
      { destination: "Macedônia / reserva", amount: 200 },
    ],
    currencies: [
      { code: "AED", name: "Dubai (EAU)", desc: "Dirham · cartões aceitos · custo alto", rate: "R$ 1,41" },
      { code: "USD", name: "Egito", desc: "Pagamento em USD em muitos hotéis · levar dólares", rate: "R$ 5,20" },
      { code: "EUR", name: "Grécia", desc: "Euro · cartões em toda parte", rate: "R$ 5,90" },
      { code: "TRY", name: "Turquia", desc: "Lira · câmbio favorável · usar cartão", rate: "R$ 0,11" },
    ],
    meta: "Meta: viajar com tudo pago ✈ — A ideia é deixar passagens, hospedagens e ingressos 100% pagos antes de embarcar — assim os US$ 3.000 ficam livres só para o dia a dia.",
    pending: ["5 hospedagens a reservar", "3 passagens a comprar", "Seguro viagem"],
  },

  investmentGoals: {
    totalUSD: 3000,
    exchangeRate: 5.20,
    totalBRL: 15586,
    invested: 1000,
    investedBRL: 5195,
    remaining: 2000,
    remainingBRL: 10391,
  },

  monthlyPurchases: [
    {
      month: "Julho 2026",
      note: "Fechar hospedagens do Egito e de Atenas",
      items: [
        { text: "Reservar hospedagem Cairo (após 03/10 · ~9 noites)", cost: "~US$ 450", done: false },
        { text: "Reservar hospedagem Atenas", cost: "~€ 350", done: false },
        { text: "eSIM / chip internacional (Airalo)", cost: "~R$ 200", done: false },
      ],
    },
    {
      month: "Agosto 2026",
      note: "Comprar as passagens da Europa (preços sobem na alta)",
      items: [
        { text: "Passagem ATH → Ilhas Gregas", cost: "~€ 120", done: false },
        { text: "Reservar hospedagem Ilhas Gregas (temporada alta!)", cost: "~€ 500", done: false },
        { text: "Passagem Grécia → Turquia", cost: "~€ 90", done: false },
      ],
    },
    {
      month: "Setembro 2026",
      note: "Últimos ajustes antes de embarcar",
      items: [
        { text: "Reservar hospedagem Turquia", cost: "~US$ 250", done: false },
        { text: "Definir Macedônia do Norte (ir ou não)", cost: "~€ 150", done: false },
        { text: "Backup de todos documentos na nuvem + foto no cel", cost: "—", done: false },
        { text: "Revisar checklist final e embarcar! ✈", cost: "—", done: false },
      ],
    },
  ],
};
