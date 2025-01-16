import type { ThemeConfig } from '@/types'

export const themeConfig: ThemeConfig = {
  site: {
    title: 'Astro Blog',
    subtitle: 'A blog built with Astro',
    description: 'A minimal blog built with Astro and TypeScript',
    author: 'Your Name',
    website: 'https://example.com',
    language: 'en',
    pageSize: 10,
    socialLinks: [
      {
        name: 'GitHub',
        href: 'https://github.com/yourusername',
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com/yourusername',
      },
    ],
    navLinks: [
      {
        name: 'Home',
        href: '/',
      },
      {
        name: 'Blog',
        href: '/posts',
      },
      {
        name: 'Categories',
        href: '/categories',
      },
    ],
    categoryMap: [
      {
        name: 'TypeScript',
        value: 'typescript',
      },
      {
        name: 'Astro',
        value: 'astro',
      },
    ],
    footer: [
      ' 2025 Your Name. All rights reserved.',
      'Built with Astro and TypeScript',
    ],
  },
  admin: {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'password',
  },
  comment: {
    giscus: {
      repo: 'username/repo',
      repoId: 'your-repo-id',
      category: 'Comments',
      categoryId: 'your-category-id',
      mapping: 'pathname',
      strict: true,
      reactionsEnabled: true,
      emitMetadata: false,
      inputPosition: 'bottom',
      lang: 'en',
    },
  },
}
