import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, ProductCreateInput, ProductUpdateInput } from '@/types/product'
import { loadProducts, saveProducts } from '@/utils/storage'
import { isFirstLaunch, markAsLaunched } from '@/utils/firstLaunch'
import { presetProducts } from '@/presets/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

  const completedCount = computed(() => products.value.filter(p => p.completed).length)
  const pendingCount = computed(() => products.value.filter(p => !p.completed).length)

  function initData(): void {
    if (isFirstLaunch()) {
      products.value = [...presetProducts]
      markAsLaunched()
      saveProducts(products.value)
    } else {
      products.value = loadProducts()
    }
  }

  function addProduct(input: ProductCreateInput): void {
    const now = Date.now()
    const newProduct: Product = {
      ...input,
      id: `prod-${now}`,
      completed: false,
      createdAt: now,
      updatedAt: now,
      isPreset: false
    }
    products.value.unshift(newProduct)
    saveProducts(products.value)
  }

  function updateProduct(id: string, updates: ProductUpdateInput): void {
    const index = products.value.findIndex(p => p.id === id)
    if (index === -1) return

    const shouldClearPreset = updates.chineseName !== undefined || updates.image !== undefined

    products.value[index] = {
      ...products.value[index],
      ...updates,
      updatedAt: Date.now(),
      isPreset: shouldClearPreset ? false : products.value[index].isPreset
    }
    saveProducts(products.value)
  }

  function deleteProduct(id: string): void {
    products.value = products.value.filter(p => p.id !== id)
    saveProducts(products.value)
  }

  function toggleComplete(id: string): void {
    const product = products.value.find(p => p.id === id)
    if (product) {
      product.completed = !product.completed
      product.updatedAt = Date.now()
      saveProducts(products.value)
    }
  }

  function getProductById(id: string): Product | undefined {
    return products.value.find(p => p.id === id)
  }

  return {
    products,
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