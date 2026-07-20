import type { Meta, StoryObj } from '@storybook/vue3'
import MenuItemCard from './MenuItemCard.vue'
import type { MenuItem } from '@/types/menu'

// 1. Dati di mockup riutilizzabili
const mockAvailableItem: MenuItem = {
  id: 'sushi-1',
  name: 'Salmon Nigiri (2 pezzi)',
  description: 'Riso con fettina di salmone fresco e un tocco di wasabi.',
  price: 5.5,
  image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop',
  available: true,
  category: 'nigiri'
}

const mockDisabledItem: MenuItem = {
  ...mockAvailableItem,
  id: 'sushi-2',
  name: 'Uramaki Special Tuna',
  description: 'Tonno, avocado, maionese spicy e teriyaki sopra.',
  available: false
}

const mockLongTextItem: MenuItem = {
  ...mockAvailableItem,
  id: 'sushi-3',
  name: 'Roll Speciale Chef Deluxe con Salmone, Tonno e Frutta Esotica',
  description: 'Un roll ricchissimo farcito con salmone abbattuto fresco, tonno rosso, mango, maionese spicy casereccia, granella di pistacchio e riduzione di teriyaki fatta in casa direttamente dallo chef.',
  price: 18.9
}

// 2. Configurazione Meta del componente
const meta: Meta<typeof MenuItemCard> = {
  title: 'Menu/MenuItemCard',
  component: MenuItemCard,
  tags: ['autodocs'],
  // Definizione degli argTypes per Storybook Controls
  argTypes: {
    'onAdd-to-cart': { action: 'add-to-cart' }, // Traccia i click sul pulsante nella tab "Actions"
  },
  // Limitiamo la larghezza della card nella preview per simularne la griglia
  decorators: [
    () => ({
      template: '<div style="max-width: 300px; padding: 16px;"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

/* --- SCENARIO 1: Prodotto Disponibile --- */
export const Default: Story = {
  args: {
    item: mockAvailableItem,
  },
}

/* --- SCENARIO 2: Prodotto Esaurito (Disabled) --- */
export const OutOfStock: Story = {
  args: {
    item: mockDisabledItem,
  },
}

/* --- SCENARIO 3: Testo Molto Lungo (Verifica Layout/Clamp) --- */
export const LongText: Story = {
  args: {
    item: mockLongTextItem,
  },
}
