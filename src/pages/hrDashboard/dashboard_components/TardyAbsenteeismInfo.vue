<script>
import moment from "moment";
// import AppPopup from "@/components/AppPopup.vue"

export default {
    components:{
        // AppPopup,
    },
	props:{

	},
  	data(){
      return {
        // 시작일은 이번달 1일
        startDate: moment().startOf("seconds").format("YYYYMM"),
        // endDate는 현재 날짜 시간 초까지 반영
        endDate: moment(self.todayDate).endOf("seconds").format("YYYYMMDDhhmmss"),

        tardyAbsenteeismList: [],
        thisMonth : moment().format("MM"),
        }
  	},
    mounted() {
        const self = this;
        self.getTardyAbsenteeismList();
  	},
  methods: {
    getTardyAbsenteeismList() {
            const self = this;

            const url = self.$api("uri","get-dashboard-tardyAbsenteeism-list");
            const json_query = JSON.stringify({
                startDate: moment(self.startDate).format("YYYYMMDD"),
                endDate: self.endDate,
            });
            self.$axios.get(url, { params: {json_query} })
                .then((res) => {
                    self.tardyAbsenteeismList = res.data.data.list;
                })
                .catch((err) => {
                    console.error(err);
                });
    },
  	}
};
</script>
<template>
 <div>
    <div class="flex justify-between">
        <h1 class="pb-3 text-[20px] font-bold truncate">{{ thisMonth }}월 지각/ 결근</h1>
        <div class="items-center">
        </div>
    </div>
        <li class="border-gray-300 bg-white border-[1px] rounded-[10px] w-[516px] max-h-[200px] overflow-y-auto">
            <table class="w-full">
                <thead class="flex sticky top-0 z-10 bg-white font-medium overflow-hidden border-b border-gray-200">
                    <tr class="overflow-auto">
                        <th scope="col" class="px-3 py-3.5 pr-36 text-left text-sm font-semibold text-gray-900">Name / Department / Tier</th>
                        <th scope="col" class="px-3 py-3.5 pr-18 text-left text-sm font-semibold text-gray-900">지각</th>
                        <th scope="col" class="px-3 py-3.5 pr-18 text-left text-sm font-semibold text-gray-900">
                          결근
                        </th>
                    </tr>
                </thead>
                <tbody class="relative z-0 divide-y divide-gray-200 overflow-hidden" role="list">
                    <tr v-for="(TardyAbsenteeism, index) in tardyAbsenteeismList" v-bind:key="index"
                        class="relative flex items-center space-x-3 py-3 text-sm">
                        <td class="whitespace-nowrap px-3 text-sm text-gray-500">{{ TardyAbsenteeism.employeeName }}{{ TardyAbsenteeism.departmentName }}{{ TardyAbsenteeism.jobTitleName }}</td>
                        <td class="whitespace-nowrap text-sm text-gray-500">{{ TardyAbsenteeism.lateCheckInSum }}</td>
                        <td class="whitespace-nowrap text-sm text-gray-500">{{ TardyAbsenteeism.absentSum }}</td>
                    </tr>
                </tbody>
            </table>
        </li>
    </div>
</template>
