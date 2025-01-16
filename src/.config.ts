import type { ThemeConfig } from './features/common/types/themeConfig'

export const themeConfig: ThemeConfig = {
  site: {
    title: 'Astro Theme Typography',
    subtitle: 'A clean and elegant blog theme for Astro',
    lang: 'en',
    categoryMap: {},
    favicon: '/favicon.svg',
    description: 'A clean and elegant blog theme for Astro',
    socialLinks: [
      { name: 'github', href: 'https://github.com/yourusername' },
      { name: 'twitter', href: 'https://twitter.com/yourusername' },
    ],
  },
  appearance: {
    theme: 'system',
    font: 'default',
    locale: 'en',
  },
  features: {
    backToTop: true,
    readingTime: true,
    giscus: {
      repo: '',
      repoId: '',
      category: '',
      categoryId: '',
    },
    analytics: {
      google: '',
      umami: {
        websiteId: '',
        src: '',
      },
    },
  },
}
