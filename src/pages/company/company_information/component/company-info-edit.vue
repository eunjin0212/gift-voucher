<template>
    <div class="bg-white shadow-md shadow-gray-200 p-4 mt-6">
        <form @submit.prevent="$emit('edit-company-info', editCompanyData)">
            <div class="flex flex-col gap-4" >
                <div class="py-2 text-xl font-bold text-zinc-900"> company Information </div>
                <ElementsInput
                    :name="'Company Name'"
                    :width72="true"
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
                    v-model="editCompanyData.BusinessRegistrationNum"
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
                        v-model="editCompanyData.companyNumber"
                        :full="true"
                        :maxlength="200"
                        :required="true"
                        :inputtype="'tel'"
                    />
                </div>
                <ElementsInput
                    v-model="editCompanyData.companyEmail"
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
<!--
                <div>
                    <div class="text-sm font-semibold text-slate-800 mb-3"> Contract File </div>
                    <template v-if="contractFile">
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                        <div class="text-blue-600 grid items-baseline" >
                            {{  contractFile.name }}
                        </div>
                        <div
                            class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                            name="poDocumentFile"
                            @click="$emit('update:contractFile', null )"
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
                </div>-->

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
            <!-- <div class="my-7 flex flex-col gap-4">
                <div class="text-2xl font-bold"> Service Usage Information </div>
                <ElementsDate
                    :name="'Use Fee Deposit Date'"
                    v-model="editCompanyData.useFeeDepositDate"
                />
                <ElementsSelect
                    :name="'FlexBen Type'"
                    :full="true"
                    :options="flexbenTypeOptions"
                    v-model="editCompanyData.flexbenCampaignSeq"
                />
                <ElementsSelect
                    :name="'Billing Stauts'"
                    :full="true"
                    :options="billingStatusOptions"
                    v-model="editCompanyData.billingStatus"
                />
            </div> -->
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
    emits : ['edit-company-info', 'click-cancel'],
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
                BusinessRegistrationNum : "",
                companyNumber : "",
                companyEmail : "",
                companyAddress : "",
                contractFilePath : "",
                subscriptionPicDepartment : null,
                subscriptionPicEmail : null,
                subscriptionPicName : null,
                subscriptionPicPhoneNumber : null,
            },
        }
    },
    mounted(){
        const self = this;
        self.editCompanyData=  Object.assign( self.editCompanyData, self.registerData );
    }
}
</script>