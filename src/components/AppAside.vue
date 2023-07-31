<script setup>
import { ref, reactive, onMounted, inject } from "vue";
const { checkPermissionArray, checkPermission } = inject( 'appUtil' )

const show = ref(true);

const COMPANY_SETTINGS = ['COMPANY_SETTING_VIEW', 'COMPANY_SETTING_EDIT'
                        , 'COMPANY_SUSPENDED_VIEW', 'COMPANY_SUSPENDED_EDIT'];

const FLEXBEN_SETTING = ['FLEXBEN_SETTING_VIEW', 'FLEXBEN_SETTING_EDIT'];
const FLEXBEN_EXECUTE = ['FLEXBEN_EXECUTE_VIEW', 'FLEXBEN_EXECUTE_EDIT'];

const FLEXBEN_PERMISSIONS = [ 'FLEXBEN_SUMMARY_EDIT'
                            ,'FLEXBEN_EXECUTE_VIEW', 'FLEXBEN_EXECUTE_EDIT'
                            ,'FLEXBEN_EXECUTE_VIEW', 'FLEXBEN_EXECUTE_EDIT'
                            ,'FLEXBEN_SETTING_VIEW', 'FLEXBEN_SETTING_EDIT'
                            ];

const HRnFLEX_SETTING = [ 'NOTICE_VIEW','NOTICE_EDIT'
                        ,'ACCOUNT_VIEW','ACCOUNT_EDIT'
                        ,'SYSTEM_MAINTENANCE_VIEW','SYSTEM_MAINTENANCE_EDIT'
                        ,'HOLIDAY_VIEW','HOLIDAY_EDIT'];

const ADMIN_SETTING = [ 'ADMIN_EDIT','ADMIN_VIEW'];

let items = reactive([
    {
        href: "/admin_dashboard",
        img: "app-side-1",
        text: "Summary",
        hasPermission : true
    },
    {
        href: "/inquiry",
        img: "app-side-3",
        text: "Activate Process",
        hasPermission : true
    },
    {
        href: "/company/company_list",
        img: "app-side-2",
        text: "Company",
        hasPermission : checkPermissionArray(COMPANY_SETTINGS),
    },
    {
        href: "/report",
        img: "app-side-4",
        text: "Report",
        hasPermission : checkPermission('FLEXBEN_REPORT_EDIT')
    },
    {
        children: true,
        img: "app-side-6",
        text: "FlexBen",
        hasPermission : checkPermissionArray( FLEXBEN_PERMISSIONS )
    },
    {
        parent: "app-side-6",
        show: false,
        href: "/flexben/summary",
        text: "Summary",
        hasPermission : checkPermission('FLEXBEN_SUMMARY_EDIT')
    },
    {
        parent: "app-side-6",
        show: false,
        href: "/flexben/topup_deduct",
        text: "Top-up/Deduct",
        hasPermission : checkPermissionArray( FLEXBEN_EXECUTE )
    },
    {
        parent: "app-side-6",
        show: false,
        href: "/flexben/settings",
        text: "FlexBen Settings",
        hasPermission : checkPermissionArray( FLEXBEN_SETTING )
    },
    {
        children: true,
        img: "app-side-7",
        text: "Setting",
        hasPermission : checkPermissionArray( ADMIN_SETTING ) || checkPermissionArray( HRnFLEX_SETTING )
    },
    {
        parent: "app-side-7",
        show: false,
        href: "/settings/HRnFLEX_settings",
        text: "HRnFLEX Settings",
        hasPermission : checkPermissionArray( HRnFLEX_SETTING )
    },
    {
        parent: "app-side-7",
        show: false,
        href: "/settings/admin_setting",
        text: "Admin Settings",
        hasPermission : checkPermissionArray( ADMIN_SETTING )
    },
]);

onMounted(() => {
    const splitPathPure = window.location.pathname;

    const page = `${splitPathPure}`;
    let parent = "";

    items.forEach((item, index) => {

        var isEq = item["href"] && (item["href"] === (page) || item["href"]+'/' === (page));
        if( typeof item["href_sub"] === 'object' && item["href_sub"].length ){
            const find1 = item["href_sub"].find((element) => {
                return (element === (page) || element+'/' === (page));
            });
            if( find1 ) isEq = true;
        }

        if (isEq) {
            items[index]["show"] = true;
            items[index]["isCurrentHref"] = true;
            parent = item["parent"];
        }
    });

    items.forEach((item, index) => {
        if (item["parent"] === parent) {
            items[index].show = true;
        }
    });
});

function clickItem(item) {
    if( ! item.children ){
        location.href = item.href;
        return;
    }

    const parent = item.img;
    items.forEach((item, index) => {
        if (item["parent"] === parent) {
            const show = items[index]["show"];
            items[index].show = !show;
        }
    });
}

function clickShowButton() {
    show.value = !show.value;
}
</script>

<template>
    <div
        id="app-aside"
        class="p-2.5 w-64 blu transition-all duration-500 z-20 max-h-screen overflow-auto"
        :class="{ 'p-0': !show, 'w-0': !show }"
    >
        <div
            class="border-b border-indigo-400 h-20 flex justify-center items-center gap-2"
        >
            <img src="@/assets/img/hrnflex_wh_logo.png" alt="white_logo" class="h-5" />
            <h1 class="text-2xl font-bold text-white whitespace-nowrap"></h1>
        </div>
        <div class="mt-5">
            <template v-for="(item, index) in items" v-bind:key="index">
                <a
                    v-if="item.hasPermission"
                    v-show="!item.parent || item.show"
                    class="block h-12 rounded-md flex items-center blu-hover transition-all duration-500 cursor-pointer"
                    :class="{ 'mt-4': index > 0, 'blu-dark': item['isCurrentHref'] }"
                    @click="clickItem(item)"
                >
                    <img
                        v-if="item.img"
                        class="ml-4"
                        :src="require(`@/assets/img/${item.img}.svg`)"
                        :alt="item.img"
                        width="18"
                    />
                    <span
                        class="flex-1 ml-4 text-base font-semibold text-white whitespace-nowrap"
                        :class="{ 'ml-12': !item.img }"
                        >{{ item.text }}</span
                    >
                    <img
                        v-show="
                        item.children && items.find((item2) => item2.parent === item.img && item2.show)
                        "
                        class="mr-5"
                        :src="require(`@/assets/img/app-side-8.svg`)"
                        alt="app-side-8"
                    />
                    <img
                        v-if="item.children && items.find((item2) => item2.parent === item.img && !item2.show)"
                        class="mr-5"
                        :src="require(`@/assets/img/app-side-10.svg`)"
                        alt="app-side-10"
                    />
                </a>
            </template>
        </div>
        <Teleport to="body">
            <a
                class="absolute top-2 translate-x-72 border rounded-lg border-gray-200 w-12 h-12 bg-white flex justify-center items-center transition-all duration-500 cursor-pointer hover:bg-gray-100 z-20"
                :class="{ 'translate-x-4': !show }"
                href="javascript:void(0)"
                @click="clickShowButton"
            >
                <img
                    :class="{ 'rotate-180': !show }"
                    src="@/assets/img/app-side-9.svg"
                    alt="app-side-9"
                />
                <img
                    :class="{ 'rotate-180': !show }"
                    src="@/assets/img/app-side-9.svg"
                    alt="app-side-9"
                />
            </a>
        </Teleport>
    </div>
</template>
<style scoped>
    .blu{
        background: #4361EE;
    }
    .blu-dark{
        background: #334cba;
    }
    .blu-hover:hover{
        background: #334cba;
    }
    .blu-text{
        color:#4361EE;
    }
</style>