import { ref, computed } from 'vue'
import type { MenuItem } from '@/types/menu'
import { menuService } from '@/services/menuService'
import type { FilterCategory } from '@/components/menu/CategoryFilter.vue'

export function useMenu() {
  // Stati reattivi interni
  const items = ref<MenuItem[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const selectedCategory = ref<FilterCategory>('all')

  // Azione per recuperare i dati
  const fetchMenu = async () => {
    loading.value = true
    error.value = null
    try {
      items.value = await menuService.getMenuItems()
    } catch (err) {
      error.value = 'Impossibile caricare il menu. Riprova più tardi.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Stato derivato (filtrato)
  const filteredItems = computed(() => {
    if (selectedCategory.value === 'all') {
      return items.value
    }
    return items.value.filter(item => item.category === selectedCategory.value)
  })

  // Esponiamo all'esterno solo ciò che serve ai componenti
  return {
    items,
    loading,
    error,
    selectedCategory,
    filteredItems,
    fetchMenu
  }
}