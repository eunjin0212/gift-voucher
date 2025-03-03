<script>
import backIcon from '@/assets/img/back.svg'
import eVoucher from '@/assets/img/e_voucher.png'
import { totalProduct } from '@/mock/voucher';

export default {
    data() {
        return {
            backIcon,
            eVoucher,
            detailData: {
                name: '',
                img: '',
                type: 'wallet',
                detail: '',
                price: 0,
                salePrice: 0,
                soldOut: false,
            },
        }
    },
    methods: {
        handleBack() {
            window.history.back();
        },
    },
    beforeMount() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (id) {
            this.detailData = totalProduct.find((prod) => prod.id === +id)
        }
    }
}
</script>
<template>
    <header class="border-b header min-width border-b-gray-700">
        <div class="!py-4 !px-[10px] header-bar">
            <button
              type="button"
              @click="handleBack"
            >
                <img
                  :src="backIcon"
                  alt="back"
                />
            </button>
            <h1 class="text-lg font-semibold leading-6 -tracking-wider text-main">Order</h1>
            <div></div>
        </div>
    </header>
    <main class="px-5 min-width">
        <div class="py-[10px] px-[37px] w-fit mx-auto">
            <img
              :src="detailData.img"
              :alt="detailData.name"
              class="w-[246px] h-[244px]"
            />
        </div>
    </main>
</template>
