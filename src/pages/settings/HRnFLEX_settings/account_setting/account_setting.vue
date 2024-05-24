<template>
    <div>
        <div class="flex justify-between py-3">
            <h1 class="text-zinc-800 text-xl font-semibold leading-10 items-center ">HRnFLEX Account </h1>
            <ElementsButton
                :text="'+ Add'"
                :width32="true"
                @click-event="openAddAccount()"
                v-if="$appUtil.checkPermission('ACCOUNT_EDIT')"
            />
        </div>
        <div class="">
            <div class="mt-6 overflow-auto pb-[20vh] md:rounded-lg  ">
                <table class="divide-y divide-gray-300 w-full shadow border-[1px] border-black border-opacity-10">
                    <thead class="bg-[#F8F8FD] ">
                        <tr>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Date</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Account Name</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Admin</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Memo</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900"> <span class="sr-only"> Edit </span> </th>
                        </tr>
                    </thead>
                    <tbody class=" bg-white">
                        <tr v-for="(admin, index) in adminList" v-bind:key="index"
                            :class="{ 'bg-[#F8F8FD]': (index % 2 !== 0) }"
                        >
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{  dateFormatChange(admin.regDate) }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{  admin.hrAdminName }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{  admin.loginId }} </td>
                            <td class="whitespace-normal px-3 py-4 text-sm text-center text-gray-900"> {{  admin.accountMemo }} </td>
                            <td class="whitespace-nowrap  text-sm text-gray-900 pr-3">

                                <Menu as="div" class="relative inline-block text-left"
                                    v-if="$appUtil.checkPermission('ACCOUNT_EDIT')"
                                >
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
                                                <MenuItem v-slot="{ active }" @click="openEditAccount(admin)">
                                                    <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                                        Edit
                                                    </div>
                                                </MenuItem>
                                                <MenuItem v-slot="{ active }" @click="deleteThisAccount(admin)">
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
        </div>
        <Teleport to="body">
            <AccountPopup
                v-model="accountPopup.isOpen"
                :execute-type="accountPopup.executeType"
                :adminData="accountPopup.data"
                @create="createAccount"
                @change="editAccount"
            />
        </Teleport>
    </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { DotsVerticalIcon  } from '@heroicons/vue/solid'
import moment from 'moment';
import AccountPopup from './account_popup.vue';

export default{
    components : {
        Menu, MenuButton, MenuItem, MenuItems, DotsVerticalIcon,
        AccountPopup
    },
    data(){
        return{
            adminList : [],
            accountPopup : {
                isOpen : false,
                data : {},
                executeType : "CREATE"
            }
        }
    },
    methods : {
        getAdminList(){
            const self = this;
            const json_query = { searchText : null };

            const params = new URLSearchParams();
            params.append( "json_query", JSON.stringify( json_query ) );

            const url = self.$api("uri", "get-hr-admin-list");
            self.$axios.get( url, { params } )
                        .then( res => {
                            self.adminList = res.data.data.list;
                        })
                        .catch( err =>{
                            alert(err );
                        })
        },
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
        openAddAccount(){
            const self = this;
            self.accountPopup.isOpen = true;
            self.accountPopup.executeType = "CREATE";
        },
        openEditAccount( selectedData ){
            const self = this;
            self.accountPopup.isOpen = true;
            self.accountPopup.executeType = "EDIT";
            self.accountPopup.data = selectedData;
        },
        createAccount( {accountMemo, loginPwd ,loginId ,hrAdminName} ){
            const self = this;
            const url = self.$api("uri", "post-hr-admin");
            const registerData = {accountMemo, loginPwd ,loginId ,hrAdminName}
            self.$axios.post( url, registerData)
                .then( res => {
                    self.accountPopup.isOpen = false;
                    self.getAdminList();
                })
                .catch( err => {
                    alert( err.response.data.message);
                })
        },
        editAccount( { hrAdminSeq, hrAdminName, loginId, accountMemo } ){
            const self = this;
            const url = self.$api("uri", "put-hr-admin");
            const editData = { hrAdminSeq, hrAdminName, loginId, accountMemo };

            self.$axios.put( url , editData )
                .then( res => {
                    self.accountPopup.isOpen = false;
                    self.getAdminList();
                })
                .catch( err => {
                    alert("Fail To update");
                })
        },
        deleteThisAccount( { hrAdminSeq, loginId } ){
            const self =this;
            const currentSignOn = window.logOnProfile.data.hrAdminSeq;
            if( hrAdminSeq === currentSignOn ){
                alert( "Can't delete your id ");
                return;
            }

            const deleteData = { hrAdminSeq, loginId };

            const url = self.$api("uri", "delete-hr-admin" );
            self.$axios.delete( url, { data : deleteData } )
                .then( res => {
                    alert("Success to delete ");
                    self.getAdminList();
                })
                .catch( err => {
                    alert("Failed to delete");
                })
        }
    },
    mounted(){
        const self = this;
        self.getAdminList();
    }

}
</script>