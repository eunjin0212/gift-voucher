<script>
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

export default {
  components: {
        Menu, MenuButton, MenuItem, MenuItems,
    },
	props:{
	},
    mounted() {
        const self = this;
        // self.getEmployeesListData(true);
        self.getInvitedEmployeeCount();
        // self.getLeaveEmployeeListData();
	},
	data() {
        return {
        employeeCount : null,
        todayText: moment().format("dddd, MM/DD/YYYY hh:mm:ss"),
        // 시작일은 이번달 1일
    
        startDate: moment().startOf("seconds").format("YYYYMM"),
        // endDate는 현재 날짜 시간 초까지 반영
        endDate: moment(self.todayDate).endOf("seconds").format("YYYYMMDDhhmmss"),

        showWorkView: false,
        showVacationView: false,
        showAbsenteeismView: false,
        showTardyView: false,
        showOutsideWorkView: false,
        showOtherView: false,
        }
	},
    methods: {
    getEmployeesListData(isInit=false,offset=0){
    const self = this;
    self.json_query.offset = offset;
    let json_query = { ...self.json_query };
    const url = self.$api("uri", "get-employee");
    json_query = JSON.stringify(json_query);    
    self.$axios.get(url, { params : { json_query } }).then(res => {
        self.employees = res.data.data.list;
        console.log(isInit);
    });
    },
     getInvitedEmployeeCount() {
            const self = this;
            const url = self.$api("uri", "get-invite");
            const json_query = JSON.stringify({
                "limit" : 100,
                "offset" : 0,
            });
            self.$axios.get(url, { params : { json_query } } ).then((res) => {
                self.employeeCount = res.data.data.total;
            });
      },
    // 타임 존 언제쓰지?
    fmtTimezoneToMMddyyyy(timezone){
        // format : timeZone = 2022-09-13T07:04Z
        return moment(timezone,"YYYY-MM-DDTHH:mm:ssZ").format("MM/DD/YYYY");
    },
    // modal
     openWorkView() {
      console.log("open openWorkView -- ");
			const self = this;
			self.showWorkView = true;
    },
      openVacationView() {
      console.log("open VacationView -- ");
			const self = this;
			self.showVacationView = true;
    },
      openAbsenteeismView() {
      console.log("open AbsenteeismView -- ");
			const self = this;
			self.showAbsenteeismView = true;
    },
      openTardyView() {
      console.log("open TardyView -- ");
			const self = this;
			self.showTardyView = true;
    },
      openOutsideWorkView() {
      console.log("open OutsideWorkView -- ");
			const self = this;
			self.showOutsideWorkView = true;
    },
      openOtherView() {
      console.log("open OtherView -- ");
			const self = this;
			self.showOtherView = true;
     }, 
	}
};
</script>
<template>
            <div>
              <div class="font-bold text-[20px] mb-1">
                관리가 필요한 직원(<span class="text-[#4031B8]"
                  >총직원</span> <span class="text-[#4031B8]">{{ employeeCount }}</span>
                  <span class="text-[#4031B8]"
                  >명</span>)
              </div>
              <div><a @click="getEmployeesListData">새로고침 : : : </a><span>{{ todayText }}</span></div>
              <div class="h-[333px] max-h-[333px]">
                <div class="flex gap-3">
                  <div
                    @click="openWorkView"
                    class="w-[32%] h-[146px] border rounded border-gray-300 bg-white cursor-pointer shadow-md shadow-gray-200"
                  >
                    <div class="h-[9px] bg-[#0051CB]"></div>
                    <div 
                    class="text-center mt-10">
                      <h1 class="text-[18px]">출근</h1>
                      <h1 class="text-[30px] text-[#0051CB]">95</h1>
                    </div>
                  </div>
                  <div
                    @click="openVacationView"
                    class="w-[32%] h-[146px] border rounded border-gray-300 bg-white cursor-pointer shadow-md shadow-gray-200"
                  >
                    <div class="h-[9px] bg-[#97499E]"></div>
                    <div class="text-center mt-10">
                      <h1 class="text-[18px]">휴가</h1>
                      <h1 class="text-[30px] text-[#97499E]">4</h1>
                    </div>
                  </div>
                  <div
                    @click="openAbsenteeismView"
                    class="w-[32%] h-[146px] border rounded border-gray-300 bg-white cursor-pointer shadow-md shadow-gray-200"
                  >
                    <div class="h-[9px] bg-[#CE118E]"></div>
                    <div class="text-center mt-10">
                      <h1 class="text-[18px]">결근</h1>
                      <h1 class="text-[30px] text-[#CE118E]">1</h1>
                    </div>
                  </div>
                </div>
                <div class="font-600 text-[20px] mb-1 mt-1">
                  Attendance Overview
                </div>
                <div class="flex gap-3">
                  <div
                    @click="openTardyView"
                    class="w-[32%] h-[146px] border rounded border-gray-300 bg-white cursor-pointer shadow-md shadow-gray-200"
                  >
                    <div class="h-[9px] bg-[#284C81]"></div>
                    <div class="text-center mt-10">
                      <h1 class="text-[18px]">지각</h1>
                      <h1 class="text-[30px] text-[#284C81]">11</h1>
                    </div>
                  </div>
                  <div
                    @click="openOutsideWorkView"
                    class="w-[32%] h-[146px] border rounded border-gray-300 bg-white cursor-pointer shadow-md shadow-gray-200"
                  >
                    <div class="h-[9px] bg-[#494C9E]"></div>
                    <div class="text-center mt-10">
                      <h1 class="text-[18px]">외근</h1>
                      <h1 class="text-[30px] text-[#494C9E]">4</h1>
                    </div>
                  </div>
                  <div
                    @click="openOtherView"
                    class="w-[32%] h-[146px] border rounded border-gray-300 bg-white cursor-pointer shadow-md shadow-gray-200"
                  >
                    <div class="h-[9px] bg-[#11CE18]"></div>
                    <div class="text-center mt-10">
                      <h1 class="text-[18px]">Others</h1>
                      <h1 class="text-[30px] text-[#11CE18]">4</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     <!-- emma openAttendanceOverview 모달들 -->
       <!-- emma 출근 모달 -->
     <Teleport to="body">
      <AppPopup v-model="showWorkView" name="출근">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="w-full h-px bg-gray-300"></div>
                <div class="max-h-[70vh] overflow-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">내용</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">작성자</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template>
                            <!-- <template v-for="(notice, index) in noticeCompanyAll" v-bind:key="index"> -->
                                <tr>
                                <!-- 참고용 <tr v-show="isShowThisNotice(index)"> -->
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ fmtTimezoneToMMddyyyy(notice.writeDatetime) }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="openNoticeInfo(notice)">{{ notice.title }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ notice.writer }}</td> -->
                                    <Menu as="td" class="relative whitespace-nowrap text-left">
                                        <div>
                                            <MenuButton class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm ">
                                                <img src="@/assets/img/dots.png" class="w-[16px]">
                                            </MenuButton>
                                        </div>
                                        <transition enter-active-class="transition ease-out duration-100 " enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems class="origin-top-right absolute right-0 ring-1 z-10 ring-black ring-opacity-5 mt-2 w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                                                <!-- <div @click="openEditModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                                                    </MenuItem>
                                                </div>
                                                <div @click="openDeleteModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete</a>
                                                    </MenuItem>
                                                </div> -->
                                            </MenuItems>
                                        </transition>
                                    </Menu>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
      </AppPopup>
    </Teleport>
          <!-- emma 휴가 모달 -->
            <Teleport to="body">
      <AppPopup v-model="showVacationView" name="휴가">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="w-full h-px bg-gray-300"></div>
                <div class="max-h-[70vh] overflow-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">내용</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">작성자</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template>
                            <!-- <template v-for="(notice, index) in noticeCompanyAll" v-bind:key="index"> -->
                                <tr>
                                <!-- 참고용 <tr v-show="isShowThisNotice(index)"> -->
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ fmtTimezoneToMMddyyyy(notice.writeDatetime) }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="openNoticeInfo(notice)">{{ notice.title }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ notice.writer }}</td> -->
                                    <Menu as="td" class="relative whitespace-nowrap text-left">
                                        <div>
                                            <MenuButton class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm ">
                                                <img src="@/assets/img/dots.png" class="w-[16px]">
                                            </MenuButton>
                                        </div>
                                        <transition enter-active-class="transition ease-out duration-100 " enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems class="origin-top-right absolute right-0 ring-1 z-10 ring-black ring-opacity-5 mt-2 w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                                                <div @click="openEditModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                                                    </MenuItem>
                                                </div>
                                                <div @click="openDeleteModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete</a>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </transition>
                                    </Menu>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
      </AppPopup>
    </Teleport>
             <!-- emma 결근 모달 -->
    <Teleport to="body">
      <AppPopup v-model="showAbsenteeismView" name="Absenteeism 결근">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="w-full h-px bg-gray-300"></div>
                <div class="max-h-[70vh] overflow-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">내용</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">작성자</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template>
                            <!-- <template v-for="(notice, index) in noticeCompanyAll" v-bind:key="index"> -->
                                <tr>
                                <!-- 참고용 <tr v-show="isShowThisNotice(index)"> -->
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ fmtTimezoneToMMddyyyy(notice.writeDatetime) }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="openNoticeInfo(notice)">{{ notice.title }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ notice.writer }}</td> -->
                                    <Menu as="td" class="relative whitespace-nowrap text-left">
                                        <div>
                                            <MenuButton class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm ">
                                                <img src="@/assets/img/dots.png" class="w-[16px]">
                                            </MenuButton>
                                        </div>
                                        <transition enter-active-class="transition ease-out duration-100 " enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems class="origin-top-right absolute right-0 ring-1 z-10 ring-black ring-opacity-5 mt-2 w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                                                <!-- <div @click="openEditModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                                                    </MenuItem>
                                                </div>
                                                <div @click="openDeleteModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete</a>
                                                    </MenuItem>
                                                </div> -->
                                            </MenuItems>
                                        </transition>
                                    </Menu>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
      </AppPopup>
    </Teleport>
             <!-- emma 지각 모달 -->
     <Teleport to="body">
      <AppPopup v-model="showTardyView" name="지각">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="w-full h-px bg-gray-300"></div>
                <div class="max-h-[70vh] overflow-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">내용</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">작성자</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template>
                            <!-- <template v-for="(notice, index) in noticeCompanyAll" v-bind:key="index"> -->
                                <tr>
                                <!-- 참고용 <tr v-show="isShowThisNotice(index)"> -->
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ fmtTimezoneToMMddyyyy(notice.writeDatetime) }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="openNoticeInfo(notice)">{{ notice.title }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ notice.writer }}</td> -->
                                    
                                    <Menu as="td" class="relative whitespace-nowrap text-left">
                                        <div>
                                            <MenuButton class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm ">
                                                <img src="@/assets/img/dots.png" class="w-[16px]">
                                            </MenuButton>
                                        </div>
                                        <transition enter-active-class="transition ease-out duration-100 " enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems class="origin-top-right absolute right-0 ring-1 z-10 ring-black ring-opacity-5 mt-2 w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                                                <div @click="openEditModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                                                    </MenuItem>
                                                </div>
                                                <div @click="openDeleteModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete</a>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </transition>
                                    </Menu>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
      </AppPopup>
    </Teleport>
             <!-- emma 외근 모달 -->
      <Teleport to="body">
      <AppPopup v-model="showOutsideWorkView" name="외근">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="w-full h-px bg-gray-300"></div>
                <div class="max-h-[70vh] overflow-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">내용</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">작성자</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template>
                            <!-- <template v-for="(notice, index) in noticeCompanyAll" v-bind:key="index"> -->
                                <tr>
                                <!-- 참고용 <tr v-show="isShowThisNotice(index)"> -->
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ fmtTimezoneToMMddyyyy(notice.writeDatetime) }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="openNoticeInfo(notice)">{{ notice.title }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ notice.writer }}</td> -->
                                    
                                    <Menu as="td" class="relative whitespace-nowrap text-left">
                                        <div>
                                            <MenuButton class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm ">
                                                <img src="@/assets/img/dots.png" class="w-[16px]">
                                            </MenuButton>
                                        </div>
                                        <transition enter-active-class="transition ease-out duration-100 " enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems class="origin-top-right absolute right-0 ring-1 z-10 ring-black ring-opacity-5 mt-2 w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                                                <div @click="openEditModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                                                    </MenuItem>
                                                </div>
                                                <div @click="openDeleteModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete</a>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </transition>
                                    </Menu>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
      </AppPopup>
    </Teleport>
             <!-- emma Other 모달 -->
      <Teleport to="body">
      <AppPopup v-model="showOtherView" name="Other">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="w-full h-px bg-gray-300"></div>
                <div class="max-h-[70vh] overflow-auto">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">내용</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">작성자</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template>
                            <!-- <template v-for="(notice, index) in noticeCompanyAll" v-bind:key="index"> -->
                                <tr>
                                  <!-- modelValue v-show 챙겨주기  -->
                                <!-- 참고용 <tr v-show="isShowThisNotice(index)"> -->
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ fmtTimezoneToMMddyyyy(notice.writeDatetime) }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="openNoticeInfo(notice)">{{ notice.title }}</td> -->
                                    <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ notice.writer }}</td> -->
                                    
                                    <Menu as="td" class="relative whitespace-nowrap text-left">
                                        <div>
                                            <MenuButton class="inline-flex justify-center w-full rounded-md px-4 py-2 bg-white text-sm ">
                                                <img src="@/assets/img/dots.png" class="w-[16px]">
                                            </MenuButton>
                                        </div>
                                        <transition enter-active-class="transition ease-out duration-100 " enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                            <MenuItems class="origin-top-right absolute right-0 ring-1 z-10 ring-black ring-opacity-5 mt-2 w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none">
                                                <div @click="openEditModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                                                    </MenuItem>
                                                </div>
                                                <div @click="openDeleteModal(notice)">
                                                    <MenuItem v-slot="{ active }">
                                                        <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Delete</a>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </transition>
                                    </Menu>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
      </AppPopup>
    </Teleport>
</template>