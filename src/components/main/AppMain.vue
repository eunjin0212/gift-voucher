<script setup>
import MainHeader from "@/components/main/sections/MainHeader.vue";
import ErrorPopup from "@/components/ErrorPopup.vue";
import LoadingView from "@/components/elements/lodading.vue"

import { defineProps } from "vue";
defineProps({
    items: Array,
    headerName: String,
    headerImg: String,
    showBack: Boolean,
});
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
        <h1 class="mt-1.5 text-3xl font-semibold">
            <div v-if="!headerName">{{ items ? items[items.length - 1] : "" }}</div>
            <div v-else> {{ headerName }} </div>
        </h1>
        <slot class="mt-12"></slot>
        <Teleport to="body">
            <LoadingView />
        </Teleport>
    </div>
</template>
