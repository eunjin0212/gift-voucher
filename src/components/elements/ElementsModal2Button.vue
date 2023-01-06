<script>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'

export default{
    components:{
        Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, ExclamationIcon
    },
    props:{
        modelValue : Boolean,
        modalTitle : String,
        modalContent : String, 
        buttonText : String,
    },
    emits: ['update:modelValue', 'afterClick'],
    data(){
        return{

        }
    },
    methods:{
        clickCancelButton(){
            const self = this;
            self.$emit('update:modelValue', false)
        }
    }
}

</script>

<template>
<TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="relative z-20" @close="$emit('update:modelValue', false)">
    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    </TransitionChild>

    <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
            <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> {{ modalTitle }} </DialogTitle>
                <div class="mt-2">
                    <p class="text-sm text-gray-500">{{ modalContent }}</p>
                    <div class="max-h-[70vh] overflow-auto">
                        <slot />
                    </div>
                </div>
                </div>
            </div>
            <div
                class="px-4 py-3 flex justify-end"
            >
                <ElementsButton
                    text="Cancel"
                    :width28="true"
                    :height12="true"
                    :background-white="true"
                    @click-event="clickCancelButton"
                />
                <ElementsButton
                    class="ml-2"
                    :backgroundWhite="false"
                    :text="buttonText"
                    :width28="true"
                    :height12="true"
                    @click-event="$emit('afterClick')"
                />
            </div>
            </DialogPanel>
        </TransitionChild>
        </div>
    </div>
    </Dialog>
</TransitionRoot>
</template>

