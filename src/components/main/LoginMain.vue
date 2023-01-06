<script setup>
import { defineProps } from "vue";
defineProps({
  items: Array,
});

</script>

<template>
  <div
    id="app-main"
    class="relative max-h-screen overflow-auto bg-gray-50 flex-1 flex flex-col"
  >
    <slot></slot>
  </div>
</template>
