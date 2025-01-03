<template>
    <div>
        <div class="flex justify-between py-3">
            <h1 class="text-zinc-800 text-xl font-semibold leading-10 items-center ">Holiday </h1>
            <ElementsButton
                :text="'+ Update'"
                :width32="true"
                :height12="true"
                @clickEvent="insertNewVersionHoliday"
                v-if="! versionList.some( v => v.versionApplicationStatus === 'SCHEDULED')"
            />
        </div>

        <div class="my-6 ring-1 ring-black ring-opacity-5">
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-white">
                    <tr>
                        <!-- <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600 sm:pl-6">No</th> -->
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600">Reg<br/> Date</th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600"> Status </th>
                        <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-600"> Title </th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-600 w-6/12"> Application <br/> Date </th>
                    </tr>
                </thead>
                <tbody class="w-full" v-if="versionList == 0">
                    <tr class="flex h-[20vh] w-full items-center justify-center">
                        <td :colspan="4" class=""> No Holiday Added </td>
                    </tr>
                </tbody >
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="( version , index) in versionList"
                        v-bind:key="index" :class="{ 'bg-[#F8F8FD]': (index % 2 == 0) }"
                    >
                        <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700 sm:pl-6"> 1 </td> -->
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700">
                            {{ dateFormatter(version.regDate) }}
                            <br/> {{ dateFormatter(version.regDate, "HH:mm:ss") }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700">
                            {{ statusConvert[version.versionApplicationStatus] }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-700">
                            <span
                                class="underline text-blue-600 cursor-pointer"
                                @click="goToDetailHoliday( version )"
                            >
                                {{ version.initialVersionTitle }}
                            </span>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-left text-gray-700">
                            <span> {{ dateFormatter(version.applicationPeriodStart, "M/D/YYYY") }}</span>
                            <span v-if="version.applicationPeriodEnd"> ~ {{ dateFormatter(version.applicationPeriodEnd, "M/D/YYYY") }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    mounted(){
        const res = this.versionList.some( v => v.versionApplicationStatus === 'SCHEDULED')
        console.log(res)
    },
    props : {
        versionList : Array,
        versionInfo : Object
    },
    emits : ["click-title", "insert-new"],
    data(){
        return{
            statusConvert : {
                SCHEDULED : "Scheduled",
                EXPIRED : "Expired",
                APPLIED : "Applied"
            }
        }
    },
    methods : {
        dateFormatter ( dateStr, formatStr = "MM/DD/yyyy" ){
            if( ! dateStr ){
                return null;
            }
            return moment( dateStr ).format( formatStr );
        },
        goToDetailHoliday( version ){
            const self = this;
            self.$emit("click-title", version );
        },
        insertNewVersionHoliday(){
            const self = this;
            self.$emit("insert-new");
        }
    }
}

</script>