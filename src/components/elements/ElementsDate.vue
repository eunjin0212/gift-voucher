<script>
import Datepicker from 'vue3-datepicker'

export default{
	components : {
		Datepicker
	},
	props :{
		modelValue: Date,
		name: String,
		error: String,
        disabled : Boolean,
	},
	emits : ['update:modelValue', "changeDate"],
	methods : {
		
	},
}

</script>

<template>
	<div>
		<h1 v-if="name" class="mb-3 text-sm font-semibold text-slate-800">{{ name }}</h1>
		<div
			class="max-w-6xl h-12 bg-white flex transition-all duration-500"
		>
			<Datepicker
                inputFormat="MM/dd/yyyy" 
                class="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md text-md border pr-3 text-right h-8" 
				v-model="modelValue"
                @change="$emit('update:modelValue')"
                :disabled="disabled"
			/>
		</div>
		<p class="mt-3.5 text-xs font-normal text-red-500" v-show="error">*{{ error }}</p>
	</div>
</template>