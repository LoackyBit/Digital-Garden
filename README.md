# Digital Garden Personale con Astro

Digital Garden personale costruito su Astro + AstroPaper, pensato per apprendimento evolutivo e note connesse nel tempo.

## Filosofia

Questo progetto unisce tre idee:

- Digital Garden evolutivo: le note maturano per stage (`raw 🗂️`, `learning 🧩`, `fine-tuned 🧠`).
- TIL (Today I Learned): appunti brevi e pratici, sempre in stage iniziale.
- Knowledge graph: collegamenti tra note con wikilink `[[...]]`, backlink e visualizzazione grafo.

L'obiettivo non e pubblicare solo contenuti "perfetti", ma rendere visibile il processo di studio.

## Stack

- Framework: Astro (base AstroPaper)
- Styling: Tailwind CSS
- Contenuti: Markdown + MDX con Astro Content Collections
- Backlink/Wikilink: braindb
- Graph view: D3.js in componente Astro
- Deploy: GitHub Pages
- Lingua contenuti: italiano

## Requisiti

- Node.js 20+
- pnpm (consigliato) oppure npm

## Installazione

```bash
pnpm install
```

Oppure:

```bash
npm install
```

## Comandi Principali

```bash
# sviluppo locale
pnpm run dev

# build produzione
pnpm run build

# preview build
pnpm run preview

# crea un nuovo TIL da CLI
pnpm run new-til -- "Titolo del mio TIL"
```

Alternativa con npm:

```bash
npm run dev
npm run build
npm run preview
npm run new-til -- "Titolo del mio TIL"
```

## Struttura Progetto

```text
src/
  content/
    notes/               # note lunghe, evergreen, mappe concettuali
    til/                 # note brevi Today I Learned
    _inbox/              # bozze grezze (non pubblicate)
    config.ts            # schema collection (Zod)
  components/
    GraphView.astro      # grafo D3 interattivo backlink
    StageTag.astro       # badge stage vicino ai titoli
    TilList.astro        # lista TIL raggruppata per categoria
  pages/
    garden.astro         # indice note per stage
    graph.astro          # pagina del grafo
    notes/[...slug].astro
    til/index.astro      # indice TIL per categoria
    til/[...slug].astro
templates/
  note.md                # template nota lunga
  til.md                 # template TIL
scripts/
  new-til.ts             # CLI generazione TIL
docs/
  ai-daily-prompt.md     # prompt IA riutilizzabile
public/
  graph/backlinks.json   # esempio dataset grafo
```

## Stage Di Maturazione

Ogni nota in frontmatter usa:

- `raw 🗂️`: idea grezza, appunti iniziali
- `learning 🧩`: concetto in consolidamento
- `fine-tuned 🧠`: nota matura e ben rifinita

Lo stage viene mostrato in pagina tramite il componente `StageTag.astro`.

## Content Collections

Schema unificato per `notes` e `til`:

- `title`: string obbligatoria
- `date`: data obbligatoria (`YYYY-MM-DD`)
- `tags`: string[] (default `[]`)
- `stage`: enum stage (default `raw 🗂️`)
- `source`: URL[] opzionale
- `summary`: string opzionale (max 160)
- `draft`: boolean (default `false`)

I file in `src/content/_inbox` restano fuori dalle collection pubbliche.

## Convenzioni Editoriali

### Naming file

- Note: `slug-descrittivo.md` (es. `backlinks-e-wikilink.md`)
- TIL: `YYYY-MM-DD-slug.md` (es. `2026-03-01-til-astro-content-collections.md`)

### Uso tag

- Mantieni tag piccoli e consistenti (es. `astro`, `typescript`, `tailwind`, `knowledge-management`)
- Nei TIL inserisci sempre `til` come primo o secondo tag
- Usa un tag principale per categoria (quello usato per il grouping in `til/index`)

### Aggiornamento stage

- Parti quasi sempre da `raw 🗂️`
- Passa a `learning 🧩` quando hai verificato il concetto con esempi
- Passa a `fine-tuned 🧠` quando la nota e stabile, riusabile e ben collegata

## TIL Workflow

1. Crea un TIL da CLI:

```bash
pnpm run new-til -- "Titolo"
```

2. Apri il file generato in `src/content/til/`.
3. Compila sezioni obbligatorie: "Cosa ho imparato", "Esempio pratico", "Pitfall / Errori comuni".
4. Mantieni lunghezza indicativa 150-300 parole.

## Daily Ingest Con IA

File guida: `docs/ai-daily-prompt.md`

Flusso consigliato:

1. Durante la giornata raccogli link/snippet/appunti in `_inbox`.
2. Incolla prompt + materiale in Claude/ChatGPT/Copilot.
3. Ottieni in output solo Markdown finale con frontmatter valido.
4. Salva come nota in `src/content/notes/` oppure `src/content/til/`.
5. Aggiungi wikilink `[[...]]` verso note esistenti.
6. Aggiorna stage in base alla maturita della nota.

## Graph View

- Componente: `src/components/GraphView.astro`
- Pagina: `/graph`
- Dataset iniziale: `public/graph/backlinks.json`

Il dataset puo essere generato in futuro da braindb e serializzato in JSON (`nodes` + `links`).

## Deploy Su GitHub Pages

Configurazione minima consigliata:

1. In `astro.config.ts`, imposta correttamente `SITE.website` in `src/config.ts`.
2. Crea GitHub Action di build e deploy della cartella `dist` su Pages.
3. Esegui build con:

```bash
pnpm run build
```

4. Pubblica l'output statico `dist/`.

## Note Finali

Questo setup privilegia semplicita e mantenibilita: poche convenzioni chiare, componenti piccoli, schema unico e flusso editoriale ripetibile.
