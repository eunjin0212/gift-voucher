<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Admin Settings'">
            <p class="text-[16px] text-[#7C8493] pt-[10px]">
                You can add/remove administrators or change super administrators.
                <br />
                Please be aware of the settings as you will be accessing important
                company information.
            </p>
            <div class="overtime-policy flex w-full max-w-7xl">
            <PermissionGroup
                :roleGroupList="groupList"
                :selectedGroup="selectedGroup"
                @selectGroup="(group)=>selectedGroup=group"
                @openEditGroupWindow="openEditGroupWindow"
                @clickDeleteBtn="deleteGroup"
            />
            <section
                class="content w-[70%] ml-5 pt-[20px] px-[31px] pb-[37px] bg-white mt-[23px] box-style-border border rounded shadow"
            >
            <!-- 권한대상 & popup  -->
                <PermissionEmployee
                    :selectedGroup="selectedGroup"
                    @afterSave="getGroupList"
                />
                <EditPermissions
                    :selectedGroup="selectedGroup"
                />
            </section>
        </div>
    </AppMain>
    <Teleport to="body">
        <AppPopup
            v-model="editGroupWindow.show"
            :name="editGroupWindow.title"
            :button-text="editGroupWindow.buttonName"
            @buttonEvent="saveGroupName"
        >
            <div class="add-work-policy-popup w-[644px] py-[28px] px-[27px]">
                <p class="text-[#504F54] text-[14px] font-bold mb-[14px]">Group Name</p>
                <input
                    class="mb-[26px] border-gray-300 border-[1px] rounded-[8px] py-[11px] px-[21px] w-full truncate"
                    type="text"
                    placeholder="Enter Group name"
                    v-model="editGroupWindow.inputValue"
                    :maxlength="200"
                />
            </div>
        </AppPopup>
    </Teleport>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import PermissionGroup from "@/pages/settings/admin_setting/component/PermissionGroup.vue";
import PermissionEmployee from "@/pages/settings/admin_setting/component/PermissionEmployee.vue";
import EditPermissions from "@/pages/settings/admin_setting/component/EditPermissions.vue";

export default{
    components : {
        AppAside, AppMain, PermissionGroup, PermissionEmployee, EditPermissions
    },
    data(){
        return {
            items : ["Settings"],
    ///////////////////////////////////////////
            editGroupWindow : {
                show : false,
                title: 'Add Group',
                buttonName: 'Add',
                inputValue: '',
                selectedGroupSeq:'',
            },
            showEditEmployeeWindow : false,
            rateType : "single",
            ////////////////////////////////////////
            groupList : [],
            selectedGroup : {
                roleGroupSeq: "",
                companySeq: "",
                roleGroupDefaultType: "SUPER_ADMIN",
                roleGroupName: "",
                countEmployee:0
            }
        }
    },
    methods: {
		openEditGroupWindow(title, buttonName, group) {
			const self = this;
			self.editGroupWindow.show = true;
        self.editGroupWindow.title=title;
        self.editGroupWindow.buttonName=buttonName;
        self.editGroupWindow.inputValue= group?group.roleGroupName :'';
        self.editGroupWindow.selectedGroupSeq= group?group.roleGroupSeq :'';
		},
		openEditEmployeeWindow() {
			const self = this;
            self.showEditEmployeeWindow = true;
		},
        getGroupList() {
        const self = this;

        const url = self.$api("uri", "get-admin-permission-role-group-list")
        self.$axios.get(url)
            .then((res) => {
                self.groupList = res.data.data.permissionRoleGroupList;
                self.selectedGroup = self.groupList[0];
            })
            .catch((err) => {
                console.error('err : ', err);
            });
        },
        saveGroupName() {
                const self = this;
            const groupSeq = self.editGroupWindow.selectedGroupSeq;
            const roleGroupName = self.editGroupWindow.inputValue;


        // new gorup insert
            if( !groupSeq ){
                const url = self.$api('uri', 'post-admin-permisson-role-group');

                self.$axios.post(url, { 'roleGroupName':roleGroupName.trim()})
                            .then(res => {
                                self.getGroupList();
                                self.editGroupWindow.show = false;
                            })
                            .catch((err) => {
                                alert('Fail to save. Please try again.');
                            });
            }else{
                const url = self.$api('uri', 'put-admin-permisson-role-group').replace('{roleGroupSeq}', groupSeq);
                self.$axios.put(url, {roleGroupName})
                            .then(res => {
                                self.getGroupList();
                                self.editGroupWindow.show = false;
                            })
                            .catch((err) => {
                                alert('Fail to save. Please try again.');
                            });
            }
        }, //end saveGroupName
        deleteGroup(roleGroupSeq){
            if(!confirm('Are you sure to delete group?')) return;

            const self = this;
            const url = self.$api('uri', 'delete-admin-permisson-role-group').replace('{roleGroupSeq}', roleGroupSeq);
            self.$axios.delete(url)
                .then(res => {
                    self.getGroupList();
                })
                .catch((err) => {
                    alert('Fail to delete. Please try again.');
                });
        }
	}
}

</script>
