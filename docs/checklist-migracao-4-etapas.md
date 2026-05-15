# Checklist — migração Next (4 etapas)

Referência de arquivos atuais relevantes:

| Caminho | Papel |
|---------|--------|
| `app/page.tsx` | Home: `HomeLanding` + `next/script` → `/assets/js/main.js` |
| `app/layout.tsx` | Shell (`html`/`body`, metadata, fonts, `globals.css`) |
| `app/globals.css` | `@import` de `/assets/css/styles.css` e `premium.css` |
| `app/_components/HomeLanding.tsx` | Landing inteira por enquanto (fatiar na Etapa 2) |
| `public/index.html` | Opcional hospedagem estática; mantido alinhado; prioridade de edição: TSX |
| `public/assets/css/styles.css` | Estilos base |
| `public/assets/css/premium.css` | Estilos premium (blur, hero, cards) |
| `public/assets/js/main.js` | Orquestra módulos |
| `public/assets/js/modules/loading.js` | Overlay de carregamento |
| `public/assets/js/modules/navigation.js` | Nav / menu |
| `public/assets/js/modules/particles.js` | Partículas do hero |
| `public/assets/js/modules/countdown.js` | Contagem regressiva |
| `public/assets/js/modules/program-tabs.js` | Abas (`data-tab` + delegação em `.prog-tabs`; `window.showTab` mantido) |
| `public/assets/js/modules/reveal.js` | IntersectionObserver + `.reveal` |
| `public/assets/js/modules/memories.js` | Modal da galeria |
| `public/assets/img/` | Imagens (`banner15.png`, `banner2.png`, …) |
| `next.config.mjs` | `images.remotePatterns` (hoje focado em URLs remotas) |
| `tailwind.config.ts` / `postcss.config.js` | Tailwind (pouco usado nas rotas `app/` hoje) |
| `package.json` | Scripts `dev`, `build`, `lint`, `check:images` (este último aponta para `scripts/check-images.mjs` — criar o script se ainda não existir no repo) |

Use os checkboxes abaixo conforme for concluindo cada item.

---

## Etapa 1 — Documento único (sem iframe)

**Meta:** `/` renderiza uma árvore React/Next só, sem `iframe`/`srcDoc`.

**Estratégia aplicada:** (A) markup espelhado em TSX desde já (`HomeLanding.tsx`).

- [x] Definir estratégia: (A) markup espelhado em TSX desde já, ou (B) redirect para `index.html` estático **somente** se for política temporária documentada aqui ou no README.
- [x] Alterar `app/page.tsx`: remover `readFileSync` + `iframe` (ou equivalente definido na estratégia).
- [x] Garantir que `lang="pt-BR"` e equivalência SEO: conferir `app/layout.tsx` (`metadata`) vs `<title>` / meta em `public/index.html`.
- [x] Incluir estilos da home no fluxo Next: importar ou `@import` de `styles.css` e `premium.css` (ex.: `app/globals.css` que importa os dois — criar se necessário — e import em `app/layout.tsx`).
- [x] Ajustar caminhos de assets: de `href="assets/..."` (relativo ao HTML) para `/assets/...` (absoluto a partir de `public/`) onde o JSX exigir.
- [x] JS vanilla sem `onclick` no React: delegação nas abas (`data-tab`) e listener em `#hamburger` (`navigation.js`).
- [x] Rodar `npm run dev` e `npm run build` sem erros.

**Critério de pronto:** abrir `/` no DevTools → um único documento; não há `#document` aninhado de iframe para a página principal.

**Status:** concluída (landing em `HomeLanding.tsx`; `public/index.html` alinhado para deploy estático).

---

## Etapa 2 — Componentização por seções

**Meta:** `app/page.tsx` só compõe seções; cada bloco tem um arquivo próprio.

