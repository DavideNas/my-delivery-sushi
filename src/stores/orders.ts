import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order, OrderStatus } from '@/types/order'

export const useOrdersStore = defineStore('orders', () => {
    const orders = ref<Order[]>([])

    // Internal function to generate 1.000 realistic orders distributed in the last month
    const generateMassiveMockOrders = () => {
        const names = ['James Smith', 'Patricia Brown', 'Robert Williams', 'John Davis', 'Jennifer Garcia', 'Michael Miller', 'William Rodriguez', 'Mary Johnson']

        const sushiItems = [
            { name: 'Sake Nigiri', price: 4.00 },
            { name: 'Ebiten Uramaki', price: 12.00 },
            { name: 'Tuna Uramaki', price: 12.00 },
            { name: 'Salmon temaki', price: 5.00 },
            { name: 'Poke Bowl Salmon', price: 15.00 }
        ]

        const generatedOrders: Order[] = []

        for (let i = 1; i <= 1000; i++) {
            // Random number of different dishes ordered (1 to 3)
            const itemsCount = Math.floor(Math.random() * 3) + 1
            const orderItems = []
            let totalAmount = 0

            for (let j = 0; j < itemsCount; j++){
                const randomSushi = sushiItems[Math.floor(Math.random() * sushiItems.length)]
                if (randomSushi) {
                  const quantity = Math.floor(Math.random() * 2) + 1
                  orderItems.push({
                      id: `item-${j}`,
                      menuItemId: `menu-item-${j}`,
                      name: randomSushi.name,
                      price: randomSushi.price,
                      quantity
                  })
                  totalAmount += randomSushi.price * quantity
              }
            }

            // Generate casual date in the last 3 weeks
            const date = new Date()
            date.setDate(date.getDate() - Math.floor(Math.random() * 21))
            date.setHours(Math.floor(Math.random() * 12) + 12, Math.floor(Math.random() * 60))

            // Realistic distributions of states (high quantity of 'delivered', low quantity of 'pending')
            let status: OrderStatus = 'delivered'
            const rand = Math.random()
            if (i <= 5) status = 'pending'  // keep the first 5 pending for testing
            else if (rand < 0.08) status = 'pending'
            else if (rand < 0.15) status = 'preparing'
            else if (rand < 0.22) status = 'cancelled'

            const customerName = names[Math.floor(Math.random() * names.length)] ?? 'Cliente Anonimo'

            generatedOrders.push({
                id: `ORD-${10000 +i}`,
                customerName,
                items: orderItems,
                totalAmount,
                status,
                createdAt: date.toISOString(),
                notes: Math.random() > 0.7 ? 'Contactless delivery internal intercom 4' : undefined
            })
        }

        // Order from newest to oldest
        orders.value = generatedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    // Select initial state
    if (orders.value.length === 0) {
        generateMassiveMockOrders()
    }

    // Action to change state on the fly
    const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
        const order = orders.value.find(o => o.id === orderId)
        if (order) {
            order.status = newStatus
        }
    }

    return { orders, generateMassiveMockOrders, updateOrderStatus }
})
