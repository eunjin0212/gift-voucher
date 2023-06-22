<template>
    <div class="p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
        <form @submit.prevent="clickSubmit">
            <div class="my-2 flex flex-col gap-4" >
                <div class="text-2xl font-bold"> company Information </div>
                <ElementsInput
                    :name="'Company Name'"
                    :width72="true"
                    :maxlength="60"
                    v-model="registerData.companyName"
                    :required="true"
                />
                <ElementsInput
                    v-model="registerData.subscriptionPicName"
                    :name="'PIC Name'"
                    :full="true"
                    :maxlength="60"
                    :required="true"
                />
                <ElementsInput
                    v-model="registerData.subscriptionPicDepartment"
                    :name="'PIC Department'"
                    :full="true"
                    :maxlength="60"
                    :required="true"
                />
                <ElementsInput
                    v-model="registerData.subscriptionPicEmail"
                    :name="'PIC Email'"
                    :full="true"
                    :inputtype="'email'"
                    :maxlength="100"
                    :required="true"
                />
                <ElementsInput
                    v-model="registerData.subscriptionPicPhoneNumber"
                    :name="'PIC Phone number'"
                    :full="true"
                    :maxlength="60"
                    :inputtype="'tel'"
                    :required="true"
                />
            </div>
            <div class="my-7 flex flex-col gap-4">
                <div class="text-2xl font-bold"> Service Usage Information </div>
                <ElementsDate
                    :name="'Start Date'"
                    v-model="registerData.subscribeStartDate"
                />
                <ElementsDate
                    :name="'End Date'"
                    v-model="registerData.subscribeEndDate"
                />
                <div>
                    <h1 class="text-sm font-semibold text-slate-800"> Number of Employee </h1>
                    <input type="number"
                        class="w-44 mt-1 shadow-sm block sm:text-sm border-gray-300 rounded-md"
                        :min="1"
                        v-model="registerData.employmentCount"
                        :required="true"
                    />
                </div>
                <ElementsDate
                    :name="'Use Fee Deposit Date'"
                    v-model="registerData.useFeeDepositDate"
                />
                <ElementsSelect
                    :name="'FlexBen Type'"
                    :full="true"
                    :options="flexbenTypeOptions"
                    v-model="registerData.flexbenCampaignSeq"
                />
            </div>
            <div class="flex justify-end gap-4 my-3">
                <ElementsButton
                    :backgroundWhite="true" :width32="true"
                    :text="'Cancel'"
                    :inputtype="'button'"
                    @click="backToList"
                />
                <ElementsButton
                    :width32="true"
                    :text="'Next'"
                    :inputtype="'submit'"
                />
            </div>
        </form>
    </div>
</template>

<script>
import moment from "moment";

export default{
    components : {

    },
    methods:{
        backToList(){
            location.href="/company/company_list";
        },
        getFlexbenType(){
            const self = this;
            const url = self.$api("uri", "get-flexben-campaign-List");
            self.$axios.get( url )
                .then( res => {
                    self.flexbenTypeOptions= res.data.data.list.map(( { bizCampaignId, flexbenCampaignSeq, flexbenCampaignTitle}) =>({
                            text : flexbenCampaignTitle,
                            value : flexbenCampaignSeq,
                            bizCampaignId
                        })
                    );
                })
        },
        clickSubmit(){
            const self = this;
            if( ! self.validationCheck() ) {
                alert( "Please enter the contents." );
                return;
            }

            if( ! self.validatePhoneNumber() ){
                alert( "Please enter a valid phone number. The number should start with either 09 or 08 and have more than 11 digits." );
                return;
            }

            if( ! self.validationTimeCheck() ){
                alert("The start date should be earlier than the end date.");
                return;
            }

            const registerData = {
                                    ...self.registerData,
                                    subscriptionPicPhoneNumber : self.registerData.subscriptionPicPhoneNumber.replace(/\D/g, '')
                                };

            const url = self.$api("uri", "post-company" );
            self.$axios.post( url , registerData )
                .then( () => {
                    alert("success to regiter company" )
                    location.href = "/company/company_list";
                })
                .catch( alert )
        },
        validationCheck(){
            const self = this;
            let isValid = true;

            const { subscribeStartDate, subscribeEndDate, useFeeDepositDate, flexbenCampaignSeq } = self.registerData;

            Object.values({ subscribeStartDate, subscribeEndDate, useFeeDepositDate, flexbenCampaignSeq }).map( (  value ) => {
                if( ! value ){
                    isValid = false;
                    return;
                }
            });

            return isValid;
        },
        validatePhoneNumber() {
            const self = this;
            let { subscriptionPicPhoneNumber } = self.registerData;

            subscriptionPicPhoneNumber = subscriptionPicPhoneNumber.replace(/\D/g, '');
            const regex = /^(09|08)\d{9,}$/;
            return regex.test( subscriptionPicPhoneNumber );
        },
        validationTimeCheck(){
            const self = this;
            const { subscribeStartDate, subscribeEndDate } = self.registerData;
            const startDate = moment( subscribeStartDate );
            const endDate = moment( subscribeEndDate );

            return endDate.isAfter(startDate);
        },
        getInquiryData(){
            const self = this;
            const params = new URLSearchParams( window.location.search );
            if( ! params.has( "inquirySeq" ) ){
                return;
            }
			let inquirySeq = params.get("inquirySeq");
            const url = self.$api("uri", "get-join-inquiry");
            console.log( url , inquirySeq )
            self.$axios.get( `${url}/${ inquirySeq }`)
                .then( (res) => {
                    const { inquiryCompanyName, employmentCount, picDepartmentName
                            , picEmail, picName, picPhoneNumber } = res.data.data.data;
                    self.registerData = {
                        ...self.registerData,
                        joinInquirySeq : inquirySeq,
                        employeeCount : employmentCount,
                        inquiryCompanyName : null,
                        subscriptionPicDepartment : picDepartmentName,
                        subscriptionPicEmail : picEmail,
                        subscriptionPicName : picName,
                        subscriptionPicPhoneNumber : picPhoneNumber.replace(/\D/g, ''),
                        companyName : inquiryCompanyName,
                    };

                } )
                .catch( alert )
        },
    },
    data() {
        return{
            registerTab :
                    [
                        {  name: 'Company Information', href: '#', initial: '01', current: true },
                        {  name: 'Service Usage Information', href: '#', initial: '02', current: false },
                    ],
            flexbenTypeOptions : [],
            registerData : {
                companySeq : "",
                employeeCount : 1,
                inquiryCompanyName : null,
                subscriptionPicDepartment : null,
                subscriptionPicEmail : null,
                subscriptionPicName : null,
                subscriptionPicPhoneNumber : null,
                companyName : null,
                subscribeStartDate : null,
                subscribeEndDate : null,
                useFeeDepositDate : null,
                flexbenCampaignSeq : "",
                joinInquirySeq : ""
            }
        }
    },
    mounted(){
        const self = this;
        self.getFlexbenType();
        self.getInquiryData();
    }
}


</script>
