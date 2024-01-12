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
                    <div class="text-gray-800"> Attendance / Leave / FlexBen / Filing </div>
                    <div> Default Provision </div>
                </div>

                <div class="flex justify-between border-b-[1px] border-gray-200 py-4">
                    <div class="text-gray-800"> Payroll </div>
                    <ElementsToggle
                        :trueValue="'ACTIVE'"
                        :falseValue="'DEACTIVATED'"
                        v-model="registerData.payrollUsageStatus"
                    />
                </div>

                <div class="flex justify-between border-b-[1px] border-gray-200 py-4">
                    <div class="text-gray-800"> KPI </div>
                    <ElementsToggle
                        :trueValue="'ACTIVE'"
                        :falseValue="'DEACTIVATED'"
                        v-model="registerData.kpiUsageStatus"
                    />
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
                filingUsageStatus : "ACTIVE",
                payrollUsageStatus : "ACTIVE",
                kpiUsageStatus : "ACTIVE"
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

            if ( ! self.registerData.flexbenCampaignSeq){
                alert( "FlexBen Type must be selected");
                return;
            }

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