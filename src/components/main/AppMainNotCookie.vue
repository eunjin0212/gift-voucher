<script setup>
import ErrorPopup from "@/components/ErrorPopup.vue";

import { defineProps } from "vue";
defineProps({
    items: Array,
});
</script>

<template>
    <ErrorPopup />
    <div
        id="app-main"
        class="relative max-h-screen overflow-auto bg-gray-50 flex-1 flex flex-col"
    >
        <slot class="mt-12"></slot>
    </div>
</template>
