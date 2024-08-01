<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: [String, Number],
  name: String,
  placeholder: String,
  error: String,
  full: Boolean,
  width14: Boolean,
  width40 : Boolean,
  width56: Boolean,
  width24: Boolean,
  width32: Boolean,
  width60: Boolean,
  width72: Boolean,
  width25rem: Boolean,
  height11: Boolean,
  height12: Boolean,
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: Boolean,
  isNumber: Boolean,
  inputName: String,
  inputtype: String,
  maxNumber: Number,
  minNumber: Number,
  maxlength: Number,
  required : Boolean,
  isError : Boolean,
  textCenter : Boolean,
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <h1 v-if="name" class="text-sm font-semibold text-slate-800">{{ name }}</h1>
    <div>
      <input
        class="block shadow shadow-gray-100 border-gray-200 rounded-md text-sm font-semibold"
        :class="{
          'h-11': height11,
          'h-12': height12,
          'focus:ring-indigo-500': !readonly,
          'focus:border-indigo-500': !readonly,
          'text-right': isNumber,
          'mt-3': name,
          'border-red-500': error || isError,
          'w-96': !full && !width24 && !width14 && !width60 && !width72 && !width56 && !width40 && !width25rem,
          'border-red-500': error,
          'w-96': !full && !width24 && !width14 && !width60 && !width72 && !width32 && !width25rem,
          'w-60': width60,
          'w-56': width56,
          'w-40': width40,
          'w-full': full,
          'w-24': width24,
          'w-14': width14,
          'w-72': width72,
          'w-32': width32,
          'bg-gray-100': disabled,
          'text-center' : textCenter,
          'w-[25rem]': width25rem,
        }"
        :type="inputtype || 'text'"
        :placeholder="placeholder"
        :value="modelValue"
        :readonly="readonly"
        :disabled="disabled"
        :max="maxNumber"
        :min="minNumber"
        @input="$emit('update:modelValue', $event.target.value)"
        :name="inputName"
        :maxlength="maxlength ? maxlength : 100"
        :required="required"
      />
    </div>
    <p class="mt-1.5 text-xs font-normal text-red-500" v-show="error">
      *{{ error }}
    </p>
  </div>
</template>
