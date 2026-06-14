<template>
  <div class="edit-page">
    <van-nav-bar
      :title="isEdit ? '编辑商品' : '添加商品'"
      left-text="返回"
      @click-left="goBack"
    />

    <div class="form-container">
      <van-form @submit="handleSubmit">
        <van-cell-group inset>
          <van-cell title="商品图片" required>
            <template #right-icon>
              <ImageUploader v-model="formData.image" />
            </template>
          </van-cell>

          <van-field
            v-model="formData.chineseName"
            label="中文名称"
            placeholder="请输入中文名称"
            required
          />

          <van-field
            v-model="formData.koreanName"
            label="韩文名称"
            placeholder="请输入韩文名称（可选）"
          />

          <van-field
            v-model="formData.location"
            label="代购地点"
            placeholder="如：明洞乐天百货"
            required
          />

          <van-field
            v-model="formData.domesticPrice"
            label="国内价格"
            placeholder="请输入国内价格"
            required
          >
            <template #right-icon>
              <span class="price-hint">元</span>
            </template>
          </van-field>
        </van-cell-group>

        <van-button
          type="primary"
          round
          block
          class="submit-button"
          native-type="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          {{ isEdit ? '保存修改' : '添加商品' }}
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, ref } from 'vue'
import { showToast, showLoadingToast, closeToast } from 'vant'
import ImageUploader from '@/components/ImageUploader.vue'
import { useProductStore } from '@/stores/productStore'
import { useRoute, useRouter } from 'vue-router'
import type { ProductForm, ProductCreateInput, ProductUpdateInput } from '@/types/product'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const isEdit = computed(() => !!route.params.id)
const isSubmitting = ref(false)

const formData = reactive<ProductForm>({
  image: '',
  chineseName: '',
  koreanName: '',
  location: '',
  domesticPrice: ''
})

onMounted(() => {
  if (isEdit.value && route.params.id) {
    const product = productStore.getProductById(route.params.id as string)
    if (product) {
      formData.image = product.image
      formData.chineseName = product.chineseName
      formData.koreanName = product.koreanName
      formData.location = product.location
      formData.domesticPrice = product.domesticPrice.replace('元', '')
    }
  }
})

function goBack() {
  router.back()
}

function validateForm(): boolean {
  if (!formData.image) {
    showToast('请上传商品图片')
    return false
  }
  if (!formData.chineseName.trim()) {
    showToast('请输入中文名称')
    return false
  }
  if (!formData.location.trim()) {
    showToast('请输入代购地点')
    return false
  }
  if (!formData.domesticPrice.trim()) {
    showToast('请输入国内价格')
    return false
  }
  return true
}

async function handleSubmit() {
  if (!validateForm()) return

  isSubmitting.value = true
  showLoadingToast({ message: isEdit.value ? '保存中...' : '添加中...', forbidClick: true })

  try {
    if (isEdit.value && route.params.id) {
      const updates: ProductUpdateInput = {
        image: formData.image,
        chineseName: formData.chineseName.trim(),
        koreanName: formData.koreanName.trim(),
        location: formData.location.trim(),
        domesticPrice: `${formData.domesticPrice}元`
      }
      await productStore.updateProduct(route.params.id as string, updates)
      showToast('修改成功')
    } else {
      const input: ProductCreateInput = {
        image: formData.image,
        chineseName: formData.chineseName.trim(),
        koreanName: formData.koreanName.trim(),
        location: formData.location.trim(),
        domesticPrice: `${formData.domesticPrice}元`
      }
      await productStore.addProduct(input)
      showToast('添加成功')
    }

    setTimeout(() => {
      router.back()
    }, 500)
  } catch (error) {
    showToast('操作失败，请重试')
    console.error('Submit error:', error)
  } finally {
    isSubmitting.value = false
    closeToast()
  }
}
</script>

<style scoped lang="scss">
.edit-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.form-container {
  padding: 12px;
}

.price-hint {
  font-size: 14px;
  color: #999;
}

.submit-button {
  margin-top: 20px;
  height: 48px;
}
</style>