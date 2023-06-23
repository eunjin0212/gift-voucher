<template>
    <div class="p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
        <form @submit.prevent="clickSubmit">
            <div class="my-2 flex flex-col gap-4 mx-4" >
                <div class="text-2xl font-bold"> company Information </div>
                <ElementsInput
                    :name="'Company Name'"
                    :full="true"
                    :maxlength="60"
                    v-model="registerData.companyName"
                    :required="true"
                />
                <ElementsInput
                    :name="'Representative Name'"
                    :full="true"
                    :maxlength="60"
                    v-model="registerData.representativeName"
                    :required="true"
                />
                <ElementsInput
                    :name="'Business registration number'"
                    :full="true"
                    :maxlength="60"
                    v-model="registerData.BusinessRegistrationNum"
                    :required="true"
                />
                <div class="text-sm font-semibold text-slate-800"> Company Number </div>
                <div class="w-full flex gap-2">
                    <ElementsInput
                        :modelValue="63"
                        :disabled="true"
                        :width14="true"
                        :maxlength="200"
                    />
                    <ElementsInput
                        class=""
                        v-model="registerData.companyNumber"
                        :full="true"
                        :maxlength="200"
                        :required="true"
                        :inputtype="'tel'"
                    />
                </div>
                <ElementsInput
                    v-model="registerData.companyEmail"
                    :name="'Company Email'"
                    :full="true"
                    :inputtype="'email'"
                    :maxlength="100"
                    :required="true"
                />
                <ElementsInput
                    v-model="registerData.companyAddress"
                    :name="'Company Address'"
                    :full="true"
                    :maxlength="199"
                    :required="true"
                />

                <div>
                    <div class="text-sm font-semibold text-slate-800 mb-3"> Contract File </div>
                    <template v-if="contractFile">
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                        <div class="text-blue-600 grid items-baseline" >
                            {{  contractFile.name }}
                        </div>
                        <div
                            class="border border-red-600 p-2 bg-white rounded-md font-semibold text-red-600 cursor-pointer"
                            name="poDocumentFile"
                            @click="$emit('update:contractFile', null )"
                        >
                            delete
                        </div>
                    </dd>
                    </template>

                    <template v-else>
                        <dd class="text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <input type="file"
                                class="w-full mt-1 shadow-sm block sm:text-sm bg-white border-gray-300 rounded-md"
                                multiple
                                @input="afterFileSelect"
                                :required="true"
                            />
                        </dd>
                    </template>
                </div>

                <div class="text-2xl font-bold mt-4"> PIC Information </div>
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
                <div class="text-sm font-semibold text-slate-800"> PIC Contract(Tel) </div>
                <div class="w-full gap-2v flex gap-1">
                    <ElementsInput
                        :modelValue="63"
                        :disabled="true"
                        :width14="true"
                        :maxlength="200"
                    />
                    <ElementsInput
                        v-model="registerData.subscriptionPicPhoneNumber"
                        :full="true"
                        :maxlength="60"
                        :required="true"
                        :inputtype="'tel'"
                    />
                </div>
            </div>

            <div class="flex justify-end gap-4 my-3">
                <ElementsButton
                    :backgroundWhite="true" :width32="true"
                    :text="'Cancel'"
                    :inputtype="'button'"
                    @clickEvent="$emit('back-to-list')"
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

export default{
    components : {

    },
    props : {
        contractFile :{
            default : ()=>{}
        }
    },
    emits : [ "next-step", "back-to-list", "update:contractFile"],
    methods:{
        getInquiryData(){
            const self = this;
            const params = new URLSearchParams( window.location.search );
            if( ! params.has( "inquirySeq" ) ){
                return;
            }
			let inquirySeq = params.get("inquirySeq");
            const url = self.$api("uri", "get-join-inquiry");
            self.$axios.get( `${url}/${ inquirySeq }`)
                .then( (res) => {
                    const { inquiryCompanyName, picDepartmentName
                            , picEmail, picName, picPhoneNumber } = res.data.data.data;
                    self.registerData = {
                        ...self.registerData,
                        joinInquirySeq : inquirySeq,
                        subscriptionPicDepartment : picDepartmentName,
                        subscriptionPicEmail : picEmail,
                        subscriptionPicName : picName,
                        subscriptionPicPhoneNumber : picPhoneNumber.replace(/\D/g, ''),
                        companyName : inquiryCompanyName,
                    };

                } )
                .catch( alert )
        },

        afterFileSelect( e ){
            const self = this;
            const { files } = e.target
            if( files.size < 0 ){
                return ;
            }
            self.$emit("update:contractFile", files[0] );

        },
        deleteSelectedFile(){
            const self = this;
            self.$emit("update:contractFile", null );
        },
        clickSubmit(){
            const self = this;
            if( ! self.validatePhoneNumber() ){
                alert( "Please enter a valid phone number. The number should start with either 09 or 08 and have more than 11 digits." );
                return;
            }

            self.$emit("next-step", self.registerData );
        },
        validatePhoneNumber() {
            const self = this;
            let { subscriptionPicPhoneNumber, companyNumber } = self.registerData;

            subscriptionPicPhoneNumber = subscriptionPicPhoneNumber.replace(/\D/g, '');
            companyNumber = companyNumber.replace(/\D/g, '');
            const regex = /^(09|08)\d{9,}$/;
            let isValid = regex.test( subscriptionPicPhoneNumber );
            isValid = regex.test(companyNumber);
            return isValid;
        },
    },
    data() {
        return{
            registerData : {
                companyName : null,
                representativeName : "",
                BusinessRegistrationNum : "",
                companyNumber : "",
                companyEmail : "",
                companyAddress : "",
                contractFilePath : "",
                subscriptionPicDepartment : null,
                subscriptionPicEmail : null,
                subscriptionPicName : null,
                subscriptionPicPhoneNumber : null,
                joinInquirySeq : ""
            },
        }
    },
    mounted(){
        const self = this;
        self.getInquiryData();
    }
}


</script>
