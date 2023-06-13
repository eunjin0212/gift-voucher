<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="mainTabs.find(tab => tab.current).text" :isExcelNeeded="true" @clickDownExcel="downExcelReport">
            <div class="mt-8 p-3 w-full max-w-7xl flex flex-col">
                <MainTabs :tabs ="mainTabs" class="my-2" @clickEvent="clickTabs" />
                <div class="p-3 max-w-7xl self-end">
                    <ElementsButton
                        :text="mainTabs.find(tab => tab.current).text"
                        :fitContent="true"
                        class="self-end "
                        @clickEvent="goToRegistering()"
                    />
                </div>
                <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                    <TimeNavigation
                        v-model:currentFocus="nowFocus"
                        @updateDate="clickDateButton"
                    />
                    <div class="flex mt-5 gap-2">
                        <ElementsInput
                            v-model="searchOptions.companyName"
                            :width60="true"
                            :height11="true"
                        />
                        <ElementsButton
                            :width32="true"
                            :text="'Search'"
                            @clickEvent="getFlexbenHistoryList()"
                        />
                    </div>
                    <ReportTopup
                        v-if="searchOptions.transactionType == 'TOPUP_FROM_HRFLEX'"
                        :flexbenHistory="flexbenHistory"
                    />
                    <ReportDeduct
                        v-if="searchOptions.transactionType == 'DEDUCT_TO_HRFLEX'"
                        :flexbenHistory="flexbenHistory"
                    />
                    <div class="w-full h-28 flex justify-center items-center">
                        <ElementsPagination
                            v-model="flexbenHistory.page"
                            :totalContent="flexbenHistory.total"
                            :contentsPerPage="flexbenHistory.limit"
                            @clickPage="clickPageButton"
                        />
                    </div>
                </div>
            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import MainTabs from "@/components/main/sections/MainTabs.vue"
import ReportDeduct from "@/pages/flexben/topup_deduct/component_deduct/report_deduct.vue";
import ReportTopup from "@/pages/flexben/topup_deduct/component_topup/report_topup.vue";
import moment from "moment";
import TimeNavigation from "@/components/main/TimeNavigation.vue"

export default {
    mounted(){
        const self = this;
        if ( window.location.hash == '#deduct' ) {
            self.clickTabs( self.mainTabs[1] );
        }
        self.getFlexbenHistoryList();
    },
    components : {
        AppAside, AppMain, MainTabs, ReportTopup, ReportDeduct,TimeNavigation
    },
    methods : {
        clickTabs( tabItem ){
            const self = this;
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
            })
            self.searchOptions.transactionType = self.mainTabs.find( tab => tab.current ).name;
            window.location.hash = "";
            self.initSearchOptions();
            self.getFlexbenHistoryList();
        },
        getFlexbenHistoryList( offset=0, afterClickPage = false ){
            const self = this;
            const url = self.$api("uri", "get-flexben-history");
            const { limit } = self.flexbenHistory;
            self.flexbenHistory.offset = offset;
            const json_query = { ...self.searchOptions, offset, limit };
            self.$axios.get( url , { params : { json_query : JSON.stringify(json_query) } })
                .then((res) => {
                    self.flexbenHistory.total = res.data.data.count;
                    self.flexbenHistory.list = res.data.data.list;
                    if( ! afterClickPage ){
                        self.flexbenHistory.page = 1;
                    }

                })
                .catch( alert )
        },
        downExcelReport(){

        },
        goToRegistering(){
            const self = this;
            const destination =  self.searchOptions.transactionType == "TOPUP_FROM_HRFLEX" ? 'TOP-UP' : 'DEDUCT';
            location.href=`/flexben/topup_deduct/registering?transaction=${destination}`;
        },
        clickPageButton( item ){
            const self = this;
            self.getFlexbenHistoryList( item, true )
        },
        clickDateButton( startDate, endDate ){
            const self = this;
            self.searchOptions.startDate = startDate;
            self.searchOptions.endDate = endDate;
            self.getFlexbenHistoryList();
        },
        initSearchOptions(){
            const self = this;
            self.nowFocus = "THIS_MONTH";
            self.searchOptions = {
                ...self.searchOptions,
                startDate : moment().startOf("month").format("YYYYMMDD"),
                endDate : moment().endOf("month").format("YYYYMMDD"),
                companyName : ""
            };
        }
    },
    data(){
        return{
            mainTabs : [
                { text : "Top-up", name : "TOPUP_FROM_HRFLEX", current : true },
                { text : "Deduct" , name : "DEDUCT_TO_HRFLEX", current : false },
            ],
            nowFocus : "THIS_MONTH",
            searchOptions : {
                startDate : moment().startOf("month").format("YYYYMMDD"),
                endDate : moment().endOf("month").format("YYYYMMDD"),
                transactionType : "TOPUP_FROM_HRFLEX",
                companyName : ""
            },
            flexbenHistory : {
                list : [],
                total : 0,
                limit : 10,
                offset : null,
                page : 1,
            },
        }
    },

}
</script>