<script>
import { getInitMenuCodes } from "./PermissionCodes.js";

export default {
    props: {
        selectedGroup : {
            type : Object,
            default: function(){
                    return {
                        cmsRoleGroupSeq: "",
                        roleGroupName: "",
                        roleGroupDefaultType : "",
                        countEmployee:0
                    }
                }
        }
    },
    watch: {
        selectedGroup(newGroup, oldGroup){
            const self = this;
            self.getPermissionCodeList(self.reRenderFunctionAccessPermissions);
        }
    },
    emits: [],
    components: {},
    mounted() {
    },
    data() {
        return {
            menuCodes:[],
            hasPermissionCodeList:[],
        };
    },
    methods: {
        getPermissionCodeList(next){
            const self = this;
            const roleGroupSeq = self.selectedGroup.cmsRoleGroupSeq ||'';

            const url = self.$api('uri', 'get-permission-role-group-bind-list')
                            .replace('{roleGroupSeq}', roleGroupSeq)
            self.$axios.get(url).then(res => {
                self.hasPermissionCodeList = res.data.data.list;
                next && next();
            });
        },
        reRenderFunctionAccessPermissions(){
            const self = this;
            const menuCodes = getInitMenuCodes();

            this.hasPermissionCodeList.forEach( permission=>{
                if(permission.hasAccess === 'N') return;
                const code = permission.accessPermissionCode; // DASHBOARD_VIEW, DASHBOARD_EDIT, etc ..

                const index = menuCodes.findIndex(p=>{
                    let renderKey = Object.keys(p).find(key=>p[key] === code);
                    return !! renderKey;
                })

                menuCodes[index].checked = code;

            })// end hasPermissionCodeList

            self.menuCodes = menuCodes;
        },
        saveAccessPermission(){
            const self = this;

            const codeFormList = [];
            const hasPermissionCodeList = self.hasPermissionCodeList;

            self.menuCodes.forEach(code=>{
                if( ! code.checked ) return;
                if( code.parentBasicCode && self.menuCodes.find( e => e.basicCode==code.parentBasicCode).checked == null ) return;

                const { cmsAccessPermissionMenuRuleSeq
                        , accessPermissionType
                        , accessPermissionCode } = hasPermissionCodeList.find( p=>p.accessPermissionCode===code.checked);

                codeFormList.push({
                    cmsAccessPermissionMenuRuleSeq
                    , accessPermissionCode
                    , accessPermissionType
                })

            }) // end selectedCodes for

            const groupSeq = self.selectedGroup.cmsRoleGroupSeq;
            const url = self.$api('uri', 'put-access-permission-role-group-bind')
                            .replace('{roleGroupSeq}', groupSeq);
            self.$axios.put(url, {codeFormList})
                .then(res => {
                    alert('Success to save');
                    self.getPermissionCodeList(self.reRenderFunctionAccessPermissions)
                })
                .catch((err) => {
                    alert('Fail to save. Please try again.');
                });
        },
    },
};
</script>
<template>
    <div>
        <div class="mt-3.5 border-gray-300 border-[1px] rounded-[10px]">
            <div class="p-[12px] border-b-[1px]">
                <div class="flex justify-between ">
                    <h3 class="font-bold text-[18px]">Permissions Per Menu</h3>
                    <button
                        v-if="$appUtil.checkPermission('ADMIN_EDIT')"
                        @click="saveAccessPermission()"
                        class="rounded-lg w-[86px] h-[33px] leading-[33px] bg-[#4361EE] text-[#fff] text-[12px]"
                    >
                        Save
                    </button>
                </div>
                <div class="text-sm italic text-gray-600 mt-2" v-if="selectedGroup.roleGroupDefaultType === 'SUPER_ADMIN'">
                    Notice: for the Super Admin user group, you can only select 'View' or 'View & Edit' permission for each menu.
                </div>
            </div>
            <div class="bg-[#FDFDFD] rounded-[10px]">
                <template v-for="(code, idx) in menuCodes" :key="code.permissionName">
                    <div class="border-b flex items-center h-13 text-xs font-medium p-[12px] "
                        :class="{'rounded-[10px]':idx === menuCodes.length-1, 'bg-gray-50':code.parentBasicCode}"
                        v-if="!code.parentBasicCode||menuCodes.find(e => e.basicCode==code.parentBasicCode).checked !== null"
                    >
                        <div class="w-[20%] text-left">{{code.permissionName}}</div>
                        <div class="flex-1 text-left">
                            <label v-if="!code.disableCode||code.disableCode!='NONE'">
                                <input
                                    :disabled="!$appUtil.checkPermission('ADMIN_EDIT') || selectedGroup.roleGroupDefaultType =='SUPER_ADMIN'"
                                    :id="`${code.basicCode}-none`" type="radio" :value="null" :name="code.basicCode" v-model="code.checked"
                                    class="checked mr-2 w-6 h-6 text-[#4361EE] bg-gray-100 border-gray-300 focus:ring-white"
                                />
                                <span class="text-[#7B7E81] text-[13px]">N/A</span>
                            </label>
                        </div>
                        <div class="flex-1 text-left">
                            <label v-if="!code.disableCode||code.disableCode!='VIEW'">
                                <input
                                    :disabled="!$appUtil.checkPermission('ADMIN_EDIT')"
                                    :id="code.viewCode" type="radio" :value="code.viewCode" :name="code.basicCode" v-model="code.checked"
                                    class="mr-2 w-6 h-6 text-[#4361EE] bg-gray-100 border-gray-300 focus:ring-white"
                                />
                                <span class="text-[#7B7E81] text-[13px]">View</span>
                            </label>
                        </div>
                        <div class="flex-1 text-left">
                            <label v-if="!code.disableCode||code.disableCode!='EDIT'">
                                <input
                                    :disabled="!$appUtil.checkPermission('ADMIN_EDIT')"
                                    :id="code.editCode" type="radio" :value="code.editCode" :name="code.basicCode" v-model="code.checked"
                                    class="mr-2 w-6 h-6 text-[#4361EE] bg-gray-100 border-gray-300 focus:ring-white"
                                />
                                <span class="text-[#7B7E81] text-[13px]">View&Edit</span>
                            </label>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

