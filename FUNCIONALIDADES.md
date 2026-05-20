# CampoAgro 2026 — Funcionalidades (Next.js)

A landing é servida pela **App Router** do Next (`app/page.tsx` → `HomeLanding`).

Mapa completo de pastas e ordem das seções: [`docs/ESTRUTURA-PROJETO.md`](./docs/ESTRUTURA-PROJETO.md).  
Cadeia de CSS: [`app/styles/README.md`](./app/styles/README.md).

## Onde está cada parte

| Área | Caminho principal |
|------|-------------------|
| Orquestração da home | `app/_components/HomeLanding.tsx` |
| Seções da home | `app/_components/home/*.tsx` (14 blocos no `<main>`) |
| CSS global legacy + overrides | `public/css/styles.css`, `public/css/premium.css`, `app/etapa4-performance.css`, `app/campoagro-standard.css` → `app/globals.css` |
| Imagens estáticas | `public/img/` (subpasta `tratoraco/` para fotos da passeata) |
| Metadados / layout | `app/layout.tsx` |
| Alias `/programacao` | `app/programacao/page.tsx` (redireciona para `/#programacao`) |
| Formulário expositores | `ExpositoresSection.tsx` + `POST /api/leads/expositor` |

## Comportamentos (Cliente)

Implementados em React (`"use client"`) nos componentes correspondentes: loading, navegação e menu, contagem regressiva, abas da programação, galeria/modal, partículas do hero e reveal ao scroll — ver Etapa 3 no checklist em `docs/checklist-migracao-4-etapas.md`.

## Verificação local

| Comando | O que valida |
|---------|----------------|
| `npm run smoke:home` | Nav (menu + âncoras), carrosséis em `#shows`, modal da galeria |
| `npm run lighthouse:baseline` | Gera `docs/lighthouse-baseline.md` (requer `npm run dev`) |

## Legado HTML

O site **não** usa mais `index.html` nem JavaScript vanilla em `public/`; desenvolvimento e produção via `npm run dev` / `npm run build`.
