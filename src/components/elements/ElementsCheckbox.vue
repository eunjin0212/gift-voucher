<script>

export default {
    props : {
        text : String,
        id : String,
        modelValue : Boolean,
        disabled : Boolean
    },
    emits: ['click', 'update:modelValue'],
    data(){
        return{
            }
    },
    computed:{
        checked:{
            set(value){ 
                const self = this;
                self.$emit('update:modelValue', value); 
            },
            get(){return this.modelValue; }
        }
    },
    methods : {
        clickCheckbox(){
            const self = this;
            self.$emit('click');
            self.checked = !self.checked;
        }
    }
}

</script>

<template>
    <div class="relative mt-3.5 flex items-center gap-7"></div>
    <fieldset class="space-y-5">
        <div class="relative flex items-start">
            <div class="flex items-center h-5">
                <input
                    :id="id"
                    type="checkbox"
                    class="
                        focus:ring-indigo-500
                        h-4
                        w-4
                        text-indigo-600
                        border-gray-300
                        rounded
                    "
                    :checked="checked"
                    @input="clickCheckbox"
                    :disabled="disabled"
                />
            </div>
            <div class="ml-3 text-sm">
            <label :for="id" class="font-medium text-gray-500"> {{text}}</label>
            </div>
        </div>
    </fieldset>
</template>
