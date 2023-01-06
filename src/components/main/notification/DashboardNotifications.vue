<script setup>    
import { inject, ref, onMounted, nextTick, watchEffect } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
// ref : https://v1.heroicons.com, > find then 
import { XIcon, RefreshIcon } from "@heroicons/vue/solid";
import DashboardNotificationBox from "./DashboardNotificationBox.vue";
import { defineProps } from "vue";
import ElementsTooltipSingleton from '@/components/elements/ElementsTooltipSingleton.vue';
import ElementsNotification from '@/components/elements/ElementsNotification.vue';

defineProps({
    open: Boolean,
    arriveNewNews: Number,
});

const emit = defineEmits(['update:open', 'update:arriveNewNews']);

function openPanel(){
    emit("update:open", true);
    newNewsNotificationMessageShow.value = false;
}

function closePanel() {
    emit("update:open", false);
}

const categoryTabs = ref([
    { name: 'Personal', href: '#', current: true, categoryKey: 'personal' },
    { name: 'Company', href: '#', current: false, categoryKey: 'company' },
]);

function onClickCategoryTab(tab){
    for( var t=0; t<categoryTabs.value.length; ++t){
        categoryTabs.value[t].current = false;
    }
    tab.current = true;
}

function onClickCategoryTabFromSelect(event){
    const val = event.target.value;
    for( var t=0; t<categoryTabs.value.length; ++t){
        if( categoryTabs.value[t].categoryKey == val ){
            onClickCategoryTab(categoryTabs.value[t]);
            return;
        }
    }
}

const seeAlsoDeleted = ref(false);

const newsCompany = ref([]);
const newsEmployee = ref([]);

const $api = inject("api");
const $axios = inject("axios");

const notiStorage = {
    putItem : (k, val)=>{
        if( ! window.localStorage ) return;
        window.localStorage.setItem(k, JSON.stringify(val));
    },
    getItem : (k)=>{
        if( ! window.localStorage ) return {};
        return JSON.parse(window.localStorage.getItem(k) || '{}');
    },
};

// ------------------------------------------------------------
const newNewsNotificationMessage = ref('');
const newNewsNotificationMessageDetail = ref('');
const newNewsNotificationMessageShow = ref(false); 
// ------------------------------------------------------------

