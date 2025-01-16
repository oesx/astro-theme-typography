import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import node from '@astrojs/node'
import UnoCSS from 'unocss/astro'
import auth from 'auth-astro'

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    solidJs(),
    UnoCSS(),
    auth(),
  ],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  experimental: {
    contentLayer: true,
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '~': '/src',
        '@config': '/src/config',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@i18n': '/src/i18n',
        '@core': '/src/core',
        '@features': '/src/features',
        '@utils': '/src/utils',
        '@types': '/src/types'
      }
    },
    optimizeDeps: {
      exclude: ['auth-astro']
    }
  }
})
