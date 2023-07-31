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
                                :disabled="!$appUtil.checkPermission('COMPANY_SETTING_EDIT')"
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
                                :disabled="!$appUtil.checkPermission('COMPANY_SETTING_EDIT')"
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
                                :disabled="!$appUtil.checkPermission('COMPANY_SETTING_EDIT')"
                                v-model="companySettingData.kpiUsageStatus"
                            />
                        </dd>
                    </div>
                    <div class="px-0 pt-9 pb-3 grid grid-cols-3 gap-4 ">
                        <ElementsButton
                            class="col-span-3 place-self-end"
                            :text="'Save'"
                            :width60="true"
                            v-if="$appUtil.checkPermission('COMPANY_SETTING_EDIT')"
                            @click="$emit('submit-usage-settings', companySettingData)"
                        />
                    </div>
                </dl>
            </div>
        </div>



<!-- // Suspended Setting ================================================================================== -->
        <div class="mt-5 px-6 py-3 w-[50vw] bg-white shadow-md shadow-gray-200">
            <div class="text-indigo-900 font-semibold text-xl pt-3"> Suspend Service </div>
            <template v-if="registerData.companySubscribeStatus === 'SUSPENDED'">
                <div class="pt-4 flex flex-col gap-24 justify-end">
                    <div>
                        <div>
                            <span class="text-sm font-semibold"> Status : </span>
                            <span class="text-sm font-semibold text-red-600"> Suspended </span>
                        </div>
                        <div>
                            <span class="text-sm font-semibold"> Date of Suspension : </span>
                            <span class="text-sm font-semibold"> {{ dateFormatChange( registerData.suspendedDate) }} </span>
                        </div>
                    </div>
                    <ElementsButton
                        class=" place-self-end pt-4"
                        :text="'Restore'"
                        :width60="true"
                        :backgroundRed="true"
                        @clickEvent="openPopup('Restore')"
                    />
                </div>
            </template>
            <template v-else-if="registerData.suspendedDate">
                <div class="pt-4 flex flex-col gap-24 justify-end">
                    <div v-if="registerData.suspendedDate"
                        class=" w-[347px] h-8 bg-zinc-100 rounded  border border-gray-300 flex justify-between px-2 items-center">
                        <div class="w-[213px] text-indigo-600 text-[12px] font-normal">Suspended Schedule : {{ dateFormatChange( registerData.suspendedDate) }}</div>
                    </div>
                    <ElementsButton
                        class=" place-self-end pt-4"
                        :text="'Change Schedule'"
                        :width60="true"
                        :backgroundRed="true"
                        @clickEvent="openPopup()"
                    />
                </div>
            </template>
            <template v-else-if=" ! registerData.suspendedDate ">
                <div class="flex flex-col gap-4 mt-4">
                    <p class="pt-2  font-semibold text-base "> Suspend Service </p>
                    <div class="flex items-center">
                        <input
                            name="notification-method" type="radio"
                            value="SUSPENDED"
                            v-model="companySettingData.companySubscribeStatus"
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label  class="ml-3 block text-sm font-medium leading-6 text-gray-900">
                            Suspend this company of HRnFLEX services
                        </label>
                    </div>
                    <p class="font-semibold text-base "> Suspension Delay </p>
                    <div class="flex items-center">
                        <input
                            value="ACTIVE"
                            name="notification-method" type="radio"
                            v-model="companySettingData.companySubscribeStatus"
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label  class="ml-3 block text-sm font-medium leading-6 text-gray-900">
                            Use
                        </label>
                    </div>
                    <ElementsDate
                        v-if="companySettingData.companySubscribeStatus==='ACTIVE'"
                        v-model="companySettingData.suspendedDate"
                        :lowerLimit="todayDate"
                    />
                    <ElementsButton
                        class="col-span-3 place-self-end pt-4"
                        :disabled="! companySettingData.companySubscribeStatus "
                        :text="'Suspend'"
                        :width60="true"
                        @clickEvent="setSuspendedNowOrDelay"
                    />
                </div>
            </template>
        </div>
        <Teleport to="body">
            <div v-if="suspendedPopup.isOpen" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
                <div
                    class="w-[500px] rounded-sm border border-zinc-200 bg-white"
                >
                    <div class="flex justify-between text-lg font-semibold">
                        <div class=" py-5 px-5 "> {{ suspendedPopup.title }}</div>
                        <div class="px-10 py-4 cursor-pointer text-2xl" @click="hidePopup"> X </div>
                    </div>
                    <div class="pt-10 px-6 pb-14 border-b border-t border-zinc-200 ">
                        <div class="text-neutral-600 text-sm font-bold mb-4"> Suspended Date </div>
                        <ElementsDate
                            v-model="companySettingData.suspendedDate"
                            :lowerLimit="todayDate"
                        />
                        <div
                            class="relative flex items-start"
                            v-if="registerData.companySubscribeStatus=='ACTIVE'"
                        >
                            <div class="flex h-6 items-center">
                                <input
                                    v-model="companySettingData.companySubscribeStatus"
                                    :true-value="'SUSPENDED'" :false-value="'ACTIVE'"
                                    aria-describedby="comments-description" type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div class="ml-3 text-sm leading-6">
                                <label class="font-medium text-gray-900"> Close Now </label>
                                <p class="text-gray-500 italic text-sm">
                                    The Suspension action will be performed immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2 justify-end px-5 py-5">
                        <ElementsButton
                            :text="'Cancel'"
                            :width32="true"
                            @clickEvent="hidePopup"
                            :backgroundWhite="true"
                        />
                        <ElementsButton
                            v-if="registerData.companySubscribeStatus === 'SUSPENDED'"
                            :text="'Restore'"
                            :width32="true"
                            :backgroundRed="true"
                            @click-event="setSuspendedDelay"
                        />
                        <ElementsButton
                            v-else-if="registerData.companySubscribeStatus === 'ACTIVE'"
                            :text="'Change'"
                            :width32="true"
                            :backgroundRed="true"
                            @click-event="setSuspendedNowOrChange"
                        />
                    </div>
                </div>
            </div>
        </Teleport>
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

            todayDate : moment().add(1, 'days').format('yyyy-MM-DD HH:mm:ss'),

            setSuspended : {
                suspendDelay : false,
                suspendedDate : null,
            },
            suspendedPopup : {
                isOpen : false,
                title : 'Change Schedule',
            },
        }
    },
    methods : {
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
        setSuspendedNowOrDelay(){
            const self = this;
            const { companySubscribeStatus } = self.companySettingData

            if( ! confirm( 'Are you sure to suspend?') ) {
                return;
            }

            companySubscribeStatus === 'SUSPENDED' ? self.setSuspendedNow() : self.setSuspendedDelay();

            return;
        },
        setSuspendedNowOrChange(){
            const self = this;
            const { companySubscribeStatus } = self.companySettingData
            if(  companySubscribeStatus == 'SUSPENDED' ){
                if ( confirm( 'Are you sure to suspend?') ){
                    self.setSuspendedNow();
                }
                return;
            }

            self.setSuspendedDelay();
        },
        setSuspendedDelay(){
            const self = this;
            const { suspendedDate } = self.companySettingData
            if( ! suspendedDate ){
                alert("Suspended date should be required.");
                return;
            }
            const submitData = { companySubscribeStatus : 'ACTIVE', suspendedDate }
            self.$emit("submit-suspended-settings", submitData );
            self.hidePopup();
        },
        setSuspendedNow(){
            const self = this;
            const submitData = { companySubscribeStatus : 'SUSPENDED' };
            self.$emit("submit-suspended-settings", submitData );
            self.hidePopup();
        },
        hidePopup(){
            const self = this;
            self.suspendedPopup.isOpen = false;
        },
        openPopup( title = 'Change Schedule' ){
            const self = this;
            self.suspendedPopup.isOpen = true;
            self.suspendedPopup.title = title;
            self.companySettingData.suspendedDate = null;
            self.companySettingData.companySubscribeStatus = null;
        }
    },
    mounted(){
        const self = this;
        const { filingUsageStatus, kpiUsageStatus, payrollUsageStatus } = self.registerData;
        self.companySettingData = { filingUsageStatus, kpiUsageStatus, payrollUsageStatus, companySubscribeStatus : null , suspendedDate : null };
    }
}

</script>