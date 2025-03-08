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
        <div class="mx-auto w-fit">
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
                <h6 class="font-medium text-sm leading-[18px] -tracking-wide text-black-0">Recipient’s Info</h6>
                <i
                  v-if="infoValidate.name || infoValidate.contact"
                  class="pl-3 text-red-600 text-[13px] leading-[18px] -tracking-wider"
                >
                    Insert recipient’s information
                </i>
            </li>
            <li class="mb-5 md:flex md:items-center md:gap-[6px]">
                <label class="mb-3 md:mb-0 detail-input">
                    <input
                      class="field"
                      placeholder="Name"
                      autocomplete="name"
                      v-model="info.name"
                      @update:model-value="() => handleInitValidate('name')"
                    />
                </label>
                <label class="detail-input">
                    <input
                      class="field"
                      :placeholder="detailData.type === 'wallet' ? 'Phone No.' : 'Email'"
                      :autocomplete="detailData.type === 'wallet' ? 'mobile' : 'email'"
                      :type="detailData.type === 'wallet' ? 'number' : 'email'"
                      :inputmode="detailData.type === 'wallet' ? 'numeric' : 'text'"
                      v-model="info.contact"
                      @update:model-value="() => handleInitValidate('contact')"
                    />
                </label>
            </li>
            <li class="inline-flex flex-col w-full gap-2">
                <h6 class="font-medium text-sm leading-[18px] -tracking-wide text-black-0">Insert the Pin code</h6>
                <div class="flex flex-nowrap gap-[6px]">
                    <label
                      class="flex-1 detail-input"
                      :class="{ 'bg-gray-700': validateMsgKey === 'done' }"
                    >
                        <input
                          class="field read-only:bg-gray-700 read-only:text-gray-950"
                          placeholder="Pin Code"
                          v-model="info.code"
                          @update:model-value="() => handleInitValidate('code')"
                          :readonly="validateMsgKey === 'done'"
                        />
                    </label>
                    <button
                      @click="handleValidate"
                      :class="validateMsgKey === 'done' ? 'text-white bg-main' : 'text-main'"
                      class="border border-main leading-5 font-semibold py-[14px] px-[23px] rounded-md"
                    >Apply</button>
                </div>
                <i
                  class="text-red-600 text-[13px] leading-[18px]"
                  :class="validateMsgKey === 'wrong' ? '-tracking-[0.089em]' : '-tracking-wider'"
                  v-if="validatePinCodeMsg[validateMsgKey]"
                >
                    {{ validatePinCodeMsg[validateMsgKey] }}
                </i>
                <i
                  class="text-red-600 text-[13px] leading-[18px] -tracking-wider"
                  v-else-if="!info.code && info.reCaptcha"
                >
                    Please enter the PIN code first
                </i>
                <i
                  class="text-main text-[13px] leading-[18px] -tracking-wider"
                  v-else-if="validateMsgKey === 'done'"
                >The pin code is applied successfully
                </i>
            </li>
            <li class="mb-9">
                <div class="recaptcha h-[60px] mt-[30px] bg-[#F9F9F9]">
                    <div
                      class="checkbox"
                      @click.prevent="handleReCaptcha"
                    >
                        <input
                          id="reCaptcha"
                          type="checkbox"
                          v-model="info.reCaptcha"
                          name="reCaptcha"
                          hidden
                        />
                        <span :class="info.reCaptcha ? 'border-blue-100 bg-blue-100' : 'border-black-100 bg-white'">
                            <CheckSvg :class="info.reCaptcha ? 'text-white' : 'hidden'" />
                        </span>
                        <label
                          for="reCaptcha"
                          class="!text-black-300"
                        >
                            I'm not a robot
                        </label>
                    </div>
                    <img
                      :src="reCAPTCHA"
                      alt="reCAPTCHA"
                    />
                </div>
                <i
                  class="text-red-600 text-[13px] leading-[18px] -tracking-wider"
                  v-if="infoValidate.reCaptcha"
                >
                    Check reCaptcha
                </i>
            </li>
        </ul>
        <div
          class="px-5"
          v-if="additionalFee"
        >
            <h6 class="font-medium text-sm leading-[18px] -tracking-wide text-black-0">Additional Payment Option</h6>
            <label class="detail-input py-[11px] mt-2">
                <img
                  :src="qris"
                  alt="qris"
                />
            </label>
            <div class="flex gap-2 p-2 mt-3 bg-red-50">
                <img
                  :src="dangerCircleIcon"
                  alt="danger"
                />
                <span class="flex-1 text-pink-500 text-[14px] leading-4 -tracking-widest">
                    You have Rp 10.000 Gift Voucher.<br>So you need to use an additional payment option
                </span>
            </div>
            <div class="flex flex-col items-center justify-center gap-3 my-5">
                <h3 class="text-main text-xl leading-[18px] -tracking-widest font-bold">QRIS Processing
                </h3>
                <p class="text-black-300 text-[15px] leading-[18px] -tracking-wide">Total Harga<b
                      class="ml-2 font-semibold"
                    >Rp {{ additionalFee }}</b></p>

                <img
                  src="/img/qr_code.png"
                  alt="qrCode"
                  class="w-[130px] h-[134px]"
                />
                <p class="text-black-300 text-[15px] leading-[18px] -tracking-wide">Sisa Waktu Permbayaran
                </p>
                <strong class="text-red-600 text-[15px] leading-[18px] -tracking-wide">
                    {{ formattedTime }} menit
                </strong>
                <span class="text-black-300 text-[15px] leading-[18px] -tracking-wide text-center mt-2">
                    Mohon tunggu sebentar setelah<br>
                    pembayaran.<br>
                    Halaman dipindahkan.
                </span>
            </div>
        </div>
    </main>
    <footer
      class="p-5 shadow-[0px_-2px_20px_0px_#0000001F]"
      :class="{ 'mb-5': downloaded, 'sticky bottom-0 bg-white': !additionalFee }"
    >
        <button
          v-if="!additionalFee"
          @click="handleSubmit"
          :disabled="!isDisable"
          class="text-white bg-main text-lg leading-5 font-semibold py-[18px] w-full text-center rounded-md disabled:cursor-not-allowed disabled:bg-black-100"
        >Treat</button>
        <button
          v-else
          @click="handleDownload"
          class="text-white bg-main text-lg leading-5 font-semibold py-[18px] w-full text-center rounded-md"
        >Download QRIS</button>
    </footer>
    <Teleport to="body">
        <div class="fixed bottom-0 z-10 flex items-center justify-center w-full p-5">
            <Transition
              name="fade-up-down"
              v-show="downloaded"
            >
                <aside
                  :class="{ 'fade-up-down-enter-active': downloaded }"
                  class="w-80 sm:w-[500px] bg-[#FFEDED] rounded-md py-2 px-3 backdrop-blur flex gap-2"
                >
                    <img
                      :src="checkCircleIcon"
                      alt="alert_icon"
                    />
                    <span class="font-semibold leading-6 text-red-600">QIRS is successfully downloaded</span>
                </aside>
            </Transition>
        </div>
    </Teleport>
    <Teleport
      to="body"
      v-if="failModal"
    >
        <aside class="modal-wrapper">
            <div class="modal-content-wrapper">
                <p class="modal-title error">
                    <img
                      :src="xIcon"
                      alt="x_icon"
                    />
                    <strong>Your transcation has failed</strong>
                </p>
                <div class="modal-content">
                    <p class="mb-4">Please go back an try again</p>
                </div>
                <button
                  @click="handleFailModal"
                  class="w-full modal-btn modal-negative-btn"
                >OK</button>
            </div>
        </aside>
    </Teleport>
    <Teleport
      to="body"
      v-if="successModal"
    >
        <aside class="modal-wrapper">
            <div class="modal-content-wrapper">
                <p class="modal-title">
                    <img
                      :src="successIcon"
                      alt="success_icon"
                    />
                    <strong class="text-lg font-semibold leading-6 text-center text-main">Lakukan pembayaran dalam<br>
                        masa tenggang</strong>
                </p>
                <div class="modal-content">
                    <p class="mt-[6px] mb-5 text-[14px]">Halaman ini akan kedaluwarsa dalam 3 menit,<br>
                        dan Anda tidak akan bisa mendapatkan item ini</p>
                    <ol
                      class="mx-auto pl-3 mb-5 text-left list-decimal list-inside w-fit text-[#056F9B] font-semibold text-[14px] leading-[22px]"
                    >
                        <li>Buka akun bank Anda</li>
                        <li>Klik tombol fitur QRIS</li>
                        <li>Pilih gambar yang telah diunduh</li>
                        <li>Selesaikan proses dalam waktu 3 menit</li>
                    </ol>
                </div>
                <button
                  @click="handleSuccessModal"
                  class="w-full modal-btn modal-positive-btn"
                >OK</button>
            </div>
        </aside>
    </Teleport>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import backIcon from '@/assets/img/back.svg'
