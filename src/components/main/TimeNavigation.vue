<template>
    <div :class="{ 'flex gap-2 items-center' : viewCol }">
        <div class="flex rounded mt-[35px] mb-[15px] w-[525px]">
            <button
                v-if="useWeek"
                class="w-[105px] h-[40px] border-gray-300 text-zinc-500 leading-[40px] border-[1px] text-center"
                :class="[ currentFocus === 'THIS_WEEK' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('THIS_WEEK')"
            >
                This Week
            </button>
            <button
                v-if="useWeek"
                class="w-[105px] h-[40px] leading-[40px] border-gray-300 border-[1px] text-center"
                :class="[ currentFocus === 'LAST_WEEK' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('LAST_WEEK')"
            >
                Last Week
            </button>
            <button
                v-if="useMonth"
                class="w-[105px] h-[40px] leading-[40px] border-gray-300 border-[1px] text-center"
                :class="[ currentFocus === 'THIS_MONTH' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('THIS_MONTH')"
            >
                This Month
            </button>
            <button
                v-if="useMonth"
                class="w-[105px] h-[40px] leading-[40px] border-gray-300 border-[1px] text-center"
                :class="[ currentFocus === 'LAST_MONTH' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('LAST_MONTH')"
            >
                Last Month
            </button>
            <button
                v-if="useDirect"
                class="w-[105px] h-[40px] leading-[40px] text-center  border-gray-300 border-[1px]"
                :class="[ currentFocus === 'DIRECT' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('DIRECT')"
            >
                Direct Input
            </button>
        </div>
        <div class="flex gap-2 py-2" :class="{ 'mt-[35px]' : viewCol }" v-if="currentFocus === 'DIRECT'" >
            <ElementsDate
                :isNotBgWhite="true"
                v-model="startDateDirect"
                placeholder="Select Date"
                :disabled="!(currentFocus === 'DIRECT')"
                @changeDate="clickButton('DIRECT')"
            />
            <ElementsDate
                :isNotBgWhite="true"
                v-model="endDateDirect"
                :lowerLimit="startDateDirect"
                :disabled="!(currentFocus === 'DIRECT')"
                @changeDate="clickButton('DIRECT')"
                placeholder="Select Date"
            />
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props : {
        outputFormat : {
            type : String,
            default : "YYYYMMDD"
        },
        viewCol : {
            type : Boolean,
            default : true
        },
        useWeek : {
            type : Boolean,
            default : true
        },
        useMonth : {
            type : Boolean,
            default : true
        },
        useDirect : {
            type : Boolean,
            default : true
        },
        currentFocus : {
            type : String ,
            default : "THIS_MONTH",
        }
    },
    data(){
        return {
            startDate : "",
            endDate : "",
            dateFormat : "yyyy-MM-DD HH:mm:ss",
            startDateDirect : "",
            endDateDirect : "",
        }
    },
    emits : [ 'updateDate', 'update:currentFocus'],
    computed : {
    },
    methods : {
        clickButton( nowFocus ){
            const self = this;
            self.$emit('update:currentFocus', nowFocus)

            if( nowFocus=="DIRECT" ){
                if( ! self.startDateDirect || ! self.endDateDirect ){
                    return;
                }

                if( self.startDateDirect > self.endDateDirect ){
                    alert( "End date cannot be earlier than the Start date");
                    return;
                }
                self.$emit('updateDate', self.dateFormatChange(self.startDateDirect), self.dateFormatChange(self.endDateDirect ) );
                return;
            }

            self.startDateDirect = "";
            self.endDateDirect = "";

            if ( nowFocus === "THIS_WEEK" ){
                self.startDate = moment().startOf("isoWeek").format(self.dateFormat);
                self.endDate = moment().endOf("isoWeek").format(self.dateFormat);
			}
            if ( nowFocus == "THIS_MONTH" ) {
                self.startDate = moment().startOf("month").format(self.dateFormat);
                self.endDate = moment().endOf("month").format(self.dateFormat);
            }

            if ( nowFocus == "LAST_WEEK" ) {
                self.startDate = moment().add(-1, "w").startOf("isoWeek").format(self.dateFormat);
                self.endDate = moment().add(-1, "w").endOf("isoWeek").format(self.dateFormat);
            }

            if ( nowFocus == "LAST_MONTH" ) {
                self.startDate = moment().add(-1, "M").startOf("month").format(self.dateFormat);
                self.endDate = moment().add(-1, "M").endOf("month").format(self.dateFormat);
            }

            self.$emit('updateDate', self.dateFormatChange(self.startDate), self.dateFormatChange(self.endDate ) );
        },
        dateFormatChange( dateStr ){
            const self = this;
            if( !dateStr ) return null;
            return moment( dateStr, self.dateFormat ).format(self.outputFormat)
        }
    },


}
</script>