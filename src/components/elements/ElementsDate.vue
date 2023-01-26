<script>
import Datepicker from 'vue3-datepicker'
import moment from 'moment';

export default{
	components : {
		Datepicker
	},
	props :{
		modelValue: String,
		name: String,
		error: String,
        disabled : Boolean,
	},
	emits : ['update:modelValue', "changeDate"],
	methods : {
        dateFormatter ( dateStr ){
            if( ! dateStr ){
                return null; 
            }
            return moment( dateStr ).format("yyyy-MM-DD HH:mm:ss");
        }
	},
    computed : {
        dateValue:{
            get(){
                const self = this;
                if( ! self.modelValue ) return null;
                console.log( 'get : ', self.modelValue )
                self.$emit("update:modelValue",  moment( self.modelValue ).format("yyyy-MM-DD HH:mm:ss") );
                return moment(self.modelValue, "yyyy-MM-DD HH:mm:ss").toDate();
            },  
            set( newDate ){
                const self = this;
                console.log( {newDate} )
                self.$emit("update:modelValue",  moment( newDate ).format("yyyy-MM-DD HH:mm:ss") );
            }
        }
    }
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
				v-model="dateValue"
                :disabled="disabled"
			/>
		</div>
		<p class="mt-3.5 text-xs font-normal text-red-500" v-show="error">*{{ error }}</p>
	</div>
</template>