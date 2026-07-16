<script setup lang="ts">
import { onMounted } from 'vue'
import { useMenu } from '@/composables/useMenu'
import { useCart } from '@/composables/useCart'
import MenuItemCard from './MenuItemCard.vue'
import CategoryFilter from './CategoryFilter.vue'
import type { MenuItem } from '@/types/menu'

// Extract all the necessary reactive properties and methods from the composables
const { 
  loading, 
  error, 
  selectedCategory, 
  filteredItems, 
  fetchMenu 
} = useMenu()

// Initialize the composable for the cart to handle adding items
const { addToCart } = useCart()

// Load the menu items when the component is mounted
onMounted(() => {
  fetchMenu()
})

// This function will be called when a user clicks the "Add to Cart" button on a menu item card
const handleAddToCart = (item: MenuItem) => {
  addToCart(item)
}

</script>

<template>
  <v-container class="menu-container py-6">
    
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-h4 font-weight-bold text-grey-darken-3 mb-2 d-flex align-center">
        Il Nostro Menu <span class="ml-2 text-h5">🥢</span>
      </h2>
      <CategoryFilter v-model="selectedCategory" />
    </div>
    
    <!-- Main Area -->
    <div class="menu-grid-wrapper">
      
      <!-- Error Management -->
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
        <!-- Loading State: Skeleton Loaders -->
        <!-- Show 3 skeleton cards identical to the real structure while loading -->
        <template v-if="loading">
          <v-col
            v-for="n in 3" 
            :key="n" 
            cols="12" 
            sm="6" 
            md="4"
            class="pb-4"
          >
            <!-- The skeleton reproduces the exact shape of the image + title + details + button -->
            <v-skeleton-loader
              type="image, article, actions"
              elevation="1"
              rounded="lg"
              height="100%"
            ></v-skeleton-loader>
          </v-col>
        </template>

        <!-- Void State (Once loading is complete) -->
        <v-col v-else-if="filteredItems.length === 0" cols="12" class="text-center py-12">
          <v-icon size="64" color="grey-lighten-1">mdi-emoticon-sad-outline</v-icon>
          <p class="text-h6 text-grey-darken-1 mt-4">Nessun piatto disponibile al momento.</p>
        </v-col>

        <!-- Real Plates list -->
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