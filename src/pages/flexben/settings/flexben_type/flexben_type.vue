<template>
    <div class="mt-4">
        <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <li v-for="(type, idx ) in flexbenTypeList" :key="idx" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                <div class="flex flex-1 flex-col p-8">
                    <h3 class="mt-6 text-lg font-semibold text-gray-900"> {{ type.flexbenTypeName }} </h3>
                    <dl class="mt-1 flex flex-grow flex-col justify-between">
                        <dt class="sr-only"> Discount rate </dt>
                        <dd class="text-sm text-gray-500"> Discount rate {{ type.flexbenCampaignTitle }} </dd>
                        <dt class="sr-only"> Count of company </dt>
                        <dd class="mt-3">
                            <span class="px-2 py-1 text-xs font-medium text-green-800"> {{ type.countUseCompany }} Company </span>
                        </dd>
                    </dl>
                </div>
                <div>
                    <div class="flex divide-x divide-gray-200 items-center justify-center ">
                        <div
                            class="cursor-pointer rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-500 hover:text-gray-800"
                            @click="clickEditFlexbenType(type.flexbenCampaignSeq)"
                        >
                            Edit
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <Teleport to="body">
            <CampaignEdit
                v-model="editFlexbenPopup.isOpen"
                :campaignSeq="editFlexbenPopup.campaignSeq"
                :flexbenTypeSelectOptions="flexbenTypeSelectOptions"
                :flexBenTypeObject="flexBenTypeObject"
                @afterClose="getFlexbenListWithCnt()"
            />
        </Teleport>
    </div>
</template>

<script>
import CampaignEdit from "@/pages/flexben/settings/popup/campaign_edit.vue"

export default {
    components : {
        CampaignEdit
    },
    data(){
        return {
            flexbenTypeList : [],
            flexbenTypeSelectOptions : [],
            editFlexbenPopup : {
                isOpen : false,
                campaignSeq : "",
            },
            flexBenTypeObject : {}
        }
    },
    methods : {
        getFlexbenListWithCnt(){
            const self = this;
            const url = self.$api("uri", "get-flexben-campaign-with-count");
            self.$axios.get( url )
                .then( res => {
                    self.flexbenTypeList = res.data.data.list;
                    self.flexbenTypeSelectOptions = res.data.data.list.map( type => ({
                        text : `${type.flexbenTypeName} / ${type.flexbenCampaignTitle}` ,
                        value : type.flexbenCampaignSeq
                    }))
                    self.flexBenTypeObject = self.flexbenTypeSelectOptions.reduce( ( list, type ) => {
                        return {...list, [ type.value ] : type.text }
                    }, {} )

                })
                .catch( alert )
        },
        clickEditFlexbenType( typeSeq ){
            const self = this;
            self.editFlexbenPopup.isOpen = true;
            self.editFlexbenPopup.campaignSeq = typeSeq;
        },


    },
    mounted(){
        const self = this;
        self.getFlexbenListWithCnt();
    }
}

</script>