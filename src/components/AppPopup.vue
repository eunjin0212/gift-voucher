<script setup>
import {defineProps, defineEmits} from 'vue'

defineProps({
  modelValue: Boolean,
  name: String,
  buttonText: String,
  height12: Boolean,
  backgroundWhite: Boolean,
  backgroundRed: Boolean,
  disabled: Boolean,
  useCancel: { type : Boolean, default : true } ,
  noneOverflowAuto:  { type : Boolean, default : false }
})

const emit = defineEmits(['update:modelValue', 'buttonEvent', 'afterClose'])

function hidePopup() {
  emit('update:modelValue', false)
  emit('afterClose');
}

function buttonEvent() {
  emit('buttonEvent')
}
</script>

<template>
  <div
      v-show="modelValue"
      class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
  >
    <div class="border rounded-lg shadow shadow-gray-100 bg-white">
      <div class="px-7 py-6 flex justify-between items-center">
        <h2 class="text-xl font-bold">{{ name }}</h2>
        <a
            href="javascript:void(0)"
            class="ml-20"
            @click="hidePopup"
        >
          <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
        </a>
      </div>
      <div class="w-full h-px bg-gray-200"></div>
      <div class="max-h-[70vh]"
            :class="[noneOverflowAuto ? '' : 'overflow-auto']">
        <slot />
      </div>
      <div v-if="buttonText" class="w-full h-px bg-gray-200"></div>
      <div
          class="px-4 py-6 flex justify-end"
          v-if="buttonText"
      >
        <ElementsButton
            v-if="useCancel"
            text="Cancel"
            :width28="true"
            :height12="true"
            :background-white="true"
            @click-event="hidePopup"
        />
        <ElementsButton
            class="ml-2"
            :backgroundWhite="backgroundWhite"
            :backgroundRed="backgroundRed"
            :disabled="disabled"
            :text="buttonText"
            :width28="true"
            :height12="true"
            @click-event="buttonEvent"
        />
      </div>
    </div>
  </div>
</template>