import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import auth from 'auth-astro'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    auth()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    }
  }
})
