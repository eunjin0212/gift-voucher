<template>
    <div class="p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
        <div class="my-2 flex flex-col gap-4" >
            <div class="text-2xl font-bold"> Service Usage Information </div>
            <ElementsDate
                :name="'Start Date'"
                v-model="registerData.subscribeStartDate"
            />
            <div class="text-base font-semibold"> FlexBen Type </div>
            <ElementsSelect
                :full="true"
                :options="flexbenTypeOptions"
                v-model="registerData.flexbenCampaignSeq"
            />
            <div class="text-base font-semibold mt-3"> Menu Settings </div>

            <div class="mx-2">
                <div class="flex justify-between border-b-[1px] border-gray-200 pb-4">
                    <div class="text-gray-800"> Attendance / Leave / FlexBen </div>
                    <div> Default Provision </div>
                </div>

                <div class="flex justify-between border-b-[1px] border-gray-200 py-4">
                    <div class="text-gray-800"> Filing </div>
                    <div
                        :class="[ registerData.filingUsageYn == 'N' ? 'bg-gray-200' : 'bg-indigo-600', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                        <input
                            v-model=" registerData.filingUsageYn"
                            true-value="Y"
                            false-value="N"
                            type="checkbox" class="cursor-pointer opacity-0 absolute w-full h-full peer appearance-none rounded-md"
                        />
                        <span :class="[ registerData.filingUsageYn == 'N' ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
                            <span :class="[ registerData.filingUsageYn == 'N' ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                </svg>
                            </span>
                            <span :class="[ registerData.filingUsageYn == 'N' ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                    <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </span>
                    </div>
                </div>

                <div class="flex justify-between border-b-[1px] border-gray-200 py-4">
                    <div class="text-gray-800"> Payroll </div>
                    <div
                        :class="[ registerData.payrollUsageYn == 'N' ? 'bg-gray-200' : 'bg-indigo-600', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                        <input
                            v-model="registerData.payrollUsageYn"
                            true-value="Y"
                            false-value="N"
                            type="checkbox" class="cursor-pointer opacity-0 absolute w-full h-full peer appearance-none rounded-md"
                        />
                        <span :class="[registerData.payrollUsageYn == 'N' ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
                            <span :class="[registerData.payrollUsageYn == 'N' ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12"> -->
                                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                </svg>
                            </span>
                            <span :class="[registerData.payrollUsageYn == 'N' ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                    <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </span>
                    </div>
                </div>

                <div class="flex justify-between border-b-[1px] border-gray-200 py-4">
                    <div class="text-gray-800"> KPI </div>
                    <div
                        :class="[ registerData.kpiUsageYn == 'N' ? 'bg-gray-200' : 'bg-indigo-600', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                        <input
                            v-model="registerData.kpiUsageYn"
                            true-value="Y"
                            false-value="N"
                            type="checkbox" class="cursor-pointer opacity-0 absolute w-full h-full peer appearance-none rounded-md"
                        />
                        <span :class="[registerData.kpiUsageYn == 'N' ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
                            <span :class="[registerData.kpiUsageYn == 'N' ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                </svg>
                            </span>
                            <span :class="[registerData.kpiUsageYn == 'N' ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                    <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div class="mt-10 flex gap-2 justify-end">
                <ElementsButton
                    :width32="true"
                    :backgroundWhite="true"
                    text="Cancel"
                    @clickEvent="$emit('back-to-list')"
                />
                <ElementsButton
                    :width32="true"
                    :backgroundRed="true"
                    text="Back"
                    @clickEvent="clickBack"
                />
                <ElementsButton
                    :width32="true"
                    text="Submit"
                    @clickEvent="clickSubmit"
                />
            </div>
        </div>
    </div>
</template>

<script>

export default{
    emits : [ "back-step", "submit-register", "back-to-list"],
    props : {

    },
    data(){
        return{
            registerData : {
                subscribeStartDate : "",
                flexbenCampaignSeq: "",
                filingUsageYn : "Y",
                payrollUsageYn : "Y",
                kpiUsageYn : "Y"
            },
            flexbenTypeOptions : [],
        }
    },
    methods : {
        clickBack(){
            const self = this;
            self.$emit("back-step");
        },
        clickSubmit(){
            const self = this;

            if( ! self.registerData.subscribeStartDate ){
                alert("Start Date must be selected.");
                return;
            }

            self.$emit("submit-register", self.registerData );
        },
        getFlexbenType(){
            const self = this;
            const url = self.$api("uri", "get-flexben-campaign-List");
            self.$axios.get( url )
                .then( res => {
                    self.flexbenTypeOptions= res.data.data.list.map((
                        { flexbenTypeName, bizCampaignId,
                        flexbenCampaignSeq, flexbenCampaignTitle}) =>({
                            text : `${flexbenTypeName} : ${flexbenCampaignTitle}`,
                            value : flexbenCampaignSeq,
                            bizCampaignId
                        })
                    );
                })
        },
    },
    mounted(){
        const self = this;
        self.getFlexbenType();
    }
}
</script>