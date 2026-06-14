import { NextResponse } from 'next/server'

interface Product {
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

const defaultProducts: Product[] = [
  {
    id: 'preset-1',
    image: '',
    chineseName: '雪花秀滋阴水乳套装',
    koreanName: '설화수 자음수유 세트',
    location: '明洞乐天百货',
    domesticPrice: '680元',
    completed: false,
    createdAt: Date.now() - 500000000,
    updatedAt: Date.now() - 500000000,
    isPreset: true
  },
  {
    id: 'preset-2',
    image: '',
    chineseName: '后天气丹套装',
    koreanName: '후 천기단 세트',
    location: '新世界百货',
    domesticPrice: '1280元',
    completed: false,
    createdAt: Date.now() - 400000000,
    updatedAt: Date.now() - 400000000,
    isPreset: true
  },
  {
    id: 'preset-3',
    image: '',
    chineseName: '兰芝睡眠面膜',
    koreanName: '라네즈 수면 마스크',
    location: '弘大化妆品店',
    domesticPrice: '180元',
    completed: false,
    createdAt: Date.now() - 300000000,
    updatedAt: Date.now() - 300000000,
    isPreset: true
  },
  {
    id: 'preset-4',
    image: '',
    chineseName: '爱茉莉护发精油',
    koreanName: '아모레 헤어 오일',
    location: '明洞专卖店',
    domesticPrice: '89元',
    completed: false,
    createdAt: Date.now() - 200000000,
    updatedAt: Date.now() - 200000000,
    isPreset: true
  },
  {
    id: 'preset-5',
    image: '',
    chineseName: '正官庄红参液',
    koreanName: '정관장 홍삼액',
    location: '免税店',
    domesticPrice: '299元',
    completed: false,
    createdAt: Date.now() - 100000000,
    updatedAt: Date.now() - 100000000,
    isPreset: true
  }
]

let products: Product[] = [...defaultProducts]

export async function GET() {
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const now = Date.now()
    const newProduct: Product = {
      ...body,
      id: `product_${now}`,
      completed: false,
      createdAt: now,
      updatedAt: now,
      isPreset: false
    }
    
    products.push(newProduct)
    
    return NextResponse.json(newProduct)
  } catch (error) {
    console.error('POST error:', error)
    return NextResponse.json({ error: 'Failed to add product' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }
    
    const body = await request.json()
    const index = products.findIndex(p => p.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    const updated: Product = {
      ...products[index],
      ...body,
      updatedAt: Date.now()
    }
    
    products[index] = updated
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('PUT error:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }
    
    const index = products.findIndex(p => p.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    products.splice(index, 1)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}