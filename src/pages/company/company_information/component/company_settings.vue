<template>

    <div>
        <div class="flex flex-col mt-5 px-6 py-3 w-[50vw] bg-white shadow-md shadow-gray-200">
            <div class="mt-4 text-indigo-900 font-semibold text-xl"> Menu Settings</div>
            <div class="mt-4 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                    <div class="px-0 py-3 grid grid-cols-3 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900 col-span-1">
                            Attendance / Leave / FlexBen
                        </dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 col-span-2 place-self-end font-semibold">
                            Default
                        </dd>
                    </div>
                    <div class="px-0 py-3 grid grid-cols-3 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900 col-span-1">
                            Filing
                        </dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 col-span-2 place-self-end font-semibold">
                            <ElementsToggle
                                :trueValue="'ACTIVE'"
                                :falseValue="'DEACTIVATED'"
                                v-model="companySettingData.filingUsageStatus"
                            />
                        </dd>
                    </div>
                    <div class="px-0 py-3 grid grid-cols-3 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900 col-span-1">
                            Payroll
                        </dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 col-span-2 place-self-end font-semibold">
                            <ElementsToggle
                                :trueValue="'ACTIVE'"
                                :falseValue="'DEACTIVATED'"
                                v-model="companySettingData.payrollUsageStatus"
                            />
                        </dd>
                    </div>
                    <div class="px-0 py-3 grid grid-cols-3 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900 col-span-1">
                            KPI
                        </dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 col-span-2 place-self-end font-semibold">
                            <ElementsToggle
                                :trueValue="'ACTIVE'"
                                :falseValue="'DEACTIVATED'"
                                v-model="companySettingData.kpiUsageStatus"
                            />
                        </dd>
                    </div>
                    <div class="px-0 pt-9 pb-3 grid grid-cols-3 gap-4 ">
                        <ElementsButton
                            class="col-span-3 place-self-end"
                            :text="'Save'"
                            :width60="true"
                            @click="$emit('submit-usage-settings', companySettingData)"
                        />
                    </div>
                </dl>
            </div>
        </div>

        <div class="flex flex-col gap-4 mt-5 px-6 py-3 w-[50vw] bg-white shadow-md shadow-gray-200">
            <div class="flex justify-between items-baseline">
                <div class="text-indigo-900 font-semibold text-xl pt-3"> Accounts Settings</div>
                <ElementsToggle
                    :trueValue="'ACTIVE'"
                    :falseValue="'SUSPENDED'"
                    v-model="companySettingData.companySubscribeStatus"
                />
            </div>
            <div class="w-[567px] text-neutral-700 text-[12px] font-normal">If turn off, you can not use all of HRnFLEX service.
                <br/>If you want to deactivate your account on a specific date, please reserve a Suspended date.
            </div>
            <div v-if="registerData.suspendedDate" class="w-[347px] h-8 bg-zinc-100 rounded  border border-gray-300 flex justify-between px-2 items-center">
                <div class="w-[213px] text-indigo-600 text-[12px] font-normal">Suspended Schedule : {{ dateFormatChange( registerData.suspendedDate) }}</div>
            </div>
            <template v-if="registerData.companySubscribeStatus === 'SUSPENDED'">
                <p class="text-red-700 text-xs mt-[-10px]"> * Already Suspended </p>
            </template>
            <template v-if="companySettingData.companySubscribeStatus === 'ACTIVE'">
                <ElementsSelect
                    :options="companyStatusReservOptions"
                    v-model="reserveStatus"
                />
                <ElementsDate
                    class="mt-[-10px]"
                    v-model="companySettingData.suspendedDate"
                    :lowerLimit="todayDate"
                />
            </template>
            <ElementsButton
                class="col-span-3 place-self-end pt-4"
                :text="'Save'"
                :width60="true"
                @clickEvent="clickAccountSettingSave"
            />
        </div>

    </div>
</template>

<script>
import moment from 'moment'

export default{
    props : {
        registerData : {
            type : Object,
            default : () => {},
        },
    },
    emits : ["submit-usage-settings", "submit-suspended-settings"],
    data(){
        return {
            companySettingData : {},
            companyStatusReservOptions : [
                { text : "Suspended" , value : "SUSPENDED"},
            ],
            reserveStatus : "SUSPENDED",
            todayDate : moment().add(1, 'days').format('yyyy-MM-DD HH:mm:ss'),
        }
    },
    methods : {
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
        clickAccountSettingSave(){
            const self = this;
            let submitDate = {};

            const { companySubscribeStatus, suspendedDate } = self.companySettingData
            if(  companySubscribeStatus == 'ACTIVE' && ! suspendedDate ){
                alert("Suspended date should be required.");
                return;
            }

            if( companySubscribeStatus == 'SUSPENDED' ){
                submitDate = { companySubscribeStatus }
            }else if( companySubscribeStatus == 'ACTIVE'  ){
                submitDate = {
                    companySubscribeStatus,
                    suspendedDate
                }
            }

            self.$emit("submit-suspended-settings", submitDate );
        }
    },
    mounted(){
        const self = this;
        const { filingUsageStatus, kpiUsageStatus, payrollUsageStatus, companySubscribeStatus,} = self.registerData;
        self.companySettingData = { filingUsageStatus, kpiUsageStatus, payrollUsageStatus, companySubscribeStatus, suspendedDate : null };
    }
}

</script>