import type { AuthConfig } from '@auth/core'
import Credentials from '@auth/core/providers/credentials'
import { themeConfig } from '@/config/default'

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
      if (token && session.user) {
        session.user.id = token.sub as string
      }
      return session
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
