<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
            <AppMain :headerName="registerData.companyName">
                <div class="flex justify-between max-w-7xl">
                    <MainTabs :tabs="mainTabs" class="mt-9" @clickEvent="clickTabs" />
                    <ElementsButton
                        text="Back To List"
                        :bgWhiteAndtextIndigo="true"
                        :fitContent="true"
                        @click="backToCompanyList"
                    />
                </div>

                <ServiceUsageInfo
                    v-show="mainTabs.find( tab=> tab.name === 'SERVICE_USAGE_INFO' ).current === true"
                    :flexbenHistory="flexbenHistory"
                    :registerData="registerData"
                    @register-top-up="goToRegistering"
                    @show-admin="OpenMasterAdminList"
                />

                <CompanyInfoEdit
                    v-if="mainTabs.find( tab=> tab.name === 'COMPANY_INFO' ).current === true"
                    @edit-company-info="editCompanyInfoData"
                    @submit-file="submitContractFile"
                    @delete-file="deleteCurrentFile"
                    :registerData="registerData"
                    :flexbenTypeOptions="flexbenTypeOptions"
                />

                <CompanySettings
                    v-if="mainTabs.find( tab=> tab.name === 'SETTINGS' ).current === true"
                    :registerData="registerData"
                    @submit-usage-settings="editCompanyUsageSettings"
                    @submit-suspended-settings="editAccountSettings"
                />
            </AppMain>

            <Teleport to="body">
                <AdminPopUp
                    :masterAdmin="masterAdmin"
                    v-if="masterAdmin.isOpen"
                />
            </Teleport>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import MainTabs from "@/components/main/sections/MainTabs.vue"
import CompanySettings from "@/pages/company/company_information/component/company_settings.vue"
import ServiceUsageInfo from "@/pages/company/company_information/component/service-usage-info.vue"
import CompanyInfoEdit from "./component/company-info-edit.vue";
import AdminPopUp from "./component/admin-pop-up.vue";
import moment from 'moment';

