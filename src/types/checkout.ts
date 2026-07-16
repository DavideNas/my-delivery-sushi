export interface CheckoutData {
    address: {
        fullName: string
        street: string
        city: string
        phone: string
    }
    payment: {
        method: 'credit_card' | 'paypal' | 'cash_on_delivery'
        cardNumber?: string
        cardExpiry?: string
        cardCVC?: string
        paypalEmail?: string
        cashOnDelivery?: boolean
    }
}

export const CheckoutKey = Symbol() as InjectionKey<{
    checkoutData: CheckoutData
    nextStep: () => void
    prevStep: () => void
    currentStep: Ref<number>
}>

import { type InjectionKey, type Ref } from 'vue'