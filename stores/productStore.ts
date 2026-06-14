import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, ProductCreateInput, ProductUpdateInput } from '@/types/product'

const API_BASE = import.meta.env.VITE_API_URL || ''

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const isLoading = ref(false)
  const isConnected = ref(false)
  const isOnline = ref(navigator.onLine)

  const completedCount = computed(() => products.value.filter(p => p.completed).length)
  const pendingCount = computed(() => products.value.filter(p => !p.completed).length)

  async function initData(): Promise<void> {
    isLoading.value = true
    try {
      await loadFromServer()
    } catch (error) {
      console.error('Failed to initialize data:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function loadFromServer(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/api/products`)
      if (response.ok) {
        products.value = await response.json()
        isConnected.value = true
      }
    } catch (error) {
      console.error('Failed to load products:', error)
      isConnected.value = false
    }
  }

  async function addProduct(input: ProductCreateInput): Promise<void> {
    isLoading.value = true
    try {
      const response = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      })
      if (response.ok) {
        const newProduct = await response.json()
        products.value.unshift(newProduct)
      } else {
        throw new Error('Failed to add product')
      }
    } catch (error) {
      console.error('Failed to add product:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function updateProduct(id: string, updates: ProductUpdateInput): Promise<void> {
    isLoading.value = true
    try {
      const response = await fetch(`${API_BASE}/api/products?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      if (response.ok) {
        const updated = await response.json()
        const index = products.value.findIndex(p => p.id === id)
        if (index !== -1) {
          products.value[index] = updated
        }
      } else {
        throw new Error('Failed to update product')
      }
    } catch (error) {
      console.error('Failed to update product:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function deleteProduct(id: string): Promise<void> {
    isLoading.value = true
    try {
      const response = await fetch(`${API_BASE}/api/products?id=${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        products.value = products.value.filter(p => p.id !== id)
      } else {
        throw new Error('Failed to delete product')
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function toggleComplete(id: string): Promise<void> {
    const product = products.value.find(p => p.id === id)
    if (product) {
      await updateProduct(id, { completed: !product.completed })
    }
  }

  function getProductById(id: string): Product | undefined {
    return products.value.find(p => p.id === id)
  }

  return {
    products,
    isLoading,
    isConnected,
    isOnline,
    completedCount,
    pendingCount,
    initData,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleComplete,
    getProductById
  }
})