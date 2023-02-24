<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Registering'">
            <form @submit.prevent="submitFlexbenAction">
                <div class="flex flex-col p-3 w-full max-w-7xl mt-4 gap-3">
                    <div class="overflow-hidden mt-3">
                        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                            <dl class="sm:divide-y sm:divide-gray-200">
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">company</dt>
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
                                            <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                                <div v-for="pointMethod in pointExcutionMethods" :key="pointMethod.id" class="flex items-center">
                                                    <input
                                                        @change="changePointTypeSetToMinMax($event.target.id)"
                                                        v-model="registerData.transactionType"
                                                        :id="pointMethod.id"
                                                        :value="pointMethod.id"
                                                        name="point-excution-method" type="radio"
                                                        :checked="pointMethod.id===registerData.transactionType"
                                                        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label :for="pointMethod.id" class="ml-3 block text-sm font-medium text-gray-700">{{ pointMethod.title }}</label>
                                                </div>
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
                                            :min="registerData.transactionType === 'TOPUP_FROM_HRFLEX' ? 1 : null"
                                            :max="registerData.transactionType === 'DEDUCT_TO_HRFLEX' ? -1 : null"
                                            v-model="registerData.mileageVolume"
                                        />
                                    </dd>
                                </div>

                                <div>

                                    <div v-if="documentFiles.poDocumentFile" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">PO softcopy</dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                            <div class="text-blue-600" >
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
                                    </div>
                                    <div v-else class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">PO softcopy</dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <input type="file"
                                                class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                                multiple
                                                @input="afterFileSelect"
                                                name="poDocumentFile"
                                            />
                                        </dd>
                                    </div>

                                </div>
                                <div>

                                    <div v-if="documentFiles.invoiceFileName" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">PO softcopy</dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                            <div class="text-blue-600" >
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
                                    </div>
                                    <div v-else class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">Invoice softcopy</dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <input type="file"
                                                multiple
                                                @input="afterFileSelect"
                                                name="invoiceFile"
                                                class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                            />
                                        </dd>
                                    </div>

                                </div>
                                <div>

                                    <div v-if="documentFiles.orDocumentFileName" class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">PO softcopy</dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                                            <div class="text-blue-600" >
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
                                    </div>
                                    <div v-else class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                        <dt class="text-sm font-medium text-gray-500">OR softcopy</dt>
                                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <input type="file"
                                                class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                                multiple
                                                @input="afterFileSelect"
                                                name="orDocumentFile"
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
                            :text="'Submit'"
                        />
                    </div>
                </div>
            </form>
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
        const { hrAdminName , loginId } = window.logOnProfile.data;
        self.logonProfile.name = hrAdminName;
        self.logonProfile.id = loginId;

    },
    components:{
        AppMain, AppAside
    },
    data(){
        return{
            logonProfile : {
                name : "",
                id : "" ,
            },
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
                mileageVolume : 1,
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
        changePointTypeSetToMinMax( type ){
            const self = this;
            let finalMileageVolume = Math.abs( self.registerData.mileageVolume );
            if( type === 'DEDUCT_TO_HRFLEX' ){
                finalMileageVolume *= -1;
            }
            self.registerData.mileageVolume = finalMileageVolume;
        },
        getCompanyList(){
            const self = this;
            const json_query = {
                limit : -1,
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



