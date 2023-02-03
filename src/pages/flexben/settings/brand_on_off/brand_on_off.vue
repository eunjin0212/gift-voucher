<template>
    <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
        <form @submit.prevent="getCompanyListWithBrandOff()" class="flex justify-end mt-5 gap-2">
            <ElementsInput
                :width60="true" 
                :height11="true"
                :placeholder="'Search Company'"
                :required="true"
                v-model="searchOptions.companyName"
            />
            <ElementsButton
                :width32="true"
                :text="'Search'"
                :inputtype="'submit'"
            />
        </form>
        <div class="mt-6 overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="whitespace-no-wrap px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-6">Company</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900">Number of Activate brands</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900">Sumber of Deactivated brands</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 ">  Brand Setting </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 w-4/12">   </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(company, index) in companyWithBrand.list" v-bind:key="index" >
                        <td class="whitespace-pre-wrap px-3 py-4 text-left text-sm text-gray-900 sm:pl-6"> {{ company.companyName}} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> {{ countOffBrandAll - company.countOff }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> {{ company.countOff }} </td>
                        <td class="whitespace-nowrap text-sm text-gray-900 pr-3"> 
                            <div class="cursor-pointer text-red-600 border text-center border-red-300 px-5 py-2 rounded-md"
                                @click="clickBrandOnOffBtn( company )"
                            > 
                                Brand on/off 
                            </div> 
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">  </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-full h-28 flex justify-center items-center">
            <ElementsPagination
                v-model="companyWithBrand.page"
                :totalContent="companyWithBrand.total"
                :contentsPerPage="companyWithBrand.limit"
                @clickPage="clickPageButton"
            />
        </div>
        <Teleport to="body">
            <AppPopup 
                v-model="editBrandpopup.isOpen" 
                :buttonText="'Change'"
                @buttonEvent="editBrandOffList"
            >
                <BrandOnOffEdit
                    :brandList="editBrandpopup.brandList"
                    ref="blockList"
                />
            </AppPopup>
        </Teleport>
    </div>
</template>

<script>
import BrandOnOffEdit from '@/pages/flexben/settings/popup/brand_on_off_edit.vue'
import AppPopup from "@/components/AppPopup.vue"

export default {
    components :{
        BrandOnOffEdit, AppPopup
    },
    data(){
        return {
            editBrandpopup : {
                isOpen : false,
                brandList : [],
                brandOffList : [],
                companySeq : "",
                flexbenWalletCompanySeq : ""
            },
            companyWithBrand : {
                list : [],
                total : 0,
                limit : 10,
                offset : null,
                page : 1,
            },
            searchOptions : {
                companyName : ""
            },
            countOffBrandAll : 0,
        }
    },
    methods : {
        editBrandOffList(){
            const self = this;
            self.editBrandpopup.brandOffList = self.$refs.blockList.brand_off_list;
            
            const {brandOffList, companySeq, flexbenWalletCompanySeq } = self.editBrandpopup;
            
            const url = self.$api("uri", "put-company-brand-on-off");
            self.$axios.put( url , { brandOffList, companySeq, flexbenWalletCompanySeq } )
                .then( () => {
                    self.editBrandpopup.isOpen = false;
                    self.getCompanyListWithBrandOff();
                    // alert(' successs ');
                })
                .catch( err => {
                    const { code, message } = err.response.data; 
                    const errMsg = code ? code + "\n" + message : err;
                    alert( errMsg )
                })
        },
        clickBrandOnOffBtn( { companySeq, flexbenWalletCompanySeq } ){
            const self = this;
            self.editBrandpopup = { ...self.editBrandpopup, companySeq, flexbenWalletCompanySeq }
            const url = self.$api("uri", "get-company-company-brand-off");
            const params = new URLSearchParams();
            params.append( "json_query", JSON.stringify( { companySeq, flexbenWalletCompanySeq } ) );

            self.$axios.get( url , { params } )
                .then(res => {
                    self.$refs.blockList.brand_off_list = res.data.data.list;
                    self.editBrandpopup.isOpen = true;
                })
                .catch( alert );
        },
        getCompanyListWithBrandOff( offset=0, afterClickPage = false ){
            const self = this;
            self.companyWithBrand.offset = offset;

            const json_query = { ...self.searchOptions, offset, limit : self.companyWithBrand.limit };
            const params = new URLSearchParams();
            params.append( "json_query", JSON.stringify( json_query ) );

            const url = self.$api("uri", "get-company-brand-on-off" );
            self.$axios.get( url, { params } )
                .then( res => {
                    const { list, total, brandList, totalBrands } = res.data.data;
                    self.companyWithBrand.list = list;
                    self.companyWithBrand.total = total;
                    self.countOffBrandAll = totalBrands;
                    self.editBrandpopup.brandList = brandList;

                    if( ! afterClickPage ){
                        self.companyWithBrand.page = 1;
                    }
                })
        },
        clickPageButton( item ){
            const self = this;
            self.getCompanyListWithBrandOff( item, true )
        },
    },
    mounted(){
        const self = this;
        self.getCompanyListWithBrandOff();
    }
}
</script>