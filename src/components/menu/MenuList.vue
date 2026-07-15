<script setup lang="ts">
import { onMounted } from 'vue'
import { useMenu } from '@/composables/useMenu'
import MenuItemCard from './MenuItemCard.vue'
import CategoryFilter from './CategoryFilter.vue'
import type { MenuItem } from '@/types/menu'

// Estraiamo tutto il necessario dal nostro composable
const { 
  loading, 
  error, 
  selectedCategory, 
  filteredItems, 
  fetchMenu 
} = useMenu()

// Carichiamo i dati all'avvio del componente
onMounted(() => {
  fetchMenu()
})

const handleAddToCart = (item: MenuItem) => {
  alert(`Aggiunto al carrello: ${item.name}!`)
}
</script>

<template>
  <v-container class="menu-container py-6">
    
    <!-- Intestazione -->
    <div class="mb-6">
      <h2 class="text-h4 font-weight-bold text-grey-darken-3 mb-2 d-flex align-center">
        Il Nostro Menu <span class="ml-2 text-h5">🥢</span>
      </h2>
      <CategoryFilter v-model="selectedCategory" />
    </div>
    
    <!-- Area Principale -->
    <div class="menu-grid-wrapper">
      
      <!-- Gestione Errore -->
      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
        closable
        class="mb-6"
      >
        {{ error }}
      </v-alert>

      <v-row>
        <!-- Stato Caricamento: Skeleton Loaders -->
        <!-- Mostriamo 3 scheletri di card identici alla struttura reale mentre carica -->
        <template v-if="loading">
          <v-col
            v-for="n in 3" 
            :key="n" 
            cols="12" 
            sm="6" 
            md="4"
            class="pb-4"
          >
            <!-- Lo skeleton riproduce la forma esatta dell'immagine + titolo + dettagli + bottone -->
            <v-skeleton-loader
              type="image, article, actions"
              elevation="1"
              rounded="lg"
              height="100%"
            ></v-skeleton-loader>
          </v-col>
        </template>

        <!-- Stato Vuoto (A caricamento completato) -->
        <v-col v-else-if="filteredItems.length === 0" cols="12" class="text-center py-12">
          <v-icon size="64" color="grey-lighten-1">mdi-emoticon-sad-outline</v-icon>
          <p class="text-h6 text-grey-darken-1 mt-4">Nessun piatto disponibile al momento.</p>
        </v-col>

        <!-- Lista dei piatti reali -->
        <v-col 
          v-else
          v-for="sushi in filteredItems" 
          :key="sushi.id" 
          cols="12" 
          sm="6" 
          md="4"
          class="pb-4"
        >
          <MenuItemCard 
            :item="sushi"
            @add-to-cart="handleAddToCart"
          />
        </v-col>
      </v-row>

    </div>
  </v-container>
</template>

<style scoped>
.menu-container {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

.menu-grid-wrapper {
  min-height: 600px;
}
</style>