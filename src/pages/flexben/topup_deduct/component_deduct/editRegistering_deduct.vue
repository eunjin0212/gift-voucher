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
                                                Deduct
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
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="grid text-sm font-medium text-gray-500 items-center">Refund slip </dt>
                                <template v-if="registerData.refundSlipFilePath">
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                        <a class="text-blue-600 underline cursor-pointer" :href="registerData.refundSlipFilePath">
                                            {{ showTheFileName( registerData.refundSlipFilePath )}}
                                        </a>
                                        <ElementsButton
                                            :width20="true"
                                            :height12="true"
                                            :borderRed="true"
                                            :text="'Delete'"
                                            @clickEvent="deleteSelectedFile('refundSlipFilePath')"
                                        />
                                    </dd>
                                </template>

                                <template v-else>
                                    <dd class="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                            multiple
                                            @input="afterFileSelect"
                                            name="refundSlipFilePath"
                                        />
                                    </dd>
                                </template>
                            </div>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Notes</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 grid grid-cols-5 gap-2 ">
                                <div class="col-span-4 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset bg-white
                                            ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                    <textarea
                                        v-model="registerData.transactionNote"
                                        rows="3"
                                        class="resize-none w-full border-0 bg-transparent text-gray-900  placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
                                        :maxlength="200"
                                    />
                                </div>
                                <div class="col-span-1 place-self-end">
                                    <ElementsButton
                                        :width20="true"
                                        :height12="true"
                                        :bgWhiteAndtextIndigo="true"
                                        :text="'Save'"
                                        @clickEvent="updateTransactionHistory()"
                                    />
                                </div>
                            </dd>
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
                transactionType : "DEDUCT_TO_HRFLEX",
                companySeq : "",
                companyName : "",
                executerId : "",
                transactionNote : "",
                mileageVolume : 0,
                refundSlipFilePath : null,
            },
            documentFiles : {
                refundSlipFilePath : null,
            },
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
            location.href = "/flexben/topup_deduct#deduct"
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
        updateTransactionHistory(){
            const self = this;

            const url = self.$api("uri", "put-flexben-history");
            const params = new URLSearchParams( window.location.search );
            const mileageCompanyHistorySeq = params.get("mileageSeq")
            const { companySeq, transactionNote } = self.registerData;
            const updateData = { mileageCompanyHistorySeq , companySeq, transactionNote };
            self.$axios.put( url , updateData )
                        .then( res => {
                            alert( "Success to update" );
                        } )
                        .catch( err => {
                            const { code, message } = err.response.data;
                            let errMsg = code ? code + "\n" + message : err;
                            alert( errMsg );
                        })

        }
    }

}
</script>



