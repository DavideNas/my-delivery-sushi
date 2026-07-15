import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useMenu } from '../useMenu'
import { menuService } from '@/services/menuService'
import type { MenuItem } from '@/types/menu'

// 1. Creiamo dei dati finti (Mock Data) per il test
const fakeMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Sushi Test 1',
    description: 'Descrizione 1',
    price: 5.0,
    image: 'test1.jpg',
    category: 'nigiri',
    available: true
  },
  {
    id: '2',
    name: 'Sushi Test 2',
    description: 'Descrizione 2',
    price: 10.0,
    image: 'test2.jpg',
    category: 'uramaki',
    available: true
  }
]

describe('useMenu Composable', () => {
  // Resetta tutti i mock prima di ogni test per evitare interferenze
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('dovrebbe inizializzarsi con uno stato vuoto e coerente', () => {
    const { items, loading, error, selectedCategory, filteredItems } = useMenu()

    expect(items.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBeNull()
    expect(selectedCategory.value).toBe('all')
    expect(filteredItems.value).toEqual([])
  })

  it('dovrebbe caricare correttamente i piatti dal service', async () => {
    // Mockiamo il metodo del service per farlo rispondere immediatamente con i nostri dati di test
    const getItemsSpy = vi.spyOn(menuService, 'getMenuItems').mockResolvedValue(fakeMenuItems)

    const { items, loading, fetchMenu } = useMenu()

    // Avviamo la chiamata (senza attendere subito con await per verificare lo stato di caricamento)
    const fetchPromise = fetchMenu()

    // Durante la chiamata, il caricamento deve essere TRUE
    expect(loading.value).toBe(true)

    await fetchPromise

    // Al termine, il caricamento deve tornare FALSE e i dati devono essere popolati
    expect(loading.value).toBe(false)
    expect(items.value).toEqual(fakeMenuItems)
    expect(getItemsSpy).toHaveBeenCalledTimes(1)
  })

  it('dovrebbe filtrare correttamente gli elementi in base alla categoria selezionata', async () => {
    vi.spyOn(menuService, 'getMenuItems').mockResolvedValue(fakeMenuItems)
    
    const { filteredItems, selectedCategory, fetchMenu } = useMenu()
    await fetchMenu()

    // Con categoria 'all' (default), mostra entrambi gli elementi
    expect(filteredItems.value).toHaveLength(2)

    // Cambiamo categoria in 'nigiri'
    selectedCategory.value = 'nigiri'

    // Ora filteredItems deve contenere solo l'elemento della categoria nigiri
    expect(filteredItems.value).toHaveLength(1)
    expect(filteredItems.value[0].id).toBe('1')
  })

  it('dovrebbe gestire correttamente gli errori del server', async () => {
    // Forziamo il service a fallire restituendo un errore
    vi.spyOn(menuService, 'getMenuItems').mockRejectedValue(new Error('Network Error'))

    const { items, loading, error, fetchMenu } = useMenu()

    await fetchMenu()

    expect(loading.value).toBe(false)
    expect(items.value).toEqual([]) // Nessun dato salvato
    expect(error.value).toBe('Impossibile caricare il menu. Riprova più tardi.')
  })
})