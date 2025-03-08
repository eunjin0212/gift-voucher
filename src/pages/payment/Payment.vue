<template>
    <header class="border-b header min-width border-b-gray-700">
        <div class="header-bar">
            <a href="/voucher">
                <img
                  :src="logo"
                  alt="header_logo"
                />
            </a>
            <div></div>
        </div>
    </header>
    <main class="px-5 min-width max-w-[768px]">
        <!-- Voucher-->
        <template v-if="detailData.type === 'voucher'">
            <!-- 성공 -->
            <template v-if="!failedPayment">
                <div class="mt-6 w-fit mx-auto rounded-full p-[6px] border border-[#BEE9F9]">
                    <img
                      :src="activeMailArrivedAndHandIcon"
                      alt="step_img"
                      class="w-[70px] h-[70px]"
                    />
                </div>
                <h1 class="mt-4 mb-[10px] text-[#085F83] text-2xl font-bold leading-[30px] text-center font-manrope">
                    Pengiriman Selesai
                </h1>
                <h3
                  class="pb-4 border-b border-b-gray-700 text-center text-main text-[18px] leading-6 font-bold font-manrope"
                >
                    Periksa E-mail Anda
                </h3>
            </template>
            <!-- 실패 -->
            <template v-else>
                <div class="mt-6 w-fit mx-auto rounded-full p-[6px] border border-[#FFCBCB]">
                    <img
                      :src="failedIcon"
                      alt="step_img"
                      class="w-[70px] h-[70px]"
                    />
                </div>
                <h1 class="block text-2xl leading-7 text-center font-manrope mt-4 font-bold text-[#DF0606]">Gagal</h1>
                <h1 class="mt-4 mb-[2px] text-red-600 text-sm text-center -tracking-wide">
                    Jika masalah terus berlanjut, hubungi kami
                </h1>
                <h3
                  class="pb-4 border-b border-b-gray-700 text-center text-red-600 text-[14px] leading-5 font-semibold -tracking-wide"
                >
                    Uang Anda akan dikembalikan
                </h3>
            </template>
        </template>

        <!-- Wallet -->
        <template v-else>
            <!-- 성공 -->
            <template v-if="!failedPayment">
                <ul class="flex flex-col items-center px-2 mx-auto mt-6 sm:mt-12">
                    <li class="flex">
                        <div
                          v-for="(value, key, idx) in stepActive"
                          :key="key"
                          class="flex items-center"
                        >
                            <div
                              :class="+key === step ? 'border-[#BEE9F9]' : 'border-gray-700'"
                              class="rounded-full p-[6px] border"
                            >
                                <img
                                  :src="value[+key === step ? 'active' : 'inactive']"
                                  alt="step_icon"
                                />
                            </div>
                            <img
                              v-if="idx < 2"
                              class="mx-[10px] sm:mx-5 h-6 w-6"
                              :src="arrowRightIcon"
                              alt="between_step_icon"
                            />
                        </div>
                    </li>
                    <li class="flex my-4 sm:my-8 text-nowrap">
                        <div
                          v-for="(value, key, idx) in stepActive"
                          :key="key"
                          class="text-xs sm:text-base -tracking-[0.033em]"
                          :class="+key === step ? 'text-main font-bold' : 'text-gray-950'"
                        >
                            {{ value.name }}
                            <span
                              v-if="idx < 2"
                              class="mx-1 font-normal sm:mx-5 text-gray-950"
                            >
                                >
                            </span>
                        </div>
                    </li>
                </ul>
                <h1 class="mb-4 text-[#085F83] text-2xl font-bold leading-7 text-center font-manrope">Pesanan sedang
                    diproses,
                    namun mohon tunggu
                </h1>
                <h3
                  class="pb-4 border-b border-b-gray-700 text-center text-main text-[13px] sm:text-base leading-5 font-medium"
                >Cek
                    status
                    pengiriman produk Anda. Klik
                    <span class="mx-1 text-xs sm:text-base text-gray-950">></span>
                    Di sini
                </h3>
            </template>
            <!-- 실패 -->
            <template v-else>
                <div class="mt-6 w-fit mx-auto rounded-full p-[6px] border border-[#FFCBCB]">
                    <img
                      :src="failedIcon"
                      alt="step_img"
                      class="w-[70px] h-[70px]"
                    />
                </div>
                <h1 class="block text-2xl mt-4 leading-7 text-center font-manrope font-bold text-[#DF0606]">Failed</h1>
                <h1 class="mt-4 mb-[2px] text-red-600 text-sm text-center -tracking-wide">
                    Jika masalah terus berlanjut, hubungi kami
                </h1>
                <h3
                  class="pb-4 border-b border-b-gray-700 text-center text-red-600 text-[14px] leading-5 font-semibold -tracking-wide"
                >
                    Uang Anda akan dikembalikan
                </h3>
            </template>
        </template>
        <div class="mx-auto mb-6 w-fit">
            <img
              :src="detailData.img"
              alt="voucher_img"
              class="px-6 py-4"
            />
            <strong class="block mt-3 leading-5 -tracking-wide">
                {{ detailData.name }}
            </strong>
            <p class="text-black-300 text-sm leading-[18px] -tracking-wide mt-[2px]">
                {{ detailData.detail }}
            </p>
            <strong class="block mt-4 text-lg leading-6 text-main">
                Rp {{ detailData.salePrice.toLocaleString() }}
            </strong>
        </div>
        <p class="absolute left-0 w-full h-2 mb-2 bg-gray-400"></p>
        <div class="px-4 py-5 mx-auto mt-10 mb-20 bg-gray-100 border border-gray-700 rounded-md sm:mt-14">
            <strong class="text-[#384860] font-bold text-sm -tracking-wide">Pemerima</strong>
            <ul class="flex flex-col gap-[14px] mt-[18px]">
                <li
                  v-for="col in cols"
                  :key="col.name"
                  class="flex justify-between"
                >
                    <div class="text-[#384860] text-sm -tracking-wide">{{ col.label }}</div>
                    <strong class="text-[#384860] text-sm -tracking-wide">
                        {{ typeof userData[col.name] === 'number'
                            ? 'Rp'
                            : ''
                        }}
                        {{ typeof userData[col.name] === 'number'
                            ? userData[col.name].toLocaleString()
                            : userData[col.name]
                        }}
                    </strong>
                </li>
            </ul>
        </div>
    </main>
    <footer class="p-5 shadow-[0px_-2px_20px_0px_#0000001F] sticky bottom-0 bg-white">
        <button
          @click="() => handleSubmit(buttonStatus)"
          class="w-full p-5 text-lg font-semibold leading-5 text-center text-white rounded-md bg-main active:shadow-[2px_7px_8px_2px_#29ABE240]"
        >
            {{ buttonLabel[buttonStatus] }}
        </button>
    </footer>
