<template>
    <div
        v-show="modelValue"
        class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
    >
        <div class="border rounded-lg shadow shadow-gray-100 bg-white">
            <div class="px-7 py-6 flex justify-between items-center">
                <h2 class="text-xl font-bold"> Preview Top up </h2>
                <a
                    href="javascript:void(0)"
                    class="ml-20"
                    @click="$emit('update:modelValue', false)"
                >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                </a>
            </div>
            <!-- <div class="w-full h-px bg-gray-200"></div> -->
            <div class="h-[70vh] w-[40vw] overflow-y-auto border-t border-gray-200">
                <dl class="">
                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Company</dt>
                        <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                            {{ confirmData.companyName }}
                        </dd>
                    </div>
                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Admin</dt>
                        <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                            {{ adminData.name }} / {{ adminData.id }}
                        </dd>
                    </div>
                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Point Type</dt>
                        <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">Add</dd>
                    </div>
                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Extension Period</dt>
                        <dd
                            v-if="confirmData.extendedPeriod =='NONE'"
                            class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0"
                        > None </dd>
                        <dd
                            v-else
                            class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0"
                        > {{ confirmData.extendedPeriod }} month </dd>
                    </div>
                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Existing Use Date </dt>
                        <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                            {{ dateFormatter(subscribeStartDate) }} ~
                            {{ dateFormatter(subscribeEndDate) }}
                        </dd>
                    </div>
                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Extended Use Date </dt>
                        <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                            {{ dateFormatter(confirmData.extendedStartDate) }} ~
                            {{ dateFormatter(confirmData.extendedEndDate) }}
                        </dd>
                    </div>
                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Num of <br/>Usage Employees</dt>
                        <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                            {{  confirmData.numOfEmpCnt }}
                        </dd>
                    </div>
                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Points</dt>
                        <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                            {{ formatNumberWithComma(confirmData.mileageVolume)}}</dd>
                    </div>

                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">PIC Name</dt>
                        <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                            {{ confirmData.picName }}
                        </dd>
                    </div>
                    <div v-if="fileData.poDocumentFile">
                        <div class="px-6 py-3 sm:grid grid-cols-3 ">
                            <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">PO softcopy</dt>
                            <dd class="mt-1 text-sm font-semibold leading-6 text-sky-400 col-span-2 sm:mt-0">
                                {{ fileData.poDocumentFileName }}
                            </dd>
                        </div>
                        <div class="px-6 py-3 sm:grid grid-cols-3 ">
                            <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">PO Document No</dt>
                            <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                                {{ confirmData.poDocNo }}
                            </dd>
                        </div>
                    </div>
                    <div v-if="fileData.invoiceFile">
                        <div class="px-6 py-3 sm:grid grid-cols-3 ">
                            <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Invoice softcopy</dt>
                            <dd class="mt-1 text-sm font-semibold leading-6 text-sky-400 col-span-2 sm:mt-0">
                                {{ fileData.invoiceFileName }}
                            </dd>
                        </div>
                        <div class="px-6 py-3 sm:grid grid-cols-3 ">
                            <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Invoice Document No</dt>
                            <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                                {{ confirmData.invoiceDocNo }}
                            </dd>
                        </div>
                    </div>
                    <div v-if="fileData.orDocumentFile">
                        <div class="px-6 py-3 sm:grid grid-cols-3 ">
                            <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">OR softcopy</dt>
                            <dd class="mt-1 text-sm font-semibold leading-6 text-sky-400 col-span-2 sm:mt-0">
                                {{ fileData.orDocumentFileName }}
                            </dd>
                        </div>
                        <div class="px-6 py-3 sm:grid grid-cols-3 ">
                            <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">OR Document No</dt>
                            <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                                {{ confirmData.orDocNo }}
                            </dd>
                        </div>
                    </div>
                    <div class="px-6 py-3 sm:grid grid-cols-3 ">
                        <dt class="text-sm col-span-1 font-medium leading-6 text-gray-400">Status</dt>
                        <dd class="mt-1 text-sm font-semibold leading-6 text-gray-700 col-span-2 sm:mt-0">
                            {{  contractStatusObj[confirmData.topUpContractStatus] }}
                        </dd>
                    </div>
                </dl>
                <div class="flex gap-2 justify-end border-t border-gray-200 py-4 px-6">
                    <ElementsButton
                        text="Cancel"
                        :width28="true"
                        :height12="true"
                        :background-white="true"
                        @clickEvent="$emit('update:modelValue', false)"
                    />
                    <ElementsButton
                        :backgroundWhite="false"
                        :text="'Submit'"
                        :width28="true"
                        :height12="true"
                        @clickEvent="afterClickSubmit"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default{
    data(){
        return{
            contractStatusObj : {
                REQUESTED : "Requested",
                PO_RECEIVED : "PO received",
                INVOICE_SENT : "Invoice sent",
                RECEIPT_ISSUED : "Receipt issued",
            }
        }
    },
    props : {
        modelValue : Boolean,
        confirmData : Object,
        fileData : Object,
        adminData : Object,
        subscribeEndDate : String,
        subscribeStartDate : String,
    },
    emits : [ "update:modelValue", "submit"],
    methods : {
        afterClickSubmit(){
            const self = this;
            self.$emit("submit");
        },
        dateFormatter ( dateStr, formatStr = "MM/DD/yyyy" ){
            if( ! dateStr ){
                return null;
            }
            return moment( dateStr ).format( formatStr );
        },
        formatNumberWithComma( number ){
            if( ! number ) return 0;
            const local = 'en-US';
            const formattedNumber = number.toLocaleString(local);
            return formattedNumber;
        }
    }
}

</script>