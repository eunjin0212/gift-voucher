<script>
import AppAside from '@/components/AppAside.vue';
import AppMain from '@/components/main/AppMain.vue';
import ElementsPagination from '@/components/elements/ElementsPagination.vue';
import PopupInviteMasterAdmin from '@/pages/company/company_list/popups/popupInviteMsterAdmin.vue';
import MainTabs from '@/components/main/sections/MainTabs.vue';
import { ValidateUtil } from '@/plugins/app-util.js';
import moment from 'moment';
import ConfirmPopup from '@/components/ConfirmPopup.vue';

export default {
    components: {
        AppAside,
        AppMain,
        ElementsPagination,
        PopupInviteMasterAdmin,
        MainTabs,
        ConfirmPopup,
    },
    data() {
        return {
            mainTabs: [
                { text: 'HRnFLEX', name: 'HRFLEX', current: true },
                { text: 'Flexben only', name: 'FLEXBEN_ONLY', current: false },
            ],
            currentTabName: null,
            companyCount: null,
            searchOptions: [
                { text: 'Company Name', value: 'COMPANY_NAME' },
                { text: 'PIC Name', value: 'PIC_NAME' },
            ],
            CompanyStatusOptions: [
                { text: 'All', value: null },
                { text: 'Trial', value: 'TRIAL' },
                { text: 'Paid', value: 'ACTIVE' },
                { text: 'Suspended', value: 'SUSPENDED' },
            ],
            companyStatusDisplayOption: {
                TRIAL: 'Trial',
                ACTIVE: 'Paid',
                SUSPENDED: 'Suspended',
                DROP_OUT: 'Drop-out',
            },
            companyList: [],
            showCompanyRegistration: false,
            showCompanyPop: false,
            json_query: {
                limit: 10,
                offset: null,
                searchStatus: null,
                searchOption: 'COMPANY_NAME',
                searchText: null,
            },
            selectCompany: null,
            currentPage: null,
            passwordSending: {
                isOpen: false,
                companyName: '',
                inviteEmail: '',
                companySeq: '',
                invitedList: [],
            },
            targetSubscriptionCompanySeq: null,
            showChangeServiceType: false,
        };
    }, //data
    mounted() {
        const self = this;
        self.getCompanyListData();
    },
    methods: {
        over15CharFromFullName: ValidateUtil.over15CharFromFullName,
        over15Charaters: ValidateUtil.over15Charaters,
        convertPhoneGlobalToLocal: ValidateUtil.convertPhoneGlobalToLocal,
        initCompany() {
            const self = this;
            self.companyCount = null;
            self.companyList = [];
            self.selectCompany = null;
            self.currentPage = null;
            self.json_query = {
                limit: 10,
                offset: null,
                searchStatus: null,
                searchOption: 'COMPANY_NAME',
                searchText: null,
            };
        },
        clickTabs(tabItem) {
            const self = this;
            self.mainTabs.map((tab) => {
                tab.current = tabItem.name === tab.name;
            });

            self.currentTabName = self.mainTabs.find((tab) => tab.current).name;

            self.initCompany();
            self.getCompanyListData();
        },
        companyRegistrationPop() {
            const self = this;
            let registerPath = '/company/company_registration';

            // new URLSearchParams(window.location.search).get('startTab'),

            if (self.currentTabName == 'FLEXBEN_ONLY') {
                registerPath += '?companyType=FLEXBEN_ONLY';
            }

            location.href = registerPath;
        },
        getCompanyListData(offset = 0, afterClickPage = false) {
            const self = this;
            self.json_query.offset = offset;
            let json_query = { ...self.json_query };

            if (self.currentTabName == 'FLEXBEN_ONLY') {
                json_query.flexbenOnly = true;
            } else {
                json_query.flexbenOnly = false;
            }

            const url = self.$api('uri', 'get-company');
            json_query = JSON.stringify(json_query);
            self.$axios.get(url, { params: { json_query } }).then((res) => {
                self.companyList = res.data.data.list;
                self.companyCount = res.data.data.total;
                if (!afterClickPage) {
                    self.currentPage = 1;
                }
            });
        },
        afterClickPage(item) {
            const self = this;
            self.getCompanyListData(item, true);
        },
        clickPasswordSending(company) {
            console.log({ company });
            const self = this;
            self.passwordSending.isOpen = true;
            const { companyName, companySeq } = company;
            self.passwordSending = { ...self.passwordSending, companyName, companySeq, inviteEmail: '' };
            self.getInvitedAdminList(companySeq);
        },
        getInvitedAdminList(companySeq) {
            if (!companySeq) return;
            const self = this;
            const url = self.$api('uri', 'get-invite-admin');
            const params = new URLSearchParams();
            params.append('json_query', JSON.stringify({ companySeq }));
            self.$axios
                .get(url, { params })
                .then((res) => {
                    self.passwordSending.invitedList = res.data.data.list;
                })
                .catch(alert);
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
        locationToInfoPage(companySeq) {
            location.href = `/company/company_information?subscriptionCompanySeq=${companySeq}`;
        },
        dateFormatChange(date, format = 'MM/DD/yyyy') {
            if (!date) return;
            return moment(date).format(format);
        },
        getCompanyStatusDisplayOption(subscribeStatus, billingStatus) {
            if (subscribeStatus == 'SUSPENDED') {
                return 'Suspended';
            }
            if (billingStatus == 'TRIAL') {
                return 'Trial';
            }
            return 'Paid';
        },
        getServiceType() {
            if (this.currentTabName === 'FLEXBEN_ONLY') {
                return 'Flexben Only';
            }

            return 'HRnFLEX';
        },
        showChangeServiceTypePopup(subscriptionCompanySeq) {
            this.targetSubscriptionCompanySeq = subscriptionCompanySeq;
            this.showChangeServiceType = true;
        },
        changeServiceType() {
            const url = this.$api('uri', 'put-company-service-type');
            const params = {
                subscriptionCompanySeq: this.targetSubscriptionCompanySeq,
                flexbenOnlyUsageStatus: this.currentTabName === 'FLEXBEN_ONLY' ? 'DEACTIVATED' : 'ACTIVE',
            };

            this.$axios
                .put(url, params)
                .then((res) => {
                    this.targetSubscriptionCompanySeq = null;
                    this.showChangeServiceType = false;
                    this.getCompanyListData();
                })
                .catch((err) => {
                    const { code, message } = err.response.data;
                    alert('Fail to change service type');
                    return;
                });
        },
    },
}; // export default
</script>

<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Company'">
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <MainTabs :tabs="mainTabs" class="my-2" @clickEvent="clickTabs" />
                <div class="flex py-5 justify-end">
                    <button
                        class="h-12 w-fit px-5 py-3 border rounded border-indigo-600 bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition-all duration-500 text-center"
                        v-if="$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                        @click="companyRegistrationPop">
                        + Register Company
                    </button>
                </div>
                <div class="flex items-start gap-3 flex-wrap">
                    <ElementsSelect :width60="true" :options="CompanyStatusOptions" v-model="json_query.searchStatus" />
                    <ElementsSelect :width60="true" :options="searchOptions" v-model="json_query.searchOption" />
                    <ElementsInput v-model="json_query.searchText" placeholder="Search Company" :width72="true" :height11="true" />
                    <ElementsButton text="Search" :fitContent="true" :height12="true" @click-event="getCompanyListData()" />
                </div>
                <div v-if="companyList.length > 0" class="mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="w-full divide-y divide-gray-300 table-fixed">
                        <thead class="bg-gray-50 top-0 left-0 right-0 border-b border-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 w-28 text-center text-sm text-gray-900 sm:pl-6">Registered <br />Date</th>
                                <th scope="col" class="px-3 py-3.5 w-52 text-center text-sm text-gray-900">Date <br />Name</th>
                                <th scope="col" class="px-3 py-3.5 w-48 text-center text-sm text-gray-900">
                                    PIC <br />
                                    Name
                                </th>
                                <th scope="col" class="px-3 py-3.5 w-52 text-center text-sm text-gray-900">
                                    PIC <br />
                                    Email
                                </th>
                                <th scope="col" class="px-3 py-3.5 w-52 text-center text-sm text-gray-900">
                                    PIC <br />
                                    Phone <br />
                                    Number
                                </th>
                                <th scope="col" class="px-3 py-3.5 w-28 text-center text-sm text-gray-900">
                                    Suspended<br />
                                    Date
                                </th>
                                <th scope="col" class="px-3 py-3.5 w-20 text-center text-sm text-gray-900">
                                    FlexBen <br />
                                    Type
                                </th>
                                <th scope="col" class="px-3 py-3.5 w-20 text-center text-sm text-gray-900">
                                    No. of<br />
                                    Employees
                                </th>
                                <th scope="col" class="px-3 py-3.5 w-28 text-center text-sm text-gray-900">Status</th>
                                <th scope="col" class="px-3 py-3.5 w-40 text-center text-sm text-gray-900">Service Type</th>
                                <th scope="col" class="w-28 relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                                <th scope="col" class="w-32 relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only"> Password Sending </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="(company, index) in companyList" v-bind:key="index">
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900 sm:pl-6">{{ dateFormatChange(company.regDate) }}</td>
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900">{{ company.companyName }}</td>
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900">{{ company.subscriptionPicName }}</td>
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900">{{ company.subscriptionPicEmail }}</td>
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900">{{ formatPhoneNumber(company.subscriptionPicPhoneNumber) }}</td>
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900">{{ dateFormatChange(company.suspendedDate) }}</td>
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900">{{ company.flexbenTypeName }}</td>
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900">{{ company.employeeCount }}</td>
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900">
                                    {{ getCompanyStatusDisplayOption(company.companySubscribeStatus, company.billingStatus) }}
                                </td>
                                <td class="px-3 py-4 text-sm text-center break-words text-gray-900">
                                    <div class="flex justify-center items-center gap-2 text-[#4640DE]">
                                        <p>
                                            {{ getServiceType() }}
                                        </p>
                                        <div class="cursor-pointer w-6 h-6" @click="showChangeServiceTypePopup(company.subscriptionCompanySeq)">
                                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M7.87769 11.6296H7.27769H7.87769ZM7.87769 12.5556L7.4285 12.9533C7.53673 13.0756 7.69009 13.1484 7.8532 13.1551C8.01631 13.1617 8.17509 13.1016 8.29293 12.9887L7.87769 12.5556ZM9.91537 11.4331C10.1546 11.2038 10.1626 10.8239 9.93322 10.5848C9.70389 10.3456 9.32407 10.3376 9.08488 10.5669L9.91537 11.4331ZM6.94931 10.6022C6.72961 10.3541 6.35041 10.3311 6.10234 10.5508C5.85426 10.7705 5.83125 11.1497 6.05094 11.3978L6.94931 10.6022ZM15.5419 8.90744C15.7669 9.15069 16.1465 9.16547 16.3898 8.94044C16.633 8.71542 16.6478 8.33581 16.4228 8.09256L15.5419 8.90744ZM12.5438 6.4C9.63987 6.4 7.27769 8.73695 7.27769 11.6296H8.47769C8.47769 9.40856 10.2937 7.6 12.5438 7.6V6.4ZM7.27769 11.6296L7.27769 12.5556H8.47769L8.47769 11.6296H7.27769ZM8.29293 12.9887L9.91537 11.4331L9.08488 10.5669L7.46244 12.1225L8.29293 12.9887ZM8.32687 12.1578L6.94931 10.6022L6.05094 11.3978L7.4285 12.9533L8.32687 12.1578ZM16.4228 8.09256C15.4605 7.05232 14.078 6.4 12.5438 6.4V7.6C13.7313 7.6 14.7983 8.10363 15.5419 8.90744L16.4228 8.09256Z"
                                                    fill="currentColor" />
                                                <path
                                                    d="M17.1188 11.4445L17.5673 11.046C17.459 10.924 17.3056 10.8514 17.1425 10.8449C16.9795 10.8385 16.8209 10.8987 16.7032 11.0117L17.1188 11.4445ZM15.0844 12.5664C14.8454 12.7959 14.8377 13.1758 15.0673 13.4148C15.2968 13.6538 15.6766 13.6614 15.9156 13.4319L15.0844 12.5664ZM18.0515 13.3976C18.2715 13.6454 18.6508 13.6678 18.8985 13.4477C19.1462 13.2276 19.1686 12.8484 18.9485 12.6006L18.0515 13.3976ZM9.4375 15.1075C9.21074 14.8659 8.83103 14.8538 8.5894 15.0806C8.34778 15.3073 8.33573 15.6871 8.5625 15.9287L9.4375 15.1075ZM12.4348 17.6C15.3464 17.6 17.7188 15.2652 17.7188 12.3704H16.5188C16.5188 14.5893 14.6969 16.4 12.4348 16.4V17.6ZM17.7188 12.3704V11.4445H16.5188V12.3704H17.7188ZM16.7032 11.0117L15.0844 12.5664L15.9156 13.4319L17.5344 11.8772L16.7032 11.0117ZM16.6702 11.843L18.0515 13.3976L18.9485 12.6006L17.5673 11.046L16.6702 11.843ZM8.5625 15.9287C9.52743 16.9569 10.9063 17.6 12.4348 17.6V16.4C11.2491 16.4 10.1835 15.9023 9.4375 15.1075L8.5625 15.9287Z"
                                                    fill="currentColor" />
                                                <path
                                                    d="M2.5 12C2.5 7.28595 2.5 4.92893 3.96447 3.46447C5.42893 2 7.78595 2 12.5 2C17.214 2 19.5711 2 21.0355 3.46447C22.5 4.92893 22.5 7.28595 22.5 12C22.5 16.714 22.5 19.0711 21.0355 20.5355C19.5711 22 17.214 22 12.5 22C7.78595 22 5.42893 22 3.96447 20.5355C2.5 19.0711 2.5 16.714 2.5 12Z"
                                                    stroke="currentColor"
                                                    stroke-width="1.2" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                                <td class="relative px-3 py-4 text-right text-sm font-medium sm:pr-6 break-words">
                                    <ElementsButton :text="'Info'" :fitContent="true" :bgWhiteAndtextIndigo="true" :height12="true" @click-event="locationToInfoPage(company.subscriptionCompanySeq)" />
                                </td>
                                <td class="relative px-3 py-4 text-right text-sm font-medium sm:pr-6 break-words">
                                    <div class="flex justify-center items-center" v-if="$appUtil.checkPermission('COMPANY_SETTING_EDIT')">
                                        <div
                                            v-if="company.companySubscribeStatus == 'ACTIVE'"
                                            class="cursor-pointer border rounded hover:bg-red-100 border-rose-400 w-24 py-1 transition-all duration-500 text-center">
                                            <div href="#" class="text-rose-600 whitespace-normal" @click="clickPasswordSending(company)">Password Sending</div>
                                        </div>
                                        <div v-else-if="company.companySubscribeStatus == 'SUSPENDED'" class="text-center text-sm text-gray-600">
                                            Suspended <br />
                                            Company
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="mt-10 flex flex-col items-center h-full justify-center gap-5">
                    <div class="text-gray-500">No Company Data</div>
                </div>
                <div class="w-full h-28 flex mt-4 justify-center items-center">
                    <ElementsPagination v-model="currentPage" :totalContent="companyCount" :contentsPerPage="json_query.limit" @clickPage="afterClickPage" />
                </div>
            </div>
        </AppMain>
        <Teleport to="body">
            <AppPopup v-model="passwordSending.isOpen" name="Password Sending">
                <PopupInviteMasterAdmin v-model="passwordSending" @closePopup="passwordSending.isOpen = false" />
            </AppPopup>
            <ConfirmPopup 
                v-model="showChangeServiceType" 
                confirmDescription="Are you sure you want to change the company's service type?" 
                buttonText="OK"
                :hasAfterConfirm="true"
                @after-confirm="changeServiceType"
            />
        </Teleport>
    </div>
</template>
