import type { APIRoute } from 'astro'
import { generateAuthenticationOptions, verifyAuthenticationResponse } from '@simplewebauthn/server'

const rpID = process.env.WEBAUTHN_RP_ID || 'localhost'
const origin = process.env.WEBAUTHN_ORIGIN || 'http://localhost:4321'

export const post: APIRoute = async ({ cookies }) => {
  try {
    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials: [], // In a real app, get from database
      userVerification: 'preferred',
    })

    // Store challenge for verification
    cookies.set('challenge', options.challenge, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })

    return new Response(JSON.stringify(options), {
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    })
  }
}

export const put: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json()
    const challenge = cookies.get('challenge')?.value

    if (!challenge) {
      return new Response(JSON.stringify({ error: 'Challenge not found' }), {
        status: 400,
      })
    }

    const verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        // In a real app, get from database
        credentialID: Buffer.from(''),
        credentialPublicKey: Buffer.from(''),
        counter: 0,
        transports: undefined,
      },
    })

    if (verification.verified) {
      cookies.delete('challenge', { path: '/' })
      cookies.set('admin', 'true', {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })

      return new Response(JSON.stringify({ verified: true }), {
        status: 200,
      })
    }

    return new Response(JSON.stringify({ error: 'Verification failed' }), {
      status: 400,
    })
  } catch (error) {
    console.error('Error verifying authentication:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    })
  }
}
