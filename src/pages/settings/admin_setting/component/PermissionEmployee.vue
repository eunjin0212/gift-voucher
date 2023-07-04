<script>
import ElementsSelect from "@/components/elements/ElementsSelect.vue";
import { CssClassUtil } from "@/plugins/app-util";

export default {
    props: {
        selectedGroup : {
        type : Object,
        default: () =>({
                roleGroupSeq: "",
                companySeq: "",
                roleGroupDefaultType: "SUPER_ADMIN",
                roleGroupName: "",
                countEmployee:0
            })
        }
    },
    watch: {
        selectedGroup(newGroup, oldGroup){
        this.getPermissionEmployeeList(newGroup.roleGroupSeq);
        }
    },
    computed: {
        selectedGroupName(){
            if(this.selectedGroup.roleGroupDefaultType==='SUPER_ADMIN')
                return 'Master Admin ';
            if(this.selectedGroup.roleGroupDefaultType==='ADMIN')
                return 'Head Group';
            return this.selectedGroup.roleGroupName;
        }
    },
    emits: ['afterSave'],
    components: {
        ElementsSelect,
    },
    mounted() {
        this.getDepartmentOptions();
    },
    data() {
        return {
            permissionEmployeeList : [],
            nameForSearch:'',
            serarchTimer: null,
            ////////////////////////////////////////////////////
            showEditEmployeeWindow: false,
            selectedDepartment: "ALL",
            departmentOptions: [
                {
                text: "ALL",
                value: "ALL",
                },
            ],
            searchEmployeeList: [],
        };
    },
    methods: {
        clickShowEditEmployeeBtn(){
        this.showEditEmployeeWindow=true;
        this.selectedDepartment ='ALL';
        this.nameForSearch = '';

        this.getEmployeeListBySearch();
        },
        getDepartmentOptions(){
            const self = this;

            const url = self.$api('uri', 'get-department')
            const json_query = JSON.stringify({
                showRootNode: null
            });
            self.$axios.get(url, { params : { json_query }}).then(res => {
                const optionList = res.data.data.list.map( dep => ({
                text : dep.departmentName,
                value : dep.departmentSeq
                }))
                self.departmentOptions = self.departmentOptions.concat(optionList);
            });
        },
        changeNameForSearch(){
            const self = this;
            clearTimeout(self.serarchTimer);
            self.serarchTimer = setTimeout(() => {
                self.getEmployeeListBySearch();
            }, 1000);
        },
        getEmployeeListBySearch(){
            const self = this;
            const url = self.$api("uri", "get-employee");
            let json_query = {
                limit : 50,
                offset : 0,
                departmentSeq : self.selectedDepartment=='ALL'? '' : self.selectedDepartment,
                employeeStatus :'ACTIVE',
                employeeName : self.nameForSearch,
                jobTitleSeq : null,
            }
            json_query = JSON.stringify(json_query);
            self.$axios.get(url, { params : { json_query } }).then(res => {
                const searchList = res.data.data.list ||[];
                const checkedList = self.permissionEmployeeList || [];
                self.searchEmployeeList = searchList.map(e => {
                if(checkedList.find(m => m.employeeSeq == e.employeeSeq))
                    return {...e, checked:true }
                return {...e}
                });
            });
        },
        getPermissionEmployeeList(roleGroupSeq){
            const self = this;
            const url = self.$api("uri", "get-admin-role-group-employee-bind-list")
                            .replace('{roleGroupSeq}', roleGroupSeq);

            self.$axios.get(url).then(res => {
                self.permissionEmployeeList = res.data.data.roleGroupEmployeeList || [];
            });
        },
        addPemissionEmployee(addEmployee){
            if(addEmployee.checked) return;
            this.permissionEmployeeList.push({...addEmployee});
            const searchEmployeeList = this.searchEmployeeList;
            const idx = searchEmployeeList.findIndex(e=> e===addEmployee);
            searchEmployeeList.splice(idx, 1, {...addEmployee, checked:true});
        },
        deletePermissionEmployee(deleteEmployee) {
            if(deleteEmployee==='ALL'){
                this.permissionEmployeeList = [];
                this.searchEmployeeList = this.searchEmployeeList.map(e=>{ return {...e, checked:false} });
                return;
            }
            let idx = this.permissionEmployeeList.indexOf(deleteEmployee);
            this.permissionEmployeeList.splice(idx, 1);

            const searchEmployeeList = this.searchEmployeeList;
            idx = searchEmployeeList.findIndex(e => e.employeeSeq ==deleteEmployee.employeeSeq);
            searchEmployeeList.splice(idx, 1, {...searchEmployeeList[idx], checked:false});
        },
        getColor(seq){
            return CssClassUtil.getProfileBackColor(seq);
        },
        savePermissionEmployee(){
            const self = this;

            if(self.selectedGroup.roleGroupDefaultType === 'SUPER_ADMIN' && self.permissionEmployeeList.length === 0){
                alert("Super Administoreator group must has one employee or more.");
                return;
            }
            const roleGroupSeq = self.selectedGroup.roleGroupSeq;
            const newPermissionEmployeeSeqs = self.permissionEmployeeList.map(e=>e.employeeSeq);
            const url = self.$api('uri', 'put-admin-role-group-employee-bind').replace('{roleGroupSeq}', roleGroupSeq);

            self.$axios.put(url, { employeeSeqList : newPermissionEmployeeSeqs })
                        .then(res =>{
                                self.getPermissionEmployeeList(roleGroupSeq);
                                self.showEditEmployeeWindow = false;
                                if(self.selectedGroup.roleGroupDefaultType !== 'NORMAL') {
                                self.$emit('afterSave');
                            }
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
            {{selectedGroupName}} List
        </h3>
        <span v-if="selectedGroupName == 'Head Group'" class="text-sm italic text-gray-500">*Marked as 'Head' : Employees > Profile</span>
        <button
            @click="clickShowEditEmployeeBtn"
            class="active flex rounded-lg border-gray-300 border-[1px] w-[150px] h-[32px] bg-[#fff] text-sm p-[2px]"
            v-if="selectedGroup.roleGroupDefaultType!=='ADMIN'"
        >
            <span class="leading-[32px] pr-[1px] ml-[5px]">Edit</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-[3px]"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
            </svg>
        </button>
        </div>
            <div class="p-[12px] bg-[#FDFDFD] rounded-[10px] grid grid-flow-row-dense grid-cols-3">
            <template v-for="employee in permissionEmployeeList" :key="employee.employeeSeq">
                <div class="grid grid-flow-row-dense grid-cols-3 m-2">
                <div :class="[getColor(employee.employeeSeq)]"
                    class="capital flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px]">
                    {{ employee.employeeName.substring(0, 1).toUpperCase()}}
                </div>
                <div class="col-span-2">
                        <div style="padding-right: 10px;" class="w-20">
                            <div v-if="employee.employeeStatus=='ON_LEAVE'"
                                class="border rounded-full border-blue-400 text-blue-400 text-center text-xs"
                            >
                                Inactive
                            </div>
                            <div v-else-if="employee.employeeStatus=='RESIGNED'"
                                class=" border rounded-full border-gray-400 text-gray-400 text-center text-xs w-[90px]"
                            >
                                Resigned
                            </div>
                            <div v-else-if="employee.employeeStatus=='EXTENSION_REQUIRED'"
                                class=" border rounded-full border-yellow-400 text-yellow-400 text-center text-xs w-[90px]"
                            >
                                Extension <br> Required
                            </div>
                            <div v-else-if="employee.employeeStatus=='EXTENSION_PAST_DUE'"
                                class=" border rounded-full border-red-400 text-red-400 text-center text-xs w-[90px]"
                            >
                                Contract Info <br> Required
                            </div>
                            <div v-else-if="employee.employeeStatus=='CONTRACT_INFO_REQUIRED'"
                                class=" border rounded-full border-red-400 text-red-400 text-center text-xs w-[90px]"
                            >
                                Extension <br>Past Due
                            </div>
                            <div v-else
                                class=" border rounded-full border-emerald-400 text-emerald-400 text-center text-xs"
                            >
                                Active
                            </div>
                        </div>
                    <div class="text-[14px] font-bold text-left truncate">{{ employee.employeeName }}</div>
                    <div class="subject text-[14px] font-normal truncate">{{ employee.departmentName }}</div>
                </div>
                </div>
            </template>
        </div>
    </div>
    <Teleport to="body">
        <AppPopup
            v-model="showEditEmployeeWindow"
            :name="`Members of ${selectedGroupName}`"
            buttonText="Save"
            @afterClose="getPermissionEmployeeList(selectedGroup.roleGroupSeq||'')"
            @buttonEvent="savePermissionEmployee"
        >
            <div>
                <div class="flex w-[963px] min-h-[500px]">
                    <div class="w-[379px] border-gray-300 border-r-[1px]">
                        <div class="p-[24px]">
                            <ElementsSelect
                                v-model="selectedDepartment"
                                :options="departmentOptions"
                                :full="true"
                                @change="getEmployeeListBySearch"
                                class="mt-[16px] h-[48px] rounded"
                            />
                            <input
                                type="text"
                                placeholder="Search by Name"
                                class="border-gray-300 border-[1px] rounded w-[280px] mr-[10px] w-[331px] h-[48px] mt-[16px] pl-[24px]"
                                v-model.trim="nameForSearch"
                                @keyup="changeNameForSearch"
                            />
                        </div>

                        <div class="title text-[#9CA2AB] font-medium text-[14px] border-gray-300 px-[28px] mb-2">
                            Searched Employees
                        </div>
                        <div>
                            <ul>
                                <li v-if="searchEmployeeList.length===0"
                                    class="flex items-center py-[15px] px-[31px] border-gray-300 border-y-[1px]"
                                >
                                    <div class="ml-[10px] text-gray-500 text-15">
                                        No Data
                                    </div>
                                </li>
                                <template v-for="(employee, index) in searchEmployeeList" :key="employee.employeeSeq">
                                    <li class="grid grid-rows-1 grid-cols-6 py-[8px] px-[31px] border-gray-300"
                                        :class="[index==0? 'border-y-[1px]':'border-b-[1px]']"
                                        @click="addPemissionEmployee(employee)">
                                        <div :class="[getColor(employee.employeeSeq)]"
                                            class="capital flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px]">
                                            {{employee.employeeName.substring(0, 1).toUpperCase()}}
                                        </div>
                                        <div class="ml-[10px] col-span-4">
                                            <div class="name text-[14px] font-bold">{{employee.employeeName}}</div>
                                            <div class="subject text-[14px] font-normal">{{employee.departmentName}}</div>
                                        </div>
                                        <div v-if="employee.checked" class="text-[#4361EE] text-center">
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
                            v-if="permissionEmployeeList.length===0">
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
                                <p class="text-[12px]">Checked ({{permissionEmployeeList.length}})</p>
                                <p class="text-[#F40009] text-[12px]" @click="deletePermissionEmployee('ALL')">Delete All</p>
                            </div>
                            <div class="grid grid-flow-row-dense grid-cols-1 mt-[26px]">
                                <template v-for="pE in permissionEmployeeList" :key="pE.employeeSeq">
                                    <div class="grid grid-rows-1 grid-cols-5 mb-3">
                                        <div :class="[getColor(pE.employeeSeq)]"
                                            class="capital flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px] ml-2">
                                            {{pE.employeeName.substring(0, 1).toUpperCase()}}
                                        </div>
                                        <div class="ml-[10px] col-span-3">
                                            <div class="text-[14px] font-bold text-left">{{pE.employeeName}}</div>
                                            <div class="subject text-[14px] font-normal text-left pl-2 pt-1">{{pE.departmentName}}</div>
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
