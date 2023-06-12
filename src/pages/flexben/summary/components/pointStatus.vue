<template>
    <div class="mb-2">
        <h2 class="text-xl font-semibold"> State of Points </h2>
        <div class="col-span-1 mt-4 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col min-h-[805px]">
            <div class="flex justify-between mt-5 gap-2 mx-2">
                <div class="flex gap-2">
                    <ElementsInput
                        :width60="true"
                        :height11="true"
                        v-model="availableCom_query.companyName"
                    />
                    <ElementsButton
                        :width32="true"
                        :text="'Search'"
                        :height12="true"
                        @clickEvent="getAvailableCompany()"
                    />
                </div>
            </div>

            <div v-if="availableCom_data.list.length > 0 " class="my-6 overflow-auto ring-1 ring-black ring-opacity-5">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600 sm:pl-6">No</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600">Company Name</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600">Available point</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="(history, index) in availableCom_data.list"
                            v-bind:key="index"  :class="{ 'bg-[#F8F8FD]': (index % 2 !== 0) }"
                        >
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700 sm:pl-6"> {{ index +1  }}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700"> {{ history.companyName }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700"> {{ formatNumberWithComma(history.walletCompanyMileage) }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else class="mt-10 flex flex-col items-center h-full justify-center gap-5">
                <div class="text-gray-500">  No Data </div>
            </div>
            <div class="w-full h-28 flex justify-center items-center">
                <ElementsPagination
                    v-model="availableCom_data.page"
                    :totalContent="availableCom_data.total"
                    :contentsPerPage="availableCom_data.limit"
                    @clickPage="clickPageButton"
                />
            </div>
        </div>
    </div>
</template>

<script>

export default{
    props : {
    },
    emits : [  ],
    data(){
        return {
            companyName : "",
            availableCom_query : {
                companyName : ""
            },
            availableCom_data : {
                list : [],
                total : 0,
                limit : 10,
                offset : null,
                page : 1,
            }
        }
    },
    methods : {
        getAvailableCompany( offset = 0, afterClickPage = false){
            const self = this;
            const url = self.$api("uri", "get-flexben-available-company" );
            self.availableCom_data.offset = offset;
            const { limit } = self.availableCom_data.limit;
            const json_query = {
                ...self.availableCom_query, offset, limit
            }
            self.$axios.get( url, { params : { json_query : JSON.stringify( json_query )} })
                    .then( res => {
                        const { list, total } = res.data.data;
                        self.availableCom_data.list = list;
                        self.availableCom_data.total = total;
                        if( ! afterClickPage ){
                            self.availableCom_data.page = 1;
                        }
                    })

        },
        clickPageButton( item ){
            const self = this;
            self.getAvailableCompany( item, true )
        },
        formatNumberWithComma( number ){
            if( ! number ) return 0;
            const local = 'en-US';
            const formattedNumber = number.toLocaleString(local);
            return formattedNumber;
        }
    },
    mounted(){
        const self = this;
        self.getAvailableCompany();
    }
}

</script>