<template>
    <div>
        <div v-if="flexbenHistory.list.length > 0 " class="mt-6 overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg ">
            <table class="divide-y divide-gray-300 w-full">
                <thead>
                    <tr>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-6">Date</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Company</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Admin</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Type</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Points</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Extended <br/> Period </th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Extended <br/> Use Date </th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Num Of <br/> Usage <br/> Employees </th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">PIC <br/> Name </th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">PO Doc No</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Invoice <br/>Doc No</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Collection <br/> Doc No</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Status</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900"> <span class="sr-only"> Edit </span> </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(history, index) in flexbenHistory.list" v-bind:key="index" >
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900 sm:pl-6"> {{ dateFormatChange(history.regDate, "MM/DD/yyyy hh:mm") }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ history.companyName }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ history.executerId }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> Add </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ history.mileageVolume }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">
                            <span v-if="history.extendedPeriod == 'NONE' || !history.extendedPeriod"> None </span>
                            <span v-else> {{ `${history.extendedPeriod} Month` }} </span>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">
                            {{ dateFormatChange(history.extendedStartDate) }}
                            <span v-if="history.extendedStartDate || history.extendedEndDate"> ~ </span>
                            <br/> {{ dateFormatChange(history.extendedEndDate) }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ history.numOfEmpCnt }}  </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ history.picName }}   </td>
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
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ contractStatusObj[history.topUpContractStatus] }}  </td>
                        <td class="whitespace-nowrap  text-sm text-gray-900 pr-3">
                            <div
                                v-if="$appUtil.checkPermission('FLEXBEN_EXECUTE_EDIT')"
                                class="cursor-pointer border border-blue-300 text-center px-4 py-2 rounded-md"
                                @click="clickEditHistoryFile(history.mileageCompanyHistorySeq)"
                            > Edit </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="mt-10 flex flex-col items-center h-full justify-center gap-5">
            <div class="text-gray-500">  No Top-up Data </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    mounted(){
    },
    components : {
    },
    methods : {
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
            contractStatusObj : {
                REQUESTED : "Requested",
                PO_RECEIVED : "PO received",
                INVOICE_SENT : "Invoice sent",
                RECEIPT_ISSUED : "Receipt issued",
            },
        }
    },
    props :{
        flexbenHistory : Object,
    }
}
</script>