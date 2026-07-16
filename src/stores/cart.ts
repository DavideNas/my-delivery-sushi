import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MenuItem, CartItem } from '@/types/menu'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([])

  // Getter to count the total quantity of items (e.g., 2 Sake + 1 Tè = 3 pieces)
  const totalItemsCount = computed(() => {
    return cartItems.value.reduce((total, current) => total + current.quantity, 0)
  })

  // Getter to calculate the total price
  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, current) => {
      return total + (current.item.price * current.quantity)
    }, 0)
  })

  // Action to add an item (or increase its quantity)
  const addToCart = (product: MenuItem) => {
    const existingItem = cartItems.value.find(entry => entry.item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cartItems.value.push({ item: product, quantity: 1 })
    }
  }

  // Action to remove an item or decrease its quantity
  const removeFromCart = (productId: string) => {
    const existingItem = cartItems.value.find(entry => entry.item.id === productId)
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--
      } else {
        cartItems.value = cartItems.value.filter(entry => entry.item.id !== productId)
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    cartItems,
    totalItemsCount,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart
  }
})