import type { Router, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { AppRouteNames, AppRoutePaths } from '~/shared/constants/routes'
import { useAuthStore } from '~/shared/store/auth.store'

// --- Компоненты страниц ---
const Root = () => import('~/pages/root.vue')

// -- Доски --
const BoardsList = () => import('~/pages/boards/list.vue')
const BoardsInfo = () => import('~/pages/boards/[id]/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: AppRoutePaths.Root,
    name: AppRouteNames.Root,
    component: Root,
  },
  {
    path: AppRoutePaths.Boards.List,
    name: AppRouteNames.BoardsList,
    component: BoardsList,
  },
  {
    path: AppRoutePaths.Boards.Info(':id'),
    name: AppRouteNames.BoardsInfo,
    component: BoardsInfo,
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
