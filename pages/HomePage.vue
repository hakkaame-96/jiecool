<template>
  <div class="home-page">
    <div class="stats-bar">
      <div class="stat-item">
        <span class="stat-value pending">{{ productStore.pendingCount }}</span>
        <span class="stat-label">待采购</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-value completed">{{ productStore.completedCount }}</span>
        <span class="stat-label">已完成</span>
      </div>
    </div>

    <div class="product-list">
      <van-empty v-if="productStore.products.length === 0" description="暂无商品" />
      <div v-else>
        <ProductCard
          v-for="product in productStore.products"
          :key="product.id"
          :product="product"
          @delete="handleDelete"
          @toggle="handleToggle"
          @edit="handleEdit"
        />
      </div>
    </div>

    <van-button
      type="primary"
      round
      block
      class="add-button"
      @click="goToAdd"
      :loading="productStore.isLoading"
      :disabled="productStore.isLoading"
    >
      <van-icon name="plus" />
      添加商品
    </van-button>
  </div>
</template>

<script setup lang="ts">
import { showLoadingToast, closeToast, showToast } from 'vant'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/productStore'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const router = useRouter()

async function handleDelete(id: string) {
  showLoadingToast({ message: '删除中...', forbidClick: true })
  try {
    await productStore.deleteProduct(id)
    showToast('删除成功')
  } catch (error) {
    showToast('删除失败，请重试')
    console.error('Delete error:', error)
  } finally {
    closeToast()
  }
}

async function handleToggle(id: string) {
  try {
    await productStore.toggleComplete(id)
  } catch (error) {
    showToast('操作失败，请重试')
    console.error('Toggle error:', error)
  }
}

function handleEdit(id: string) {
  router.push(`/edit/${id}`)
}

function goToAdd() {
  router.push('/edit')
}
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.stats-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  margin: 12px;
  border-radius: 12px;
  color: #fff;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;

  &.pending {
    color: #ffd93d;
  }

  &.completed {
    color: #6bcb77;
  }
}

.stat-label {
  font-size: 14px;
  opacity: 0.8;
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

.product-list {
  padding: 0 12px;
}

.add-button {
  position: fixed;
  bottom: 20px;
  left: 12px;
  right: 12px;
  height: 48px;
}
</style>