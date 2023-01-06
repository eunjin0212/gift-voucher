<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

export default{
	components : {
		VueCtkDateTimePicker,
	},
	props :{
		modelValue: [String, Object],
		name: String,
		placeholder: String,
		showFormatType : String,
		error: String,
		full: Boolean,
		disabled : Boolean,
		auto_close : Boolean,
		noButtonNow : Boolean,
		noHeader : Boolean,
		minDate : String,
		maxDate : String,
		format : { type: String, default: "YYYYMMDD" },
		formatted : { type: String, default: "YYYY-MM-DD" },
		onlyDate: { type: Boolean, default: true },
		onlyTime: { type: Boolean, default: false },
		minuteInterval : Number,
		range : Boolean

	},
	emits : ['update:modelValue', "changeDate"],
	methods : {
		
	},
	computed:{
		dateString:{
			get(){
				const self = this;
				if(!self.modelValue){
					return;
				}
				self.$emit('changeDate', self.modelValue );
				return self.modelValue;
			},
			set(value){ 
				const self = this;
				self.$emit('update:modelValue', value);
				return value; 
			},
		}
	}
}

</script>

<template>
	<div>
		<h1 class="text-sm font-semibold text-slate-800">{{ name }}</h1>
		<div
			class="max-w-6xl h-12 bg-white flex transition-all duration-500"
		>
			<VueCtkDateTimePicker
				class="py-1 overflow-visible px-3 pr-0 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md flex-1 outline-0 h-full text-sm cursor-pointer"
				:class="{ 'border-red-500': error, 'w-96': (!full), 'w-full': full, 'mt-3': name }"
				:format="format"
				:formatted="formatted"
				v-model="dateString"
				:only-date="onlyDate"
				:only-time="onlyTime"
				:noLabel="!placeholder"
				:disabled="disabled"
				:label="placeholder"
				:autoClose="auto_close"
				:noButtonNow="noButtonNow"
				:noHeader="noHeader"
				:minDate="minDate"
				:maxDate="maxDate"
				:minuteInterval="minuteInterval"
				:range="range"
			/>
		</div>
		<p class="mt-3.5 text-xs font-normal text-red-500" v-show="error">*{{ error }}</p>
	</div>
</template>