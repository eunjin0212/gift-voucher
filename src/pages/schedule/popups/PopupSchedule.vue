<script>
import { ValidateUtil } from "@/plugins/app-util.js";
import ElementsInput from "@/components/elements/ElementsInput";
import moment from "moment";

export default {
    components: {ElementsInput},
    props: {
        modelValue : Boolean,
        name : String,
        editItem : Object,
    },
    emits: ["closePopup", "success", 'update:modelValue'],
    data() {
        return {
            showNotiErr : false,
            isEdit : false,
            notificationErrMSG: null,
            profileOption : [
                { text : "Local" , value : "LOCAL" },
                { text : "Staging" , value : "STG" },
                { text : "Production" , value : "PRD" },
            ],
            processStatusOption : [
                { text : "WAIT" , value : "WAIT" },
                { text : "PROCESSING" , value : "PROCESSING" },
                { text : "FINISH" , value : "FINISH" },
                { text : "ERROR" , value : "ERROR" },
            ],
            ynOption : [
                { text : "N" , value : "N" },
                { text : "Y" , value : "Y" },
            ],
            requestErrorMsg: {
                executeMessageQueue: "Schedule Name can't be blank",
                executeDatetime: "Execute Datetime can't be blank and 19-digit",
                executeExpire: "Enter the 19-digit",
                intervalRule: "Schedule Name can't be blank",
            },
            requestError: {
                executeMessageQueue: null,
                executeDatetime: null,
                executeExpire: null,
                intervalRule: null,
            },
            request: {
                scheduleQueueWaitSeq: null,
                scheduleReferenceSeq : null,
                executeDatetime : null,
                executeProfile : null,
                executeIgnore : null,
                executeExpire : null,
                executeMessageQueue : null,
                intervalRule : null,
                processStatus : null,
                scheduleEventId : null,
                scheduleEventContent : null,
            },
        }; //return
    }, //data
    mounted() {
        const self = this;
        self.initData();
    },
    methods: {
        initData() {
            const self = this;
            if (self.editItem) {
                self.isEdit = true;
                self.request = self.editItem;

                if (self.request.executeDatetime) {
                    let executeDatetime = self.request.executeDatetime;
                    executeDatetime = moment(executeDatetime).tz("Asia/Manila").format("YYYY-MM-DD HH:mm:ss");
                    self.request.executeDatetime = executeDatetime;
                }

                if (self.request.executeExpire) {
                    let executeExpire = self.request.executeExpire;
                    executeExpire = moment(executeExpire).tz("Asia/Manila").format("YYYY-MM-DD HH:mm:ss");
                    self.request.executeExpire = executeExpire;
                }
            } else {
                self.isEdit = false;
            }
        },
        isValidCheck() {
            const self = this;
            let isValid = true;

            if (!self.request.executeMessageQueue){
                self.requestError.executeMessageQueue = self.requestErrorMsg.executeMessageQueue;
                isValid = false;
            }
            if (!self.request.executeDatetime || self.request.executeDatetime.length != 19) {
                self.requestError.executeDatetime = self.requestErrorMsg.executeDatetime;
                isValid = false;
            }
            if (self.request.executeExpire && self.request.executeExpire.length != 19) {
                self.requestError.executeExpire = self.requestErrorMsg.executeExpire;
                isValid = false;
            }
            if (!self.request.intervalRule) {
                self.requestError.intervalRule = self.requestErrorMsg.intervalRule;
                isValid = false;
            }

            return isValid;
        },
        resetErrorMsg() {
            const self = this;
            self.requestError = {
                firstName: null,
                lastName: null,
                phoneNumber: null,
                inviteEmail: null,
                joinDate: null,
            };
        },
        cancelButton() {
            const self = this;
            self.$emit("closePopup");
        },
        resetReqeustData() {
            const self = this;
            self.request = {
                scheduleQueueWaitSeq: null,
                scheduleReferenceSeq : null,
                executeDatetime : null,
                executeProfile : null,
                executeIgnore : null,
                executeExpire : null,
                executeMessageQueue : null,
                intervalRule : null,
                processStatus : null,
                scheduleEventId : null,
                scheduleEventContent : null,
            };
        },
        insertSchedule() {
            const self = this;
            self.resetErrorMsg();

            if (!self.isValidCheck()) {
                self.showNotiErr = true;
                self.notificationErrMSG = 'Please check the error message';
                return;
            }
            const saveItem = self.request;
            const url = self.$api('uri', 'post-schedule');
            self.$axios.post(url, saveItem).then( res => {
                    console.log("post res => ", res.data)
                    self.$emit('success');
                    self.$emit('closePopup');
                })
                .catch(err =>{
                    alert(err.response.data.message);
                })
        },
        updateSchedule() {
            const self = this;
            self.resetErrorMsg();
            if (!self.isValidCheck()) {
                self.showNotiErr = true;
                return;
            }

            const saveItem = self.request;
            let url = self.$api('uri', 'put-schedule');
            url = url.replace('{scheduleQueueWaitSeq}', self.request.scheduleQueueWaitSeq);
            self.$axios.put(url, saveItem )
                .then(res => {
                    console.log("put res => ", res.data)
                    self.$emit('success');
                    self.$emit('closePopup');
                }).catch(err =>{
                    alert(err.response.data.message);
                })
        },
        hidePopup(){
            const self = this;
            self.$emit('update:modelValue', false)
        },
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
            <div class="max-h-[70vh] min-w-[600px] overflow-auto">
                <div class="pr-4 pb-8 pl-4">
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Message Queue Name<span>*</span>
                        </div>
                        <ElementsInput
                            v-model="request.executeMessageQueue"
                            placeholder="Enter Message Queue Name"
                            class="flex-1"
                            :full="true"
                            :error="requestError.executeMessageQueue"
                            :maxlength="60"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Schedule Reference Seq
                        </div>
                        <ElementsInput
                            v-model="request.scheduleReferenceSeq"
                            placeholder="Enter Schedule Reference Seq"
                            class="flex-1"
                            :full="true"
                            :maxlength="20"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Execute Datetime<span>*</span>
                        </div>
                        <ElementsInput
                            v-model="request.executeDatetime"
                            placeholder="YYYY-MM-DD HH:MM:00"
                            class="flex-1"
                            :full="true"
                            :error="requestError.executeDatetime"
                            :maxlength="19"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Execute Expire
                        </div>
                        <ElementsInput
                            v-model="request.executeExpire"
                            placeholder="YYYY-MM-DD HH:MM:00"
                            class="flex-1"
                            :full="true"
                            :error="requestError.executeExpire"
                            :maxlength="19"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">Execute Profile</div>
                        <ElementsSelect
                            v-model="request.executeProfile"
                            placeholder="Select Profile"
                            class="flex-1"
                            :full="true"
                            :options="profileOption"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">Execute Ignore</div>
                        <ElementsSelect
                            v-model="request.executeIgnore"
                            placeholder="Select Ignore YN"
                            class="flex-1"
                            :full="true"
                            :options="ynOption"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">Process Status</div>
                        <ElementsSelect
                            v-model="request.processStatus"
                            placeholder="Select Status"
                            class="flex-1"
                            :full="true"
                            :options="processStatusOption"
                        />
                    </div>

                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Interval Rule<span>*</span>
                        </div>
                        <div class="flex-1 flex justify-between items-center gap-3.5">
                            <ElementsInput
                                v-model="request.intervalRule"
                                placeholder="ONCE, EVERY 1 HOURS, EVERY 1 MONTH"
                                class="flex-1"
                                :full="true"
                                :error="requestError.intervalRule"
                                :maxlength="20"
                            />
                        </div>
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Schedule Event Id
                        </div>
                        <ElementsInput
                            v-model="request.scheduleEventId"
                            placeholder="Enter SCHEDULE EVENT ID"
                            class="flex-1"
                            :full="true"
                        />
                    </div>
                    <div class="flex justify-between items-center gap-2 mt-6">
                        <div class="w-32 text-sm font-semibold text-slate-800">
                            Schedule Event Content
                        </div>
                        <ElementsInput
                            v-model="request.scheduleEventContent"
                            placeholder="Enter SCHEDULE EVENT CONTENT"
                            class="flex-1"
                            :full="true"
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
                            @click="cancelButton"
                        />
                        <ElementsButton
                            class="ml-2"
                            text="Add"
                            v-if="!isEdit"
                            :width28="true"
                            :height12="true"
                            @click="insertSchedule"
                        />
                        <ElementsButton
                            class="ml-2"
                            text="Edit"
                            v-if="isEdit"
                            :width28="true"
                            :height12="true"
                            @click="updateSchedule"
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
