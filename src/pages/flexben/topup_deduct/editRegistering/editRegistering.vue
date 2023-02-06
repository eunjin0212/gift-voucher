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
                                                <input 
                                                    name="point-excution-method" type="radio" 
                                                    :checked="true" 
                                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label class="ml-3 block text-sm font-medium text-gray-700"> 
                                                    {{ pointExcutionMethods.find(type => type.id === registerData.transactionType ).title }} 
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </dd>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Points</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <div> {{ registerData.mileageVolume }} </div>
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
                                            name="poDocumentFilePath"
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
                                            name="invoiceFilePath"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"    
                                            :min="0"
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
                                            name="orDocumentFilePath"
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
                        @clickEvent="backToLilstPage"
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
        self.getMileageHistory();
    },
    components:{
        AppMain, AppAside
    },
    data(){
        return{
            isNotEditable : true,
            companyList : [],
            pointExcutionMethods : [
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
        }
    },
    methods:{
        getMileageHistory(){
            const self = this;
            const params = new URLSearchParams( window.location.search );
            if( ! params.has("mileageSeq") ){
                self.backToLilstPage();
            }

            const url = self.$api( "uri", "get-flexben-history" );
            self.$axios.get( `${url}/${params.get("mileageSeq")}`)
                .then( res => {
                    self.registerData = { ...res.data.data };
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
            const elementName = e.target.getAttribute('name');
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

    }
    
}
</script>



