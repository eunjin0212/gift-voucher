<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { DotsVerticalIcon } from '@heroicons/vue/outline';

export default {
    props: {
        roleGroupList: {
            type: Array,
            default: function () {
                return [];
            },
        },
        superAdminGroup: {
            type: Array,
            default: function () {
                return [];
            },
        },
        selectedGroup: {
            type: Object,
            default: function () {
                return {
                    cmsRoleGroupSeq: '',
                    roleGroupName: '',
                    roleGroupDefaultType: '',
                    countEmployee: 0,
                };
            },
        },
    },
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        DotsVerticalIcon,
    },
    mounted() {},
    data() {
        return {};
    },
    methods: {},
};
</script>
<template>
    <div id="app" class="min-w-300 min-h-[100vh] flex cursor-default">
        <div class="overtime-policy flex w-full max-w-7xl">
            <section class="content pt-[20px] px-[31px] pb-[37px] bg-white mt-[23px] rounded shadow border">
                <p class="font-bold text-[17px] text-[#586371]">Super Admin Group</p>
                <ul class="mt-[8px] w-full">
                    <template v-for="(group, index) in superAdminGroup" :key="index">
                        <li
                            class="cursor-pointer rounded-lg py-[12px] px-[20px] border-gray-300 flex justify-between"
                            :class="[selectedGroup.cmsRoleGroupSeq === group.cmsRoleGroupSeq ? 'active bg-[#F8F8FD]' : 'bg-white']"
                            @click="$emit('selectGroup', group)">
                            <p class="truncate pr-4 w-full" :class="[selectedGroup.cmsRoleGroupSeq === group.cmsRoleGroupSeq ? 'font-bold text-[16px] text-[#4361EE]' : 'mr-2']">
                                {{ group.roleGroupName }}
                            </p>
                            <Menu as="div" class="relative inline-block text-left" v-if="$appUtil.checkPermission('ADMIN_EDIT')">
                                <div>
                                    <MenuButton class="flex items-center rounded-full text-gray-400 hover:text-gray-600">
                                        <span class="sr-only">Open Options</span>
                                        <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                                    </MenuButton>
                                </div>

                                <transition
                                    enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div class="py-1">
                                            <MenuItem v-slot="{ active }">
                                                <a
                                                    @click="$emit('openEditGroupWindow', 'Change Group Name', 'Change', group)"
                                                    href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                                    Edit
                                                </a>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </li>
                    </template>
                </ul>
                <!-- //============================================================================================================================ -->
                <p class="font-bold text-[17px] text-[#586371]">Admin Group</p>
                <ul class="mt-[8px] w-full">
                    <template v-for="(group, index) in roleGroupList" :key="index">
                        <li
                            class="cursor-pointer rounded-lg py-[12px] px-[20px] border-gray-300 flex justify-between"
                            :class="[selectedGroup.cmsRoleGroupSeq === group.cmsRoleGroupSeq ? 'active bg-[#F8F8FD]' : 'bg-white']"
                            @click="$emit('selectGroup', group)">
                            <p class="truncate pr-4 w-full" :class="[selectedGroup.cmsRoleGroupSeq === group.cmsRoleGroupSeq ? 'font-bold text-[16px] text-[#4361EE]' : 'mr-2']">
                                {{ group.roleGroupName }}
                            </p>
                            <Menu as="div" class="relative inline-block text-left" v-if="$appUtil.checkPermission('ADMIN_EDIT')">
                                <div>
                                    <MenuButton class="flex items-center rounded-full text-gray-400 hover:text-gray-600">
                                        <span class="sr-only">Open Options</span>
                                        <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                                    </MenuButton>
                                </div>

                                <transition
                                    enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div class="py-1">
                                            <MenuItem v-slot="{ active }">
                                                <a
                                                    @click="$emit('openEditGroupWindow', 'Change Group Name', 'Change', group)"
                                                    href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                                    Edit
                                                </a>
                                            </MenuItem>
                                            <MenuItem v-slot="{ active }">
                                                <a
                                                    @click="$emit('clickDeleteBtn', group.cmsRoleGroupSeq)"
                                                    href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                                    Delete
                                                </a>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </li>
                    </template>
                </ul>

                <button
                    @click="$emit('openEditGroupWindow', 'Add New Group', 'Add')"
                    class="active rounded-lg w-full p-3 bg-white border-gray-300 border-[1px] mt-[40px]"
                    v-if="$appUtil.checkPermission('ADMIN_EDIT')">
                    + Add New Group
                </button>
            </section>
        </div>
    </div>
</template>
