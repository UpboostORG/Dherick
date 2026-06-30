# Prompt para Claude Code — Melhorias no site dherick-site.vercel.app

Tenho um site de planejamento de viagem em Next.js/React hospedado na Vercel:
**https://dherick-site.vercel.app/**

Preciso que você analise o código e implemente todas as melhorias abaixo.

---

## Contexto da viagem

- Viajante: Dherick Prado Abreu, nascido 28/09/2006 (faz 20 anos durante a viagem)
- Partida: 24/09/2026 de Cuiabá (CGB) → São Paulo (GRU) → Dubai (DXB)
- Rota: Dubai (5 dias) → Cairo/Egito (12 dias, inclui festival STARLIGHT nas Pirâmides 08-11/10) → Atenas → Ilhas Gregas → Turquia (Istambul + Capadócia) → Macedônia do Norte (opcional)
- **Estratégia de hospedagem: HOSTELS em todos os destinos** — quero trocar todas as referências de "hotel" para hostel onde aplicável, e atualizar os valores estimados de hospedagem com preços realistas de hostel

---

## 1. ATUALIZAR HOSPEDAGEM PARA HOSTELS

Substitua as estimativas de custo de hospedagem nos seguintes arquivos/componentes com valores de hostel (cama em dormitório misto, média pesquisada):

- **Dubai:** ~US$ 20-30/noite em hostel (ex: Zostel Dubai, Backpackers Hostel Dubai) → 5 noites ≈ US$ 125
- **Cairo (03-12/10):** ~US$ 8-15/noite → 9 noites ≈ US$ 100
- **Atenas:** ~€ 15-22/noite → estimativa ≈ € 100 para ~5 noites
- **Ilhas Gregas:** ~€ 20-35/noite (mais caro em outubro ainda) → ≈ € 150 para ~5 noites
- **Turquia (Istambul):** ~US$ 10-18/noite → ≈ US$ 60 para ~4 noites
- **Capadócia:** ~US$ 15-25/noite → ≈ US$ 50 para ~2 noites
- **Macedônia do Norte:** ~€ 10-15/noite → ≈ € 40 para ~3 noites (se for)

Atualize os valores estimados na página `/compras` e `/financeiro` para refletir esses preços de hostel.

---

## 2. NOVA SEÇÃO — Contatos de Emergência

Criar uma nova página `/emergencia` (ou adicionar ao menu lateral como "Emergências") com:

### Por país:
| País | Embaixada Brasileira | Emergência Local | Polícia | Ambulância |
|------|---------------------|-----------------|---------|-----------|
| Dubai (EAU) | +971 4 397 4446 | 999 | 999 | 998 |
| Egito | +20 2 2794 2200 | 122 (polícia) | 122 | 123 |
| Grécia | +30 210 721 3650 | 112 | 100 | 166 |
| Turquia | +90 312 426 3081 | 112 | 155 | 112 |
| Macedônia do Norte | +389 2 329 3900 | 112 | 192 | 194 |

### Contatos pessoais de emergência:
- Campo editável para nome + telefone de familiar/amigo no Brasil

### Seguro viagem:
- Campo para número de apólice, telefone 24h da seguradora e app (quando contratar)

---

## 3. ATUALIZAR ORÇAMENTO — Página /financeiro

Com hostels, o orçamento de gasto diário muda. Atualize ou adicione os seguintes campos/cards:

**Novo breakdown com hostels:**
- Dubai & Abu Dhabi: US$ 450 (era US$ 900) — hostel ~US$ 125 + passeios/comida US$ 325
- Egito (Cairo + festival): US$ 500 (era US$ 700) — hostel ~US$ 100 + festival + passeios
- Grécia (Atenas + ilhas): US$ 550 (era US$ 800) — hostel ~€ 250 + ferry + passeios
- Turquia (Istambul + Capadócia): US$ 300 (era US$ 400) — hostel ~US$ 110 + balão Capadócia + etc
- Macedônia / reserva: US$ 200 — hostel ~€ 40 + reserva de segurança

**Total hospedagem estimada com hostels: ~US$ 605** (contra ~US$ 1.750+ em hotéis)
**Economia estimada: ~US$ 1.100+**

Adicione um card ou nota explicando: "Optando por hostels, você economiza ~US$ 1.100 em hospedagem — dinheiro que pode usar em passeios, o balão da Capadócia, ferry nas ilhas, etc."

---

## 4. ADICIONAR — Logística interna da Turquia

Na página `/roteiro`, na seção da Turquia, adicionar nota/card:

> **Istambul → Capadócia:** ~750km. Opções:
> - ✈️ Voo (Turkish Airlines / Pegasus): ~€ 30-80, ~1h20 — mais rápido
> - 🚌 Ônibus noturno (~10h): ~€ 15-25 — economia, dorme no trajeto
>
> Adicionar no `/passagens` como item "A comprar": "Passagem interna Turquia: IST → KYS/NAV (Capadócia)" com prioridade MÉDIA

