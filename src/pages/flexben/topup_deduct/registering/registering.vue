<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Registering'">
            <div class="flex flex-col p-3 w-full max-w-7xl mt-4 gap-3">
                <div class="overflow-hidden mt-3">
                    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">company</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ElementsSelect 
                                        :options="companyList"
                                    />
                                </dd>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Admin</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> henry / hr / henry@sharetreats.com </dd>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Points type </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <div>
                                        <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                            <div v-for="notificationMethod in notificationMethods" :key="notificationMethod.id" class="flex items-center">
                                                <input 
                                                    v-model="pointType"
                                                    :id="notificationMethod.id"
                                                    :value="notificationMethod.id" 
                                                    name="notification-method" type="radio" 
                                                    :checked="notificationMethod.id===pointType" 
                                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                                                />
                                                <label :for="notificationMethod.id" class="ml-3 block text-sm font-medium text-gray-700">{{ notificationMethod.title }}</label>
                                            </div>
                                        </div>
                                    </div>
                                </dd>
                            </div>
                            <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Points</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <input type="number"
                                        class="w-full mt-1 shadow-sm block sm:text-sm border-gray-300 rounded-md"    
                                        :min="0"
                                    />
                                </dd>
                            </div>
                            <div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">PO softcopy</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"    
                                            :min="0"
                                        />
                                    </dd>
                                    <dt class="text-sm font-medium text-gray-500">PO Document No.</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ElementsInput
                                            :full="true"
                                        />
                                    </dd>
                                </div>
                            </div>
                            <div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Invoice softcopy</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"    
                                            :min="0"
                                        />
                                    </dd>
                                    <dt class="text-sm font-medium text-gray-500">Invoice Document No.</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ElementsInput
                                            :full="true"
                                        />
                                    </dd>
                                </div>
                            </div>
                            <div>
                                <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">OR softcopy</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input type="file"
                                            class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"    
                                            :min="0"
                                        />
                                    </dd>
                                    <dt class="text-sm font-medium text-gray-500">Or Document No.</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ElementsInput
                                            :full="true"
                                        />
                                    </dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>
                <div class="flex justify-end gap-4">
                    <ElementsButton
                        :backgroundWhite="true"
                        :width32="true"
                        :text="'Cancel'"
                    />
                    <ElementsButton
                        :width32="true"
                        :text="'Submit'"
                        @clickEvent="clickTopup"
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
    mounted(){
        const self = this;
        self.getCompanyList();
    },
    components:{
        AppMain, AppAside
    },
    data(){
        return{
            pointType : 'ADD',
            companyList : [
                { text : "type", value : "value" },
                { text : "type", value : "value" },
                { text : "type", value : "value" }
            ],
            notificationMethods : [
                { id: 'ADD', title: 'Add' },
                { id: 'DEDUCT', title: 'Deduct' },
            ]
        }
    },
    methods:{
        getCompanyList(){
            const self = this;
            const json_query = {
                limit : 10,
                offset : null,
                companyName : null,
            }
            const url = self.$api( "uri", "get-company" );
            self.$axios.get(url, { params : { json_query } }).then(res => {
                console.log("list : ",  res.data.data.list);
                self.companyList = res.data.data.list.map( ({ companyName, companySeq }) => ({
                    text : companyName, value : companySeq
                }))
            });
        },
        clickTopup(){
            const self = this;
            console.log( self.pointType)
        }
    }
    
}
</script>



