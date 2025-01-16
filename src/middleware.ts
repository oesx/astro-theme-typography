import { defineMiddleware } from 'astro:middleware'
import { LANGUAGES } from './i18n'

export const onRequest = defineMiddleware(async (context, next) => {
  // Add default locale
  context.locals.locale = 'en'
  context.locals.t = LANGUAGES['en']

  // Add translation helper
  context.locals.translate = (key: keyof typeof LANGUAGES['en']) => {
    return context.locals.t[key] || key
  }

  return next()
})
