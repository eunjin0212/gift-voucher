<script>

export default {
    props: {
        selectedGroup : {
            type : Object,
            default: () =>({
                    cmsRoleGroupSeq: "",
                    roleGroupName: "",
                    countEmployee:0
                })
        }
    },
    watch: {
        selectedGroup(newGroup, oldGroup){
            const self = this;
            self.getPermissionEmployeeList(newGroup.cmsRoleGroupSeq);
        }
    },
    emits: ['afterSave'],
    components: {
    },
    mounted() {
    },
    data() {
        return {
            nameForSearch:'',
            permissionEmployeeList : [],
            searchEmployeeList: [],

            bindEditPopup : {
                isOpen : false,
                selectedGroup : []
            }
        };
    },
    methods: {
        clickShowEditEmployeeBtn(){
            const self = this;
            self.nameForSearch = '';

            self.getEmployeeListBySearch();
            self.bindEditPopup.selectedGroup = [ ...self.permissionEmployeeList ];
            self.bindEditPopup.isOpen=true;
        },
        changeNameForSearch(){
            const self = this;
            let searchTimer;

            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                self.getEmployeeListBySearch();
            }, 1000);
        },
        getEmployeeListBySearch(){
            const self = this;
            const url = self.$api("uri", "get-hr-admin-list");
            const json_query = { searchText : self.nameForSearch };

            const params = new URLSearchParams();
            params.append( "json_query", JSON.stringify( json_query ) );

            self.$axios.get( url, { params } )
                        .then( res => {
                            self.searchEmployeeList = res.data.data.list;
                        })
                        .catch( err =>{
                            alert(err );
                        })
        },
        getPermissionEmployeeList(cmsRoleGroupSeq){
            const self = this;
            const url = self.$api("uri", "get-role-group-employee-bind-list")
                            .replace('{roleGroupSeq}', cmsRoleGroupSeq);

            self.$axios.get(url).then(res => {
                self.permissionEmployeeList = res.data.data.list;
            });

        },
        addPemissionEmployee( selectedAdmin ){
            const self = this;
            if (self.bindEditPopup.selectedGroup.find( emp => emp.hrAdminSeq == selectedAdmin.hrAdminSeq )) {
                self.bindEditPopup.selectedGroup = self.bindEditPopup.selectedGroup
                                                        .filter(item => item.hrAdminSeq !== selectedAdmin.hrAdminSeq);
            } else {
                self.bindEditPopup.selectedGroup.push(selectedAdmin);
            }
        },
        deletePermissionEmployee( deleteEmployee ) {
            const self = this;
            if(deleteEmployee==='ALL'){
                self.bindEditPopup.selectedGroup = [];
                return;
            }
            self.bindEditPopup.selectedGroup = self.bindEditPopup.selectedGroup
                                                        .filter(item => item.hrAdminSeq !== deleteEmployee.hrAdminSeq);

        },
        savePermissionEmployee(){
            const self = this;

            const cmsRoleGroupSeq = self.selectedGroup.cmsRoleGroupSeq;
            const adminSeqList = self.bindEditPopup.selectedGroup.map( emp => emp.hrAdminSeq );

            const url = self.$api('uri', 'put-role-group-employee-bind').replace('{roleGroupSeq}', cmsRoleGroupSeq);

            self.$axios.put(url, { adminSeqList })
                        .then(res =>{
                            self.getPermissionEmployeeList(cmsRoleGroupSeq);
                            self.bindEditPopup.isOpen = false;
                        })
                        .catch( error => {
                            alert('Fail to save. Please try again.');
                        })
        },
    },
};
</script>

