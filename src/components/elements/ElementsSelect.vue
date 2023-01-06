<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { defineEmits, defineProps} from 'vue'


const props = defineProps({
  modelValue: String,
  name: String,
  options: Array,
  error: String,
  full: Boolean,
  width60: Boolean,
  width40: Boolean,
  placeholder: String,
  readonly: Boolean
})

const emit = defineEmits(['update:modelValue', 'change'])
const selectText = ref('')
const showOptions = ref(false)

onMounted(() => {
  const options = props['options']
  const option = options.find(option => option.value === props['modelValue'])

  if (option) {
    selectText.value = option.text
  }
})

function clickSelect() {
  if (!props['readonly']) {
    showOptions.value = !showOptions.value
  }
}

function clickOption(option) {
  emit('update:modelValue', option.value)
  selectText.value = option.text
  clickSelect()
  emit('change')
}
</script>

<template>
  <div>
    <h1 class="text-sm font-semibold text-slate-800">{{ name }}</h1>
    <div
        class="relative border rounded-lg py-1 px-3 max-w-6xl h-12 bg-white transition-all duration-500 shadow shadow-gray-100"
        :class="{ 'border-red-500': error, 'w-96': (!full && !width60 && !width40), 'w-full': full, 'w-60': width60, 'w-40': width40, 'mt-3': name }"
    >
      <a
          class="w-full h-full text-sm font-semi-bold cursor-pointer flex justify-between items-center"
          href="javascript:void(0)"
          @click="clickSelect"
      >
        <span :class="{ 'text-gray-400': !selectText && placeholder }">{{ selectText ? selectText : placeholder }}</span>
        <img
            src="@/assets/img/elements-select-1.svg"
            alt="elements-select-1"
            v-show="!readonly"
        />
      </a>
      <div
          v-show="showOptions"
          class="absolute top-11 left-0 border rounded-sm max-w-6xl max-h-36 bg-white transition-all duration-500 shadow shadow-gray-100 overflow-auto z-10"
          :class="{ 'border-red-500': error, 'w-96': (!full && !width60 && !width40), 'w-full': full, 'w-60': width60, 'w-40': width40 }"
      >
        <a
            v-for="option in options"
            :key="option.value"
            class="block px-3 py-0.5 w-full bg-white transition-all duration-500 cursor-pointer text-sm hover:bg-blue-500 hover:text-white"
            @click="clickOption(option)"
        >{{ option.text }}</a>
      </div>
    </div>
    <p class="mt-3.5 text-xs font-normal text-red-500" v-show="error">*{{ error }}</p>
  </div>
</template>

