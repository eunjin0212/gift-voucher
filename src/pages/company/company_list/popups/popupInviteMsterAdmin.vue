<template>
    <form form method="POST" action="submit" @submit.prevent="sendingInviteEmail" class="p-4 grid grid-cols-4 items-center gap-3">
        <div class="col-span-4 gap-5 py-3">
            <div class="font-semibold">Admin info</div>
        </div>

        <div class="col-span-1">Company Name</div>
        <div class="col-span-3">
            {{ inviteInfo.companyName }}
        </div>

        <div class="col-span-1">Admin account</div>
        <ElementsInput class="col-span-3" inputtype="email" :required="true" v-model="inviteInfo.inviteEmail" />
        <div class="col-span-4 my-2 w-full h-px bg-gray-200"></div>
        <button inputtype="submit" class="col-span-4 bg-indigo-600 py-4 text-gray-50">Invite Master Admin</button>
    </form>
    <div v-if="inviteInfo.invitedList.length > 0" class="px-4 pb-4 grid grid-cols-6 items-center gap-3">
        <div class="col-span-6 my-2 w-full h-px bg-gray-200"></div>
        <div class="col-span-6 gap-5 pt-3">
            <div class="font-semibold">Sending List</div>
        </div>
        <template v-for="(admin, idx) in inviteInfo.invitedList" :key="idx">
            <div class="col-span-2">{{ admin.inviteEmail }}</div>
            <div class="col-span-1 border border-cyan-600 text-center rounded-md py-2 cursor-pointer" @click="resendInviteEmail(admin)">resend</div>
        </template>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    emits: ['closePopup'],
    methods: {
        sendingInviteEmail() {
            const self = this;
            const url = self.$api('uri', 'post-invite-admin');

            if (self.isAlreadySendCheck()) {
                alert("This email has already been invited as an admin. Please click a 'Resend' button next to this email in the list below.");
                return;
            }

            const { companySeq, inviteEmail } = self.inviteInfo;
            const joinDate = moment().format('YYYYMMDD');
            const employeeName = inviteEmail.split('@')[0];
            const inviteForm = {
                companySeq,
                inviteEmail,
                joinDate,
                employeeName,
            };

            self.$axios
                .post(url, inviteForm)
                .then(() => {
                    alert(' invited ');
                    self.$emit('closePopup');
                })
                .catch((err) => {
                    let { code, message } = err.response.data;
                    if (code === 'HR_INVITE_INSERT_ALREADY_USED_EMAIL_400_FAILED') {
                        message = '[Duplication error] This address already exists.';
                    }
                    alert(message);
                });
        },
        isAlreadySendCheck() {
            const self = this;
            const { inviteEmail } = self.inviteInfo;

            return self.inviteInfo.invitedList.some((employee) => inviteEmail === employee.inviteEmail);
        },
        resendInviteEmail(admin) {
            const self = this;
            const inviteEmail = admin.inviteEmail;
            const employeeInviteSeq = admin.employeeInviteSeq;
            const { companySeq } = self.inviteInfo;
            const employeeName = inviteEmail.split('@')[0];
            const inviteForm = {
                companySeq,
                inviteEmail,
                employeeName,
                employeeInviteSeq,
            };

            const url = self.$api('uri', 'put-invite-admin');
            self.$axios
                .put(url, inviteForm)
                .then(() => {
                    alert(' resend ');
                })
                .catch((err) => {
                    let { code, message } = err.response.data;
                    if (code === 'HR_INVITE_INSERT_ALREADY_USED_EMAIL_400_FAILED') {
                        message = '[Duplication error] This address already exists.';
                    }
                    alert(message);
                });
        },
    },
    props: {
        modelValue: Object,
    },
    computed: {
        inviteInfo() {
            const self = this;
            return self.modelValue;
        },
    },
};
</script>
