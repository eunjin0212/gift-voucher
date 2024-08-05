<template>
    <div v-show="visible">
        <div class="flex justify-between py-1">
            <div class="flex justify-start gap-5">
                <ArrowLeftIcon v-show="!isReadMode(settingMode)" class="w-7 cursor-pointer" @click="backSettingMode" />
                <h1 class="text-zinc-800 text-xl font-semibold leading-10 items-center ">
                    {{isInsertMode(settingMode) ? "Update " : isEditMode(settingMode) ? "Edit" : "" }} Pag-ibig
                </h1>
            </div>
            <div v-if="$appUtil.checkPermission('PAYROLL_EDIT')" v-show="isReadMode(settingMode)" class="gap-3 flex justify-between">
                <ElementsButton
                :text="'+ Update'"
                :width32="true"
                class="mt-1"
                @clickEvent="changeAddSettingPage()"
                />
            </div>
        </div>

        <div class="flex border border-solid rounded-lg w-2/3 h-20 mt-0" style="border-color: #9F9CEE; background-color: #F8F8FD;">
            <img
            class="h-5 w-5 mx-2.5 mt-4"
            :src="require(`@/assets/img/payroll-info.svg`)"
            alt="app-side-8"
            />
            <p class="text-left pt-4 font-medium">
                The selected table is immediately reflected in the service.<br />
                Please be careful when edit it.
            </p>
        </div>

        <!-- read page -->
        <div v-if="isReadMode(settingMode)">
            <div v-if="settingCount > 0" class="mt-10 overflow-auto pb-[5vh] md:rounded-lg">
                    <table class="divide-y divide-gray-300 w-full shadow border-[1px] border-black border-opacity-10">
                        <thead class="bg-[#F8F8FD] w-full">
                            <tr>
                                <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">No</th>
                                <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">Reg<br />Date</th>
                                <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">Status</th>
                                <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">Title</th>
                                <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">Application Period</th>
                            </tr>
                        </thead>
                        <tbody class=" bg-white table-fixed">
                            <tr v-for="(setting, index) in settingList" v-bind:key="index"
                                :class="{ 'bg-[#F8F8FD]': (index % 2 !== 0) }"
                            >
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{settingCount - ((currentPage - 1) * pageCondition.limit) - index}}</td>
                                <td class="whitespace-pre px-3 py-4 text-sm text-center text-gray-900">{{convertToDateTimeForViewFormat(setting.writeDatetime)}}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{setting.settingStatus}}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">
                                    <a href="#" class="underline font-medium text-blue-600 dark:text-blue-500" @click.prevent="getPayrollSettingDetail(setting.payrollSettingSeq, setting.settingStatus)">
                                        {{setting.settingTitle}}
                                    </a>
                                </td>
                                <td class="whitespace-normal px-3 py-4 text-sm text-center text-gray-900">
                                    <span>
                                        {{convertToDateForInputFormat(setting.startDatetime)}} ~ {{convertToDateForInputFormat(setting.endDatetime)}}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>

            <div v-else class="mt-10 flex flex-col items-center h-full justify-center gap-5">
                <div class="text-gray-500"> No Settings </div>
            </div>

            <div class="w-full h-28 flex mt-1 justify-center items-center">
                <ElementsPagination
                    v-model="currentPage"
                    :totalContent="settingCount"
                    :contentsPerPage="pageCondition.limit"
                    @clickPage="clickPage"
                />
            </div>
        </div>

        <!-- insert page -->
        <div v-else-if="isInsertMode(settingMode)">
            <div class="mt-8 p-3 rounded-lg w-full bg-white shadow-md shadow-gray-200 flex flex-col">
                <form @submit.prevent="registerSetting()">
                    <div class="my-2 w-full flex flex-col gap-8" >
                        <div class="flex justify-start gap-2">
                            <span class="mt-2 w-48">Title*</span>
                            <ElementsInput
                                v-model="registerData.settingTitle"
                                :width72="true"
                                :maxlength="60"
                                :required="true"
                            />
                            </div>
                            
                        <div class="flex w-full justify-start gap-2">
                            <span class="mt-2 w-48">Application Start Date*</span>
                            <ElementsDate
                                v-model="registerData.startDatetime"
                                :width72="true"
                                :required="true"
                                :lowerLimit="startDatetimeLowerLimit"
                                :placeholder="'mm/dd/yyyy'"
                            />
                        </div>
                    </div>
                        
                    <div class="pb-36 mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="relative min-w-full divide-y divide-gray-300 table-fixed">
                            <thead class="sticky top-0 left-0 right-0 text-white" style="z-index: 1; background: #4031B8;">
                                <tr>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">From</th>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">To</th>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">Type</th>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">Employee</th>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">Employer</th>
                                </tr>
                            </thead>
                            <tbody class=" bg-white">
                                <tr v-for="(pagIbig, index) in registerData.pagIbigFormList" v-bind:key="index" class="border-x border-y border-solid border-gray-200">
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsInput v-model="pagIbig.rangeOfCompensationFrom" :isNumber="true" :full="true" :required="true" /></td>
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsInput v-model="pagIbig.rangeOfCompensationTo" :isNumber="true" :full="true" :required="true" /></td>
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsSelect v-model="pagIbig.moneyType" :options="moneyTypeOption" :full="true" class="mt-[16px] h-[48px] rounded" /></td>
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsInput v-model="pagIbig.pagIbigEmployee" :isNumber="true" :full="true" :required="true" /></td>
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsInput v-model="pagIbig.pagIbigEmployer" :isNumber="true" :full="true" :required="true" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div v-if="$appUtil.checkPermission('PAYROLL_EDIT')" class="flex justify-start gap-4 mt-10">
                        <ElementsButton
                            :width32="true"
                            :text="'Update'"
                            :inputtype="'submit'"
                        />
                    </div>
                </form>
            </div>
        </div>

        <!-- detail page -->
        <div v-else-if="isDetailMode(settingMode)">
            <div class="mt-8 p-3 rounded-lg w-full bg-white shadow-md shadow-gray-200 flex flex-col">
                <div class="my-2 w-full flex flex-col gap-8" >
                    <div class="flex justify-start gap-2">
                        <span class="mt-2 w-48">Title*</span>
                        <span class="mt-2">{{ settingDetail.settingTitle }}</span>
                    </div>
                
                    <div class="flex w-full justify-start gap-2">
                        <span class="mt-2 w-48">Application Start Date*</span>
                        <span class="mt-2">{{ settingDetail.startDatetime }}</span>
                    </div>
                </div>

                <div class=" mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="relative min-w-full divide-y divide-gray-300 table-auto">
                        <thead class="sticky top-0 left-0 right-0 text-white" style="z-index: 1; background: #4031B8;">
                            <tr>
                                <th scope="col" colspan="2" class="px-3 py-3 border border-solid border-white text-center text-sm">Range of Compensation</th>
                                <th scope="col" colspan="4" class="px-3 py-3 border border-solid border-white text-center text-sm">Contribution</th>
                            </tr>
                            <tr>
                                <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">From</th>
                                <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">To</th>
                                <th scope="col" class="px-3 py-3 w-12 border-x border-solid border-white text-center text-sm">Type</th>
                                <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">Employee</th>
                                <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">Employer</th>
                                <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">Total</th>
                            </tr>
                        </thead>
                        <tbody class=" bg-white">
                            <tr v-for="(detail, index) in settingDetail.pagIbigFormList" v-bind:key="index" class="border-x border-y border-solid border-gray-200">
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span>{{ fitDecimalFormatWithComma(detail.rangeOfCompensationFrom) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span>{{ fitDecimalFormatWithComma(detail.rangeOfCompensationTo) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span>{{ getDisplayTextOfMoneyType(detail.moneyType) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span>{{ fitDecimalFormatWithComma(detail.pagIbigEmployee) }}{{ makeMoneyTypeString(detail.moneyType) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span>{{ fitDecimalFormatWithComma(detail.pagIbigEmployer) }}{{ makeMoneyTypeString(detail.moneyType) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span>{{ fitDecimalFormatWithComma(detail.pagIbigEmployee + detail.pagIbigEmployer) }}{{ makeMoneyTypeString(detail.moneyType) }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="$appUtil.checkPermission('PAYROLL_EDIT')" class="flex justify-start gap-4 mt-10">
                    <ElementsButton
                        v-show="canSettingEditAndDelete"
                        :width32="true"
                        :text="'Delete'"
                        :inputtype="'button'"
                        :backgroundRed="true"
                        @click="changeDeletePopupVisible(true)"
                        @update:modelValue="changeDeletePopupVisible"
                    />
                    <ElementsButton
                        v-show="canSettingEditAndDelete"
                        :width32="true"
                        :text="'Edit'"
                        :inputtype="'submit'"
                        @click="changeEditSettingPage()"
                    />
                </div>
            </div>

            <Teleport to="body">
                <AppPopup
                    v-model="deletePopupVisible"
                    name="Delete Setting"
                    :backgroundRed="true"
                    button-text="Delete"
                    @button-event="deleteSetting()"
                >
                <div class="p-6 space-y-6 text-center">Are you sure to delete?</div>
                </AppPopup>
            </Teleport>
        </div>

        <!-- edit page -->
        <div v-else-if="isEditMode(settingMode)">
            <div class="mt-8 p-3 rounded-lg w-full bg-white shadow-md shadow-gray-200 flex flex-col">
                <form @submit.prevent="updateSetting()">
                    <div class="my-2 w-full flex flex-col gap-8" >
                        <div class="flex justify-start gap-2">
                            <span class="mt-2 w-48">Title*</span>
                            <ElementsInput
                                v-model="updateData.settingTitle"
                                :width72="true"
                                :maxlength="60"
                                :required="true"
                            />
                        </div>
                        
                        <div class="flex w-full justify-start gap-2">
                            <span class="mt-2 w-48">Application Start Date*</span>
                            <ElementsDate
                                v-model="updateData.startDatetime"
                                :width72="true"
                                :required="true"
                                :lowerLimit="startDatetimeLowerLimit"
                                :placeholder="'mm/dd/yyyy'"
                            />
                        </div>
                    </div>
                    
                    <div class="pb-36 mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table class="relative min-w-full divide-y divide-gray-300 table-auto">
                            <thead class="sticky top-0 left-0 right-0 text-white" style="z-index: 1; background: #4031B8;">
                                <tr>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">From</th>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">To</th>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">Type</th>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">Employee</th>
                                    <th scope="col" class="px-3 py-3 w-40 border-x border-solid border-white text-center text-sm">Employer</th>
                                </tr>
                            </thead>
                            <tbody class=" bg-white">
                                <tr v-for="(pagIbig, index) in updateData.pagIbigFormList" v-bind:key="index" class="border-x border-y border-solid border-gray-200">
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsInput v-model="pagIbig.rangeOfCompensationFrom" :isNumber="true" :full="true" :required="true" /></td>
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsInput v-model="pagIbig.rangeOfCompensationTo" :isNumber="true" :full="true" :required="true" /></td>
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsSelect v-model="pagIbig.moneyType" :options="moneyTypeOption" :full="true" class="mt-[16px] h-[48px] rounded" /></td>
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsInput v-model="pagIbig.pagIbigEmployee" :isNumber="true" :full="true" :required="true" /></td>
                                    <td class="px-3 py-4 border-x border-solid border-gray-200 text-sm text-gray-900"><ElementsInput v-model="pagIbig.pagIbigEmployer" :isNumber="true" :full="true" :required="true" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-if="$appUtil.checkPermission('PAYROLL_EDIT')" class="flex justify-start gap-4 mt-10">
                        <ElementsButton
                            :width32="true"
                            :text="'Update'"
                            :inputtype="'submit'"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { SETTING_TYPE, SETTING_MODE, SETTING_STATUS, PAYROLL_MONEY_TYPE } from "@/pages/payroll/payroll_settings/constants/enum-payroll-setting";
import { payrollValidator, payrollDateTimeConverter, payrollStringMaker } from "@/pages/payroll/payroll_settings/util/payroll-util";
import { MONEY_TYPE_OPTION } from "@/pages/payroll/payroll_settings/constants/enum-payroll-option";
import AppPopup from "@/components/AppPopup.vue";
import { ArrowLeftIcon  } from '@heroicons/vue/solid';

export default {
    components : {
        AppPopup, ArrowLeftIcon
    },
    props : {
        visible : Boolean,
        tabName : String
    },
    data(){
        return{
            settingType : SETTING_TYPE.PAG_IBIG,
            settingMode : SETTING_MODE.READ,
            settingCount : 0,
            settingList : [],
            currentPage : 0,
            pageCondition:{
                limit : 10,
                offset : 0,
                settingType : null
            },
            moneyTypeOption: MONEY_TYPE_OPTION,
            startDatetimeLowerLimit : null,
            registerData : {
                settingTitle : null,
                startDatetime : null,
                settingType : null,
                startDatetimeLowerLimit : null,
                pagIbigFormList : []
            },
            canSettingEditAndDelete : false,
            detailData : {
                settingType : null,
                payrollSettingSeq : null
            },
            settingDetail : {
                payrollSettingSeq : null,
                settingTitle : null,
                startDatetime : null,
                pagIbigFormList : []
            },
            updateData : {
                payrollSettingSeq : null,
                settingTitle : null,
                startDatetime : null,
                settingType : null,
                startDatetimeLowerLimit : null,
                pagIbigFormList : []
            },
            deletePopupVisible : false
        }
    },
    methods : {
        backSettingMode() {
            const self = this;
            if (self.settingMode === SETTING_MODE.EDIT) {
                self.settingMode = SETTING_MODE.DETAIL;
            } else {
                self.settingMode = SETTING_MODE.READ;
            }
        },
        clickPage(offset) {
            const self = this;
            self.getSettingList(offset);
        },
        changeAddSettingPage(){
            const self = this;
            if (self.settingList.length > 0) {
                const lastSettingStatus = self.settingList[0].settingStatus;
                if (self.invalidSettingStatus(lastSettingStatus)) {
                    return;
                }

                if (lastSettingStatus === SETTING_STATUS.SCHEDULED) {
                    alert("The update is already in progress.");
                    return;
                }
            }

            const url = self.$api("uri", "get-payroll-setting-default-values");
            let defaultValuesForm = {
                settingType : self.settingType
            };
            let jsonParam = JSON.stringify(defaultValuesForm);
            self.$axios.get(url, {params : {jsonParam}})
            .then(res => {
                // alert(res.data.message);
                // console.log(res);

                self.registerData.settingTitle = null;
                self.registerData.startDatetime = null;
                const tomorrow = moment().add(1, 'days').format();
                self.startDatetimeLowerLimit = tomorrow;
                
                self.registerData.pagIbigFormList.splice(0, self.registerData.pagIbigFormList.length);
                self.registerData.pagIbigFormList = res.data.data.defaultValues;

                self.settingMode = SETTING_MODE.INSERT;
            })
            .catch( err => {
                let { code, message } = err.response.data;
                alert(code);
                alert(message);
            });
        },
        getSettingList(offset = 0) {
            const self = this;
            if (self.invalidSettingType(self.settingType)) {
                return;
            }
            self.pageCondition.settingType = self.settingType;
            self.pageCondition.offset = offset;

            const url = self.$api("uri", "get-payroll-setting");
            let jsonParam = JSON.stringify(self.pageCondition);

            self.$axios.get(url, {params : {jsonParam}})
            .then(res => {
                // alert(res.data.message);
                // console.log(res);
                self.settingCount = res.data.data.settingList.length;

                self.settingList.splice(0, self.settingList.length);
                self.settingList = res.data.data.settingList;
                for (let i = 0; i < self.settingList.length; ++i) {
                    self.settingList[i].settingStatus = self.getSettingStatus(self.settingList[i].startDatetime, self.settingList[i].endDatetime);
                }
                self.settingMode = SETTING_MODE.READ;
            })
            .catch( err => {
                // let { code, message } = err.response;
                // alert(code);
                // alert(message);
                console.log(err);
            });
        },
        registerSetting() {
            const self = this;
            if (self.invalidSettingType(self.settingType)) {
                return;
            }
            self.registerData.settingType = self.settingType;

            self.registerData.startDatetimeLowerLimit = self.convertToDateTimeForServerFormat(self.startDatetimeLowerLimit);
            if (self.invalidStartDateTime(self.registerData.startDatetime, self.registerData.startDatetimeLowerLimit)) {
                return;
            }

            if (self.invalidPagIbigData(self.registerData.pagIbigFormList)) {
                return;
            }

            
            const url = self.$api("uri", "post-payroll-setting");
            self.$axios.post(url, self.registerData)
            .then(res => {
                // alert(res.data.message);
                self.getSettingList();
            })
            .catch( err => {
                let { code, message } = err.response.data;
                alert(code);
                alert(message);
            });
        },
        getPayrollSettingDetail(payrollSettingSeq, settingStatus) {
            const self = this;
            if (self.invalidSettingStatus(settingStatus)) {
                return;
            }
            self.canSettingEditAndDelete = (settingStatus === SETTING_STATUS.SCHEDULED);

            const url = self.$api("uri", "get-payroll-setting-detail");
            self.detailData.settingType = self.settingType;
            self.detailData.payrollSettingSeq = payrollSettingSeq;
            let jsonParam = JSON.stringify(self.detailData);

            self.$axios.get(url, {params : {jsonParam}})
            .then(res => {
                // alert(res.data.message);
                // console.log(res);
                const detailData = res.data.data;
                self.settingDetail.payrollSettingSeq = detailData.payrollSettingSeq;
                self.settingDetail.settingTitle = detailData.settingTitle;
                self.settingDetail.startDatetime = self.convertToDateForInputFormat(detailData.startDatetime);
                self.settingDetail.pagIbigFormList = detailData.settingDetailList;

                self.settingMode = SETTING_MODE.DETAIL;
            })
            .catch( err => {
                let { code, message } = err.response.data;
                alert(code);
                alert(message);
            });
        },
        changeEditSettingPage() {
            const self = this;

            // Setting Detail deep copy
            self.updateData = JSON.parse(JSON.stringify(self.settingDetail));
            self.updateData.settingType = self.settingType;
            self.updateData.startDatetime = moment(self.updateData.startDatetime, 'MM/DD/YYYY').format();
            const tomorrow = moment().add(1, 'days').format();
            self.startDatetimeLowerLimit = tomorrow;

            self.settingMode = SETTING_MODE.EDIT;
        },
        updateSetting() {
            const self = this;
            if (self.invalidSettingType(self.settingType)) {
                return;
            }

            self.updateData.startDatetimeLowerLimit = self.convertToDateTimeForServerFormat(self.startDatetimeLowerLimit);
            if (self.invalidStartDateTime(self.updateData.startDatetime, self.updateData.startDatetimeLowerLimit)) {
                return;
            }
            
            if (self.invalidPagIbigData(self.updateData.pagIbigFormList)) {
                return;
            }

            const url = self.$api("uri", "put-payroll-setting");
            self.$axios.put(url, self.updateData)
            .then(res => {
                // alert(res.data.message);
                self.getSettingList();
            })
            .catch( err => {
                let { code, message } = err.response.data;
                alert(code);
                alert(message);
            });
        },
        changeDeletePopupVisible(visible) {
            const self = this;
            self.deletePopupVisible = visible;
        },
        deleteSetting() {
            const self = this;

            const url = self.$api("uri", "delete-payroll-setting");
            self.$axios.delete(url, {data : self.detailData})
            .then(res => {
                // alert(res.data.message);
                // console.log(res);
                self.deletePopupVisible = false;
                self.getSettingList();
            })
            .catch( err => {
                let { code, message } = err.response.data;
                alert(code);
                alert(message);
            });
        },
        invalidPagIbigData(pagIbigFormList) {
            const self = this;
            let isNotNumber = false;
            let invalidNumber = false;
            for (let i = 0; i < pagIbigFormList.length; ++i) {
                let pagIbig = pagIbigFormList[i];
                let moneyType = pagIbig.moneyType;

                for (let data in pagIbig) {
                    if (data === "moneyType" && self.invalidMoneyTypeOption(moneyType)) {
                        return true;
                    }

                    if (data === "payrollPagIbigSeq" || data === "moneyType" || data === "payrollPagIbigDefaultValuesSeq") {
                        continue;
                    }

                    pagIbig[data] = String(pagIbig[data]).replaceAll(",", "");

                    if (isNaN(pagIbig[data])) {
                        console.log("[invalid data] " + data + " : " + pagIbig[data] + " type : " + (typeof pagIbig[data]));
                        isNotNumber = true;
                        break;
                    }

                    // 현재 서버는 Decimal 18, 2 이지만
                    // javascript Integer Precision 이 15 digits 이기 때문에 13, 2로 제한 합니다.
                    // 기본을 Amount로 보고 
                    // Percent 일 경우 0 ~ 999.99
                    // Day 일 경우 1 ~ 365 로 제한 합니다.
                    let epsilon = 0.000001;
                    let min = -0.01;
                    let max = 10000000000000;

                    if (moneyType === PAYROLL_MONEY_TYPE.PERCENT && (data === "pagIbigEmployee" || data === "pagIbigEmployer")) {
                        max = 1000;
                    }
                    pagIbig[data] = Number(Number.parseFloat(pagIbig[data]).toFixed(2));

                    if (self.invalidDecimal(min, max, epsilon, pagIbig[data])) {
                        console.log("[invalid data] " + data + " : " + pagIbig[data]);
                        invalidNumber = true;
                        break;
                    }
                }

                if (isNotNumber || invalidNumber) {
                    break;
                }
            }

            if (isNotNumber) {
                alert("Only numbers can be entered for the setting value.");
                return true;
            }

            if (invalidNumber) {
                alert("Peso must be greater than 0 and less than 10,000,000,000,000.00₱ (0 ~ 10,000,000,000,000.00)\nPercent must be greater than 0 and less than 1000.00% (0 ~ 1000)");
                return true;
            }

            return false;
        },
        getDisplayTextOfMoneyType(moneyType) {
            let result = "";
            switch(moneyType) {
                case PAYROLL_MONEY_TYPE.PESO:
                    result = "₱";
                    break;
                case PAYROLL_MONEY_TYPE.PERCENT:
                    result = "%";
                    break;
                default:
                    break;
            }

            return result;
        },
        invalidDecimal : payrollValidator.invalidDecimal,
        invalidSettingStatus : payrollValidator.invalidSettingStatus,
        invalidSettingType : payrollValidator.invalidSettingType,
        invalidMoneyTypeOption : payrollValidator.invalidMoneyTypeOption,
        invalidStartDateTime : payrollValidator.invalidStartDateTime,
        isReadMode : payrollValidator.isReadMode,
        isInsertMode : payrollValidator.isInsertMode,
        isDetailMode : payrollValidator.isDetailMode,
        isEditMode : payrollValidator.isEditMode,
        isPagIBig : payrollValidator.isPagIBig,
        convertToDateTimeForViewFormat : payrollDateTimeConverter.convertToDateTimeForViewFormat,
        convertToDateForInputFormat : payrollDateTimeConverter.convertToDateForInputFormat,
        convertToDateTimeForServerFormat : payrollDateTimeConverter.convertToDateTimeForServerFormat,
        getSettingStatus : payrollStringMaker.getSettingStatus,
        makeMoneyTypeString : payrollStringMaker.makeMoneyTypeString,
        fitDecimalFormatWithComma : payrollStringMaker.fitDecimalFormatWithComma
    },
    watch: {
        tabName: function(newValue) {
            const self = this;
            self.settingType = newValue;
            // console.log(newValue);
            if (self.isPagIBig(newValue)) {
                self.getSettingList();
            }
        }
    },
    mounted() {
        // const self = this;
        // self.getSettingList();
    }
}
</script>