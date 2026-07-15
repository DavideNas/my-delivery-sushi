<script setup lang="ts">
// Importiamo il nostro componente lista menu che abbiamo creato nel Giorno 1
import MenuList from './components/menu/MenuList.vue'
</script>

<template>
  <!-- v-app è il componente contenitore fondamentale richiesto da Vuetify -->
  <v-app>
    <!-- Una barra superiore (Navbar) carina per il nostro brand -->
    <!-- Barra superiore allineata -->
    <v-app-bar color="primary" elevation="1" flat>
      <v-container class="d-flex align-center py-0">
        <v-app-bar-title class="font-weight-bold d-flex align-center">
          <span class="mr-2">🍣</span> My Delivery Sushi
        </v-app-bar-title>
      </v-container>
    </v-app-bar>

    <!-- Il contenitore principale dove vive il contenuto -->
    <v-main class="bg-background">
      <v-container>
        <!-- Mostriamo la lista del nostro menu -->
        <MenuList />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
/* Reset di base o stili globali se necessari */
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
</style>