- [ ] Criar pasta (sugestão) `components/home/` ou `app/_components/home/`. *(parcial: existe `app/_components/` com `HomeLanding.tsx` monolítico — fatiar nos itens abaixo)*
- [ ] Extrair seções para componentes nomeados (exemplos alinhados ao `index.html`):
  - [ ] Loading overlay (`#loading`)
  - [ ] WhatsApp flutuante
  - [ ] Navbar (`#navbar`)
  - [ ] Hero (`#home`)
  - [ ] Countdown (`#cd-*`)
  - [ ] Sobre / editorial (`#sobre`)
  - [ ] Números (`#numeros`)
  - [ ] Programação (`#programacao`)
  - [ ] Áreas (`#areas`)
  - [ ] Galeria (`#memorias`)
  - [ ] Tratoraço (`#tratoraco`)
  - [ ] Patrocinadores (`#patrocinadores`)
  - [ ] Expositores (`#expositores` + formulário)
  - [ ] Mapa (`#mapa`)
  - [ ] Notícias (`#noticias`)
  - [ ] Footer
  - [ ] Modal de mídia (`.media-modal`)
- [ ] Para cada seção migrada: parar de editar o mesmo bloco em `public/index.html` (ou remover o trecho migrado quando a etapa 3 estiver pronta).
- [ ] Manter anchors `id=""` estáveis para links internos (`#programacao`, etc.).
- [ ] Smoke test: scroll + cliques nos links do rodapé e da nav.

**Critério de pronto:** `app/page.tsx` curto (~só imports + ordenação das seções); visual equivalente ao anterior.

---

## Etapa 3 — Interatividade em React (`"use client"`)

**Meta:** comportamentos hoje em `public/assets/js/modules/*.js` vivem em Client Components onde precisarem de estado/DOM.

- [ ] Loading: substituir lógica de `loading.js` (ex.: estado + timeout ou classe no `layout`).
- [ ] Navegação / hamburger: portar `navigation.js` (+ remover `onclick="toggleMenu()"` inline no JSX).
- [ ] Programação: portar `program-tabs.js` (+ remover `onclick="showTab(...)"` nos botões).
- [ ] Countdown: portar `countdown.js` com cleanup do intervalo no unmount.
- [ ] Reveal on scroll: portar ou substituir `reveal.js` (observer em `useEffect` ou biblioteca já alinhada ao projeto).
- [ ] Galeria / modal: portar `memories.js`.
- [ ] Partículas: portar `particles.js` (montagem só no cliente).
- [ ] Opcional mas recomendado: respeitar `prefers-reduced-motion` antes de inicializar animações/partículas.
- [ ] Remover `<script type="module" src="assets/js/main.js">` da fonte React (equivalentes já cobertos por componentes cliente).
- [ ] Se `public/index.html` não for mais a home servida pelo Next: documentar papel restante (ex.: apenas backup) ou remover após migração completa.

**Critério de pronto:** interações funcionam só com bundles Next; não dependência da home em `main.js`.

---

## Etapa 4 — Performance e produção

**Meta:** aliviar GPU/rede; alinhar com Next.

- [ ] Imagens grandes: `banner15.png`, `banner2.png`, `luan-pereira-tvz-2024.png` → formatos mais leves (WebP/AVIF) + `next/image` com `sizes` adequados onde fizer sentido.
- [ ] Revisar `public/assets/img/` (e, quando `scripts/check-images.mjs` existir, rodar `npm run check:images`) e corrigir referências quebradas.
- [ ] `next.config.mjs`: revisar `images` (patterns locais vs remotos conforme adoção de `next/image`).
- [ ] Reduzir uso de `backdrop-filter` onde for aceitável trocar por fundo sólido sem perda visual forte.
- [ ] CSS: agrupar animações infinitas; desligar ou suavizar com `prefers-reduced-motion` (hero drift, sponsors, particles, WhatsApp, etc.).
- [ ] Lighthouse / Performance: registrar baseline e meta (LCP, TBT apenas como referência; foco também em comportamento ao rolar GPU).
- [ ] README ou nota neste doc: como rodar `dev`/`build` e onde fica cada seção após a migração.

**Critério de pronto:** peso de imagens aceitável; menos jank perceptível ao rolar/abrir localhost; documentação mínima atualizada.

---

## Ordem rápida (dependência)

Etapa **1 → 2 → 3 → 4** (não pule a 1 antes de aumentar JSX na home).

Etapa 4 pode começar **parcialmente** antes (ex.: otimização de PNGs), desde que não conflite com URLs ainda fixas em HTML antigo — ideal concentrar merge de imagens quando `next/image` ou paths estáveis já estiverem definidos na etapa 2–3.

---

*Gerado para o repositório `CAMPOAGRO` com base na estrutura atual.*
