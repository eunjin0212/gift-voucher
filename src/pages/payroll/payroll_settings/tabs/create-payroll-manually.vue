<template>
    <div v-show="visible">
        <div class="flex justify-between py-1">
            <div class="flex justify-start gap-5">
                <h1 class="text-zinc-800 text-xl font-semibold leading-10 items-center ">
                    Create Payroll Manually
                </h1>
            </div>
        </div>

        <div class="flex border border-solid rounded-lg w-[75%] h-28 mt-0" style="border-color: #9F9CEE; background-color: #F8F8FD;">
            <img
            class="h-5 w-5 mx-2.5 mt-4"
            :src="require(`@/assets/img/payroll-info.svg`)"
            alt="app-side-8"
            />
            <p class="text-left pt-4 font-medium">
                You should use this function only if the company payroll is not automatically created.<br />
                1) Target Company : Select a company.<br />
                2) Target Date : If the cut off is 12/11 - 12/25, you must select 12/26. If the cut off is 12/26 - 1/10, you must select 1/11.
            </p>
        </div>

        <div v-if="$appUtil.checkPermission('PAYROLL_EDIT')" class="mt-4">
            <div class="h-full flex flex-col max-w-[540px]">
                <dl class="mx-5">
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                        <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1">Target Company</dt>
                        <dd class="col-span-2 mt-0">
                            <ElementsSelect
                                v-model="targetCompany"
                                :options="companyList"
                                :placeholder="'Select Company'"
                            />
                        </dd>
                    </div>
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                        <dt class="text-sm font-semibold leading-6 text-gray-900 col-span-1">Target Date</dt>
                        <dd class="col-span-2 mt-0">
                            <ElementsDate
                                v-model="targetDate"
                                :isNotBgWhite="true"
                                :placeholder="'mm/dd/yyyy'"
                            />
                        </dd>
                    </div>
                    <div class="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center">
                        <dt class="text-sm font-semibold leading-6 text-gray-900"></dt>
                        <dd class="col-span-3 mt-0">
                            <ElementsButton
                                text="Create Payroll"
                                @clickEvent="createPayroll"
                            />
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
    components : {
    },
    props : {
        visible : Boolean,
        tabName : String
    },
    data(){
        return{
            companyList : [],
            targetCompany : null,
            targetDate : null
        }
    },
    methods : {
        getCompanyList() {
            const self = this;
            const url = self.$api("uri", "get-all-company-list");
            self.$axios.get(url)
            .then(res => {
                self.companyList = res.data.data.companyList;
            })
            .catch( err => {
                console.slog(err);
            });
        },
        createPayroll() {
            const self = this;
            if (self.targetCompany == null) {
                alert("Please choose a company.");
                return;
            }

            if (self.targetDate == null) {
                alert("Please choose a date");
                return;
            }

            const parameter = {
                targetCompany : self.targetCompany,
                targetDate : moment(self.targetDate).format("yyyyMMDD")
            };
            const url = self.$api("uri", "post-target-payroll");
            self.$axios.post(url, parameter)
            .then(res => {
                alert(res.data.message);
            })
            .catch( err => {
                let { code, message } = err.response.data;
                alert(message);
                console.log(err.response);
            });
        }
    },
    watch: {
        tabName: function(newValue) {
            const self = this;
            // console.log(newValue);
            if ("CREATE_PAYROLL_MANUALLY" === newValue) {
                self.getCompanyList();
            }
        }
    },
    mounted() {
    }
}
</script>