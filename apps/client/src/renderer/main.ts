import { createPinia } from 'pinia'
import { createApp } from 'vue'

import router from '~/shared/lib/router'

// @ts-expect-error бред какой то
import application from './app.vue'
import { requestPlugin } from './plugins/request'
import { restoreSession } from './plugins/session-restore'
import { themePlugin } from './plugins/theme'

/**
 * Асинхронная функция для инициализации приложения.
 */
async function initializeApp() {
  const app = createApp(application)
  const pinia = createPinia()

  app.use(pinia)
  app.use(router)
  app.use(themePlugin)

  await restoreSession(pinia)

  app.mount('#app')
}

initializeApp()
