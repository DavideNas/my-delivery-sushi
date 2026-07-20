import type { Meta, StoryObj } from '@storybook/vue3'
import CartLineItem from './CartLineItem.vue'
import type { CartItem } from '@/types/cart'

// Dati mock di esempio
const mockCartItemSingle: CartItem = {
  item: {
    id: 'sushi-1',
    name: 'Salmon Nigiri (2 pezzi)',
    description: 'Riso con fettina di salmone fresco.',
    price: 5.5,
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop',
    available: true,
    category: 'nigiri',
  },
  quantity: 1,
}

const mockCartItemMultiple: CartItem = {
  item: {
    id: 'sushi-2',
    name: 'Uramaki Special Tuna Roll con Croccante di Panko',
    description: 'Tonno, avocado, maionese spicy e teriyaki.',
    price: 12.0,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop',
    available: true,
    category: 'uramaki',
  },
  quantity: 4,
}

const meta: Meta<typeof CartLineItem> = {
  title: 'Cart/CartLineItem',
  component: CartLineItem,
  tags: ['autodocs'],
  // Registriamo gli eventi 'increase' e 'decrease' per vederli nella tab Actions
  argTypes: {
    onIncrease: { action: 'increase' },
    onDecrease: { action: 'decrease' },
  },
  // Simuliamo la larghezza tipica del cassetto/drawer del carrello (350px)
  decorators: [
    () => ({
      template: '<div style="max-width: 350px; padding: 16px;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

/* --- SCENARIO 1: Elemento singolo nel carrello --- */
export const SingleQuantity: Story = {
  args: {
    item: mockCartItemSingle,
  },
}

/* --- SCENARIO 2: Quantità multipla e titolo lungo --- */
export const MultipleQuantityLongTitle: Story = {
  args: {
    item: mockCartItemMultiple,
  },
}
