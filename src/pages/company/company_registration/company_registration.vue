<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Add Company'">
            <div class="grid grid-cols-4 mt-8 gap-1">
                <div class="col-span-1">
                    <div class="flex flex-col">
                        <div class="flex flex-col gap-y-5 overflow-y-auto pr-6">
                            <nav class="flex flex-1 flex-col">
                                <ul role="list" class="flex flex-1 flex-col gap-y-7  ">
                                    <li class="border-gray-300 rounded-sm border-[1px] bg-white">
                                        <ul role="list" class="divide-y divide-gray-300">
                                            <li v-for="step in registerTab" :key="step.name" class="divide-x-[1px]">
                                                <a
                                                    :href="step.href"
                                                    :class="[ currentStep == step.value ? ' text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md py-4 px-4 text-sm leading-6 font-semibold']"
                                                >
                                                    <span v-if="step.checked" class="bg-indigo-600 text-indigo-600 border-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl border text-[0.625rem] font-medium bg-white']"
                                                    >
                                                        <CheckIcon class="w-3 text-white"/>
                                                    </span>
                                                    <span v-else class="text-gray-400 border-gray-200 flex h-6 w-6 shrink-0 items-center justify-center rounded-2xl border text-[0.625rem] font-medium bg-white">
                                                        {{ step.initial }}
                                                    </span>
                                                    <span class="truncate text-base">{{ step.text }}</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="col-span-3">
                    <CompanyInformation
                        v-show="currentStep==registerTab[0].value"
                        @next-step="goToUsageInformation"
                        @back-to-list="backToList"
                        v-model:contractFile="contractFile"
                    />
                    <UsageInformation
                        v-show="currentStep==registerTab[1].value"
                        @back-step="backToCompanyInformation"
                        @submit-register="registerCompany"
                        @back-to-list="backToList"
                    />
                </div>
            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import CompanyInformation from "@/pages/company/company_registration/register_step/company_information.vue"
import UsageInformation from "@/pages/company/company_registration/register_step/usage_information.vue"
import { CheckIcon } from "@heroicons/vue/solid"

export default {
    components : {
        AppAside, AppMain, CheckIcon, CompanyInformation, UsageInformation
    },
    methods:{
        clickTabs( tab ){
            const self = this;
            self.currentStep = tab.value;
        },
        goToUsageInformation( companyInformation ){
            const self = this;
            self.companyRegisterData = { ...companyInformation };

            self.clickTabs( self.registerTab[1] );
            self.registerTab[1].checked = true;
        },
        backToCompanyInformation(){
            const self = this;
            self.clickTabs( self.registerTab[0] );
            self.registerTab[1].checked = false;
        },
        async registerCompany( usageInformation ){
            const self = this;

            let contractFilePath;
            try {
                contractFilePath = await self.submitDocumentFiles();
            }catch{
                alert( "Fail to file upload");
                return;
            }

            self.companyRegisterData = { ...self.companyRegisterData,
                                        ...usageInformation, contractFilePath };

            console.log( "submit" );
            const url = self.$api("uri", "post-company" );
            self.$axios.post( url , self.companyRegisterData )
                .then( () => {
                    alert("success to register company" )
                    location.href = "/company/company_list";
                })
                .catch( alert )

        },
        submitDocumentFiles(){
            const self = this;

            const url = self.$api("uri", "post-file-direct-upload" );
            const { file, name } = self.contractFile;
            let form = new FormData();
            form.append( `uploadFile1` , file );
            form.append( `uploadFileName1` , name );

            return self.$axios.post( url, form, { headers : {'Content-Type' : 'multipart/form-data;'} })
                            .then( res => res.data.data.uploadFile1 );
        },
        backToList(){
            location.href="/company/company_list";
        },
    },
    data() {
        return{
            registerTab :
                [
                    {  text: 'Company Information', href: '#company_information'
                        , initial: '01', value : "COMPANY_INFORMATION", checked : true },
                    {  text: 'Service Usage Information', href: '#usage_information'
                        , initial: '02', value : "USAGE_INFORMATION", checked : true },
                ],
            currentStep : "COMPANY_INFORMATION",
            contractFile : null,
            companyRegisterData : {}
        }
    },
    mounted(){
    }
}
</script>