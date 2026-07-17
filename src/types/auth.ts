export type UserRole = 'admin' | 'user' | 'guest';

export type UserPermission = {
  'menu:read'       // for all roles
  'menu:write'      // for admin and user roles
  'menu:delete'     // for admin role only;
  'orders:create'   // for user role only
  'orders:read-all' // for admin role only
};

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  permissions: UserPermission[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}