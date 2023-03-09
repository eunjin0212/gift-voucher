<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import TimeNavigation from "@/components/main/TimeNavigation.vue"
import ElementsPagination from "@/components/elements/ElementsPagination.vue"
import moment from 'moment';

export default {
    components : {
        AppAside, AppMain, TimeNavigation, ElementsPagination
    },
    data(){
        return {
            flexbenReport : {
                list : [],
                total : 0,
                limit : 10,
                offset : null,
                page : 1,
            },
            searchOptions : {
                startDate : moment().startOf("month").format("YYYYMMDD"),
                endDate : moment().endOf("month").format("YYYYMMDD"),
                transactionType : null,
                companyName : ""
            },
            transactionTypeOptions : [
                { text : "Type", value : null },
                { text : "Top-up", value : "TOPUP_FROM_HRFLEX"},
                { text : "Deduct", value : "DEDUCT_TO_HRFLEX"},
                { text : "Transfer", value : "TRANSFER_TO_EMPLOYEE"},
                { text : "Withdraw", value : "DEDUCT_FROM_EMPLOYEE"},
                // { text : "Cancel", value : "VOID_FROM_EMPLOYEE"}
            ],
        }
    },
    methods : {
        getFlexbenReportList( offset=0, afterClickPage = false ){
            const self = this;
            const url = self.$api("uri", "get-flexben-report-List");
            const { limit } = self.flexbenReport;
            self.flexbenReport.offset = offset;
            const json_query = { ...self.searchOptions, offset, limit };
            self.$axios.get( url , { params : { json_query : JSON.stringify(json_query) } })
                .then((res) => {
                    self.flexbenReport.total = res.data.data.count;
                    self.flexbenReport.list = res.data.data.list.map(report =>{
                        report.transactionType = self.transactionTypeOptions
                                                .find( type => type.value == report.transactionType )
                                                .text
                        return report;
                    });
                    if( ! afterClickPage ){
                        self.flexbenReport.page = 1;
                    }

                })
                .catch( alert )

        },
        clickDateButton( startDate, endDate ){
            const self = this;
            self.searchOptions.startDate = startDate;
            self.searchOptions.endDate = endDate;
            self.getFlexbenReportList();
        },
        clickPageButton( item ){
            const self = this;
            self.getFlexbenReportList( item, true )
        },
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
    },
    mounted(){
        const self = this;
        self.getFlexbenReportList();
    }
}
</script>

<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Flexben Report'">
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <TimeNavigation
                    :outputFormat="'YYYYMMDD'"
                    @updateDate="clickDateButton"
                />
                <div class="flex mt-5 gap-2">
                    <ElementsSelect
                        :width60="true"
                        :options="transactionTypeOptions"
                        v-model="searchOptions.transactionType"
                    />
                    <ElementsInput
                        :width60="true"
                        :height11="true"
                        v-model="searchOptions.companyName"
                    />
                    <ElementsButton
                        :width32="true"
                        :text="'Search'"
                        @clickEvent="getFlexbenReportList()"
                    />
                </div>
                <div class=" mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="relative min-w-full divide-y divide-gray-300  ">
                        <thead class="sticky bg-gray-50 top-0 left-0 right-0 border-b border-gray-50" style="z-index: 1;">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900 sm:pl-6">Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Company Name</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Type</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Points</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Total Available Points</th>
                            </tr>
                        </thead>
                        <tbody v-if="flexbenReport.total != 0" class="divide-y divide-gray-200 bg-white" >
                            <tr v-for="(report, index) in flexbenReport.list" v-bind:key="index" >
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-6"> {{ dateFormatChange(report.regDate, "MM/DD/yyyy hh:mm") }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">  {{ report.companyName }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">  {{ report.transactionType }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ report.mileageVolume }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ report.afterMileage }} </td>
                            </tr>
                        </tbody>
                        <tbody v-else >
                            <tr>
                                <td colspan="5" class="flex h-[20vh] w-full items-center justify-center"> No FlexBen Report Data </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="w-full h-28 flex justify-center items-center mt-5" >
                    <ElementsPagination
                        v-model="flexbenReport.page"
                        :totalContent="flexbenReport.total"
                        :contentsPerPage="flexbenReport.limit"
                        @clickPage="clickPageButton"
                    />
                </div>
            </div>
        </AppMain>
    </div>
</template>