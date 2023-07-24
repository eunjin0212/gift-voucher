<script setup>
import MainHeader from "@/components/main/sections/MainHeader.vue";
import ErrorPopup from "@/components/ErrorPopup.vue";
import LoadingView from "@/components/elements/lodading.vue"

import { defineProps, defineEmits } from "vue";
defineProps({
    items: Array,
    headerName: String,
    headerImg: String,
    showBack: Boolean,
    isExcelNeeded : Boolean,
})

defineEmits(['clickDownExcel'])
</script>

<template>
    <div
        id="app-main"
        class="relative max-h-screen overflow-auto bg-gray-50 flex-1 flex flex-col px-14 py-20"
    >
        <MainHeader />
        <ErrorPopup />
        <h3 class="mt-7 text-sm font-medium text-gray-500">
            {{ items ? items.join(" / ") : "" }}
        </h3>
        <div class="flex justify-between w-full max-w-7xl ">
            <h1 class="mt-1.5 text-3xl font-semibold">
                <div v-if="!headerName">{{ items ? items[items.length - 1] : "" }}</div>
                <div v-else> {{ headerName }} </div>
            </h1>
            <ElementsButton
                v-if="isExcelNeeded"
                text="Download Excel"
                :fit-content="true"
                :height12="true"
                @click-event="$emit('clickDownExcel')"
            />
        </div>
        <slot class="mt-12"></slot>
        <Teleport to="body">
            <LoadingView />
        </Teleport>
    </div>
</template>