<template>
    <div class="mt-3.5 border-gray-300 border-[1px] rounded-[10px] min-h-300">
        <div class="flex justify-between p-[12px] border-b-[1px]">
        <h3 class="font-bold text-[18px]">
            {{ selectedGroup.roleGroupName }} List
        </h3>
        <button
            @click="clickShowEditEmployeeBtn"
            class="rounded-lg w-20 h-8 leading-[33px] bg-[#4361EE] text-[#fff] text-xs"
            v-if="$appUtil.checkPermission('ADMIN_EDIT')"
        >
            Edit
        </button>
        </div>
            <div class="p-[12px] bg-[#FDFDFD] rounded-[10px] grid grid-flow-row-dense grid-cols-3">
            <template v-for="employee in permissionEmployeeList" :key="employee.employeeSeq">
                <div class="grid grid-flow-row-dense grid-cols-3 m-2">
                <div
                    class="bg-black capital flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px]">
                    {{ employee.hrAdminName.substring(0, 1).toUpperCase()}}
                </div>
                <div class="col-span-2">
                    <div class="text-[14px] font-bold text-left truncate">{{ employee.hrAdminName }}</div>
                    <div class="subject text-[14px] font-normal truncate">{{ employee.loginId }}</div>
                </div>
                </div>
            </template>
        </div>
    </div>
    <Teleport to="body">
        <AppPopup
            v-model="bindEditPopup.isOpen"
            :name="`Members of ${selectedGroup.roleGroupName}`"
            buttonText="Save"
            @afterClose="getPermissionEmployeeList( selectedGroup.cmsRoleGroupSeq || '' )"
            @buttonEvent="savePermissionEmployee"
        >
            <div>
                <div class="flex w-[963px] min-h-[500px]">
                    <div class="w-[379px] border-gray-300 border-r-[1px]">
                        <div class="p-[24px]">
                            <input
                                type="text"
                                placeholder="Search by Name"
                                class="border-gray-300 border-[1px] rounded w-[280px] mr-[10px] w-[331px] h-[48px] mt-[16px] pl-[24px]"
                                v-model.trim="nameForSearch"
                                @keyup="changeNameForSearch"
                            />
                        </div>

                        <div class="title text-[#9CA2AB] font-medium text-[14px] border-gray-300 px-[28px] mb-2">
                            All Accounts
                        </div>
                        <div>
                            <ul>
                                <li v-if="searchEmployeeList.length===0"
                                    class="flex flex-col items-center py-[15px] px-[31px] "
                                >
                                    <div class="ml-[10px] text-gray-500 text-15">
                                        No Data
                                    </div>
                                </li>
                                <template v-for="(admin, index) in searchEmployeeList" :key="admin.hrAdminSeq">
                                    <li class="grid grid-rows-1 grid-cols-6 py-[8px] px-[31px] border-gray-300"
                                        :class="[index==0? 'border-y-[1px]':'border-b-[1px]']"
                                        @click="addPemissionEmployee(admin)"
                                    >
                                        <div
                                            class="bg-slate-600 capital flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px]">
                                            {{admin.hrAdminName.substring(0, 1).toUpperCase()}}
                                        </div>
                                        <div class="ml-[10px] col-span-4">
                                            <div class="name text-[14px] font-bold">{{admin.hrAdminName}}</div>
                                            <div class="subject text-[14px] font-normal">{{admin.loginId}}</div>
                                        </div>

                                        <div v-if="bindEditPopup.selectedGroup.find( emp => emp.hrAdminSeq == admin.hrAdminSeq )" class="text-[#4361EE] text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-12">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M4.5 12.75l6 6 9-13.5"
                                                />
                                            </svg>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>
                    <div class="employees_container mt-[15px] p-[24px]">
                        <div class="p-[24px] w-[528px] h-[289px] border-gray-300 rounded-[10px] border-[1px] text-center flex-col items-center"
                            v-if="bindEditPopup.selectedGroup.length===0">
                            <p class="text-center text-[#A8AAAC] text-[12px] mt-[90px] ml-[230px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-center">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>
                            </p>
                            <p class="text-center text-[#A8AAAC] text-[12px] mt-[10px]">
                                Click Employee
                            </p>
                        </div>
                        <div v-else class="p-[24px] mt-[20px] w-[528px] h-289 border-gray-300 rounded-[10px] border-[1px] text-center flex-col items-center">
                            <div class="flex justify-between">
                                <p class="text-[12px]">Checked ({{bindEditPopup.selectedGroup.length}})</p>
                                <p class="text-[#F40009] text-[12px]" @click="deletePermissionEmployee('ALL')">Delete All</p>
                            </div>
                            <div class="grid grid-flow-row-dense grid-cols-1 mt-[26px]">
                                <template v-for="pE in bindEditPopup.selectedGroup" :key="pE.hrAdminSeq">
                                    <div class="grid grid-rows-1 grid-cols-5 mb-3">
                                        <div
                                            class="bg-cyan-700 capital flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px] ml-2">
                                            {{pE.hrAdminName.substring(0, 1).toUpperCase()}}
                                        </div>
                                        <div class="ml-[10px] col-span-3">
                                            <div class="text-[14px] font-bold text-left">{{pE.hrAdminName}}</div>
                                            <div class="subject text-[14px] font-normal text-left pl-2 pt-1">{{pE.loginId}}</div>
                                        </div>
                                        <div class="flex items-center justify-center ml-8">
                                            <p class="text-[#8F969] text-[12px]"
                                            @click="deletePermissionEmployee(pE)">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" >
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppPopup>
    </Teleport>
</template>
