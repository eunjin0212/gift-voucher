<template>
    <div v-show="visible">
        <div class="flex justify-between py-1">
            <div class="flex justify-start gap-5">
                <ArrowLeftIcon v-show="!isReadMode(settingMode)" class="w-7 cursor-pointer" @click="backSettingMode" />
                <h1 class="text-zinc-800 text-xl font-semibold leading-10 items-center ">
                    {{isInsertMode(settingMode) ? "Update " : isEditMode(settingMode) ? "Edit" : "" }} Income Tax
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

                        <div class="flex w-full justify-start gap-2">
                            <span class="mt-2 w-48">File Upload</span>
                            <ElementsInput
                                inputName="multipartFile"
                                inputtype="file"
                                placeholder="Select File"
                                :full="true"
                                :acceptFileFormat="acceptFileFormat"
                                @input="uploadFileChange"
                            />
                        </div>
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
                                <th scope="col" rowspan="2" class="px-3 py-3 w-12 border border-solid border-white text-center text-sm">NO</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">Current Year</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">Effective Until Year</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">Bracket</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">Frequency</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">Tax Code</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">Exemption</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">From</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">To</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">Fix</th>
                                <th scope="col" class="px-3 py-3 w-24 border-x border-solid border-white text-center text-sm">Rate</th>
                            </tr>
                        </thead>
                        <tbody class=" bg-white">
                            <tr v-for="(detail, index) in settingDetailViewList" v-bind:key="index" class="border-x border-y border-solid border-gray-200">
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900">{{ ((detailPageCondition.currentPage - 1) * detailPageCondition.limit) + index + 1 }}</td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ detail.currentYear }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ detail.effectiveUntilYear }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ detail.taxBracket }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ getDisplayTextOfTaxFrequency(detail.taxFrequency) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ detail.taxCode }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ fitDecimalFormatWithComma(detail.taxExemption) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ fitDecimalFormatWithComma(detail.rangeOfTaxFrom) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ fitDecimalFormatWithComma(detail.rangeOfTaxTo) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ fitDecimalFormatWithComma(detail.taxFix) }}</span></td>
                                <td class="px-3 py-3 border-x border-solid border-gray-200 text-center text-sm text-gray-900"><span class="whitespace-pre-line">{{ fitDecimalFormatWithComma(detail.taxRate) }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="w-full h-28 flex mt-1 justify-center items-center">
                    <ElementsPagination
                        v-model="detailPageCondition.currentPage"
                        :totalContent="detailPageCondition.count"
                        :contentsPerPage="detailPageCondition.limit"
                        @clickPage="clickDetailPage"
                    />
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

                    <div class="flex w-full justify-start gap-2">
                            <span class="mt-2 w-48">File Upload</span>
                            <ElementsInput
                                inputName="multipartFile"
                                inputtype="file"
                                placeholder="Select File"
                                :full="true"
                                :acceptFileFormat="acceptFileFormat"
                                @input="uploadFileChange"
                            />
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
import { SETTING_TYPE, SETTING_MODE, SETTING_STATUS, TAX_FREQUENCY } from "@/pages/payroll/payroll_settings/constants/enum-payroll-setting";
import { payrollValidator, payrollDateTimeConverter, payrollStringMaker } from "@/pages/payroll/payroll_settings/util/payroll-util";
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
            settingType : SETTING_TYPE.WTAX,
            settingMode : SETTING_MODE.READ,
            settingCount : 0,
            settingList : [],
            currentPage : 0,
            pageCondition : {
                limit : 10,
                offset : 0,
                settingType : null
            },
            detailPageCondition : {
                count : 0,
                currentPage : 0,
                limit : 10,
                offset : 0
            },
            startDatetimeLowerLimit : null,
            acceptFileFormat : [
                ".xlsx",
                ".xls"
            ],
            uploadFileLink : null,
            expire : 60 * 60 * 2, // 60초 * 60분 * 2 -> 2시간
            registerData : {
                settingTitle : null,
                startDatetime : null,
                settingType : null,
                startDatetimeLowerLimit : null,
                excelFileLink : null
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
                wTaxFormList : []
            },
            settingDetailViewList : [],
            updateData : {
                settingTitle : null,
                startDatetime : null,
                settingType : null,
                startDatetimeLowerLimit : null,
                excelFileLink : null
            },
            deletePopupVisible : false
        }
    },
    methods : {
        backSettingMode() {
            const self = this;
            self.deleteUploadFile();
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
        clickDetailPage(offset = 0) {
            const self = this;
            self.settingDetailViewList = self.settingDetail.wTaxFormList.slice(offset, offset + self.detailPageCondition.limit);
            while (self.settingDetailViewList.length < self.detailPageCondition.limit) {
                let temp = {
                    currentYear : null,
                    effectiveUntilYear : null,
                    payrollWtaxSeq : null,
                    rangeOfTaxFrom : null,
                    rangeOfTaxTo : null,
                    taxBracket : null,
                    taxCode : null,
                    taxExemption : null,
                    taxFix : null,
                    taxFrequency : null,
                    taxRate : null
                };
                self.settingDetailViewList.push(temp);
            }
        },
        uploadFileChange(e) {
            const self = this;

            if (e.target.files[0] == null) {
                self.deleteUploadFile();
                return;
            }

            const filePath = e.target.files[0];
            self.submitFileUpload(filePath);
        },
        submitFileUpload(filePath){
            const self = this;
            const url = self.$api("uri", "post-file-direct-upload");

            let form = new FormData();
            form.append(`uploadFile1`, filePath);
            form.append(`expire`, self.expire);

            if(filePath === null){
                return;
            }

            self.$axios.post( url, form, { headers : {'Content-Type' : 'multipart/form-data;'} })
            .then(res => {
                self.uploadFileLink = res.data.data.uploadFile1;
            })
            .catch(err => {
                console.error( err );
                alert(" submit File Upload fail ")
            })
        },
        deleteUploadFile() {
            const self = this;
            if (self.uploadFileLink !== null) {
                const url = self.$api("uri", "post-file-direct-upload");

                let form = new FormData();
                form.append(`deleteLink1`, self.uploadFileLink);

                self.$axios.post( url, form, { headers : {'Content-Type' : 'multipart/form-data;'} })
                .then(() => {
                    self.uploadFileLink = null;
                })
                .catch(err => {
                    console.error( err );
                    alert("uploadFile delete fail ")
                })
            }
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
                self.settingCount = res.data.data.settingList.length;

                self.settingList.splice(0, self.settingList.length);
                self.settingList = res.data.data.settingList;
                for (let i = 0; i < self.settingList.length; ++i) {
                    self.settingList[i].settingStatus = self.getSettingStatus(self.settingList[i].startDatetime, self.settingList[i].endDatetime);
                }
                self.settingMode = SETTING_MODE.READ;
            })
            .catch( err => {
                console.log(err);
            });
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

            self.registerData.settingTitle = null;
            self.registerData.startDatetime = null;
            self.registerData.startDatetimeLowerLimit = null;
            self.registerData.excelFileLink = null;
            const tomorrow = moment().add(1, 'days').format();
            self.startDatetimeLowerLimit = tomorrow;

            self.uploadFileLink = null

            self.settingMode = SETTING_MODE.INSERT;
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

            if (self.invalidString(self.uploadFileLink)) {
                alert("[File] No files. Please select a file.");
                console.log(self.uploadFileLink);
                return;
            }

            self.registerData.excelFileLink = self.uploadFileLink;

            const url = self.$api("uri", "post-payroll-setting-with-file");
            self.$axios.post( url, self.registerData)
            .then(res => {
                // alert(res.data.message);
                self.getSettingList();
            })
            .catch(err => {
                alert(err);
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
                self.settingDetail.wTaxFormList = detailData.settingDetailList;
                self.detailPageCondition.count = detailData.settingDetailList.length;

                self.clickDetailPage(0);
                self.settingMode = SETTING_MODE.DETAIL;
            })
            .catch( err => {
                // let { code, message } = err.response.data;
                // alert(code);
                // alert(message);
                console.log(err);
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

            self.uploadFileLink = null;

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

            if (self.invalidString(self.uploadFileLink)) {
                alert("[File] No files. Please select a file.");
                console.log(self.uploadFileLink);
                return;
            }

            self.updateData.excelFileLink = self.uploadFileLink;

            delete self.updateData.wTaxFormList;
            const url = self.$api("uri", "put-payroll-setting-with-file");
            self.$axios.put( url, self.updateData)
            .then(res => {
                // alert(res.data.message);
                self.getSettingList();
            })
            .catch(err => {
                alert(err);
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
        getDisplayTextOfTaxFrequency(taxType) {
            let result = "";
            switch(taxType) {
                case TAX_FREQUENCY.DAILY:
                    result = "Daily";
                    break;
                case TAX_FREQUENCY.WEEKLY:
                    result = "Weekly";
                    break;
                case TAX_FREQUENCY.SEMI_MONTHLY:
                    result = "Semi-monthly";
                    break;
                case TAX_FREQUENCY.MONTHLY:
                    result = "Monthly";
                    break;
                default:
                    break;
            }

            return result;
        },
        invalidString : payrollValidator.invalidString,
        invalidSettingStatus : payrollValidator.invalidSettingStatus,
        invalidSettingType : payrollValidator.invalidSettingType,
        invalidStartDateTime : payrollValidator.invalidStartDateTime,
        isReadMode : payrollValidator.isReadMode,
        isInsertMode : payrollValidator.isInsertMode,
        isDetailMode : payrollValidator.isDetailMode,
        isEditMode : payrollValidator.isEditMode,
        isWTAX : payrollValidator.isWTAX,
        convertToDateTimeForViewFormat : payrollDateTimeConverter.convertToDateTimeForViewFormat,
        convertToDateForInputFormat : payrollDateTimeConverter.convertToDateForInputFormat,
        convertToDateTimeForServerFormat : payrollDateTimeConverter.convertToDateTimeForServerFormat,
        getSettingStatus : payrollStringMaker.getSettingStatus,
        fitDecimalFormatWithComma : payrollStringMaker.fitDecimalFormatWithComma
    },
    watch: {
        tabName: function(newValue) {
            const self = this;
            self.settingType = newValue;
            // console.log(newValue);
            if (self.isWTAX(newValue)) {
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