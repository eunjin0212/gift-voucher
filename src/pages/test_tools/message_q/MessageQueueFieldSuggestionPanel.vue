<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="closePanel">
            <div class="fixed inset-0" />

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto min-w-half-vw">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                    <div class="px-4 sm:px-6">
                                        <div class="flex items-start justify-between">
                                            <DialogTitle class="text-lg font-medium text-gray-900">Suggestions</DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closePanel">
                                                    <span class="sr-only">Close panel</span>
                                                    <XIcon class="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                        <!-- Replace with your content -->
                                        <div class="absolute inset-0 px-4 sm:px-6">
                                            <div class="border-2 border-solid border-gray-200 p-2 gap-4 mb-2 flex flex-col items-center" aria-hidden="true">
                                                <template v-for="(item, index) in listingSuggestionKeywords" v-bind:key="index">
                                                    <div class="w-full border rounded border-gray-300 p-2 hover:bg-gray-400 cursor-pointer"
                                                        @click="onClickItem(item.value)">
                                                        <h4>{{item.text}}</h4>
                                                        <span class="text-gray-900">{{item.value}}</span>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                        <!-- /End replace -->
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'

const props = defineProps({
    open: Boolean,
    list: Array,
});

const emit = defineEmits(['update:open']);
function closePanel() {
    emit("update:open", false);
}
function onClickItem(v) {
    emit("chooseSuggestItem", v);
    closePanel();
}

const listingSuggestionKeywords = computed(() => {
    return props.list;
});

</script>