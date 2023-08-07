<template>
    <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
        <ElementsButton
            class="my-3"
            text="Update Product Status"
            :fit-content="true"
            :height12="true"
            @click-event="updateProductStatus()"
        />
        <div class="flex gap-2 max-w-full my-4">
            <ElementsSelect
                :width40="true"
                :defaultMsg="'Type'"
                :options="flexBenCampaignOptions"
                :useDefaultMsg="true"
                v-model="json_query.flexbenCampaignSeq"
            />
            <ElementsSelect
                :width40="true"
                :defaultMsg="'Status'"
                :options="goodsSalesStatusOptions"
                :useDefaultMsg="true"
                v-model="json_query.goodsSalesStatus"
            />
            <ElementsSelect
                :width40="true"
                :defaultMsg="'Select'"
                :options="searchOptions"
                :useDefaultMsg="true"
                v-model="json_query.searchOption"
            />
            <ElementsInput
                :width60="true"
                :placeholder="'Enter the keyword'"
                v-model="json_query.searchText"
            />
            <ElementsButton
                :width32="true"
                :text="'Search'"
                @clickEvent="getProductSettingList()"
            />
        </div>
        <div class="mt-6 overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="whitespace-no-wrap px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-6">Brand</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900"> Product</th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900"> FlexBen <br/> Type </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 ">  Sales <br/> Price </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 ">  Sales <br/> Period </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 ">  PIN <br/> Available </th>
                        <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900">  Status </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="( product , key ) in productInfo.list" v-bind:key="key" >
                        <td class="whitespace-pre-wrap px-3 py-4 text-center text-sm text-gray-900 sm:pl-6"> {{ product.bizBrandName }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-blue-500 underline">
                            <a :href="`/flexben/settings/product_setting/detail?product=${product.flexbenGoodsPriceCampaignSeq}`">
                                {{ product.goodsName }}
                            </a>
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> {{ product.flexbenTypeName }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> {{ product.goodsPrice }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">
                            {{ dateFormatter(product.goodsSalesStartDate) }} <br/>
                            {{ dateFormatter(product.goodsSalesEndDate) }}
                        </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900"> {{ product.goodsStockVolume }} </td>
                        <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">
                            {{ getProductStatus(product.goodsSalesStatus, product.displayYn) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="w-full h-28 flex justify-center items-center mt-5" >
            <ElementsPagination
                v-model="productInfo.page"
                :totalContent="productInfo.total"
                :contentsPerPage="productInfo.limit"
                @clickPage="clickPageButton"
            />
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data(){
        return{
            goodsSalesStatusOptions : [
                { text : "On Sale", value : "SALES"},
                { text : "Stopped", value : "STOP"}
            ],
            goodsSalesStatusObj : {
                SALES : "On Sale", STOP :"Stopped"
            },
            searchOptions : [
                { text : "Brand Name" , value : "BIZ_BRAND_NAME" },
                { text : 'Goods Name' , value : 'GOODS_NAME'}
            ],
            flexBenCampaignOptions : [],
            json_query:{
                flexbenCampaignSeq : null,
                goodsSalesStatus : "",
                searchOption : "BIZ_BRAND_NAME",
                searchText : null
            },
            productInfo : {
                list : [],
                total : 0,
                offset : null,
                page : 1,
            }
        }
    },
    methods : {
        enableTestTools(){
            // return ! (process.env.VUE_APP_SERVER_MODE === 'prd');
            return true;
        },
        updateProductStatus(){
            const self = this;
            const url = self.$api("uri", "post-update-product-status");
            self.$axios.post( url )
                        .then(res => res )
                        .catch( err =>{
                            alert(err)
                        } )
        },
        getFlexbenType(){
            const self = this;
            const url = self.$api("uri", "get-flexben-campaign-List");
            self.$axios.get( url )
                .then( res => {
                    self.flexBenCampaignOptions= res.data.data.list.map(( { flexbenTypeName, flexbenCampaignSeq, flexbenCampaignTitle}) =>({
                            text : `${flexbenTypeName} / ${flexbenCampaignTitle}`,
                            value : flexbenCampaignSeq,
                        })
                    );
                })
        },
        getProductSettingList(offset=0, afterClickPage = false){
            const self = this;
            const url = self.$api("uri", "get-flexben-product-info-list");
            self.productInfo.offset = offset;

            const params = new URLSearchParams();
            const json_query = { ...self.json_query, offset }
            params.append( "json_query", JSON.stringify( json_query ) );

            self.$axios.get( url , { params })
                .then( res => {
                    const { list, total } = res.data.data;
                    self.productInfo.list = list;
                    self.productInfo.total = total;

                    if(! afterClickPage ){
                        self.productInfo.page = 1;
                    }
                })
                .catch( console.error )
        },
        clickPageButton( item ){
            const self = this;
            self.getProductSettingList( item, true )
        },
        dateFormatter ( dateStr ){
            if( ! dateStr ){
                return null;
            }
            return moment( dateStr ).format("MM/DD/yyyy");
        },
        getProductStatus( salesStatus, display ){
            const self = this;
            let productStatus = "";
            productStatus += self.goodsSalesStatusObj[salesStatus];
            productStatus += "/ "
            productStatus += display == 'Y' ? "On" : "Off"

            return productStatus;
        }
    },
    mounted(){
        const self = this;
        self.getFlexbenType();
        self.getProductSettingList();
    }

}



</script>