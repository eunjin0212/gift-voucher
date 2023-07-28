<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Summary'">
            <div id="company-summary" class="pt-8">
                <div class="lg:max-w-[80vw]">
                    <h3 class="text-xl font-semibold leading-6 text-gray-900">Company Summary</h3>
                    <dl class="mt-5 grid gap-5 grid-cols-4">
                        <div v-for="item in companyStats" :key="item.name"
                            class="overflow-hidden rounded-lg bg-white px-4 py-7 shadow"
                        >
                            <dt class="truncate text-lg font-medium text-gray-500 text-center">{{ item.name }}</dt>
                            <dd class="mt-4 text-3xl font-semibold tracking-tight text-gray-900 text-center">
                                {{ formatNumberWithComma(item.stat) }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div id="point-summary" class="pt-8">
                <div class="lg:max-w-[80vw]">
                    <h3 class="text-xl font-semibold leading-6 text-gray-900">Point Summary</h3>
                    <dl class="mt-5 grid gap-5 grid-cols-4">
                        <div v-for="item in pointStats" :key="item.name"
                            class="overflow-hidden rounded-lg bg-white px-4 py-7 shadow"
                        >
                            <dt class="truncate text-lg font-medium text-gray-500 text-center">{{ item.name }}</dt>
                            <dd class="text-center w-full leading-10 text-gray-900">
                                <div class="text-3xl font-semibold place-self-center break-words">
                                    {{ formatNumberWithComma(item.stat) }}
                                    <span class="text-sm font-bold self-end"> points</span>
                                </div>

                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <div id="to-be-expire" class="pt-8">
                <div class="lg:max-w-[80vw]">
                    <h3 class="text-xl font-semibold leading-6 text-gray-900">To be Expired Service</h3>
                    <div class=" mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="relative min-w-full divide-y divide-gray-300  ">
                        <thead class="sticky bg-white top-0 left-0 right-0 border-b border-gray-200 " style="z-index: 1;">
                            <tr>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-6"> No </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900"> Company <br/> Name </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Start <br/> Date</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">End <br/> Date</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Admin <br/> Name</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Admin <br/> Email</th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Admin <br/> Phone <br/> Number </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Remain Point </th>
                                <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Num Of <br/> Usage <br/> Employees </th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only">Info </span>
                                </th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span class="sr-only"> Period Extended </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200"
                            v-if="toBeExpire.list.length == 0 "
                        >
                            <tr class="">
                                <td class="py-10 items-center text-center">
                                    No To be Expired Service
                                </td>
                            </tr>
                        </tbody>

                        <tbody v-else class="divide-y divide-gray-200 bg-white"
                        >
                            <tr v-for="(company, index) in toBeExpire.list" v-bind:key="index" :class="{ 'bg-[#F8F8FD]': (index % 2 !== 0) }">
                                <td class="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-6"> {{ company.rowNum }} </td>
                                <td class="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ company.companyName }} </td>
                                <td class="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900">  {{ dateFormatChange( company.subscribeStartDate ) }} </td>
                                <td class="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900">  {{ dateFormatChange( company.subscribeEndDate ) }}</td>
                                <td class="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900"> henry </td>
                                <td class="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900"> henry@sharetreats.com </td>
                                <td class="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900"> 09000000000  </td>
                                <td class="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ formatNumberWithComma(company.walletCompanyMileage) }} </td>
                                <td class="text-center whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ company.empCnt }} </td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <ElementsButton
                                        :text="'Info'"
                                        :fitContent="true"
                                        :bgWhiteAndtextIndigo="true"
                                        :height12="true"
                                    />
                                </td>
                                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div class="bg-white cursor-pointer border rounded hover:bg-red-100 border-rose-400 w-24 py-1 transition-all duration-500 text-center">
                                        <div
                                            href="#" class="text-rose-600   whitespace-normal"
                                        >
                                            Period Extended
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="w-full h-28 flex mt-4 justify-center items-center">
                    <ElementsPagination
                        v-model="toBeExpire.page"
                        :totalContent="toBeExpire.total"
                        :contentsPerPage="toBeExpire.limit"
                        @clickPage="afterClickPage"
                    />
                </div>
                </div>
            </div>
        </AppMain>
    </div>
</template>


<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import ElementsPagination from "@/components/elements/ElementsPagination.vue"
import ElementsButton from "@/components/elements/ElementsButton.vue"
import moment from 'moment';

export default {
    components : {
        AppMain, AppAside, ElementsPagination, ElementsButton
    },
    data(){
        return {
            companyStats : {
                TRIAL : { name: 'Texting Company', stat: 71897 },
                ACTIVE : { name: 'Active Company', stat: 71897 },
                SUSPENDED : { name: 'Suspended Company', stat: 71897 },
                DROP_OUT : { name: 'Drop out Company', stat: 0 },
            },
            pointStats : {
                TOTAL_TOP_UP : { name: 'Total top-up point', stat: 0 },
                AVAILABLE : { name: 'Available Point', stat: 0 },
                USED_POINT : { name: 'Used Point', stat: 0 },
            },
            toBeExpire : {
                limit : 10,
                offset : 0,
                page : 1,
                total : 0,
                list : [],
            },
        }
    },
    methods : {
        gotoCompanyInfoPage( subscribeSeq ){
            location.href = `/company/company_information/?subscriptionCompanySeq=${subscribeSeq}`;
        },
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
        formatNumberWithComma( number ){
            if( ! number ) return 0;
            const local = 'en-US';
            const formattedNumber = number.toLocaleString(local);
            return formattedNumber;
        },
        getCompanySummary(){
            const self = this;
            const url = self.$api("uri", "get-company-summary");
            self.$axios.get( url )
                        .then(res => {
                            const { active,  suspended, testing } = res.data.data;
                            self.companyStats.TRIAL.stat = testing;
                            self.companyStats.ACTIVE.stat = active;
                            self.companyStats.SUSPENDED.stat = suspended;

                        }).catch( err => {
                            alert(err);
                        })
        },
        getCompany30LeftSubscribe( offset=0, afterClickPage = false ){
            const self = this;
            const url = self.$api( "uri", "get-list-30-days-subscribe-company" );
            self.toBeExpire.offset = offset;

            let json_query = {  limit : self.toBeExpire.limit, offset };

            self.$axios.get( url , { params : { json_query : JSON.stringify( json_query ) } }  )
                .then(res => {
                    self.toBeExpire.total = res.data.data.total;
                    self.toBeExpire.list = res.data.data.list;
                    if( ! afterClickPage ){
                        self.toBeExpire.page = 1;
                    }
                })
                .catch( err => {
                    alert(err);
                })
        },
        afterClickPage( item ){
            const self = this;
            self.getCompany30LeftSubscribe( item , true );
        },
        getPointSummary(){
            const self = this;
            const url = self.$api("uri", "get-flexben-point-summary" );

            self.$axios.get( url )
                    .then( res => {
                        const { totalAvailable, totalTopUp, totalUsed } = res.data.data.data;
                        self.pointStats.TOTAL_TOP_UP.stat = totalTopUp;
                        self.pointStats.AVAILABLE.stat = totalAvailable;
                        self.pointStats.USED_POINT.stat = totalUsed;
                    })
        },
    },
    mounted(){
        const self = this;
        self.getCompanySummary();
        self.getCompany30LeftSubscribe();
    }
}

</script>