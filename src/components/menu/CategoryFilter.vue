<script setup lang="ts">
export type FilterCategory = 'all' | 'nigiri' | 'uramaki' | 'temaki' | 'bevande'

const props = defineProps<{
  modelValue: FilterCategory
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: FilterCategory): void
}>()

const categories = [
  { value: 'all', label: 'Tutti', icon: 'mdi-all-inclusive' },
  { value: 'nigiri', label: 'Nigiri', icon: 'mdi-rice' },
  { value: 'uramaki', label: 'Uramaki', icon: 'mdi-circle-double' },
  { value: 'temaki', label: 'Temaki', icon: 'mdi-food-croissant' },
  { value: 'poke', label: 'Poke', icon: 'mdi-fish' },
  { value: 'bevande', label: 'Bevande', icon: 'mdi-cup-water' }
] as const
</script>

<template>
  <v-sheet class="py-2 bg-transparent w-100">
    <!-- We use selected-class="selected-chip" to manage custom colors -->
    <v-chip-group
      :model-value="props.modelValue"
      @update:model-value="emit('update:modelValue', $event as FilterCategory)"
      selected-class="selected-chip"
      mandatory
    >
      <v-chip
        v-for="cat in categories"
        :key="cat.value"
        :value="cat.value"
        variant="flat"
        class="font-weight-bold px-4 filter-chip"
        :prepend-icon="cat.icon"
      >
        {{ cat.label }}
      </v-chip>
    </v-chip-group>
  </v-sheet>
</template>

<style scoped>
/* Basic style fot the chip (light grey when not selected) */
.filter-chip {
  background-color: #e0e0e0 !important;
  color: #333333 !important;
  transition: all 0.2s ease;
}

/* Forced style when the chip is selected (primary background, white clean text) */
.selected-chip {
  background-color: #FF5722 !important; /* Primary color orange */
  color: #FFFFFF !important;            /* Force the text to be white */
}

/* Ensure that even the internal icon becomes white when selected */
.selected-chip :deep(.v-icon) {
  color: #FFFFFF !important;
}
</style>