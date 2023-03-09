<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import ElementsPagination from "@/components/elements/ElementsPagination.vue"
import PopupInviteMasterAdmin from "@/pages/company/company_list/popups/popupInviteMsterAdmin.vue"
import { ValidateUtil } from "@/plugins/app-util.js";
import moment from 'moment';

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
            tabs: [
                {
                name: "company",
                text: "Company",
                count : null,
                current: true,
                },
            ],
            searchOptions : [
                { text : "Company Name" , value : "COMPANY_NAME" },
                { text : 'PIC Name' , value : 'PIC_NAME'}
            ],
            billingStatusOptions : [
                { text : "All" , value : null },
                { text : "Trial" , value : "TRIAL" },
                { text : "Billing" , value : "BILLING" },
            ],
            companyList: [],
            showCompanyRegistration: false,
            showCompanyPop: false,
            json_query:{
                limit : 10,
                offset : null,
                billingStatus : null,
                searchOption : "COMPANY_NAME",
                searchText : null
            },
            selectCompany: null,
            currentPage : null,
            passwordSending : {
                isOpen : false,
                companyName : "",
                inviteEmail : "",
                companySeq : "",
                invitedList : []
            }
        };
    }, //data
    mounted() {
        const self = this;
        self.getCompanyListData();
    },
    methods: {
        over15CharFromFullName : ValidateUtil.over15CharFromFullName,
        over15Charaters : ValidateUtil.over15Charaters,
        convertPhoneGlobalToLocal : ValidateUtil.convertPhoneGlobalToLocal,
        companyRegistrationPop(){
            location.href="/company/company_registration"
        },
        getCompanyListData( offset=0, afterClickPage = false ){
            const self = this;
            self.json_query.offset = offset;
            let json_query = { ...self.json_query };

            const url = self.$api("uri", "get-company");
            json_query = JSON.stringify(json_query);
            self.$axios.get(url, { params : { json_query } }).then(res => {
                self.companyList = res.data.data.list;
                self.companyCount = res.data.data.total;
                if( ! afterClickPage ){
                    self.currentPage = 1;
                }
            });
        },
        afterClickPage( item ){
            const self = this;
            self.getCompanyListData( item , true );
        },
        clickPasswordSending( company ){
            console.log({company})
            const self = this;
            self.passwordSending.isOpen = true;
            const { companyName, companySeq } = company;
            self.passwordSending = { ...self.passwordSending, companyName, companySeq, inviteEmail : "" };
            self.getInvitedAdminList( companySeq );
        },
        getInvitedAdminList( companySeq ){
            if( ! companySeq ) return;
            const self = this;
            const url = self.$api("uri", "get-invite-admin")
            const params = new URLSearchParams();
            params.append( "json_query", JSON.stringify({ companySeq }) )
            self.$axios.get( url, { params } ).then( (res ) => {
                self.passwordSending.invitedList = res.data.data.list;
                console.log( res.data.data.list )
            })
            .catch( alert )
        },
        changeCamelCase( value ){
            switch (value) {
                case 'BILLING':	return 'Billing';
                case 'TRIAL': return 'Trial';
                default : return "";
            }
        },
        formatPhoneNumber(phoneNumber) {
            const regex = /^(\d{4})(\d{3})(\d{1,})$/;
            const match = regex.exec(phoneNumber);

            if (match) {
                const formattedNumber = `${match[1]}-${match[2]}-${match[3]}`;
                return formattedNumber;
            }
            return phoneNumber;
        },
        locationToInfoPage( companySeq ){
            location.href=`/company/company_information?subscriptionCompanySeq=${companySeq}`;
        },
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
    },
}; // export default
</script>

<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Company'">
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <div class="flex py-5 justify-end">
                    <button class="h-12 w-fit px-5 py-3 border rounded border-indigo-600 bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition-all duration-500 text-center"
                        @click="companyRegistrationPop">
                        + Registration Company
                    </button>
                </div>
                <div class="flex items-start gap-3">
                    <ElementsSelect
                        :width60="true"
                        :options="billingStatusOptions"
                        v-model="json_query.billingStatus"
                    />
                    <ElementsSelect
                        :width60="true"
                        :options="searchOptions"
                        v-model="json_query.searchOption"
                    />
                    <ElementsInput
                        v-model="json_query.searchText"
                        placeholder="Search Company"
                        :width72="true"
                        :height11="true"
                    />
                    <ElementsButton
                        text="Search"
                        :fitContent="true"
                        :height12="true"
                        @click-event="getCompanyListData()"
                    />
                </div>

                <div class=" mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="relative min-w-full divide-y divide-gray-300  ">
                        <thead class="sticky bg-gray-50 top-0 left-0 right-0 border-b border-gray-50" style="z-index: 1;">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900 sm:pl-6">Company Name</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Billing Status</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">PIC Name</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">PIC Email</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">PIC Phone Number</th>
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
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">  {{ changeCamelCase(company.billingStatus) }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">  {{ company.subscriptionPicName }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ company.subscriptionPicEmail }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ formatPhoneNumber(company.subscriptionPicPhoneNumber) }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ dateFormatChange(company.subscribeStartDate) }}  </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ dateFormatChange(company.subscribeEndDate) }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ dateFormatChange(company.useFeeDepositDate) }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ company.employeeCount }} </td>
                                <td class="whitespace-pre-wrap px-3 py-4 text-sm text-gray-900"> {{ company.flexbenType }} </td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <ElementsButton
                                        :text="'Info'"
                                        :fitContent="true"
                                        :bgWhiteAndtextIndigo="true"
                                        :height12="true"
                                        @click-event="locationToInfoPage(company.subscriptionCompanySeq)"
                                    />
                                </td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div class="cursor-pointer border rounded border-rose-400 w-24 py-1 transition-all duration-500 text-center">
                                        <a
                                            href="#" class="text-rose-600  hover:bg-red-100 whitespace-normal"
                                            @click="clickPasswordSending( company )"
                                        >
                                            Password Sending
                                        </a>
                                    </div>
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
            </div>
        </AppMain>
        <Teleport to="body">
            <AppPopup
                v-model="passwordSending.isOpen"
                name="Password Sending"
            >
                <PopupInviteMasterAdmin
                    v-model="passwordSending"
                    @closePopup="passwordSending.isOpen=false"
                />
            </AppPopup>
        </Teleport>
    </div>

</template>
