import type { App } from 'vue'
import { i18n, loadAtdLocales } from '@/locales'

// setup i18n instance with glob
export async function setupI18n(app: App) {
  loadAtdLocales()
  app.use(i18n)
}
