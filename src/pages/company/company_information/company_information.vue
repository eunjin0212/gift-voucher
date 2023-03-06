<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
            <AppMain :headerName="registerData.companyName">
                <div class="flex justify-between">
                    <MainTabs :tabs="mainTabs" class="mt-9" @clickEvent="clickTabs" />
                    <ElementsButton
                        text="Back To List"
                        :bgWhiteAndtextIndigo="true"
                        :fitContent="true"
                        @click="backToCompanyList"
                    />
                </div>
                <div id="service-usage-info" class="mt-6" v-show="mainTabs.find( tab=> tab.name === 'SERVICE_USAGE_INFO' ).current === true">
                    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
                        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl class="sm:divide-y sm:divide-gray-200">
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Start Date</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 justify-self-end">
                                        {{ registerData.subscribeStartDate }}
                                    </dd>
                                </div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">End Date</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 justify-self-end">
                                        {{ registerData.subscribeEndDate }}
                                    </dd>
                                </div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Number of Usage employees</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 justify-self-end">
                                        {{ registerData.employeeCount }}
                                    </dd>
                                </div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">FlexBen Type</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 justify-self-end">
                                        {{ registerData.flexbenType }}
                                    </dd>
                                </div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Master Admin </dt>
                                    <dd
                                        class="mt-1 text-sm  sm:col-span-2 sm:mt-0 justify-self-end text-blue-600 cursor-pointer"
                                        @click="OpenMasterAdminList()"
                                    >
                                        List
                                    </dd>
                                </div>

                            </dl>
                        </div>
                    </div>

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
                </div> <!-- SERVICE_USAGE_INFO -->

                <div id="company-info"  v-show="mainTabs.find( tab=> tab.name === 'COMPANY_INFO' ).current === true" class="bg-white shadow-md shadow-gray-200 p-4 mt-6">
                    <form @submit.prevent="clickSubmitCompanyData">
                        <div class="my-2 flex flex-col gap-4" >
                            <ElementsInput
                                :name="'Company Name'"
                                :width72="true"
                                :maxlength="60"
                                v-model="editCompanyData.companyName"
                                :required="true"
                            />
                            <ElementsInput
                                :name="'PIC Name'"
                                :full="true"
                                :maxlength="60"
                                v-model="editCompanyData.subscriptionPicName"
                                :required="true"
                            />
                            <ElementsInput
                                :name="'PIC Department'"
                                :full="true"
                                :maxlength="60"
                                :required="true"
                                v-model="editCompanyData.subscriptionPicDepartment"
                            />
                            <ElementsInput
                                :name="'PIC Email'"
                                :full="true"
                                :inputtype="'email'"
                                :maxlength="100"
                                :required="true"
                                v-model="editCompanyData.subscriptionPicEmail"
                            />
                            <ElementsInput
                                :name="'PIC Phone number'"
                                :full="true"
                                :maxlength="60"
                                :inputtype="'number'"
                                :required="true"
                                v-model="editCompanyData.subscriptionPicPhoneNumber"
                            />
                        </div>
                        <div class="my-7 flex flex-col gap-4">
                            <div class="text-2xl font-bold"> Service Usage Information </div>
                            <ElementsDate
                                :name="'Start Date'"
                                v-model="editCompanyData.subscribeStartDate"
                            />
                            <ElementsDate
                                :name="'End Date'"
                                v-model="editCompanyData.subscribeEndDate"
                            />
                            <div>
                                <h1 class="text-sm font-semibold text-slate-800"> Number of Employee </h1>
                                <input type="number"
                                    class="w-44 mt-1 shadow-sm block sm:text-sm border-gray-300 rounded-md"
                                    :min="1"
                                    v-model="editCompanyData.employeeCount"
                                    :required="true"
                                />
                            </div>
                            <ElementsDate
                                :name="'Use Fee Deposit Date'"
                                v-model="editCompanyData.useFeeDepositDate"
                            />
                            <ElementsSelect
                                :name="'FlexBen Type'"
                                :full="true"
                                :options="flexbenTypeOptions"
                                v-model="editCompanyData.flexbenCampaignSeq"
                            />
                            <ElementsSelect
                                :name="'Billing Stauts'"
                                :full="true"
                                :options="billingStatusOptions"
                                v-model="editCompanyData.billingStatus"
                            />
                        </div>
                        <div class="flex justify-end gap-4 my-3">
                            <ElementsButton
                                :backgroundWhite="true" :width32="true"
                                :text="'Cancel'"
                                :inputtype="'button'"
                                @click="returnToServiceUsage"
                            />
                            <ElementsButton
                                :width32="true"
                                :text="'submit'"
                                :inputtype="'submit'"
                            />
                        </div>
                    </form>

                </div>
            </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import MainTabs from "@/components/main/sections/MainTabs.vue"

export default {
    components : {
        AppAside, AppMain, MainTabs    },
    mounted(){
        const self = this;
        self.getFlexbenType();
        self.getCompanyData();
    },
    data(){
        return{
            mainTabs : [
                { text : "Service Usage Info", name : "SERVICE_USAGE_INFO", current : true },
                { text : "Company Info" , name : "COMPANY_INFO", current : false },
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
            json_query : {
                companySeq : null,
            },
        }


    },
    methods :{
        returnToServiceUsage(){
            const self = this;
            self.clickTabs( self.mainTabs[0] );
        },
        backToCompanyList(){
            location.href='/company/company_list';
        },
        clickTabs( tabItem ){
            const self = this;
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
            })

            if( tabItem.name === "COMPANY_INFO" ){
                self.editCompanyData = { ...self.registerData };
            }
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
        clickSubmitCompanyData(){
            const self = this;
            const { subscribeStartDate, subscribeEndDate,useFeeDepositDate, flexbenCampaignSeq, billingStatus } = self.editCompanyData;
            if( ! self.validationCheck( { subscribeStartDate, subscribeEndDate,useFeeDepositDate, flexbenCampaignSeq, billingStatus }) ) {
                alert( "Can’t be blank");
                return;
            }
            const url = self.$api("uri", "put-company");
            self.$axios.put( url, self.editCompanyData )
                .then( ( ) => {
                    alert( " success to update ");
                    self.getCompanyData();
                })
                .catch( alert)
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
        getCompanyData(){
            const self = this;
            const urlParams = new URLSearchParams( window.location.search );
            if( ! urlParams.has( "subscriptionCompanySeq" ) ){
                return;
            }
            const companySeq = urlParams.get("subscriptionCompanySeq");
            const url = self.$api("uri", "get-company");

            self.$axios.get( `${url}/${companySeq}` )
                .then( res => {
                    self.json_query.companySeq = res.data.data.companySeq;
                    self.registerData = { ...res.data.data };
                } )
                .catch( alert );

        },
        OpenMasterAdminList(){
            const self = this;
            self.json_query = { ...self.json_query };

            const params = new URLSearchParams();
            params.append( "json_query", JSON.stringify( self.json_query ) );

            const url = self.$api("uri", "get-company-admin");
            self.$axios.get( url, { params } )
                .then((res) =>{
                    self.masterAdmin.isOpen = true;
                    self.masterAdmin.list = res.data.data.list;
                })
                .catch( alert )
        },
        afterClickPage( item ){
            const self = this;
            self.OpenMasterAdminList( item, false );
        }
    }
}
</script>