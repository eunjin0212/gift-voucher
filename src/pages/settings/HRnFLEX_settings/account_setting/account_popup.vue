<template>
    <div
        v-show="modelValue"
        class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
    >
        <form @submit.prevent="clickSubmitButton"
            id="hrAdminForm"
            class="border rounded-lg shadow shadow-gray-100 bg-white min-w-[70vh]"
        >
            <div class="px-7 py-6 flex justify-between items-center ">
                <h2 class="text-xl font-bold">
                    <span v-if="executeType ==='EDIT'">Edit HRnFLEX Account</span>
                    <span v-else-if="executeType ==='CREATE'">Add HRnFLEX Account </span>
                </h2>
                <a
                    href="javascript:void(0)"
                    class="ml-20"
                    @click="hidePopup"
                >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                </a>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div >
                <div class="h-full flex flex-col">
                    <dl class="mx-5">
                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                            <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1"> Account Name </dt>
                            <dd class="col-span-2 mt-0">
                                <ElementsInput
                                    v-model.trim="accountData.hrAdminName"
                                    :maxlength="200"
                                    :required="true"
                                    autocomplete="hrAdminName"
                                />
                            </dd>
                        </div>
                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                            <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1"> Admin ID (*email) </dt>
                            <dd class="col-span-2 mt-0">
                                <ElementsInput
                                    v-model.trim="accountData.loginId"
                                    :maxlength="200"
                                    :inputtype="'email'"
                                    :required="true"
                                    :disabled="executeType==='EDIT'"
                                    autocomplete="loginId"
                                />
                            </dd>
                        </div>
                        <div
                            v-if="executeType === 'CREATE' || executeType==='EDIT'"
                            class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center"
                        >
                            <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1"> Memo </dt>
                            <dd class="col-span-2 mt-0">
                                <textarea
                                    form="hrAdminForm"
                                    v-model.trim="accountData.accountMemo"
                                    :maxlength="200"
                                    class="resize-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    autocomplete="accountMemo"
                                ></textarea>
                            </dd>
                        </div>
                    </dl>

                </div>
            </div>

            <div class="w-full h-px bg-gray-200"></div>
            <div class="px-4 py-6 flex justify-end"
                v-if="$appUtil.checkPermission('ACCOUNT_EDIT')"
            >
                <ElementsButton
                    text="Cancel"
                    :width28="true"
                    :height12="true"
                    :background-white="true"
                    @click-event="hidePopup"
                />
                <ElementsButton
                    v-if="executeType==='EDIT'"
                    class="ml-2"
                    :inputtype="'submit'"
                    :text="'Change'"
                    :width28="true"
                    :height12="true"
                />
                <ElementsButton
                    v-if="executeType==='CREATE'"
                    class="ml-2"
                    :inputtype="'submit'"
                    :text="'Create'"
                    :width28="true"
                    :height12="true"
                />
            </div>
        </form>
    </div>
</template>

<script>
export default {
    components :{
    },
    emits : [ 'update:modelValue','change','create'],
    props : {
        modelValue: Boolean,
        executeType : {
            type : String,
            validator(value) {
                return ['CREATE', 'EDIT'].includes(value)
            }
        },
        adminData : {
            type : Object
        }
    },
    data(){
        return {
            accountData : {}
        }
    },
    methods : {
        hidePopup() {
            const self = this;
            self.$emit('update:modelValue', false)
        },
        clickSubmitButton(){
            const self = this;

            if( self.executeType === 'CREATE'){
                self.insertAccountData();
                return;
            }

            if( self.executeType === 'EDIT' ){
                self.updateAccountData();
                return;
            }
        },
        insertAccountData(){
            const self = this;

            self.$emit('create', self.accountData);
        },
        updateAccountData(){
            const self = this;

            self.$emit('change', self.accountData );
        },
    },
    mounted(){

    },
    watch :{
        modelValue( isOpen ){
            const self = this;
            if( !isOpen ){
                return;
            }

            self.accountData = {
                hrAdminName : null,
                loginId : null,
                accountMemo : null,
            }

            if( self.executeType ==='EDIT' ){
                const { hrAdminSeq, hrAdminName, loginId, accountMemo } = self.adminData;
                self.accountData = { hrAdminSeq, hrAdminName, loginId, accountMemo }
                return;
            }
        }
    }
}
</script>