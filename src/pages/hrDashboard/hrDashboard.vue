<script>
import moment from 'moment';
import AppAside from '@/components/AppAside.vue';
import AppMain from '@/components/main/AppMain.vue';
import NoticeCompany from '@/pages/hrDashboard/dashboard_components/noticeCompany.vue';
import ManagementEmployees from '@/pages/hrDashboard/dashboard_components/managementEmployees.vue';
import RemainingLeave from './dashboard_components/remainingLeave.vue';
import NoticeHr from './dashboard_components/noticeHr.vue';
import AttendanceOverview from './dashboard_components/attendanceOverview.vue';
import TardyAbsenteeismInfo from './dashboard_components/TardyAbsenteeismInfo.vue';

// /pages/hrDashboard/dashboard_components/TardyAbsenteeismInfo.vue

export default {
    components: {
        AppAside,
        AppMain,
        NoticeCompany,
        ManagementEmployees,
        RemainingLeave,
        NoticeHr,
        AttendanceOverview,
        TardyAbsenteeismInfo,
    },
    mounted() {},
    data() {
        return {
            todayText: moment().format('dddd, MM/DD/YYYY'),

            showEmpInfo: false,
            showEmpInfo2: false,
            showNotice: false,
            showWorkView: false,
            showVacationView: false,
            showAbsenteeismView: false,
            showTardyView: false,
            showOutsideWorkView: false,
            showOtherView: false,
            memberOption: [
                {
                    text: 'IT',
                    value: 'IT',
                },
                {
                    text: 'Service',
                    value: 'Service',
                },
            ],
        };
    },
    methods: {
        openEmpInfo() {
            const self = this;
            self.showEmpInfo = true;
        },
        openEmpInfo2() {
            const self = this;
            self.showEmpInfo2 = true;
        },
        openNotice() {
            console.log('open notice -- ');
            const self = this;
            self.showNotice = true;
        },
    },
};
</script>

<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain>
            <div>
                <p class="text-[14px] text-[#2E2C34]">Dashboard</p>
                <div class="flex items-center">
                    <h1 class="text-[32px] text-[#2E2C34] font-bold">Dashboard</h1>
                    <span class="ml-2 text-[20px] text-[#4031B8]">{{ todayText }}</span>
                </div>
            </div>
            <div id="company-settings" class="flex-1 mt-9">
                <div id="setup-work-schedule" class="mt-12 w-full max-w-7xl">
                    <div class="mt-9 grid grid-cols-2 2xl:grid-cols-2 gap-10">
                        <!-- 총몇명 -->
                        <AttendanceOverview />
                        <!-- 관리가 필요한 직원 -->
                        <ManagementEmployees />
                        <!-- 5월 지각/결근 -->
                        <TardyAbsenteeismInfo />
                        <!-- 휴가 남은 내역 -->
                        <RemainingLeave />
                        <!-- 회사 공지사항 -->
                        <NoticeCompany />
                        <!-- HRnFLEX 공지사항 -->
                        <NoticeHr />
                    </div>
                </div>
            </div>
        </AppMain>
    </div>
</template>
