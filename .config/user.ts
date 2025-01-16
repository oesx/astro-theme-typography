import type { ThemeConfig } from '../src/types'
import { defaultConfig } from '../.config'

// Override default configuration here
export const userConfig: Partial<ThemeConfig> = {
  admin: {
    username: 'admin',
    password: 'admin123',
  },
}

// Merge default and user configurations
export const config: ThemeConfig = {
  ...defaultConfig,
  ...userConfig,
  // Deep merge objects if needed
  site: {
    ...defaultConfig.site,
    ...(userConfig.site || {}),
  },
  appearance: {
    ...defaultConfig.appearance,
    ...(userConfig.appearance || {}),
  },
  analytics: {
    ...defaultConfig.analytics,
    ...(userConfig.analytics || {}),
  },
}
