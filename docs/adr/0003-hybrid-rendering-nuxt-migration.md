# 3. Valutazione Evolutiva: Hybrid Rendering (Nuxt 3) per le Pagine Pubbliche del Menu

* **Status**: Proposto / In Valutazione Architetturale
* **Data**: 2026-07-21
* **Decisori**: Lead Frontend Architect

---

## Context e Problema

L'attuale piattaforma è una Single Page Application (SPA) Client-Side Rendered (CSR). Sebbene ottima per le sezioni interattive (Checkout, Dashboard Admin, Tracking Ordini), le pagine pubbliche del Menu soffrono dei limiti tipici della SPA:
1. Indicizzazione SEO non ottimale per i motori di ricerca.
2. Initial Load Time (First Contentful Paint - FCP) penalizzato nei dispositivi mobile su reti 3G/4G.

---

## Soluzione Architetturale Proposta (Nuxt 3 Hybrid Rendering)

Si propone un'architettura **Hybrid Rendering**:

1. **Pagine Pubbliche (`/`, `/menu`, `/menu/:id`)**:
   * **SSG (Static Site Generation)** o **ISR (Incremental Static Regeneration)**.
   * Il catalogo sushi viene prerenderizzato durante il build time o rigenerato in background on-demand.
2. **Pagine Riservate/Interattive (`/checkout`, `/admin`, `/tracking`)**:
   * **CSR (Client-Side Rendering)** mantenuto.
   * Renderizzato unicamente sul client previa validazione dei token JWT/RBAC.

---

## Tabella Comparativa di Transizione

| Parametro | Attuale (Vue 3 SPA) | Proposta (Nuxt 3 Hybrid) |
| :--- | :--- | :--- |
| **FCP / LCP** | ~1.8s (download bundle JS) | < 0.4s (HTML statico pronti) |
| **SEO** | Requisito limitato | SEO nativo, Open Graph e Meta tag dinamici |
| **Complessità Build** | Bassa (Vite) | Media (Nitro Engine + SSR Server Node/Edge) |

---

## Impatto sul Progetto Esistente (Brownfield Migration Path)

* **Compatibilità Pinia/Vuetify**: I moduli `@pinia/nuxt` e `vuetify-nuxt-module` permettono di riutilizzare il 100% degli store e dei componenti esistenti.
* **Strategy**: Estrazione delle rotte pubbliche in un layer Nuxt senza interrompere il funzionamento dell'Admin Panel.