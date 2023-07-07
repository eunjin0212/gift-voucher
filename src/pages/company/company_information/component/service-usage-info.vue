<template>
    <div id="service-usage-info" class="mt-6  max-w-7xl">
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="sm:divide-y sm:divide-gray-200">
                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Start Date</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 justify-self-end">
                            {{ dateFormatChange(registerData.subscribeStartDate) }}
                        </dd>
                    </div>
                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Suspended Date</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 justify-self-end">
                            {{ dateFormatChange(registerData.subscribeEndDate) || 'No Suspended Date' }}
                        </dd>
                    </div>
                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Usage employees</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 justify-self-end">
                            {{ registerData.employeeCount }}
                        </dd>
                    </div>
                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">FlexBen Type</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 justify-self-end">
                            {{ registerData.flexbenTypeName }}
                        </dd>
                    </div>
                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Status</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 justify-self-end">
                            {{ getCompanyStatusDisplayOption(registerData.companySubscribeStatus, registerData.billingStatus )}}
                        </dd>
                    </div>
                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Master Admin </dt>
                        <dd
                            class="mt-1 text-sm  sm:col-span-2 sm:mt-0 justify-self-end text-blue-600 cursor-pointer"
                            @click="$emit('show-admin')"
                        >
                            List
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
        <div v-if="$appUtil.checkPermissionArray(['FLEXBEN_SETTING_VIEW', 'FLEXBEN_EXECUTE_EDIT'])">
            <div class="mt-7">
                <div class="flex justify-between">
                    <div class="pl-5 text-zinc-900 text-lg font-semibold"> Top up History </div>
                    <ElementsButton
                        :text="'+ Top-up'"
                        :width32="true"
                        v-if="$appUtil.checkPermission('FLEXBEN_EXECUTE_EDIT')"
                        @clickEvent="$emit('register-top-up')"
                    />
                </div>
                <ReportTopup :flexbenHistory="flexbenHistory" />
            </div>
        </div>

    </div>
</template>

<script>
import ReportTopup from "@/pages/flexben/topup_deduct/component_topup/report_topup.vue";
import moment from 'moment';

export default {
    components : {
        ReportTopup
    },
    emits : [ "register-top-up", 'show-admin'],
    props : {
        flexbenHistory : {
            type : Object,
            default : ()=>{}
        },
        registerData : {
            default : () => {}
        }
    },
    methods : {
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
        getCompanyStatusDisplayOption( subscribeStatus, billingStatus ){
            if( subscribeStatus == 'SUSPENDED'){
                return 'Suspended';
            }
            if( billingStatus == 'TRIAL' ){
                return 'Testing';
            }
            return 'Active';
        }
    }
}
</script>