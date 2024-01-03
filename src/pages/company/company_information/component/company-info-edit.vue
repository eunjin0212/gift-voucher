<template>
    <div class="bg-white shadow-md shadow-gray-200 p-4 mt-6  max-w-7xl">
        <form @submit.prevent="clickSubmitButton">
            <div class="flex flex-col gap-4" >
                <div class="flex justify-between">
                    <div class="py-2 text-xl font-bold text-zinc-900"> company Information </div>
                    <ElementsButton
                        :width32="true"
                        :text="'Edit'"
                        v-if="! isEdit && $appUtil.checkPermission('COMPANY_SETTING_EDIT')"
                       @click="$emit('update:isEdit', true)"
                    />
                </div>
                <ElementsInput
                    :name="'Company Name'"
                    :full="true"
                    :maxlength="60"
                    v-model="editCompanyData.companyName"
                    :required="true"
                    :disabled="!isEdit"
                />
                <ElementsInput
                    :name="'Representative Name'"
                    :full="true"
                    :maxlength="60"
                    v-model="editCompanyData.representativeName"
                    :required="true"
                    :disabled="!isEdit"
                />
                <ElementsInput
                    :name="'Business registration number'"
                    :full="true"
                    :maxlength="60"
                    v-model="editCompanyData.businessRegistrationNumber"
                    :required="true"
                    :disabled="!isEdit"
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
                        :disabled="!isEdit"
                    />
                </div>
                <ElementsInput
                    v-model="editCompanyData.contactEmail"
                    :name="'Company Email'"
                    :full="true"
                    :inputtype="'email'"
                    :maxlength="100"
                    :required="true"
                    :disabled="!isEdit"
                />
                <ElementsInput
                    v-model="editCompanyData.companyAddress"
                    :name="'Company Address'"
                    :full="true"
                    :maxlength="199"
                    :required="true"
                    :disabled="!isEdit"
                />
                <div>
                    <div class="text-sm font-semibold text-slate-800 mb-3"> Contract File </div>
                    <template v-if="editCompanyData.contractFilePath">
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                        <div class="text-blue-600 grid items-baseline" @click="downLoadFile(editCompanyData.contractFilePath)">
                            {{  showTheFileName(editCompanyData.contractFilePath) }}
                        </div>
                        <div
                            v-if="isEdit"
                            class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                            @click="deleteContractFilePath"
                        >
                            delete
                        </div>
                    </dd>
                    </template>
                    <template v-else-if="contractFile.name ">
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                        <div class="text-blue-600 grid items-baseline" >
                            {{  contractFile.name }}
                        </div>
                        <div
                            v-if="isEdit"
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
                                :disabled="!isEdit"
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
                    :disabled="!isEdit"
                />
                <ElementsInput
                    v-model="editCompanyData.subscriptionPicDepartment"
                    :name="'PIC Department'"
                    :full="true"
                    :maxlength="60"
                    :required="true"
                    :disabled="!isEdit"
                />
                <ElementsInput
                    v-model="editCompanyData.subscriptionPicEmail"
                    :name="'PIC Email'"
                    :full="true"
                    :inputtype="'email'"
                    :maxlength="100"
                    :required="true"
                    :disabled="!isEdit"
                />
                <div class="text-sm font-semibold text-slate-800"> PIC Contract </div>
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
                        :disabled="!isEdit"
                    />
                </div>

            </div>
            <div class="flex justify-end gap-4 my-3" v-if="isEdit">
                <ElementsButton
                    :width32="true"
                    :text="'Save'"
                    :inputtype="'submit'"
                    v-if="$appUtil.checkPermission('COMPANY_SETTING_EDIT')"
                />
            </div>
        </form>

    </div>
</template>

<script>

export default {
    emits : ['edit-company-info', 'click-cancel', 'submit-file', 'delete-file', 'update:isEdit'],
    props : {
        registerData : {
            type : Object,
            default : () => {}
        },
        flexbenTypeOptions : {
            type : Array,
            default : () => {}
        },
        isEdit : Boolean,
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
    watch : {
        'registerData.contractFilePath'( newVal ){
            const self = this;
            self.editCompanyData.contractFilePath = newVal;
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

        self.$emit('update:isEdit', false);
    },
    methods : {
        afterFileSelect( e ){
            const self = this;
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
                self.$emit( "submit-file", self.contractFile, self.editCompanyData );
                self.$emit( "delete-file", self.registerData.contractFilePath )
                return;
            }

            self.$emit('edit-company-info', self.editCompanyData )
        },
        validateEditCompanyInfo( ){
            const self = this;
            const { contactNumber, subscriptionPicPhoneNumber, } = self.editCompanyData;

            if (contactNumber.length < 7 || subscriptionPicPhoneNumber.length < 7) {
                alert( "Please enter a valid phone number. The number should have more than 6 digits." );
                return false;
            }

            // if( ! self.validatePhoneNumber(contactNumber ) || ! self.validatePhoneNumber(subscriptionPicPhoneNumber) ){
            //     alert( "Please enter a valid phone number. The number should start with either 09 or 08 and have more than 11 digits." );
            //     return false;
            // }

            return true;
        },
        validatePhoneNumber( contactNumber ) {
            contactNumber = contactNumber.replace(/\D/g, '');
            const regex = /^(09|08)\d{9,}$/;
            console.log( contactNumber, regex.test( contactNumber ) )

            return regex.test( contactNumber );
        },

    }
}
</script>