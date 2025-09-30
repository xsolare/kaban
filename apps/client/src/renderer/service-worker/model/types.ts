/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
/// <reference types="@types/workbox-sw" />

type AssetType = 'hashed' | 'vendor' | 'regular'

interface ServiceWorkerMessage {
  type: 'SKIP_WAITING' | 'GET_CACHE_INFO' | 'CLEAR_CACHE'
  payload?: {
    cacheName?: string
  }
}

interface CacheInfo {
  name: string
  size: number
  urls: string[]
  totalSize?: number
}

const CACHE_CONFIG = {
  names: {
    webmanifest: 'kaban-pwa-webmanifest',
    fonts: 'kaban-fonts',
    images: 'kaban-images',
    icons: 'kaban-icons',
    airlineIcons: 'kaban-airline-favicons',
    hashedAssets: 'kaban-hashed-assets',
    vendorAssets: 'kaban-vendor-assets',
    regularAssets: 'kaban-regular-assets',
  },
  durations: {
    images: 365 * 24 * 60 * 60,
    fonts: 365 * 24 * 60 * 60,
    icons: 30 * 24 * 60 * 60,
    airlineIcons: 365 * 24 * 60 * 60,
    static: {
      hashed: 365 * 24 * 60 * 60,
      vendor: 30 * 24 * 60 * 60,
      regular: 2 * 60 * 60,
    },
    manifests: 7 * 24 * 60 * 60,
  },
  limits: {
    fonts: 30,
    images: 1000,
    icons: 500,
    airlineIcons: 200,
    hashedAssets: 200,
    vendorAssets: 100,
    regularAssets: 50,
    manifests: 100,
  },
} as const

interface ApiCacheRule {
  path: string
  cacheName: string
  strategy: 'CacheFirst' | 'NetworkFirst' | 'StaleWhileRevalidate'
  maxAgeSeconds: number
  maxEntries: number
}

const API_CACHE_RULES: ApiCacheRule[] = [
  {
    path: 'trip.list',
    cacheName: 'kaban-api',
    strategy: 'StaleWhileRevalidate',
    maxAgeSeconds: 1 * 60 * 60, // 1 час
    maxEntries: 10,
  },
  {
    path: 'day.getByTripId',
    cacheName: 'kaban-api-days',
    strategy: 'StaleWhileRevalidate',
    maxAgeSeconds: 1 * 60 * 60, // 1 час
    maxEntries: 50,
  },
  {
    path: 'trip.getByIdWithDays',
    cacheName: 'kaban-api-trip-details',
    strategy: 'NetworkFirst',
    maxAgeSeconds: 1 * 60 * 60, // 1 час
    maxEntries: 20,
  },
  {
    path: 'memory.getByTripId',
    cacheName: 'kaban-api-memories',
    strategy: 'StaleWhileRevalidate',
    maxAgeSeconds: 1 * 60 * 60, // 1 час
    maxEntries: 50,
  },
  {
    path: 'image.listByTrip',
    cacheName: 'kaban-api-route-images',
    strategy: 'StaleWhileRevalidate',
    maxAgeSeconds: 1 * 60 * 60, // 1 час
    maxEntries: 50,
  },
]

interface MessageHandlers {
  SKIP_WAITING: () => Promise<void>
  GET_CACHE_INFO: (port: MessagePort) => Promise<void>
  CLEAR_CACHE: (port: MessagePort, payload?: { cacheName?: string }) => Promise<void>
}

interface MessageHandlers {
  SKIP_WAITING: () => Promise<void>
  GET_CACHE_INFO: (port: MessagePort) => Promise<void>
  CLEAR_CACHE: (port: MessagePort, payload?: { cacheName?: string }) => Promise<void>
}

export {
  API_CACHE_RULES,
  type AssetType,
  CACHE_CONFIG,
  type CacheInfo,
  type MessageHandlers,
  type ServiceWorkerMessage,
}
