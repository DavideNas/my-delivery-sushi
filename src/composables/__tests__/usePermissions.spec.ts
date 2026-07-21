import { describe, beforeEach, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { usePermissions } from '../usePermissions'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/auth'

describe('usePermissions', () => {
  let authStore: ReturnType<typeof useAuthStore>

  // Init a clean instance of Pinia before EVERY test
  beforeEach(() => {
    setActivePinia(createPinia())
    authStore = useAuthStore()
    localStorage.clear()
  })

  /**
   * 1. GUEST SCENARIO (Unauthenticated user)
   */
  describe('Guest user (unauthenticated)', () => {
    it('should identify role as guest and isAuthenticated as false', () => {
      const { currentRole, isAuthenticated } = usePermissions()

      expect(isAuthenticated.value).toBe(false)
      expect(currentRole.value).toBe('guest')
    })

    it('should allow default "menu:read" permission for guests', () => {
      const { hasPermission } = usePermissions()

      expect(hasPermission('menu:read')).toBe(true)
      expect(hasPermission('menu:write')).toBe(false)
    })

    it('should correctly evaluate roles with hasRole and hasAnyRole', () => {
      const { hasRole, hasAnyRole } = usePermissions()

      expect(hasRole('guest')).toBe(true)
      expect(hasRole('admin')).toBe(false)
      expect(hasAnyRole(['admin', 'guest'])).toBe(true)
      expect(hasAnyRole(['admin', 'user'])).toBe(false)
    })
  })

  /**
   * 2. USER / ADMIN SCENARIO (Authenticated User)
   */
  describe('Authenticated user permissions', () => {
    const mockUser: User = {
      id: 'usr-1',
      username: 'Mario Rossi',
      email: 'mario@example.com',
      role: 'user',
      permissions: ['menu:read', 'menu:write', 'orders:create']
    }

    beforeEach(() => {
      authStore.user = mockUser
      authStore.token = 'fake-jwt-token'
    })

    it('should return correct authenticated state and user role', () => {
      const { isAuthenticated, currentRole, user } = usePermissions()

      expect(isAuthenticated.value).toBe(true)
      expect(currentRole.value).toBe('user')
      expect(user.value).toEqual(mockUser)
    })

    it('should verify specific permissions correctly', () => {
      const { hasPermission } = usePermissions()

      expect(hasPermission('orders:create')).toBe(true)
      expect(hasPermission('orders:read-all')).toBe(false)
    })

    it('should evaluate hasAnyPermission correctly (OR logic)', () => {
      const { hasAnyPermission } = usePermissions()

      // User has 'orders:create', so at least one is present -> true
      expect(hasAnyPermission(['orders:read-all', 'orders:create'])).toBe(true)
      // User has none of these -> false
      expect(hasAnyPermission(['orders:read-all', 'menu:delete'])).toBe(false)
    })

    it('should evaluate hasAllPermissions correctly (AND logic)', () => {
      const { hasAllPermissions } = usePermissions()

      // User has both 'menu:read' and 'orders:create' -> true
      expect(hasAllPermissions(['menu:read', 'orders:create'])).toBe(true)
      // User does not have 'orders:read-all' -> false
      expect(hasAllPermissions(['menu:read', 'orders:read-all'])).toBe(false)
    })
  })

  /**
   * 3. ACTIONS (Logout)
   */
  describe('Actions', () => {
    it('should clear user state upon logout call', () => {
      authStore.user = {
        id: 'adm-1',
        username: 'Admin Boss',
        email: 'admin@sushi.com',
        role: 'admin',
        permissions: ['menu:write', 'menu:delete', 'orders:read-all']
      }
      authStore.token = 'active-token'

      const { logout, isAuthenticated, currentRole } = usePermissions()

      expect(isAuthenticated.value).toBe(true)

      logout()

      expect(isAuthenticated.value).toBe(false)
      expect(currentRole.value).toBe('guest')
      expect(authStore.user).toBeNull()
    })
  })
})
