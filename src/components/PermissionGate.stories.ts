import type { Meta, StoryObj } from '@storybook/vue3'
import PermissionGate from './PermissionGate.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const meta: Meta<typeof PermissionGate> = {
  title: 'Auth/PermissionGate',
  component: PermissionGate,
  tags: ['autodocs'],
  decorators: [
    (story) => {
      const pinia = createPinia()
      setActivePinia(pinia)

      return {
        components: { story },
        template: '<div style="padding: 20px;"><story /></div>',
      }
    },
  ],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Template base per renderizzare lo slot predefinito e quello #unauthorized
 */
const defaultTemplate = `
  <PermissionGate v-bind="args">
    <div style="padding: 12px; background: #e8f5e9; border: 1px solid #4caf50; border-radius: 6px; color: #2e7d32;">
      🔒 <strong>Reserve Admin Area:</strong> You can see this panel because you're Admin.
    </div>
    <template #unauthorized>
      <div style="padding: 12px; background: #ffebee; border: 1px solid #f44336; border-radius: 6px; color: #c62828;">
        🚫 <strong>Access Denied:</strong> This function requires Admin role.
      </div>
    </template>
  </PermissionGate>
`

/**
 * 1. TEST FOR ROLES
 */

// CASE A: User Admin -> See reserved content (BOX VERDE)
export const AdminAllowed: Story = {
  render: (args) => ({
    components: { PermissionGate },
    setup() {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      authStore.currentRole = 'admin'
      // Popoliamo anche l'oggetto user completo per sicurezza di usePermissions
      authStore.user = {
        id: '1',
        name: 'Admin Boss',
        email: 'admin@sushi.com',
        role: 'admin',
        permissions: ['menu:read', 'menu:write', 'admin:access'],
      } as any
      return { args }
    },
    template: defaultTemplate,
  }),
  args: {
    roles: 'admin',
  },
}

// CASE B: User Customer (User) -> See the fallback #unauthorized (BOX ROSSO)
export const UserDeniedRole: Story = {
  render: (args) => ({
    components: { PermissionGate },
    setup() {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      authStore.currentRole = 'user'
      authStore.user = {
        id: '2',
        name: 'Mario Rossi',
        email: 'mario@gmail.com',
        role: 'user',
        permissions: ['menu:read'],
      } as any
      return { args }
    },
    template: defaultTemplate,
  }),
  args: {
    roles: 'admin',
  },
}

/**
 * 2. TEST MODE DISABLED (disabledMode)
 */
export const DisabledModeWhenUnauthorized: Story = {
  render: (args) => ({
    components: { PermissionGate },
    setup() {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      authStore.currentRole = 'user'
      authStore.user = {
        id: '2',
        name: 'Mario Rossi',
        email: 'mario@gmail.com',
        role: 'user',
        permissions: ['menu:read'],
      } as any
      return { args }
    },
    template: `
      <PermissionGate v-bind="args" v-slot="{ hasAccess }">
        <button
          style="padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 4px;"
          :style="{ opacity: hasAccess ? 1 : 0.5, cursor: hasAccess ? 'pointer' : 'not-allowed' }"
        >
          {{ hasAccess ? 'Action Allowed' : 'Action Disabled (No Permission)' }}
        </button>
      </PermissionGate>
    `,
  }),
  args: {
    roles: 'admin',
    disabledMode: true,
  },
}

/**
 * 3. TEST FOR PERMISSIONS (permissions + mode)
 */
export const ModeAnyPermission: Story = {
  render: (args) => ({
    components: { PermissionGate },
    setup() {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      authStore.userPermissions = ['menu:read']
      authStore.user = {
        id: '2',
        name: 'Mario Rossi',
        email: 'mario@gmail.com',
        role: 'user',
        permissions: ['menu:read'],
      } as any
      return { args }
    },
    template: `
      <PermissionGate v-bind="args">
        <div style="padding: 12px; background: #e3f2fd; border: 1px solid #2196f3; border-radius: 6px; color: #1565c0;">
          ✅ Access granted with modality <strong>MODE='ANY'</strong> (at least one permit present).
        </div>
      </PermissionGate>
    `,
  }),
  args: {
    permissions: ['menu:read', 'menu:write'],
    mode: 'any',
  },
}
