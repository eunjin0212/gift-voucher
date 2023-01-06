<template>
    <div> 
        <form 
            class="flex items-center" 
            :class="{ 'mt-5' : mt5 , 'justify-between items-center' : justifyBetween}"
            >
            <p class="mr-[12px]" :class="{ 'font-bold' : fontBold }"> 
                {{ toggleLabel }} 
            </p>
            <Switch
                as="button"
                v-model="enabled" :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
                <span aria-hidden="true" :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']" />
            </Switch>
        </form>
    </div>
</template>

<script>
import { Switch } from '@headlessui/vue'

export default{
    components : {
        Switch
    },
    props : {
        modelValue : [Boolean, String],
        toggleLabel : String,
        mt5 : Boolean,
        justifyBetween : Boolean,
        fontBold : Boolean,
        useStringValueObj : Object,
    },
    computed:{
        enabled:{
            get(){
                const self = this;

                if( typeof self.modelValue == 'string'){
                    return (self.useStringValueObj[true] == self.modelValue);
                }

                return this.modelValue
            },
            set(value){
                const self = this;
                let newValue = value;

                if( typeof self.modelValue == 'string'){
                    newValue = self.useStringValueObj[value];
                }

                self.$emit('update:modelValue', newValue );
                self.$emit('afterClick');
            }
        }
    },
    data(){
        return{
        }
    },
    methods : {
    },
    emits : ['update:modelValue', 'afterClick'],
    mounted(){
    }
}
</script>