</template>

<script setup>
import { initDetailData, totalProduct } from '@/mock/voucher';
import { computed, onBeforeMount, ref } from 'vue';
import logo from '@/assets/img/logo.svg'
import inactiveClockAndHomeIcon from '@/assets/img/inactive_clock_and_home.svg'
import activeClockAndHomeIcon from '@/assets/img/active_clock_and_home.svg'
import inactiveDeliveryIcon from '@/assets/img/inactive_delivery.svg'
import activeDeliveryIcon from '@/assets/img/active_delivery.svg'
import inactiveMailArrivedAndHandIcon from '@/assets/img/inactive_mail_arrived_and_hand.svg'
import activeMailArrivedAndHandIcon from '@/assets/img/active_mail_arrived_and_hand.svg'
import failedIcon from '@/assets/img/failed.svg'
import arrowRightIcon from '@/assets/img/arrow_right.svg'

const step = ref(1)
const stepActive = {
    1: {
        active: activeClockAndHomeIcon,
        inactive: inactiveClockAndHomeIcon,
        name: 'Pembayaran Selesai'
    },
    2: {
        active: activeDeliveryIcon,
        inactive: inactiveDeliveryIcon,
        name: 'Sedang dikirim'
    },
    3: {
        active: activeMailArrivedAndHandIcon,
        inactive: inactiveMailArrivedAndHandIcon,
        name: 'Pengiriman Selesai'
    },
}
const params = new URLSearchParams(window.location.search);
const additionalPayment = params.get("payment");
const failedPayment = params.get("failed")

const detailData = ref({ ...initDetailData });
const userData = ref({
    name: 'Kim',
    contact: 'abc@google.com',
    price: 119740,
    transactionNumber: 'E77FA24134',
    additionalPayment: 20000,
})

const cols = computed(() => ([
    {
        label: 'Nama',
        name: 'name'
    },
    {
        label: detailData.value.type === 'wallet' ? 'No telpon' : 'Email',
        name: 'contact'
    },
    {
        label: 'Harga',
        name: 'price'
    },
    {
        label: 'Txn No',
        name: 'transactionNumber'
    },
    ...(additionalPayment ? [{
        label: 'Pembayaran Tambahan',
        name: 'additionalPayment'
    }] : []),
]))

async function getDetailData(id) {
    try {
        if (id) {
            detailData.value = await totalProduct.find((prod) => +prod.id === +id)
        }
    } catch (error) {
        console.error(error)
    }
}

onBeforeMount(() => {
    const id = params.get("id");
    getDetailData(id)
})

const buttonLabel = {
    'main': 'Ke Halaman Utama',
    'back': 'Kembail ke halaman sebelumnya',
    'next': 'Discover More on Home',
}
const buttonStatus = computed(() => {
    // 추가 결제 없는 wallet 실패 label: Kembail ke halaman sebelumnya 이전 페이지
    // 추가 결제 없는 voucher 실패 label: Kembail ke halaman sebelumnya 이전 페이지
    // voucher 성공 label: Ke Halaman Utama 메인 이동
    // wallet 성공 step < 3 label: Treat 다음 스텝
    // wallet 성공 step === 3 label: Ke Halaman Utama 메인 이동

    if (failedPayment) {
        return 'back';
    }
    // 성공한 경우
    if (detailData.value.type === "voucher") {
        return 'main'; // voucher 성공 시 메인 이동
    } else {
        if (step.value < 3) {
            return 'next'; // wallet 성공, step < 3이면 다음 스텝
        }
    }
    return 'main'; // wallet 성공, step === 3이면 메인 이동
})

function handleSubmit(status) {
    if (status === 'next') {
        if (step.value === 3) {
            step.value = 1
        } else if (step.value < 3) {
            step.value += 1
        }
    } else if (status === 'main') {
        window.location.href = '/voucher'
    } else {
        window.history.back()
    }
}
</script>

<style lang="scss" scoped></style>