import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import type { MenuItem } from '@/types/menu'

export function useCart() {
    const store = useCartStore()

    const { cartItems, totalItemsCount, totalPrice } = storeToRefs(store)

    const addToCart = (item: MenuItem) => store.addToCart(item)
    const removeFromCart = (productId: string) => store.removeFromCart(productId)
    const clearCart = () => store.clearCart()

    return {
        cartItems,
        totalItemsCount,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart
    }
}