import { initDetailData, totalProduct } from '@/mock/voucher'
import accordionIcon from '@/assets/img/accordion.svg'
import reCAPTCHA from '@/assets/img/reCAPTCHA_logo.svg'
import dangerCircleIcon from '@/assets/img/danger_circle.svg'
import checkCircleIcon from '@/assets/img/check_circle.svg'
import successIcon from '@/assets/img/success.svg'
import CheckSvg from '@/assets/img/CheckSvg.vue'
import qris from '@/assets/img/qris.png'
import xIcon from '@/assets/img/x_icon.svg'

const detailData = ref({ ...initDetailData });
const accordion = ref({
    'description': false,
    'participating': false,
})

function handleBack() {
    window.history.back();
}

function handleToggle(content) {
    accordion.value[content] = !accordion.value[content]
}

const info = ref({
    name: '',
    contact: '',
    code: '',
    reCaptcha: false
})

const infoValidate = ref({
    name: null,
    contact: null,
    code: null,
    reCaptcha: null,
})
const validateMsgKey = ref('')
const isDisable = computed(() => Object.values(infoValidate.value).every(val => val === false && validateMsgKey.value === 'done'))

function handleInitValidate(key) {
    infoValidate.value[key] = null
    if (key === 'code') {
        validateMsgKey.value = ''
    }
}