export default {
    components : {
        AppAside, AppMain, MainTabs
        , CompanySettings, ServiceUsageInfo, CompanyInfoEdit, AdminPopUp
    },
    mounted(){
        const self = this;
        self.getFlexbenType();
        self.getDisplayData();
    },
    data(){
        return{
            mainTabs : [
                { text : "Service Usage Info", name : "SERVICE_USAGE_INFO", current : true },
                { text : "Company Info" , name : "COMPANY_INFO", current : false },
                { text : "Settings" , name : "SETTINGS", current : false },
            ],
            masterAdmin : {
                isOpen : false,
                list : [],
            },
            flexbenTypeOptions : [],

            registerData : {},
            searchOptions : {
                startDate : "",
                endDate : "",
                transactionType : "TOPUP_FROM_HRFLEX",
                companyName : "",
                companySeq : null,
            },
            flexbenHistory : {
                list : [],
                total : 0,
                limit : -1,
                offset : 0,
                page : 1,
            },
        }
    },
    methods :{
        async getDisplayData(){
            const self = this;
            try {
                self.registerData = await self.getCompanyData()
            }catch(e){
                console.error( " ERROR : ", e);
            }

            self.getFlexbenHistoryList( self.registerData.companySeq );

        },
        getCompanyData(){
            const self = this;
            const urlParams = new URLSearchParams( window.location.search );
            if( ! urlParams.has( "subscriptionCompanySeq" ) ){
                return;
            }
            const subscriptionCompanySeq = urlParams.get("subscriptionCompanySeq");
            const url = self.$api("uri", "get-company");

            return self.$axios.get( `${url}/${subscriptionCompanySeq}` )
                    .then( res => res.data.data );
        },
        getFlexbenType(){
            const self = this;
            const url = self.$api("uri", "get-flexben-campaign-List");
            self.$axios.get( url )
                .then( res => {
                    self.flexbenTypeOptions= res.data.data.list.map(( { bizCampaignId, flexbenCampaignSeq, flexbenCampaignTitle}) =>({
                            text : flexbenCampaignTitle,
                            value : flexbenCampaignSeq,
                            bizCampaignId
                        })
                    );
                })
        },
        submitContractFile( contractFile, editCompanyData ){
            const self = this;

            const url = self.$api("uri", "post-file-direct-upload" );
            const { name } = contractFile;
            let form = new FormData();
            form.append( `uploadFile1` , contractFile );
            form.append( `uploadFileName1` , name );

            self.$axios.post( url, form, { headers : {'Content-Type' : 'multipart/form-data;'} })
                        .then( res => {
                            return res.data.data.uploadFile1;
                        })
                        .then( contractFilePath => {

                            self.editCompanyInfoData( { ...editCompanyData, contractFilePath } )
                        })
                        .catch( err => {
                            console.error("File Upload Error : ", err )
                            alert(" Failed to file upload, Please try again" );
                        });
        },
        deleteCurrentFile( currentfilePath ){
            const self = this;
            self.$axios.delete( currentfilePath )
                .then( () => {} )
                .catch( (err) => console.error( 'ERROR : ', err ))
        },
        editCompanyInfoData( editCompanyData ){
            const self = this;
            editCompanyData.subscriptionCompanySeq = self.registerData.subscriptionCompanySeq;
            editCompanyData.companySeq = self.registerData.companySeq;

            const url = self.$api("uri", "put-company-info");
            self.$axios.put( url, editCompanyData )
                .then( ( ) => {
                    alert( " success to update ");
                    self.getDisplayData();
                })
                .catch( alert)
        },
        editAccountSettings( editAccountData ){
            const self = this;

            editAccountData.subscriptionCompanySeq = self.registerData.subscriptionCompanySeq;
            editAccountData.companySeq = self.registerData.companySeq;
            console.log( {editAccountData} )

            const url = self.$api("uri", "put-company-account-setting");
            self.$axios.put( url , editAccountData )
                        .then( () => {
                            alert(" Success to update ");
                            self.getDisplayData();
                        })
                        .catch( err => alert("failed to update ", err ));
        },
        editCompanyUsageSettings( editSettingData ){
            const self = this;
            editSettingData.subscriptionCompanySeq = self.registerData.subscriptionCompanySeq;
            editSettingData.companySeq = self.registerData.companySeq;

            const url = self.$api("uri", "put-company-usage-setting");
            self.$axios.put( url, editSettingData )
                .then( ()=>{
                    alert("Success to update ");
                    self.getDisplayData();
                })
                .catch( alert)
        },
        getFlexbenHistoryList( companySeq ){
            const self = this;
            const { limit, offset } = self.flexbenHistory;
            const url = self.$api("uri", "get-flexben-history");
            const json_query = { ...self.searchOptions, limit, offset, companySeq };
            self.$axios.get( url , { params : { json_query : JSON.stringify(json_query) } })
                .then((res) => {
                    self.flexbenHistory.total = res.data.data.count;
                    self.flexbenHistory.list = res.data.data.list;
                })
                .catch( alert )
        },
        OpenMasterAdminList(){
            const self = this;
            const { companySeq } = self.registerData;
            const json_query = { companySeq };

            const params = new URLSearchParams();
            params.append( "json_query", JSON.stringify( json_query ) );

            const url = self.$api("uri", "get-company-admin");
            self.$axios.get( url, { params } )
                .then((res) =>{
                    self.masterAdmin.isOpen = true;
                    self.masterAdmin.list = res.data.data.list;
                })
                .catch( alert )
        },
        backToCompanyList(){
            location.href='/company/company_list';
        },
        goToRegistering(){
            location.href=`/flexben/topup_deduct/registering?transaction=TOP-UP`;
        },
        clickTabs( tabItem ){
            const self = this;
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
            })
        },

        /*  타임체크 로직 필요유무 확인  */
        validationTimeCheck(){
            const self = this;
            const { subscribeStartDate, subscribeEndDate } = self.editCompanyData;
            const startDate = moment( subscribeStartDate );
            const endDate = moment( subscribeEndDate );

            console.log( startDate, endDate, endDate.isAfter(startDate) )

            return endDate.isAfter(startDate);
        },
    }
}
</script>