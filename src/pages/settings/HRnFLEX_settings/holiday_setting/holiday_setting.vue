<template>
    <div>
        <VersionList
            v-if="currentView==='DISPLAY_VERSION'"
            :versionList="versionList"
            @click-title="displayDetailView"
            @insert-new="insertNewVersion"
        />
        <InitialList
            v-if="currentView==='DISPLAY_INITIAL'"
            :initialList="initialHolidayList"
            :versionInfo="selectedVersion"
            @edit-initials="editInitialHolidays"
            @delete-version="deleteSelectedVersion"
            @go-list="goVersionView"
        />
        <SettingDetail
            v-if="currentView==='SETTING_HOLIDAY'"
            :currentView="currentView"
            :initialList="initialHolidayList"
            :versionInfo="selectedVersion"
            @insert-initial="insertHolidayInitials"
            @update-initial="updateHolidayInitials"
            @go-list="goVersionView"
            @go-initial-view="goInitialView"
        />
    </div>
</template>

<script>
import VersionList from '@/pages/settings/HRnFLEX_settings/holiday_setting/components/versionList.vue'
import InitialList from '@/pages/settings/HRnFLEX_settings/holiday_setting/components/initialList.vue'
import SettingDetail from '@/pages/settings/HRnFLEX_settings/holiday_setting/components/settingDetail.vue'

export default {
    components : {
        VersionList, InitialList,  SettingDetail
    },
    data(){
        return {
            versionList : [],
            initialHolidayList : [],
            selectedVersion : {},

            // DISPLAY_VERSION, DISPLAY_INITIAL, SETTING_HOLIDAY
            currentView : "DISPLAY_VERSION",
        }
    },
    methods: {
        insertNewVersion(){
            const self = this;

            self.selectedVersion = {};
            self.initialHolidayList = [];

            const holidayInitialVersionSeq = self.versionList[0]?.holidayInitialVersionSeq;

            const url = self.$api("uri", "get-holiday-initial-list")
                            .replace("{holidayInitialVersionSeq}", holidayInitialVersionSeq);

            self.$axios.get( url ).then( res => {
                self.initialHolidayList = res.data.data.list;
            })
            .catch( err =>{
                console.error(err);
            } )
            .finally( () => {
                self.currentView = 'SETTING_HOLIDAY';
            })

        },
        editInitialHolidays(){
            const self = this;
            self.currentView="SETTING_HOLIDAY"
        },
        goVersionView(){
            const self = this;
            self.currentView="DISPLAY_VERSION";
        },
        goInitialView(){
            const self = this;
            self.currentView = "DISPLAY_INITIAL"
        },
        deleteSelectedVersion(){
            const self = this;
            const url = self.$api("uri", "delete-holiday-initial" )
                .replace("{holidayInitialVersionSeq}", self.selectedVersion.holidayInitialVersionSeq);

            self.$axios.delete( url )
                        .then( res => {
                            self.currentView = 'DISPLAY_VERSION';
                            self.getHolidayVersions();
                        })
                        .catch(alert)
        },
        updateHolidayInitials( updateData ){
            const self = this;
            const url = self.$api("uri", "put-holiday-initial")
                        .replace("{holidayInitialVersionSeq}", self.selectedVersion.holidayInitialVersionSeq);
            self.$axios.put( url, updateData ).then( res => {
                self.currentView = 'DISPLAY_VERSION';
                self.getHolidayVersions();
            })
            .catch( err => {
                alert(err);
            })
        },
        insertHolidayInitials( insertData ){
            const self = this;
            const url = self.$api("uri", "post-holiday-initial");
            self.$axios.post( url, insertData ).then( res => {
                self.currentView = 'DISPLAY_VERSION';
                self.getHolidayVersions();
            })
            .catch( err => {
                alert(err);
            })
        },
        getHolidayVersions(){
            const self = this;
            const url = self.$api("uri", "get-holiday-version-list");
            self.$axios.get( url )
                        .then( res =>{
                            self.versionList = res.data.data.list;
                        })
                        .catch( err => {
                            console.error(err);
                        })
        },
        displayDetailView( versionItem ){
            const self = this;

            const holidayInitialVersionSeq = versionItem.holidayInitialVersionSeq;
            self.selectedVersion = versionItem;

            const url = self.$api("uri", "get-holiday-initial-list")
                            .replace("{holidayInitialVersionSeq}", holidayInitialVersionSeq);

            self.$axios.get( url ).then( res => {
                self.initialHolidayList = res.data.data.list;
                self.currentView="DISPLAY_INITIAL"
            })
            .catch( err =>{
                alert(err);
            } );

        },
    },
    mounted(){
        const self = this;
        self.getHolidayVersions();
    }
}
</script>
