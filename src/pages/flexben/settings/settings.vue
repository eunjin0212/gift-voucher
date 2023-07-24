<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'FlexBen Settings'">
            <div class="mt-8 p-3 w-full max-w-7xl flex flex-col">
                <MainTabs :tabs ="mainTabs" class="my-2" @clickEvent="clickTabs" />
                <FlexbenType v-if="mainTabs.find( tab=> tab.current ).name === 'FLEXBEN_TYPE'"/>
                <BrandOnOff v-if="mainTabs.find( tab=> tab.current ).name === 'BRAND_ON_OFF'"/>
                <ProductSetting v-if="mainTabs.find( tab=> tab.current ).name === 'PRODUCT_SETTING'"/>
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
import ProductSetting from "@/pages/flexben/settings/product_setting/product_setting.vue"

export default {
    mounted(){
        const self = this;
        const url = new URL(window.location.href)
        if( url.hash == "#PRODUCT_SETTING" ){
            self.clickTabs( self.mainTabs[2] );
        }
    },
    components : {
        AppAside, AppMain, MainTabs, FlexbenType, BrandOnOff, ProductSetting
    },
    methods : {
        clickTabs( tabItem ){
            const self = this;
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
            })
            window.location.hash = "";
        },
    },
    data(){
        return{
            mainTabs : [
                { text : "FlexBen Type", name : "FLEXBEN_TYPE", current : true },
                { text : "Brand on/off" , name : "BRAND_ON_OFF", current : false },
                { text : "Product Settings" , name : "PRODUCT_SETTING", current : false },
            ],
        }
    }
}
</script>