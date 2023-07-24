<script>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

export default {
    components:{
        Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, CheckIcon, SelectorIcon
    },
    props: {
        modelValue: {
            type : [String, Object, Number, Boolean],
            default : true
        },
        isError : Boolean,
        name: String,
        error: String,
        readonly: Boolean,
        options: {
            type : Array,
            // eslint-disable-next-line vue/require-valid-default-prop
            default : [
                { text : null, value: null }
            ],
        minSize : {
                type : String,
                default : null,
            },
        },
        defaultMsg : {
            type : String,
            default : "Select an Option"
        },
        useDefaultMsg : {
            type : Boolean,
            default : false
        },
        minWFit : Boolean,
        full: Boolean,
        width60: Boolean,
        width40: Boolean,
        width20: Boolean,
    },
    emits: ["change", "update:modelValue"],
    data() {
        return {
            showOptions: false,
            selectText: null,
        };
    },
    computed:{
        selectOption(){
            const self = this;
            const option = [...self.options]
            if(self.useDefaultMsg){
                option.unshift({ text : self.defaultMsg, value: null });
            }
            return option;
        },
        selected:{
            get(){
                const self = this;
                if( !self.modelValue && self.useDefaultMsg ) {
                    return self.selectOption[0];
                }

                // modelValue 가 object {} 인 경우 include로 찾을 수 없음
                const isInclude = self.valueArray.some( i => JSON.stringify(i) == JSON.stringify(self.modelValue) ) ;
                if( self.modelValue && !isInclude ) {
                    self.$emit('update:modelValue', self.valueArray[0]);
                }

                return self.selectOption.find( item => JSON.stringify(item.value) == JSON.stringify( self.modelValue ) );
            },
            set( value ){
                const self = this;
                self.$emit('update:modelValue', value );
                self.$emit('change');
            }
        },
        valueArray(){
            const self = this;
            return self.options.filter(option => option.value != null ).map( option => option.value );
        }
    },
    methods: {
    },
    mounted() {
    },
};
</script>

<template>
<div class="relative">

<!-- <select name="pets" v-model="selected.value">
    <option :value="modelValue"> {{ modelValue }}</option>
    <template  v-for="item in options" :key="item.value" >
        <option :value="item.value">{{item.text}}</option>
    </template>
</select> -->


    <Listbox as="div" v-model="selected" :disabled="readonly">
        <ListboxLabel class="text-sm font-light text-zinc-500" v-show="name"> {{ name }} </ListboxLabel>
        <div class="mt-1 relative" @click="click">
        <ListboxButton class="bg-white relative border border-gray-300 rounded-md shadow-sm pl-3
                pr-10 py-2 text-left cursor-default max-w-6xl
                focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                :class="{ 'w-96': (!full && !width60 && !width40), 'w-full': full, 'w-60': width60, 'w-40': width40, 'w-20': width20, 'bg-gray-100': readonly , 'border-red-600 border-2' : isError}"
                >
            <span
                class="block truncate text-base font-light "
                :class="{ 'text-gray-400': ! modelValue }"
                >
                    {{ selected?.text || defaultMsg }}
            </span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <ListboxOptions
                class="absolute z-10 mt-1  max-w-6xl bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                :class="{ 'w-96': (!full && !width60 && !width40), 'w-full': full, 'w-60': width60, 'w-40': width40, 'w-20': width20 }"
                >
            <ListboxOption as="template" v-for="item in selectOption" :key="item.value" :value="item.value" v-slot="{ active, selected }" >
                <li :class="[active ? 'text-sm text-white bg-indigo-600' : 'text-sm font-light text-zinc-500', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                <span
                    :class="{ 'font-semibold' : selected,  'font-normal' : !selected, 'min-w-fit' : minWFit  }"
                    class="block truncate"
                    >
                    {{ item.text }}
                </span>
                </li>
            </ListboxOption>
            </ListboxOptions>
        </transition>
        </div>
    </Listbox>
    <p class="mt-3.5 text-xs font-normal text-red-500" v-show="error">{{ error }}</p>
</div>
</template>
