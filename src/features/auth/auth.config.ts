import type { AuthConfig } from './types'

const validUsername = process.env.ADMIN_USERNAME || 'admin'
const validPassword = process.env.ADMIN_PASSWORD || 'admin'
const authSecret = process.env.AUTH_SECRET || 'your-secret-key'

export const rpID = process.env.WEBAUTHN_RP_ID || 'localhost'
export const rpName = process.env.WEBAUTHN_RP_NAME || 'Astro Typography'
export const origin = process.env.WEBAUTHN_ORIGIN || 'http://localhost:3000'

export const authConfig: AuthConfig = {
  webauthn: {
    rpID,
    rpName,
    origin,
  },
  admin: {
    username: validUsername,
    password: validPassword,
  },
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: { label: '用戶名', type: 'text' },
        password: { label: '密碼', type: 'password' },
      },
      async authorize(credentials: { username: string; password: string }) {
        if (
          credentials?.username === validUsername &&
          credentials?.password === validPassword
        ) {
          return {
            id: '1',
            name: validUsername,
            email: `${validUsername}@example.com`,
          }
        }

        return null
      },
    },
  ],
  pages: {
    signIn: '/auth/login',
  },
  secret: authSecret,
}
