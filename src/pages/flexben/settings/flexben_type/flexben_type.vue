<template>
    <div class="mt-4">
        <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <li v-for="(type, idx ) in flexbenTypeList" :key="idx" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                <div class="flex flex-1 flex-col p-8">
                    <h3 class="mt-6 text-lg font-semibold text-gray-900"> Type A </h3>
                    <dl class="mt-1 flex flex-grow flex-col justify-between">
                        <dt class="sr-only"> Discount rate </dt>
                        <dd class="text-sm text-gray-500"> Discount rate 100% </dd>
                        <dt class="sr-only"> Count of company </dt>
                        <dd class="mt-3">
                            <span class="px-2 py-1 text-xs font-medium text-green-800"> N Company </span>
                        </dd>
                    </dl>
                </div>
                <div>
                    <div class="flex divide-x divide-gray-200 items-center justify-center ">
                        <div 
                            class="cursor-pointer rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-500 hover:text-gray-800"
                            @click="editFlexbenPopup.isOpen=true"
                        >
                            Edit
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <Teleport to="body">
            <AppPopup v-model="editFlexbenPopup.isOpen"
                :name="'Edit Company'"
                :buttonText="'Change'"
            >
                <div class="py-2 px-1 flex gap-2 w-[40vw]">
                    <ElementsInput
                        :width72="true" 
                        :height11="true"
                        :placeholder="'Search Company'"
                    />
                    <ElementsButton
                        :height12="true"
                        :width32="true"
                        :text="'Search'"    
                    />
                </div>
                <table class="min-w-full ">
                    <thead class="bg-gray-100">
                        <tr>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"> Company Name</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Flexben Type</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="( company, idx ) in companyList" :key="idx">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"> name of company </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"> select box here </td>
                        </tr>
                    </tbody>
                </table>
            </AppPopup>
        </Teleport>
    </div>
</template>

<script>
import AppPopup from "@/components/AppPopup.vue"

export default {
    components : {
        AppPopup
    },
    data(){
        return {
            flexbenTypeList : [ {}, ],
            companyList : [{}, {}, {} ],
            editFlexbenPopup : {
                isOpen : false
            }
        }
    }
}

</script>