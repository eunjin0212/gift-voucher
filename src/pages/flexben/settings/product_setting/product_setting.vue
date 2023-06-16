<template>
    <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
        <div class="flex gap-2 max-w-full my-4">
            <ElementsSelect
                :width40="true"
                :defaultMsg="'Brand'"
            />
            <ElementsSelect
                :width40="true"
                :defaultMsg="'Status'"
            />
            <ElementsInput
                :width60="true"
                :placeholder="'Product Name'"
            />
            <ElementsButton
                :width32="true"
                :text="'Search'"
            />
        </div>
        <div class="mt-6 overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="whitespace-no-wrap px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-6">Brand</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900"> Product</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900"> Product <br/> Description </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 ">  Sales <br/> Price </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 ">  Sales <br/> Period </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 ">  PIN <br/> Valid </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 ">  PIN <br/> Available </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900">  Status </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="key in Array.from(Array(10).keys())" v-bind:key="key" >
                        <td class="whitespace-pre-wrap px-3 py-4 text-left text-sm text-gray-900 sm:pl-6"> Gcash </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> P100 Top up Voucher </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">  for HRnFlex</td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">  Php 100.00 </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">
                            01/01/2023 <br/>
                            01/01/2023
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">   Php 100.00 </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">   Php 100.00 </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">   On Sale </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

export default {

}



</script>