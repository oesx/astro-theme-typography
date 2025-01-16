import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { themeConfig } from '@/config/default'

export const GET: APIRoute = async () => {
  const { site } = themeConfig
  const posts = await getCollection('posts', ({ data }) => {
    return !data.draft
  })

  posts.sort((a, b) => {
    return b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  })

  return rss({
    title: site.title,
    description: site.description,
    site: site.website,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description || '',
      link: `/posts/${post.slug}`,
      pubDate: post.data.pubDate,
    })),
  })
}
