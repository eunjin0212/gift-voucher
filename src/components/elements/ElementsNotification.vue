<script>
import { CheckCircleIcon , ExclamationIcon} from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/solid";

export default {
    components: {
        CheckCircleIcon,
        XIcon,
        ExclamationIcon
    },
    emits:['update:modelValue'],
    props:{
        modelValue: Boolean,
        detailMsg : String, 
        notificationMsg : {
            type : String,
            default: "Successfully saved!"
        },
        warning : {
            type : Boolean,
            default : false
        },
        afterClose : {
            type : Function,
            default : null
        },
        clickMessage : {
            type : Function,
            default : null
        },
        autoCloseSeconds : {
            type : Number,
            default : 3,
        },
    },
    computed:{
        showNoti:{
            set(value){
                const self = this;
                self.$emit('update:modelValue', value);
                return value
                },
            get(){
                const self = this; 
                self.closeAlertAfterSec();
                return self.modelValue;
            }
        }
    },
    data(){
        return{
        }
    },
    methods:{
        closeAlert(){
            const self = this;
            if( self.showNoti && self.afterClose){
                self.afterClose();
            }
            self.showNoti = false;
        },
        closeAlertAfterSec(){
            const self = this;
            setTimeout(() => {
                setTimeout(() => self.closeAlert(), self.autoCloseSeconds*1000);
            })
        },
        onClickMessage(){
            const self = this;
            self.clickMessage && self.clickMessage();
        },
    }
};
</script>

<template>
    <!-- Global notification live region, render this permanently at the end of the document -->
    <div
        aria-live="assertive"
        class="
            fixed
            inset-0
            top-14
            flex
            items-end
            px-4
            py-6
            z-30
            pointer-events-none
            sm:p-6 sm:items-start
        "
    >
        <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
            <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
            <transition
                enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="showNoti"
                    class="
                        max-w-sm
                        w-full
                        bg-white
                        shadow-lg
                        rounded-lg
                        pointer-events-auto
                        ring-1 ring-black ring-opacity-5
                        overflow-hidden
                    "
                >
                    <div class="p-4">
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <ExclamationIcon v-if="warning" class="h-6 w-6 text-red-400" aria-hidden="true"/>
                                <CheckCircleIcon
                                    v-else 
                                    class="h-6 w-6 text-green-400"
                                    aria-hidden="true"
                                />

                            </div>
                            <div class="ml-3 w-0 flex-1 pt-0.5"
                                @click="onClickMessage">
                                <p class="text-sm font-medium text-gray-900">
                                    {{ notificationMsg }}
                                </p>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{ detailMsg }}
                                </p>
                            </div>
                            <div class="ml-4 flex-shrink-0 flex">
                                <button
                                    @click="closeAlert"
                                    class="
                                        bg-white
                                        rounded-md
                                        inline-flex
                                        text-gray-400
                                        hover:text-gray-500
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-offset-2
                                        focus:ring-indigo-500
                                    "
                                >
                                    <span class="sr-only">Close</span>
                                    <XIcon class="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

