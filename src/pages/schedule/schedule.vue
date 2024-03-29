<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import ElementsPagination from "@/components/elements/ElementsPagination.vue"
import PopupSchedule from "@/pages/schedule/popups/PopupSchedule.vue"
import { ValidateUtil } from "@/plugins/app-util.js";
import moment from 'moment';

export default {
    components: {
        AppAside,
        AppMain,
        ElementsPagination,
        PopupSchedule,
    },
    data() {
        return {
            scheduleCount : null,
            profileOption : [
                { text : "All" , value : null },
                { text : "Local" , value : "LOCAL" },
                { text : "Staging" , value : "STG" },
                { text : "Production" , value : "PRD" },
            ],
            processStatusOption : [
                { text : "All" , value : null },
                { text : "WAIT" , value : "WAIT" },
                { text : "PROCESSING" , value : "PROCESSING" },
                { text : "FINISH" , value : "FINISH" },
                { text : "ERROR" , value : "ERROR" },
            ],
            scheduleList: [],
            json_query:{
                limit : 10,
                offset : null,
                searchStatusOption : null,
                searchProfileOption : null,
                searchText : null
            },
            currentPage : null,
            addAndEditPopup : false,
            selectItem : null,
        };
    }, //data
    mounted() {
        const self = this;
        self.getScheduleListData();
    },
    methods: {
        over15CharFromFullName : ValidateUtil.over15CharFromFullName,
        over15Charaters : ValidateUtil.over15Charaters,
        convertPhoneGlobalToLocal : ValidateUtil.convertPhoneGlobalToLocal,
        getScheduleListData( offset=0, afterClickPage = false ){
            const self = this;
            self.json_query.offset = offset;
            let json_query = { ...self.json_query };

            const url = self.$api("uri", "get-schedule-list");
            json_query = JSON.stringify(json_query);
            self.$axios.get(url, { params : { json_query } }).then(res => {
                self.scheduleList = res.data.data.list;
                self.scheduleCount = res.data.data.total;
                if( ! afterClickPage ){
                    self.currentPage = 1;
                }
            });
        },
        afterClickPage( item ){
            const self = this;
            self.getScheduleListData( item , true );
        },
        openAddAndEditPopup(schedule){
            const self = this;
            self.selectItem = schedule;
            self.addAndEditPopup = true;
        },
        dateFormatChange( date, format= "MM/DD/yyyy HH:mm" ){
            if( ! date ) return;
            return moment(date).tz("Asia/Manila").format(format);
        },
    },
}; // export default
</script>

<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Schedule'">
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <div class="flex py-5 justify-end">
                    <button class="h-12 w-fit px-5 py-3 border rounded border-indigo-600 bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition-all duration-500 text-center"
                        v-if="$appUtil.checkPermission('SCHEDULE_EDIT')"
                        @click="openAddAndEditPopup(null)">
                        + Registration Schedule
                    </button>
                </div>
                <div class="flex items-start gap-3 flex-wrap">
                    <ElementsSelect
                        :width60="true"
                        :options="processStatusOption"
                        v-model="json_query.searchStatusOption"
                    />
                    <ElementsSelect
                        :width60="true"
                        :options="profileOption"
                        v-model="json_query.searchProfileOption"
                    />
                    <ElementsInput
                        v-model="json_query.searchText"
                        placeholder="Search Schedule Name"
                        :width72="true"
                        :height11="true"
                    />
                    <ElementsButton
                        text="Search"
                        :fitContent="true"
                        :height12="true"
                        @click-event="getScheduleListData()"
                    />
                </div>
                <div
                    v-if="scheduleList.length > 0 "
                    class=" mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                >
                    <table class="relative min-w-full divide-y divide-gray-300  ">
                        <thead class="sticky bg-gray-50 top-0 left-0 right-0 border-b border-gray-50" style="z-index: 1;">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-6 ">SCHEDULE_QUEUE_WAIT_SEQ</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">SCHEDULE_REFERENCE_SEQ</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">EXECUTE_MESSAGE_QUEUE</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">INTERVAL_RULE</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">PROCESS_STATUS</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">EXECUTE_DATETIME</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">EXECUTE_PROFILE</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">EXECUTE_IGNORE</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">EXECUTE_EXPIRE</th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="(schedule, index) in scheduleList" v-bind:key="index" >
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900 sm:pl-6">{{ schedule.scheduleQueueWaitSeq }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">{{ schedule.scheduleReferenceSeq }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900 ">{{ schedule.executeMessageQueue }}</td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ schedule.intervalRule }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ schedule.processStatus }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ dateFormatChange(schedule.executeDatetime) }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ schedule.executeProfile }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ schedule.executeIgnore }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ dateFormatChange(schedule.executeExpire) }} </td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div v-if="$appUtil.checkPermission('SCHEDULE_EDIT')">
                                        <div class="cursor-pointer border rounded hover:bg-red-100 border-rose-400 w-24 py-1 transition-all duration-500 text-center">
                                            <div
                                                href="#" class="text-rose-600   whitespace-normal"
                                                @click="openAddAndEditPopup(schedule)"
                                            >
                                                Edit Schedule
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="mt-10 flex flex-col items-center h-full justify-center gap-5">
                    <div class="text-gray-500">  No Schedule Data </div>
                </div>
                <div class="w-full h-28 flex mt-4 justify-center items-center">
                    <ElementsPagination
                        v-model="currentPage"
                        :totalContent="scheduleCount"
                        :contentsPerPage="json_query.limit"
                        @clickPage="afterClickPage"
                    />
                </div>
            </div>
        </AppMain>
        <Teleport to="body">
            <div v-if="addAndEditPopup">
                <PopupSchedule
                    v-model="addAndEditPopup"
                    name="Schedule"
                    :editItem="selectItem"
                    @success="getScheduleListData"
                    @close-popup="addAndEditPopup=false"
                />
            </div>
        </Teleport>
    </div>

</template>
