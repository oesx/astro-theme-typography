import type { AuthConfig } from '@auth/core'
import Credentials from '@auth/core/providers/credentials'
import { themeConfig } from '@/config/default'
import type { CustomSession } from '@/types'

export const authConfig: AuthConfig = {
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        const { username, password } = credentials
        const { admin } = themeConfig

        if (admin && username === admin.username && password === admin.password) {
          return {
            id: '1',
            name: admin.username,
            email: `${admin.username}@example.com`,
            password: admin.password
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true
    },
    async session({ session, token }) {
      const customSession = session as CustomSession
      if (token && customSession.user) {
        customSession.user.id = token.sub as string
      }
      return customSession
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.AUTH_SECRET || 'your-secret-key',
  trustHost: true,
}
