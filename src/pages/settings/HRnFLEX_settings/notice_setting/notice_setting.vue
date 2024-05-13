<template>
    <div>
        <div class="flex justify-between py-3">
            <h1 class="text-zinc-800 text-xl font-semibold leading-10 items-center ">HRnFLEX Notice </h1>
            <div class="gap-3 flex justify-between">
                <ElementsSelect
                v-model="targetYear"
                :width40="true"
                :options="years"
                @change="getNotices(pageCondition.offset)"
                />
                <ElementsButton
                v-if="$appUtil.checkPermission('NOTICE_EDIT')"
                :text="'+ Add'"
                :width32="true"
                class="mt-1"
                @click-event="openAddNotice()"
                />
            </div>
        </div>
        
        <div v-if="noticeList.length > 0" class="mt-3 overflow-auto pb-[5vh] md:rounded-lg">
            <table class="divide-y divide-gray-300 w-full shadow border-[1px] border-black border-opacity-10">
                <thead class="bg-[#F8F8FD] w-full">
                    <tr>
                        <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">No</th>
                        <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">Date</th>
                        <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">Admin</th>
                        <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">Title</th>
                        <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">Display Home</th>
                        <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900">Display Period</th>
                        <th scope="col" class="px-1 py-3.5 text-center text-sm text-gray-900"> <span class="sr-only"> Edit </span> </th>
                    </tr>
                </thead>
                <tbody class=" bg-white">
                    <tr v-for="(notice, index) in noticeList" v-bind:key="index"
                        :class="{ 'bg-[#F8F8FD]': (index % 2 !== 0) }"
                    >
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{noticeCount - ((currentPage - 1) * pageCondition.limit) - index}} </td>
                        <td class="whitespace-pre px-3 py-4 text-sm text-center text-gray-900"> {{dateFormatChange(notice.writeDatetime)}} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{notice.loginId}} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{notice.noticeTitle}} </td>
                        <td class="whitespace-normal px-3 py-4 text-sm text-center text-gray-900"> {{notice.displayHomeYn}} </td>
                        <td class="whitespace-normal px-3 py-4 text-sm text-center text-gray-900">
                            <span v-if="notice.displayHomeYn === 'Y'">
                                {{convertDateFormat(notice.displayHomeStartDatetime)}} ~ {{convertDateFormat(notice.displayHomeEndDatetime)}}
                            </span> 
                            <span v-else>
                                -
                            </span>
                        </td>
                        <td class="whitespace-nowrap  text-sm text-gray-900 pr-3">

                            <Menu v-if="$appUtil.checkPermission('NOTICE_EDIT')" as="div" class="relative inline-block text-left">
                                <div>
                                    <MenuButton class="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                        <span class="sr-only">Open options</span>
                                        <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                                    </MenuButton>
                                </div>

                                <transition
                                    enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95"
                                >
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div class="py-1">
                                            <MenuItem v-slot="{ active }" @click="openEditNotice(notice)">
                                                <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                                    Edit
                                                </div>
                                            </MenuItem>
                                            <MenuItem v-slot="{ active }" @click="deleteNotice(notice)">
                                                <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                                    Delete
                                                </div>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </transition>
                            </Menu>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="mt-3 flex flex-col items-center h-full justify-center gap-5">
            <div class="text-gray-500"> No Notice </div>
        </div>
        <div class="w-full h-28 flex mt-1 justify-center items-center">
            <ElementsPagination
                v-model="currentPage"
                :totalContent="noticeCount"
                :contentsPerPage="pageCondition.limit"
                @clickPage="clickPage"
            />
        </div>
        <Teleport to="body">
            <NoticePopup
                v-model="noticePopup.isOpen"
                :execute-type="noticePopup.executeType"
                :data="noticePopup.data"
                @create="createNotice"
                @change="editNotice"
            />
        </Teleport>
    </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { DotsVerticalIcon  } from '@heroicons/vue/solid';
import moment from 'moment';
import NoticePopup from './notice_popup.vue';

export default {
    components : {
        Menu, MenuButton, MenuItem, MenuItems, DotsVerticalIcon,
        NoticePopup
    },
    data(){
        return{
            noticeList : [],
            noticePopup : {
                isOpen : false,
                executeType : "CREATE",
                data : {}
            },
            years : [],
            targetYear : "ALL",
            currentPage : null,
            noticeCount : null,
            pageCondition:{
                limit : 10,
                offset : null,
                year : null
            }
        }
    },
    methods : {
        getYearsOfNotices() {
            const self = this;
            const url = self.$api("uri", "get-hr-notice-years");

            self.$axios.get(url)
                        .then(res => {
                            self.years = res.data.data.years;
                        })
                        .catch(err => {
                            alert(err);
                        });
        },
        getNotices(offset = 0) {
            const self = this;
            if (self.targetYear === undefined || self.targetYear === 'ALL') {
                self.pageCondition.year = -1;
            } else {
                self.pageCondition.year = Number(self.targetYear);
            }

            self.pageCondition.offset = offset;

            const url = self.$api("uri", "get-hr-notice");
            
            let jsonQuery = JSON.stringify(self.pageCondition);
            self.$axios.get(url, {params : {jsonQuery}})
            .then(res => {
                self.noticeList = res.data.data.list;
                self.noticeCount = res.data.data.noticeCount;
            })
            .catch(err => {
                alert(err);
            });

            if (offset == 0) {
                self.currentPage = 1;
            }
        },
        clickPage(offset) {
            const self = this;
            self.getNotices(offset, false);
        },
        convertDateFormat(date, format= "MM/DD/yyyy") {
            if( ! date ) return;
            return moment(date).format(format);
        },
        openAddNotice(){
            const self = this;
            self.noticePopup.isOpen = true;
            self.noticePopup.executeType = "CREATE";
            self.noticePopup.data = {
                loginId : window.logOnProfile.data.loginId,
                displayHomeYn : 'Y'
            };
        },
        openEditNotice(selectedData) {
            const self = this;
            self.noticePopup.isOpen = true;
            self.noticePopup.executeType = "EDIT";
            self.noticePopup.data = selectedData;
        },
        createNotice(noticeData){
            const self = this;
            const url = self.$api("uri", "post-hr-notice");
            self.$axios.post(url, noticeData)
            .then(() => {
                self.noticePopup.isOpen = false;
                self.getNotices(self.pageCondition.offset);
            })
            .catch(err => {
                alert(err.response.data.message);
            });
        },
        editNotice(selectedData){
            const self = this;
            const url = self.$api("uri", "put-hr-notice");
            self.$axios.put(url , selectedData)
            .then(() => {
                self.noticePopup.isOpen = false;
                self.getNotices(self.pageCondition.offset);
            })
            .catch(err => {
                alert(err.response.data.message);
                console.log(selectedData);
            });
        },
        deleteNotice(selectedData) {
            const self = this;
            const url = self.$api("uri", "delete-hr-notice");
            self.$axios.delete(url, {data : selectedData})
            .then(() => {
                alert("Success to delete");
                self.getNotices(self.pageCondition.offset);
            })
            .catch(err =>{
                alert(err.response.data.message);
                console.log(selectedData);
            });
        },
        dateFormatChange(date, format= "MM/DD/yyyy[\r\n]hh:mm:ss"){
            if(!date) {
                return;
            }
            return moment(date).format(format);
        }
    },
    mounted(){
        const self = this;
        self.getNotices();
        self.getYearsOfNotices();
    }
}
</script>
