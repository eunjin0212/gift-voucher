<script>

export default{
    props : {
        selectOption : Array,
        name : String,
        modelValue : [ String, Boolean, Number ],
        readonly : Boolean,
        description: String,
    },
    emits : [ 'update:modelValue', 'changeButton'],
    methods : {
        toggleButton( item ){
            const self = this;
            if( self.readonly ) return;
            self.$emit('update:modelValue', item);
            self.$emit('changeButton');
        }
    },
    computed:{
        selectedButton(){
            const self = this;
            let selected = self.modelValue
            
            if( ! self.valueArray.includes(self.modelValue) || !self.modelValue  ){
                selected = self.valueArray[0];
            }
            
            self.$emit('update:modelValue', selected);
            return selected; 
        },
        valueArray(){
            const self = this;
            return self.selectOption.map( option => option.value );
        } 
    },
}

</script>

<template>
    <div class="flex flex-col">
        <label class=" mb-[9px]"> 
            <div class="text-[14px] text-[#504F54] font-bold"> {{ name }} </div>
            <p class="text-gray-400 text-[14px]"> {{ description }} </p>
        </label>
        <div class="flex">
            <template v-for="(item, index) in selectOption" :key="index">
                <button 
                    class="mr-[20px] h-[48px] w-[164px] font-medium text-[14px] text-gray-500 border-gray-300 border-[1px] rounded-[8px]" 
                    :class="{ 'border-solid border-1 border-indigo-500 shadow-sm text-indigo-500' : item.value === modelValue, 'bg-gray-100': readonly }" 
                    @click="toggleButton(item.value)">
                    {{ item.text }}
                </button>
            </template> 
        </div>
    </div>
</template>
