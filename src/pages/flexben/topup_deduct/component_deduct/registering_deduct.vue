<template>
    <div>
        <form @submit.prevent="submitFlexbenAction">
            <div class="flex flex-col p-3 w-full max-w-7xl mt-4 gap-3">
                <div class="overflow-hidden mt-3">
                    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Company</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                    <div>
                                        {{ registerData.companyName || 'Select an Company First' }}
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
                                            <input
                                                name="point-execution-method" type="radio"
                                                :checked="true"
                                                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label class="ml-3 block text-sm font-medium text-gray-700">
                                                Deduct
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
                                        :max="-1"
                                        v-model="registerData.mileageVolume"
                                    />
                                </dd>
                            </div>

                            <div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="grid text-sm font-medium text-gray-500 items-center">Refund slip</dt>

                                    <template v-if="documentFiles.refundSlipFileName">
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                        <div class="text-blue-600 grid items-baseline" >
                                            {{ documentFiles.refundSlipFileName }}
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
                                                name="refundSlipFile"
                                            />
                                        </dd>
                                    </template>

                                </div>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Notes</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <div class="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset bg-white ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                                        <textarea
                                            v-model="registerData.transactionNote"
                                            rows="3"
                                            class="block w-full resize-none border-0 bg-transparent text-gray-900  placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6"
                                            :maxlength="200"
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
                        :inputtype="'button'"
                        :width32="true"
                        :text="'Cancel'"
                        @clickEvent="locationToList"
                    />
                    <ElementsButton
                        :inputtype="'submit'"
                        :width32="true"
                        :text="'Deduct'"
                    />
                </div>
            </div>
        </form>
        <Teleport to="body">
            <CompanySelectPopup
                v-model="selectComPopup.isOpen"
                @selectCompany="selectCompanyTopUp"
            />
        </Teleport>
    </div>
</template>

<script>
import CompanySelectPopup from "@/pages/flexben/topup_deduct/companySelectPopup.vue"

export default {
    mounted(){
        const self = this;
        const { hrAdminName , loginId } = window.logOnProfile.data;
        self.logonProfile.name = hrAdminName;
        self.logonProfile.id = loginId;
    },
    components:{
        CompanySelectPopup
    },
    data(){
        return{
            selectComPopup : {
                isOpen : false,
            },
            logonProfile : {
                name : "",
                id : "" ,
            },
            isNotEditable : true,
            companyList : [],
            pointExcutionMethods : [
                { id: 'TOPUP_FROM_HRFLEX', title: 'Top-up' },
                { id: 'DEDUCT_TO_HRFLEX', title: 'Deduct' },
            ],
            registerData : {
                transactionType : "DEDUCT_TO_HRFLEX",
                companySeq : "",
                companyName : "",
                executerId : "",
                transactionNote : "",
                mileageVolume : -1,
            },
            documentFiles : {
                refundSlipFile : null,
                refundSlipFileName : null
            },
            deleteFileUrls : []
        }
    },
    methods:{
        afterFileSelect( e ){
            const self = this;
            const { files, name } = e.target
            if( files.size < 0 ){
                return ;
            }

            self.documentFiles[ name ] = files[0];
            self.documentFiles[ `${name}Name`] = files[0].name
        },
        deleteSelectedFile( e ){
            const self = this;
            const elementName = e.target.getAttribute('name');
            self.documentFiles[elementName] = null;
            self.documentFiles[`${elementName}Name`] = null;
        },
        submitDocumentFiles(){
            const self = this;

            const url = self.$api("uri", "post-file-direct-upload" );
            const { refundSlipFile, refundSlipFileName } = self.documentFiles;
            let form = new FormData();
            form.append( `uploadFile1` , refundSlipFile );
            form.append( `uploadFileName1` , refundSlipFileName );

            return self.$axios.post( url, form, { headers : {'Content-Type' : 'multipart/form-data;'} })
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
                .then( ({uploadFile1}) =>{
                    const registerData = {
                                            ...self.registerData,
                                            refundSlipFilePath : uploadFile1 }
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
        locationToList(){
            location.href = "/flexben/topup_deduct#deduct"
        },
        openSelectCompanyPop(){
            const self = this;
            self.selectComPopup.isOpen = true;
        },
        selectCompanyTopUp( { companyName, companySeq  } ){
            const self = this;
            self.registerData.companyName = companyName;
            self.registerData.companySeq = companySeq;
        },
    }

}
</script>
