<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'HRnFLEX Settings'">
            <div class="mt-8 p-3 w-full max-w-7xl flex flex-col">
                <MainTabs :tabs ="mainTabs" class="my-2" @clickEvent="clickTabs" />
                <AccountSetting
                    v-if="mainTabs.find( tab=> tab.name === 'ACCOUNT' ).current === true"
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

export default{
    components : {
        AppAside, AppMain, MainTabs, AccountSetting
    },
    data(){
        return{
            mainTabs : [
                { text : "Notice", name : "NOTICE", current : false },
                { text : "Account" , name : "ACCOUNT", current : true },
                { text : "System Maintenance" , name : "SYSTEM_MAINTENANCE", current : false },
            ],
        }
    },
    methods : {
        clickTabs( tabItem ){
            const self = this;
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
            })
        },
    }
}

</script>