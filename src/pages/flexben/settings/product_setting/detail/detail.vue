<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <AppAside />
        <AppMain :headerName="'FlexBen Product Settings'">
            <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
                <div class="font-semibold text-xl py-3"> Product Information </div>
                <div class="grid grid-cols-4">

                    <div class="col-span-1">
                        <img :src="productInfo.goodsImgUrl" class="p-5"/>
                    </div>
                    <div class="col-span-3 flex flex-col">
                        <div class="space-y-12">
                            <div class="pb-6">
                                <div class="pt-3">
                                    <h2 class="text-sm leading-6 text-gray-600 font-semibold">Product Name </h2>
                                    <p class="mt-1 text-sm leading-6 text-gray-600 border-gray-400 border-[1px] rounded-md py-2 px-4 mr-5">
                                        {{ productInfo.goodsName  }}
                                    </p>
                                </div>


                                <h2 class="pt-3 text-sm leading-6 text-gray-600 font-semibold">Product Code </h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600 border-gray-400 border-[1px] rounded-md py-2 px-4 mr-5">
                                    {{ productInfo.goodsSeq }}
                                </p>


                                <h2 class="pt-3 text-sm leading-6 text-gray-600 font-semibold">FlexBen Type </h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600 border-gray-400 border-[1px] rounded-md py-2 px-4 mr-5">
                                    {{ productInfo.flexbenTypeName }} / {{ productInfo.flexbenCampaignTitle }}
                                </p>


                                <h2 class="pt-3 text-sm leading-6 text-gray-600 font-semibold">Status </h2>
                                <p class="mt-1 text-sm leading-6 text-gray-600 border-gray-400 border-[1px] rounded-md py-2 px-4 mr-5">
                                    <span v-if="productInfo.goodsSalesStatus ==='SALES'">On Sales</span>
                                    <span v-else-if="productInfo.goodsSalesStatus ==='STOP'">Stopped</span>
                                </p>


                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="col-span-full">
                                        <label for="about" class="block text-sm text-gray-600 font-semibold leading-6">Product Description</label>
                                        <div class="mt-2 mr-5 ">
                                            <textarea id="about" name="about" rows="20"
                                                :disabled="!$appUtil.checkPermission('FLEXBEN_SETTING_EDIT')"
                                                class="resize-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                v-model="productInfo.goodsDescription"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="flex gap-4 pt-5 ">
                                    <h2 class="text-sm leading-6 text-gray-600 font-semibold">FlexBen Display </h2>
                                    <div
                                        :class="[ productInfo.goodsSalesStatus ==='STOP' ? 'bg-gray-600' : productInfo.displayYn=='N'? 'bg-gray-200' : 'bg-indigo-600', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                                        <input
                                            v-model="productInfo.displayYn"
                                            true-value="Y"
                                            false-value="N"
                                            :disabled="productInfo.goodsSalesStatus ==='STOP' || !$appUtil.checkPermission('FLEXBEN_SETTING_EDIT')"
                                            type="checkbox" class="cursor-pointer opacity-0 absolute w-full h-full peer appearance-none rounded-md"
                                        />
                                        <span :class="[productInfo.displayYn=='N' ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
                                            <span :class="[productInfo.displayYn=='N' ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                                <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                                </svg>
                                            </span>
                                            <span :class="[productInfo.displayYn=='N' ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                                <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                                    <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <div class="text-blue-600 text-sm flex gap-2 mt-2">
                                    <InformationCircleIcon class="w-10"/>
                                    <div>
                                        This option reflects all the same products regardless of campaign type.
                                        <br/>If you want to turn off each campaign product, please change each campaign product’s status.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="self-end pb-5 pr-5"
                    v-if="$appUtil.checkPermission('FLEXBEN_SETTING_EDIT')"
                >
                    <ElementsButton
                        :width32="true"
                        :text="'Save'"
                        @clickEvent="updateProductInfo"
                    />
                </div>
            </div>
        </AppMain>
    </div>
</template>

<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import { InformationCircleIcon } from "@heroicons/vue/outline"

export default{
    components : {
        AppAside, AppMain, InformationCircleIcon
    },
    data(){
        return {
            productInfo : {
                flexbenGoodsInfoSeq : "",
                goodsDescription : "",
                goodsImgUrl : "",
                goodsName : "",
                goodsSeq : "",
                displayYn : "",
                flexbenTypeName :"",
                flexbenCampaignTitle : ""
            },
            flexbenGoodsPriceCampaignSeq : ""
        }
    },
    methods : {
        getProductInfo(){
            const self = this;

            const url = self.$api("uri", "get-flexben-product-info")
                            .replace("{flexbenGoodsPriceCampaignSeq}", self.flexbenGoodsPriceCampaignSeq);

            self.$axios.get( url )
                .then( res => {
                    self.productInfo = { ...res.data.data }
                })
                .catch()
        },
        getProductSeq(){
            const urlParams = new URLSearchParams( window.location.search );
            if( ! urlParams.has( "product" ) ){
                window.history.back();
            }
            const flexbenGoodsInfoSeq = urlParams.get("product");
            return flexbenGoodsInfoSeq;
        },
        updateProductInfo(){
            const self = this;
            const url = self.$api("uri", "put-flexben-product-info");
            const {flexbenGoodsInfoSeq, displayYn, goodsDescription } = self.productInfo;
            const updateForm = {flexbenGoodsInfoSeq, displayYn, goodsDescription};
            self.$axios.put( url, updateForm)
                    .then( res => {
                        alert("Success to update");
                        location.href="/flexben/settings#PRODUCT_SETTING";
                    })
                    .catch( err =>{
                        console.err(err);
                        alert("Update failed. Please try again.");
                    } )
            console.log( self.productInfo.displayYn )
        }
    },
    mounted(){
        const self = this;
        self.flexbenGoodsPriceCampaignSeq = self.getProductSeq();
        self.getProductInfo();

    }
}

</script>