<template>
    <div>
        <div class="mt-10 sm:mt-0 relative" >
            <div class="md:grid md:grid-cols-1 md:gap-6">
                <div class="mt-5 md:col-span-1 md:mt-0">
                    <form method="POST" action="submit" @submit.prevent="saveThisPopup">
                        <div class="overflow-hidden shadow sm:rounded-md">
                            <div class="bg-white px-4 py-5 sm:p-6">
                                <div class="grid grid-cols-6 gap-6">

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="company-name" class="block text-sm font-medium text-gray-700">Consultation Employee</label>
                                        <input
                                            type="text" name="consultaion-emp" id="consultaion-emp" autocomplete="consultaion-emp" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            v-model="inquiry.consultantEmpName"
                                            :required="true"
                                        />
                                    </div>

                                    <div class="col-span-6 border-b border-b-slate-300">
                                        <label class="block text-sm font-medium text-gray-700">Consultaion date</label>
                                        <ElementsDate
                                            v-model="inquiry.consultationDatetime"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="company-name" class="block text-sm font-medium text-gray-700">Comapny Name</label>
                                        <input
                                            type="text" name="company-name" id="company-name" autocomplete="company-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            v-model="inquiry.inquiryCompanyName"
                                            :required="true"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="num-of-emp" class="block text-sm font-medium text-gray-700">Number of Employees</label>
                                        <input
                                            type="number" name="num-of-emp" id="num-of-emp" autocomplete="num-of-emp" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            v-model="inquiry.employmentCount"
                                            :required="true"
                                            :min="0"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="pic-name" class="block text-sm font-medium text-gray-700">PIC Name</label>
                                        <input
                                            type="text" name="pic-name" id="pic-name" autocomplete="pic-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            v-model="inquiry.picName"
                                            :required="true"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="Department" class="block text-sm font-medium text-gray-700">Department</label>
                                        <input
                                            type="text" name="Department" id="Department" autocomplete="Department" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            v-model="inquiry.picDepartmentName"
                                            :required="true"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="email-address" class="block text-sm font-medium text-gray-700">PIC email</label>
                                        <input
                                            type="email" name="email-address" id="email-address" autocomplete="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            v-model="inquiry.picEmail"
                                            :required="true"
                                        />
                                    </div>

                                    <div class="col-span-6 sm:col-span-4">
                                        <label for="pic-phone-number" class="block text-sm font-medium text-gray-700">PIC Phone number</label>
                                        <div class="flex gap-2">
                                            <input
                                                type="text" name="pic-phone-number" id="pic-phone-number" autocomplete="pic-phone-number"
                                                class="mt-1 w-20 rounded-md bg-gray-100 border-gray-300 shadow-sm sm:text-sm"
                                                :disabled="true"
                                                value=" +63"
                                            />
                                            <input
                                                type="number" name="pic-phone-number" id="pic-phone-number" autocomplete="pic-phone-number"
                                                class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                v-model="inquiry.picPhoneNumber"
                                                :required="true"
                                            />
                                        </div>
                                    </div>

                                    <div class="col-span-6">
                                        <label for="inquiryContent" class="block text-sm font-medium text-gray-700"> Inquiry </label>
                                        <textarea
                                            name="inquiryContent" id="inquiryContent" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            v-model="inquiry.inquiryRequestContent"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div class="sticky bottom-0 left-0 right-0  bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                    inputtype="submit"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ElementsDate from '@/components/elements/ElementsDate.vue'
import moment from 'moment';

export default {
    components: { ElementsDate },
    props : {
        inquiryData : Object,
    },
    emit : [ "update"],
    methods : {
        saveThisPopup(){
            const self = this;

            const updateData = {
                ...self.inquiry,
            }

            const url = self.$api("uri", "put-join-inquiry");
            self.$axios.put( url , updateData )
                .then( () => {
                    alert(" success update ");
                    self.$emit('update');
                })
                .catch( alert )
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
        }
    },
    computed : {
        inquiry (){
            const self = this;
            const { consultationDatetime } = self.inquiryData
            return { ...self.inquiryData, consultationDatetime } ;
        }
    }
}
</script>

<style>

</style>