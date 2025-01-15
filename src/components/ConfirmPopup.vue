<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: Boolean,
    confirmDescription: String,
    buttonText: String,
    isBold: { type: Boolean, default: true },
    isTextLg: { type: Boolean, default: false },
    hasAfterConfirm: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue', 'after-confirm']);

function clickConfirm() {
    if (props.hasAfterConfirm) {
        emit('after-confirm');
    } else {
        emit('update:modelValue', false);
    }
}

function closePopup() {
    emit('update:modelValue', false);
}
</script>

<template>
    <div v-show="modelValue" class="fixed top-0 w-full h-full bg-black/50 z-[80] flex justify-center items-center">
        <div class="w-[29rem] h-52 p-4 border rounded-lg shadow shadow-gray-100 bg-white flex flex-col justify-center items-center gap-6">
            <p class="text-[#504F54] text-center" :class="[props.isBold ? 'font-bold' : 'font-normal', props.isTextLg ? 'text-lg' : 'text-xl']">
                {{ confirmDescription }}
            </p>
            <div class="flex justify-center items-center gap-4">
                <button @click="closePopup" class="w-40 h-12 border rounded-lg text-[#767676] text-base font-semibold">Cancel</button>
                <button @click="clickConfirm" class="w-40 h-12 border rounded-lg text-base font-semibold bg-blue-600 text-white">{{ buttonText }}</button>
            </div>
        </div>
    </div>
</template>
