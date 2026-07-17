// Rappresenta un elemento del menu, come un piatto di sushi o una bevanda
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'nigiri' | 'uramaki' | 'temaki' | 'drinks' | 'poke'
  available: boolean
}

// Rappresenta un elemento all'interno del carrello
export interface CartItem {
  item: MenuItem;
  quantity: number;
}