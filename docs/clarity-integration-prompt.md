# Prompt: Integração Microsoft Clarity – Festival CampoAgro

> **Como usar este arquivo**
> - **No Cursor**: abra o arquivo, selecione tudo (Cmd/Ctrl + A), copie e cole no Composer (Cmd/Ctrl + I) em modo Agent.
> - **No Claude Code**: rode `claude` na raiz do projeto e cole o conteúdo, ou referencie o arquivo no contexto.
> - Antes de executar, deixe abertos no editor: `app/layout.tsx` (ou `pages/_app.tsx`), `package.json` e algumas páginas representativas, pra dar contexto ao agente.

---

## Tarefa: Integrar Microsoft Clarity no site do Festival CampoAgro

### Contexto
Aplicação Next.js (App Router) + algumas páginas HTML estáticas. Preciso adicionar tracking de comportamento via Microsoft Clarity para gerar relatórios de heatmap, gravações de sessão e estatísticas de cliques que serão usados pela organização do evento para captação de patrocinadores.

Requisitos obrigatórios:
- Conformidade com LGPD (consentimento explícito antes de qualquer tracking)
- Funcionar tanto nas páginas Next quanto nas páginas HTML puras
- Capturar eventos customizados nos elementos principais do site (logo, menu, expositores, patrocinadores, programação, inscrição)
- Não disparar nada antes do consentimento do usuário

### O que precisa ser implementado

#### 1. Variável de ambiente
- Adicionar `NEXT_PUBLIC_CLARITY_PROJECT_ID` no `.env.local` e no `.env.example`
- Documentar no README onde obter esse ID (clarity.microsoft.com → Settings → Setup)

#### 2. Componente do Clarity (Next App Router)
Criar `components/analytics/ClarityScript.tsx`:
- Usar `next/script` com strategy `afterInteractive`
- Snippet oficial do Clarity, mas inicializar em modo "consent required" (chamar `clarity("consent", false)` por padrão)
- Não renderizar se a env var estiver vazia (ambiente de dev sem ID)
- Tipar `window.clarity` corretamente (criar `types/clarity.d.ts`)

#### 3. Banner de consentimento LGPD
Criar `components/consent/CookieBanner.tsx`:
- Aparece no primeiro acesso (verificar via `localStorage` chave `campoagro_consent`)
- Texto claro em PT-BR explicando: que usamos Microsoft Clarity, que coletamos comportamento de navegação (cliques, scroll, gravação de sessão anonimizada), finalidade (melhoria do site e relatórios para patrocinadores), e link pra política de privacidade
- Três botões: "Aceitar todos", "Apenas essenciais" (recusa), "Saber mais" (link pra /privacidade)
- Ao aceitar: salvar `{ status: "granted", timestamp }` no localStorage e chamar `window.clarity("consent", true)`
- Ao recusar: salvar `{ status: "denied", timestamp }` e NÃO disparar o Clarity
- Permitir revisão da escolha depois (botão discreto no rodapé "Preferências de cookies")
- Estilo deve combinar com o tema do festival (deixar tokens de cor via variáveis CSS pra eu ajustar)

#### 4. Integração no layout
- Importar `ClarityScript` e `CookieBanner` no `app/layout.tsx`
- Garantir que o Script só inicialize após hydration

#### 5. Hook para eventos customizados
Criar `hooks/useClarityTrack.ts`:
```ts
const track = useClarityTrack();
track("logo_click");
track("expositor_view", { nome: "FazendaX" });
```
- Verificar se consentimento foi dado antes de chamar `window.clarity("event", ...)`
- Funcionar como no-op se Clarity não carregou ainda (não quebrar a aplicação)
- Usar `clarity("set", key, value)` para tags customizadas e `clarity("event", name)` para eventos

#### 6. Instrumentar os elementos principais
Adicionar tracking nestes pontos (ajuste de acordo com a estrutura real do projeto — me pergunte se não encontrar):
- Logo no header → `header_logo_click`
- Itens do menu principal → `nav_<item>_click`
- CTAs de "Inscreva-se" / "Quero ser expositor" / "Quero patrocinar" → `cta_<tipo>_click`
- Cards de expositores → `expositor_card_click` com tag do nome do expositor
- Cards de patrocinadores → `patrocinador_card_click` com tag do nome
- Botões de redes sociais → `social_<rede>_click`
- Download de mídia kit/programação (se houver) → `download_<arquivo>`

#### 7. Páginas HTML estáticas
Criar `public/clarity-snippet.html` com o mesmo padrão de consentimento:
- Script inline que checa `localStorage.getItem("campoagro_consent")` antes de carregar Clarity
- Banner em HTML/CSS/JS puro replicando o do Next
- Documentar como incluir nas páginas HTML existentes (`<script src="/clarity-init.js" defer></script>` antes do `</head>`)
- Criar também o `public/clarity-init.js` correspondente

#### 8. Página de política de privacidade
Criar `app/privacidade/page.tsx` com texto base mencionando:
- Quais dados são coletados (comportamento de navegação, cliques, scroll, gravação anonimizada de sessão, IP aproximado, dispositivo, navegador)
- Finalidade (análise de uso e produção de relatórios agregados para patrocinadores)
- Que usamos Microsoft Clarity como operador (link pra política de privacidade da Microsoft)
- Direitos do titular conforme LGPD (acesso, correção, exclusão, revogação de consentimento)
- Como revogar consentimento (botão no rodapé)
- Contato do controlador (deixar placeholder `[EMAIL_DO_FESTIVAL]`)

#### 9. README
Adicionar seção "Analytics e LGPD" explicando:
- Como obter o Project ID do Clarity
- Como funciona o fluxo de consentimento
- Como adicionar novos eventos via `useClarityTrack`
- Como o time da organização acessa os dashboards no clarity.microsoft.com

### Boas práticas que quero respeitadas
- TypeScript estrito, sem `any`
- Componentes em Server Components quando possível; client component só onde precisa de `useState`/`useEffect`
- Acessibilidade no banner: foco visível, ARIA labels, fecha com ESC, tabindex correto
- Mobile-first no banner
- Não bloquear renderização da página com o banner (não usar modal travando)
- Comentários em PT-BR explicando decisões de LGPD

### O que NÃO fazer
- Não disparar Clarity sem consentimento, em nenhuma hipótese
- Não usar cookies próprios além do `localStorage` de consentimento
- Não capturar dados sensíveis em eventos customizados (sem CPF, email, telefone)
- Não criar dashboards/painéis dentro da aplicação — os relatórios são consumidos direto no painel do Clarity

### Entrega
Quero que você primeiro me apresente a estrutura de arquivos que vai criar/modificar e me confirme antes de gerar o código. Depois implemente arquivo por arquivo, explicando decisões importantes. Ao final, gere um checklist do que eu preciso fazer manualmente (criar conta Clarity, configurar env var, testar consentimento, etc.).

---

## Observações pra você (dono do projeto)

- Se o projeto estiver em **Pages Router** em vez de App Router, ajuste no prompt: `app/layout.tsx` → `pages/_app.tsx` + `pages/_document.tsx`, e remova as menções a Server Components.
- Se já existe um sistema de cookies/consentimento no projeto, mencione isso no início do prompt pra evitar duplicação.
- Lembre de criar a conta em [clarity.microsoft.com](https://clarity.microsoft.com) e copiar o Project ID antes de testar.
