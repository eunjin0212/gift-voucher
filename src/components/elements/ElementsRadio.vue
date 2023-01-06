<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { defineEmits, defineProps} from 'vue'

const props = defineProps({
  modelValue: String,
  items: Array,
  readonly: Boolean
})

const emit = defineEmits(['update:modelValue'])
const checkedItem = ref('')

onMounted(() => {
  const items = props['items']
  const item = items.find(option => props['modelValue'] ? (option.value === props['modelValue']) : (option.isChecked))

  checkedItem.value = item.value
})

function isCheckedItem(value) {
  return value === checkedItem.value
}

function clickItem(item) {
  if (props['modelValue']) {
    emit('update:modelValue', item.value)
    checkedItem.value = item.value
  }
}
</script>

<template>
  <div>
    <template  v-for="(item, index) in items" v-bind:key="item">
    <div
        class="flex justify-center items-center gap-1"
        :class="{ 'mt-3.5': (index > 0) }"
        @click="clickItem"
    >
      <div
          class="border rounded-full w-3.5 h-3.5"
          :class="{ 'bg-gradient-to-br': isCheckedItem(item.value), 'border-rose-300': isCheckedItem(item.value), 'from-rose-300': isCheckedItem(item.value), 'to-pink-600': isCheckedItem(item.value) }"
      ></div>
      <div class="text-base font-medium text-slate-500">{{ item.text }}</div>
    </div>
    </template>
  </div>
</template>
