<template>
    <div
        v-show="modelValue"
        class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
    >
        <div class="border rounded-lg shadow shadow-gray-100 bg-white">
            <div class="px-7 py-6 flex justify-between items-center">
                <h2 class="text-xl font-bold"> Edit company's campagin </h2>
                <a
                    href="javascript:void(0)"
                    class="ml-20"
                    @click="hidePopup"
                >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                </a>
            </div>
            <div class="w-full h-px bg-gray-200"></div>

            <div v-if="editSteps.find( step => step.id ==='VIEW_COMPANY_LIST').current === true" id="VIEW_COMPANY_LIST" >
                <div class="max-h-[60vh] overflow-auto">
                        <form @submit.prevent="getCompanyListByType()" class="py-2 px-1 flex gap-2 w-[40vw]">
                            <ElementsInput
                                :width72="true"
                                :height11="true"
                                :placeholder="'Search Company'"
                                :required="true"
                                v-model="searchCompanyName"
                            />
                            <ElementsButton
                                :height12="true"
                                :width32="true"
                                :text="'Search'"
                                :inputtype="'submit'"
                            />
                        </form>

                        <table class="min-w-full max-w-[50vh] min-h-[20vh]">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900 sm:pl-6">
                                        <div class="flex h-5 items-center">
                                            <input
                                                v-model="checkAllEdit"
                                                id="all" name="all" type="checkbox" class="h-4 w-4 rounded border-gray-300  focus:ring-indigo-500"
                                            />
                                        </div>
                                    </th>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"> Company Name</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Flexben Type</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white  align-top">
                                <tr v-for="( company, idx ) in companyListBySearch" :key="idx">
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-6">
                                        <div class="flex h-5 items-center">
                                            <input
                                                :value="company" v-model="wantToEditList"
                                                id="" type="checkbox" class="h-4 w-4 rounded border-gray-300  focus:ring-indigo-500"
                                            />
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"> {{ company.companyName }} </td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {{ company.flexbenTypeName }} / {{ company.flexbenCampaignTitle }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                <div
                    class="px-4 py-6 flex justify-end"
                >
                    <ElementsButton
                        class="ml-2"
                        :text="'Select Campaign > '"
                        :height12="true"
                        :fitContent="true"
                        :backgroundWhite="wantToEditList.length==0"
                        :disabled="wantToEditList.length==0"
                        @click-event="clickSteps( 'CHANGE_CAMPAIGN' )"
                    />
                </div>
            </div>

            <div v-if="editSteps.find(step => step.id === 'CHANGE_CAMPAIGN' ).current === true" id="CHANGE_CAMPAIGN" >
                <div class="max-h-[60vh] overflow-auto pb-[10vh]">
                    <table class="min-w-full max-w-[50vh] min-h-[20vh]">
                        <thead class="bg-gray-100">
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"> Company Name</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Flexben Type</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white  align-top">
                            <tr v-for="( company, idx ) in wantToEditList" :key="idx">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"> {{ company.companyName }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <ElementsSelect
                                        :options="flexbenTypeSelectOptions"
                                        v-model="company.flexbenCampaignSeq"
                                        :isError="company.flexbenCampaignSeq===campaignSeq"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div
                    class="px-4 py-6 flex justify-end"
                >
                    <ElementsButton
                        text="Go back to list"
                        :width28="true"
                        :height12="true"
                        :background-white="true"
                        @click-event="clickSteps( 'VIEW_COMPANY_LIST' )"
                    />
                    <ElementsButton
                        class="ml-2"
                        :backgroundWhite="false"
                        :text="'Confrim >'"
                        :width28="true"
                        :height12="true"
                        @click-event="goToConfirmChanges"
                    />
                </div>
            </div>

            <div v-if="editSteps.find(step => step.id === 'CONFIRM_CHANGE' ).current === true" id="CONFIRM_CHANGE" >
                <div class="max-h-[60vh] overflow-auto">
                    <fieldset>
                        <div class="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                            <div v-for="(company, idx) in confirmList" :key="idx" class="relative flex items-start py-4">
                                <div class="mx-2 min-w-0 flex-1 text-sm">
                                    <label class="select-none font-medium text-gray-700">{{ company.companyName }}</label>
                                </div>
                                <div class="mr-3 flex h-5 items-center text-gray-500 font-medium">
                                    {{ company.flexbenTypeName }} / {{ company.flexbenCampaignTitle }}
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div
                    class="px-4 py-6 flex justify-end"
                >
                    <ElementsButton
                        text="Go back to change"
                        :width28="true"
                        :height12="true"
                        :background-white="true"
                        @click-event="clickSteps( 'CHANGE_CAMPAIGN' )"
                    />
                    <ElementsButton
                        class="ml-2"
                        :backgroundWhite="false"
                        :text="'Confrim all changes'"
                        :width28="true"
                        :height12="true"
                        @click-event="confirmAllChanges"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    props : {
        modelValue: Boolean,
        campaignSeq : String,
        flexbenTypeSelectOptions : Array
    },
    watch : {
        modelValue( isOpen ){
            const self = this;
            if( !isOpen ){
                return;
            }
            self.clickSteps("VIEW_COMPANY_LIST");
            self.searchCompanyName = "";
            self.getCompanyListByType();
            self.wantToEditList = [];
            self.confirmList = [];
        }
    },
    computed : {
        checkAllEdit : {
            get(){
                const self = this;
                return self.companyListBySearch.length === self.wantToEditList.length
            },
            set( isSelected ){
                const self = this;
                self.wantToEditList = isSelected ? self.companyListBySearch  : []
            }
        }
    },
    data(){
        return {
            searchCompanyName : "",
            companyListBySearch : [],
            wantToEditList : [],
            confirmList : [],
            editSteps : [
                { id : "VIEW_COMPANY_LIST", current : false },
                { id : "CHANGE_CAMPAIGN", current : false },
                { id : "CONFIRM_CHANGE", current : true }
            ],
            flexbenEditOptions : []
        }
    },
    emits : ['update:modelValue', 'buttonEvent', 'afterClose'],
    methods : {
        hidePopup() {
            const self = this;
            self.$emit('update:modelValue', false)
        },
        getCompanyListByType(){
            const self = this;

            const json_query = {
                companyName : self.searchCompanyName , flexbenCampaignSeq : self.campaignSeq
            }

            const params = new URLSearchParams();
            params.append( "json_query", JSON.stringify( json_query ) );
            const url = self.$api("uri", "get-company-flexben-campaign" )

            self.$axios.get( url , { params } )
                .then( res => {
                    self.companyListBySearch = res.data.data.list;
                })
                .catch( alert )
        },
        clickSteps( stepWannaGo ){
            const self = this;
            self.editSteps.map( step => {
                step.current = step.id === stepWannaGo;
            })
        },
        goToConfirmChanges(){
            const self = this;
            self.confirmList = self.wantToEditList.filter( com => com.flexbenCampaignSeq !== self.campaignSeq );
            if( self.confirmList.length == 0 ){
                alert(" there is no changes ");
                return;
            }
            self.clickSteps('CONFIRM_CHANGE');
        },
        confirmAllChanges(){
            const self = this;
            const url = self.$api("uri", "put-company-flexben-campaign");
            self.$axios.put( url, self.confirmList )
                .then( () => {
                    alert( "change success");
                    self.hidePopup();
                    self.$emit("afterClose");
                })
                .catch( err =>{
                    const { code, message } = err.response.data;
                    let errMsg = code ? code + "\n" + message : err;
                    alert( errMsg );
                })

        }
    }

}
</script>