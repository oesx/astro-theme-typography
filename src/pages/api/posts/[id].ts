import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ params }) => {
  try {
    const posts = await getCollection('posts')
    const post = posts.find((post) => post.slug === params.id)
    
    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    
    return new Response(JSON.stringify(post), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch post' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const PUT: APIRoute = async ({ request, params }) => {
  try {
    const data = await request.json()
    
    // TODO: Add validation and update post
    
    return new Response(JSON.stringify({ message: 'Post updated successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update post' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

export const DELETE: APIRoute = async ({ params }) => {
  try {
    // TODO: Delete post
    
    return new Response(JSON.stringify({ message: 'Post deleted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete post' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
