import type { User, UserRole, UserPermission } from '../types/auth';

// Role based permissions map
const ROLE_PERMISSIONS: Record<UserRole, UserPermission[]> = {
    guest: ['menu:read'],
    user: ['menu:read', 'menu:write', 'orders:create'],
    admin: ['menu:read', 'menu:write', 'menu:delete', 'orders:create', 'orders:read-all']
};

// Mocked user for tests
const MOCK_USERS: Record<string, Omit<User, 'permissions'>> = {
    'mario@sushi.it': {
        id: 'usr_1',
        username: 'Mario Customer',
        email: 'mario@sushi.it',
        role: 'user'
    },
    'luigi@sushi.it': {
        id: 'usr_2',
        username: 'Luigi Customer',
        email: 'luigi@sushi.it',
        role: 'user'
    },
    'admin@sushi.it': {
        id: 'usr_3',
        username: 'Admin User',
        email: 'admin@sushi.it',
        role: 'admin'
    }
};

export const authService = {
    async login(email: string, passwordHash: string): Promise<{user: User, token: string}> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                // In a real application, you would verify the password hash here. For this mock, we will skip that step.
                const foundUser = MOCK_USERS[email.toLowerCase().trim()];

                if (!foundUser) {
                    return reject(new Error('Credentials are not valid or User not found'));
                }

                const userWithPermissions: User = {
                    ...foundUser,
                    permissions: ROLE_PERMISSIONS[foundUser.role]
                };

                resolve({
                    user: userWithPermissions,
                    token: `mocked-jwt-token-for-${userWithPermissions.role}`
                });

            }, 1000); // Simulate network delay
        });
    },


    /**
     * Validates a JWT token and returns the associated user or null if invalid.
     * @param token The JWT token to validate.
     * @returns A promise resolving to the user if the token is valid, or null otherwise.
     */
    async validateToken(token: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (token.includes('admin')) {
                    resolve({
                        ...MOCK_USERS['admin@sushi.it'],
                        permissions: ROLE_PERMISSIONS['admin']
                    });
                } else if (token.includes('user')) {
                    // Mario is the default user for this mock, so we return him as standard 'user' token.
                    resolve({
                        ...MOCK_USERS['mario@sushi.it'],
                        permissions: ROLE_PERMISSIONS['user']
                    });
                } else {
                    reject(new Error('Not valid or expired token.'));
                }
            })
        }, 500); // Simulate network delay
    }
};