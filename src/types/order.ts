export interface OrderItem {
    menuItemId: string
    name: string
    quantity: number
    price: number
}

export type OrderStatus = 'pending' | 'preparing' | 'delivered' | 'cancelled'

export interface Order {
    id: string
    customerName: string
    items: OrderItem[]
    totalAmount: number
    status: OrderStatus
    createdAt: string // ISO String
    notes?: string
}