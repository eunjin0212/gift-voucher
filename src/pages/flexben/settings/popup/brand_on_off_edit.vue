<template>
    <div class="min-w-[40vw]">
        <div class="overflow-y-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="whitespace-no-wrap px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-10"></th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900"> Brand Name </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900"> On / Off</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 w-4/12"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(brand, index) in brandList" :key="index" >
                        <td class="whitespace-pre-wrap px-3 py-4 text-left text-sm text-gray-900 sm:pl-6"> </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> {{ brand.bizBrandName }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">
                            <div :class="[brand_off_list.includes(brand.flexbenGoodsBrandSeq) ? 'bg-gray-200' : 'bg-indigo-600', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                                <input 
                                    :value="brand.flexbenGoodsBrandSeq" v-model="brand_off_list"
                                    type="checkbox" class="cursor-pointer opacity-0 absolute w-full h-full peer appearance-none rounded-md"
                                />
                                <span :class="[brand_off_list.includes(brand.flexbenGoodsBrandSeq) ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
                                    <span :class="[brand_off_list.includes(brand.flexbenGoodsBrandSeq) ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                        <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                        </svg>
                                    </span>
                                    <span :class="[brand_off_list.includes(brand.flexbenGoodsBrandSeq) ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </span>
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
import { Switch } from '@headlessui/vue'
export default {
    components :{
        Switch
    },
    props : {
        brandList : Array,
    },
    data(){
        return {
            brand_off_list :[],
            toggleList : []
        }
    },
    methods : {

    }
}
</script>