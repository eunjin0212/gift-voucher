<template>
    <form @submit.prevent="submitFlexbenAction">
        <div class="flex flex-col p-3 w-full max-w-7xl mt-4 gap-3">
            <div class="overflow-hidden mt-3">
                <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Company</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ElementsSelect
                                    :options="companyList"
                                    v-model="registerData.companySeq"
                                />
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
                                        <input
                                            name="point-execution-method" type="radio"
                                            :checked="true"
                                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label class="ml-3 block text-sm font-medium text-gray-700">
                                            Top-up
                                        </label>
                                    </div>
                                </div>
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
                                <dt class="grid text-sm font-medium text-gray-500 items-center">OR softcopy</dt>

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

                                <dt class="grid text-sm font-medium text-gray-500 items-center">OR Document No</dt>
                                <dd class="text-sm text-gray-900 sm:col-span-2">
                                    <ElementsInput
                                        :full="true"
                                        v-model="registerData.orDocNo"
                                        :max="100"
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
</template>

<script>
export default {
    mounted(){
        const self = this;
        self.getCompanyList();

        const { hrAdminName , loginId } = window.logOnProfile.data;
        self.logonProfile.name = hrAdminName;
        self.logonProfile.id = loginId;
    },
    components:{
    },
    data(){
        return{
            logonProfile : {
                name : "",
                id : "" ,
            },
            companyList : [],
            registerData : {
                transactionType : "TOPUP_FROM_HRFLEX",
                companySeq : "",
                companyName : "",
                executerId : "",
                transactionNote : "",
                mileageVolume : 1,
                poDocumentFilePath : null,
                invoiceFilePath : null,
                orDocumentFilePath : null,
                poDocNo : null,
                invoiceDocNo : null,
                orDocNo : null
            },
            documentFiles : {
                poDocumentFile : null,
                orDocumentFileName : null,
                invoiceFile : null,
                invoiceFileName : null,
                orDocumentFile : null,
                poDocumentFileName : null
            },
        }
    },
    methods:{
        getCompanyList(){
            const self = this;
            const json_query = {
                limit : -1,
                offset : null,
                billingStatus : null,
            }
            const url = self.$api( "uri", "get-company" );
            self.$axios.get(url, { params : { json_query } }).then(res => {
                self.companyList = res.data.data.list.map( ({ companyName, companySeq }) => ({
                    text : companyName, value : companySeq
                }));
            });
        },
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
        submitFlexbenAction(){
            const self = this;
            const url = self.$api( "uri", "post-topup-to-company" );

            if( ! self.registerData.companySeq ){
                alert( "company must be selected ");
                return;
            }

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
        }
    }

}
</script>
