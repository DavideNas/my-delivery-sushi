import type { MenuItem } from '@/types/menu'

// I nostri dati di partenza (il database simulato)
const mockDb: MenuItem[] = [
  {
    id: '1',
    name: 'Sake Nigiri',
    description: 'Polpettina di riso con fettina di salmone fresco.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500',
    category: 'nigiri',
    available: true
  },
  {
    id: '2',
    name: 'Ebiten Uramaki',
    description: 'Roll interno con gambero in tempura, maionese e salse kabayaki.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
    category: 'uramaki',
    available: true
  },
  {
    id: '3',
    name: 'Maguro Temaki',
    description: 'Cono di alga nori ripieno di riso, tonno e avocado.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=500',
    category: 'temaki',
    available: false
  },
  {
    id: '4',
    name: 'Tè Verde Matcha',
    description: 'Tipico tè verde giapponese freddo, rinfrescante e antiossidante.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=500',
    category: 'bevande',
    available: true
  }
]

export const menuService = {
  /**
   * Recupera tutti i piatti del menu simulando un ritardo di rete (1000ms)
   */
  async getMenuItems(): Promise<MenuItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockDb])
      }, 1000)
    })
  }
}