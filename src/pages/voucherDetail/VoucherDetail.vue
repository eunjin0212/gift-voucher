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
    <main class="min-width">
        <div class="max-w-[360px] mt-4 mx-5 border rounded-[4px] border-gray-700 mb-2">
            <div class="py-[10px] px-[37px]">
                <img
                  :src="detailData.img"
                  :alt="detailData.name"
                  class="w-[246px] h-[244px] object-contain"
                />
            </div>
            <div class="flex flex-col px-5 pt-3 pb-6 border-t border-t-gray-700">
                <strong class="mb-[2px] text-black-300 text-base leading-5 -tracking-wider">
                    {{ detailData.name }}
                </strong>
                <p class="mb-4 text-black-300 text-sm leading-[18px] -tracking-wider">{{ detailData.detail }}</p>
                <strong class="text-lg leading-6 text-main">Rp {{ detailData.salePrice.toLocaleString() }}</strong>
                <s class="text-sm text-gray-900">Rp {{ detailData.price.toLocaleString() }}</s>
            </div>
        </div>
        <div class="px-5">
            <h3
              class="cursor-pointer flex items-center justify-between py-[18px] text-sm leading-[18px]"
              @click="() => handleToggle('description')"
              :class="accordion.description ? 'text-main font-semibold' : 'text-black-0'"
            >
                <span>Deskripsi</span>
                <img
                  :src="accordionIcon"
                  class="transition-transform"
                  :class="{ 'rotate-180': !accordion.description }"
                />
            </h3>
            <div
              class="hidden h-0 transition-all text-[#939393] text-xs leading-5 -tracking-wide"
              :class="{ '!h-auto !block': accordion.description }"
            >
                <h6 class="text-main text-sm leading-[22px] -tracking-wide font-semibold mb-1">▪︎ Tentang Alfamart</h6>
                <p class="mb-5">
                    Alfamart adalah toko swalayan yang memiliki banyak cabang di Indonesia. Lebih dari 200 produk
                    makanan dan barang kebutuhan hidup lainnya tersedia dengan harga bersaing, memenuhi kebutuhan
                    konsumen sehari-hari.
                </p>
                <p>
                    Voucher Alfamart Digital Code Adalah Voucher Belanja non fisik yang terdiri
                    dari 12 digit Alpabet dan Numerik. Kode Voucher yang dapat digunakan untuk transaksi yang ada di
                    Alfamart seluruh indonesia. Untuk Payment apa saja yang dapat di transaksikan di Alfamart dapat
                    langsung ditanyakan kepada pihak Alfamart.
                </p>

                <h6 class="text-main text-sm leading-[22px] -tracking-wide font-semibold mt-5 mb-[10px]">▪︎ Cara
                    Menggunakan
                    Voucher
                </h6>
                <ol class="mb-6 list-inside">
                    <li>
                        1. Tunjukkan kode voucher/barcode kepada pihak kasir untuk menggunakan voucher.
                    </li>
                    <li>2. Redeem Voucher dilakukan oleh Kasir dan di Area Kasir. Pastikan kasir menginput kode
                        voucher dengan benar.</li>
                    <li>3. Apabila pembeli mengalami kendala penggunaan kode voucher, pembeli dapat
                        menghubungi
                        layanan
                        pengaduan konsumen ke nomor telepon Sahabat Alfamart di 1500959.</li>
                </ol>
            </div>
        </div>
        <div class="px-5">
            <h3
              class="cursor-pointer border-t border-t-gray-700 flex items-center justify-between py-[18px] text-sm leading-[18px]"
              @click="() => handleToggle('participating')"
              :class="accordion.participating ? 'text-main font-semibold' : 'text-black-0'"
            >
                <span>Gerai yang Berpartisipasi</span>
                <img
                  :src="accordionIcon"
                  class="transition-transform"
                  :class="{ 'rotate-180': !accordion.participating }"
                />
            </h3>
            <div
              class="hidden h-0 transition-all relative text-xs leading-5 -tracking-wide text-[#939393]"
              :class="{ '!h-auto !block': accordion.participating }"
            >
                <p
                  class="-z-10 absolute top-0 left-0 w-screen max-w-[1200px] px-5 py-3 -ml-5 font-semibold leading-5 text-white bg-main -tracking-wide">
                    Tentang Alfamart
                </p>

                <h6 class="pt-12 text-main text-sm leading-[22px] -tracking-wide font-semibold mb-1">
                    ▪︎ How to Redeem
                </h6>
                <p>Cara Menggunakan Voucher di gerai Alfamart:</p>
                <ol class="list-disc list-inside">
                    <li>
                        Tunjukkan kode voucher/barcode kepada pihak kasir
                        untuk menggunakan voucher.
                    </li>
                    <li>Redeem Voucher dilakukan oleh Kasir dan di Area Kasir. Pastikan
                        kasir menginput kode voucher dengan benar.</li>
                    <li>Apabila pembeli mengalami kendala penggunaan kode
                        voucher, pembeli dapat menghubungi layanan pengaduan konsumen ke nomor telepon Sahabat Alfamart
                        di 1500959.</li>
                </ol>
                <p class="mt-4">Cara Menggunakan Voucher di Alfagift:</p>
                <ol class="list-disc list-inside">
                    <li>Klik tombol redeem untuk melihat kode voucher.</li>
                    <li>Salin kode voucher.</li>
                    <li>Buka aplikasi Alfagift, pilih barang yang ingin dibeli.</li>
                    <li>Masukkan kode voucher ke kolom voucher.</li>
                    <li>Sebelum memasukkan kode voucher, pastikan anda sudah yakin untuk melakukan transaksi.</li>
                    <li>Voucher akan memotong jumlah pembelian.</li>
                    <li>Segera selesaikan transaksi anda.</li>
                    <li>Apabila pembeli mengalami kendala penggunaan kode voucher di Alfagift, Silahkan masukkan
                        kembali kode setelah 1x24 jam.</li>
                </ol>

                <h6 class="text-main text-sm leading-[22px] -tracking-wide font-semibold mt-5 mb-[10px]">▪︎ T&C</h6>
                <ol class="mb-12 list-decimal list-inside">
                    <li>Kode voucher dapat langsung digunakan setelah diterima sesuai dengan masa berlaku yang
                        ditentukan.</li>
                    <li>Tidak di perbolehkan untuk mencetak/Print Kode Voucher yang telah diterima.</li>
                    <li>Voucher berlaku setiap hari, termasuk weekend dan hari libur Nasional.</li>
                </ol>
            </div>
        </div>
        <ul class="pt-[30px] px-5">
            <li class="inline-flex items-center mb-2">
                <h6 class="font-medium text-sm leading-[18px] -tracking-wide text-black-300">Recipient’s Info</h6>
                <i class="pl-3 text-red-600 text-[13px] leading-[18px] -tracking-wider">Insert recipient’s
                    information</i>
            </li>
            <li>
                <label>
                    <input placeholder="Name" />
                </label>
            </li>
            <li>
                <label>
                    <input placeholder="Phone No." />
                </label>
            </li>
            <li class="inline-flex flex-col gap-2">
                <p>Insert the Pin code</p>
                <label>
                    <input placeholder="Pin Code" />
                    <button>Apply</button>
                </label>
                <i>The pin code is applied successfully</i>
            </li>
        </ul>
    </main>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import backIcon from '@/assets/img/back.svg'
import { totalProduct } from '@/mock/voucher';
import accordionIcon from '@/assets/img/accordion.svg'

const detailData = ref({
    name: '',
    img: '',
    type: 'wallet',
    detail: '',
    price: 0,
    salePrice: 0,
    soldOut: false,
});
const accordion = ref({
    'description': false,
    'participating': false,
})

function handleBack() {
    window.history.back();
}
function handleToggle(content) {
    // 단일 아코디언
    // Object.keys(this.accordion).forEach((key) => {
    //     if (content !== key) {
    //         this.accordion[key] = false
    //     }
    // })

    // this.accordion[content] = !this.accordion[content]

    // 다중 아코디언
    this.accordion[content] = !this.accordion[content]
}

onBeforeMount(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
        detailData.value = totalProduct.find((prod) => prod.id === +id)
    }
})
</script>
