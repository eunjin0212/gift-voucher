<template>
    <div
        v-show="modelValue"
        class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
    >
        <form @submit.prevent="clickSubmitButton"
            id="hrNoticeForm"
            class="border rounded-lg shadow shadow-gray-100 bg-white min-w-[70vh]"
        >
            <div class="px-7 py-6 flex justify-between items-center ">
                <h2 class="text-xl font-bold">
                    <span v-if="executeType ==='EDIT'">Edit Notice</span>
                    <span v-else-if="executeType ==='CREATE'">Add Notice</span>
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
                            <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1"> Title </dt>
                            <dd class="col-span-2 mt-0">
                                <ElementsInput
                                    v-model.trim="noticeData.noticeTitle"
                                    :maxlength="200"
                                    :required="true"
                                    autocomplete="title"
                                />
                            </dd>
                        </div>
                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                            <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1"> Admin ID </dt>
                            <dd class="col-span-2 mt-0">
                                <ElementsInput
                                    v-model.trim="noticeData.loginId"
                                    :maxlength="200"
                                    :inputtype="'email'"
                                    :required="true"
                                    :disabled="true"
                                    autocomplete="loginId"
                                />
                            </dd>
                        </div>
                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                            <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1"> Contents </dt>
                            <dd class="col-span-2 mt-0">
                                <textarea
                                    form="hrNoticeForm"
                                    v-model.trim="noticeData.noticeContent"
                                    rows="10"
                                    required="true"
                                    :maxlength="1000"
                                    class="resize-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    autocomplete="noticeContent"
                                ></textarea>
                            </dd>
                        </div>
                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                            <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1"> Fixed Option </dt>
                            <dd class="col-span-2 mt-0 font-bold">
                                <!-- @changeButton="changedFixedOption" -->
                                <ElementsSelectButton 
                                    v-model="noticeData.displayHomeYn"
                                    :inputType="'button'"
                                    :selectOption="[{
                                            value : 'Y',
                                            text : 'Fixed the Top'
                                        }, {
                                            value : 'N',
                                            text : 'None'
                                        }]"
                                />
                            </dd>
                        </div>
                        <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1"></dt>
                            <dd v-if="noticeData.displayHomeYn === 'Y'" class="col-span-2 mt-0 flex justify-between">
                                <ElementsDate
                                    v-model="noticeData.displayHomeStartDatetime"
                                    @changeDate="test"
                                />
                                <div class="mt-2">
                                    <span>~</span>
                                </div>
                                <ElementsDate 
                                    v-model="noticeData.displayHomeEndDatetime"
                                />
                            </dd>
                            <dd v-else>
                                <div class="h-12"></div>
                            </dd>
                        </div>
                    </dl>

                </div>
            </div>

            <div class="mt-6 w-full h-px bg-gray-200"></div>
            <div class="px-4 py-6 flex justify-end">
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
import ElementsDate from "./components/noticeElementsDate.vue";
import moment from 'moment';

export default {
    components :{
        ElementsDate
    },
    emits : ['update:modelValue', 'create', 'change'],
    props : {
        modelValue: Boolean,
        executeType : {
            type : String,
            validator(value) {
                return ['CREATE', 'EDIT'].includes(value)
            }
        },
        data : {
            type : Object
        }
    },
    data(){
        return {
            noticeData : {
                noticeHrnflexSeq : null,
                noticeTitle : null,
                loginId : null,
                noticeContent : null,
                displayHomeYn : null,
                displayHomeStartDatetime : null,
                displayHomeEndDatetime : null
            }
        }
    },
    methods : {
        test(value) {
            console.log(value);
        },
        hidePopup() {
            const self = this;
            self.$emit('update:modelValue', false)
        },
        clickSubmitButton(){
            const self = this;
            
            self.noticeData.displayHomeStartDatetime = self.convertToDateTimeForServerFormat(self.noticeData.displayHomeStartDatetime);
            self.noticeData.displayHomeEndDatetime = self.convertToDateTimeForServerFormat(self.noticeData.displayHomeEndDatetime);

            if (self.noticeData.displayHomeYn === 'Y')
            {
                if (!self.noticeData.displayHomeStartDatetime || !self.noticeData.displayHomeEndDatetime)
                {
                    alert("Please select a date to use Fixed on top.");
                    return;
                }

                if (self.noticeData.displayHomeStartDatetime > self.noticeData.displayHomeEndDatetime)
                {
                    alert("End date cannot be earlier than the Start date");
                    return;
                }
            }

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
            self.$emit('create', self.noticeData);
        },
        updateAccountData(){
            const self = this;
            self.$emit('change', self.noticeData);
        },
        convertToDateTimeForServerFormat(date) {
            if (!date) {
                return;
            }
            return moment(date).hours(0).minutes(0).seconds(0).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    mounted() {
        
    },
    watch :{
        modelValue( isOpen ){
            const self = this;
            if( !isOpen ){
                return;
            }

            self.noticeData = {
                noticeHrnflexSeq : null,
                noticeTitle : null,
                loginId : null,
                noticeContent : null,
                displayHomeYn : null,
                displayHomeStartDatetime : null,
                displayHomeEndDatetime : null
            };

            if (self.executeType === 'EDIT') {
                // const {noticeHrnflexSeq, noticeTitle, loginId, noticeContent, displayHomeYn, displayHomeStartDatetime, displayHomeEndDatetime} = self.data;
                // self.noticeData = {noticeHrnflexSeq, noticeTitle, loginId, noticeContent, displayHomeYn, displayHomeStartDatetime, displayHomeEndDatetime};
                // structuredClone() 글로벌 함수 이용할 수 있지만 Web API를 이용하는 것이다보니 변수가 많을 것이라 예상
                // self.noticeData = structuredClone(self.data);
                self.noticeData = JSON.parse(JSON.stringify(self.data));
                self.noticeData.displayHomeStartDatetime = self.convertToDateTimeForServerFormat(self.noticeData.displayHomeStartDatetime);
                self.noticeData.displayHomeEndDatetime = self.convertToDateTimeForServerFormat(self.noticeData.displayHomeEndDatetime);
                return;                
            }

            const {loginId, displayHomeYn} = self.data;
            self.noticeData = {loginId, displayHomeYn};
        }
    }
}
</script>
