import type { AstroGlobal } from 'astro'
import { themeConfig } from '@/config/default'

type Messages = {
  [key: string]: {
    [key: string]: string
  }
}

const messages: Messages = {
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.categories': 'Categories',
    'nav.about': 'About',
    'meta.readingTime': 'min read',
    'meta.updatedAt': 'Updated at',
    'meta.category': 'Category',
    'meta.categories': 'Categories',
    'meta.previous': 'Previous',
    'meta.next': 'Next',
  },
  zh: {
    'nav.home': '首页',
    'nav.blog': '博客',
    'nav.categories': '分类',
    'nav.about': '关于',
    'meta.readingTime': '分钟阅读',
    'meta.updatedAt': '更新于',
    'meta.category': '分类',
    'meta.categories': '分类',
    'meta.previous': '上一篇',
    'meta.next': '下一篇',
  },
}

export function getLanguage(Astro: AstroGlobal): string {
  return themeConfig.site.language || 'en'
}

export function t(key: string, lang?: string): string | undefined {
  if (!lang) {
    lang = getLanguage({} as AstroGlobal)
  }
  return messages[lang]?.[key] || messages.en[key] || key
}
