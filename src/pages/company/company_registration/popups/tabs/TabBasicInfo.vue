<script>
import bankListJSON from '@/assets/data/bankList.json';
import { gender, maritalStatus } from "@/assets/data/optionData.js"
import provinceListJSON from "@/assets/data/province.json"
// eslint-disable-next-line no-unused-vars
import { ValidateUtil } from "@/plugins/app-util.js";
import cityListJSON from "@/assets/data/cityList.json"

export default {
    emits: ["afterSave"],
    props: {
    },
    data() {
        return {
            showNoti : false,
            showNotiErr : false,
            nowEdit: false,
            phoneNumberPrepend: "+63",
            nationalityOptions: [
                {
                    text: "Philippines",
                    value: "philippines",
                }
            ],
            provinceOptions : [],
            cityListOptions : [],
            genderOptions: gender,
            maritalStatusOptions: maritalStatus,
            bankAccountOptions: [],
            beforeEditData : {},
            employeeSeq : null,
            directInputBankName:null,
            request : {
                firstName: null,
                middleName: null,
                lastName: null,
                employeeName: null,
                nickName: null,
                phoneNumber: null,
                email: null,
                birthday: null,
                gender: null,
                maritalStatus: null,
                nationality: null,
                tinNo: null,
                passportNo: null,
                city: null,
                province: null,
                street: null,
                addr1: null,
                addr2: null,
                zipCode: null,
                bankName: null,
                bankAccountNumber: null,
                emergencyContactName: null,
                emergencyContactRelationship: null,
                emergencyContactPhoneNumber: null,
                workSchedule : null,
            },
            requestErrorMsg: {
                firstName: "First Name can't be blank",
                lastName: "Last Name can't be blank",
                phoneNumber: "Make sure that Phone Number should only contain numbers",
                phoneNumberUnder11 : "Phone number(include prepend number) should be more than 11 digits numbers",
                zipCode : "Make sure you enter valid Zipcode",
            },
            requestError: {
                firstName: null,
                lastName: null,
                phoneNumber: null,
                emergencyContactPhoneNumber: null,
                zipCode : null,
            },
        }; //return
    }, //data
    mounted(){
        const self = this;
        self.getBasicOptions();
        self.$emitter.$on('selectTab', args => {
            if(args.tabName === 'basicInfo') {
                self.employeeSeq = args.userSeq;
                self.nowEdit = false;
                self.errMsgReset();
                self.getBasicInfo();
            }
        })
    },
    methods:{
        getBasicOptions(){
            const self = this;
            self.bankAccountOptions = bankListJSON
                .sort((a,b)=>(a).localeCompare(b))
                .map(bank => ({ "text" : bank, "value": bank.split(" ").join('_').toUpperCase()}))
            self.bankAccountOptions.unshift({"text" : "Direct input", "value" : "DIRECT_INPUT"})
            self.provinceOptions = provinceListJSON
                .sort((a,b)=>(a.text).localeCompare(b.text))
                .map(province => ({ "text" : province.text, "value": province.text}))
        },
        setBasicInfoFromDB(dbData){
            const self = this;
            let { firstName, middleName, lastName ,employeeName ,nickName ,phoneNumber ,email ,birthday ,gender ,maritalStatus 
                ,nationality ,tinNo ,passportNo ,city ,province ,street ,addr1 ,addr2 ,zipCode 
                ,bankName ,bankAccountNumber ,emergencyContactName ,emergencyContactRelationship ,emergencyContactPhoneNumber } = dbData;
            
            self.employeeSeq = dbData.employeeSeq;
            
            phoneNumber = ValidateUtil.convertPhoneGlobalToLocal(phoneNumber);
            emergencyContactPhoneNumber = ValidateUtil.convertPhoneGlobalToLocal(emergencyContactPhoneNumber)
            self.directInputBankName = null;
            if( bankName && bankName.startsWith("DI_") ){
                self.directInputBankName = bankName.replace("DI_","");
                bankName = "DIRECT_INPUT"
            } 
            
            return { firstName, middleName, lastName ,employeeName ,nickName ,phoneNumber ,email ,birthday ,gender ,maritalStatus 
            ,nationality ,tinNo ,passportNo ,city ,province ,street ,addr1 ,addr2 ,zipCode 
            ,bankName ,bankAccountNumber ,emergencyContactName ,emergencyContactRelationship ,emergencyContactPhoneNumber };
        },
        getCityOptions( city = null ){
            const self = this;
            self.request.city = null;
            if(!self.request.province ) return;
            self.cityListOptions = cityListJSON[self.request.province]
                .map(city => ({text : city, value : city }))
            self.request.city = city;

        },
        getBasicInfo(){
            const self = this;
            const url = self.$api('uri', 'get-employee');
            self.$axios.get(`${url}/${encodeURIComponent(self.employeeSeq)}`).then((res) => {
                self.request = self.setBasicInfoFromDB(res.data.data)
                self.getCityOptions(res.data.data.city);
            })
        },
        editButtonClick(){
            const self = this;

            self.beforeEditData = { ...self.request };
            self.nowEdit = true;
        },
        cancelEditJBasicInfo() {
            const self = this;

            self.request = { ...self.beforeEditData };
            if(self.request.bankName != "DIRECT_INPUT" ) self.directInputBankName = null;
            self.nowEdit = false;
            self.errMsgReset();  
        },
        getDataForSave(){
            const self = this; 
            
            const saveData = { ...self.request };
            delete saveData.email;
            delete saveData.workSchedule;

            if(saveData.bankName == "DIRECT_INPUT") saveData.bankName = "DI_" + self.directInputBankName;
            self.directInputBankName = null;

            for( let key in saveData ){
                if ( ValidateUtil.checkIsEmpty( saveData[key] ) ) saveData[key] = null;
                if( !saveData[key]) continue;
                saveData[key] = saveData[key].trim();
                if ( ValidateUtil.checkIsEmpty( saveData[key] ) ) saveData[key] = null;
            } 

            saveData.employeeName = ValidateUtil.employeeNameSave( saveData.firstName, saveData.middleName, saveData.lastName );
            saveData.phoneNumber = ValidateUtil.convertPhoneLocalToGlobal(saveData.phoneNumber);
            if( !ValidateUtil.checkIsEmpty(saveData.emergencyContactPhoneNumber) ){
                saveData.emergencyContactPhoneNumber = ValidateUtil.convertPhoneLocalToGlobal(saveData.emergencyContactPhoneNumber)
            }
            console.log(" saveDATA" , saveData);

            return saveData;
        },
        saveBasicInfo() {
            const self = this;
            const url = self.$api('uri', 'put-employee-basic-info');

            self.errMsgReset();
            if(!self.isValidCheck()) {
                self.showNotiErr = true;
                return;
            }

            const saveData = self.getDataForSave();
            self.$axios.put(`${url}/${encodeURIComponent(self.employeeSeq)}`, saveData)
            .then( res => {
                console.log(' basic info post ', res.data);
                self.nowEdit = false;
                self.showNoti = true;
                self.$emit('afterSave');
                self.getBasicInfo();
            }).catch(err => console.error('basic info error => ', err))
        },
        isValidCheck(){
            const self =this;
            let isValid = true;
            
            if(ValidateUtil.checkIsEmpty(self.request.firstName)){
                self.requestError.firstName = self.requestErrorMsg.firstName;
                isValid = false; 
            }
            if(ValidateUtil.checkIsEmpty(self.request.lastName)){
                self.requestError.lastName = self.requestErrorMsg.lastName;
                isValid = false;
            }
            if(!ValidateUtil.convertPhoneLocalToGlobal(self.request.phoneNumber)){
                self.requestError.phoneNumber = self.requestErrorMsg.phoneNumberUnder11;
                isValid = false;
            }
            if(!ValidateUtil.checkIsEmpty(self.request.emergencyContactPhoneNumber)) {
                if(!ValidateUtil.convertPhoneLocalToGlobal(self.request.emergencyContactPhoneNumber)){
                    self.requestError.emergencyContactPhoneNumber = self.requestErrorMsg.phoneNumberUnder11;
                    isValid = false;
                }
            }
            if(!ValidateUtil.checkIsEmpty(self.request.zipCode) && !ValidateUtil.checkZipcode(self.request.zipCode)){
                self.requestError.zipCode = self.requestErrorMsg.zipCode;
                isValid = false;
            }  

            return isValid;
        },
        errMsgReset(){
            const self = this;
            for( let errMsgKey in self.requestError){
                self.requestError[errMsgKey] = '';
            }
        },
    },
    
};
</script>

