import type { Product } from '@/types/product'

const createPresetProduct = (id: string, chineseName: string, koreanName: string, location: string, domesticPrice: string): Product => ({
  id,
  image: '',
  chineseName,
  koreanName,
  location,
  domesticPrice,
  completed: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  isPreset: true
})

export const presetProducts: Product[] = [
  createPresetProduct('preset-1', '雪花秀滋阴水乳套装', '설화수 자음수유 세트', '明洞乐天百货', '680元'),
  createPresetProduct('preset-2', '后天气丹套装', '후 천기단 세트', '新世界百货', '1280元'),
  createPresetProduct('preset-3', '兰芝睡眠面膜', '라네즈 수면 마스크', '弘大化妆品店', '180元'),
  createPresetProduct('preset-4', '爱茉莉护发精油', '아모레 헤어 오일', 'olive young', '89元'),
  createPresetProduct('preset-5', '正官庄红参液', '정관장 홍삼액', '免税店', '350元')
]
