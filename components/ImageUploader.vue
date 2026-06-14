<template>
  <div class="image-uploader">
    <div v-if="modelValue" class="image-preview" @click="preview">
      <img :src="modelValue" alt="商品图片" />
      <div class="image-remove" @click.stop="remove">
        <van-icon name="clear" />
      </div>
    </div>
    <div v-else class="image-placeholder" @click="upload">
      <van-icon name="plus" size="32" />
      <span>点击上传图片</span>
    </div>
    <input ref="fileInput" type="file" accept="image/*" hidden @change="handleFile" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showLoadingToast, closeToast, showToast, showImagePreview } from 'vant'
import { compressImage } from '@/utils/imageCompress'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)

function upload() {
  fileInput.value?.click()
}

async function handleFile(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  try {
    showLoadingToast({ message: '压缩中...', forbidClick: true })
    const compressed = await compressImage(file)
    emit('update:modelValue', compressed)
    closeToast()
  } catch {
    closeToast()
    showToast('图片压缩失败')
  }

  target.value = ''
}

function preview() {
  showImagePreview({ images: [props.modelValue] })
}

function remove() {
  emit('update:modelValue', '')
}
</script>

<style scoped lang="scss">
.image-uploader {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border: 2px dashed #eee;
  overflow: hidden;

  &.has-image {
    border-style: solid;
    border-color: #1989fa;
  }
}

.image-preview {
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-remove {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  gap: 4px;

  span {
    font-size: 12px;
  }
}
</style>
