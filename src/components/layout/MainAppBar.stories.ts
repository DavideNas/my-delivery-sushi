import type { Meta, StoryObj } from '@storybook/vue3'
import MainAppBar from './MainAppBar.vue'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Put the underscore in front if we don't use it directly with app.use()
const _dummyRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/admin', component: { template: '<div>Admin</div>' } },
    { path: '/orders', component: { template: '<div>Orders</div>' } }
  ]
})

const meta: Meta<typeof MainAppBar> = {
  title: 'Layout/MainAppBar',
  component: MainAppBar,
  tags: ['autodocs'],
  decorators: [
    (story) => {
      const pinia = createPinia()
      setActivePinia(pinia)

      return {
        components: { story },
        template: '<story />'
      }
    }
  ]
}

export default meta
type Story = StoryObj<typeof meta>

/* --- SCENARIO 1: Guest User (Not Logged In) --- */
export const Guest: Story = {
  render: (args) => ({
    components: { MainAppBar },
    setup() {
      const authStore = useAuthStore()
      authStore.isAuthenticated = false
      authStore.user = null
      return { args }
    },
    template: '<MainAppBar v-bind="args" />'
  })
}

/* --- SCENARIO 2: Logged in User (Customer) --- */
export const LoggedInUser: Story = {
  render: (args) => ({
    components: { MainAppBar },
    setup() {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      authStore.user = { id: '1', name: 'Mario Rossi', email: 'mario@example.com' }
      authStore.currentRole = 'user'
      return { args }
    },
    template: '<MainAppBar v-bind="args" />'
  })
}

/* --- SCENARIO 3: Admin User --- */
export const AdminUser: Story = {
  render: (args) => ({
    components: { MainAppBar },
    setup() {
      const authStore = useAuthStore()
      authStore.isAuthenticated = true
      authStore.user = { id: '2', name: 'Admin Boss', email: 'admin@example.com' }
      authStore.currentRole = 'admin'
      return { args }
    },
    template: '<MainAppBar v-bind="args" />'
  })
}
