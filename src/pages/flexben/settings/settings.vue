<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Flexben Settings'">
            <div class="mt-8 p-3 w-full max-w-7xl flex flex-col">
                <MainTabs :tabs ="mainTabs" class="my-2" @clickEvent="clickTabs" />
                <FlexbenType v-show="mainTabs.find( tab=> tab.current ).name === 'FLEXBEN_TYPE'"/>
                <BrandOnOff v-show="mainTabs.find( tab=> tab.current ).name === 'BRAND_ON_OFF'"/>
            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import MainTabs from "@/components/main/sections/MainTabs.vue"
import FlexbenType from "@/pages/flexben/settings/flexben_type/flexben_type.vue"
import BrandOnOff from "@/pages/flexben/settings/brand_on_off/brand_on_off.vue"
import moment from "moment";

export default {
    mounted(){
        const self = this;
    },
    components : {
        AppAside, AppMain, MainTabs, FlexbenType, BrandOnOff
    },
    methods : {
        clickTabs( tabItem ){
            const self = this;
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
            })
        },
    },
    data(){
        return{
            mainTabs : [
                { text : "Flexben Type", name : "FLEXBEN_TYPE", current : true },
                { text : "Brand on/off" , name : "BRAND_ON_OFF", current : false },
            ],
        }
    }
}
</script>