---

## 5. ADICIONAR — Alerta de Onward Ticket

Na página `/documentos`, adicionar um card de aviso:

> ⚠️ **Prova de saída do país (Onward Ticket)**
> Dubai (EAU) e países Schengen (Grécia) podem exigir na imigração uma passagem de saída do país. Com retorno ao Brasil em aberto, você pode ser questionado.
> **Solução:** Tenha em mãos a passagem DXB → CAI (já confirmada) ao entrar em Dubai, e a passagem Grécia → Turquia ao entrar na Grécia. Isso costuma satisfazer a imigração.

---

## 6. ADICIONAR — Seção de Mochila/Bagagem

Na página `/checklist` ou como nova página `/bagagem`, adicionar lista de itens essenciais para viagem longa em hostel:

**Documentos (físico + digital):**
- [ ] Passaporte original
- [ ] CIVP impresso (Febre Amarela)
- [ ] Cópias de todas as reservas impressas
- [ ] Cartão de crédito internacional (Wise/C6)
- [ ] Dólares em espécie

**Eletrônicos:**
- [ ] Celular + carregador
- [ ] Adaptador universal de tomada
- [ ] Power bank
- [ ] eSIM ativado (Airalo)
- [ ] Fones de ouvido

**Hostel essentials:**
- [ ] Cadeado para armário de hostel (com chave ou comb.)
- [ ] Toalha de microfibra (hostels raramente fornecem)
- [ ] Protetor de ouvido (para dormitório)
- [ ] Máscara de dormir (para dormitório)
- [ ] Saco de dormir liner (opcional, higiênico)

**Roupas — clima quente (Dubai/Egito em set/out, Grécia/Turquia em out):**
- [ ] 4-5 camisetas leves
- [ ] 2 calças/bermudas versáteis
- [ ] 1 calça comprida (para mesquitas e lugares conservadores — obrigatório em Dubai/Egito)
- [ ] Roupa íntima para 5 dias (lava-se nos hostels)
- [ ] Tênis confortável para caminhar
- [ ] Sandália/chinelo (para hostel e praia)
- [ ] Casaco leve (Grécia/Turquia em outubro resfria à noite)

**Farmácia:**
- [ ] Antidiarreico (Loperamida/Imosec) — essencial para Egito
- [ ] Reidratante oral
- [ ] Norfloxacino ou similar (antibiótico intestinal)
- [ ] Protetor solar 50+
- [ ] Repelente
- [ ] Analgésico/antitérmico (Paracetamol/Ibuprofeno)
- [ ] Band-aids
- [ ] Antialérgico

---

## 7. ATUALIZAR — Página /vacinas

Adicionar nota sobre timing das vacinas de Hepatite A e Tifoide:

> ⏰ **Prazo:** Tome Hepatite A e Febre Tifoide idealmente **até meados de agosto** para ter 2+ semanas de imunidade antes de entrar no Egito (30/09). Procure uma clínica de viajantes em Cuiabá.

---

## 8. ATUALIZAR — Página /passagens (seção "A Comprar")

Adicionar item faltante:

- **Passagem interna Turquia: IST → Capadócia (KYS ou NAV)** — prioridade MÉDIA, ~€ 30-80

---

## 9. ADICIONAR — Dicas de hostel por destino (em /passeios ou nova aba)

Para cada cidade, adicionar card com hostel recomendado:

- **Dubai:** Zostel Dubai (Dubai Marina) ou Backpackers Hostel Dubai
- **Cairo:** Cairo Hostel, Meramees Hostel (próximo às pirâmides)
- **Atenas:** Athens Backpackers, City Circus Athens
- **Santorini/Mykonos:** Anemomilos Hostel (Santorini), Mykonos Backpacker
- **Istambul:** Agora Guesthouse & Hostel, World House Hostel
- **Capadócia:** Shoestring Cave Hostel (dorme em caverna — experiência única)
- **Skopje (Macedônia):** YouthHostel Skopje, Hostel Mango

---

## 10. PEQUENOS FIXES

- Na página `/roteiro`, o trecho "12/10+ Atenas" não tem data de saída — adicionar campo de duração editável
- Na página `/financeiro`, as taxas de câmbio estão fixas — se possível, buscar de uma API pública (ex: open.er-api.com) para manter atualizado automaticamente
- No `/checklist`, adicionar item: "Cadeado para armário de hostel" — prioridade BAIXA
- No `/checklist`, adicionar item: "Toalha de microfibra" — prioridade BAIXA
- No `/checklist`, adicionar item: "Comprar ingressos festival STARLIGHT" — prioridade **CRÍTICA** (se ainda não tiver)

---

## Observações técnicas

- Mantenha o padrão visual do site (dark theme, cards, badges de prioridade)
- Todos os campos editáveis devem manter o padrão de clique para editar que já existe
- O menu lateral deve incluir a nova página de Emergências e/ou Bagagem
- Salvar no localStorage como já é feito nas outras páginas

