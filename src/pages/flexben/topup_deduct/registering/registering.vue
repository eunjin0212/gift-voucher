<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Registering'">
            <div class="flex flex-col p-3 w-full max-w-7xl mt-4 gap-3">
                <div class="overflow-hidden mt-3">
                    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">company</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <div v-if="isNotEditable"> {{ registerData.companyName }} </div>
                                    <ElementsSelect
                                        v-else
                                        :options="companyList"
                                        v-model="registerData.companySeq"
                                    />
                                </dd>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Admin</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> henryc / hr / henry@sharetreats.com </dd>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Points type </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <div>
                                        <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                            <div v-for="notificationMethod in notificationMethods" :key="notificationMethod.id" class="flex items-center">
                                                <input 
                                                    v-model="registerData.transactionType"
                                                    :id="notificationMethod.id"
                                                    :value="notificationMethod.id" 
                                                    name="notification-method" type="radio" 
                                                    :checked="notificationMethod.id===registerData.transactionType" 
                                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    :disabled="isNotEditable"
                                                />
                                                <label :for="notificationMethod.id" class="ml-3 block text-sm font-medium text-gray-700">{{ notificationMethod.title }}</label>
                                            </div>
                                        </div>
                                    </div>
                                </dd>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Points</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <input type="number"
                                        class="w-full mt-1 shadow-sm block sm:text-sm border-gray-300 rounded-md"    
                                        :min="0"
                                        v-model="registerData.mileageVolume"
                                        :disabled="isNotEditable"
                                    />
                                </dd>
                            </div>
                            <div>
                                <div v-if="registerData.poDocumentFilePath" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">PO softcopy</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                        <a class="text-blue-600 underline cursor-pointer" :href="registerData.poDocumentFilePath"> 
                                            {{ showTheFileName( registerData.poDocumentFilePath )}}
                                        </a>
                                        <div 
                                            class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                                            name="poDocumentFilePath"
                                            @click="deleteSelectedFile"
                                        >
                                            delete
                                        </div>
                                    </dd>
                                </div>
                                <div v-else class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">PO softcopy</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"    
                                            :min="0"
                                            multiple 
                                            @input="afterFileSelect"
                                            name="poDocumentFile"
                                        />
                                    </dd>
                                    <dt class="text-sm font-medium text-gray-500">PO Document No.</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ElementsInput
                                            :full="true"
                                            v-model="documentFiles.poDocumentFileName"
                                            :disabled="true"
                                        />
                                    </dd>
                                </div>
                            </div>
                            <div>
                                <div v-if="registerData.invoiceFilePath" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">PO softcopy</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                        <a class="text-blue-600 underline cursor-pointer" :href="registerData.invoiceFilePath"> 
                                            {{ showTheFileName( registerData.invoiceFilePath )}}
                                        </a>
                                        <div 
                                            class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                                            name="invoiceFilePath"
                                            @click="deleteSelectedFile"
                                        >
                                            delete
                                        </div>
                                    </dd>
                                </div>
                                <div v-else class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Invoice softcopy</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            multiple 
                                            @input="afterFileSelect"
                                            name="invoiceFile"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"    
                                            :min="0"
                                        />
                                    </dd>
                                    <dt class="text-sm font-medium text-gray-500">Invoice Document No.</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ElementsInput
                                            :full="true"
                                            v-model="documentFiles.invoiceFileName"
                                            :disabled="true"
                                        />
                                    </dd>
                                </div>
                            </div>
                            <div>
                                <div v-if="registerData.orDocumentFilePath" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">PO softcopy</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                        <a class="text-blue-600 underline cursor-pointer" :href="registerData.orDocumentFilePath"> 
                                            {{ showTheFileName( registerData.orDocumentFilePath )}}
                                        </a>
                                        <div 
                                            class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                                            name="orDocumentFilePath"
                                            @click="deleteSelectedFile"
                                        >
                                            delete
                                        </div>
                                    </dd>
                                </div>
                                <div v-else class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">OR softcopy</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"    
                                            :min="0"
                                            multiple 
                                            @input="afterFileSelect"
                                            name="orDocumentFile"
                                        />
                                    </dd>
                                    <dt class="text-sm font-medium text-gray-500">Or Document No.</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ElementsInput
                                            :full="true"
                                            v-model="documentFiles.orDocumentFileName"
                                            :disabled="true"
                                        />
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
                <div v-if="isNotEditable" class="flex justify-end gap-4">
                    <ElementsButton 
                        :backgroundWhite="true"
                        :text="'Back To List'"
                        @clickEvent="backToLilstPage"
                    />
                </div>
                <div v-else class="flex justify-end gap-4">
                    <ElementsButton
                        :backgroundWhite="true"
                        :width32="true"
                        :text="'Cancel'"
                    />
                    <ElementsButton
                        :width32="true"
                        :text="'Submit'"
                        @clickEvent="submitFlexbenAction"
                    />
                </div>
            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";

export default {
    mounted(){
        const self = this;
        self.getCompanyList();
        self.getMileageHistory();
    },
    components:{
        AppMain, AppAside
    },
    data(){
        return{
            isNotEditable : true,
            companyList : [],
            notificationMethods : [
                { id: 'TOPUP_FROM_HRFLEX', title: 'Topup' },
                { id: 'DEDUCT_TO_HRFLEX', title: 'Deduct' },
            ],
            registerData : {
                transactionType : "TOPUP_FROM_HRFLEX",
                companySeq : "",
                companyName : "",
                executerId : "",
                transactionNote : "",
                mileageVolume : 0,
                poDocumentFilePath : null,
                invoiceFilePath : null,
                orDocumentFilePath : null
            },
            documentFiles : {
                poDocumentFile : null,
                orDocumentFileName : null,
                invoiceFile : null,
                invoiceFileName : null,
                orDocumentFile : null,
                poDocumentFileName : null
            },
            deleteFileUrls : []
        }
    },
    methods:{
        getCompanyList(){
            const self = this;
            const json_query = {
                limit : 10,
                offset : null,
                companyName : null,
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
        getMileageHistory(){
            const self = this;
            const params = new URLSearchParams( window.location.search );
            if( ! params.has("mileageSeq") ){
                self.isNotEditable = false;
                return;
            }

            const url = self.$api( "uri", "get-flexben-history" );
            self.$axios.get( `${url}/${params.get("mileageSeq")}`)
                .then( res => {
                    self.registerData = { ...res.data.data };
                })
                .catch(alert);
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
        async submitFlexbenAction(){
            const self = this;
            const url = self.$api( "uri", "post-topup-to-company" );

            await self.submitDocumentFiles()
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
                    // alert( "hihi ")
                    // location.href = "/flexben/topup_deduct"
                    self.backToLilstPage();
                })
                .catch( err => {
                    let errMsg = err.response.data.code || err;
                    alert( errMsg );
                })

        },
        backToLilstPage(){
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
        deleteSelectedFile( e ){
            const self = this;
            console.log( e )
            const elementName = e.target.getAttribute('name');
            // const filePath = self.registerData[ elementName ];
            // self.$axios
            //     .delete( filePath )
            //     .then( () => {
                    // self.registerData[elementName] = null;
                // })
                // .catch( alert );

            self.registerData[elementName] = null;
            
        },
    }
    
}
</script>



