# Estilos da aplicação

Os estilos **não** vivem nesta pasta. O ponto de entrada é `app/globals.css`:

1. **`public/css/styles.css`** — layout base, componentes antigos, media queries amplas.
2. **`public/css/premium.css`** — tema “premium” (hero, cards, tratoraço, etc.).
3. **`app/etapa4-performance.css`** — performance, `prefers-reduced-motion`, ajustes do hero.
4. **`app/campoagro-standard.css`** — overrides finais da identidade CampoAgro (`!important`).

Ordem importa: o último na cadeia ganha em conflitos de especificidade semelhante.

Para alterar uma secção, procure primeiro a classe no TSX (ex. `className="programacao"`) e depois grep nos quatro ficheiros acima.
