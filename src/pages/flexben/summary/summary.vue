<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'FlexBen'">
            <div class="mt-2 pt-3 w-full max-w-7xl flex flex-col">
                <PointSummary/>
                <div class="mt-4 grid grid-cols-2 gap-4">
                    <PointStatus
                    />
                    <RankTopUp />
                </div>

            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import PointSummary from "@/pages/flexben/summary/components/pointSummary.vue"
import RankTopUp from "@/pages/flexben/summary/components/rankTopup.vue"
import PointStatus from "@/pages/flexben/summary/components/pointStatus.vue"

export default {
    components : {
        AppAside, AppMain, PointSummary, RankTopUp, PointStatus
    },
    data(){
        return {
        }
    },
    methods : {

    },
    mounted(){
    }
}

</script>