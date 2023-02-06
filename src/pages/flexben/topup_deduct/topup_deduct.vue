<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="mainTabs.find(tab => tab.current).text">
            <div class="mt-8 p-3 w-full max-w-7xl flex flex-col">
                <MainTabs :tabs ="mainTabs" class="my-2" @clickEvent="clickTabs" />
                <ElementsButton
                    :text="'+ Topup / Deduct'"
                    :fitContent="true"
                    class="self-end "
                    @clickEvent="goToRegistering"
                />
            </div>
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <TimeNavigation
                    :outputFormat="'YYYYMMDD'"
                    @updateDate="clickDateButton"
                />
                <div class="flex mt-5 gap-2">
                    <ElementsInput
                        v-model="searchOptions.companyName"
                        :width60="true" 
                        :height11="true"
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
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900 sm:pl-6">Date</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Company</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Admin</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Type</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Points</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">PO Doc No</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Invoice Doc No</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">OR Doc No</th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900"> <span class="sr-only"> Edit </span> </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="(history, index) in flexbenHistory.list" v-bind:key="index" >
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-6"> {{ history.regDate }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ history.companyName }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ history.executerId }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ mainTabs.find(tab => tab.current).text }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ history.mileageVolume }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm underline text-blue-600 cursor-pointer" @click="downLoadFile(history.poDocumentFilePath)"> {{ showTheFileName( history.poDocumentFilePath) }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm underline text-blue-600 cursor-pointer" @click="downLoadFile(history.invoiceFilePath)"> {{ showTheFileName( history.invoiceFilePath) }} </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm underline text-blue-600 cursor-pointer" @click="downLoadFile(history.orDocumentFilePath)"> {{ showTheFileName( history.orDocumentFilePath) }} </td>
                                <td class="whitespace-nowrap  text-sm text-gray-900 pr-3"> 
                                    <div class="cursor-pointer border border-blue-300 px-5 py-2 rounded-md" @click="clickEditHistoryFile(history.mileageCompanyHistorySeq)"> Edit </div> 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="w-full h-28 flex justify-center items-center">
                    <ElementsPagination
                        v-model="flexbenHistory.page"
                        :totalContent="flexbenHistory.total"
                        :contentsPerPage="flexbenHistory.limit"
                        @clickPage="clickPageButton"
                    />
                </div>
            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import TimeNavigation from "@/components/main/TimeNavigation.vue"
import MainTabs from "@/components/main/sections/MainTabs.vue"
import moment from "moment";

export default {
    mounted(){
        const self = this;
        self.getFlexbenHistoryList();
        const res =  this.mainTabs.find( tab => tab.current ).name;
        console.log(res )
    },
    components : {
        AppAside, AppMain, TimeNavigation, MainTabs
    },
    methods : {
        clickTabs( tabItem ){
            const self = this;
            self.mainTabs.map( tab => {
                tab.current = tabItem.name === tab.name;
            })
            self.searchOptions.transactionType = self.mainTabs.find( tab => tab.current ).name;
            self.getFlexbenHistoryList();
        },
        goToRegistering(){
            location.href="/flexben/topup_deduct/registering"
        },
        getFlexbenHistoryList( offset=0, afterClickPage = false ){
            const self = this;
            const url = self.$api("uri", "get-flexben-history");
            const { limit } = self.flexbenHistory; 
            self.flexbenHistory.offset = offset;
            const json_query = { ...self.searchOptions, offset, limit };
            self.$axios.get( url , { params : { json_query : JSON.stringify(json_query) } })
                .then((res) => {
                    self.flexbenHistory.total = res.data.data.count;
                    self.flexbenHistory.list = res.data.data.list.map(report =>{
// TODO: data convert 
                        return report;
                    });
                    if( ! afterClickPage ){
                        self.flexbenHistory.page = 1;
                    }
                
                })
                .catch( alert )
        },
        clickDateButton( startDate, endDate ){
            const self = this;
            self.searchOptions.startDate = startDate;
            self.searchOptions.endDate = endDate;
            self.getFlexbenHistoryList();
        },
        clickPageButton( item ){
            const self = this;
            self.getFlexbenHistoryList( item, true )
        },
        clickEditHistoryFile( historySeq ){
            location.href = `/flexben/topup_deduct/editRegistering?mileageSeq=${ historySeq } `;
        },
        showTheFileName( filePath ){
            let fileName = "";
            if( ! filePath ) {
                return fileName;
            }
            const params = new URLSearchParams( filePath )
            return params.get("downloadFileName");
        },
        downLoadFile( filePath ){
            console.log( " hihi hoho")
            if( ! filePath ) return;
            const link = document.createElement('a');
            link.href= filePath
            link.click();    
        }
    },
    data(){
        return{
            mainTabs : [
                { text : "Topup", name : "TOPUP_FROM_HRFLEX", current : true },
                { text : "Deduct" , name : "DEDUCT_TO_HRFLEX", current : false },
            ],
            flexbenHistory : {
                list : [],
                total : 0,
                limit : 10,
                offset : null,
                page : 1,
            },
            searchOptions : {
                startDate : moment().startOf("month").format("YYYYMMDD"),
                endDate : moment().endOf("month").format("YYYYMMDD"),
                transactionType : "TOPUP_FROM_HRFLEX",
                companyName : ""
            },
        }
    }
}
</script>