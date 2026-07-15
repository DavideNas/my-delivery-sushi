# Piano progetto — Ristorante da Asporto (Vue.js expert workshop)

Obiettivo: coprire in pratica ogni concetto Vue rilevante per il colloquio, dentro un solo progetto coerente, con Vuetify come libreria UI. Il piano è scritto su 30 giorni ma è elastico — puoi comprimere più giorni insieme quando vuoi, l'importante è rispettare l'ordine (ogni step si appoggia al precedente).

---

## 0. Architettura complessiva

```
ristorante-asporto/
├── src/
│   ├── main.ts                    → bootstrap: Vue + Pinia + Router + Vuetify
│   ├── App.vue                    → shell, <router-view>
│   ├── plugins/
│   │   └── vuetify.ts              → istanza Vuetify, tema custom
│   ├── router/
│   │   └── index.ts                → route pubbliche/auth/admin, guard RBAC
│   ├── types/
│   │   ├── menu.ts
│   │   ├── order.ts
│   │   └── user.ts
│   ├── data/                       → mock data (sostituibile da API reale)
│   ├── services/                   → chiamate HTTP isolate dai componenti
│   │   ├── menuService.ts
│   │   ├── orderService.ts
│   │   └── authService.ts
│   ├── stores/                     → Pinia
│   │   ├── cart.ts
│   │   ├── auth.ts
│   │   ├── menu.ts
│   │   └── orders.ts
│   ├── composables/                → logica riusabile, framework-agnostic quanto possibile
│   │   ├── useCart.ts
│   │   ├── usePermissions.ts
│   │   ├── useCheckout.ts
│   │   └── useOrderTracking.ts     → SSE/WebSocket mock
│   ├── components/
│   │   ├── menu/
│   │   │   ├── MenuItemCard.vue
│   │   │   ├── MenuList.vue
│   │   │   └── CategoryFilter.vue
│   │   ├── cart/
│   │   │   ├── CartDrawer.vue
│   │   │   └── CartLineItem.vue
│   │   ├── checkout/
│   │   │   ├── CheckoutStepper.vue
│   │   │   ├── StepAddress.vue
│   │   │   ├── StepPayment.vue
│   │   │   └── StepConfirm.vue
│   │   ├── tracking/
│   │   │   └── OrderTrackingWidget.vue   → wrappato in ErrorBoundary
│   │   ├── admin/
│   │   │   ├── AdminMenuTable.vue        → VDataTable
│   │   │   ├── AdminOrdersTable.vue      → VDataTable + virtual scroll
│   │   │   └── AdminUserRoles.vue
│   │   └── shared/
│   │       ├── ErrorBoundary.vue
│   │       ├── PermissionGate.vue
│   │       └── AppNotification.vue
│   └── views/                      → una view per route, compone i components
├── tests/
│   ├── unit/                       → Vitest
│   └── e2e/                        → Playwright o Cypress
└── .storybook/                     → documentazione componenti
```

**Regola di dipendenza**: `components` non chiamano mai `services` direttamente — passano sempre da `composables` o `stores`. Questo è il punto che più spesso viene testato in colloquio ("dove vive la logica di business"): mai nel componente, mai nel service raw, ma nel layer intermedio.

---

## 1. Perché Vuetify (e cosa cambia rispetto a componenti custom)

Vuetify entra a livello di **UI primitives**, non sostituisce l'architettura sopra — la velocizza:

- `VCard`, `VBtn`, `VTextField` al posto dei componenti HTML scritti a mano del giorno 1 (li andremo a *migrare*, non buttare — utile in colloquio per parlare di "adozione incrementale di una libreria UI su un progetto esistente").
- `VDataTable` per le tabelle admin (menu, ordini) — con sorting, paginazione, filtro built-in: evita di scrivere a mano logica che altrimenti richiederebbe giorni.
- `VForm` + regole di validazione dichiarative per il checkout, invece di validazione manuale sparsa nei componenti.
- `VNavigationDrawer` per il carrello laterale.
- Sistema di **temi** (`createVuetify({ theme: {...} })`) — argomento diretto per "define UI standards": un tema centralizzato è l'equivalente Vuetify dei design token.
- **Attenzione architetturale da menzionare in colloquio**: Vuetify è un accoppiamento forte alla libreria — la scelta va giustificata (velocità di delivery, consistenza) sapendo che introduce un vincolo se in futuro serve un redesign radicale. Un vero architect sa nominare questo trade-off esplicitamente, non lo nasconde.

---

## 2. Piano per settimane (4 settimane, ~5-6 step a settimana)

### Settimana 1 — Fondamenta + Vuetify + Area pubblica (Menu)