function loadLatestNews(lastMinTime, callAfter){
    const url = $api("uri", "get-dashboard-notification");
    const json_query = JSON.stringify({ 
        minDateTime : lastMinTime.toISOString() // date to ISO8601 format string
    });
    
    /** expected response
     * {
            "code": "HR_TIME_REPORT_REQ_SUCCESS",
            "message": "[API:WORK_SCHEDULE] time report request succeeded",
            "status": "0",
            "data": {
                "companyNews": [
                    {
                        "nid": "22090810124586361704",
                        "subject": "UNKNOWN_SUBJECT test123ForCompany end of subject",
                        "description": "UNKNOWN_DESCRIPTION",
                        "create": "2022-09-08T10:12:45+08:00",
                        "expire": "2022-10-09T10:12:45+08:00"
                    }
                ],
                "employeeNews": [
                    {
                        "nid": "22090810200294462628",
                        "subject": "UNKNOWN_SUBJECT test123ForEmployee end of subject",
                        "description": "UNKNOWN_DESCRIPTION",
                        "create": "2022-09-08T10:20:02+08:00",
                        "expire": "2022-10-09T10:20:02+08:00"
                    },
                    {
                        "nid": "22090810205474815288",
                        "subject": "UNKNOWN_SUBJECT test123ForEmployee end of subject",
                        "description": "UNKNOWN_DESCRIPTION",
                        "create": "2022-09-08T10:20:54+08:00",
                        "expire": "2022-10-09T10:20:54+08:00"
                    }
                ]
            }
        }
     */
    $axios
        .get(url, {
            params : { json_query },
            isHideLoading : true,
        })
        .then((res) => {
            const oldNewsCount = newsCompany.value.length + newsEmployee.value.length;

            const newNews1 = addingToNews(newsCompany.value, res.data.data.companyNews);
            const newNews2 = addingToNews(newsEmployee.value, res.data.data.employeeNews);
            const newNewsCount = newNews1 + newNews2;
           
            if( newNewsCount > 0 && oldNewsCount > 0 ){
                newNewsNotificationMessage.value = 'You\'v got new '+newNewsCount+' message(s).';
                newNewsNotificationMessageDetail.value = 'Click here to view new messages.';
                newNewsNotificationMessageShow.value = true;
            }

            refreshNewNewsCount();
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(()=>{
            callAfter();
        })
}

// return absolutely new messages and updated count
function addingToNews(targetNoti, receivedNew){
    var updatedNewsCount = 0;

    // map to find in old data
    const mapExistNoti = {};
    for( var i=0; i<targetNoti.length; ++i ){
        mapExistNoti[ targetNoti[i]['nid'] ] = targetNoti[i];
    }

    var absolutelyNewNoti = [];
    for( var j=0; j<receivedNew.length; ++j ){
        const key = receivedNew[j]['nid'];
        const existNoti = mapExistNoti[key];
        if( ! existNoti ){
            absolutelyNewNoti.unshift(receivedNew[j]);
            updatedNewsCount++;
            continue;
        }
        // need to be updated
        if( existNoti.create != receivedNew[j].create ){
            updatedNewsCount++; // Update content with create different -> new news
        }
        existNoti.subject = receivedNew[j].subject;
        existNoti.description = receivedNew[j].description;
        existNoti.create = receivedNew[j].create;
        existNoti.expire = receivedNew[j].expire;
    }

    // sort by nid (time series)
    absolutelyNewNoti.sort((a, b) => {
        return b['create'].localeCompare(a['create']);
    });

    // Absolutely New to target
    targetNoti.unshift(...absolutelyNewNoti);

    // Sync with seens already
    const seens = notiStorage.getItem('DASHBOARD_NOTIFICATION_SEEN');
    for( var i=0; i<targetNoti.length; ++i ){
        const k = targetNoti[i]['nid'];
        if( ! seens[k] ) continue;
        targetNoti[i].deleted = true;
    }

    return updatedNewsCount;
}

function countUnDeleted(targetNoti){
    var c = targetNoti.length;
    for( var i=0; i<targetNoti.length; ++i ){
        if( targetNoti[i].deleted ) c--;
    }
    return c;
}

function onDeleteNewsAll(targetNoti){
    onBoxClosed(targetNoti);
}

function refreshNewNewsCount(){
    const newsCompanyCount = countUnDeleted(newsCompany.value);
    const newsEmployeeCount = countUnDeleted(newsEmployee.value);
    const totalNews = newsCompanyCount + newsEmployeeCount;

    emit("update:arriveNewNews", totalNews);
}

function onBoxClosed(box){
    // Write closed notification id into localStorage
    var seens = notiStorage.getItem('DASHBOARD_NOTIFICATION_SEEN');

    // Check overflow of localStorage by this key. so clear (it may has bug, but minor)
    if( Object.keys(seens).length > 1000 ){
        seens = {}; // clear all saved
    }

    if( box.length && ! box['nid'] ){
        const boxes = box;
        for( var i=0; i<boxes.length; ++i ){
            boxes[i].deleted = true;
            seens[boxes[i]['nid']] = true;
        }
    }else{
        seens[box['nid']] = true;
    }

    notiStorage.putItem('DASHBOARD_NOTIFICATION_SEEN', seens);

    refreshNewNewsCount();
}

const MIN_DATE = new Date("2001-01-01T00:00:00.000Z"); // NOT 1970. because we are using order key "yyMMddHHmmss"
var lastSyncedDate = new Date();

function isDevelopMode() {
    return process.env.VUE_APP_SERVER_MODE !== 'stg' && process.env.VUE_APP_SERVER_MODE !== 'prd';
}

function notificationIntervalSec(){
    return isDevelopMode() ? 300 : 30;
}

const callAfterFn = ()=>{
    // After second chance, repeat in background
    
    setTimeout(()=>{
        loadLatestNews(lastSyncedDate, callAfterFn);
        lastSyncedDate = new Date();

        // Update last sync time
        var notiCfg = notiStorage.getItem('DASHBOARD_NOTIFICATION_CONFIG');
        notiCfg.lastSyncedDate = lastSyncedDate.toISOString();
        notiStorage.putItem('DASHBOARD_NOTIFICATION_CONFIG', notiCfg);
    }, notificationIntervalSec()*1000);
};

const reloadTooltipRotate = ref(false);
function reloadNotificationForce(){
    reloadTooltipRotate.value = true;
    loadLatestNews(lastSyncedDate, ()=>{
        reloadTooltipRotate.value = false;
        lastSyncedDate = new Date();
    });
}

onMounted(() => {
    loadLatestNews(MIN_DATE, callAfterFn);
});

// ------------------------------------------------------------
const tooltipComponent = ref(null);
const tooltipUtil = ref({
    reloadTooltip(ele){
        tooltipComponent.value.loadAfterTransition(ele, ()=>{
            return 'Last update is '+ lastSyncedDate.toString();
        });
    },
    seeDelete(ele){
        tooltipComponent.value.loadAfterTransition(ele, ()=>{
            return 'See delete.';
        });
    },
});
// ------------------------------------------------------------

</script>
<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <!-- ElementsTooltipSingleton 엘리먼트는 먼저 초기화가 필요하기에 Transition 안에 있으면 안된다. -->
        <ElementsTooltipSingleton ref="tooltipComponent"/>

        <ElementsNotification 
            v-model="newNewsNotificationMessageShow" 
            :notificationMsg="newNewsNotificationMessage"
            :detailMsg="newNewsNotificationMessageDetail"
            :warning="false"
            :clickMessage="openPanel"
            :autoCloseSeconds="20"
        />

        <TransitionRoot as="template" :show="open">
            <Dialog as="div" class="relative z-10" @close="closePanel">
                <div class="fixed inset-0" />
        
                <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                        <DialogPanel class="pointer-events-auto w-screen max-w-md">
                        <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl pb-4">
                            <div class="px-4 sm:px-6">
                                <div class="flex items-start justify-between">
                                    <DialogTitle class="text-lg font-medium text-gray-900">Notifications</DialogTitle>
                                    <div class="ml-3 flex h-7 items-center">
                                        <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closePanel">
                                            <span class="sr-only">Close panel</span>
                                            <XIcon class="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-4 flex items-start justify-between">
                                    <div>
                                        <div class="sm:hidden">
                                            <label for="tabs" class="sr-only">Select a tab</label>
                                            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                                            <select id="tabs" 
                                                name="tabs" 
                                                class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                                @change="onClickCategoryTabFromSelect($event)"
                                                >
                                                <option v-for="tab in categoryTabs" 
                                                    :key="tab.name"
                                                    :value="tab.categoryKey"
                                                    :selected="tab.current">
                                                    {{ tab.name }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="hidden sm:block">
                                            <nav class="flex space-x-4" aria-label="Tabs">
                                                <a v-for="tab in categoryTabs" 
                                                    :key="tab.name" 
                                                    :href="tab.href" 
                                                    :class="[tab.current ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700', 'px-3 py-2 font-medium text-sm rounded-md']" 
                                                    :aria-current="tab.current ? 'page' : undefined"
                                                    @click="onClickCategoryTab(tab)">
                                                    {{ tab.name }}
                                                </a>
                                            </nav>
                                        </div>
                                    </div>
                                    <div class="flex flex-row mt-auto mb-auto">
                                        <div  class="mb-auto mt-auto" :ref="(el)=>{ tooltipUtil.seeDelete(el); }">
                                            <Switch v-model="seeAlsoDeleted"
                                                class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <span class="sr-only">Use setting</span>
                                                <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                                                <span aria-hidden="true" :class="[seeAlsoDeleted ? 'bg-indigo-600' : 'bg-gray-200', 'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out']" />
                                                <span aria-hidden="true" :class="[seeAlsoDeleted ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out']" />
                                            </Switch>
                                        </div>
                                        <div class="ml-3 flex h-7 items-right"
                                            :ref="(el)=>{ tooltipUtil.reloadTooltip(el); }">
                                            <button 
                                                type="button" 
                                                :class="[reloadTooltipRotate ? 'reload-notification-rotate':'','rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']" 
                                                @click="reloadNotificationForce">
                                                <RefreshIcon class="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="relative mt-2 flex-1 px-4 sm:px-6" v-show="categoryTabs[0].current">
                                <!-- Replace with your content -->
                                <div class="absolute inset-0 px-4 sm:px-6">
                                    <div class="h-full p-2 overflow-y-scroll" aria-hidden="true">
                                        <template v-if="( !seeAlsoDeleted && countUnDeleted(newsEmployee)==0 ) || (seeAlsoDeleted && newsEmployee.length==0)">
                                            <div class="flex items-start justify-center h-full">
                                                <div class="mt-auto mb-auto">
                                                    <img src="@/assets/img/icons8-open-box-64.png" class="ml-auto mr-auto" />
                                                    <span class="text-xs font-medium text-gray-400">No message</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-for="news in newsEmployee" :key="news.nid">
                                            <DashboardNotificationBox class="last:mb-0 mb-2" :box="news" v-show="!(news.deleted) || seeAlsoDeleted" v-on:boxClose="onBoxClosed" />
                                        </template>
                                        <template v-if="countUnDeleted(newsEmployee)>1">
                                            <button type="button" 
                                                class="inline-flex items-center rounded border border-transparent bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                @click="onDeleteNewsAll(newsEmployee)">
                                                Delete all
                                            </button>
                                        </template>
                                    </div>
                                </div>
                                <!-- /End replace -->
                            </div>
                            <div class="relative mt-2 flex-1 px-4 sm:px-6" v-show="categoryTabs[1].current">
                                <!-- Replace with your content -->
                                <div class="absolute inset-0 px-4 sm:px-6">
                                    <div class="h-full p-2 overflow-y-scroll" aria-hidden="true">
                                        <template v-if="( !seeAlsoDeleted && countUnDeleted(newsCompany)==0 ) || (seeAlsoDeleted && newsCompany.length==0)">
                                            <div class="flex items-start justify-center h-full">
                                                <div class="mt-auto mb-auto">
                                                    <img src="@/assets/img/icons8-open-box-64.png" class="ml-auto mr-auto" />
                                                    <span class="text-xs font-medium text-gray-400">No message</span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-for="news in newsCompany" :key="news.nid">
                                            <DashboardNotificationBox class="last:mb-0 mb-2" :box="news" v-show="!(news.deleted) || seeAlsoDeleted" v-on:boxClose="onBoxClosed" />
                                        </template>
                                        <template v-if="countUnDeleted(newsCompany)>1">
                                            <button type="button" 
                                                class="inline-flex items-center rounded border border-transparent bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                @click="onDeleteNewsAll(newsCompany)">
                                                Delete all
                                            </button>
                                        </template>
                                    </div>
                                </div>
                                <!-- /End replace -->
                            </div>
                        </div>
                        </DialogPanel>
                    </TransitionChild>
                    </div>
                </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<style scoped>
.reload-notification-rotate {
    animation: reload-notification-key .5s linear 30;
}

@keyframes reload-notification-key {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(-360deg);
    }
}
</style>