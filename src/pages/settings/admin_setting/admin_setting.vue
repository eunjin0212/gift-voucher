<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Admin Settings'">
            <p class="text-[16px] text-[#7C8493] pt-[10px]">
                You can add/remove administrators or change super administrators.
                <br />
                Please be aware of the settings as you will be accessing important company information.
            </p>
            <div class="overtime-policy flex w-full max-w-7xl">
                <PermissionGroup
                    :roleGroupList="groupList"
                    :selectedGroup="selectedGroup"
                    :superAdminGroup="superAdminGroup"
                    @selectGroup="(group) => (selectedGroup = group)"
                    @openEditGroupWindow="openEditGroupWindow"
                    @clickDeleteBtn="deleteGroup" />
                <section class="content w-[70%] ml-5 pt-[20px] px-[31px] pb-[37px] bg-white mt-[23px] box-style-border border rounded shadow">
                    <PermissionEmployee :selectedGroup="selectedGroup" @afterSave="getGroupList" />
                    <EditPermissions :selectedGroup="selectedGroup" />
                </section>
            </div>
        </AppMain>
        <Teleport to="body">
            <AppPopup v-model="editGroupWindow.show" :name="editGroupWindow.title" :button-text="editGroupWindow.buttonName" @buttonEvent="saveGroupName">
                <div class="add-work-policy-popup w-[644px] py-[28px] px-[27px]">
                    <p class="text-[#504F54] text-[14px] font-bold mb-[14px]">Group Name</p>
                    <ElementsInput
                        v-model="editGroupWindow.inputValue"
                        placeholder="Enter Group name"
                        :height11="true"
                        :maxlength="50"
                        class="flex-1"
                        :error="errorMessage.editGroupWindowInputValue"
                        :full="true"
                    />
                </div>
            </AppPopup>
        </Teleport>
    </div>
</template>

<script>
import AppAside from '@/components/AppAside.vue';
import AppMain from '@/components/main/AppMain.vue';
import PermissionGroup from '@/pages/settings/admin_setting/component/PermissionGroup.vue';
import PermissionEmployee from '@/pages/settings/admin_setting/component/PermissionEmployee.vue';
import EditPermissions from '@/pages/settings/admin_setting/component/EditPermissions.vue';

export default {
    components: {
        AppAside,
        AppMain,
        PermissionGroup,
        PermissionEmployee,
        EditPermissions,
    },
    data() {
        return {
            items: ['Settings'],
            ///////////////////////////////////
            editGroupWindow: {
                show: false,
                title: 'Add Group',
                buttonName: 'Add',
                inputValue: '',
                cmsRoleGroupSeq: '',
            },
            showEditEmployeeWindow: false,
            rateType: 'single',
            ////////////////////////////////////////
            groupList: [],
            superAdminGroup: [],
            selectedGroup: {
                cmsRoleGroupSeq: '',
                roleGroupName: '',
                roleGroupDefaultType: '',
                countEmployee: 0,
            },
            errorMessage: {
                editGroupWindowInputValue: null
            }
        };
    },
    mounted() {
        const self = this;
        self.getGroupList();
    },
    methods: {
        openEditGroupWindow(title, buttonName, group) {
            const self = this;
            self.editGroupWindow.show = true;
            self.editGroupWindow.title = title;
            self.editGroupWindow.buttonName = buttonName;
            self.editGroupWindow.inputValue = group?.roleGroupName || '';
            self.editGroupWindow.cmsRoleGroupSeq = group?.cmsRoleGroupSeq || '';
        },
        openEditEmployeeWindow() {
            const self = this;
            self.showEditEmployeeWindow = true;
        },
        getGroupList() {
            const self = this;

            const url = self.$api('uri', 'get-permission-role-group-list');
            self.$axios
                .get(url)
                .then((res) => {
                    self.groupList = res.data.data.list.filter((group) => group.roleGroupDefaultType == 'NORMAL');
                    self.superAdminGroup = res.data.data.list.filter((group) => group.roleGroupDefaultType == 'SUPER_ADMIN');
                    self.selectedGroup = self.superAdminGroup[0];
                })
                .catch((err) => {
                    console.error('err : ', err);
                });
        },
        saveGroupName() {
            const self = this;

            self.resetErrorMessage();
            if (self.editGroupWindow.inputValue == null) {
                return;
            }

            if (self.editGroupWindow.inputValue.length < 1 || self.editGroupWindow.inputValue.length > 50) {
                self.errorMessage.editGroupWindowInputValue = 'The group name must be at least 1 character and up to 50 characters.';
                return;
            }

            const cmsRoleGroupSeq = self.editGroupWindow.cmsRoleGroupSeq;
            const roleGroupName = self.editGroupWindow.inputValue;
            const updateData = { roleGroupName };

            // new gorup insert
            if (!cmsRoleGroupSeq) {
                const url = self.$api('uri', 'post-permission-role-group');

                self.$axios
                    .post(url, updateData)
                    .then((res) => {
                        self.getGroupList();
                        self.editGroupWindow.show = false;
                    })
                    .catch((err) => {
                        alert('Fail to save. Please try again.');
                    });
            } else {
                const url = self.$api('uri', 'put-permission-role-group').replace('{roleGroupSeq}', cmsRoleGroupSeq);
                self.$axios
                    .put(url, updateData)
                    .then((res) => {
                        self.getGroupList();
                        self.editGroupWindow.show = false;
                    })
                    .catch((err) => {
                        alert('Fail to save. Please try again.');
                    });
            }
        }, //end saveGroupName
        deleteGroup(roleGroupSeq) {
            if (!confirm('Are you sure to delete group?')) return;

            const self = this;
            const url = self.$api('uri', 'delete-permission-role-group').replace('{roleGroupSeq}', roleGroupSeq);
            self.$axios
                .delete(url)
                .then((res) => {
                    self.getGroupList();
                })
                .catch((err) => {
                    alert('Fail to delete. Please try again.');
                });
        },
        resetErrorMessage() {
            const self = this;
            self.errorMessage.editGroupWindowInputValue = null;
        }
    },
};
</script>
