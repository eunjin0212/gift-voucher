<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import ElementsPagination from "@/components/elements/ElementsPagination.vue"
import PopupInviteMasterAdmin from "@/pages/company/company_list/popups/popupInviteMsterAdmin.vue"
import { ValidateUtil } from "@/plugins/app-util.js";

export default {
    components: {
        AppAside,
        AppMain,
        ElementsPagination,
        PopupInviteMasterAdmin
    },
    data() {
        return {
            companyCount : null,
            items: ["Company"],
            tabs: [
                {
                name: "company",
                text: "Company",
                count : null,
                current: true,
                },
            ],
            searchOptions : [
                { text : "Company Name" , value : "COMPANY" },
                { text : "Admin Name" , value : "ADMIN" },
            ],
            companyList: [],
            showCompanyRegistration: false,
            showCompanyPop: false,
            json_query:{
                limit : 10,
                offset : null,
                companyName : null,
            },
            selectCompany: null,
            currentPage : null,
            searchRequest : {
                searchType : "COMPANY",
                companyName : null
            },
            passwordSending : {
                isOpen : true, 
            }
        };
    }, //data
    mounted() {
        const self = this;
        self.getCompanyListData(true);
    },
    methods: {
        over15CharFromFullName : ValidateUtil.over15CharFromFullName,
        over15Charaters : ValidateUtil.over15Charaters,
        convertPhoneGlobalToLocal : ValidateUtil.convertPhoneGlobalToLocal,

        clickCompany(item) {
            const self = this;
            self.showCompanyPop = true;
            self.selectCompany = item.companySeq;
            self.$nextTick( () => {
                self.$refs.companyPop.getEmployeeData();
                self.$refs.companyPop.clickTab('companyInfo', item.companySeq);
            })
        },
        companyRegistrationPop(){
            location.href="/company/company_registration"
        },
        getCompanyListData( isInit=false, offset=0 ){
            const self = this;
            self.json_query.offset = offset;
            let json_query = { ...self.json_query};

            const url = self.$api("uri", "get-company");
            json_query = JSON.stringify(json_query);
            self.$axios.get(url, { params : { json_query } }).then(res => {
                self.companyList = res.data.data.list;
                self.companyCount = res.data.data.total;
                if(isInit) self.tabs[0].count = res.data.data.total;
            });
        },
        afterClickPage( item ){
            const self = this;
            self.getCompanyListData( false, item);
        },
        searchCompanyData(){
            const self = this;
            self.json_query = {
                limit : self.json_query.limit,
                companyName : self.searchRequest.companyName,
            };

            self.getCompanyListData();
            self.currentPage = 1;
        },
        clickPasswordSending( company ){
            const self = this;
            self.passwordSending.isOpen = true;

        },
        sendingInviteEmail(){
            alert("email sending")
        }
    },
}; // export default
</script>

<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :items="items">
            <div class="flex flex-col items-end gap-5 flex-wrap p-5">
                <button class="h-12 w-fit px-5 py-3 border rounded border-indigo-600 bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition-all duration-500 text-center"
                    @click="companyRegistrationPop">
                    + Registration Company
                </button>
                <div class="flex justify-between items-center gap-3">
                    <ElementsSelect 
                        :width60="true"
                        :options="searchOptions"
                        v-model="searchRequest.searchType"
                        :readonly="true"
                    />
                    <ElementsInput
                        v-model="searchRequest.companyName"
                        placeholder="Search Company"
                        :width72="true"
                        :height11="true"
                    />
                    <ElementsButton
                        text="Search"
                        :fitContent="true"
                        :height12="true"
                        @click-event="searchCompanyData"
                    />
                </div>
            </div>
            <div class=" mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="relative min-w-full divide-y divide-gray-300  ">
                    <thead class="sticky bg-gray-50 top-0 left-0 right-0 border-b border-gray-50" style="z-index: 1;">
                        <tr>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900 sm:pl-6">Company Name</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">PIC Name</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Admin Email</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Admin Phone number</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Reg Date</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Start Date</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">End Date</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Number of Employees</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">FlexBen type</th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only">Edit</span>
                            </th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only"> Password Sending </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="(company, index) in companyList" v-bind:key="index" >
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-6">{{ company.companyName }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> henry </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> henry@sharetreats.com </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> 090000000000 </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> 07/04/2022 00:00:00 </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> 08/01/2023 00:00:00 </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> 08/01/2023 00:00:00 </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> 50 </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> A </td>
                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a href="#" class=" text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a 
                                    href="#" class="text-rose-600 hover:text-indigo-900 whitespace-normal"
                                    @click="clickPasswordSending( company )"
                                >
                                    Password Sending
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-full h-28 flex mt-4 justify-center items-center">
                <ElementsPagination
                    v-model="currentPage"
                    :totalContent="companyCount"
                    :contentsPerPage="json_query.limit"
                    @clickPage="afterClickPage"
                />
            </div>
        </AppMain>
        <Teleport to="body">
            <AppPopup
                v-model="passwordSending.isOpen"
                name="Password Sending"
            >  
                <PopupInviteMasterAdmin />
            </AppPopup>
        </Teleport>
    </div>

</template>
