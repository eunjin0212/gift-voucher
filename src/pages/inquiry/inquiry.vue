<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'Inquiry'">
            <div class="flex flex-col items-end gap-5 flex-wrap py-5 pr-5">
                <div class="flex flex-row justify-between w-full">
                    <ElementsButton
                        :backgroundWhite="true"
                        :text="'Delete'"
                        :width28="true" :fitHeight="true"
                        @click="deleteInquiry"
                    />
                    <div class="flex gap-2">
                        <ElementsSelect 
                            :options="[{ text : 'Company name' , value : 'COMPANY'}]"
                            :width60="true"
                            modelValue="COMPANY"
                        />
                        <ElementsInput 
                            :width60="true"
                            v-model="json_query.companyName"
                        />
                        <ElementsButton
                            :text="'Search'"
                            :width28="true"
                            :fitHeight="true"
                            @clickEvent="getJoinInquiry"
                        />
                    </div>
                </div>
            </div>
            <div class=" mt-6 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="relative min-w-full divide-y divide-gray-300">
                    <thead class="sticky bg-gray-50 top-0 left-0 right-0 " style="z-index: 1;">
                        <tr>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900 sm:pl-6">
                                <div class="flex h-5 items-center">
                                    <input
                                        v-model="deleteAllInquiry"
                                        id="all" name="all" type="checkbox" class="h-4 w-4 rounded border-gray-300  focus:ring-indigo-500" 
                                    />
                                </div>
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Reg Date</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Company Name </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Number of Employees</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">PIC Name</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Department</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Work Email</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Phone Number</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Consultation Employees</th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm text-gray-900">Consultation Date</th>
                            <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span class="sr-only"> Registration </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="(inquiry, index) in join_inquiry.list" v-bind:key="index" >
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:pl-6"> 
                                <div class="flex h-5 items-center">
                                    <input
                                        :value="inquiry" v-model="deleteInquiryArray" 
                                        id="" name="delete" type="checkbox" class="h-4 w-4 rounded border-gray-300  focus:ring-indigo-500" 
                                    />
                                </div>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ dateFormatChage(inquiry.inquiryRequestDatetime, "MM/DD/yyyy hh:mm")}} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-blue-400 underline cursor-pointer" @click="editInquiryConsultationData(inquiry)"> {{ inquiry.inquiryCompanyName }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ inquiry.employmentCount }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ inquiry.picName }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ inquiry.picDepartmentName }}  </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ inquiry.picEmail }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ inquiry.picPhoneNumber }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ inquiry.consultantEmpName }} </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900"> {{ dateFormatChage(inquiry.consultationDatetime) }} </td>
                            <td class="relative whitespace-nowrap py-4 pr-4 text-right text-sm font-medium sm:pr-6">
                                <ElementsButton 
                                    :text="'Registration'"
                                    :width28="true"
                                    :borderRed="true"
                                    @clickEvent="goToRegistrationPage( inquiry.joinInquirySeq )" 
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-3 w-full h-28 flex justify-center items-center">
                <ElementsPagination
                    v-model="join_inquiry.page"
                    :totalContent="join_inquiry.total"
                    :contentsPerPage="json_query.limit"
                    @clickPage="afterClickPage"
                />
            </div>
        </AppMain>
        <Teleport to="body">
            <AppPopup 
                v-model="editConsultaion.isOpen"
                :name="'Edit Consultation'"
            >
                <EditConsultation 
                    :inquiryData="inquiryData"
                    @update="updateInquiry"    
                />
            </AppPopup>
        </Teleport>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import EditConsultation from "@/pages/inquiry/popups/editConsultation.vue"
import moment from "moment";

export default {
    components : {
        AppAside, AppMain, EditConsultation
    },
    data(){
        return{
            editConsultaion : {
                isOpen : false,
            },
            inquiryData : {},
            join_inquiry : {
                list : [],
                total : 0,
                page : 1, 
            },
            json_query : {
                limit : 10,
                offset : 0,
                companyName : null,
            },
            paginationData : {
                total : 0,
                offset : 1,
            },
            deleteInquiryArray : [],
        }
    },
    methods : {
        deleteInquiry(){
            const self = this;

            const deleteInquiryList = self.deleteInquiryArray.map( inquiry => inquiry.inquiryCompanyName ).join(", ");
            const isConfirmed = window.confirm( `are you sure to delet inquiry of [ ${ deleteInquiryList } ]` );

            if( ! isConfirmed ){
                return;
            }

            const url = self.$api( "uri", "not-display-join-inquiry" );
            self.$axios.delete( url , { data : self.deleteInquiryArray } )
                .then( () => {
                    alert( " sccess to delete ");
                    self.getJoinInquiry();
                })
                .catch( alert )
        },
        getJoinInquiry( offset = 0, afterClickPage = false  ){
            const self = this;
            const url = self.$api( "uri", "get-join-inquiry" );
            self.json_query = { ...self.json_query, offset }
            
            self.$axios.get( url, { params : { json_query : JSON.stringify( self.json_query ) } } )
                .then( res => {
                    self.join_inquiry.list = res.data.data.list;
                    self.join_inquiry.total = res.data.data.total;
                    if( ! afterClickPage ){
                        self.join_inquiry.page = 1;
                    }
                })
        },
        afterClickPage( item ){
            const self = this;
            self.getJoinInquiry( item, true );
        },
        dateFormatChage( date, format= "MM/DD/yyyy" ){
            if( ! date ) return;
            return moment(date).format(format);
        },
        editInquiryConsultationData( item ){
            const self = this;
            self.editConsultaion.isOpen = true;
            self.inquiryData = item;
            console.log( { item } )
        },
        updateInquiry(){
            const self = this;
            self.getJoinInquiry( self.json_query.offset, true )
            self.editConsultaion.isOpen = false; 
        },
        goToRegistrationPage( inquirySeq ){
            location.href = `/company/company_registration?inquirySeq=${ inquirySeq }`
        }
    },
    computed : {
        deleteAllInquiry : {
            get(){
                const self = this;
                return self.deleteInquiryArray.length === self.join_inquiry.list.length
            },
            set( isSelected ){
                const self = this;
                self.deleteInquiryArray = isSelected ? self.join_inquiry.list  : []
            }
        }
    },
    mounted(){
        const self = this;
        self.getJoinInquiry();
    }
}
</script>