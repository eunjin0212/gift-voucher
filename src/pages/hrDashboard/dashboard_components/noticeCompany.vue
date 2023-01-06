<script>
import moment from "moment";
import AppPopup from "@/components/AppPopup.vue"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import ElementsModal2Button from "@/components/elements/ElementsModal2Button.vue"
import ElementsPagination from "@/components/elements/ElementsPagination.vue"

export default {
    components:{
        AppPopup,
        Menu, MenuButton, MenuItem, MenuItems,
        ElementsModal2Button,
        ElementsPagination,
    },
	props:{

	},
  	data(){
    	return{
            noticeCompanyAll : [],

            showViewAllPopup : false,
            showInfoModal : false,
            showEditModal : false,
            showDeleteModal : false,
            showAddModal : false,
            showInputNullModal : false,

            employeeAllList : [],

            infoSelectedNotice : {},
            editSelectedNotice : {
                title : "",
                noticeContent : ""
            },
            deleteSelectedNotice : {},
            addNotice : {
                title : "",
                noticeContent : ""
            },

            paginationSet : {
                currentPage : 1,
                //총 notice 수
                noticeCount : 0,
                pageStartCnt : 0,
                contentsPerPage : 5
            },
        }
  	},
  	mounted(){
        const self = this;
        self.getNoticeCompany();
  	},
  	methods:{
        getNoticeCompany(){
            const self = this;

            //get notice all
            const url = self.$api("uri", "get-notice-company")
            self.$axios
                .get(url)
                .then((res) => {
                    self.noticeCompanyAll = res.data.data.list;
                    self.paginationSet.noticeCount = self.noticeCompanyAll.length;

                    //get employee all
                    self.getEmployeeAll();
                })
                .catch((err) => {
                    console.error('err : ',err);
                })
        },
        isShowThisNotice(index){
            const self = this;
            //현재 선택한 페이지
            const curPage = self.paginationSet.currentPage;
            //한 페이지에 보여줄 갯수
            const contentsPerPage = self.paginationSet.contentsPerPage;
            //선택한 페이지의 첫 index 값
            let pageStartCnt = self.paginationSet.pageStartCnt;

            for (pageStartCnt; pageStartCnt < curPage*contentsPerPage; pageStartCnt++) {
                if( index == pageStartCnt ) return true; 
            }

            return false;
        },
        getEmployeeAll(){
            const self = this;

            const url = self.$api("uri", "get-employee-all")
            self.$axios
                .get(url)
                .then((res) => {
                    self.employeeAllList = res.data.data.list;

                    self.employeeAllList.forEach((emp) => {
                        self.noticeCompanyAll.forEach((notice) => {
                            if(notice.employeeSeq == emp.employeeSeq){
                                notice.writer = emp.employeeName;
                            };
                        });
                    });
                })
                .catch((err) => {
                    console.error('err : ',err);
                })
        },
        clickViewAll(){
            const self = this;
            self.showViewAllPopup = true;   
            
            self.getNoticeCompany();

            //for pagination init
            self.paginationSet.currentPage = 1;
            self.paginationSet.noticeCount = 0;
            self.paginationSet.pageStartCnt = 0;
            self.paginationSet.contentsPerPage = 5;
        },
        fmtTimezoneToMMddyyyy(timezone){
            // format : timeZone = 2022-09-13T07:04Z
            return moment(timezone,"YYYY-MM-DDTHH:mm:ssZ").format("MM/DD/YYYY");
        },
        openNoticeInfo(notice){
            const self = this;

            self.infoSelectedNotice = notice;

            self.showInfoModal = true;
        },
        openEditModal(notice){
            const self = this;

            self.editSelectedNotice = Object.assign({}, notice);

            self.showEditModal = true;
        },
        openDeleteModal(notice){
            const self = this;

            self.deleteSelectedNotice = Object.assign({}, notice);
            
            self.showDeleteModal = true;
        },
        openAddModal(){
            const self = this;

            self.addNotice = {
                title : "",
                noticeContent : ""
            }

            self.showAddModal = true;
        },
        clickSaveButton(){
            const self = this;

            // check null
            for ( let key in self.editSelectedNotice ){
                if ( ! self.editSelectedNotice[key].trim() ) {
                    self.showInputNullModal = true;
                    return;
                }
            }

            const url = self
                    .$api("uri", "put-notice-company")
                    .replace("{noticeCompanySeq}", self.editSelectedNotice.noticeCompanySeq);
            self.$axios
                .put(url, {
                    title : self.editSelectedNotice.title.trim(),
                    noticeContent : self.editSelectedNotice.noticeContent.trim()
                })
                .then((res) => {
                    self.showEditModal = false;

                    self.getNoticeCompany();
                })
                .catch((err) => {
                    console.error('err : ', err);
                })
        },
        clickDeleteButton(){
            const self = this;

            const url = self.$api("uri", "delete-notice-company")
                            .replace("{noticeCompanySeq}", self.deleteSelectedNotice.noticeCompanySeq);
            self.$axios
                .delete(url)
                .then((res) => {
                    self.showDeleteModal = false;

                    self.getNoticeCompany();
                })
                .catch((err) => {
                    console.error('err : ', err);
                })
        },
        clickAddButton(){
            const self = this;

            const url = self.$api("uri", "post-notice-company")

            //check null
            for ( let key in self.addNotice ){
                if ( ! self.addNotice[key] ) {
                    self.showInputNullModal = true;
                    return;
                }
            }

            self.$axios
                .post(url, self.addNotice)
                .then((res) => {
                    self.showAddModal = false;

                    self.getNoticeCompany();
                })
                .catch((err) => {
                    console.error('err : ',err);
                })
        },
        afterClickPage( item ){
            const self = this;

            self.paginationSet.pageStartCnt = item;
        }
  	}
};
</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1 class="pb-3 text-[20px] font-bold truncate">회사 공지사항</h1>
            <div class="items-center">
            <button type="button" class="border-[1px] rounded-[10px] border-indigo-600 px-3 py-1 text-indigo-600 font-bold" 
                    @click="openAddModal">공지사항 올리기</button>
            </div>
        </div>
        <li class="border-gray-300 bg-white border-[1px] rounded-[10px] w-[516px] max-h-[200px] overflow-y-auto">
            <table class="w-full">
                <thead class="flex sticky top-0 z-10 bg-white font-medium overflow-hidden border-b border-gray-200">
                    <tr class="overflow-auto">
                        <th scope="col" class="px-3 py-3.5 pr-14 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th scope="col" class="px-3 py-3.5 pr-64 text-left text-sm font-semibold text-gray-900">내용</th>
                        <th scope="col" class="px-3 py-3.5 text-right text-sm font-semibold text-gray-900 whitespace-nowrap pl-3">
                            <a href="javascript:void(0)" class="text-indigo-600 hover:text-indigo-900 "
                                @click="clickViewAll">전체보기</a>
                        </th>
                    </tr>
                </thead>
                <tbody class="relative z-0 divide-y divide-gray-200 overflow-hidden" role="list">
                    <tr v-for="(notice, index) in noticeCompanyAll" v-bind:key="index"
                        class="relative flex items-center space-x-3 py-3 text-sm">
                        <td class="whitespace-nowrap px-3 text-sm text-gray-500">{{ fmtTimezoneToMMddyyyy(notice.writeDatetime) }}</td>
                        <td class="whitespace-nowrap text-sm text-gray-500">{{ notice.title }}</td>
                    </tr>
                </tbody>
            </table>
        </li>
    </div>
    <Teleport to="body">
        <div v-show="showViewAllPopup" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="px-7 py-6 flex justify-between items-center">
                    <h2 class="text-xl font-bold">회사 공지사항</h2>
                    <a
                        href="javascript:void(0)"
                        class="ml-20"
                        @click="showViewAllPopup = false"
                    >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                    </a>
                </div>
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
                            <template v-for="(notice, index) in noticeCompanyAll" v-bind:key="index">
                                <tr v-show="isShowThisNotice(index)">
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ fmtTimezoneToMMddyyyy(notice.writeDatetime) }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="openNoticeInfo(notice)">{{ notice.title }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ notice.writer }}</td>
                                    
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
            <ElementsPagination 
                v-model="paginationSet.currentPage"
                :totalContent="paginationSet.noticeCount"
                :contentsPerPage="paginationSet.contentsPerPage"
                @clickPage="afterClickPage"
            />
            </div>
        </div>
        <div v-show="showInfoModal" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="px-7 py-6 flex justify-between items-center">
                    <h2 class="text-xl font-bold">회사 공지사항</h2>
                    <a
                        href="javascript:void(0)"
                        class="ml-20"
                        @click="showInfoModal = false"
                    >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                    </a>
                </div>
                <div class="max-h-[70vh] overflow-auto border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Title</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ infoSelectedNotice.title }}</dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">Date</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ fmtTimezoneToMMddyyyy(infoSelectedNotice.writeDatetime) }}</dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">Contents</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ infoSelectedNotice.noticeContent }}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        <div v-show="showEditModal" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="px-7 py-6 flex justify-between items-center">
                    <h2 class="text-xl font-bold">회사 공지사항</h2>
                    <a
                        href="javascript:void(0)"
                        class="ml-20"
                        @click="showEditModal = false"
                    >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                    </a>
                </div>
                <div class="max-h-[70vh] overflow-auto border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-2 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Title</dt>
                                <ElementsInput
                                    v-model="editSelectedNotice.title"
                                    class="flex-1"
                                    :full="true"
                                    :maxlength="200"
                                />
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Contents</dt>
                                <div>
                                    <textarea
                                        v-model="editSelectedNotice.noticeContent"
                                        class="mt-1 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                                        :maxlength="20000"
                                    />
                                </div>
                        </div>
                    </dl>
                </div>
                <div class="flex max-h-[70vh] overflow-auto border-t border-gray-200 px-4 py-2 justify-end">
                    <ElementsButton
                        text="Cancel"
                        :width28="true"
                        :height12="true"
                        :background-white="true"
                        @click="showEditModal=false"
                    />
                    <ElementsButton 
                        class="ml-2"
                        text="Save"
                        :width28="true"
                        :height12="true"
                        @click="clickSaveButton"
                    />
                </div>
            </div>
        </div>
        <ElementsModal2Button
            v-model="showDeleteModal"
            modalContent="Are you sure Delete Notice ?"
            buttonText="Delete"
            @afterClick="clickDeleteButton"
        />
        <ElementsModal2Button
            v-model="showInputNullModal"
            modalContent="Title and Content cannot be empty."
            buttonText="OK"
            @afterClick="showInputNullModal = false"
        />
        <div v-show="showAddModal" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
            <div class="border rounded-lg shadow shadow-gray-100 bg-white w-[516px]">
                <div class="px-7 py-6 flex justify-between items-center">
                    <h2 class="text-xl font-bold">공지사항 올리기</h2>
                    <a
                        href="javascript:void(0)"
                        class="ml-20"
                        @click="showAddModal = false"
                    >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                    </a>
                </div>
                <div class="max-h-[70vh] overflow-auto border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-2 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Title</dt>
                                <ElementsInput
                                    v-model.trim="addNotice.title"
                                    class="flex-1"
                                    :full="true"
                                    :maxlength="200"
                                />
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Contents</dt>
                                <textarea
                                    v-model.trim="addNotice.noticeContent"
                                    class="mt-1 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
                                    :maxlength="20000"
                                />
                        </div>
                    </dl>
                </div>
                <div class="flex max-h-[70vh] overflow-auto border-t border-gray-200 px-4 py-2 justify-end">
                    <ElementsButton
                        text="Cancel"
                        :width28="true"
                        :height12="true"
                        :background-white="true"
                        @click="showAddModal=false"
                    />
                    <ElementsButton 
                        class="ml-2"
                        text="Add"
                        :width28="true"
                        :height12="true"
                        @click="clickAddButton"
                    />
                </div>
            </div>
        </div>
    </Teleport>
</template>