import type { APIContext } from 'astro'

export async function isAuthenticated({ cookies }: APIContext) {
  const admin = cookies.get('admin')?.value === 'true'
  return admin
}

export async function requireAuth(context: APIContext) {
  const authenticated = await isAuthenticated(context)

  if (!authenticated) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    })
  }

  return null
}
