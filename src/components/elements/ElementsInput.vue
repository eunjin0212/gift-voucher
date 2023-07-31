<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: [String, Number],
  name: String,
  placeholder: String,
  error: String,
  full: Boolean,
  width24: Boolean,
  width14: Boolean,
  width60: Boolean,
  width72: Boolean,
  height11: Boolean,
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
  isError : Boolean
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <h1 v-if="name" class="text-sm font-semibold text-slate-800">{{ name }}</h1>
    <div>
      <input
        class="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
        :class="{
          'h-11': height11,
          'focus:ring-indigo-500': !readonly,
          'focus:border-indigo-500': !readonly,
          'text-right': isNumber,
          'mt-3': name,
          'border-red-500': error || isError,
          'w-96': !full && !width24 && !width14 && !width60 && !width72,
          'w-60': width60,
          'w-full': full,
          'w-24': width24,
          'w-14': width14,
          'w-72': width72,
          'bg-gray-100': disabled,
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
