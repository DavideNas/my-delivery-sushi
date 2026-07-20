import type { Meta, StoryObj } from '@storybook/vue3'
import CartLineItem from './CartLineItem.vue'
import type { CartItem } from '@/types/cart'

// Example mock data
const mockCartItemSingle: CartItem = {
  item: {
    id: 'sushi-1',
    name: 'Salmon Nigiri (2 pieces)',
    description: 'Rice with fresh salmon slice.',
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
    name: 'Uramaki Special Tuna Roll with Crispy Panko',
    description: 'Tuna, avocado, spicy mayonnaise and teriyaki.',
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
  // Log the 'increase' and 'decrease' events to see them in the Actions tab.
  argTypes: {
    onIncrease: { action: 'increase' },
    onDecrease: { action: 'decrease' },
  },
  // Simulate the typical width of the cart drawer (350px)
  decorators: [
    () => ({
      template: '<div style="max-width: 350px; padding: 16px;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

/* --- SCENARIO 1: Single item in cart --- */
export const SingleQuantity: Story = {
  args: {
    item: mockCartItemSingle,
  },
}

/* --- SCENARIO 2: Multiple quantity and long title --- */
export const MultipleQuantityLongTitle: Story = {
  args: {
    item: mockCartItemMultiple,
  },
}
