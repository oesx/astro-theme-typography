import type { CollectionEntry } from 'astro:content'
import type { Session } from '@auth/core/types'

export interface SiteConfig {
  title: string
  subtitle: string
  description: string
  author: string
  website: string
  language: string
  pageSize: number
  socialLinks: SocialLink[]
  navLinks: NavLink[]
  categoryMap: CategoryMap[]
  footer: string[]
}

export interface AdminConfig {
  username: string
  password: string
}

export interface SocialLink {
  name: string
  href: string
}

export interface NavLink {
  name: string
  href: string
}

export interface CategoryMap {
  name: string
  value: string
}

export interface CommentConfig {
  disqus?: {
    shortname: string
  }
  giscus?: {
    repo: string
    repoId: string
    category: string
    categoryId: string
    mapping: string
    strict: boolean
    reactionsEnabled: boolean
    emitMetadata: boolean
    inputPosition: string
    lang: string
  }
  utterances?: {
    repo: string
    issueTerm: string
    label: string
    theme: string
  }
  twikoo?: {
    envId: string
    region: string
  }
}

export interface ThemeConfig {
  site: SiteConfig
  admin: AdminConfig
  comment?: CommentConfig
}

export interface CustomSession extends Session {
  user?: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    password?: string
  }
}

export interface Post {
  id: string
  title: string
  slug: string
  description?: string
  pubDate: Date
  updatedDate?: Date
  heroImage?: string
  categories?: string[]
  tags?: string[]
  author?: string
  draft?: boolean
}

export type PostEntry = CollectionEntry<'posts'>
export type PostData = PostEntry['data']

export interface PostMeta extends PostData {
  id: string
  slug: string
  readingTime?: number
}

export interface Pagination {
  total: number
  currentPage: number
  lastPage: number
  showNext: boolean
  showPrev: boolean
  url: {
    prev: string | null
    next: string | null
  }
}

export interface Category {
  name: string
  count: number
  path: string
}
