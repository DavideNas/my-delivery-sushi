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
  { value: 'bevande', label: 'Bevande', icon: 'mdi-cup-water' }
] as const
</script>

<template>
  <v-sheet class="py-2 bg-transparent w-100">
    <!-- Usiamo selected-class="selected-chip" per gestire i colori personalizzati -->
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
/* Stile base del chip (grigio chiaro quando non selezionato) */
.filter-chip {
  background-color: #e0e0e0 !important;
  color: #333333 !important;
  transition: all 0.2s ease;
}

/* Stile forzato quando il chip viene selezionato (sfondo primario, testo bianco pulito) */
.selected-chip {
  background-color: #FF5722 !important; /* Colore primario arancione */
  color: #FFFFFF !important;            /* Forza il testo a essere bianco */
}

/* Assicura che anche l'icona interna diventi bianca quando selezionata */
.selected-chip :deep(.v-icon) {
  color: #FFFFFF !important;
}
</style>