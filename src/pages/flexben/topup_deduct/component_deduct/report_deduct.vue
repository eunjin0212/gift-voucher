<template>
    <div>
        <div v-if="flexbenHistory.list.length > 0 "  class="mt-6 overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900 sm:pl-6">Date</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Company</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Admin</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Type</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Points</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Refund slip</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900"> <span class="sr-only"> Edit </span> </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(history, index) in flexbenHistory.list" v-bind:key="index" >
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-6"> {{ dateFormatChange(history.regDate, "MM/DD/yyyy hh:mm") }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ history.companyName }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ history.executerId }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> Deduct </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ history.mileageVolume }} </td>
                        <td
                            class="px-3 py-4 text-sm text-center"
                            :class="[history.refundSlipFilePath ? 'underline break-all  text-blue-600 cursor-pointer' : 'text-gray-900' ]"
                            @click="downLoadFile(history.refundSlipFilePath)"
                        >
                            {{ showTheFileName( history.refundSlipFilePath )  }}
                        </td>
                        <td class="whitespace-nowrap text-sm text-gray-900 pr-3">
                            <div
                                v-if="$appUtil.checkPermission('FLEXBEN_EXECUTE_EDIT')"
                                class="cursor-pointer border text-center border-blue-300 px-2 py-2 rounded-md"
                                @click="clickEditHistoryFile(history.mileageCompanyHistorySeq)"
                            > Edit </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="mt-10 flex flex-col items-center h-full justify-center gap-5">
            <div class="text-gray-500">  No Deduct Data </div>
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
        dateFormatChange( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
        clickEditHistoryFile( historySeq ){
            location.href = `/flexben/topup_deduct/editRegistering?transaction=DEDUCT&mileageSeq=${ historySeq } `;
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
            if( ! filePath ) return;

            const link = document.createElement('a');
            let downloadUrl = new URL( filePath );

            link.href= downloadUrl.href;
            link.click();
        },
    },
    data(){
        return{
        }
    },
    props :{
        flexbenHistory : Object,
    }
}
</script>