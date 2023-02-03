<template>
    <div class="min-w-[40vw]">
        <div class="overflow-y-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="whitespace-no-wrap px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-10"></th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900"> Brand Name </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900"> On/Off</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 w-4/12"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(brand, index) in brandList" :key="index" >
                        <td class="whitespace-pre-wrap px-3 py-4 text-left text-sm text-gray-900 sm:pl-6"> </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> {{ brand.bizBrandName }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">
                            <div class="flex h-5 items-center justify-center">
                                <input
                                    :value="brand.flexbenGoodsBrandSeq" v-model="brand_off_list" 
                                    id="block"  type="checkbox" class="h-4 w-4 rounded border-gray-300  focus:ring-indigo-500" 
                                />
                            </div>
                        </td>
                        <td class="whitespace-nowrap text-sm text-gray-900 w-4/12"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

export default {
    components :{
    },
    props : {
        brandList : Array,
    },
    data(){
        return {
            brand_off_list :[],
        }
    },
    methods : {
    }
}
</script>