| Giorno | Deliverable | Concetto allenato |
|---|---|---|
| 1 | ✅ Già fatto: MenuItemCard, MenuList, tipi TS | props tipizzate, emits tipizzati |
| 2 | Installazione e setup Vuetify (`plugins/vuetify.ts`), tema custom, migrazione MenuItemCard → `VCard` + `VBtn` | integrazione libreria UI, design token centralizzati |
| 3 | `CategoryFilter.vue` con `VChipGroup`, filtro reattivo su `MenuList` | stato locale vs derivato, `computed` su filtro |
| 4 | `services/menuService.ts` (mock async che simula latenza di rete) + composable `useMenu()` che lo consuma | separazione service/composable, gestione stato di loading/error |
| 5 | Setup Vitest + primo test su `useMenu()` (mock del service) | testing dei composable isolato dal componente |

### Settimana 2 — Carrello, Checkout, RBAC-lite

| Giorno | Deliverable | Concetto allenato |
|---|---|---|
| 6 | `stores/cart.ts` (Pinia) + `useCart()` che lo wrappa | quando lo stato è davvero globale (persiste tra route) |
| 7 | `CartDrawer.vue` con `VNavigationDrawer`, `CartLineItem.vue` | composizione componenti, props/emits a cascata |
| 8 | `CheckoutStepper.vue` con `provide`/`inject` per il contesto del wizard (indirizzo, pagamento) | **il punto chiave**: perché questo NON va in Pinia — stato scoped al sottoalbero, non sopravvive al cambio pagina |
| 9 | `StepAddress.vue` + `StepPayment.vue` con `VForm` e regole di validazione Vuetify | form validation dichiarativa enterprise |
| 10 | `StepConfirm.vue` + test E2E del flusso checkout completo (Playwright/Cypress) | testing di un flusso multi-step, non solo unit |

### Settimana 3 — Auth, Admin, RBAC reale

| Giorno | Deliverable | Concetto allenato |
|---|---|---|
| 11 | `stores/auth.ts` + `services/authService.ts` (login mock con ruoli: customer/admin) | modellazione di ruoli/permessi lato frontend |
| 12 | `usePermissions()` + `PermissionGate.vue` (già visto in teoria, ora implementato) | RBAC a livello componente, UX-gating |
| 13 | Router guard (`router/index.ts`) su rotte `/admin/*`, redirect se ruolo insufficiente | RBAC a livello di routing — **e discussione esplicita**: questo è solo UX, l'enforcement vero sarebbe lato backend |
| 14 | `AdminMenuTable.vue` con `VDataTable`, CRUD sul menu (mock) | tabelle enterprise, editing inline |
| 15 | `AdminOrdersTable.vue` con `VDataTable` + virtual scroll (dataset ampio simulato) | performance su liste grandi |

### Settimana 4 — Real-time, resilienza, qualità, rifinitura

| Giorno | Deliverable | Concetto allenato |
|---|---|---|
| 16 | `useOrderTracking()` — mock SSE/WebSocket con fallimenti random intermittenti | gestione stream real-time, cleanup su unmount |
| 17 | `OrderTrackingWidget.vue` avvolto in `ErrorBoundary.vue` (`onErrorCaptured`) | isolamento del crash, stabilità della dashboard |
| 18 | `AppNotification.vue` (toast globale via Pinia store) per errori/successi | pattern di notifica centralizzata, non prop-drilling di errori |
| 19 | Code splitting: lazy route (`() => import(...)`) su `/admin`, bundle analysis | performance, `Suspense` con fallback |
| 20 | Storybook: story per `MenuItemCard`, `CartLineItem`, `PermissionGate` | documentazione componenti, contract testing visivo |
| 21-22 | Suite completa Vitest sui composable critici (`useCart`, `usePermissions`, `useCheckout`) | coverage dei punti architetturali, non solo UI |
| 23-24 | Suite E2E: login → menu → carrello → checkout → tracking ordine | test end-to-end del flusso reale |
| 25 | Revisione architetturale: scrivi 2 ADR (Architecture Decision Record) — es. "perché Pinia per cart e non per checkout context", "perché Vuetify" | il vocabolario "long-term platform coherence" della JD, ora con artefatti reali |
| 26-30 | Buffer: rifinitura, eventuale hybrid rendering con Nuxt su pagine menu pubbliche (stretch goal, opzionale), preparazione demo/showcase del progetto per il colloquio | consolidamento, storytelling finale |

---

## 3. Cosa portare al colloquio da questo progetto

- 2 ADR scritti (giorno 25) — è l'evidenza concreta di "ownership e coerenza architetturale a lungo termine".
- Il confronto Pinia vs `provide`/`inject` con codice reale alla mano (non solo a parole) per la domanda su RBAC/stato.
- L'esempio di `ErrorBoundary` + widget instabile come risposta pronta alla domanda su stabilità della UI.
- La migrazione incrementale a Vuetify come esempio di "adozione di nuova tecnologia per ridurre complessità e tempo di delivery" — frase quasi identica a un bullet della JD.

---

*Il piano parte dallo Step 2 di oggi (Vuetify + migrazione MenuItemCard). Procediamo?*
