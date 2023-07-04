<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { DotsVerticalIcon } from "@heroicons/vue/outline";

export default {
    props:{
        roleGroupList : {
        type: Array,
        default: []
        },
        selectedGroup: {
        type: Object,
        defulat: {
            roleGroupSeq: "",
            companySeq: "",
            roleGroupDefaultType: "SUPER_ADMIN",
            roleGroupName: "",
            countEmployee:0
        }
        }
    },
	components: {
        Menu, MenuButton, MenuItem, MenuItems, DotsVerticalIcon
	},
	mounted() {
	},
	data(){
		return {
            showSubMenu : false,
            selectedGroupSeq: 'SUPER',
		}
	},
	methods: {
	},
    computed: {
        getSelectedGroupType(){
            return this.selectedGroup.roleGroupDefaultType;
        },
        getNomalGroupList(){
            return this.roleGroupList.filter( r => r.roleGroupDefaultType == 'NORMAL')
        },
        getSuperAdminGroup(){
            return this.roleGroupList.find( r => r.roleGroupDefaultType == 'SUPER_ADMIN')
        },
        getAdminGroup(){
            return this.roleGroupList.find( r => r.roleGroupDefaultType == 'ADMIN')
        }
    }
}
</script>
<template>
    <div id="app" class="min-w-300 min-h-[100vh] flex cursor-default">
        <div class="overtime-policy flex w-full max-w-7xl">
            <section
                class="content pt-[20px] px-[31px] pb-[37px] bg-white mt-[23px] box-style-border rounded shadow border"
            >
                <p class="font-bold text-[14px] text-[#586371]">Default User Group</p>
                <ul class="mt-[8px] w-full">
                    <li class="cursor-pointer rounded-lg py-[12px] px-[20px] border-gray-300 flex justify-between mt-[10px]"
                        :class="[getSelectedGroupType==='SUPER_ADMIN' ? 'active bg-[#F8F8FD]':'bg-white']"
                        @click="$emit('selectGroup', getSuperAdminGroup)"
                    >
                    <p :class="[getSelectedGroupType==='SUPER_ADMIN' ? 'font-bold text-[16px] text-[#4361EE]':'']">
                        Master Admin
                    </p>
                    <p :class="[getSelectedGroupType==='SUPER_ADMIN' ? 'font-bold text-[16px] text-[#4361EE]':'']">{{ getSuperAdminGroup ? getSuperAdminGroup.countEmployee : 0}}</p>
                    </li>
                    <li
                        class="cursor-pointer rounded-lg py-[12px] px-[20px] border-gray-300 flex justify-between"
                        :class="[getSelectedGroupType==='ADMIN' ? 'active bg-[#F8F8FD]':'bg-white']"
                        @click="$emit('selectGroup', getAdminGroup)"
                    >
                    <p :class="[getSelectedGroupType==='ADMIN' ? 'font-bold text-[16px] text-[#4361EE]':'']">Head Group</p>
                    <p :class="[getSelectedGroupType==='ADMIN' ? 'font-bold text-[16px] text-[#4361EE]':'']">{{ getAdminGroup ? getAdminGroup.countEmployee : 0}}</p>
                    </li>
                </ul>

                <p class="font-bold text-[14px] text-[#586371] mt-[40px]">
                    New Group(s)
                </p>
                <ul class="mt-[8px] w-full">
                    <template v-for="(group, index) in getNomalGroupList" :key="index">
                        <li
                            class="cursor-pointer rounded-lg py-[12px] px-[20px] border-gray-300 flex justify-between"
                            :class="[selectedGroup.roleGroupSeq === group.roleGroupSeq ? 'active bg-[#F8F8FD]':'bg-white']"
                            @click="$emit('selectGroup', group)"
                        >
                            <p class="truncate pr-4 w-full"
                            :class="[selectedGroup.roleGroupSeq===group.roleGroupSeq ? 'font-bold text-[16px] text-[#4361EE]':'mr-2']">
                            {{group.roleGroupName}}
                            </p>
                            <Menu as="div" class="relative inline-block text-left">
                            <div>
                                <MenuButton class="flex items-center rounded-full text-gray-400 hover:text-gray-600">
                                <span class="sr-only">Open Options</span>
                                <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                                </MenuButton>
                            </div>

                            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div class="py-1">
                                    <MenuItem v-slot="{ active }">
                                    <a
                                        @click="$emit('openEditGroupWindow', 'Change Group Name', 'Save', group)"
                                        href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                                    >
                                        Edit
                                    </a>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                    <a
                                        @click="$emit('clickDeleteBtn', group.roleGroupSeq)"
                                        href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']"
                                    >
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
                    class="active rounded-lg w-full py-[12px] bg-white border-gray-300 border-[1px] mt-[40px] border-dotted border-2"
                >
                    + Add New Group
                </button>
            </section>
        </div>
    </div>
</template>
<style scoped>
.box-style-border{
    border: 1px solid #D1D5DB;
}
</style>