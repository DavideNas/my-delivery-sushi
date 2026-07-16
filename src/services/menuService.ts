import type { MenuItem } from '@/types/menu'

// Our starting data (the simulated database)
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
  },
  {
    id: '5',
    name: 'Poke Bowl Salmone',
    description: 'Poke bowl con riso, salmone fresco, avocado, edamame e verdure di stagione.',
    price: 15.00,
    image: 'https://plus.unsplash.com/premium_photo-1701113208681-7ff82c25e039?w=500',    
    category: 'poke',
    available: true
  },
  {
    id: '6',
    name: 'Poke Bowl Vegana',
    description: 'Poke bowl con riso, tofu, avocado, edamame e verdure di stagione.',
    price: 13.00,
    image: 'https://plus.unsplash.com/premium_photo-1698867577020-38ae235fd612?w-500',    
    category: 'poke',
    available: false
  },
  {
    id: '7',
    name: 'Sake Asahi Shuzo Dassai',
    description: 'Bottiglia da 300 ml di Sake.',
    price: 26.90,
    image: 'https://images.unsplash.com/photo-1691432633040-c31b6086742c?w=500&h=600&fit=crop&crop=focalpoint&fp-y=0.22',
    category: 'bevande',
    available: true
  }  
]

export const menuService = {
  /**
   * Load all menu plates simulating a network delay (1000ms)
   */
  async getMenuItems(): Promise<MenuItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockDb])
      }, 1000)
    })
  }
}