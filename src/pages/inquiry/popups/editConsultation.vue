<template>
    <div
        v-if="modelValue"
        class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
    >
        <div class="border rounded-lg shadow shadow-gray-100 bg-white">
            <form method="POST" action="submit" @submit.prevent="saveThisPopup">
                <div class="px-7 py-6 flex justify-between items-center">
                    <h2 class="text-xl font-bold"> Edit Consultation </h2>
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
                    <div class="mt-10 sm:mt-0 relative" >
                        <div class="md:grid md:grid-cols-1 md:gap-6">
                            <div class="mt-5 md:col-span-1 md:mt-0">

                                <div class="overflow-hidden shadow sm:rounded-md">
                                    <div class="bg-white px-4 py-5 sm:p-6">
                                        <div class="grid grid-cols-6 gap-6">

                                            <div class="col-span-6 sm:col-span-4">
                                                <label for="company-name" class="block text-sm font-medium text-gray-700">Consultation Employee</label>
                                                <input
                                                    type="text" name="consultation-emp" id="consultation-emp" autocomplete="consultation-emp" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    v-model="inquiry.consultantEmpName"
                                                    :required="true"
                                                    :disabled="!$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                                                />
                                            </div>

                                            <div class="col-span-6 border-b border-b-slate-300">
                                                <label class="block text-sm font-medium text-gray-700">Consultation Date</label>
                                                <ElementsDate
                                                    v-model="inquiry.consultationDatetime"
                                                    :disabled="!$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                                                />
                                            </div>

                                            <div class="col-span-6 sm:col-span-4">
                                                <label for="company-name" class="block text-sm font-medium text-gray-700">Company Name</label>
                                                <input
                                                    type="text" name="company-name" id="company-name" autocomplete="company-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    v-model="inquiry.inquiryCompanyName"
                                                    :required="true"
                                                    :disabled="!$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                                                />
                                            </div>

                                            <div class="col-span-6 sm:col-span-4">
                                                <label for="num-of-emp" class="block text-sm font-medium text-gray-700">Number of Employees</label>
                                                <input
                                                    type="number" name="num-of-emp" id="num-of-emp" autocomplete="num-of-emp" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    v-model="inquiry.employmentCount"
                                                    :required="true"
                                                    :min="0"
                                                    :disabled="!$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                                                />
                                            </div>

                                            <div class="col-span-6 sm:col-span-4">
                                                <label for="pic-name" class="block text-sm font-medium text-gray-700">PIC Name</label>
                                                <input
                                                    type="text" name="pic-name" id="pic-name" autocomplete="pic-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    v-model="inquiry.picName"
                                                    :required="true"
                                                    :disabled="!$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                                                />
                                            </div>

                                            <div class="col-span-6 sm:col-span-4">
                                                <label for="Department" class="block text-sm font-medium text-gray-700">Department</label>
                                                <input
                                                    type="text" name="Department" id="Department" autocomplete="Department" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    v-model="inquiry.picDepartmentName"
                                                    :required="true"
                                                    :disabled="!$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                                                />
                                            </div>

                                            <div class="col-span-6 sm:col-span-4">
                                                <label for="email-address" class="block text-sm font-medium text-gray-700">PIC Email</label>
                                                <input
                                                    type="email" name="email-address" id="email-address" autocomplete="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    v-model="inquiry.picEmail"
                                                    :required="true"
                                                    :disabled="!$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                                                />
                                            </div>

                                            <div class="col-span-6 sm:col-span-4">
                                                <label for="pic-phone-number" class="block text-sm font-medium text-gray-700">PIC Phone Number</label>
                                                <div class="flex gap-2">
                                                    <input
                                                        type="text" name="pic-phone-number" id="pic-phone-number" autocomplete="pic-phone-number"
                                                        class="mt-1 w-20 rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm"
                                                        :disabled="true"
                                                        value=" +63"
                                                    />
                                                    <input
                                                        type="tel" name="pic-phone-number" id="pic-phone-number" autocomplete="pic-phone-number"
                                                        class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        v-model="inquiry.picPhoneNumber"
                                                        :disabled="!$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                                                        :required="true"
                                                    />
                                                </div>
                                            </div>

                                            <div class="col-span-6">
                                                <label for="inquiryContent" class="block text-sm font-medium text-gray-700"> Inquiry </label>
                                                <textarea
                                                    name="inquiryContent" id="inquiryContent" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    v-model="inquiry.inquiryRequestContent"
                                                    :disabled="!$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                                                />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full h-px bg-gray-200"></div>
                <div
                    class="px-4 py-6 flex justify-end"
                    v-if="$appUtil.checkPermission('ACTIVATE_PROCESS_EDIT')"
                >
                    <ElementsButton
                        text="Cancel"
                        :width28="true"
                        :height12="true"
                        :background-white="true"
                        @click-event="hidePopup"
                    />
                    <ElementsButton
                        inputtype="submit"
                        class="ml-2"
                        :text="'Save'"
                        :width28="true"
                        :height12="true"
                    />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import ElementsDate from '@/components/elements/ElementsDate.vue'
import moment from 'moment';

export default {
    components: {
        ElementsDate
    },
    props : {
        inquiryData : Object,
        modelValue : Boolean,
    },
    emit : [ "update", "update:modelValue"],
    methods : {
        saveThisPopup(){
            const self = this;
            const { picPhoneNumber } = self.inquiry;

            if(picPhoneNumber && picPhoneNumber.length < 7){
                alert("Please enter a valid phone number. The number should have more than 6 digits.");
                return;
            }

            // if( ! self.validatePhoneNumber() ){
            //     alert("Please enter a valid phone number. The number should start with either 09 or 08 and have more than 11 digits.");
            //     return;
            // }

            const updateData = {
                ...self.inquiry,
                picPhoneNumber : self.inquiry.picPhoneNumber.replace(/\D/g, '')
            }

            const url = self.$api("uri", "put-join-inquiry");
            self.$axios.put( url , updateData )
                .then( () => {
                    alert(" success update ");
                    self.$emit('update');
                })
                .catch( alert )
        },
        validatePhoneNumber() {
            const self = this;
            let { picPhoneNumber } = self.inquiry;
            if( ! picPhoneNumber ) return true;

            picPhoneNumber = picPhoneNumber.replace(/\D/g, '');
            const regex = /^(09|08)\d{9,}$/;
            console.log( picPhoneNumber );
            return regex.test( picPhoneNumber );
        },
        dateFormatter( dateStr ){
            if( ! dateStr ){
                return null;
            }
            return moment( dateStr ).format("yyyy-MM-DD HH:mm:ss");
        },
        stringToDate( dateStr ){
            if( ! dateStr ){
                return new Date();
            }
            return new Date( dateStr )
        },
        hidePopup() {
            const self = this;
            self.$emit('update:modelValue', false)
        },
    },
    watch : {
        modelValue( isOpen ){
            const self = this;
            if( !isOpen ){
                return;
            }

            self.inquiry = { ...self.inquiryData };
        },
    },
    data(){
        return {
            inquiry : {

            },
        }
    }

}
</script>
