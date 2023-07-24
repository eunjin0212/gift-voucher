<script setup>
import { defineProps } from "vue";
defineProps({
  text: String,
  fitContent: Boolean,
  width20: Boolean,
  width28: Boolean,
  width24: Boolean,
  width32: Boolean,
  width60 : Boolean,
  widthFull: Boolean,
  backgroundWhite: Boolean,
  backgroundIndigo2: Boolean,
  backgroundRed: Boolean,
  borderDashed: Boolean,
  borderRed: Boolean,

  fitHeight: Boolean,
  disabled: Boolean,
  height12: Boolean,
  bgWhiteAndtextIndigo: Boolean,
  inputtype: { type: String, required: false, default: "button" },
  buttonWarningRed : Boolean,
});
</script>

<template>
  <div>
    <input
        v-if="backgroundWhite"
        class="cursor-pointer border rounded border-gray-300 bg-white text-sm font-semibold  hover:bg-gray-100 transition-all duration-500 text-center"
        :class="{
            'px-5': fitContent,
            'w-96':
            !fitContent &&
            !width20 &&
            !width24 &&
            !width28 &&
            !width32 &&
            !width60 &&
            !widthFull,
            'w-fit': fitContent,
            'w-20': width20,
            'w-24': width24,
            'w-28': width28,
            'w-32': width32,
            'w-60' : width60,
            'w-full': widthFull,
            'border-dashed': borderDashed,
            'border-gray-400': borderDashed,
            'py-2.5': fitHeight,
            'h-fit': fitHeight,
            'h-14': !fitHeight && !height12,
            'h-12': height12,
            'text-gray-500' : !buttonWarningRed,
            'text-red-500' : buttonWarningRed,
        }"
        @click="$emit('clickEvent')"
        :disabled="disabled"
        :type="inputtype"
        :value="text"
    >
    <input
        v-else-if="disabled"
        class="border rounded border-gray-300 bg-gray-100 text-sm font-semibold transition-all duration-500 text-center"
        :class="{
            'px-5': fitContent,
            'w-96':
            !fitContent &&
            !width20 &&
            !width24 &&
            !width28 &&
            !width32 &&
            !width60 &&
            !widthFull,
            'w-fit': fitContent,
            'w-20': width20,
            'w-24': width24,
            'w-28': width28,
            'w-32': width32,
            'w-60' : width60,
            'w-full': widthFull,
            'border-dashed': borderDashed,
            'border-gray-400': borderDashed,
            'py-2.5': fitHeight,
            'h-fit': fitHeight,
            'h-14': !fitHeight && !height12,
            'h-12': height12,
            'text-gray-500' : !buttonWarningRed,
            'text-red-500' : buttonWarningRed,
        }"
        :disabled="true"
        :type="inputtype"
        :value="text"
    >
    <input
        v-else-if="backgroundIndigo2"
        class="cursor-pointer border rounded border-gray-300 bg-indigo-500/30 text-sm font-semibold text-indigo-500 hover:bg-indigo-500/50 transition-all duration-500 text-center"
        :class="{
            'px-5': fitContent,
            'w-96':
            !fitContent &&
            !width20 &&
            !width24 &&
            !width28 &&
            !width32 &&
            !width60 &&
            !widthFull,
            'w-fit': fitContent,
            'w-20': width20,
            'w-24': width24,
            'w-28': width28,
            'w-32': width32,
            'w-60' : width60,
            'w-full': widthFull,
            'border-dashed': borderDashed,
            'border-gray-400': borderDashed,
            'py-2.5': fitHeight,
            'h-fit': fitHeight,
            'h-14': !fitHeight && !height12,
            'h-12': height12,
        }"
        @click="$emit('clickEvent')"
        :disabled="disabled"
        :type="inputtype"
        :value="text"
    >
    <input
        v-else-if="backgroundRed"
        class="cursor-pointer border rounded border-red-500 bg-red-500 text-sm font-semibold text-white hover:bg-red-700 transition-all duration-500 text-center"
        :class="{
            'px-5': fitContent,
            'w-96':
            !fitContent &&
            !width20 &&
            !width24 &&
            !width28 &&
            !width32 &&
            !width60 &&
            !widthFull,
            'w-fit': fitContent,
            'w-20': width20,
            'w-24': width24,
            'w-28': width28,
            'w-32': width32,
            'w-60' : width60,
            'w-full': widthFull,
            'border-dashed': borderDashed,
            'border-gray-400': borderDashed,
            'py-2.5': fitHeight,
            'h-fit': fitHeight,
            'h-14': !fitHeight && !height12,
            'h-12': height12,
        }"
        @click="$emit('clickEvent')"
        :disabled="disabled"
        :type="inputtype"
        :value="text"
    >
    <input
        v-else-if="borderRed"
        class="cursor-pointer border rounded border-rose-400 w-24 h-10 text-sm font-semibold text-rose-400 hover:bg-red-100 transition-all duration-500 text-center"
        :class="{
            'px-5': fitContent,
            'w-96':
            !fitContent &&
            !width20 &&
            !width24 &&
            !width28 &&
            !width32 &&
            !width60 &&
            !widthFull,
            'w-fit': fitContent,
            'w-20': width20,
            'w-24': width24,
            'w-28': width28,
            'w-32': width32,
            'w-60' : width60,
            'w-full': widthFull,
            'border-dashed': borderDashed,
            'border-gray-400': borderDashed,
            'py-2.5': fitHeight,
            'h-fit': fitHeight,
            'h-14': !fitHeight && !height12,
            'h-12': height12,
        }"
        @click="$emit('clickEvent')"
        :disabled="disabled"
        :type="inputtype"
        :value="text"
    >
    <input
        v-else-if="bgWhiteAndtextIndigo"
        class="cursor-pointer border rounded bg-white text-sm font-semibold border-indigo-600 text-indigo-700 transition-all duration-500 text-center whitespace-pre-wrap"
        :class="{
            'px-5': fitContent,
            'w-96':
            !fitContent &&
            !width20 &&
            !width24 &&
            !width28 &&
            !width32 &&
            !width60 &&
            !widthFull,
            'w-fit': fitContent,
            'w-20': width20,
            'w-24': width24,
            'w-28': width28,
            'w-32': width32,
            'w-60' : width60,
            'w-full': widthFull,
            'border-dashed': borderDashed,
            'border-gray-400': borderDashed,
            'py-2.5': fitHeight,
            'h-fit': fitHeight,
            'h-14': !fitHeight && !height12,
            'h-12': height12,
        }"
        @click="$emit('clickEvent')"
        :disabled="disabled"
        :type="inputtype"
        :value="text"
    >
    <input
        v-else
        class="cursor-pointer border rounded border-indigo-600 bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition-all duration-500 text-center"
        :class="{
            'px-5': fitContent,
            'w-96':
            !fitContent &&
            !width20 &&
            !width24 &&
            !width28 &&
            !width32 &&
            !width60 &&
            !widthFull,
            'w-fit': fitContent,
            'w-20': width20,
            'w-24': width24,
            'w-28': width28,
            'w-32': width32,
            'w-60' : width60,
            'w-full': widthFull,
            'border-dashed': borderDashed,
            'border-gray-400': borderDashed,
            'py-2.5': fitHeight,
            'h-fit': fitHeight,
            'h-14': !fitHeight && !height12,
            'h-12': height12,
        }"
        @click="$emit('clickEvent')"
        :disabled="disabled"
        :type="inputtype"
        :value="text"
    >
  </div>
</template>
