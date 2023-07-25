<template>
    <div>
        <div class="flex gap-1 py-3">
            <ArrowLeftIcon class="w-7 cursor-pointer" @click="goToList"/>
            <h1 class="text-zinc-800 text-xl font-semibold leading-10 items-center ">
                Update Holiday
            </h1>
        </div>

        <div class="bg-white border-[1px] border-gray-200 py-7 px-1">

            <template v-if="true">
                <dl class="">
                    <div class="px-5 py-2 grid grid-cols-4 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Title *</dt>
                        <dd class="text-sm leading-6 text-gray-700 col-span-3 mt-0">
                            <ElementsInput
                                v-model.trim="detailData.initialVersionTitle"
                            />
                        </dd>
                    </div>
                    <div class="px-5 py-2 grid grid-cols-4 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900">Application Start Date *</dt>
                        <dd class="text-sm leading-6 text-gray-700 col-span-3 mt-0">
                            <ElementsDate
                                v-model="detailData.applicationPeriodStart"
                                :lowerLimit="todayDate"
                            />
                        </dd>
                    </div>
                </dl>

                <div class="pl-5 py-6 pr-64">
                    <table :class="{ 'w-full' : (detailData.holidayList.length == 0) }">
                        <thead>
                            <tr>
                                <th scope="col" class="border border-neutral-200 bg-indigo-700 text-white px-3 py-3.5 text-left text-sm sm:pl-6"> Holiday Name </th>
                                <th scope="col" class="border border-neutral-200 bg-indigo-700 text-white px-3 py-3.5 text-left text-sm"> Date</th>
                                <th scope="col" class="border border-neutral-200 bg-indigo-700 text-white px-3 py-3.5 text-left text-sm"> Type </th>
                                <th scope="col" class="text-white px-3 py-3.5 text-left text-sm"> Type </th>
                            </tr>
                        </thead>
                        <tbody class="" v-if="detailData.holidayList.length == 0">
                            <tr>
                                <td colspan="5" class="flex h-[20vh] w-full items-center justify-center"> No Holiday Added </td>
                            </tr>
                        </tbody >
                        <tbody v-else class=" bg-white">

                            <tr v-for="(holiday, index) in detailData.holidayList"
                                v-bind:key="index"
                            >
                                <td class="px-2 text-sm border border-neutral-200">
                                    <ElementsInput
                                        :width56="true"
                                        v-model.trim="holiday.holidayName"
                                        :isError="! holiday.holidayName "
                                    />
                                </td>
                                <td class="px-2 text-sm text-center border border-neutral-200">
                                    <ElementsInput
                                        :width56="true"
                                        v-model.trim="holiday.holidayDatetime"
                                        :placeholder="'MM/DD'"
                                        :isError=" ! holiday.holidayDatetime || ! testDateRegex( holiday.holidayDatetime ) "
                                        :textCenter="true"
                                    />

                                </td>
                                <td class="px-2 pb-1 text-sm text-center border border-neutral-200">
                                    <ElementsSelect
                                        :width60="true"
                                        :options="holidayTypes"
                                        v-model="holiday.holidayType"
                                    />
                                </td>
                                <td class="px-2 text-sm text-center">
                                    <div class="w-[42px] h-[42px] relative cursor-pointer"
                                        @click="deleteExistRows(holiday)"
                                    >
                                        <div class="w-[42px] h-[42px] left-0 top-0 absolute bg-red-500 rounded-[5px]"></div>
                                        <div class="w-[21px] h-[3.36px] left-[11px] top-[19.40px] absolute bg-white"></div>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>


                    <form class="pt-10" @submit.prevent="clickAddRow">
                        <table>
                            <tr class="pt-100">
                                <td class="px-2 text-sm ">
                                    <ElementsInput
                                        :width56="true"
                                        :required="true"
                                        v-model.trim="addRows.holidayName"
                                    />
                                </td>
                                <td class="px-2 text-sm text-center ">
                                    <ElementsInput
                                        :width56="true"
                                        v-model.trim="addRows.holidayDatetime"
                                        :placeholder="'MM/DD'"
                                        :textCenter="true"
                                        :required="true"
                                        :isError="addRows.dateRegexErr"
                                    />
                                </td>
                                <td class="px-2 pb-1 text-sm text-center">
                                    <ElementsSelect
                                        :width60="true"
                                        :options="holidayTypes"
                                        v-model="addRows.holidayType"
                                    />
                                </td>
                                <td class="px-2 text-sm text-center" >
                                    <button class="w-[42px] h-[42px] relative cursor-pointer"
                                        inputtype="'submit'"
                                    >
                                        <div class="w-[42px] h-[42px] left-0 top-0 absolute bg-indigo-600 rounded-[5px]"></div>
                                        <div class="w-[21px] h-[21px] left-[11px] top-[11px] absolute">
                                            <div class="w-[21px] h-[3.36px] left-0 top-[8.40px] absolute bg-white"></div>
                                            <div class="w-[21px] h-[3.36px] left-[9.24px] top-[21px] absolute origin-top-left -rotate-90 bg-white"></div>
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </template>

            <template v-if="false">
                <dl class="">
                    <div class="px-5 py-2 grid grid-cols-4 gap-4 ">
                        <dt class="text-sm font-semibold leading-6 text-gray-900">Title</dt>
                        <dd class="text-sm leading-6 text-gray-700 col-span-3 mt-0">
                            2023 Holiday
                        </dd>
                    </div>
                    <div class="px-5 py-2 grid grid-cols-4 gap-4 ">
                        <dt class="text-sm font-semibold leading-6 text-gray-900">Application Start Date</dt>
                        <dd class="text-sm leading-6 text-gray-700 col-span-3 mt-0">
                            01/01/2023
                        </dd>
                    </div>
                    <div class="px-5 py-2 grid grid-cols-4 gap-4 ">
                        <dt class="text-sm font-semibold leading-6 text-gray-900">Status</dt>
                        <dd class="text-sm leading-6 text-gray-700 col-span-3 mt-0">
                            Scheduled
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
                            <tr v-for="(history, index) in Array.from( Array(10))"
                                v-bind:key="index"
                            >
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-left text-gray-500 border border-neutral-200">
                                    New Year's Day
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-center text-gray-500 border border-neutral-200">
                                    1/1
                                </td>
                                <td class="whitespace-nowrap px-3 py-5 text-sm text-center text-gray-500 border border-neutral-200">
                                    Regular Holiday
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </template>

            <template v-if="versionInfo.holidayInitialVersionSeq">
                <div class="flex gap-4 pt-4 pb-10 px-5">
                    <ElementsButton
                        :backgroundWhite="true"
                        text="Cancel"
                        :width32="true"
                        @clickEvent="backToInitial"
                    />
                    <ElementsButton
                        :width32="true"
                        text="Edit"
                        @clickEvent="saveUpdateHolidayPackage"
                    />
                </div>
            </template>
            <template v-else>
                <div class="flex gap-4 pt-4 pb-10 px-5">
                    <ElementsButton
                        :backgroundWhite="true"
                        text="Cancel"
                        :width32="true"
                        @clickEvent="goToList"
                    />
                    <ElementsButton
                        :width32="true"
                        text="Update"
                        @clickEvent="saveUpdateHolidayPackage"
                    />
                </div>
            </template>

        </div>
    </div>
