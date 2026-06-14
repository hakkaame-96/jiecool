<template>
  <div class="price-input">
    <span class="price-prefix">¥</span>
    <input
      type="text"
      class="price-field"
      :value="modelValue"
      @input="handleInput"
      placeholder="请输入价格"
    />
    <span class="price-suffix">元</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9.]/g, '')
  
  const parts = value.split('.')
  if (parts.length > 2) {
    return
  }
  
  if (parts[1] && parts[1].length > 2) {
    return
  }
  
  emit('update:modelValue', value)
}
</script>

<style scoped lang="scss">
.price-input {
  display: flex;
  align-items: center;
  background: #f7f8fa;
  border-radius: 4px;
  padding: 0 12px;
  height: 40px;
}

.price-prefix {
  font-size: 16px;
  color: #999;
  margin-right: 4px;
}

.price-field {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #333;
  outline: none;
}

.price-suffix {
  font-size: 16px;
  color: #999;
  margin-left: 4px;
}
</style>
