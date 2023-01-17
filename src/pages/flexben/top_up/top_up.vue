<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Top up'">
            <ElementsButton
                :text="'+ Top up '"
                :fitContent="true"
                class="self-end"
                @clickEvent="goToRegistering"
            />
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <div class="flex w-[525px] h-[40px] border-gray-300 border-[1px] rounded mt-[35px]">
					<button
						class="w-[105px] h-[40px] text-[#84818A] leading-[40px] border-gray-300 border-r-[1px] text-center"
					>
                        This Week
					</button>
					<button
						class="w-[105px] h-[40px] text-[#84818A] leading-[40px] border-gray-300 border-r-[1px] text-center"
					>
                        Last Week
					</button>
					<button
						class="w-[105px] h-[40px] text-[#84818A] leading-[40px] border-gray-300 border-r-[1px] text-center"
					>
                        This Month
					</button>
					<button
						class="w-[105px] h-[40px] text-[#84818A] leading-[40px] border-gray-300 border-r-[1px] text-center"
					>
                        Last Month
					</button>
					<button
						class="w-[105px] h-[40px] text-[#84818A] leading-[40px] text-center"
					>
                        Direct Input
					</button>
				</div>
                <div class="flex mt-5 gap-2">
                    <ElementsSelect 
                        :width40="true"
                    />
                    <ElementsInput
                        :width60="true" 
                        :height11="true"
                    />
                    <ElementsButton
                        :width32="true"
                        :text="'Search'"    
                    />
                </div>
                <div class="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900 sm:pl-6">No</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Company</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Admin</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Type</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Points</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">PO Doc No</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">invoice Doc No</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="(topup, index) in topupList" v-bind:key="index" >
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-6"> 1 </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> 08/31/2023 09:33:22 </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> Sharetreats </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> henry / hr/ henry@sharetreats.com </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> Add </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> asdkj;fak </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> aksj;djf </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> asjdhlajk </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="w-full h-28 flex justify-center items-center">
                    <ElementsPagination
                        :modelValue="1"
                        :totalContent="22"
                        :contentsPerPage="10"
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

    components : {
        AppAside, AppMain
    },
    methods : {
        goToRegistering(){
            location.href="/flexben/top_up/registering"
        }
    },
    data(){
        return{
            topupList:[{}],
            json_query:{
                limit : 10,
                offset : null,
                companyName : null,
            },
            selectCompany: null,
            currentPage : null,
        }
    }
}
</script>