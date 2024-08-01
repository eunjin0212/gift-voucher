<template>
    <div v-if="modelValue" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
        <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[40.25rem] max-h-[90vh] overflow-y-auto">
            <div class="px-7 py-3 flex justify-center items-center h-16 text-2xl font-bold">Insert Image Token</div>

            <div class="bg-gray-200 border-b"></div>
            <div class="my-12 px-12">
                <!-- token value -->
                <div class="mt-4 h-12 flex justify-start items-center">
                    <div class="w-36 h-12 text-sm font-bold text-[#6B7280] flex items-center">Token Value</div>
                    <ElementsInput v-model="request.tokenValue" :width25rem="true" :height12="true" />
                </div>
                <p v-if="showError.tokenValue" class="pl-36 mt-1 text-sm font-normal text-[#FF0000]">*Please input the token value.</p>

                <!-- start date -->
                <div class="mt-4 h-12 flex justify-start items-center">
                    <div class="w-36 h-12 text-sm font-bold text-[#6B7280] flex items-center">Start Date</div>
                    <div
                        class="w-[25rem] h-12 flex justify-start items-center shadow shadow-gray-100 border rounded-md text-sm font-semibold"
                        :class="[request.startDatetime == null ? ' text-[#AAB0BA]' : 'text-black']">
                        <ElementsDatePicker v-model="request.startDatetime" placeholder="MM/DD/YYYY" :textLeft="true" :hasBorder="false" class="w-[22rem]" />
                        <div class="border-r border-gray-300 h-full"></div>
                        <div class="w-[3rem] flex justify-center items-center">
                            <img v-if="request.startDatetime == null" src="@/assets/img/date-gray.svg" width="24" height="24" />
                            <img v-else src="@/assets/img/date-blue.svg" width="24" height="24" />
                        </div>
                    </div>
                </div>
                <p v-if="showError.startDatetime" class="pl-36 mt-1 text-sm font-normal text-[#FF0000]">*Please select the start date.</p>

                <!-- end date -->
                <div class="mt-4 h-12 flex justify-start items-center">
                    <div class="w-36 h-12 text-sm font-bold text-[#6B7280] flex items-center">End Date</div>
                    <div
                        class="w-[25rem] h-12 flex justify-start items-center shadow shadow-gray-100 border rounded-md text-sm font-semibold"
                        :class="[request.endDatetime == null ? ' text-[#AAB0BA]' : 'text-black']">
                        <ElementsDatePicker v-model="request.endDatetime" placeholder="MM/DD/YYYY" :textLeft="true" :hasBorder="false" class="w-[22rem]" />
                        <div class="border-r border-gray-300 h-full"></div>
                        <div class="w-[3rem] flex justify-center items-center">
                            <img v-if="request.endDatetime == null" src="@/assets/img/date-gray.svg" width="24" height="24" />
                            <img v-else src="@/assets/img/date-blue.svg" width="24" height="24" />
                        </div>
                    </div>
                </div>
                <p v-if="showError.endDatetime" class="pl-36 mt-1 text-sm font-normal text-[#FF0000]">*Please select the end date.</p>
            </div>
            <div class="mt-36 bg-gray-200 border-b"></div>

            <div class="h-24 flex justify-center gap-2 items-center text-base font-semibold">
                <button class="w-40 h-12 border rounded-lg shadow shadow-gray-100 text-[#4261EE]" @click="closePopup">Cancel</button>
                <button class="w-40 h-12 border rounded-lg shadow shadow-gray-100 bg-[#4261EE] text-white" @click="submitGrantIndividual">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { ValidateUtil } from '@/plugins/app-util.js';

export default {
    components: {},
    emits: ['update:modelValue', 'insert-success'],
    props: {
        modelValue: Boolean,
    },
    data() {
        return {
            request: {
                tokenValue: null,
                startDatetime: null,
                endDatetime: null,
            },
            showError: {
                tokenValue: false,
                startDatetime: false,
                endDatetime: false,
            },
        };
    },
    mounted() {
        const self = this;
    },
    watch: {
        modelValue(isOpen) {
            const self = this;
            if (!isOpen) {
                return;
            }
            // 초기화
            // 요청 파라미터
            self.request.tokenValue = null;
            self.request.startDatetime = null;
            self.request.endDatetime = null;

            self.resetError();
        },
    },
    methods: {
        closePopup() {
            const self = this;
            self.$emit('update:modelValue', false);
        },
        submitGrantIndividual() {
            const self = this;
            self.resetError();

            let isInvalid = false;
            if (ValidateUtil.checkIsEmpty(self.request.tokenValue)) {
                self.showError.tokenValue = true;
                isInvalid = true;
            }

            if (ValidateUtil.checkIsEmpty(self.request.startDatetime)) {
                self.showError.startDatetime = true;
                isInvalid = true;
            }

            if (ValidateUtil.checkIsEmpty(self.request.endDatetime)) {
                self.showError.endDatetime = true;
                isInvalid = true;
            }

            if (isInvalid) {
                return;
            }

            const parameter = {
                tokenValue: self.request.tokenValue,
                startDatetime: moment(self.request.startDatetime, 'YYYYMMDD').format('YYYY-MM-DD HH:mm:ss'),
                endDatetime: moment(self.request.endDatetime, 'YYYYMMDD').format('YYYY-MM-DD HH:mm:ss'),
            };

            const url = self.$api('uri', 'post-image-token');
            self.$axios
                .post(url, parameter)
                .then((res) => {
                    self.$emit('insert-success');
                })
                .catch((err) => {
                    console.log('fail: ', err);
                });
        },
        resetError() {
            const self = this;
            self.showError.tokenValue = false;
            self.showError.startDatetime = false;
            self.showError.endDatetime = false;
        },
    },
};
</script>
