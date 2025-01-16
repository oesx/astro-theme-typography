import type { APIRoute } from 'astro'
import { config } from '../../../../../.config/user'
import fs from 'fs/promises'
import path from 'path'

// 获取设置
export const GET: APIRoute = async ({ request }) => {
  try {
    return new Response(
      JSON.stringify({
        username: config.admin?.username,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to get settings' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

// 更新设置
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()
    const { username, password } = data

    // 读取用户配置文件
    const configPath = path.resolve(process.cwd(), '.config/user.ts')
    let configContent = await fs.readFile(configPath, 'utf-8')

    // 检查是否已存在 admin 配置
    if (configContent.includes('admin:')) {
      // 更新现有的 admin 配置
      configContent = configContent.replace(
        /admin:\s*{[\s\S]*?}/,
        `admin: {
    username: '${username}',
    password: '${password}',
  }`
      )
    } else {
      // 添加新的 admin 配置
      configContent = configContent.replace(
        'export const userConfig: Partial<ThemeConfig> = {',
        `export const userConfig: Partial<ThemeConfig> = {
  admin: {
    username: '${username}',
    password: '${password}',
  },`
      )
    }

    // 写入更新后的配置
    await fs.writeFile(configPath, configContent, 'utf-8')

    // 更新运行时的配置
    if (!config.admin) {
      config.admin = { username: '', password: '' }
    }
    config.admin.username = username
    config.admin.password = password

    return new Response(
      JSON.stringify({ message: 'Settings updated successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Error updating settings:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to update settings' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
