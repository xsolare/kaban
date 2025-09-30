import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { AppRouteNames, AppRoutePaths } from '~/shared/constants/routes'
import { useAuthStore } from '~/shared/store/auth.store'

// --- Компоненты страниц ---
const Root = () => import('~/pages/root.vue')

const routes: RouteRecordRaw[] = [
  {
    path: AppRoutePaths.Root,
    name: AppRouteNames.Root,
    component: Root,
  },

]

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes,
})

// --- Глобальный навигационный гард ---
router.beforeEach(async (to, _, next) => {
  const authStore = useAuthStore()

  if (!authStore.isInitialized) {
    await new Promise<void>((resolve) => {
      const unsubscribe = authStore.$subscribe((_, state) => {
        if (state.isInitialized) {
          unsubscribe()
          resolve()
        }
      })
    })
  }

  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !authStore.isAuthenticated) {
    return next({ name: AppRouteNames.SignIn })
  }

  next()
})

export default router
