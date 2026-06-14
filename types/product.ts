export interface Product {
  id: string
  image: string
  chineseName: string
  koreanName: string
  location: string
  domesticPrice: string
  completed: boolean
  createdAt: number
  updatedAt: number
  isPreset: boolean
}

export interface ProductForm {
  image: string
  chineseName: string
  koreanName: string
  location: string
  domesticPrice: string
}

export type ProductCreateInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isPreset' | 'completed'>

export type ProductUpdateInput = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
