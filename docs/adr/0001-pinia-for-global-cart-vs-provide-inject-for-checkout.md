# 1. Scelta Architetturale di Gestione dello Stato: Pinia per il Carrello vs Provide/Inject per il Checkout

* **Status**: Accettato
* **Data**: 2026-07-21
* **Decisori**: Team di Sviluppo Frontend
* **Contesto Tecnico**: Vue 3 / Pinia / Vue Router

---

## Context e Problema

Nella nostra applicazione e-commerce, avevamo la necessità di gestire due tipi distinti di stato applicativo:
1. **Lo stato globale del Carrello**: accessibile da molteplici punti dell'applicazione (Header Badge, Drawer laterale, Pulsanti "Aggiungi al carrello" nella griglia prodotti, Modale di riepilogo).
2. **Lo stato del Flusso di Checkout Multi-Step**: un processo sequenziale in 3 step (Indirizzo, Pagamento, Conferma) in cui i dati devono persistere tra i passaggi, ma **devono essere totalmente distrutti** una volta completato o abbandonato il checkout.

Ci si chiedeva se accentrare tutto in un unico grande store Pinia (`useCheckoutStore`) o separare le responsabilità.

---

## Decisione

Abbiamo deciso di adottare un **approccio ibrido basato sulla lifecycle del dato**:

1. **Pinia (`useCartStore`)**: Utilizzato per lo **Stato Globale a Lungo Termine**.
   * Gestisce l'elenco degli articoli selezionati, il conteggio totale e il prezzo complessivo.
   * Persiste per l'intera sessione dell'utente.

2. **Vue `Provide / Inject` (React Context equivalente in Vue)**: Utilizzato per il **Context Transitorio del Checkout**.
   * Lo stato del form multi-step viene erogato dal componente padre (`CheckoutStepper.vue`) ai sotto-componenti dei singoli step (`StepAddress.vue`, `StepPayment.vue`, `StepSummary.vue`).

---

## Conseguenze e Compromessi

### Vantaggi:
* **Principio di Singola Responsabilità (SRP)**: Pinia si occupa unicamente della business logic dell'inventario/carrello locale. Il wizard di checkout si occupa solo dell'input e validazione dei dati di spedizione/pagamento.
* **Garanzia di Cleanup del Memoria (Zero State Pollution)**: Quando il componente modale `CheckoutStepper` viene smontato (`unmounted`), l'intero stato del form di checkout viene automaticamente garbage-collected da Vue. Non occorre implementare manualmente azioni di "reset form" in Pinia per evitare che un utente ritrovi i dati di carta di credito di una sessione precedente.
* **Testabilità e Modularià**: Possiamo testare unitariamente gli step del checkout fornendo un mock del provider via `provide` nei test Vitest senza dover istanziare uno store Pinia globale.

### Svantaggi / Compromessi:
* **Accoppiamento di Albero Componenti**: `Provide/Inject` funziona solo se gli step sono figli diretti o indiretti di `CheckoutStepper.vue`. Se in futuro dovessimo trasformare il checkout da modale/stepper in pagine dinamiche gestite da `vue-router` (es. `/checkout/step-1`, `/checkout/step-2`), dovremo migrare questo contesto verso uno store Pinia dedicato (`useCheckoutStore`).

---

## Alternative Considerate

* **Tutto in Pinia (`useCheckoutStore`)**:
  * *Rifiutato* perché avrebbe reso lo store globale saturo di stati temporanei e soggetti a form validation, aumentando il rischio di bug di stato residuo tra acquisti consecutivi.