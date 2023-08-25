<script setup>
import { inject, reactive, ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { CogIcon } from "@heroicons/vue/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import AppPopup from "@/components/AppPopup.vue";
import { ValidateUtil } from "@/plugins/app-util.js";
import DashboardNotifications from "@/components/main/notification/DashboardNotifications.vue";

if (!window.logOnProfile) {
    location.href = "/login";
}

const $api = inject("api");
const $axios = inject("axios");

const username = ValidateUtil.over15CharFromFullName(window.logOnProfile.data.hrAdminName);

const popup = reactive({
    showLogoutPopup: ref(false),
});

const notificationList = reactive({
    show: ref(false),
    countNewNews: ref(0),
});

function logout() {
    const url = $api("uri", "post-sign-out");

    $axios
        .post(url)
        .then((res) => {
            location.href = "/";
            console.log("res : ", res.data);
        })
        .catch((err) => {
            alert("Sign out failed. Please sign out again.");
            console.error(err);
        });
}

function clickViewNotifications(){
    notificationList.show = true;
}

function clickTestingTools(){
    location.href = "/test_tools/message_q";
}

let profileString = username.substr(0, 1);

function enableTestTools(){
    return ! (process.env.VUE_APP_SERVER_MODE === 'prd');
}

</script>

<template>
    <div
        id="main-header"
        class="fixed top-0 left-0 border border-gray-200 px-3 py-1.5 w-full h-16 bg-white flex justify-end items-center gap-5 z-10"
    >
        <!-- Testing tool settings for local and staging only -->
        <a  class="border rounded-full border-gray-200 w-12 h-12 bg-white flex justify-center items-center transition-all duration-500s hover:bg-gray-100"
            href="javascript:void(0)"
            v-show="enableTestTools() === true"
            @click="clickTestingTools"
        >
            <CogIcon class="h-6 w-6" aria-hidden="true"/>
        </a>
        <!-- 알람 이미지 -->
        <DashboardNotifications v-model:open="notificationList.show" v-model:arriveNewNews="notificationList.countNewNews"/>
        <a  class="border rounded-full border-gray-200 w-12 h-12 bg-white flex justify-center items-center transition-all duration-500s hover:bg-gray-100"
            href="javascript:void(0)"
            @click="clickViewNotifications"
        >
            <img src="@/assets/img/main-header-1.svg" v-if="notificationList.countNewNews > 0"/>
            <img src="@/assets/img/main-header-1-empty.svg" v-if="notificationList.countNewNews == 0"/>
        </a>
        <Menu as="div" class="relative inline-block text-left">
            <div>
                <MenuButton
                    class="flex justify-between w-full rounded-lg border transition-all hover:bg-gray-100 items-center gap-2 duration-500 border-gray-200 shadow-sm px-3 py-2 h-full bg-white text-sm font-medium text-gray-700"
                >
                    <div
                        class="w-8 h-8 inline-flex rounded-full bg-zinc-100 items-center overflow-hidden"
                    >
                        <div
                            class="inline-flex items-center justify-center h-24 w-24 rounded-full bg-zinc-300"
                        >
                            <span
                                v-if="username"
                                class="text-lg font-normal text-white flex justify-center items-center leading-none"
                                >{{ profileString }}
                            </span>
                        </div>
                    </div>
                    <span
                        class="flex-1 text-lg font-medium"
                        v-text="username"
                    ></span>
                    <ChevronDownIcon class="-mr-1 h-5 w-5" aria-hidden="true" />
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
                <MenuItems
                    class="fixed right-4 border mt-2 w-56 rounded shadow-md shadow-gray-200 border-gray-200 bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                >
                    <div>
                        <!-- <MenuItem v-slot="{ active }">
                            <a
                                href="javascript:void(0)"
                                :class="[
                                    active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                    'p-5 text-sm font-bold flex gap-3 transition-all duration-500s hover:bg-gray-100',
                                ]"
                                @click="clickMyProfile"
                                ><img
                                    src="@/assets/img/main-header-3.svg"
                                    alt="main-header-3"
                                />
                                <span>Change of password</span></a
                            >
                        </MenuItem> -->
                        <MenuItem v-slot="{ active }">
                            <a
                                href="javascript:void(0)"
                                :class="[
                                    active
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-700',
                                    'border-t border-gray-200 p-5 text-sm font-bold flex gap-3 transition-all duration-500s hover:bg-gray-100',
                                ]"
                                @click="popup.showLogoutPopup = true"
                            >
                                <img
                                    src="@/assets/img/main-header-4.svg"
                                    alt="main-header-4"
                                /><span>Log out</span></a
                            >
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
    <Teleport to="body">
        <AppPopup
            v-model="popup.showLogoutPopup"
            name="Logout"
            button-text="OK"
            @button-event="logout"
        >
            <div class="p-6 space-y-6 text-center">Are you sure to logout?</div>
        </AppPopup>
    </Teleport>
</template>
