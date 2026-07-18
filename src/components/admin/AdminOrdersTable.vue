<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import type { OrderStatus } from '@/types/order'

const ordersStore = useOrdersStore()

// UI search and filtering controls
const search = ref('')
const statusFilter = ref<OrderStatus | 'all'>('all')

// Define the columns for the orders table
const headers = [
  { title: 'ID Order', key: 'id', sortable: true, width: '120px' },
  { title: 'Customer', key: 'customerName', sortable: true },
  { title: 'Dish Detail', key: 'items', sortable: false },
  { title: 'Total', key: 'totalAmount', sortable: true, width: '110px' },
  { title: 'State', key: 'status', sortable: true, width: '160px' },
  { title: 'Date and Time', key: 'createdAt', sortable: true, width: '180px' },
]

// List of states for our filter and for the select in the table
const statuses = [
  { title: 'All orders', value: 'all' },
  { title: 'Pending', value: 'pending' },
  { title: 'Preparing', value: 'preparing' },
  { title: 'Delivered', value: 'delivered' },
  { title: 'Cancelled', value: 'cancelled' },
]

const selectStatusOptions = statuses.filter(s => s.value !== 'all')

// Chip color based on status
const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'pending': return 'warning'
    case 'preparing': return 'info'
    case 'delivered': return 'success'
    case 'cancelled': return 'error'
    default: return 'grey'
  }
}

// Italian date formatting
const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Computed calculation that filters the bulk list before passing it to Virtual Scroll
const filteredOrders = computed(() => {
  return ordersStore.orders.filter(order => {
    const matchesStatus = statusFilter.value === 'all' || order.status === statusFilter.value
    const matchesSearch = order.customerName.toLowerCase().includes(search.value.toLowerCase()) || 
                          order.id.toLowerCase().includes(search.value.toLowerCase())
    return matchesStatus && matchesSearch
  })
})
</script>

<template>
  <v-card class="pa-4 elevation-1 rounded-lg">
    <!-- Header of Order Panel -->
    <v-card-title class="d-flex flex-wrap justify-space-between align-center gap-4 px-2 py-3">
      <div>
        <h2 class="text-h5 font-weight-bold">Live Orders Operations</h2>
        <p class="text-caption text-medium-emphasis">
          Managing {{ filteredOrders.length }} items out of {{ ordersStore.orders.length }} generated historical records
        </p>
      </div>

      <!-- Enterprise Filter Bar -->
      <div class="d-flex align-center gap-3 style-controls flex-wrap">
        <v-select
          v-model="statusFilter"
          :items="statuses"
          label="Filter by State"
          variant="outlined"
          density="compact"
          hide-details
          style="max-width: 200px; min-width: 160px;"
        ></v-select>

        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search customer or ID..."
          variant="outlined"
          density="compact"
          hide-details
          style="max-width: 260px; min-width: 200px;"
        ></v-text-field>
      </div>
    </v-card-title>

    <v-divider class="mb-4"></v-divider>

    <!-- ⚡ HIGH PERFORMANCE VIRTUAL DATA TABLE ⚡ -->
    <v-data-table-virtual
      :headers="headers"
      :items="filteredOrders"
      hover
      class="border rounded-lg border-opacity-25"
      density="comfortable"
      height="600"
      fixed-header
    >
      <!-- ID Order Slot -->
      <template #[`item.id`]="{ item }">
        <span class="font-weight-bold text-primary">{{ item.id }}</span>
      </template>

      <!-- Slot Details Compacted Dishes -->
      <template #[`item.items`]="{ item }">
        <div class="py-2">
          <div v-for="(dish, idx) in item.items" :key="idx" class="text-body-2">
            <v-icon size="12" class="mr-1 text-medium-emphasis">mdi-circle-small</v-icon>
            <strong>{{ dish.quantity }}x</strong> {{ dish.name }}
          </div>
          <div v-if="item.notes" class="text-caption text-error font-italic mt-1">
            <v-icon size="14" class="mr-1">mdi-comment-alert-outline</v-icon>{{ item.notes }}
          </div>
        </div>
      </template>

      <!-- Total Formatted Slot -->
      <template #[`item.totalAmount`]="{ item }">
        <span class="font-weight-medium">€ {{ item.totalAmount.toFixed(2) }}</span>
      </template>

      <!-- Slot Status with Real-time Selection -->
      <template #[`item.status`]="{ item }">
        <v-select
            v-model="item.status"
            :items="selectStatusOptions"
            density="compact"
            variant="plain"
            hide-details
            @update:model-value="(val) => ordersStore.updateOrderStatus(item.id, val as OrderStatus)"
            :class="['status-select', `text-${getStatusColor(item.status)}`, 'font-weight-bold']"
            style="max-width: 155px"
        ></v-select>
      </template>

      <!-- Date and Time Slot -->
      <template #[`item.createdAt`]="{ item }">
        <span class="text-body-2 text-medium-emphasis">{{ formatDate(item.createdAt) }}</span>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>

<style scoped>
.gap-4 { gap: 1rem; }
.gap-3 { gap: 0.75rem; }
.style-controls {
  flex-grow: 1;
  justify-content: flex-end;
}
:deep(.status-select .v-field__input) {
  font-weight: 700 !important;
  cursor: pointer;
}
</style>