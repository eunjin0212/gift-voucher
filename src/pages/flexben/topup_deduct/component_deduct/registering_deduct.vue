<template>
    <form @submit.prevent="submitFlexbenAction">
        <div class="flex flex-col p-3 w-full max-w-7xl mt-4 gap-3">
            <div class="overflow-hidden mt-3">
                <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Company</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ElementsSelect
                                    :options="companyList"
                                    v-model="registerData.companySeq"
                                />
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Admin</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {{ logonProfile.name }} / {{ logonProfile.id }} </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Points type </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <div>
                                    <div class="flex items-center">
                                        <input
                                            name="point-execution-method" type="radio"
                                            :checked="true"
                                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label class="ml-3 block text-sm font-medium text-gray-700">
                                            Deduct
                                        </label>
                                    </div>
                                </div>
                            </dd>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Points</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <input
                                    type="number"
                                    class="w-full mt-1 shadow-sm block sm:text-sm border-gray-300 rounded-md"
                                    :max="-1"
                                    v-model="registerData.mileageVolume"
                                />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div class="flex justify-end gap-4">
                <ElementsButton
                    :backgroundWhite="true"
                    :inputtype="'button'"
                    :width32="true"
                    :text="'Cancel'"
                    @clickEvent="locationToList"
                />
                <ElementsButton
                    :inputtype="'submit'"
                    :width32="true"
                    :text="'Submit'"
                />
            </div>
        </div>
    </form>
</template>

<script>
export default {
    mounted(){
        const self = this;
        self.getCompanyList();
        const { hrAdminName , loginId } = window.logOnProfile.data;
        self.logonProfile.name = hrAdminName;
        self.logonProfile.id = loginId;
    },
    components:{
    },
    data(){
        return{
            logonProfile : {
                name : "",
                id : "" ,
            },
            isNotEditable : true,
            companyList : [],
            pointExcutionMethods : [
                { id: 'TOPUP_FROM_HRFLEX', title: 'Top-up' },
                { id: 'DEDUCT_TO_HRFLEX', title: 'Deduct' },
            ],
            registerData : {
                transactionType : "DEDUCT_TO_HRFLEX",
                companySeq : "",
                companyName : "",
                executerId : "",
                transactionNote : "",
                mileageVolume : -1,
            },
            documentFiles : {
                poDocumentFile : null,
                orDocumentFileName : null,
                invoiceFile : null,
                invoiceFileName : null,
                orDocumentFile : null,
                poDocumentFileName : null
            },
            deleteFileUrls : []
        }
    },
    methods:{
        getCompanyList(){
            const self = this;
            const json_query = {
                limit : -1,
                offset : null,
                billingStatus : null,
            }
            const url = self.$api( "uri", "get-company" );
            self.$axios.get(url, { params : { json_query } }).then(res => {
                self.companyList = res.data.data.list.map( ({ companyName, companySeq }) => ({
                    text : companyName, value : companySeq
                }));
            });
        },
        submitFlexbenAction(){
            const self = this;
            const url = self.$api( "uri", "post-topup-to-company" );

            if( ! self.registerData.companySeq ){
                alert( "company must be selected ");
                return;
            }

            self.$axios.post( url, self.registerData )
                .then( () => {
                    self.locationToList();
                })
                .catch( err => {
                    const { code, message } = err.response.data;
                    let errMsg = code ? code + "\n" + message : err;
                    alert( errMsg );
                })
        },
        locationToList(){
            location.href = "/flexben/topup_deduct"
        }
    }

}
</script>
