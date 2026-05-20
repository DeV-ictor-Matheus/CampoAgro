# Estrutura do projeto CampoAgro

Mapa rápido do que está **ativo** no repositório (Maio 2026).

## Rotas Next.js

| Rota | Arquivo | Função |
|------|---------|--------|
| `/` | `app/page.tsx` → `HomeLanding.tsx` | Landing completa |
| `/programacao` | `app/programacao/page.tsx` | Redireciona para `/#programacao` |
| `/api/leads/expositor` | `app/api/leads/expositor/route.ts` | Formulário de expositores |

## Seções da home (`HomeLanding.tsx`)

Ordem atual no `<main>`:

1. `HeroSection` — `#home`
2. `CountdownSection` — contagem regressiva
3. `SobreSection` — `#sobre`
4. `NumbersSection` — `#numeros`
5. `AttractionsSection` — `#atracoes`
6. `ShowsSection` — `#shows`
7. `ProgramacaoSection` — `#programacao` (agenda por dia)
8. `TratoracoSection` — `#tratoraco` (carrossel de fotos)
9. `ExpositoresSection` — `#expositores`
10. `AreasSection` — `#areas`
11. `PatrocinadoresSection` — `#patrocinadores`
12. `MapaSection` — `#mapa`
13. `MemoriasSection` — `#memorias` (galeria + modal)
14. `ContactSection` — `#contato`

Fora do `<main>`: `LoadingOverlay`, `WhatsAppFloat`, `Navbar`, `SiteFooter`, `RevealOnScroll`.

**Removido:** `NoticiasSection.tsx` (conteúdo redundante; menu “Notícias” aponta para `#memorias`).

## CSS (cadeia de imports)

```
app/layout.tsx
  └── app/globals.css
        ├── /css/styles.css      (public — base legacy)
        ├── /css/premium.css     (public — tema premium)
        ├── app/etapa4-performance.css
        └── app/campoagro-standard.css
```

Não consolidar num único ficheiro sem plano: são milhares de linhas e overrides com `!important`. Edite o ficheiro da camada certa (ver comentários no topo de `etapa4-performance.css` e `campoagro-standard.css`).

## Imagens (`public/img/`)

| Uso | Ficheiros |
|-----|-----------|
| Hero | `banner15.png` |
| Atrações | `banner2.png`, `campoagro-hero-topo.png`, `tratoraco/tratoraco-03.png` |
| Tratoraço (secção) | `tratoraco/tratoraco-01.png` … `08.png` |
| Shows | `joao-nelore-texano-card.png`, `luan-pereira-card.png` + vídeos em `public/videos/` |
| Memorias | `banner2.png`, fotos João/Luan, `tratoraco-01.png` |
| Marca | `logo-campoagro.png`, `campoagro-patrocinadores.png` |

Validar referências: `npm run check:images`.

## Backend de leads (`lib/leads/`)

| Ficheiro | Papel |
|----------|--------|
| `config.ts` | Env (WhatsApp, e-mail, demo) |
| `validation.ts` | Parse do formulário |
| `persist-lead.ts` | Orquestra persistência |
| `google-sheets.ts` / `google-credentials.ts` | Planilha (produção) |
| `demo-store.ts` | JSON local em `data/` (dev) |
| `email.ts` / `whatsapp.ts` | Notificações |

## Scripts e docs auxiliares

| Comando / pasta | Uso |
|-----------------|-----|
| `scripts/check-images.mjs` | Imagens referenciadas existem em `public/` |
| `scripts/smoke-home.mjs` | Smoke Playwright (nav, shows, galeria) |
| `scripts/lighthouse-summary.mjs` | Resumo do baseline Lighthouse |
| `docs/checklist-migracao-4-etapas.md` | Histórico da migração HTML → Next |
| `docs/lighthouse-baseline.md` | Métricas de performance |
| `FUNCIONALIDADES.md` | Índice funcional (raiz) |
| `IMAGE_GUIDE.md` | Briefing visual (pode estar desatualizado vs TSX) |

## Dependências pouco usadas

- **Tailwind** (`tailwind.config.ts`, `postcss.config.js`): configurado, mas a UI usa classes CSS legacy (`.hero`, `.container`, etc.), não utilitários Tailwind nos TSX.
- **Playwright**: só em `smoke:home` (devDependency).

## Ficheiros que não devem voltar

- `HeroBgImage.tsx` — experimento de crop mobile (nunca commitado).
- `public/index.html` + JS vanilla — removidos na migração.
- `dev-server.err.log` / `dev-server.out.log` — logs locais (no `.gitignore`).
