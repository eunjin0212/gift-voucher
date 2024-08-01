<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Cloud Flare Image Token'">
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <div class="flex py-5 justify-end">
                    <button
                        class="h-12 w-fit px-5 py-3 border rounded border-indigo-600 bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition-all duration-500 text-center"
                        v-if="$appUtil.checkPermission('IMAGE_TOKEN_EDIT')"
                        @click="openAddImageTokenPopup()">
                        + Registration Image Token
                    </button>
                </div>
                <div v-if="imageTokenList.length > 0" class="mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="w-full table-fixed">
                        <thead class="bg-gray-50 top-0 left-0 right-0 border-b border-gray-50" style="z-index: 1">
                            <tr>
                                <th scope="col" class="w-32 px-3 py-3.5 text-center text-sm text-gray-900">Registration Time</th>
                                <th scope="col" class="w-28 px-3 py-3.5 text-center text-sm text-gray-900">Created By</th>
                                <th scope="col" class="w-96 px-3 py-3.5 text-center text-sm text-gray-900">Token Value</th>
                                <th scope="col" class="w-28 px-3 py-3.5 text-center text-sm text-gray-900">Start Date</th>
                                <th scope="col" class="w-28 px-3 py-3.5 text-center text-sm text-gray-900">End Date</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="(view, index) in viewList" v-bind:key="index">
                                <td class="break-words px-3 py-4 text-sm text-center text-gray-900">{{ fitDateTimeFormat(view.regDatetime) }}</td>
                                <td class="break-words px-3 py-4 text-sm text-center text-gray-900">{{ view.hrAdminName }}</td>
                                <td class="break-words px-3 py-4 text-sm text-center text-gray-900">{{ view.tokenValue }}</td>
                                <td class="break-words px-3 py-4 text-sm text-center text-gray-900">{{ fitDateFormat(view.startDatetime) }}</td>
                                <td class="break-words px-3 py-4 text-sm text-center text-gray-900">{{ fitDateFormat(view.endDatetime) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else class="mt-10 flex flex-col items-center h-full justify-center gap-5">
                    <div class="text-gray-500">No Image Token Data</div>
                </div>
                <div class="w-full h-28 flex mt-4 justify-center items-center">
                    <ElementsPagination v-model="pagination.currentPage" :totalContent="imageTokenCount" :contentsPerPage="pagination.limit" @clickPage="afterClickPage" />
                </div>
            </div>
        </AppMain>
        <Teleport to="body">
            <AddImageTokenPopup v-model="isAddImageTokenPopupVisible" @insert-success="getImageTokenListData" @close-popup="isAddImageTokenPopupVisible = false" />
        </Teleport>
    </div>
</template>

<script>
import AppAside from '@/components/AppAside.vue';
import AppMain from '@/components/main/AppMain.vue';
import ElementsPagination from '@/components/elements/ElementsPagination.vue';
import AddImageTokenPopup from '@/pages/image-token/popup/add-image-token-popup.vue';
import { DateFormatUtil } from '@/plugins/app-util.js';
import moment from 'moment';

export default {
    components: {
        AppAside,
        AppMain,
        ElementsPagination,
        AddImageTokenPopup,
    },
    data() {
        return {
            imageTokenCount: 0,
            imageTokenList: [],
            viewList: [],
            pagination: {
                limit: 10,
                currentPage: 1,
            },
            isAddImageTokenPopupVisible: false,
        };
    }, //data
    mounted() {
        const self = this;
        self.getImageTokenListData();
    },
    methods: {
        getImageTokenListData() {
            const self = this;
            self.isAddImageTokenPopupVisible = false;
            const url = self.$api('uri', 'get-image-token-list');
            self.$axios.get(url).then((res) => {
                self.imageTokenList = res.data.data.imageTokenList;
                self.imageTokenCount = self.imageTokenList.length;
                self.pagination.currentPage = 1;
                self.viewList = self.imageTokenList.slice(0, 0 + self.pagination.limit - 1);
            });
        },
        afterClickPage(offset) {
            const self = this;
            const startIndex = offset * self.pagination.limit;
            self.viewList = self.imageTokenList.slice(startIndex, startIndex + self.pagination.limit - 1);
        },
        openAddImageTokenPopup() {
            const self = this;
            self.isAddImageTokenPopupVisible = true;
        },
        fitDateFormat: DateFormatUtil.fitDateFormat,
        fitDateTimeFormat: DateFormatUtil.fitDateTimeFormat
    },
}; // export default
</script>
