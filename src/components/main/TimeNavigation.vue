<template>
    <div class="flex gap-2 items-center ">
        <div class="flex w-[525px] h-[40px] border-gray-300 border-[1px] rounded mt-[35px] mb-[15px]">
            <button
                class="w-[105px] h-[40px] border-gray-300 text-zinc-500 leading-[40px] border-r-[1px] text-center"
                :class="[ currentFocus === 'THIS_WEEK' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('THIS_WEEK')"
            >
                This Week
            </button>
            <button
                class="w-[105px] h-[40px] leading-[40px] border-gray-300 border-r-[1px] text-center"
                :class="[ currentFocus === 'LAST_WEEK' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('LAST_WEEK')"
            >
                Last Week
            </button>
            <button
                class="w-[105px] h-[40px] leading-[40px] border-gray-300 border-r-[1px] text-center"
                :class="[ currentFocus === 'THIS_MONTH' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('THIS_MONTH')"
            >
                This Month
            </button>
            <button
                class="w-[105px] h-[40px] leading-[40px] border-gray-300 border-r-[1px] text-center"
                :class="[ currentFocus === 'LAST_MONTH' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('LAST_MONTH')"
            >
                Last Month
            </button>
            <button
                class="w-[105px] h-[40px] leading-[40px] text-center"
                :class="[ currentFocus === 'DIRECT' ? 'font-semibold text-blue-600 bg-white border-b-[1px]' : 'text-zinc-500']"
                @click="clickButton('DIRECT')"
            >
                Direct Input
            </button>

        </div>
        <div class="flex gap-1 self-end mt-[35px]" v-if="currentFocus === 'DIRECT'" >
            <ElementsDate
                :isNotBgWhite="true"
                v-model="startDateDirect"
                :disabled="!(currentFocus === 'DIRECT')"
                @changeDate="clickButton('DIRECT')"
            />
            <ElementsDate
                :isNotBgWhite="true"
                v-model="endDateDirect"
                :lowerLimit="startDateDirect"
                :disabled="!(currentFocus === 'DIRECT')"
                @changeDate="clickButton('DIRECT')"

            />
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    props : {
        outputFormat : String
    },
    data(){
        return {
            currentFocus : "THIS_MONTH",
            startDate : "",
            endDate : "",
            dateFormat : "yyyy-MM-DD HH:mm:ss",
            startDateDirect : "",
            endDateDirect : "",
        }
    },
    emits : [ 'updateDate' ],
    computed : {
    },
    methods : {
        clickButton( nowFocus ){
            const self = this;
            self.currentFocus = nowFocus;
            if( nowFocus=="DIRECT" ){
                if( ! self.startDateDirect || ! self.endDateDirect ){
                    return;
                }

                if( self.startDateDirect > self.endDateDirect ){
                    alert( "end date cannot be earlier than the Start date");
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