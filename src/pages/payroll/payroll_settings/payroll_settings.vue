<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="mainTabName">
            <div class="mt-8 p-3 w-full max-w-7xl flex flex-col">
                <MainTabs :tabs ="mainTabs" class="my-2" @clickEvent="clickTabs" />
                <premiumRateTab :tabName="tabName" :visible="mainTabs.find(tab => tab.name === getPremiumRate())?.current === true" />
                <deMinimisBenefitsTab :tabName="tabName" :visible="mainTabs.find(tab => tab.name === getDeMinimisBenefits())?.current === true" />
                <sssTab :tabName="tabName" :visible="mainTabs.find(tab => tab.name === getSSS())?.current === true" />
                <philHealthTab :tabName="tabName" :visible="mainTabs.find(tab => tab.name === getPhilHealth())?.current === true" />
                <pagIbigTab :tabName="tabName" :visible="mainTabs.find(tab => tab.name === getPagIbig())?.current === true" />
                <wTaxTab :tabName="tabName" :visible="mainTabs.find(tab => tab.name === getWTAX())?.current === true" />
            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import MainTabs from "@/components/main/sections/MainTabs.vue"
import { SETTING_TYPE } from "@/pages/payroll/payroll_settings/constants/enum-payroll-setting";
import premiumRateTab from "@/pages/payroll/payroll_settings/tabs/premium_rate.vue";
import deMinimisBenefitsTab from "@/pages/payroll/payroll_settings/tabs/de_minimis_benefits.vue";
import sssTab from "@/pages/payroll/payroll_settings/tabs/sss.vue";
import philHealthTab from "@/pages/payroll/payroll_settings/tabs/phil-health.vue";
import pagIbigTab from "@/pages/payroll/payroll_settings/tabs/pag_ibig.vue";
import wTaxTab from "@/pages/payroll/payroll_settings/tabs/w-tax.vue";


export default {
    components : {
        AppAside, AppMain, MainTabs,
        premiumRateTab, deMinimisBenefitsTab, philHealthTab, pagIbigTab, sssTab, wTaxTab
    },
    methods : {
        clickTabs( tabItem ){
            const self = this;
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
                
                if (tab.current) {
                    self.tabName = tab.name;
                }
            })
        },
        getPremiumRate() {
            return SETTING_TYPE.PREMIUM_RATE;
        },
        getDeMinimisBenefits() {
            return SETTING_TYPE.DE_MINIMIS_BENEFITS;
        },
        getSSS() {
            return SETTING_TYPE.SSS;
        },
        getPhilHealth() {
            return SETTING_TYPE.PHIL_HEALTH;
        },
        getPagIbig() {
            return SETTING_TYPE.PAG_IBIG;
        },
        getWTAX() {
            return SETTING_TYPE.WTAX;
        }
    },
    data(){
        return{
            mainTabName : "Payroll Settings",
            tabName : null,
            mainTabs : [
                { text : "Premium Rate", name : SETTING_TYPE.PREMIUM_RATE, current : false },
                { text : "De Minimis Benefits" , name : SETTING_TYPE.DE_MINIMIS_BENEFITS, current : false },
                { text : "SSS" , name : SETTING_TYPE.SSS, current : false },
                { text : "PhilHealth" , name : SETTING_TYPE.PHIL_HEALTH, current : false },
                { text : "Pag-ibig" , name : SETTING_TYPE.PAG_IBIG, current : false },
                { text : "WTAX" , name : SETTING_TYPE.WTAX, current : false }
            ]
        }
    },
    mounted() {
        const self = this;
        self.clickTabs(self.mainTabs[0]);
    }
}
</script>