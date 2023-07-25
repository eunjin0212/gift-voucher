<template >
    <div>
        <div class="flex gap-1 py-3">
            <ArrowLeftIcon class="w-7 cursor-pointer" @click="goToList"/>
            <h1 class="text-zinc-800 text-xl font-semibold leading-10 items-center ">
                Detail
            </h1>
        </div>

        <div class="bg-white border-[1px] border-gray-200 py-7">

            <dl class="">
                <div class="px-5 py-2 grid grid-cols-4 gap-4 ">
                    <dt class="text-sm font-semibold leading-6 text-gray-900">Title</dt>
                    <dd class="text-sm leading-6 text-gray-700 col-span-3 mt-0">
                        {{ versionInfo.initialVersionTitle }}
                    </dd>
                </div>
                <div class="px-5 py-2 grid grid-cols-4 gap-4 ">
                    <dt class="text-sm font-semibold leading-6 text-gray-900">Application Start Date</dt>
                    <dd class="text-sm leading-6 text-gray-700 col-span-3 mt-0">
                        {{  dateFormatter(versionInfo.applicationPeriodStart)  }}
                    </dd>
                </div>
                <div class="px-5 py-2 grid grid-cols-4 gap-4 ">
                    <dt class="text-sm font-semibold leading-6 text-gray-900">Status</dt>
                    <dd class="text-sm leading-6 text-gray-700 col-span-3 mt-0">
                        {{ statusConvert[versionInfo.versionApplicationStatus]}}
                    </dd>
                </div>
            </dl>

            <div class="pl-5 py-6 pr-64">
                <table class="divide-y divide-gray-300 ring-1 ring-black ring-opacity-5 min-w-[40vw] ">
                    <thead>
                        <tr>
                            <th scope="col" class="border border-neutral-200 bg-indigo-700 text-white px-3 py-3.5 text-left text-sm sm:pl-6"> Holiday Name </th>
                            <th scope="col" class="border border-neutral-200 bg-indigo-700 text-white px-3 py-3.5 text-center text-sm"> Date</th>
                            <th scope="col" class="border border-neutral-200 bg-indigo-700 text-white px-3 py-3.5 text-center text-sm"> Type </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="(holiday, index) in initialList"
                            v-bind:key="index"
                        >
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-left text-gray-500 border border-neutral-200">
                                {{ holiday.holidayName }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-center text-gray-500 border border-neutral-200">
                                {{ dateFormatter(holiday.holidayDatetime, "MM/DD", "MMDD")}}
                            </td>
                            <td class="whitespace-nowrap px-3 py-5 text-sm text-center text-gray-500 border border-neutral-200">
                                {{ holidayTypeOptions[holiday.holidayType]}}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex gap-4 py-10 " v-if="versionInfo.versionApplicationStatus === 'SCHEDULED'">
                    <ElementsButton
                        :backgroundWhite="true"
                        text="Delete"
                        :width32="true"
                        @clickEvent="clickDeleteButton"
                    />
                    <ElementsButton
                        :width32="true"
                        text="Edit"
                        @clickEvent="updateInitialHolidays"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { ArrowLeftIcon  } from '@heroicons/vue/solid'

export default{
    components : {
        ArrowLeftIcon
    },
    props: {
        initialList : Array,
        versionInfo : Object,
    },
    emits : ["edit-initials", "delete-version", "go-list"],
    data(){
        return{
            statusConvert : {
                SCHEDULED : "Scheduled",
                EXPIRED : "Expired",
                APPLIED : "Applied"
            },
            holidayTypeOptions : {
                REGULAR_HOLIDAY : "Regular Holiday",
                SPECIAL_NON_WORKING_DAY : "Special Non Working Day",
                SPECIAL_WORKING_DAY : "Special Working Day"
            }
        }
    },
    methods : {
        dateFormatter ( dateStr, outputFormat = "MM/DD/yyyy", inputFormat ){
            if( ! dateStr ){
                return null;
            }
            return moment( dateStr , inputFormat ).format( outputFormat );
        },
        updateInitialHolidays(){
            const self = this;
            self.$emit("edit-initials");
        },
        clickDeleteButton(){
            const self = this;
            if ( ! confirm("Are you sure to delete ? ") ){
                return;
            }
            self.$emit("delete-version");
        },
        goToList(){
            const self = this;
            self.$emit("go-list");
        }
    }
}

</script>