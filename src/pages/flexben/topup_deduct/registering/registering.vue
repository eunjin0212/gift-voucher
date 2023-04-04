<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="headerName">
            <RegisteringDeduct v-if="transactionType==='DEDUCT_TO_HRFLEX'"/>
            <RegisteringTopup v-if="transactionType==='TOPUP_FROM_HRFLEX'"/>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import RegisteringDeduct from "@/pages/flexben/topup_deduct/component_deduct/registering_deduct.vue";
import RegisteringTopup from "@/pages/flexben/topup_deduct/component_topup/registering_topup.vue";

export default {
    mounted(){
        const self = this;
        const params = new URL(document.location).searchParams;
        const transaction = params.get("transaction");

        self.transactionType = self.pointExecutionMethods[transaction];
        self.headerName = self.getHeaderName( transaction );
    },
    components:{
        AppMain, AppAside, RegisteringDeduct, RegisteringTopup
    },
    data(){
        return{
            transactionType : "",
            pointExecutionMethods : {
                'TOP-UP' : 'TOPUP_FROM_HRFLEX',
                'DEDUCT' :  'DEDUCT_TO_HRFLEX'
            },
            headerName : "Top-up"
        }
    },
    methods:{
        getHeaderName( transaction ){
            let headerName = 'Registering'
            if( transaction === 'TOP-UP'){
                headerName = 'Top-up'
            }

            if( transaction === 'DEDUCT'){
                headerName = 'Deduct'
            }

            return headerName;
        }
    }
}
</script>



