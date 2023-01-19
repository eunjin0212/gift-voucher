<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'< Company Registering'">
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <form @submit.prevent="clickSubmit">
                    <div class="my-2 flex flex-col gap-4" >
                        <div class="text-2xl font-bold"> company Information </div>
                        <ElementsInput 
                            :name="'Company Name'"
                            :width72="true"
                            :maxlength="60"
                            v-model="registerData.companyName"
                        />
                        <ElementsInput 
                            :name="'PIC Name'"
                            :full="true"
                            :maxlength="60"
                        />
                        <ElementsInput 
                            :name="'PIC Department'"
                            :full="true"
                            :maxlength="60"
                        />
                        <ElementsInput 
                            :name="'PIC Email'"
                            :full="true"
                            :inputtype="'email'"
                            :maxlength="100"
                        />
                        <ElementsInput 
                            :name="'PIC Phone number'"
                            :full="true"
                            :maxlength="60"
                            :inputtype="'number'"
                        />
                    </div>
                    <div class="my-7 flex flex-col gap-4">
                        <div class="text-2xl font-bold"> Service Usage Information </div>
                        <ElementsDate
                            :name="'Start Date'"
                            v-model="registerData.startDate"
                        />
                        <ElementsDate
                            :name="'End Date'"
                            v-model="registerData.endDate"
                        />
                        <div>
                            <h1 class="text-sm font-semibold text-slate-800"> Number of Employee </h1>
                            <input type="number"
                                class="w-44 mt-1 shadow-sm block sm:text-sm border-gray-300 rounded-md"    
                                :min="1"
                                v-model="registerData.numOfEmp"
                            />
                        </div>
                        <ElementsDate
                            :name="'Use Fee Deposit Date'"
                            v-model="registerData.feeDepositDate"
                        />
                        <ElementsSelect
                            :name="'FlexBen Type'"
                            :full="true"
                            :options="flexbenTypeOptions"
                            v-model="registerData.flexbenType"
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
                            :inputtype="'submit'"    
                        />
                    </div>
                </form>
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
        clickSubmit(){
            const self = this;
            // if( ! self.validationCheck() ) {
            //     alert( "Can’t be blank");
            //     return;
            // }

        },
        validationCheck(){
            const self = this;
            let isValid = true;
            Object.entries(self.registerData).forEach( ( [ key, value] ) => {
                console.log( `key : ${key}, value : ${value}`);
                if( ! value ){
                    isValid = false; 
                    console.log( {key} )
                    return;
                }
            });
            console.log( isValid );
            return isValid;
        }
    },
    data() {
        return{
            flexbenTypeOptions : [],
            startDate : new Date(),
            registerData : {
                companyName : null,
                startDate : new Date(),
                endDate : new Date(),
                numOfEmp : 1,
                feeDepositDate : new Date(),
                flexbenType : ""
            }
        }
    },
    mounted(){
        const self = this;
        self.getFlexbenType();
    }
}
</script>