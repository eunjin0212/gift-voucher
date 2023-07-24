<template>
    <AppPopup v-model="masterAdmin.isOpen" name="Master Admin List" >
        <div class="flex flex-col min-w-[40vw]">
            <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle">
                    <div class="shadow-sm ring-1 ring-black ring-opacity-5">
                        <table class="min-w-full border-separate px-6" style="border-spacing: 0">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Name</th>
                                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell">
                                        Department Name / Job title Name
                                    </th>
                                    <th scope="col" class="sticky top-0 z-10 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell">Email</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white" v-if="masterAdmin.list.length > 0">
                                <tr v-for="(admin, personIdx) in masterAdmin.list" :key="admin.email">
                                    <td :class="[personIdx !== masterAdmin.list.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8']">
                                        {{ admin.employeeName }}
                                    </td>
                                    <td :class="[personIdx !== masterAdmin.list.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden sm:table-cell']">
                                        {{ `${admin.departmentName ?? 'No Department '} / ${ admin.jobTitleName ?? 'No Tier' }` }}
                                    </td>
                                    <td :class="[personIdx !== masterAdmin.list.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap px-3 py-4 text-sm text-gray-500 hidden lg:table-cell']">
                                        {{ admin.email }}
                                    </td>
                                </tr>
                            </tbody>
                            <div v-else class="w-full min-h-[10vh] flex items-center justify-center">
                                No Admin
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </AppPopup>
</template>

<script>

export default{
    props : {
        masterAdmin : Object,
    }
}
</script>