<template>
    <div
        v-show="modelValue"
        class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
    >
        <div class="border rounded-lg shadow shadow-gray-100 bg-white">
            <div class="px-7 py-6 flex justify-between items-center ">
                <h2 class="text-xl font-bold"> Select Company </h2>
                <a
                    href="javascript:void(0)"
                    class="ml-20"
                    @click="$emit('update:modelValue', false)"
                >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                </a>
            </div>

            <div class="h-[70vh]">
                <form @submit.prevent="getCompanyListByName()"
                    class="py-2 px-1 flex gap-2 w-[40vw] flex-wrap"
                >
                    <ElementsInput
                        :width72="true"
                        :height11="true"
                        :placeholder="'Search Company'"
                        v-model="json_query.searchText"
                    />
                    <ElementsButton
                        :height12="true"
                        :width32="true"
                        :text="'Search'"
                        :inputtype="'submit'"
                    />
                </form>
                <div class="overflow-auto h-[60vh]">
                    <table class="min-w-full max-w-[50vh] min-h-[20vh]">
                        <thead class="bg-gray-100">
                            <tr>
                                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"> Company Name</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reg Date</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900"> <span class="sr-only"> Select </span> </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white  align-top">
                            <tr v-for="( company, idx ) in companyList" :key="idx">
                                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"> {{ company.companyName }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {{ dateFormatter(company.subscribeStartDate) }}
                                </td>
                                <td class="whitespace-nowrap text-sm text-gray-900 pr-3 py-2">
                                    <div
                                        @click="afterClickSelectBtn(company)"
                                        class="cursor-pointer border text-center text-blue-300 font-semibold border-blue-300 px-2 py-2 rounded-md"
                                    >
                                        Select
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default{
    props : {
        modelValue : Boolean,
    },
    emits : [ "update:modelValue", "selectCompany"],
    watch : {
        modelValue( isOpen ){
            const self = this;
            if( !isOpen ){
                return;
            }
            self.json_query.searchText = "";
            self.getCompanyListByName();
        }
    },
    data(){
        return {
            json_query : {
                limit : 100,
                offset : null,
                companySubscribeStatus : null,
                searchOption : "COMPANY_NAME",
                searchText : ""
            },
            companyList : [],
        }
    },
    methods : {
        getCompanyListByName(){
            const self = this;
            const json_query = JSON.stringify( { ...self.json_query } );

            const url = self.$api( "uri", "get-company" );
            self.$axios.get(url, { params : { json_query } }).then(res => {
                self.companyList = res.data.data.list;
            });
        },
        dateFormatter ( dateStr, formatStr = "MM/DD/yyyy" ){
            if( ! dateStr ){
                return null;
            }
            return moment( dateStr ).format( formatStr );
        },
        afterClickSelectBtn( company ){
            const self = this;
            self.$emit("selectCompany", company );
            self.$emit("update:modelValue", false);
        }
    }
}
</script>