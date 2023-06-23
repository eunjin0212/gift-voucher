<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
            <AppMain :headerName="registerData.companyName">
                <div class="flex justify-between max-w-[1024px]">
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
                    @editCompanyInfo="clickSubmitCompanyData"
                    @clickCancel="returnToServiceUsage"
                    :registerData="registerData"
                    :billingStatusOptions="billingStatusOptions"
                    :flexbenTypeOptions="flexbenTypeOptions"
                />

                <CompanySettings
                    v-if="mainTabs.find( tab=> tab.name === 'SETTINGS' ).current === true"
                />

            </AppMain>
            <Teleport to="body">
                <AppPopup v-model="masterAdmin.isOpen" name="Master Admin List" >
                    <div class="flex flex-col min-w-[40vw]">
                        <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle">
                                <div class="shadow-sm ring-1 ring-black ring-opacity-5">
                                    <table class="min-w-full border-separate px-6" style="border-spacing: 0">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Name</th>
                                                <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">
                                                    Department Name / Job title Name
                                                </th>
                                                <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white" v-if="masterAdmin.list.length > 0">
                                            <tr v-for="(admin, personIdx) in masterAdmin.list" :key="admin.email">
                                                <td :class="[personIdx !== masterAdmin.list.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8']">
                                                    {{ admin.employeeName }}
                                                </td>
                                                <td :class="[personIdx !== masterAdmin.list.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell']">
                                                    {{ `${admin.departmentName} / ${ admin.jobTitleName }` }}
                                                </td>
                                                <td :class="[personIdx !== masterAdmin.list.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell']">
                                                    {{ admin.email }}
                                                </td>
                                            </tr>
                                        </tbody>
                                        <div v-else class="w-full min-h-[10vh] flex items-center justify-center">
                                            No Admin
                                        </div>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </AppPopup>
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
import moment from 'moment';

export default {
    components : {
        AppAside, AppMain, MainTabs, CompanySettings, ServiceUsageInfo, CompanyInfoEdit
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
            billingStatusOptions : [
                { text : "Testing", value : "TRIAL" },
                { text : "Billing", value : "BILLING" }
            ],
            registerData : {
                subscriptionCompanySeq: null,
                companySeq: null,
                companyName: "",
                flexbenType: null,
                flexbenCampaignSeq: "",
                subscriptionPicEmail: null,
                subscriptionPicPhoneNumber: null,
                subscriptionPicName: null,
                subscriptionPicDepartment: null,
                subscribeStartDate: null,
                subscribeEndDate: null,
                employeeCount: null,
                useFeeDepositDate: null,
                billingStatus: ""
            },
            editCompanyData : {
                subscriptionCompanySeq: null,
                companySeq: null,
                companyName: null,
                flexbenType: null,
                flexbenCampaignSeq: "",
                subscriptionPicEmail: null,
                subscriptionPicPhoneNumber: null,
                subscriptionPicName: null,
                subscriptionPicDepartment: null,
                subscribeStartDate: null,
                subscribeEndDate: null,
                employeeCount: null,
                useFeeDepositDate: null,
                billingStatus: ""
            },
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
            await self.getCompanyData()
                .then( res =>{
                    self.registerData = res.data.data;
                    return self.registerData.companySeq
                })
                .then( companySeq => {
                    self.getFlexbenHistoryList( companySeq );
                }).catch (error => {
                    console.error(" erro ", error )
                })
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
        returnToServiceUsage(){
            const self = this;
            self.clickTabs( self.mainTabs[0] );
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
        clickSubmitCompanyData( editCompanyData ){
            const self = this;
            const { subscribeStartDate, subscribeEndDate,useFeeDepositDate, flexbenCampaignSeq, billingStatus } = editCompanyData;
            if( ! self.validationCheck( { subscribeStartDate, subscribeEndDate,useFeeDepositDate, flexbenCampaignSeq, billingStatus }) ) {
                alert( "Please enter the contents." );
                return;
            }

            if( ! self.validatePhoneNumber() ){
                alert( "Please enter a valid phone number. The number should start with either 09 or 08 and have more than 11 digits." );
                return;
            }

            if( ! self.validationTimeCheck() ){
                alert("The start date should be earlier than the end date.");
                return;
            }


            // const url = self.$api("uri", "put-company");
            // self.$axios.put( url, self.editCompanyData )
            //     .then( ( ) => {
            //         alert( " success to update ");
            //         self.getDisplayData();
            //     })
            //     .catch( alert)
        },

        validationCheck( validValues ){
            let isValid = true;
            Object.entries( validValues ).map( ([key, value] )=> {
                if( ! value ){
                    isValid = false;
                    console.log( key )
                    return;
                }
            });
            return isValid;
        },
        validatePhoneNumber() {
            const self = this;
            let { subscriptionPicPhoneNumber } = self.editCompanyData;

            subscriptionPicPhoneNumber = subscriptionPicPhoneNumber.replace(/\D/g, '');
            const regex = /^(09|08)\d{9,}$/;
            return regex.test( subscriptionPicPhoneNumber );
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
        getCompanyData(){
            const self = this;
            const urlParams = new URLSearchParams( window.location.search );
            if( ! urlParams.has( "subscriptionCompanySeq" ) ){
                return;
            }
            const subscriptionCompanySeq = urlParams.get("subscriptionCompanySeq");
            const url = self.$api("uri", "get-company");

            return self.$axios.get( `${url}/${subscriptionCompanySeq}` )
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
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
    }
}
</script>