<template>
    <div class="mb-2">
        <h2 class="text-xl font-semibold"> Rank of Top-up </h2>
        <div class="min-h-[805px] col-span-1 mt-4 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
            <TimeNavigation
                class="ml-2"
                :useWeek="false"
                :viewCol="false"
                v-model:currentFocus="nowFocus"
                @updateDate="clickDateButton"
            />

            <div v-if="rankTopUp_list.length > 0 " class="  mb-6 mt-1 overflow-auto ring-1 ring-black ring-opacity-5 ">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600 sm:pl-6">No</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600">Company Name</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600">Total Top-up</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="(topUp, index) in rankTopUp_list"
                            v-bind:key="index"  :class="{ 'bg-[#F8F8FD]': (index % 2 !== 0) }"
                        >
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700 sm:pl-6"> {{ index +1  }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700"> {{ topUp.companyName }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700"> {{ formatNumberWithComma(topUp.points) }} </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div v-else class="mt-10 flex flex-col items-center h-full justify-center gap-5">
                <div class="text-gray-500">  No Top-up Data </div>
            </div>
        </div>
    </div>
</template>

<script>
import TimeNavigation from "@/components/main/TimeNavigation.vue"
import moment from 'moment';

export default {
    components : {
        TimeNavigation,
    },
    methods : {
        getRankTopUp20(){
            const self = this;
            const url = self.$api("uri", "get-flexben-rank-top-up" );

            const json_query = {
                ...self.rankTopUp_query
            }
            self.$axios.get( url, { params : { json_query : JSON.stringify( json_query )} })
                    .then( res => {
                        const { list } = res.data.data;
                        self.rankTopUp_list = list
                    })
        },
        clickDateButton( startDate, endDate ){
            const self = this;
            self.rankTopUp_query.startDate = startDate;
            self.rankTopUp_query.endDate = endDate;
            self.getRankTopUp20();
        },
        formatNumberWithComma( number ){
            if( ! number ) return 0;
            const local = 'en-US';
            const formattedNumber = number.toLocaleString(local);
            return formattedNumber;
        }
    },
    data(){
        return {
            nowFocus : "THIS_MONTH",

            rankTopUp_query : {
                startDate : moment().startOf("month").format("YYYYMMDD"),
                endDate : moment().endOf("month").format("YYYYMMDD"),
            },
            rankTopUp_list : [],
        }
    },
    mounted(){
        const self = this;
        self.getRankTopUp20();
    }
}

</script>