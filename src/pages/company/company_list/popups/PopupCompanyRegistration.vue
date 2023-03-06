<script>
// eslint-disable-next-line no-unused-vars
import { ValidateUtil } from "@/plugins/app-util.js";
import ElementsNotification from "@/components/elements/ElementsNotification.vue";

export default {
    props: {
        modelValue : Boolean,
        name : String,
    },
    components :{
        ElementsNotification
    },
    emits: ["closePopup", "successInvite", 'update:modelValue'],
    data() {
        return {
            showNotiErr : false,
            isEdit : false,
            notificationErrMSG: null,
            requestErrorMsg: {
                companyName: "Please enter the Company Name",
                employeeName: "Please enter the Employee Name",
                loginId: "Please enter the Login Id",
                loginPwd: "Please enter the Login Password",
            },
            requestError: {
                companyName: null,
                employeeName: null,
                loginId: null,
                loginPwd: null,
            },
            request: {
                companyName: null,
                employeeName: null,
                loginId: null,
                loginPwd: null,
            },
        }; //return
    }, //data
    mounted() {
        const self = this;
        self.getInitData();
    },
    methods: {
        isValidCheck() {
            const self = this;
            let isValid = true;

            if (ValidateUtil.checkIsEmpty(self.request.companyName)) {
                self.requestError.companyName = self.requestErrorMsg.companyName;
                isValid = false;
            }
            if (ValidateUtil.checkIsEmpty(self.request.employeeName)) {
                self.requestError.employeeName = self.requestErrorMsg.employeeName;
                isValid = false;
            }
            if (ValidateUtil.checkIsEmpty(self.request.loginId)) {
                self.requestError.loginId = self.requestErrorMsg.loginId;
                isValid = false;
            }
            if (ValidateUtil.checkIsEmpty(self.request.loginPwd)) {
                self.requestError.loginPwd = self.requestErrorMsg.loginPwd;
                isValid = false;
            }

            return isValid;
        },
        resetErrorMsg() {
            const self = this;
            self.requestError = {
                companyName: null,
                employeeName: null,
                loginId: null,
                loginPwd: null,
                };
        },
        cancelInvite() {
            const self = this;
            self.$emit("closePopup");
        },
        resetReqeustData() {
            const self = this;
            self.request = {
                companyName: null,
                employeeName: null,
                loginId: null,
                loginPwd: null,
            };
        },
        getInitData() {
            // const self = this;
        },
        getDataForSave(){
            const self = this;

            let { companyName, employeeName, loginId, loginPwd } = self.request;

            const saveItem = { companyName, employeeName, loginId, loginPwd }

            for( let key in saveItem ){
                if(!saveItem[key]) continue;
                saveItem[key] = saveItem[key].trim();
            }

            return saveItem;
        },
        inviteCompany() {
            const self = this;
            self.resetErrorMsg();

            if (!self.isValidCheck()) {
                self.showNotiErr = true;
                self.notificationErrMSG = 'Please check the error message';
                return;
            }
            const saveItem = self.getDataForSave();
            const url = self.$api('uri', 'post-company');
            self.$axios.post(url, saveItem).then( res => {
                    console.log("post res => ", res.data)
                    self.$emit('successInvite' , "It is successfully registration ");
                    self.$emit('closePopup');
                })
                .catch(err =>{
                    if(err.response.data.code == "HR_INVITE_INSERT_ALREADY_USED_EMAIL_400_FAILED"){
                        self.requestError.inviteEmail = self.requestErrorMsg.duplicatedEmail;
                    }
                })
        },
        hidePopup(){
            const self = this;
            self.$emit('update:modelValue', false)
        }
    },
};
</script>

<template>
    <div
        v-show="modelValue"
        class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
    >
        <div class="border rounded-lg shadow shadow-gray-100 bg-white">
            <div class="px-7 py-6 flex justify-between items-center">
                <h2 class="text-xl font-bold">{{ name }}</h2>
                <a
                    href="javascript:void(0)"
                    class="ml-20"
                    @click="hidePopup"
                >
                <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                </a>
            </div>

            <div class="w-full h-px bg-gray-200"></div>
            <div class="max-h-[70vh] overflow-auto">

                <div class="pr-4 pb-8 pl-4">
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Company Name*
                        </div>
                        <ElementsInput
                            v-model="request.companyName"
                            placeholder="Enter Company Name"
                            class="flex-1"
                            :full="true"
                            :error="requestError.companyName"
                            :maxlength="60"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Admin Name*
                        </div>
                        <ElementsInput
                            v-model="request.employeeName"
                            placeholder="Enter Employee Name"
                            class="flex-1"
                            :full="true"
                            :error="requestError.employeeName"
                            :maxlength="60"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Admin department
                        </div>
                        <ElementsInput
                            v-model="request.employeeName"
                            placeholder="Enter Employee Name"
                            class="flex-1"
                            :full="true"
                            :error="requestError.employeeName"
                            :maxlength="60"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Admin Email
                        </div>
                        <ElementsInput
                            v-model="request.employeeName"
                            placeholder="Enter Employee Name"
                            class="flex-1"
                            :full="true"
                            :error="requestError.employeeName"
                            :maxlength="60"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Admin Phone number
                        </div>
                        <ElementsInput
                            v-model="request.employeeName"
                            placeholder="Enter Employee Name"
                            class="flex-1"
                            :full="true"
                            :error="requestError.employeeName"
                            :maxlength="60"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Login Id*
                        </div>
                        <ElementsInput
                            v-model="request.loginId"
                            placeholder="Enter Login Id"
                            class="flex-1"
                            :full="true"
                            :error="requestError.loginId"
                            :maxlength="60"
                        />
                    </div>

                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Login Pwd*
                        </div>
                        <ElementsInput
                            v-model="request.loginPwd"
                            placeholder="Enter Login Pwd"
                            class="flex-1"
                            :full="true"
                            :error="requestError.loginPwd"
                            :maxlength="60"
                        />
                    </div>

                </div>
                <div class="sticky bottom-0 ">
                    <div class="w-full h-px bg-gray-200"></div>
                    <div
                        class=" px-4 py-6 flex justify-end w-full bg-white"
                    >
                        <ElementsButton
                            text="Cancel"
                            :width28="true"
                            :height12="true"
                            :background-white="true"
                            @click="cancelInvite"
                        />
                        <ElementsButton
                            class="ml-2"
                            text="Invite"
                            v-if="!isEdit"
                            :width28="true"
                            :height12="true"
                            @click="inviteCompany"
                        />
                    </div>
                </div>
            </div>
        </div>
        <ElementsNotification
            v-model="showNotiErr"
            :notificationMsg="notificationErrMSG"
            :warning="true"
        />
    </div>
</template>
