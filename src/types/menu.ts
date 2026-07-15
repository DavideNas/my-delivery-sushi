export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'nigiri' | 'uramaki' | 'temaki' | 'bevande'
  available: boolean
}