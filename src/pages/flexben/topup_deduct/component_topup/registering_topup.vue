<template>
    <div>
        <form @submit.prevent="confirmTopUpPreview">
            <div class="flex flex-col p-3 w-full max-w-7xl mt-4 gap-3 bg-white shadow-md shadow-gray-200 rounded-lg">
                <div class=" mt-3">
                    <div class="border-gray-200 px-4 py-5 sm:p-0">
                        <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Company</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                    <div>
                                        {{ registerData.companyName }}
                                    </div>
                                    <div
                                        class="cursor-pointer border text-center text-blue-400 font-semibold border-blue-300 px-2 py-2 rounded-md"
                                        @click="openSelectCompanyPop"
                                    >
                                        Select Company
                                    </div>
                                </dd>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Admin</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {{ logonProfile.name }} / {{ logonProfile.id }} </dd>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Points type </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <div>
                                        <div class="flex items-center">
                                            <label class="block text-sm font-medium text-gray-800">
                                                Top-up
                                            </label>
                                        </div>
                                    </div>
                                </dd>
                            </div>

                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Extension Period*</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ElementsSelect
                                        :readonly="!registerData.companySeq"
                                        :options="extendedPeriodOptions"
                                        v-model="registerData.extendedPeriod"
                                        :full="true"
                                        @change="calcExtendedDate"
                                    />
                                    <div v-if="!registerData.companySeq" class="text-red-700 text-sm">
                                        *Please select an company first.
                                    </div>
                                </dd>
                            </div>

                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Existing Use Date* </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex gap-2">
                                    <ElementsDate
                                        v-model="subscribeStartDate"
                                        :disabled="true"
                                    />
                                    ~
                                    <ElementsDate
                                        v-model="subscribeEndDate"
                                        :disabled="true"
                                    />
                                </dd>
                            </div>

                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Extended Use Date* </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex gap-2">
                                    <ElementsDate
                                        v-model="registerData.extendedStartDate"
                                        :disabled="true"
                                    />
                                    ~
                                    <ElementsDate
                                        v-model="registerData.extendedEndDate"
                                        :disabled="true"
                                    />
                                </dd>
                            </div>

                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Points</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <input
                                        type="number"
                                        class="w-full mt-1 shadow-sm block sm:text-sm border-gray-300 rounded-md"
                                        :min="1"
                                        v-model="registerData.mileageVolume"
                                    />
                                </dd>
                            </div>

                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">PIC Name </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ElementsInput
                                        :full="true"
                                        v-model="registerData.picName"
                                    />
                                </dd>
                            </div>

                            <div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="grid text-sm font-medium text-gray-500 items-center">PO softcopy</dt>

                                    <template v-if="documentFiles.poDocumentFile">
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                        <div class="text-blue-600 grid items-baseline" >
                                            {{ documentFiles.poDocumentFileName }}
                                        </div>
                                        <div
                                            class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                                            name="poDocumentFile"
                                            @click="deleteSelectedFile"
                                        >
                                            delete
                                        </div>
                                    </dd>
                                    </template>

                                    <template v-else>
                                        <dd class="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <input type="file"
                                                class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                                multiple
                                                @input="afterFileSelect"
                                                name="poDocumentFile"
                                            />
                                        </dd>
                                    </template>

                                    <dt class="grid text-sm font-medium text-gray-500 items-center">PO Document No</dt>
                                    <dd class="text-sm text-gray-900 sm:col-span-2">
                                        <ElementsInput
                                            :full="true"
                                            v-model="registerData.poDocNo"
                                            :max="100"
                                        />
                                    </dd>
                                </div>
                            </div>

                            <div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="grid text-sm font-medium text-gray-500 items-center">Invoice softcopy</dt>

                                    <template v-if="documentFiles.invoiceFileName">
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                            <div class="text-blue-600 grid items-baseline" >
                                                {{ documentFiles.invoiceFileName }}
                                            </div>
                                            <div
                                                class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                                                name="invoiceFile"
                                                @click="deleteSelectedFile"
                                            >
                                                delete
                                            </div>
                                        </dd>
                                    </template>

                                    <template v-else >
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <input type="file"
                                                multiple
                                                @input="afterFileSelect"
                                                name="invoiceFile"
                                                class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                            />
                                        </dd>
                                    </template>

                                    <dt class="grid text-sm font-medium text-gray-500 items-center">Invoice Document No</dt>
                                    <dd class="text-sm text-gray-900 sm:col-span-2">
                                        <ElementsInput
                                            :full="true"
                                            v-model="registerData.invoiceDocNo"
                                            :max="100"
                                        />
                                    </dd>
                                </div>
                            </div>

                            <div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="grid text-sm font-medium text-gray-500 items-center">Collection softcopy</dt>

                                    <template v-if="documentFiles.orDocumentFileName">
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                            <div class="text-blue-600 grid items-baseline" >
                                                {{ documentFiles.orDocumentFileName }}
                                            </div>
                                            <div
                                                class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                                                name="orDocumentFile"
                                                @click="deleteSelectedFile"
                                            >
                                                delete
                                            </div>
                                        </dd>
                                    </template>

                                    <template v-else>
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <input type="file"
                                                class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                                multiple
                                                @input="afterFileSelect"
                                                name="orDocumentFile"
                                            />
                                        </dd>
                                    </template>

                                    <dt class="grid text-sm font-medium text-gray-500 items-center">Collection Document No</dt>
                                    <dd class="text-sm text-gray-900 sm:col-span-2">
                                        <ElementsInput
                                            :full="true"
                                            v-model="registerData.orDocNo"
                                            :max="100"
                                        />
                                    </dd>
                                </div>
                            </div>

                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Status</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ElementsSelect
                                        :full="true"
                                        :options="contractStatusOptions"
                                        v-model="registerData.topUpContractStatus"
                                    />
                                </dd>
                            </div>


                        </dl>
                    </div>
                </div>
                <div class="flex justify-end gap-4">
                    <ElementsButton
                        :backgroundWhite="true"
                        :inputtype="'button'"
                        :width32="true"
                        :text="'Cancel'"
                        @clickEvent="locationToList"
                    />
                    <ElementsButton
                        :inputtype="'submit'"
                        :width32="true"
                        :text="'Top-up'"
                    />
                </div>
            </div>
        </form>
        <Teleport to="body">
            <CompanySelectPopup
                v-model="selectComPopup.isOpen"
                @selectCompany="selectCompanyTopUp"
            />
            <ConfirmPopup
                v-model="confirmPopup.isOpen"
                @submit="submitFlexbenAction()"
                :confirmData="registerData"
                :fileData="documentFiles"
                :adminData="logonProfile"
                :subscribeEndDate="subscribeEndDate"
                :subscribeStartDate="subscribeStartDate"
            />
        </Teleport>
    </div>
