<template>
    <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
        <div class="flex justify-end mt-5 gap-2">
            <ElementsInput
                :width60="true" 
                :height11="true"
                :placeholder="'Search Company'"
            />
            <ElementsButton
                :width32="true"
                :text="'Search'"    
            />
        </div>
        <div class="mt-6 overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" class="whitespace-no-wrap px-3 py-3.5 text-left text-sm text-gray-900 sm:pl-6">Company</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-left text-sm text-gray-900">Number of Activate brands</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-left text-sm text-gray-900">Sumber of Deactivated brands</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-left text-sm text-gray-900 ">  Brand Setting </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-left text-sm text-gray-900 w-4/12">   </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(company, index) in companyWithBrandOnOff.list" v-bind:key="index" >
                        <td class="whitespace-pre-wrap px-3 py-4 text-center text-sm text-gray-900 sm:pl-6"> Sharetreats </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> 40 </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> 4 </td>
                        <td class="whitespace-nowrap text-sm text-gray-900 pr-3"> 
                            <div class="cursor-pointer text-red-600 border text-center border-red-300 px-5 py-2 rounded-md"> Brand on/off </div> 
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">  </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-full h-28 flex justify-center items-center">
            <ElementsPagination
                :modelValue="1"
                :totalContent="20"
                :contentsPerPage="10"
            />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            companyWithBrandOnOff : {
                list : [{},{}]
            }
        }
    }
}
</script>