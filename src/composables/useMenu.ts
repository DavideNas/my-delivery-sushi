import { ref, computed } from 'vue'
import type { MenuItem } from '@/types/menu'
import { menuService } from '@/services/menuService'
import type { FilterCategory } from '@/components/menu/CategoryFilter.vue'

export function useMenu() {
  // Internal reactive states
  const items = ref<MenuItem[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const selectedCategory = ref<FilterCategory>('all')

  // Action for fetching the data
  const fetchMenu = async () => {
    loading.value = true
    error.value = null
    try {
      items.value = await menuService.getMenuItems()
    } catch (err) {
      error.value = 'Impossible to load the menu. Please try again later.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Derivated states (filtered items based on selected category)
  const filteredItems = computed(() => {
    if (selectedCategory.value === 'all') {
      return items.value
    }
    return items.value.filter(item => item.category === selectedCategory.value)
  })

  // Expose only what is needed by the components
  return {
    items,
    loading,
    error,
    selectedCategory,
    filteredItems,
    fetchMenu
  }
}