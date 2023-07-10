<template>
    <div>
        <div class="flex flex-col p-3 w-full max-w-7xl mt-4 gap-3 bg-white shadow-md shadow-gray-200 rounded-lg">
            <div class="overflow-hidden mt-3">
                <div class="border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">company</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <div> {{ registerData.companyName }} </div>
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Admin</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {{ registerData.executerId}} </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Points type </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <div>
                                    <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                        <div class="flex items-center">
                                            <label class="block text-sm font-medium text-gray-700">
                                                Top-up
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Extension Period</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <div>
                                    <span v-if="registerData.extendedPeriod == 'NONE' || !registerData.extendedPeriod"> None </span>
                                    <span v-else> {{ `${registerData.extendedPeriod} Month` }} </span>
                                </div>
                            </dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Extended Use Date</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <span> {{ dateFormatChange(registerData.extendedStartDate) }} </span>
                                <span v-if="registerData.extendedStartDate || registerData.extendedEndDate"> ~ </span>
                                <span > {{ dateFormatChange(registerData.extendedEndDate) }} </span>
                            </dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Points</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <div> {{ registerData.mileageVolume }} </div>
                            </dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">PIC Name</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                <ElementsInput
                                    v-model="registerData.picName"
                                    :maxlength="100"
                                />
                                <ElementsButton
                                    :width20="true"
                                    :height12="true"
                                    :bgWhiteAndtextIndigo="true"
                                    :text="'Save'"
                                    @clickEvent="changeSelectedElem('picName')"
                                />
                            </dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Status</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                <ElementsSelect
                                    :width60="true"
                                    :options="contractStatusOptions"
                                    v-model="registerData.topUpContractStatus"
                                />
                                <ElementsButton
                                    :width20="true"
                                    :height12="true"
                                    :bgWhiteAndtextIndigo="true"
                                    :text="'Save'"
                                    @clickEvent="changeSelectedElem('topUpContractStatus')"
                                />
                            </dd>
                        </div>

                        <div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="grid text-sm font-medium text-gray-500 items-center">PO softcopy</dt>

                                <template v-if="registerData.poDocumentFilePath">
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                        <a class="text-blue-600 underline cursor-pointer" :href="registerData.poDocumentFilePath">
                                            {{ showTheFileName( registerData.poDocumentFilePath )}}
                                        </a>
                                        <ElementsButton
                                            :width20="true"
                                            :height12="true"
                                            :borderRed="true"
                                            :text="'Delete'"
                                            @clickEvent="deleteSelectedFile('poDocumentFilePath')"
                                        />
                                    </dd>
                                </template>

                                <template v-else>
                                    <dd class="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                            multiple
                                            @input="afterFileSelect"
                                            name="poDocumentFilePath"
                                        />
                                    </dd>
                                </template>

                                <dt class="grid text-sm font-medium text-gray-500 items-center">PO Document No</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                    <ElementsInput
                                        :full="true"
                                        v-model="registerData.poDocNo"
                                        :max="100"
                                    />

                                    <ElementsButton
                                        :width20="true"
                                        :height12="true"
                                        :bgWhiteAndtextIndigo="true"
                                        :text="'Save'"
                                        @clickEvent="changeSelectedElem('poDocNo')"
                                    />
                                </dd>
                            </div>
                        </div>

                        <div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="grid text-sm font-medium text-gray-500 items-center">Invoice softcopy</dt>

                                <template v-if="registerData.invoiceFilePath">
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                        <a class="text-blue-600 underline cursor-pointer" :href="registerData.invoiceFilePath">
                                            {{ showTheFileName( registerData.invoiceFilePath )}}
                                        </a>
                                        <ElementsButton
                                            :width20="true"
                                            :height12="true"
                                            :borderRed="true"
                                            :text="'Delete'"
                                            @clickEvent="deleteSelectedFile('invoiceFilePath')"
                                        />
                                    </dd>
                                </template>

                                <template v-else >
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            multiple
                                            @input="afterFileSelect"
                                            name="invoiceFilePath"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                        />
                                    </dd>
                                </template>

                                <dt class="grid text-sm font-medium text-gray-500 items-center">Invoice Document No</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                    <ElementsInput
                                        :full="true"
                                        v-model="registerData.invoiceDocNo"
                                        :max="100"
                                    />

                                    <ElementsButton
                                        :width20="true"
                                        :height12="true"
                                        :bgWhiteAndtextIndigo="true"
                                        :text="'Save'"
                                        @clickEvent="changeSelectedElem('invoiceDocNo')"
                                    />
                                </dd>
                            </div>
                        </div>

                        <div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="grid text-sm font-medium text-gray-500 items-center">Collection softcopy</dt>

                                <template v-if="registerData.orDocumentFilePath">
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                        <a class="text-blue-600 underline cursor-pointer" :href="registerData.orDocumentFilePath">
                                            {{ showTheFileName( registerData.orDocumentFilePath )}}
                                        </a>
                                        <ElementsButton
                                            :width20="true"
                                            :height12="true"
                                            :borderRed="true"
                                            :text="'Delete'"
                                            @clickEvent="deleteSelectedFile('orDocumentFilePath')"
                                        />
                                    </dd>
                                </template>

                                <template v-else>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                            multiple
                                            @input="afterFileSelect"
                                            name="orDocumentFilePath"
                                        />
                                    </dd>
                                </template>

                                <dt class="grid text-sm font-medium text-gray-500 items-center">Collection Document No</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                    <ElementsInput
                                        :full="true"
                                        v-model="registerData.orDocNo"
                                        :max="100"
                                    />

                                    <ElementsButton
                                        :width20="true"
                                        :height12="true"
                                        :bgWhiteAndtextIndigo="true"
                                        :text="'Save'"
                                        @clickEvent="changeSelectedElem('orDocNo')"
                                    />
                                </dd>
                            </div>
                        </div>
                    </dl>
                </div>
            </div>
            <div class="flex justify-end gap-4">
                <ElementsButton
                    :backgroundWhite="true"
                    :text="'Back To List'"
                    @clickEvent="backToListPage"
                />
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    mounted(){
        const self = this;
        self.getMileageHistory();
    },
    components:{
    },
    data(){
        return{
            isNotEditable : true,
            companyList : [],
            registerData : {
                transactionType : "TOPUP_FROM_HRFLEX",
                companySeq : "",
                companyName : "",
                executerId : "",
                transactionNote : "",
                mileageVolume : 0,
                poDocumentFilePath : null,
                invoiceFilePath : null,
                orDocumentFilePath : null,
                poDocNo : null,
                invoiceDocNo : null,
                orDocNo : null,
                picName : "",
                extendedPeriod : "",
                extendedEndDate : "",
                extendedStartDate : ""
            },
            documentFiles : {
                poDocumentFile : null,
                orDocumentFileName : null,
                invoiceFile : null,
                invoiceFileName : null,
                orDocumentFile : null,
                poDocumentFileName : null
            },
            contractStatusOptions : [
                { text : "Requested", value : "REQUESTED" },
                { text : "PO received", value : "PO_RECEIVED" },
                { text : "Invoice sent", value : "INVOICE_SENT" },
                { text : "Receipt issued", value : "RECEIPT_ISSUED" },
            ],
        }
    },
    methods:{
        getMileageHistory(){
            const self = this;
            const params = new URLSearchParams( window.location.search );
            if( ! params.has("mileageSeq") ){
                self.backToListPage();
            }

            const url = self.$api( "uri", "get-flexben-history" );
            self.$axios.get( `${url}/${params.get("mileageSeq")}`)
                .then( res => {
                    self.registerData = { ...res.data.data };
                    if( self.registerData.transactionType !== 'TOPUP_FROM_HRFLEX'){
                        alert("Only the 'Top-up' execution is able to be edited the documents");
                        return;
                    }
                })
                .catch(alert);
        },
        updateRegisterDocs( updateData ){
            const self = this;
            const url = self.$api("uri", "post-flexben-file");
            return self.$axios.put(url, updateData );
        },
        afterFileSelect( e ){
            const self = this;
            const { files, name } = e.target;
            if( files.size < 0 ){
                return ;
            }
            const mileageCompanyHistorySeq = new URLSearchParams( window.location.search ).get("mileageSeq");
            const url = self.$api("uri", "post-file-direct-upload" );
            let form = new FormData();

            form.append( `uploadFile1` , files[0] );
            form.append( `uploadFileName1` , files[0].name );

            self.$axios.post( url, form, { headers : {'Content-Type' : 'multipart/form-data;'} })
                .then( res => res.data.data.uploadFile1  )
                .then( filepath => {
                    self.registerData[name] = filepath;
                    return { [name] : filepath, mileageCompanyHistorySeq }
                } )
                .then( self.updateRegisterDocs )
                .catch( alert )
        },

        backToListPage(){
            location.href = "/flexben/topup_deduct"
        },
        showTheFileName( filePath ){
            let fileName = "";
            if( ! filePath ) {
                return fileName;
            }
            const params = new URLSearchParams( filePath )
            return params.get("downloadFileName");
        },
        deleteSelectedFile( elementName ){
            const self = this;
            const mileageCompanyHistorySeq = new URLSearchParams( window.location.search ).get("mileageSeq");

            const deleteData = {
                [elementName] :  self.registerData[elementName]
                , mileageCompanyHistorySeq
            };

            const url = self.$api("uri", "delete-flexben-file");
            self.$axios.delete( url, { data : deleteData } )
                .then( () => self.registerData[elementName] )
                .then(( filePath ) => self.deleteUtilFileDirectDownload(filePath) )
                .then( () => {
                    self.registerData[elementName] = null;
                })
                .catch( alert )

        },
        deleteUtilFileDirectDownload( filePath ){
            const self = this;
            return self.$axios.delete( filePath )
        },
        changeSelectedElem( elementName ){
            const self = this;
            const mileageCompanyHistorySeq = new URLSearchParams( window.location.search ).get("mileageSeq");
            const updateData = {
                [elementName] :  self.registerData[elementName]
                , mileageCompanyHistorySeq
            };
            self.updateRegisterDocs(updateData)
                .then( ()=> alert('Success to update' ) )
                .catch( err => {
                    let { message } = err.response.data;
                    alert( message );
                })
        },
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
    }

}
</script>