</template>

<script>
import CompanySelectPopup from "@/pages/flexben/topup_deduct/companySelectPopup.vue"
import ConfirmPopup from "@/pages/flexben/topup_deduct/component_topup/confirm_popup.vue"
import moment from 'moment';

export default {
    mounted(){
        const self = this;
        const { hrAdminName , loginId } = window.logOnProfile.data;
        self.logonProfile.name = hrAdminName;
        self.logonProfile.id = loginId;
    },
    components:{
        CompanySelectPopup, ConfirmPopup
    },
    data(){
        return{
            selectComPopup : {
                isOpen : false,
            },
            confirmPopup : {
                isOpen : false,
            },
            logonProfile : {
                name : "",
                id : "" ,
            },
            extendedPeriodOptions : [
                { text : "None", value : "NONE"},
                { text : "1 Month", value : "1"},
                { text : "2 Month", value : "2"},
                { text : "3 Month", value : "3"},
                { text : "6 Month", value : "6"},
                { text : "12 Month", value : "12"},
            ],
            contractStatusOptions : [
                { text : "Requested", value : "REQUESTED" },
                { text : "PO received", value : "PO_RECEIVED" },
                { text : "Invoice sent", value : "INVOICE_SENT" },
                { text : "Receipt issued", value : "RECEIPT_ISSUED" },
            ],
            registerData : {
                transactionType : "TOPUP_FROM_HRFLEX",
                companySeq : "",
                companyName : "",
                topUpContractStatus : "",
                executerId : "",
                transactionNote : "",
                mileageVolume : 1,
                poDocumentFilePath : null,
                invoiceFilePath : null,
                orDocumentFilePath : null,
                poDocNo : null,
                invoiceDocNo : null,
                orDocNo : null,
                picName : "",
                extendedPeriod : "",
                extendedStartDate : "",
                extendedEndDate : "",
                numOfEmpCnt : 0
            },
            documentFiles : {
                poDocumentFile : null,
                poDocumentFileName : null,
                invoiceFile : null,
                invoiceFileName : null,
                orDocumentFile : null,
                orDocumentFileName : null
            },

            suspendedDate : "",
            subscribeEndDate : "",
            subscribeStartDate : "",
            subscriptionPicName : "",
        }
    },
    methods:{
        submitDocumentFiles(){
            const self = this;

            const url = self.$api("uri", "post-file-direct-upload" );
            const { poDocumentFile, orDocumentFileName, invoiceFile,  invoiceFileName, orDocumentFile, poDocumentFileName } = self.documentFiles;
            let form = new FormData();
            form.append( `uploadFile1` , poDocumentFile );
            form.append( `uploadFile2` , invoiceFile );
            form.append( `uploadFile3` , orDocumentFile );
            form.append( `uploadFileName1` , poDocumentFileName );
            form.append( `uploadFileName2` , invoiceFileName );
            form.append( `uploadFileName3` , orDocumentFileName );

            return self.$axios.post( url, form, { headers : {'Content-Type' : 'multipart/form-data;'} })
        },
        afterFileSelect( e ){
            const self = this;
            const { files, name } = e.target
            if( files.size < 0 ){
                return ;
            }

            self.documentFiles[ name ] = files[0];
            self.documentFiles[ `${name}Name`] = files[0].name
        },
        validateData(){
            const self = this;

            if( ! self.registerData.companySeq ){
                alert( "company must be selected ");
                return false;
            }

            if( ! self.registerData.topUpContractStatus ){
                alert( "Contract Status must be selected ");
                return false;
            }

            if( ! self.registerData.extendedPeriod ){
                alert( "Extended Period must be selected ");
                return false;
            }

            return true;
        },
        confirmTopUpPreview(){
            const self = this;
            if( ! self.validateData() ){
                return;
            }
            self.confirmPopup.isOpen = true;
        },
        submitFlexbenAction(){
            const self = this;
            const url = self.$api( "uri", "post-topup-to-company" );

            self.submitDocumentFiles()
                .then( res => {
                    return res.data.data;
                })
                .then( ({uploadFile1, uploadFile2, uploadFile3}) =>{
                    const registerData = {
                                            ...self.registerData,
                                            poDocumentFilePath : uploadFile1 ,
                                            invoiceFilePath :  uploadFile2,
                                            orDocumentFilePath : uploadFile3 }
                    return self.$axios.post( url, registerData )
                } )
                .then( () => {
                    self.locationToList();
                })
                .catch( err => {
                    const { code, message } = err.response.data;
                    let errMsg = code ? code + "\n" + message : err;
                    alert( errMsg );
                })
        },
        deleteSelectedFile( e ){
            const self = this;
            const elementName = e.target.getAttribute('name');
            self.documentFiles[elementName] = null;
            self.documentFiles[`${elementName}Name`] = null;
        },
        locationToList(){
            location.href = "/flexben/topup_deduct"
        },
        openSelectCompanyPop(){
            const self = this;
            self.selectComPopup.isOpen = true;
        },
        selectCompanyTopUp( company ){
            const self = this;
            const { companyName, companySeq, subscribeEndDate, suspendedDate, subscribeStartDate, employeeCount, companySubscribeStatus  } = company;
            self.registerData.companyName = companyName;
            self.registerData.companySeq = companySeq;
            self.registerData.numOfEmpCnt = employeeCount;
            self.registerData.companySubscribeStatus = companySubscribeStatus;

            self.subscribeStartDate = subscribeStartDate;
            self.subscribeEndDate = subscribeEndDate;
            self.suspendedDate = suspendedDate;

            // ========================== init
            self.registerData.extendedStartDate = "";
            self.registerData.extendedEndDate = "";
            self.registerData.extendedPeriod = "";

        },
        calcExtendedDate(){
            const self = this;
            const extendedPeriod = self.registerData.extendedPeriod;
            if( ! extendedPeriod ) return;

            // 최초 topup의 경우 당일을 기준으로 extended period를 정한다
            const standardDate = self.suspendedDate || moment().add(-1, 'day').format()
            if( extendedPeriod == "NONE" ) {
                self.registerData.extendedStartDate = standardDate;
                self.registerData.extendedEndDate = standardDate;
                return;
            }

            self.registerData.extendedStartDate = moment(standardDate).add(1, 'day').format();
            self.registerData.extendedEndDate = moment( standardDate )
                                                        .add( extendedPeriod, "month")
                                                        .format();

        },
    }

}
</script>