<template>
<div class="mr-3">
    <div class="flex justify-between items-center mt-6 h-10">
        <h4 class="text-lg font-bold">Basic Information</h4>
        <button
            v-show="!nowEdit"
            class="
                border
                rounded
                border-blue-500
                w-24
                h-10
                bg-white
                text-sm
                font-semibold
                text-blue-500
                hover:bg-blue-100
                transition-all
                duration-500
                text-center
            "
            @click="editButtonClick"
        >
            Edit
        </button>
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">First Name</div>
        <ElementsInput
            v-model="request.firstName"
            placeholder="Enter First Name"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
            :maxlength="60"
            :error="requestError.firstName"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">Middle Name</div>
        <ElementsInput
            v-model="request.middleName"
            placeholder="Enter Middle Name"
            class="flex-1"
            :readonly="!nowEdit"
            :maxlength="60"
            :full="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">Last Name</div>
        <ElementsInput
            v-model="request.lastName"
            placeholder="Enter Last Name"
            class="flex-1"
            :readonly="!nowEdit"
            :maxlength="60"
            :full="true"
            :error="requestError.lastName"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">Nick Name</div>
        <ElementsInput
            v-model="request.nickName"
            placeholder="Enter Nick Name"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6 max-w-7xl">
        <div class="w-32 text-sm font-semibold text-slate-800 ">
            Phone Number
        </div>
        <ElementsInput
            v-model="phoneNumberPrepend"
            :width14="true"
            :disabled="true"
        />
        <ElementsInput
            v-model="request.phoneNumber"
            placeholder="Enter Phone Number"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
            :error="requestError.phoneNumber"
            :maxlength="16"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">Work Email</div>
        <ElementsInput
            v-model="request.email"
            class="flex-1"
            :disabled="true"
            :full="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">Birthday</div>
        <ElementsDate
            v-model="request.birthday"
            placeholder="MM.DD.YYYY"
            class="flex-1"
            :disabled="!nowEdit"
            :full="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">Gender</div>
        <ElementsSelectRef
            v-model="request.gender"
            placeholder="Select Gender"
            class="flex-1"
            :readonly="!nowEdit"
            :options="genderOptions"
            :full="true"
            :useDefaultMsg="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">
            Marital status
        </div>
        <ElementsSelectRef
            v-model="request.maritalStatus"
            placeholder="Select Marital status"
            class="flex-1"
            :readonly="!nowEdit"
            :options="maritalStatusOptions"
            :full="true"
            :useDefaultMsg="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">Nationality</div>
        <ElementsSelectRef
            v-model="request.nationality"
            placeholder="Select Nationality"
            class="flex-1"
            :readonly="!nowEdit"
            :options="nationalityOptions"
            :full="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">TIN No.</div>
        <ElementsInput
            v-model="request.tinNo"
            placeholder="Enter TIN No."
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">
            Passport No.
        </div>
        <ElementsInput
            v-model="request.passportNo"
            placeholder="Enter Passport No."
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
            :maxlength="44"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">
            Home Address
        </div>
        <ElementsInput
            v-model="request.addr1"
            placeholder="Unit / Lot / Bldg Number"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800"></div>
        <ElementsInput
            v-model="request.street"
            placeholder="Street / Barangay"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800"></div>
        <ElementsSelectRef
            v-model="request.province"
            placeholder="Select province"
            class="flex-1"
            :defaultMsg="'Select an province Option'"
            :full="true"
            :readonly="!nowEdit"
            :useDefaultMsg="true"
            :options="provinceOptions"
            @change="getCityOptions"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800"></div>
        <ElementsSelectRef
            v-model="request.city"
            placeholder="City / Municipality"
            class="flex-1"
            :defaultMsg="'Select an province first'"
            :useDefaultMsg="true"
            :readonly="!nowEdit"
            :full="true"
            :options="cityListOptions"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800"></div>
        <ElementsInput
            v-model="request.zipCode"
            placeholder="Zip Code"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
            :error="requestError.zipCode"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6 max-w-7xl">
        <div class="w-32 text-sm font-semibold text-slate-800">
            Bank account
        </div>
        <div class="flex flex-1 gap-2">
            <ElementsSelectRef
                v-model="request.bankName"
                placeholder="Select Bank"
                class="flex-1"
                :readonly="!nowEdit"
                :options="bankAccountOptions"
                :full="true"
                :useDefaultMsg="true"
                defaultMSG="Direct Input"
            />
            <ElementsInput
                v-show="request.bankName == 'DIRECT_INPUT'"
                v-model="directInputBankName"
                placeholder="Enter Bank name"
                class="flex-1"
                :readonly="!nowEdit"
                :full="true"
                :maxlength="40"
            />
        </div>
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">
            Account Number
        </div>
        <ElementsInput
            v-model="request.bankAccountNumber"
            placeholder="Enter Account Number"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
            :maxlength="40"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800">
            Emergency Contact
        </div>
        <ElementsInput
            v-model="request.emergencyContactName"
            placeholder="Enter Name"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
        <div class="w-32 text-sm font-semibold text-slate-800"></div>
        <ElementsInput
            v-model="request.emergencyContactRelationship"
            placeholder="Enter Relationship"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
            :maxlength="40"
        />
    </div>
    <div class="flex justify-between items-center gap-2 mt-6 max-w-7xl">
        <div class="w-32 text-sm font-semibold text-slate-800"></div>
        <ElementsInput
            v-model="phoneNumberPrepend"
            :width14="true"
            :disabled="true"
        />
        <ElementsInput
            v-model="request.emergencyContactPhoneNumber"
            placeholder="Enter Phone Number"
            class="flex-1"
            :readonly="!nowEdit"
            :full="true"
            :error="requestError.emergencyContactPhoneNumber"
            :maxlength="16"
        />
        
    </div>
    <div class="flex justify-between items-center gap-2 mt-6">
            <div class="flex justify-end items-center w-full bg-white">
                <ElementsButton
                    v-show="nowEdit"
                    text="Cancel"
                    :width28="true"
                    :height12="true"
                    :background-white="true"
                    @click="cancelEditJBasicInfo"
                />
                <ElementsButton
                    v-show="nowEdit"
                    class="ml-2"
                    text="Save"
                    :width28="true"
                    :height12="true"
                    @click="saveBasicInfo"
                />
            </div>
        </div>
        <ElementsNotification 
            v-model="showNoti" 
        />
        <ElementsNotification 
            v-model="showNotiErr" 
            :notificationMsg="'Please check the error message'"
            :warning="true"
        />
</div>
    
</template>
