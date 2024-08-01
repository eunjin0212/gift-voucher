<script>
import Datepicker from 'vue3-datepicker';
import moment from 'moment-timezone';

export default {
    components: {
        Datepicker,
    },
    props: {
        modelValue: String, // "YYYYMMDD"
        name: String,
        error: String,
        disabled: Boolean,
        isNotBgWhite: Boolean,
        minDate: Date,
        maxDate: Date,
        startingView: { type: String, default: 'day' },
        format: { type: String, default: 'YYYYMMDD' },
        displayFormat: { type: String, default: 'MM/dd/yyyy' },
        placeholder: String,
        addedClass: String,
        textLeft: Boolean,
        wfull: { type: Boolean, default: true },
        dayPickerHeadingFormat: String,
        typeable: { type: Boolean, default: false },
        required: { type: Boolean, default: false },
        hasBorder: { type: Boolean, default: true },
        //  required option 은 typeable이랑 함께 사용 가능
    },
    mounted() {},
    emits: ['update:modelValue', 'changeDate'],
    methods: {
        getDateMap(dateObject) {
            const year = dateObject.getFullYear();
            const month = String(dateObject.getMonth()).padStart(2, '0');
            const day = String(dateObject.getDate()).padStart(2, '0');
            return { year, month, day };
        },
    },
    computed: {
        dateValue: {
            get() {
                const self = this;
                if (!self.modelValue) return null;
                let date = moment(self.modelValue, self.format);

                self.$emit('update:modelValue', date.format(self.format));
                return date.toDate();
            },
            set(newDate) {
                const self = this;

                const date = self.getDateMap(newDate);
                const parsedDate = moment().year(date.year).month(date.month).date(date.day);

                self.$emit('update:modelValue', parsedDate.format(self.format));
                self.$emit('changeDate', self.modelValue);
            },
        },
    },
};
</script>

<template>
    <div>
        <h1 v-if="name" class="mb-3 text-sm font-semibold text-slate-800">{{ name }}</h1>
        <Datepicker
            :inputFormat="displayFormat"
            class="block sm:text-sm text-md focus:blu-text pl-[10px] h-11 cursor-pointer"
            :class="[
                hasBorder ? 'border border-gray-300 rounded-md shadow-sm' : 'border-0 rounded-l-lg',
                wfull ? 'w-full' : '',
                textLeft ? 'text-left' : 'text-right',
                { 'bg-slate-50 border-none': disabled, addedClass: addedClass },
            ]"
            v-model="dateValue"
            :disabled="disabled"
            :lowerLimit="minDate"
            :upperLimit="maxDate"
            :placeholder="placeholder"
            :startingView="startingView"
            :weekStartsOn="0"
            :dayPickerHeadingFormat="dayPickerHeadingFormat"
            :typeable="typeable"
            :required="required" />
        <p class="mt-3.5 text-xs font-normal text-red-500" v-show="error">*{{ error }}</p>
    </div>
</template>
