<script setup>
import { defineProps, defineEmits } from "vue";
import { CheckIcon, ExclamationIcon } from "@heroicons/vue/outline";

defineProps({
  modelValue: Boolean,
  name: String,
  buttonText: String,
  warn: Boolean,
});

const emit = defineEmits(["buttonEvent"]);

function buttonEvent() {
  emit("buttonEvent");
}
</script>

<template>
  <div
    v-show="modelValue"
    class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
  >
    <div class="border rounded-lg shadow shadow-gray-300 bg-white">
      <div class="px-7 py-4 flex justify-between items-center">
        <div
          class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
          :class="{'bg-red-100':warn}"
        >
          <ExclamationIcon v-if="warn" class="h-6 w-6 text-red-600" aria-hidden="true"/>
          <CheckIcon v-else class="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
      </div>
      <div class="mt-3 text-center sm:mt-5">
        <h3 class="text-xl leading-6 font-bold text-gray-900">{{ name }}</h3>
        <div class="mt-2">
          <slot />
        </div>
      </div>
      <div class="px-4 py-6 flex justify-end">
        <ElementsButton
          class="ml-2"
          :backgroundRed="warn"
          :text="buttonText"
          @click-event="buttonEvent"
        />
      </div>
    </div>
  </div>
</template>
