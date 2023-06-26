<template>
    <div class="bg-white shadow-md shadow-gray-200 p-4 mt-6">
        <form @submit.prevent="clickSubmitButton">
            <div class="flex flex-col gap-4" >
                <div class="py-2 text-xl font-bold text-zinc-900"> company Information </div>
                <ElementsInput
                    :name="'Company Name'"
                    :full="true"
                    :maxlength="60"
                    v-model="editCompanyData.companyName"
                    :required="true"
                />
                <ElementsInput
                    :name="'Representative Name'"
                    :full="true"
                    :maxlength="60"
                    v-model="editCompanyData.representativeName"
                    :required="true"
                />
                <ElementsInput
                    :name="'Business registration number'"
                    :full="true"
                    :maxlength="60"
                    v-model="editCompanyData.businessRegistrationNumber"
                    :required="true"
                />
                <div class="text-sm font-semibold text-slate-800"> Company Number </div>
                <div class="w-full flex gap-2">
                    <ElementsInput
                        :modelValue="63"
                        :disabled="true"
                        :width14="true"
                        :maxlength="200"
                    />
                    <ElementsInput
                        class="grow"
                        v-model="editCompanyData.contactNumber"
                        :full="true"
                        :maxlength="200"
                        :required="true"
                        :inputtype="'tel'"
                    />
                </div>
                <ElementsInput
                    v-model="editCompanyData.contactEmail"
                    :name="'Company Email'"
                    :full="true"
                    :inputtype="'email'"
                    :maxlength="100"
                    :required="true"
                />
                <ElementsInput
                    v-model="editCompanyData.companyAddress"
                    :name="'Company Address'"
                    :full="true"
                    :maxlength="199"
                    :required="true"
                />
                <div>
                    <div class="text-sm font-semibold text-slate-800 mb-3"> Contract File </div>
                    <template v-if="editCompanyData.contractFilePath">
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                        <div class="text-blue-600 grid items-baseline" @click="downLoadFile(editCompanyData.contractFilePath)">
                            {{  showTheFileName(editCompanyData.contractFilePath) }}
                        </div>
                        <div
                            class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                            @click="deleteContractFilePath"
                        >
                            delete
                        </div>
                    </dd>
                    </template>
                    <template v-else-if="contractFile.file ">
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                        <div class="text-blue-600 grid items-baseline" >
                            {{  contractFile.name }}
                        </div>
                        <div
                            class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                            @click="deleteContractFile"
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
                                :required="true"
                            />
                        </dd>
                    </template>
                </div>

                <div class="text-2xl font-bold mt-4"> PIC Information </div>
                <ElementsInput
                    v-model="editCompanyData.subscriptionPicName"
                    :name="'PIC Name'"
                    :full="true"
                    :maxlength="60"
                    :required="true"
                />
                <ElementsInput
                    v-model="editCompanyData.subscriptionPicDepartment"
                    :name="'PIC Department'"
                    :full="true"
                    :maxlength="60"
                    :required="true"
                />
                <ElementsInput
                    v-model="editCompanyData.subscriptionPicEmail"
                    :name="'PIC Email'"
                    :full="true"
                    :inputtype="'email'"
                    :maxlength="100"
                    :required="true"
                />
                <div class="text-sm font-semibold text-slate-800"> PIC Contract(Tel) </div>
                <div class="w-full gap-2v flex gap-1">
                    <ElementsInput
                        :modelValue="63"
                        :disabled="true"
                        :width14="true"
                        :maxlength="200"
                    />
                    <ElementsInput
                        class="grow"
                        v-model="editCompanyData.subscriptionPicPhoneNumber"
                        :full="true"
                        :maxlength="60"
                        :required="true"
                        :inputtype="'tel'"
                    />
                </div>

            </div>
            <div class="flex justify-end gap-4 my-3">
                <ElementsButton
                    :backgroundWhite="true" :width32="true"
                    :text="'Cancel'"
                    :inputtype="'button'"
                    @click="$emit('click-cancel')"
                />
                <ElementsButton
                    :width32="true"
                    :text="'Save'"
                    :inputtype="'submit'"
                />
            </div>
        </form>

    </div>
</template>

<script>

export default {
    emits : ['edit-company-info', 'click-cancel', 'submit-file'],
    props : {
        registerData : {
            type : Object,
            default : () => {}
        },
        billingStatusOptions : {
            type : Array,
            default : () => {}
        },
        flexbenTypeOptions : {
            type : Array,
            default : () => {}
        }
    },
    data(){
        return {
            editCompanyData : {
                companyName : null,
                representativeName : "",
                businessRegistrationNumber : "",
                companyNumber : "",
                companyEmail : "",
                companyAddress : "",
                contractFilePath : "",
                subscriptionPicDepartment : null,
                subscriptionPicEmail : null,
                subscriptionPicName : null,
                subscriptionPicPhoneNumber : null,
            },
            contractFile : {
                file : null, name : null
            },
        }
    },
    mounted(){
        const self = this;
        const {
                companyName, representativeName, businessRegistrationNumber,contractFilePath,
                contactNumber, contactEmail, companyAddress, subscriptionPicDepartment,
                subscriptionPicName, subscriptionPicEmail,subscriptionPicPhoneNumber,
        } = self.registerData;

        self.editCompanyData=  {
            companyName, representativeName, businessRegistrationNumber,contractFilePath,
            contactNumber, contactEmail, companyAddress, subscriptionPicDepartment,
            subscriptionPicName, subscriptionPicEmail,subscriptionPicPhoneNumber
        };
    },
    methods : {
        afterFileSelect( e ){
            const self = this;
            console.log( " file upload ", e.target.files )
            const { files } = e.target
            if( files.size < 0 ){
                return ;
            }
            self.contractFile = files[0];
        },
        deleteContractFilePath(){
            const self = this;
            self.editCompanyData.contractFilePath = null;
        },
        deleteContractFile(){
            const self = this;
            self.contractFile = { file : null, name : null }
        },
        showTheFileName( filePath ){
            let fileName = "";
            if( ! filePath ) {
                return fileName;
            }
            const params = new URLSearchParams( filePath )
            return params.get("downloadFileName");
        },
        downLoadFile( filePath ){
            if( ! filePath ) return;

            const link = document.createElement('a');
            let downloadUrl = new URL( filePath );

            link.href= downloadUrl.href;
            link.click();
        },
        clickSubmitButton(){
            const self = this;
            if( ! self.validateEditCompanyInfo() ) {
                return;
            }

            if( self.contractFile.name ){
                self.$emit( "submit-file", self.contractFile );

                self.editCompanyData.contractFilePath = self.registerData.contractFilePath
            }

            self.$emit('edit-company-info', self.editCompanyData )
        },
        validateEditCompanyInfo( ){
            const self = this;
            const { contactNumber, subscriptionPicPhoneNumber, } = self.editCompanyData;

            if( ! self.validatePhoneNumber(contactNumber ) || ! self.validatePhoneNumber(subscriptionPicPhoneNumber) ){
                alert( "Please enter a valid phone number. The number should start with either 09 or 08 and have more than 11 digits." );
                return false;
            }

            return true;
        },
        validatePhoneNumber( contactNumber ) {
            contactNumber = contactNumber.replace(/\D/g, '');
            const regex = /^(09|08)\d{9,}$/;
            return regex.test( contactNumber );
        },

    }
}
</script>