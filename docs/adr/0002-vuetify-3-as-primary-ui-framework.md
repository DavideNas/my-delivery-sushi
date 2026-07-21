# 2. Adozione di Vuetify 3 come UI Component Framework

* **Status**: Accettato
* **Data**: 2026-07-21
* **Decisori**: Lead Frontend Architect
* **Contesto Tecnico**: Vue 3 / TypeScript / Design System

---

## Context e Problema

L'applicazione necessitava di un'interfaccia utente moderna, coerente e completamente responsive (dalla vista mobile del menu al dashboard di amministrazione). Le opzioni principali prevedevano:
1. Sviluppare un Design System personalizzato da zero con Tailwind CSS / Scss.
2. Adottare una UI Library robusta basata su Material Design per accelerare i tempi di sviluppo enterprise.

---

## Decisione

Abbiamo scelto **Vuetify 3** (integrato con `@mdi/font` per l'iconografia).

---

## Rationale (Perché Vuetify 3)

1. **Integrazione Nativa con Vue 3**: Vuetify 3 è stato ricostruito nativamente attorno alla Composition API e a TypeScript, offrendo un'eccellente autocompletamento e type-safety.
2. **Accessibilità e Responsive Grid System**: I componenti di layout (`v-container`, `v-row`, `v-col`) e i form (`v-text-field`, `v-radio-group`) integrano già le best-practice di accessibilità (ARIA) e adattamento mobile.
3. **Coerenza Visiva "Out-of-the-Box"**: Garantisce una *long-term platform coherence* in tutte le viste (client-facing e admin panel) riducendo il debito tecnico visivo.

---

## Conseguenze e Compromessi

### Vantaggi:
* **Time-to-Market estremamente rapido**: Componenti complessi come Stepper, Dialog, Drawer, Snackbars e Data-Tables sono già pronti per l'uso enterprise.
* **Supporto ai Temi**: Possibilità di definire temi custom (es. Dark/Light mode, palette colori brand sushi) centralizzati nella configurazione di Vuetify (`plugins/vuetify.ts`).

### Svantaggi / Compromessi:
* **Overhead per i Test E2E (Playwright)**: I componenti Vuetify generano wrapper HTML complessi attorno agli elementi nativi (es. `<div class="v-field__input">...</div>`). Nei test E2E abbiamo dovuto adottare la convenzione di selezionare esplicitamente gli input interni (es. `page.locator('[data-test="card-number"] input')`).
* **Bundle Size**: Aumenta le dimensioni del bundle finale rispetto a un'architettura Headless UI, mitigato comunque dall'albero di *tree-shaking* automatico di Vite.

---

## Alternative Considerate

* **Tailwind CSS + Headless UI**:
  * *Rifiutato* per via dei costi di sviluppo elevati nel dover ricostruire e testare manualmente componenti complessi quali Data Table e Stepper multi-passaggio.