</template>

<script>
import moment from "moment";
import { ArrowLeftIcon  } from '@heroicons/vue/solid'

export default {
    components : {
        ArrowLeftIcon
    },
    props : {
        initialList : Array,
        versionInfo : Object,
        currentView : String,
    },
    emits : [ "insert-initial", "update-initial", "go-list", "go-initial-view" ],
    mounted(){
        const self = this;
        self.detailData.holidayList = self.initialList.map( holiday =>  {
            const { holidayInitialSeq, holidayDatetime, holidayType, holidayName } = holiday
            return { holidayName, holidayType, holidayInitialSeq
                    , holidayDatetime : self.convertMMDDToDate( holidayDatetime )
                    , dateRegexErr : false }
        });

        const { applicationPeriodStart, initialVersionTitle } = self.versionInfo;

        self.detailData.initialVersionTitle = initialVersionTitle;
        self.detailData.applicationPeriodStart = applicationPeriodStart;
    },
    data(){
        return {
            todayDate : moment().add(1, 'days').format('yyyy-MM-DD HH:mm:ss'),

			holidayTypes : [
				{ text : 'Regular Holiday' , value : 'REGULAR_HOLIDAY' },
				{ text : 'Special Non-Working Day' , value : 'SPECIAL_NON_WORKING_DAY' },
				{ text : 'Special Working Day' , value : 'SPECIAL_WORKING_DAY' }
			],
            holidayType : "REGULAR_HOLIDAY",
            detailData : {
                initialVersionTitle : "",
                applicationPeriodStart : "",
                holidayList : []
            },
            addRows : {
                holidayName : "",
                holidayDatetime : "",
                holidayType : "REGULAR_HOLIDAY",
                dateRegexErr : false,
                holidayInitialSeq : null,
            },
        }
    },
    methods:{
        goToList(){
            const self = this;
            self.$emit("go-list");
        },
        backToInitial(){
            const self = this;
            self.$emit("go-initial-view");
        },
        clickAddRow(){
            const self = this;
            if(! self.testDateRegex( self.addRows.holidayDatetime ) ) {
                self.addRows.dateRegexErr = true;
                alert("Please provide the date in the format 'HH/MM'.")
                return;
            }

            if( self.duplicationCheck() ){
                self.addRows.dateRegexErr = true;
                alert("Date is duplicated.")
                return;
            }
            self.detailData.holidayList.push( self.addRows );
            self.addRows = { holidayName : "", holidayDatetime : "", holidayType : "REGULAR_HOLIDAY", dateRegexErr : false };
        },
        deleteExistRows( row ) {
            const self = this;

            self.detailData.holidayList = self.detailData.holidayList
                                            .filter(item => item.holidayName !== row.holidayName && item.holidayDatetime !== row.holidayDatetime );
        },
        saveUpdateHolidayPackage(){
            const self = this;
            if( ! self.validationValues() ) {
                return;
            }

            if( ! confirm("Are you sure to update?") ){
                return;
            }

            const {initialVersionTitle, applicationPeriodStart } = self.detailData;
            let submitData = { initialVersionTitle, applicationPeriodStart }

            submitData["holidayList"] = self.detailData.holidayList
                                .map( holiday =>{
                                    const {holidayInitialSeq, holidayName, holidayDatetime, holidayType } = holiday;
                                    return {
                                        holidayName, holidayType, holidayInitialSeq,
                                        holidayDatetime : self.convertMMDDString(holidayDatetime)
                                    }
                                } )

            if(  self.versionInfo.holidayInitialVersionSeq ){
                self.$emit("update-initial" , submitData );
            }else{
                self.$emit("insert-initial" , submitData );
            }

        },
        validationValues(){
            const self = this;

            if( ! self.detailData.initialVersionTitle || ! self.detailData.applicationPeriodStart ){
                alert("The content shouldn't be empty");
                return false;
            }

            const emptyTest = self.detailData.holidayList.some( holiday => ! holiday.holidayName || ! holiday.holidayDatetime );
            if( emptyTest ){
                alert("The content shouldn't be empty");
                return false;
            }

            if( self.detailData.holidayList.length < 1 ){
                alert("array should be more than one ");
                return false;
            }
            // date check
            const dateArr = self.detailData.holidayList.map( h => h.holidayDatetime );

            let regexText = dateArr.some( date => ! self.testDateRegex( date ) );
            if( regexText ) {
                alert("Please provide the date in the format 'HH/MM'.")
                return false;
            }

            const mmddArr = dateArr.map( date => self.convertMMDDString(date) );
            const uniqueDates = new Set( mmddArr );

            if( uniqueDates.size !== mmddArr.length ) {
                alert("Date is duplicated.");
                return false;
            }

            return true;
        },
        testDateRegex(dateString) {
            const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])$/;
            if (!dateRegex.test(dateString)) return false;

            const [month, day] = dateString.split('/').map(Number);

            const daysInMonth = {
                1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30,
                7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
            };

            return day <= daysInMonth[month];
        },
        duplicationCheck(){
            const self = this;
            return self.detailData.holidayList
                        .some( h => self.convertMMDDString( h.holidayDatetime ) === self.convertMMDDString( self.addRows.holidayDatetime ) );
        },
        convertMMDDString( dateStr ){
            let [ month, day ] = dateStr.split("/");
            month = month.padStart( 2, "0");
            day = day.padStart(2, "0");

            return month+day;
        },
        convertMMDDToDate( MMDD ){
            let month = MMDD.substring(0,2);
            let day = MMDD.substring(2);

            return `${month}/${day}`
        }
    }

}
</script>