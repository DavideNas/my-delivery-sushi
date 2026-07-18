<script setup lang="ts">
import { ref } from 'vue'
import AdminMenuTable from '@/components/admin/AdminMenuTable.vue'
import AdminOrdersTable from '@/components/admin/AdminOrdersTable.vue'

// Init the active tab to point to the default menu 
const activeTab = ref('menu')
</script>

<template>
  <v-container class="py-8">
    <!-- Global Dashboard Header -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between flex-wrap gap-4">

          <div class="d-flex align-center">
            <v-icon color="primary" size="36" class="mr-3">mdi-shield-check-outline</v-icon>
            <div>
              <h1 class="text-h4 font-weight-black">Control Console</h1>
              <p class="text-body-2 text-medium-emphasis">Welcome to the My Delivery Sushi control panel</p>
            </div>
          </div>

          <!-- Internal Navigation Selector for the Dashboard -->
          <v-btn-toggle v-model="activeTab" mandatory color="primary" variant="outlined" density="comfortable">
            <v-btn value="menu">
              <v-icon start icon="mdi-silverware-fork-knife" class="mr-2"></v-icon>
              Menu Management
            </v-btn>
            <v-btn value="orders">
              <v-icon start icon="mdi-clipboard-list-outline" class="mr-2"></v-icon>
              Orders Management
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
    </v-row>

    <!-- Conditional Rendering based on the Selected Tab -->
    <v-row>
      <v-col cols="12">
        <v-window v-model="activeTab">
          <v-window-item value="menu">
            <AdminMenuTable />
          </v-window-item>
          
          <v-window-item value="orders">
            <AdminOrdersTable />
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.gap-4 { gap: 1rem; }
</style>