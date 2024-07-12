<script>
import AppAside from '@/components/AppAside.vue';
import AppMain from '@/components/main/AppMain.vue';
import ElementsPagination from '@/components/elements/ElementsPagination.vue';
import PopupInviteMasterAdmin from '@/pages/company/company_list/popups/popupInviteMsterAdmin.vue';
import { ValidateUtil } from '@/plugins/app-util.js';
import moment from 'moment';

export default {
    components: {
        AppAside,
        AppMain,
        ElementsPagination,
        PopupInviteMasterAdmin,
    },
    data() {
        return {
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
        companyRegistrationPop() {
            location.href = '/company/company_registration';
        },
        getCompanyListData(offset = 0, afterClickPage = false) {
            const self = this;
            self.json_query.offset = offset;
            let json_query = { ...self.json_query };

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
                    console.log(res.data.data.list);
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
    },
}; // export default
</script>

<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Company'">
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <div class="flex py-5 justify-end">
                    <button
                        class="h-12 w-fit px-5 py-3 border rounded border-indigo-600 bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition-all duration-500 text-center"
                        v-if="$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                        @click="companyRegistrationPop">
                        + Registration Company
                    </button>
                </div>
                <div class="flex items-start gap-3 flex-wrap">
                    <ElementsSelect :width60="true" :options="CompanyStatusOptions" v-model="json_query.searchStatus" />
                    <ElementsSelect :width60="true" :options="searchOptions" v-model="json_query.searchOption" />
                    <ElementsInput v-model="json_query.searchText" placeholder="Search Company" :width72="true" :height11="true" />
                    <ElementsButton text="Search" :fitContent="true" :height12="true" @click-event="getCompanyListData()" />
                </div>
                <div v-if="companyList.length > 0" class="mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="relative min-w-full divide-y divide-gray-300">
                        <thead class="sticky bg-gray-50 top-0 left-0 right-0 border-b border-gray-50" style="z-index: 1">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-6">Reg <br />Date</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Company <br />Name</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">
                                    PIC <br />
                                    Name
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">
                                    PIC <br />
                                    Email
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">
                                    PIC <br />
                                    Phone <br />
                                    Number
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">
                                    Suspended<br />
                                    Date
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">
                                    FleBen <br />
                                    Type
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">
                                    Usage <br />
                                    Employees
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Status</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only"> Password Sending </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="(company, index) in companyList" v-bind:key="index">
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900 sm:pl-6">{{ dateFormatChange(company.regDate) }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{ company.companyName }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{ company.subscriptionPicName }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{ company.subscriptionPicEmail }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{ formatPhoneNumber(company.subscriptionPicPhoneNumber) }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{ dateFormatChange(company.suspendedDate) }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{ company.flexbenTypeName }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{ company.employeeCount }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">
                                    {{ getCompanyStatusDisplayOption(company.companySubscribeStatus, company.billingStatus) }}
                                </td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <ElementsButton :text="'Info'" :fitContent="true" :bgWhiteAndtextIndigo="true" :height12="true" @click-event="locationToInfoPage(company.subscriptionCompanySeq)" />
                                </td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div v-if="$appUtil.checkPermission('COMPANY_SETTING_EDIT')">
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
        </Teleport>
    </div>
</template>
