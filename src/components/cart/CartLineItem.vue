<script setup lang="ts">
import type { CartItem } from '@/types/cart'

defineProps<{
  item: CartItem
}>()

const emit = defineEmits<{
    (e: 'increase'): void
    (e: 'decrease'): void
}>()
</script>

<template>
    <v-card variant="outlined" class="mb-3 border-gray-lighten-2 rounded-lg">
        <div class="d-flex align-center pa-3">

            <!-- Miniature image  -->
            <v-avatar size="60" rounded="md" class="mr-3 bg-grey-lighten-2">
                <v-img :src="item.item.image" cover alt="item.item.name" />
            </v-avatar>

            <!-- Product details -->
            <div class="flex-grow-1 min-w-0">
                <h4 class="text-subtitle-2 font-weight-bold text-truncate mb-1">
                    {{ item.item.name }}
                </h4>
                <div class="text-caption text-primary font-weight-medium">
                    {{ item.item.price.toFixed(2) }}€ × {{ item.quantity }} 
                </div>
            </div>

            <!-- Quantity controls -->
            <div class="d-flex align-center ml-2">
                <v-btn 
                    icon="mdi-minus"
                    size="x-small"
                    variant="tonal"
                    color="grey-darken-1"
                    @click="emit('decrease')" />

                <span class="mx-3 text-body-2 font-weight-bold">
                    {{ item.quantity }}
                </span>

                <v-btn
                    icon="mdi-plus"
                    size="x-small"
                    variant="tonal"
                    color="primary"
                    @click="emit('increase')" />
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.min-w-0 {
    min-width: 0;
}
</style>