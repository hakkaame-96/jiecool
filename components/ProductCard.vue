<template>
  <div class="product-card" :class="{ 'is-completed': product.completed }">
    <div class="card-checkbox" @click="toggle">
      <van-checkbox :model-value="product.completed" @change="toggle" />
    </div>
    <div class="card-image" @click="previewImage">
      <img :src="product.image || defaultImage" alt="商品图片" />
    </div>
    <div class="card-content">
      <h3 class="card-name">{{ product.chineseName }}</h3>
      <p class="card-korean">{{ product.koreanName }}</p>
      <div class="card-meta">
        <span class="meta-item">{{ product.location }}</span>
        <span class="meta-divider">|</span>
        <span class="meta-price">{{ product.domesticPrice }}</span>
      </div>
    </div>
    <div class="card-actions">
      <van-button size="small" type="primary" plain @click="edit">
        <van-icon name="edit" />
      </van-button>
      <van-button size="small" type="danger" plain @click="handleDelete">
        <van-icon name="delete" />
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showDialog, showImagePreview } from 'vant'
import type { Product } from '@/types/product'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete', id: string): void
  (e: 'toggle', id: string): void
  (e: 'edit', id: string): void
}>()

const defaultImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23eee" width="100" height="100"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="12" x="50" y="55" text-anchor="middle"%3E暂无图片%3C/text%3E%3C/svg%3E'

function toggle() {
  emit('toggle', props.product.id)
}

function edit() {
  emit('edit', props.product.id)
}

async function handleDelete() {
  const result = await showDialog({
    message: '确定删除这个商品吗？',
    confirmButtonText: '删除',
    cancelButtonText: '取消'
  })

  if (result) {
    emit('delete', props.product.id)
  }
}

function previewImage() {
  showImagePreview({ images: [props.product.image || defaultImage] })
}
</script>

<style scoped lang="scss">
.product-card {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &.is-completed {
    opacity: 0.6;

    .card-name,
    .card-korean,
    .meta-item,
    .meta-price {
      text-decoration: line-through;
    }
  }
}

.card-checkbox {
  margin-right: 12px;
  padding: 4px;
}

.card-image {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.card-content {
  flex: 1;
  margin-left: 12px;
  overflow: hidden;
}

.card-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-korean {
  font-size: 12px;
  color: #999;
  margin: 0 0 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-item {
  font-size: 12px;
  color: #666;
}

.meta-divider {
  color: #ddd;
}

.meta-price {
  font-size: 12px;
  color: #ff6b6b;
  font-weight: 500;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-left: 12px;
}
</style>
