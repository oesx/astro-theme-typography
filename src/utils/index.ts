import { getCollection } from 'astro:content'
import type { CollectionEntry } from 'astro:content'
import type { Post } from '@/types'
import { config } from '../../.config/user'
import type { LANGUAGES } from '@/i18n'

export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => {
    return !data.draft
  })

  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())

  return posts
}

export async function getCategories() {
  const posts = await getPosts()
  const categories = new Map<string, CollectionEntry<'posts'>[]>()
  
  for (const post of posts) {
    const category = post.data.category
    if (category) {
      const categoryPosts = categories.get(category) || []
      categoryPosts.push(post)
      categories.set(category, categoryPosts)
    }
  }
  
  return categories
}

export function getPathFromCategory(category: string, categoryMap: Record<string, string>) {
  return categoryMap[category] || category
}

export function formatDate(date: Date, locale: keyof typeof LANGUAGES = 'en'): string {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getPostDescription(post: Post) {
  return post.data.description || post.body.slice(0, 200)
}

export function getReadingTime(content: string, locale: keyof typeof LANGUAGES = 'en'): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  
  return `${minutes} min read`
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) {
    return text
  }
  return text.slice(0, length) + '...'
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function getPostUrl(post: CollectionEntry<'posts'>) {
  return `/posts/${post.slug}/`
}

export function getCategoryUrl(category: string) {
  return `/categories/${category}/`
}

export function getPageUrl(page: number) {
  return page === 1 ? '/' : `/page/${page}/`
}
