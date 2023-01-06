<script>
import moment from "moment";
import ElementsSelectRef from "@/components/elements/ElementsSelectRef.vue"
import ElementsDate from "@/components/elements/ElementsDate.vue";
import { ValidateUtil } from "@/plugins/app-util.js";
import { contractType } from "@/assets/data/optionData.js"

export default {
    components:{
      ElementsSelectRef,
      ElementsDate,
    },
	props:{
	},
  	data(){
      return {
        employeeSeq: "",

        incompleteSetUpEmployeeList : [],
        inviteTotalList: [],
        probationaryEmployeeList: [],

        workPlaceOptions: [],
        departmentOptions: [],
        jobTitleOptions: [],
        workScheduleOptions : [], 
        contractTypeOptions: contractType,

        inviteTotalCount : "",
        incompleteSetUpEmployeeCount : "",

        showInviteList: false,
        showIncompleteSetUpEmployeeList: false,
        showProbationaryEmployeeList: false,

        beforeEditData : {},
        request: {
                workPlaceSeq : null,
                departmentSeq : null,
                jobTitleSeq : null,
                joinDate : null,
                employmentType: null,
                workScheduleSeq : null,
            },
        }
  	},
  mounted() {
         const self = this;

         self.getInitData();
         
            const url = self.$api("uri", "get-dashboard-un-joined-employee-list");
            self.$axios.get(url).then((res) => {
              self.inviteTotalCount = res.data.data.total;
              self.inviteTotalList = res.data.data.list;
            });

          self.getIncompleteSetUpEmployeeList();
          self.getProbationaryEmployeeList();
  	},
  	methods:{
        getInitData(){
            const self = this;
            self.getWorkPlaceOptions();
            self.getDepartmentOptions();
            self.getJobTitleOptions();
            self.getWorkScheduleOptions();
        },
        getWorkScheduleOptions(){
            const self = this;
            const url = self.$api("uri", "get-workSchedule");
            self.$axios.get(url).then((res) => {
                self.workScheduleOptions = res.data.data.list.map(item => ({ 
                    text : item.workScheduleName, 
                    value : item.workScheduleSeq
                    }));
            });
        },
        getWorkPlaceOptions(){
            const self = this;
            const url = self.$api("uri", "get-work-place");
            self.$axios
            .get(url)
            .then((res) => {
              self.workPlaceOptions = res.data.data.list;
              return self.workPlaceOptions;
            })
            .then( workPlaceList => {
                self.workPlaceOptions = workPlaceList
                .map( place => {
                    return { text : place.workPlaceName, value : place.workPlaceSeq }
                });
            })
            .catch((err) => {
              console.error(err);
            })
        },
        getJobTitleOptions(){
            const self = this;
            const json_query = JSON.stringify({
                            "limit" : -1,
                            "offset" : 0,
                        });
            const url = self.$api('uri', 'get-jobTitle')
            self.$axios.get(url, { params : { json_query } } ).then(res => {
                self.jobTitleOptions = res.data.data.list
                    .map( job => ( {
                        text : job.jobTitleName, 
                        value : job.jobTitleSeq
                    } ) );
            });

        },
        getDepartmentOptions(){
            const self = this;

            const url = self.$api('uri', 'get-department')
            const json_query = JSON.stringify({
                showRootNode: null
            });
            self.$axios.get(url, { params : { json_query }}).then(res => {
                self.departmentOptions = res.data.data.list.map( dep => ({ 
                    text : dep.departmentName,
                    value : dep.departmentSeq
                }))
            });
        },
        getIncompleteSetUpEmployeeList(){
            const self = this;

            const url = self.$api("uri", "get-dashboard-incomplete-set-up-list")
            self.$axios
                .get(url)
                .then((res) => {
                    self.request = { ...res.data.data };
                    console.log("?? request = ",self.request);

                    self.beforeEditData = JSON.parse(JSON.stringify(self.request));
                    console.log("beforeEditData = ",self.beforeEditData);

                    self.incompleteSetUpEmployeeList = res.data.data.list;
                    self.incompleteSetUpEmployeeCount = res.data.data.total;
                })
                .catch((err) => {
                    console.error('err : ',err);
                })
        },
        getProbationaryEmployeeList(){
            const self = this;

            const url = self.$api("uri", "get-dashboard-probationary-employee-list")
            self.$axios
                .get(url)
                .then((res) => {
                    self.probationaryEmployeeList = res.data.data.list;
                })
                .catch((err) => {
                    console.error('err : ',err);
                })
        },
        isValidCheck(){
            const self = this;
            let isValid = true; 

            if(ValidateUtil.checkIsEmpty(self.request.joinDate)){
                // self.requestError.joinDate = self.requestErrorMSG.joinDate;
                isValid = false;
            }

            return isValid;
        },
        saveIncompleteSetUpList() {
            const self = this;

            // if(!self.isValidCheck()){
            //     self.showNotiErr = true; 
            //     return;
            // }

            let { departmentSeq, workPlaceSeq, jobTitleSeq, joinDate, workScheduleSeq, employmentType } = self.request;
            const requestItem = { departmentSeq, workPlaceSeq, jobTitleSeq, joinDate, workScheduleSeq, employmentType }
            console.log(requestItem);

            const url = self.$api('uri', 'put-dashboard-incomplete-set-up-list');
            self.$axios.put(url, requestItem)
                .then(res => {
                    console.log("saveIncompleteSetUpList result - ",res.data);
                    // self.$emit('afterSave');
                    self.getIncompleteSetUpEmployeeList();
                })
                .catch( err => {
                    console.log(err.response);
                })

        },
        cancelEditIncompleteSetUpList() {
            const self = this;
            self.request = JSON.parse(JSON.stringify(self.beforeEditData));
            self.showIncompleteSetUpEmployeeList=false;
            // self.$nextTick( () => {
            //     self.nowEdit = false;
            // })
        },
        fmtTimezoneToMMddyyyy(timezone){
              // format : timeZone = 2022-09-13T07:04Z
              return moment(timezone,"YYYY-MM-DDTHH:mm:ssZ").format("MM/DD/YYYY");
          },
        countZeroCheck(count){
          if(count == 0) return true;
        },
        openInviteList(){
          const self = this;
          self.showInviteList = true;
        },
        openIncompleteSetUpEmployeelist(){
          const self = this;
          self.showIncompleteSetUpEmployeeList = true;
        },
        openProbationaryEmployeelist(){
          const self = this;
          self.showProbationaryEmployeeList = true;
        },
  	}
};
</script>
<template>
    <div>
    <div class="flex justify-between">
        <h1 class="pb-3 text-[20px] font-bold truncate">관리가 필요한 직원</h1>
        <div class="items-center">
        </div>
    </div>
        <li class="border-gray-300 bg-white border-[1px] rounded-[10px] w-[516px] max-h-[200px] overflow-y-auto">
            <table class="w-full">
                <thead class="flex sticky top-0 z-10 bg-white font-medium overflow-hidden border-b border-gray-200">
                    <tr class="overflow-auto">
                        <th scope="col" class="px-3 py-3.5 pr-14 text-left text-sm font-semibold text-gray-900">내용</th>
                        <th scope="col" class="px-3 py-3.5 pr-64 text-left text-sm font-semibold text-gray-900">
                        </th>
                    </tr>
                </thead>
                <tbody class="relative z-0 divide-y divide-gray-200 overflow-hidden" role="list">
                      <tr class="relative flex items-center space-x-3 py-3 text-sm">
                        <td class="whitespace-nowrap px-3 text-sm text-gray-500"> 미합류 직원 </td>
                        <div>
                                  <div v-if="countZeroCheck(inviteTotalCount)" class="flex">
                                      <a
                                        class="w-[28px] h-[28px] bg-[#D9DFE7] leading-[28px] text-center text-[#B0B4BD] rounded mr-1"
                                      >
                                      0
                                      </a>
                                      <div>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                            />
                                          </svg>
                                  </div>
                                </div>
                                <!-- 카운트가 0 이 아닐 때 버튼 -->
                                <div class="flex">
                                  <a
                                    class="w-[28px] h-[28px] bg-[#4031B8] leading-[28px] text-center text-[#fff] rounded mr-1"
                                  >
                                    {{inviteTotalCount}}
                                  </a>
                                  <div v-if="!countZeroCheck(inviteTotalCount)">
                                    <button @click="openInviteList">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke="currentColor"
                                        class="w-6 h-6"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                          </div>
                      </tr>
                    <tr class="relative flex items-center space-x-3 py-3 text-sm">
                        <td class="whitespace-nowrap px-3 text-sm text-gray-500"> 필수 설정이 안된 직원 </td>
                        <div>
                                  <div v-if="countZeroCheck(incompleteSetUpEmployeeCount)" class="flex">
                                      <a
                                        class="w-[28px] h-[28px] bg-[#D9DFE7] leading-[28px] text-center text-[#B0B4BD] rounded mr-1"
                                      >
                                      0
                                      </a>
                                      <div>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                            />
                                          </svg>
                                      </div>
                                </div>
                                <!-- 카운트가 0 이 아닐 때 버튼 -->
                                <div class="flex">
                                  <a
                                    class="w-[28px] h-[28px] bg-[#4031B8] leading-[28px] text-center text-[#fff] rounded mr-1"
                                  >
                                    {{ incompleteSetUpEmployeeCount }}
                                  </a>
                                  <div v-if="!countZeroCheck(incompleteSetUpEmployeeCount)">
                                    <button @click="openIncompleteSetUpEmployeelist">
                                      <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      class="w-6 h-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                      />
                                    </svg>
                                    </button>
                                  </div>
                                </div>
                          </div>
                    </tr>
                    <tr class="relative flex items-center space-x-3 py-3 text-sm">
                        <td class="whitespace-nowrap px-3 text-sm text-gray-500"> 수습 기간 직원 </td>
                        <div>
                                  <div v-if="countZeroCheck(probationaryEmployeeList.length)" class="flex">
                                      <a
                                        class="w-[28px] h-[28px] bg-[#D9DFE7] leading-[28px] text-center text-[#B0B4BD] rounded mr-1"
                                      >
                                      0
                                      </a>
                                      <div>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="2"
                                            stroke="currentColor"
                                            class="w-6 h-6"
                                          >
                                            <path
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                            />
                                          </svg>
                                  </div>
                                </div>
                                <!-- 카운트가 0 이 아닐 때 버튼 -->
                                <div class="flex">
                                  <a
                                    class="w-[28px] h-[28px] bg-[#4031B8] leading-[28px] text-center text-[#fff] rounded mr-1"
                                  >
                                    {{ probationaryEmployeeList.length }}
                                  </a>
                                  <div v-if="!countZeroCheck( probationaryEmployeeList.length )">
                                    <button @click="openProbationaryEmployeelist">
                                      <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      class="w-6 h-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                      />
                                    </svg>
                                    </button>
                                  </div>
                                </div>
                          </div>
                    </tr>
                </tbody>
            </table>
        </li>
  </div>
  <!-- modal -->
  <!-- 미합류 직원 -->
  <div v-show="showInviteList" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="px-7 py-6 flex justify-between items-center">
                    <h2 class="text-xl font-bold">미합류 직원</h2> <h2 class="text-xl font-bold">({{ inviteTotalCount }})</h2>
                    <a
                        href="javascript:void(0)"
                        class="ml-20"
                        @click="showInviteList = false"
                    >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                    </a>
                </div>
                <div class="w-full h-px bg-gray-300"></div>
                <div class="max-h-[70vh] overflow-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">이름/이메일</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">초대 메일 보낸 날짜</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">입사일</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">초대상태</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template v-for="(invite, index) in inviteTotalList" v-bind:key="index">
                                <tr>
                                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ invite.employeeName }}/{{ invite.inviteEmail }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ invite.inviteDate }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ invite.joinDate }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ invite.inviteStatus }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="flex max-h-[70vh] overflow-auto border-t border-gray-200 px-4 py-2 justify-end">
                    <ElementsButton
                        text="Cancel"
                        :width28="true"
                        :height12="true"
                        :background-white="true"
                        @click="showInviteList=false "
                    />
                </div>
            </div>
  </div>
   <!-- 필수설정 -->
  <div v-show="showIncompleteSetUpEmployeeList" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="px-7 py-6 flex justify-between items-center">
                    <h2 class="text-xl font-bold">정보 설정이 필요한 직원</h2> <h2 class="text-xl font-bold">({{ incompleteSetUpEmployeeCount }})</h2>
                    <a
                        href="javascript:void(0)"
                        class="ml-20"
                        @click="showIncompleteSetUpEmployeeList = false"
                    >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                    </a>
                </div>
                <div class="w-full h-px bg-gray-300"></div>
                <div class="max-h-[70vh] overflow-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Office</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tier</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Work Schedule</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Join Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Employment Type</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template v-for="(incompleteSetUpEmployee, index) in incompleteSetUpEmployeeList" v-bind:key="index">
                                <tr>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-grey-500">{{ incompleteSetUpEmployee.employeeName }}</td>
                                    <td>
                                      <ElementsSelectRef
                                        v-model="incompleteSetUpEmployee.workPlaceSeq"
                                        defaultMsg="Select"
                                        class="text-grey-500"
                                        :options="workPlaceOptions"
                                        :full="true"
                                    />
                                    </td>
                                    <td>
                                      <ElementsSelectRef
                                        v-model="incompleteSetUpEmployee.departmentSeq"
                                        defaultMsg="Select"
                                        class="text-grey-500"
                                        :options="departmentOptions"
                                        :full="true"
                                    />
                                    </td>
                                     <td>
                                      <ElementsSelectRef
                                        v-model="incompleteSetUpEmployee.jobTitleSeq"
                                        defaultMsg="Select"
                                        class="text-grey-500"
                                        :options="jobTitleOptions"
                                        :full="true"
                                    />
                                    </td>
                                     <td>
                                      <ElementsSelectRef
                                        v-model="incompleteSetUpEmployee.workScheduleSeq"
                                        defaultMsg="Select"
                                        class="text-grey-500"
                                        :options="workScheduleOptions"
                                        :full="true"
                                    />
                                    </td>
                                     <td>
                                      <ElementsDate
                                      v-model="incompleteSetUpEmployee.joinDate"
                                      defaultMsg="Select"
                                      class="text-grey-500"
                                      :full="true"
                                    />
                                    </td>
                                    <td>
                                      <ElementsSelectRef
                                        v-model="incompleteSetUpEmployee.employmentType"
                                        defaultMsg="Select"
                                        class="text-grey-500"
                                        :options="contractTypeOptions"
                                        :full="true"
                                    />
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="flex max-h-[70vh] overflow-auto border-t border-gray-200 px-4 py-2 justify-end">
                    <ElementsButton
                        text="Cancel"
                        :width28="true"
                        :height12="true"
                        :background-white="true"
                        @click="cancelEditIncompleteSetUpList"
                    />
                    <ElementsButton
                    class="ml-2"
                    text="Save"
                    :width28="true"
                    :height12="true"
                    @click="saveIncompleteSetUpList"
                />
                </div>
            </div>
  </div>
  <!-- 수습 probationary Employee -->
  <div v-show="showProbationaryEmployeeList" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="px-7 py-6 flex justify-between items-center">
                    <h2 class="text-xl font-bold">probationary Employee</h2> <h2 class="text-xl font-bold">({{ probationaryEmployeeList.length }})</h2>
                    <a
                        href="javascript:void(0)"
                        class="ml-20"
                        @click="showProbationaryEmployeeList = false"
                    >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                    </a>
                </div>
                <div class="w-full h-px bg-gray-300"></div>
                <div class="max-h-[70vh] overflow-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Job Title-Tier</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Probation Period</th> 
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template v-for="(probationaryEmployee, index) in probationaryEmployeeList" v-bind:key="index">
                                <tr>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ probationaryEmployee.employeeName }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ probationaryEmployee.departmentName }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ probationaryEmployee.jobTitleName }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ probationaryEmployee.probationEndDate }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="flex max-h-[70vh] overflow-auto border-t border-gray-200 px-4 py-2 justify-end">
                    <ElementsButton
                        text="Cancel"
                        :width28="true"
                        :height12="true"
                        :background-white="true"
                        @click="showProbationaryEmployeeList=false"
                    />
                </div>
            </div>
  </div>
</template>