import type { AuthConfig } from '@auth/core'
import GitHub from '@auth/core/providers/github'

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  trustHost: true,
  secret: process.env.AUTH_SECRET,
} satisfies AuthConfig
