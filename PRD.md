# PRD: Site de Pedidos da Pizzaria

*Documento de requisitos de produto para trabalho de UX, baseado na pesquisa do grupo. Percentuais marcados com (?) precisam ser confirmados.*

## 1. Visão geral

**Resumo:** site para pedir pizza com o mínimo de esforço, desde a vontade de comer até a pizza chegar à mesa.

**Problema:** pedir pizza parece simples, mas o usuário enfrenta cadastros longos, preço só revelado no final, falta de acompanhamento e instabilidade do site.

**Proposta de valor:** "Menos esforço. Mais conveniência."

## 2. Objetivos

- Reduzir a desistência no checkout.
- Permitir que o usuário chegue ao cardápio e peça rápido.
- Dar transparência de preço e de status do pedido.

**Métricas sugeridas:** taxa de conclusão de pedido, tempo até o primeiro pedido, taxa de abandono no checkout, uso de filtros e de promoções.

## 3. Público-alvo e personas

*A preencher com o perfil dos respondentes: faixa etária, frequência de pedidos, dispositivo usado.*

Sugestão: 1 ou 2 personas, por exemplo "quem pede no celular com pressa" e "quem pede para a família no fim de semana".

## 4. Insights da pesquisa

| Insight | Dado | Decisão de design |
| --- | --- | --- |
| Usuário já entra pensando em pedir | Acesso rápido ao cardápio (51,4%), promoções (48,6%), fotos (37,1%), avaliações (31,4%) | Cardápio e promoções em destaque na home |
| Cardápio precisa de decisão rápida | Filtros mais desejados: sabores/ingredientes (74,1%?), faixa de preço (62,9%), tamanho (48,6%), promoções (45,7%), mais pedidos (17,1%) | Filtros visíveis no topo do cardápio |
| Preço deve acompanhar a escolha | 91,4% querem ver o preço atualizado durante a personalização | Preço dinâmico e fixo na tela (ex.: R$ 49,90 + borda recheada = R$ 57,90) |
| Cadastro faz desistir | Percentual alto de desistência por cadastro (?) | Checkout simples, com opção de convidado |
| Endereço é fricção | Maioria prefere preenchimento automático (?) | Autopreenchimento / geolocalização |
| Quando algo dá errado | Demora/atraso (32,7%?), itens faltando, site instável | Status em tempo real e canal de contato claro |
| Falta de acompanhamento gera ansiedade | "Cadê minha pizza?" | Tela de acompanhamento, com WhatsApp como apoio |

## 5. Jornada do usuário

**Vontade → Escolha → Pedido → Acompanhamento → Pizza na mesa**

## 6. Requisitos funcionais

### Must have

- Home com acesso rápido ao cardápio, promoções e fotos
- Cardápio com filtros (sabor/ingrediente, preço, tamanho, promoções, mais pedidos)
- Personalização da pizza (tamanho, borda, ingredientes) com preço atualizado em tempo real
- Checkout simplificado, sem cadastro obrigatório
- Endereço com autopreenchimento
- Acompanhamento do status do pedido (pedido realizado → em preparo → saiu para entrega → entregue)

### Should have

- Avaliações de outros clientes
- Seção "mais pedidos"
- Notificações por WhatsApp

### Could have

- Login opcional com histórico e "pedir de novo"

## 7. Requisitos não funcionais

Responsivo (mobile-first), carregamento rápido, estabilidade, acessibilidade (contraste, tamanho de fonte), fotos otimizadas.

## 8. Diretrizes de UX/UI

- Tom visual: acolhedor, "abre o apetite" (fotos grandes, tons quentes e creme, como nos slides)
- Preço sempre visível durante a personalização
- Poucos cliques até o pedido
- Feedback claro em cada etapa

## 9. Fora do escopo (v1)

*Exemplos: programa de fidelidade, app nativo, pagamento por múltiplos cartões.*

## 10. Riscos e questões em aberto

- Integração com WhatsApp e sistema da pizzaria
- Definir formas de pagamento aceitas
- Validar os dados incertos da pesquisa

## 11. Próximos passos

Wireframes → protótipo de média fidelidade → teste de usabilidade → ajustes.
