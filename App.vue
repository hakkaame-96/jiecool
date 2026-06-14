<template>
  <div class="app-container">
    <van-nav-bar title="代购清单" fixed>
      <template #right>
        <van-icon 
          :name="isConnected ? 'wifi' : 'wifi-o'"
          :color="isConnected ? '#07c160' : '#999'"
          size="20"
          style="margin-right: 10px;"
        />
      </template>
    </van-nav-bar>

    <van-toast
      v-if="!isConnected && !isLoading"
      message="连接服务器失败，正在重试..."
      position="top"
      :duration="0"
    />

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

const isConnected = computed(() => productStore.isConnected)
const isLoading = computed(() => productStore.isLoading)

onMounted(() => {
  productStore.initData()
})
</script>

<style>
.app-container {
  min-height: 100vh;
  padding-top: 46px;
}
</style>