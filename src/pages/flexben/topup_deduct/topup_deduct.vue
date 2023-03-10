<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="mainTabs.find(tab => tab.current).text">
            <div class="mt-8 p-3 w-full max-w-7xl flex flex-col">
                <MainTabs :tabs ="mainTabs" class="my-2" @clickEvent="clickTabs" />
                <ReportDeduct v-if="transactionType == 'DEDUCT_TO_HRFLEX'"/>
                <ReportTopup v-if="transactionType == 'TOPUP_FROM_HRFLEX'" />
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

export default {
    mounted(){
    },
    components : {
        AppAside, AppMain, MainTabs, ReportTopup, ReportDeduct
    },
    methods : {
        clickTabs( tabItem ){
            const self = this;
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
            })
            self.transactionType = self.mainTabs.find( tab => tab.current ).name;
        },
    },
    data(){
        return{
            mainTabs : [
                { text : "Top-up", name : "TOPUP_FROM_HRFLEX", current : true },
                { text : "Deduct" , name : "DEDUCT_TO_HRFLEX", current : false },
            ],
            transactionType : "TOPUP_FROM_HRFLEX",
        }
    }
}
</script>