<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'< Company Registering'">
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <div class="my-2 flex flex-col gap-4">
                    <div class="text-2xl font-bold"> company Information </div>
                    <ElementsInput 
                        :name="'Company Name'"
                        :full="true"
                        :maxlength="60"
                    />
                    <!-- <ElementsInput 
                        :name="'Admin Name'"
                        :full="true"
                        :maxlength="60"
                    />
                    <ElementsInput 
                        :name="'Admin Department'"
                        :full="true"
                        :maxlength="60"
                    />
                    <ElementsInput 
                        :name="'Admin Email'"
                        :full="true"
                        :maxlength="100"
                    />
                    <ElementsInput 
                        :name="'Admin Phone number'"
                        :full="true"
                        :maxlength="60"
                    /> -->
                </div>
                <div class="my-7 flex flex-col gap-4">
                    <div class="text-2xl font-bold"> Service Usage Information </div>
                    <ElementsDate
                        :name="'Start Date'"
                    />
                    <ElementsDate
                        :name="'End Date'"
                    />
                    <div>
                        <h1 class="text-sm font-semibold text-slate-800"> Number of Employee </h1>
                        <input type="number"
                            class="w-full mt-1 shadow-sm block sm:text-sm border-gray-300 rounded-md"    
                            :min="0"
                        />
                    </div>
                    <ElementsDate
                        :name="'Use Fee Deposit Date'"
                    />
                    <ElementsSelect
                        :name="'FlexBen Type'"
                        :full="true"
                        :options="flexbenTypeOptions"
                    />
                </div>
                <div class="flex justify-end gap-4 my-3">
                    <ElementsButton 
                        :backgroundWhite="true" :width32="true"
                        :text="'Cancel'"
                    />
                    <ElementsButton 
                        :width32="true"
                        :text="'submit'"    
                    />
                </div>
            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";

export default {
    components : {
        AppAside, AppMain
    },
    methods:{
        getFlexbenType(){
            const self = this;
            const url = self.$api("uri", "get-flexben-campaign-List");
            self.$axios.get( url )
                .then( res => {
                    self.flexbenTypeOptions= res.data.data.list.map(( { bizCampaignId, flexbenCampaignSeq, flexbenCampaignTitle}) =>({
                            text : flexbenCampaignTitle,
                            value : flexbenCampaignSeq,
                            bizCampaignId
                        })
                    );
                })

        },
    },
    data() {
        return{
            flexbenTypeOptions : [],
        }
    },
    mounted(){
        const self = this;
        self.getFlexbenType();
    }
}
</script>