function handleReCaptcha() {
    info.value.reCaptcha = !info.value.reCaptcha
    infoValidate.value.reCaptcha = !info.value.reCaptcha
}
const validatePinCodeMsg = {
    wrong: 'The Pin code is not abailable. Contact our Customer support',
    alreadyUse: 'The Pin code is already used',
    noExist: 'The Pin code does not exist. Please check again',
    expired: "The Pin code's valid date is over",
}

function handleValidate() {
    const keys = Object.keys(info.value)
    if (keys.some((key) => !info.value[key])) {
        const findFailKey = keys.find((key) => !info.value[key])
        if (!findFailKey) return

        infoValidate.value[findFailKey] = true
        return
    } else {
        keys.forEach((key) => {
            infoValidate.value[key] = false
        })
    }

    if (Object.values(infoValidate.value).every((val) => val === false)) {
        // TODO: check Pin code
        const testPinCode = '12345'
        const testAlreadyUsePinCode = '11111'
        const testNoExistPinCode = '22222'
        switch (info.value.code) {
            case testPinCode:
                validateMsgKey.value = 'done'
                break;
            case testAlreadyUsePinCode:
                validateMsgKey.value = 'alreadyUse'
                break;
            case testNoExistPinCode:
                validateMsgKey.value = 'noExist'
                break;
            default:
                validateMsgKey.value = 'wrong'
                break;
        }
    }
}

async function getDetailData(id) {
    try {
        if (id) {
            detailData.value = await totalProduct.find((prod) => prod.id === +id)
        }
    } catch (error) {
        console.error(error)
    }
}

onBeforeMount(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    getDetailData(id)
})

const timeLeft = ref(null); // 타이머 시간 (초)
let timer = null;

const formattedTime = computed(() => {
    if (timeLeft.value === null) return "03:00"; // 기본값
    const minutes = Math.floor(timeLeft.value / 60).toString().padStart(2, "0");
    const seconds = (timeLeft.value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
})

function startTimer() {
    if (timer) clearInterval(timer);

    timeLeft.value = 180; // 3분 (180초)
    timer = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--;
        } else {
            clearInterval(timer); // 0이 되면 타이머 종료
        }
    }, 1000);
}
const additionalFee = ref('')
function handleSubmit() {
    if (isDisable.value) {
        // TODO: 
        additionalFee.value = detailData.value.salePrice < 10000
        startTimer()
    }
}

const downloaded = ref(false)
const showAlert = () => {
    downloaded.value = true;

    setTimeout(() => {
        downloaded.value = false;
    }, 900);
};
const successModal = ref(false)

function handleDownload() {
    const imagePath = '/img/qr_code.png';

    const link = document.createElement("a");
    link.href = imagePath;
    link.download = 'qr_code.png'; // 파일명 설정
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);

    showAlert()
    successModal.value = true
}
const failModal = ref(false)
function handleFailModal() {
    failModal.value = false
    startTimer()
}

function handleSuccessModal() {
    successModal.value = false
    window.location.href = `/payment?id=${detailData.value.id}`
}
</script>
<style>
.fade-up-down-enter-active {
    animation: fadeUpDown 3s ease-in-out forwards;
}

@keyframes fadeUpDown {
    0% {
        opacity: 0;
        transform: translateY(2rem);
        /* 아래에서 시작 */
    }

    15% {
        opacity: 1;
        transform: translateY(0);
        /* 위로 올라옴 */
    }

    80% {
        opacity: 1;
        transform: translateY(0);
        /* 위로 올라옴 */
    }

    100% {
        opacity: 0;
        transform: translateY(2rem);
        /* 부드럽게 사라짐 */
    }
}
</style>