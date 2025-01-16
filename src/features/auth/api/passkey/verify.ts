import type { APIRoute } from 'astro'
import { verifyAuthenticationResponse } from '@simplewebauthn/server'

const rpID = import.meta.env.WEBAUTHN_RP_ID || 'blog.chumyin.com'
const expectedOrigin = import.meta.env.WEBAUTHN_ORIGIN || 'https://blog.chumyin.com'

export const post: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()

    // 這裡需要從數據庫或配置中獲取已註冊的認證器信息
    const expectedChallenge = 'your-challenge'

    const verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin,
      expectedRPID: rpID,
      authenticatorData: new Uint8Array([]),
      credentialID: new Uint8Array([]),
      credentialPublicKey: new Uint8Array([]),
      counter: 0,
    })

    if (verification.verified) {
      // 創建會話
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new Response(JSON.stringify({ error: 'Verification failed' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Passkey verification error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
