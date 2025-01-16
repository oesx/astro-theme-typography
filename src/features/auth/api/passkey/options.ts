import type { APIRoute } from 'astro'
import { generateAuthenticationOptions } from '@simplewebauthn/server'
import type { GenerateAuthenticationOptionsOpts } from '@simplewebauthn/server'

const rpID = import.meta.env.WEBAUTHN_RP_ID || 'blog.chumyin.com'

// 存儲認證挑戰（在生產環境中應該使用數據庫或 Redis）
const challengeStore = new Map<string, string>()

export const get: APIRoute = async () => {
  try {
    const userId = '1' // 在實際應用中，這應該是用戶的 ID

    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: 'preferred',
      // 在實際應用中，這裡應該從數據庫獲取用戶的認證器列表
      allowCredentials: [],
    } as GenerateAuthenticationOptionsOpts)

    // 存儲挑戰以供後續驗證
    challengeStore.set(userId, options.challenge)

    return new Response(JSON.stringify(options), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error generating authentication options:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
