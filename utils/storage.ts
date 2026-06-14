import type { Product } from '@/types/product'

export const STORAGE_KEY = 'daigou_products'

export function saveProducts(products: Product[]): void {
  const data = {
    products,
    version: '1.0.0',
    updatedAt: Date.now()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const data = JSON.parse(raw)
    return data.products || []
  } catch {
    return []
  }
}

export function clearProducts(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function getStorageSize(): number {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? raw.length * 2 : 0
}

export const STORAGE_WARNING_SIZE = 4 * 1024 * 1024
export const STORAGE_MAX_SIZE = 4.5 * 1024 * 1024
