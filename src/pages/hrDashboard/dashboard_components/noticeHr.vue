<script>
// TODO dashboard 써니 폴더 옮기기
import moment from "moment";
// import AppPopup from "@/components/AppPopup.vue"

// import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
// import ElementsModal2Button from "@/components/elements/ElementsModal2Button.vue"
import ElementsPagination from "@/components/elements/ElementsPagination.vue"

export default {
    components:{
        // AppPopup,
        // Menu, MenuButton, MenuItem, MenuItems,
        // ElementsModal2Button,
        ElementsPagination
    },
	props:{

	},
  	data(){
    	return{
            noticeHrAll : [],

            showViewAllPopup : false,
            showInfoModal : false,

            infoSelectedNotice : {},

            paginationSet : {
                currentPage : 1,
                //총 notice 수
                noticeCount : 0,
                pageStartCnt : 0,
                contentsPerPage : 5
            }
        }
  	},
  	mounted(){
        const self = this;
        self.getNoticeHr();
  	},
  	methods:{
        getNoticeHr(){
            const self = this;

            //get notice all
            const url = self.$api("uri", "get-notice-hr")
            self.$axios
                .get(url)
                .then((res) => {
                    self.noticeHrAll = res.data.data.list;
                    self.paginationSet.noticeCount = self.noticeHrAll.length;
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
        clickViewAll(){
            const self = this;
            self.showViewAllPopup = true;   
            
            self.getNoticeHr();

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
        <h1 class="pb-3 text-[20px] font-bold truncate">HRnFLEX 공지사항</h1>
        <div class="items-center">
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
                    <tr v-for="(notice, index) in noticeHrAll" v-bind:key="index"
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
                    <h2 class="text-xl font-bold">HRnFLEX 공지사항</h2>
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
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <template v-for="(notice, index) in noticeHrAll" v-bind:key="index">
                                <tr v-show="isShowThisNotice(index)">
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ fmtTimezoneToMMddyyyy(notice.writeDatetime) }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" @click="openNoticeInfo(notice)">{{ notice.title }}</td>
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
                    <h2 class="text-xl font-bold">HRnFLEX 공지사항</h2>
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
    </Teleport>
</template>