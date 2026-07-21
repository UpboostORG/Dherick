const STATUS_STYLES: Record<string, string> = {
  "INSCRITO ✓": "text-white bg-green-600",
  URGENTE: "text-white bg-red-600",
  CONFIRMADO: "text-green-700 bg-green-100",
  RECORRENTE: "text-gold bg-gold/10",
  "A CONFIRMAR": "text-warm-400 bg-warm-200/30",
  CARO: "text-red-600 bg-red-50",
};

export default function Eventos() {
  const countries = [
    {
      country: "Dubai (EAU)",
      flag: "🇦🇪",
      period: "25-30/09 · sua janela",
      events: [
        { name: "AWS Summit Dubai", date: "qua 30/09 · 8h-19h", venue: "Dubai World Trade Centre", price: "GRÁTIS", status: "INSCRITO ✓", desc: "Inscrito com o e-mail dherick.sociais@upboostbusiness.com.br. Plano: 8h às ~10h45 (credenciamento + keynote), depois metrô pro DXB (~10 min) pro voo das 13h05.", link: "https://aws.amazon.com/events/summits/dubai/" },
        { name: "TGIS Toastmasters", date: "dom 27/09 · 17h15", venue: "Villa Rotana, Business Bay", price: "Grátis (visitante)", status: "RECORRENTE", desc: "Clube de oratória em inglês com expats — treinar inglês e conhecer profissionais locais.", link: "https://tgis.toastmastersclubs.org/" },
        { name: "JLT Dubai Toastmasters", date: "seg 28/09 · 18h45", venue: "JLT", price: "Grátis (visitante)", status: "RECORRENTE", desc: "Segunda opção de Toastmasters, no polo tech de JLT.", link: "https://jltdubai.toastmastersclubs.org/" },
        { name: "AstroLabs — meetups tech", date: "várias noites/semana", venue: "AstroLabs, JLT (Cluster R)", price: "Grátis", status: "A CONFIRMAR", desc: "O tech-hub mais 'comunidade' de Dubai: talks e meetups de tech/digital. Agenda sai no Luma 2-3 semanas antes.", link: "https://luma.com/astrolabs" },
        { name: "DIFC Innovation Hub", date: "vários/mês · noites úteis", venue: "Gate Avenue, DIFC", price: "Grátis", status: "A CONFIRMAR", desc: "Talks de fintech e IA no maior hub financeiro da região. Networking de alto nível.", link: "https://luma.com/difc_innovationhub" },
        { name: "Dubai Syndicate", date: "quartas · ~16h-19h", venue: "Mai Tower, Al Nahda", price: "Grátis", status: "RECORRENTE", desc: "Maior grupo de networking gratuito de Dubai — startups, PMEs e investidores. Qua 30/09 dá pra emendar após a manhã no AWS Summit? Apertado com o voo — avaliar.", link: "https://dubaisyndicate.com/events" },
      ],
      note: "GITEX Global e Expand North Star mudaram para dezembro/2026 — você não perde nada em outubro.",
    },
    {
      country: "Egito",
      flag: "🇪🇬",
      period: "30/09-05/10 e 08-12/10 · sua janela",
      events: [
        { name: "Techne Summit Alexandria", date: "3-5/10", venue: "Bibliotheca Alexandrina, Alexandria", price: "Visitor pass GRÁTIS", status: "CONFIRMADO", desc: "O maior evento de startups do Mediterrâneo/MENA (45 mil+ pessoas, 13 trilhas). Bate-volta de trem do Cairo (~2h30, poucos dólares) dia 3 ou 4/10, antes do ônibus pra Luxor. O achado do Egito.", link: "https://alex.technesummit.com/2026" },
        { name: "GrEEK Campus Downtown", date: "agenda no Instagram", venue: "171 El Tahrir, Cairo", price: "Grátis/barato", status: "A CONFIRMAR", desc: "Hub de tech mais icônico do Cairo (200+ eventos/ano). Pode ter side events do Techne Cairo entre 30/09 e 02/10 — checar @thegreekcampus ao chegar.", link: "https://www.thegreekcampus.com/" },
        { name: "GDG Cairo (Google)", date: "eventos regulares", venue: "varia (freq. GrEEK Campus)", price: "Grátis", status: "A CONFIRMAR", desc: "Workshops de IA/dev com inscrição gratuita; slides em inglês.", link: "https://gdg.community.dev/gdg-cairo/" },
        { name: "Palestras públicas AUC", date: "semestre de outono", venue: "AUC Tahrir Square", price: "Grátis", status: "A CONFIRMAR", desc: "Universidade Americana do Cairo: palestras públicas em inglês (economia, política, tech) no campus do centro.", link: "https://www.aucegypt.edu/events" },
      ],
      note: "RiseUp Summit 2026 já aconteceu (fevereiro). Em Luxor não há cena de eventos — aproveite os templos.",
    },
    {
      country: "Grécia",
      flag: "🇬🇷",
      period: "12-15/10 Atenas · 15-19/10 Santorini · sua janela",
      events: [
        { name: "PyCon Greece 2026", date: "seg 12 e ter 13/10", venue: "Technopolis, Gazi (Atenas)", price: "€25 estudante · €65 normal", status: "CONFIRMADO", desc: "Cai EXATAMENTE nos seus 2 primeiros dias em Atenas. Palestras em inglês de Python, IA e data science + networking denso com a cena tech grega. Comprar já — preço sobe.", link: "https://2026.pycon.gr/en/" },
        { name: "Mindstone #PracticalAI", date: "mensal · provável ter 13/10 à noite", venue: "Epignosis HQ, Atenas", price: "Grátis (com pizza)", status: "RECORRENTE", desc: "Maior meetup de IA prática de Atenas — cases reais, founders e devs. Emenda com o dia 2 da PyCon.", link: "https://www.meetup.com/mindstone-athens-practicalai-meetup/" },
        { name: "Co-Working Wednesday", date: "qua 14/10 · 10h-14h", venue: "Π55, Plateon 55 (Kerameikos)", price: "Grátis (paga o café)", status: "RECORRENTE", desc: "Manhã de coworking com nômades digitais e empreendedores remotos.", link: "https://www.meetup.com/meetup-group-dhlqlvdd/" },
        { name: "START your night UP", date: "qua 14/10 · 18h (provável)", venue: "Π55 Café, Plateon 55", price: "Grátis", status: "RECORRENTE", desc: "O afterwork clássico do ecossistema grego de startups — founders, investidores, clima informal. Mesmo endereço do coworking da manhã: dia inteiro de networking.", link: "https://www.starttech.vc/events/" },
        { name: "Digital Nomads Athens", date: "qui 20h30 e sáb 21h30", venue: "Mint Bar, Psiri", price: "Grátis", status: "RECORRENTE", desc: "Socials da comunidade nômade. Suas noites de qui/sáb serão em Santorini, mas o grupo é o melhor canal pra achar algo na seg 12 ou 19/10.", link: "https://www.meetup.com/digital-nomads-and-socialites-in-athens/" },
      ],
      note: "Santorini não tem cena de eventos — considere pausa do networking (ou crie um encontro ad-hoc no nomads.com).",
    },
    {
      country: "Turquia",
      flag: "🇹🇷",
      period: "20/10 em diante · janela aberta",
      events: [
        { name: "Istanbul Coders", date: "toda semana · 1 noite", venue: "ACM Agile Space, Şişli", price: "Grátis", status: "RECORRENTE", desc: "Comunidade de 8.400 devs, English-friendly (IA, agentes, Python, cloud). Dá pra ir toda semana da sua estadia — o jeito mais garantido de conhecer a cena local.", link: "https://www.meetup.com/istanbul-hackers/" },
        { name: "Startup Grind Istanbul", date: "mensal", venue: "HAN Spaces, Beşiktaş", price: "Grátis a ~US$10", status: "RECORRENTE", desc: "Fireside chats com founders e VCs do ecossistema turco, frequentemente em inglês. Agenda no Luma 2-4 semanas antes.", link: "https://www.startupgrind.com/istanbul/" },
        { name: "GDG DevFest Istanbul", date: "~início de novembro (a anunciar)", venue: "edição 2025: UNIQ Hall", price: "< US$20", status: "A CONFIRMAR", desc: "2.500+ pessoas, 44 palestrantes, trilha em inglês. Se a data 2026 cair na sua estadia, é imperdível pelo preço.", link: "https://devfest.istanbul/" },
        { name: "Smileys Community", date: "semanal", venue: "varia", price: "Grátis/barato", status: "RECORRENTE", desc: "Eventos semanais de nômades digitais e expats — networking informal em inglês.", link: "https://www.meetup.com/istanbul-socialising-networking-group/" },
        { name: "InterNations Istanbul", date: "mensal", venue: "varia", price: "~€5-10", status: "RECORRENTE", desc: "Encontros de profissionais expats em inglês. Cadastro grátis.", link: "https://www.internations.org" },
        { name: "Webrazzi Summit", date: "21/10", venue: "Wyndham Grand Levent", price: "~US$800+", status: "CARO", desc: "A principal conferência tech da Turquia cai 1 dia após sua chegada — mas o preço é corporativo e o conteúdo majoritariamente em turco. Só com ingresso de cortesia/voluntário.", link: "https://webrazzi.com/en/etkinlik/2026/summit/" },
      ],
      note: "O ecossistema de Istambul publica quase tudo no Luma (buscar 'Istanbul') e no Meetup — entrar nos grupos já.",
    },
    {
      country: "Por perto durante a viagem — desvios possíveis",
      flag: "🌍",
      period: "eventos em países vizinhos nas suas datas",
      events: [
        { name: "AI Everything Abu Dhabi + Fintech Forward Bahrein", date: "5-8/10", venue: "Abu Dhabi / Manama", price: "grátis, mas + ~US$300-500 de voos", status: "A CONFIRMAR", desc: "Descartados: caem em cima de Luxor e do ônibus do dia 5 — o desvio custaria mais que os eventos valem. O Techne Alexandria (3-4/10) cobre essa semana de graça.", link: "https://aieverythingabudhabi.com" },
        { name: "Cairo ICT — AI in Action", date: "8-11/11", venue: "Cairo (EIEC)", price: "Registro grátis", status: "CONFIRMADO", desc: "30ª edição, tema IA. Você já estará em Istambul (voo ~2h, ~US$150-200 i/v) — só se quiser rever o Egito; o GITEX em dezembro é aposta melhor.", link: "https://cairoict.com/" },
        { name: "Arábia Saudita (Biban, GAIN, LEAP)", date: "vários", venue: "Riyadh", price: "—", status: "CARO", desc: "Risca do plano: brasileiro não tem eVisa direto — visa on arrival só com visto EUA/UK/Schengen já usado. LEAP 2027 (3-6/02) fica pra quando tiver visto.", link: "https://bibanglobal.sa/en" },
      ],
      note: "Vistos: Qatar isento 90 dias · Bahrein eVisa ~US$24 · EAU isento — só a Arábia Saudita é obstáculo.",
    },
    {
      country: "Depois de Istambul — Europa & volta a Dubai",
      flag: "🗺️",
      period: "nov-dez/2026 · escolha o próximo destino pelos eventos",
      events: [
        { name: "Web Summit Lisboa — VOLUNTÁRIO", date: "9-12/11", venue: "Altice Arena, Lisboa 🇵🇹", price: "GRÁTIS (voluntário) · €895 normal", status: "URGENTE", desc: "Maior evento de tech da Europa (70 mil pessoas). Programa de voluntário = entrada grátis, mas as vagas fecham meses antes — INSCREVER JÁ. Mesmo sem ingresso, Lisboa tem dezenas de side events grátis na semana. Bônus: fala português!", link: "https://websummit.com/volunteers/" },
        { name: "OpenFest Sofia", date: "7-8/11 (provável)", venue: "Sofia, Bulgária 🇧🇬", price: "GRÁTIS", status: "A CONFIRMAR", desc: "Maior festival open-source da Bulgária. Ônibus Istambul→Sofia €20-30 (7h). ⚠️ Bulgária agora É Schengen — queima dias do visto.", link: "https://www.openfest.org/" },
        { name: "GoTech World", date: "10-11/11", venue: "Romexpo, Bucareste 🇷🇴", price: "~€25-60", status: "CONFIRMADO", desc: "Maior expo de TI da Europa Central/Oriental: 15 mil pessoas, 11 palcos (IA, cyber, dev). Emenda perfeita depois de Sofia. ⚠️ Romênia também é Schengen.", link: "https://www.gotech.world/" },
        { name: "DSC Europe — Data Science Conference", date: "16-20/11", venue: "Belgrado, Sérvia 🇷🇸", price: "~€100+ (tem voluntário)", status: "CONFIRMADO", desc: "Maior evento de IA dos Balcãs (3.000 pessoas, 400 palestras, inglês). Sérvia fica FORA do Schengen — não gasta visto. Vale escrever pedindo vaga de voluntário.", link: "https://datasciconference.com/" },
        { name: "Slush Helsinki — VOLUNTÁRIO", date: "18-19/11", venue: "Helsinque, Finlândia 🇫🇮", price: "GRÁTIS (voluntário) · €395+ normal", status: "A CONFIRMAR", desc: "O evento de founders/VCs mais respeitado da Europa. ~1.700 vagas de voluntário = entrada grátis (inscrições abrem ago-set). Contra: Helsinque cara e gelada em nov. Conflita com DSC Belgrado — escolher um.", link: "https://slush.org/" },
        { name: "ITU Big Bang + DevFest Istanbul", date: "~fim de nov (a anunciar)", venue: "UNIQ Istanbul", price: "GRÁTIS", status: "A CONFIRMAR", desc: "Ficando em Istambul: o maior demo day da Turquia (prêmios bilionários no palco, grátis) + o maior DevFest da região. Datas 2026 saem em set-out.", link: "https://bigbang.itucekirdek.com/en/" },
        { name: "Take Off Istanbul", date: "~10-11/12 (provável)", venue: "Istanbul Expo Center", price: "GRÁTIS", status: "A CONFIRMAR", desc: "Summit internacional de startups da TEKNOFEST, em inglês, 250+ investidores de 40 países — participação totalmente gratuita. O melhor evento grátis de dezembro na região.", link: "https://takeoffistanbul.com/en/" },
        { name: "GITEX Global + Expand North Star", date: "7-11/12", venue: "Expo City Dubai 🇦🇪", price: "~US$160 (passe cobre os dois)", status: "CONFIRMADO", desc: "O maior evento de tech do mundo (200 mil pessoas) + o maior encontro startup×investidor do planeta, juntos pela 1ª vez na Expo City. Voo IST→DXB ~4h30 (~US$150-280), sem visto. O retorno a Dubai com maior valor por dólar.", link: "https://www.gitex.com/gitex-global-2026" },
        { name: "Web Summit Qatar", date: "31/01-3/02/2027", venue: "Doha, Catar 🇶🇦", price: "~US$100-300 (early bird)", status: "CONFIRMADO", desc: "Se a viagem esticar: 30 mil pessoas, brasileiro isento de visto (90 dias), voo IST→DOH ~4h30. O 'gran finale' possível.", link: "https://qatar.websummit.com/" },
      ],
      note: "Estratégia Schengen: seus 90 dias valem pra Grécia, Bulgária, Romênia, Portugal e Finlândia. Turquia, Sérvia, Macedônia, Albânia e UK ficam FORA — use Istambul/Belgrado de base e entre no Schengen só nas semanas de evento.",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-serif mb-1">Eventos & Networking</h1>
      <p className="text-sm text-warm-400 mb-6">Palestras e eventos de business em inglês, baratos ou grátis, nas suas datas em cada país</p>

      <div className="bg-bg-dark text-white rounded-xl p-5 mb-8">
        <p className="text-[11px] font-medium tracking-[2px] text-gold uppercase mb-2">Fazer agora (custa €25 no máximo)</p>
        <ul className="text-sm space-y-1.5 text-warm-100">
          <li className="line-through opacity-60">✓ AWS Summit Dubai — inscrito (30/09)</li>
          <li>1. Comprar ingresso estudante da <strong className="text-gold">PyCon Greece</strong> (€25) — único que sobe de preço</li>
          <li>2. Registrar grátis no <strong className="text-gold">Techne Alexandria</strong> (visitor pass)</li>
          <li>3. Entrar nos grupos de Meetup/Luma de cada cidade — as agendas de outubro chegam por lá</li>
        </ul>
      </div>

      <div className="space-y-8">
        {countries.map((c) => (
          <div key={c.country}>
            <div className="flex items-baseline justify-between mb-4 flex-wrap gap-1">
              <h2 className="text-xl font-serif flex items-center gap-2">
                <span>{c.flag}</span> {c.country}
              </h2>
              <span className="text-xs text-warm-400">{c.period}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {c.events.map((ev, i) => (
                <div key={i} className="bg-white rounded-xl border border-warm-200/40 p-4 flex flex-col">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-semibold text-sm">{ev.name}</h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded whitespace-nowrap ${STATUS_STYLES[ev.status]}`}>{ev.status}</span>
                  </div>
                  <p className="text-xs text-warm-400 mb-1">{ev.date} · {ev.venue}</p>
                  <p className="text-xs text-gold font-mono mb-2">{ev.price}</p>
                  <p className="text-xs text-warm-400 flex-1">{ev.desc}</p>
                  <a href={ev.link} target="_blank" rel="noopener noreferrer" className="text-xs text-gold hover:underline mt-2 inline-block">
                    Ver evento →
                  </a>
                </div>
              ))}
            </div>
            {c.note && (
              <p className="text-xs text-warm-400 mt-3 bg-warm-200/20 rounded-lg px-3 py-2">ℹ️ {c.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
