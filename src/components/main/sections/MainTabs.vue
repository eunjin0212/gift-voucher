<script setup>
import { defineProps } from "vue";

defineProps({
  tabs: Array,
});
</script>

<template>
  <div
      
      id="main-tabs"
      class="border-b border-gray-300 bg-transparent"
  >
  <template v-for="(tab, index) in tabs" v-bind:key="tab.index">
    <a 
        class="inline-block border-b-4 pb-1.5 text-base font-semibold text-gray-500 transition-all duration-500"
        :class="{ 'ml-14': index > 0, 'border-transparent': !tab.current, 'border-indigo-600': tab.current, 'text-black': tab.current }"

        href="javascript:void(0)"
        @click="$emit('clickEvent', tab.name)"
    >{{ tab.text }} <span v-if="tab.count"> ({{tab.count}}) </span> </a>
  </template>
  </div>
</template>