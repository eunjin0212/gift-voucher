<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'HRnFLEX Settings'">
            <div class="mt-8 p-3 w-full max-w-7xl flex flex-col">
                <MainTabs :tabs ="mainTabs" class="my-2" @clickEvent="clickTabs" />
                <AccountSetting
                    v-if="mainTabs.find( tab=> tab.name === 'ACCOUNT' )?.current === true"
                />
                <HolidaySetting
                    v-if="mainTabs.find( tab=> tab.name === 'HOLIDAY' )?.current === true"
                />
            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import MainTabs from "@/components/main/sections/MainTabs.vue"
import AccountSetting from '@/pages/settings/HRnFLEX_settings/account_setting/account_setting.vue'
import HolidaySetting from '@/pages/settings/HRnFLEX_settings/holiday_setting/holiday_setting.vue'

export default{
    components : {
        AppAside, AppMain, MainTabs, AccountSetting, HolidaySetting
    },
    data(){
        return{
            mainTabs : [],
        }
    },
    beforeMount(){
        const self = this;
        self.mainTabs = self.getMainTabs();
    },
    mounted(){
        const self = this;
        self.clickTabs( self.mainTabs[0] );
    },
    methods : {
        clickTabs( tabItem ){
            const self = this;
            console.log(tabItem)
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
            })
        },
        getMainTabs(){
            const self = this;
            let mainTabs = [];

            const noticeTab = { text : "Notice", name : "NOTICE", current : false };
            const holidayTab = { text : "Holiday", name : "HOLIDAY", current : false };
            const accountTab = { text : "Account" , name : "ACCOUNT", current : false };
            const maintenanceTab = { text : "System Maintenance" , name : "SYSTEM_MAINTENANCE", current : false };

            if( self.$appUtil.checkPermissionArray(['NOTICE_VIEW','NOTICE_EDIT']) ){
                mainTabs.push( noticeTab );
            }

            if( self.$appUtil.checkPermissionArray(['HOLIDAY_VIEW','HOLIDAY_EDIT']) ){
                mainTabs.push( holidayTab );
            }

            if( self.$appUtil.checkPermissionArray(['ACCOUNT_VIEW','ACCOUNT_EDIT']) ){
                mainTabs.push( accountTab );
            }

            if( self.$appUtil.checkPermissionArray(['SYSTEM_MAINTENANCE_VIEW','SYSTEM_MAINTENANCE_EDIT']) ){
                mainTabs.push( maintenanceTab );
            }

            return mainTabs;
        }
    }
}

</script>