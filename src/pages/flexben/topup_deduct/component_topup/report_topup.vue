<template>
    <div class="p-3 max-w-7xl self-end">
        <ElementsButton
            :text="'+ Top-up'"
            :fitContent="true"
            class="self-end"
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
                @clickEvent="getFlexbenHistoryList()"
            />
        </div>
        <div class="mt-6 overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-6">Date</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Company</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Admin</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Type</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Points</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">PO Doc No</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Invoice <br/>Doc No</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Collection <br/> Doc No</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900"> <span class="sr-only"> Edit </span> </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(history, index) in flexbenHistory.list" v-bind:key="index" >
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900 sm:pl-6"> {{ dateFormatChange(history.regDate, "MM/DD/yyyy hh:mm") }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ history.companyName }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ history.executerId }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> Top-up </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ history.mileageVolume }} </td>
                        <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-center"
                            :class="[history.poDocumentFilePath ? 'underline text-blue-600 cursor-pointer' : 'text-gray-900' ]"
                            @click="downLoadFile(history.poDocumentFilePath, history.poDocNo)"
                        >
                            {{ history.poDocNo || showTheFileName( history.poDocumentFilePath )  }}
                        </td>
                        <td
                            class="whitespace-nowrap px-3 py-4 text-sm text-center"
                            :class="[history.invoiceFilePath ? 'underline text-blue-600 cursor-pointer' : 'text-gray-900' ]"
                            @click="downLoadFile(history.invoiceFilePath, history.invoiceDocNo)"
                        >
                            {{ history.invoiceDocNo || showTheFileName( history.invoiceFilePath ) }}
                        </td>
                        <td
                            class="px-3 py-4 text-sm text-center whitespace-pre-wrap"
                            :class="[history.orDocumentFilePath ? 'underline text-blue-600 cursor-pointer' : 'text-gray-900' ]"
                            @click="downLoadFile(history.orDocumentFilePath, history.orDocNo)"
                        >
                            {{ history.orDocNo || showTheFileName( history.orDocumentFilePath ) }}
                        </td>
                        <td class="whitespace-nowrap  text-sm text-gray-900 pr-3">
                            <div class="cursor-pointer border border-blue-300 text-center px-2 py-2 rounded-md" @click="clickEditHistoryFile(history.mileageCompanyHistorySeq)"> Edit </div>
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
</template>

<script>
import TimeNavigation from "@/components/main/TimeNavigation.vue"
import moment from "moment";

export default {
    mounted(){
        const self = this;
        self.getFlexbenHistoryList();
    },
    components : {
        TimeNavigation
    },
    methods : {
        goToRegistering(){
            location.href="/flexben/topup_deduct/registering?transaction=TOP-UP";
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
                    self.flexbenHistory.list = res.data.data.list;
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
            location.href = `/flexben/topup_deduct/editRegistering?transaction=TOP-UP&mileageSeq=${ historySeq } `;
        },
        showTheFileName( filePath ){
            let fileName = "";
            if( ! filePath ) {
                return fileName;
            }
            const params = new URLSearchParams( filePath )
            return params.get("downloadFileName");
        },
        downLoadFile( filePath, fileName ){
            if( ! filePath ) return;

            const link = document.createElement('a');
            let downloadUrl = new URL( filePath );

            if( fileName ){
                const originFileName = downloadUrl.searchParams.get("downloadFileName");
                const extension = originFileName.split('.').pop();
                downloadUrl.searchParams.append("nameForSave", [ fileName , extension ].join('.') );
            }

            link.href= downloadUrl.href;
            link.click();

        },
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
    },
    data(){
        return{
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