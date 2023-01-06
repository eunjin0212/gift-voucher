<script>
import moment from 'moment';
import { ValidateUtil } from "@/plugins/app-util.js";

export default {
    components:{
    },
	props:{
	},
  	data(){
    	return{
			leaveUsageHistories : {}, 
			selectedYear : moment().year(),
      selectedDepartment : "",
			employeeNameForSearch : "",
      }
  	},
  	mounted(){
      const self = this;
	  	self.getLeaveEmployeeListData();
  	},
  	methods:{
      over15CharFromFullName : ValidateUtil.over15CharFromFullName,
      getLeaveEmployeeListData(){
			const self = this;
			const json_query = JSON.stringify({
				// departmentSeq : self.selectedDepartment,
				// employeeName : self.employeeNameForSearch,
				startDate : `${ parseInt(self.selectedYear) }0101`,
				endDate : `${ parseInt(self.selectedYear)+1 }0101`
			})
			const url = self.$api("uri", "get-leave-history-usage-department");
			self.$axios.get( url, { params : {json_query} } )
				.then( res => {
					self.leaveUsageHistories = res.data.data.list;
					// console.log(res.data.data.list);
				})
				.catch( err => {
					console.log( err );
				})

		},
  	}
};
</script>

<template>
  <div>
    <div class="flex justify-between">
        <h1 class="pb-3 text-[20px] font-bold truncate">휴가 남은 내역</h1>
        <div class="items-center">
        </div>
    </div>
        <li class="border-gray-300 bg-white border-[1px] rounded-[10px] w-[516px] max-h-[200px] overflow-y-auto">
            <table class="w-full">
                <thead class="flex sticky top-0 z-10 bg-white font-medium overflow-hidden border-b border-gray-200">
                    <tr class="overflow-auto">
                        <th scope="col" class="px-3 py-3.5 pr-36 text-left text-sm font-semibold text-gray-900">Name / Department / Tier</th>
                        <th scope="col" class="px-3 py-3.5 pr-26 text-left text-sm font-semibold text-gray-900">
                          휴가내역
                        </th>
                    </tr>
                </thead>
                <tbody class="relative z-0 divide-y divide-gray-200 overflow-hidden" role="list">
                    <tr v-for="(history, index) in leaveUsageHistories" v-bind:key="index"
                        class="relative flex items-center space-x-3 py-3 text-sm">
                        <td class="whitespace-nowrap px-3 text-sm text-gray-500">{{ history[0].employeeName }}{{ history[0].departmentName }}{{ history[0].jobTitleName }}</td>
                            <template v-for="( leave, index ) in history" :key="index"> 
                              <div class="whitespace-nowrap text-sm text-gray-500" > {{ leave.leavePolicyName }} : {{ leave.currentDay}} </div>
                            </template>
                    </tr>
                </tbody>
            </table>
        </li>
  </div>
</template>