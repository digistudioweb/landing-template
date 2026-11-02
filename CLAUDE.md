# Landing Template — Digi Studio

Template de landing page para sites de demonstração de clientes freelance (ex: propostas no Workana). O conteúdo atual (ClimaTech, ar-condicionado) é um exemplo — ao reaproveitar para um cliente novo, troque textos, cores e imagens, mantendo a estrutura e as convenções abaixo.

## Stack

- HTML, CSS e JavaScript puros. Sem frameworks, sem Tailwind, sem bibliotecas.
- Sem build step — precisa poder ser publicado direto no GitHub Pages, com caminhos relativos.

## Convenções de código

- Mobile-first: estilize para mobile primeiro, depois adicione breakpoints para desktop.
- HTML semântico e acessível: labels em todo input, alt text em imagens, estados de foco visíveis, bom contraste.
- SEO básico: `<title>`, meta description, Open Graph, hierarquia de headings correta (um `<h1>` só, `<h2>`s em ordem).
- Cores e espaçamentos em variáveis CSS (`:root`), não hardcoded.
- Comentários só onde o "porquê" não é óbvio pelo código.

## Fluxo de trabalho

- Antes de escrever código, mostrar o plano (estrutura de arquivos, paleta, tipografia, ordem de construção) e confirmar.
- Construir uma seção por vez, confirmando antes de passar para a próxima.
- Verificar cada seção no navegador (mobile e desktop) antes de considerar pronta — bugs reais de CSS já apareceram assim (ex: `aspect-ratio` ignorado por faltar `height: auto`).
