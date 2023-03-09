<script>
import Datepicker from 'vue3-datepicker'
import moment from 'moment-timezone';

export default{
	components : {
		Datepicker
	},
	props :{
		modelValue: String,
		name: String,
		error: String,
        disabled : Boolean,
        isNotBgWhite : Boolean,
        lowerLimit : String,
        upperLimit : String,

	},
    mounted (){
        console.log( moment.tz.guess() )
    },
	emits : ['update:modelValue', "changeDate"],
	methods : {
        dateFormatter ( dateStr ){
            if( ! dateStr ){
                return null;
            }
            console.log( moment( dateStr ).format("yyyy-MM-DD HH:mm:ss") );
            return moment( dateStr ).format("yyyy-MM-DD HH:mm:ss");
        },
        stringToDate( dateStr ){
            if( ! dateStr ) {
                return null;
            }
            return moment(dateStr, "yyyy-MM-DD HH:mm:ss").toDate();
        },
        validateIsUTC( dateString ){
            const momentDate = moment(dateString);
            return momentDate.isUTC();
        },
        utcStringToDate( utcDateString ){
            const momentUtcTimestamp = moment.utc(utcDateString);
            return momentUtcTimestamp.local().format('YYYY-MM-DD HH:mm:ss');
        }
	},
    computed : {
        dateValue:{
            get(){
                const self = this;
                if( ! self.modelValue ) return null;

                let date = moment( self.modelValue )
                if( self.validateIsUTC( self.modelValue ) ){
                    date = self.utcStringToDate(self.modelValue );
                }

                self.$emit("update:modelValue",  date.format("yyyy-MM-DD HH:mm:ss") );
                return date.toDate();
            },
            set( newDate ){
                const self = this;
                self.$emit("update:modelValue",  moment( newDate ).format("yyyy-MM-DD HH:mm:ss") );
                self.$emit("changeDate", self.modelValue );
            }
        }
    }
}

</script>

<template>
	<div>
		<h1 v-if="name" class="mb-3 text-sm font-semibold text-slate-800">{{ name }}</h1>
		<div
			class="max-w-6xl h-12  flex transition-all duration-500"
            :class="[ isNotBgWhite ? '' : 'bg-white']"
		>
			<Datepicker
                inputFormat="MM/dd/yyyy"
                class="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md text-md border pr-3 text-right h-8"
                :class="{'bg-slate-50 border-none' : disabled }"
				v-model="dateValue"
                :disabled="disabled"
                :lowerLimit="stringToDate(lowerLimit)"
                :upperLimit="stringToDate(upperLimit)"
			/>
		</div>
		<p class="mt-3.5 text-xs font-normal text-red-500" v-show="error">*{{ error }}</p>
	</div>
</template>