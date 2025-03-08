<template>
    <header class="header min-width">
        <div class="header-bar">
            <a href="/voucher">
                <img
                  :src="logo"
                  alt="header_logo"
                />
            </a>
            <div></div>
            <button @click="handleSearchPin">
                <img
                  :src="boxIcon"
                  alt="box"
                />
            </button>
        </div>
        <form class="search-wrapper">
            <button
              type="button"
              @click="handleBack"
            >
                <img
                  :src="backIcon"
                  alt="back"
                  v-if="isSearch"
                />
            </button>
            <label class="search-input">
                <input
                  type="text"
                  class="field"
                  v-model="search"
                  placeholder="Brand name"
                  name="search"
                />
                <button type="submit">
                    <img
                      :src="searchIcon"
                      alt="search"
                    />
                </button>
            </label>
        </form>
        <!-- NOTE: help박스 자리 (빼도 검색 필터는 상위 고정)-->
        <aside
          class="help-wrapper"
          v-if="!isSearch"
        >
            <h6>
                <img
                  :src="helpIcon"
                  alt="help"
                />
                What is the Gift Voucher?
            </h6>
            <ul>
                <li>You can buy it from Share Treats homepage, BliBli, Lazada, etc.</li>
                <li>You can Exchange it to products displayed on this page.</li>
                <li><a>More info here</a></li>
            </ul>
        </aside>
    </header>
    <main class="min-width">
        <section>
            <h1
              class="flex items-center justify-center gap-2"
              :class="isSearch ? 'border-t border-b border-t-gray-700 border-b-gray-700 py-[13px]' : 'py-3'"
            >
                <img
                  :src="titleIcon"
                  alt="title"
                />
                <span
                  v-if="isSearch"
                  class="text-lg font-bold leading-5 text-black-400"
                >
                    Search result<b class="ml-2 text-main">“{{ result }}”</b>
                </span>
                <span
                  v-else
                  class="text-lg font-bold leading-5 text-black-400"
                >
                    RP.10.000 gift voucher
                </span>
                <img
                  :src="titleIcon"
                  alt="title"
                />
            </h1>
            <div
              class="py-3 pr-5 text-right"
              v-if="isSearch && products.length"
            >
                <button
                  @click="handleSort"
                  :class="sort !== null ? 'text-main' : 'text-black-100'"
                  class="inline-flex gap-1 py-[9px] pl-[10px] items-center text-xs leading-[14px] font-medium"
                >
                    Price-{{ sort === 'desc' ? 'high to low' : 'low to high' }}
                    <div class="inline-flex flex-col">
                        <Toggle
                          class="text-black-100"
                          :class="{ '!text-main': sort === 'asc' }"
                        />
                        <Toggle
                          class="rotate-180 -z-10 text-black-100"
                          :class="{ '!text-main': sort === 'desc' }"
                        />
                    </div>
                </button>
            </div>
            <strong
              v-if="!products.length"
              class="h-[calc(100vh-184px-105px)] flex pt-28 justify-center text-black-500 -tracking-wide text-sm leading-[18px]"
            >No matching search results</strong>
            <div
              v-else
              class="products-wrapper"
            >
                <template
                  v-for="(item, idx) in products"
                  :key="`${item.name}-${idx}`"
                >
                    <ul class="item">
                        <li>
                            <img
                              :src="item.img"
                              :alt="item.name"
                            />
                        </li>
                        <li class="item-info">
                            <strong>{{ item.name }}</strong>
                            <span>{{ item.detail }}</span>
                        </li>
                        <li class="item-price">
                            <strong>Rp {{ item.salePrice.toLocaleString() }}</strong>
                            <s>Rp {{ item.price.toLocaleString() }}</s>
                        </li>
                        <li>
                            <button
                              class="item-payment"
                              :disabled="item.soldOut"
                              :class="item.soldOut ? '!bg-black-50 !text-white !border-black-50' : ''"
                              @click="() => handlePayment(item)"
                            >
                                <Card />
                                {{ item.soldOut ? 'Habis' : 'SHOUT' }}
                            </button>
                        </li>
                    </ul>
                    <div
                      v-if="idx === 3"
                      class="col-span-full flex gap-2 text-xs leading-[14px] -tracking-wide products-center my-3 text-white bg-red-500 rounded-lg shadow-[6px_6px_16px_0px_#F43F5E33] p-3"
                    >
                        <span class="min-w-10 w-10 h-10 bg-white rounded-full p-[5px] inline-block">
                            <img
                              :src="speaker"
                              alt="speaker"
                              class="w-[30px] h-[30px]"
                            />
                        </span>
                        <ul>
                            <li>From this point,</li>
                            <li>The voucher listed have price that differ from Rp.10.000</li>
                            <li>Pleas be careful when selecting a product</li>
                        </ul>
                    </div>
                </template>
            </div>
        </section>
        <footer
          class="bg-gray-200 h-[140px] footer"
          v-if="!isSearch"
        >
            <div class="text-black-0">
                <a href="/faqs">FAQs</a>
                <a href="/terms">Terms</a>
            </div>
            <div class="footer__logo-wrapper">
                <img
                  :src="textLogo"
                  alt="footer_logo"
                  class="footer-logo"
                />
            </div>
        </footer>
        <footer
          class="bg-white h-[105px] footer"
          v-else
        >
            <div class="footer__logo-wrapper">
                <img
                  :src="textLogo"
                  alt="footer_logo"
                  class="footer-logo"
                />
            </div>
        </footer>
    </main>
    <Teleport
      to="body"
      v-if="modals.findPin"
    >
        <aside class="modal-wrapper">
            <div class="modal-content-wrapper">
                <p class="modal-title">
                    <strong>Cari kode PIN Anda</strong>
                </p>
                <div class="modal-content">
                    <form
                      class="search-wrapper"
                      @submit.prevent="() => checkPinCode(pinSearch.text)"
                    >
                        <label class="border-2 search-input">
                            <input
                              type="text"
                              class="field"
                              v-model="pinSearch.text"
                              placeholder="Search for your treat"
                              name="search"
                            />
                            <button type="submit">
                                <img
                                  :src="searchIcon"
                                  alt="search"
                                />
                            </button>
                        </label>
                    </form>
                </div>
                <div
                  v-if="!pinSearchMessage[pinSearch.text] && pinSearchValidate.text"
                  class="recaptcha h-[46px]"
                >
                    <div
                      class="checkbox"
                      @click.prevent="checkPinRecaptcha"
                    >
                        <input
                          id="reCaptcha"
                          type="checkbox"
                          :value="pinSearch.reCaptcha"
                          name="reCaptcha"
                          hidden
                        />
                        <span
                          :class="pinSearch.reCaptcha ? 'border-blue-100 bg-blue-100' : 'border-black-100 bg-white'">
                            <CheckSvg :class="pinSearch.reCaptcha ? 'text-white' : 'hidden'" />
                        </span>
                        <label for="reCaptcha">
                            I'm not a robot
                        </label>
                    </div>
                    <img
                      :src="reCAPTCHA"
                      alt="reCAPTCHA"
                    />
                </div>
                <div
                  v-else-if="pinSearchMessage[pinSearch.text]"
                  class="-mt-2 text-center mb-[10px] text-red-600 text-sm leading-[18px]"
                  v-html="pinSearchMessage[pinSearch.text]"
                >
                </div>
                <div class="flex gap-2">
                    <button
                      @click="handlePinCode"
                      class="w-1/2 modal-btn modal-positive-btn disabled:cursor-not-allowed disabled:!bg-black-100"
                      :disabled="pinCodeDisabled"
                    >Done</button>
                    <button
                      @click="() => handleModal('findPin')"
                      class="w-1/2 modal-btn modal-primary-btn"
                    >Close</button>
                </div>
            </div>
        </aside>
    </Teleport>
    <Teleport
      to="body"
      v-if="modals.isWrong"
    >
        <aside class="modal-wrapper">
            <div class="modal-content-wrapper">
                <p class="modal-title error">
                    <img
                      :src="xIcon"
                      alt="x_icon"
                    />
                    <strong>Something Wrong</strong>
                </p>
                <div class="modal-content">
                    <p class="mb-2">Please retry to access it again. If the issue persists, contact us.</p>
                    <ul class="text-center">
                        <li>Email : support@sharetreats.id</li>
                        <li>Jam kerja Senin - Jumat / Pukul 10.00 - Pukul 17.00</li>
                    </ul>
                </div>
                <button
                  @click="() => handleModal('isWrong')"
                  class="w-full modal-btn modal-negative-btn"
                >OK</button>
            </div>
        </aside>
    </Teleport>
    <Teleport
      to="body"
      v-if="modals.isExpired"
    >
        <aside class="modal-wrapper">
            <div class="modal-content-wrapper">
                <p class="modal-title error">
                    <strong>It’s expired</strong>
                </p>
                <div class="modal-content">
                    <p>The expired date : {{ expiredDate }}</p>
                </div>
                <button
                  @click="() => handleModal('isExpired')"
                  class="w-full modal-btn modal-negative-btn"
                >OK</button>
            </div>
        </aside>
    </Teleport>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import logo from '@/assets/img/logo.svg'
import boxIcon from '@/assets/img/box.svg'
import searchIcon from '@/assets/img/search.svg'
import helpIcon from '@/assets/img/help.svg'
import titleIcon from '@/assets/img/title.svg'
import backIcon from '@/assets/img/back.svg'
import xIcon from '@/assets/img/x_icon.svg'
import Card from '@/assets/img/Card.vue'

import speaker from '@/assets/img/speaker.png'
import textLogo from '@/assets/img/text_logo.svg'
import reCAPTCHA from '@/assets/img/reCAPTCHA_logo.svg'
import Toggle from '@/assets/img/Toggle.vue'
import CheckSvg from '@/assets/img/CheckSvg.vue'
import { testSoldOut, totalProduct } from '@/mock/voucher'

const pinSearchMessage = {
    noUse: 'you haven’t used your PIN yet',
    none: 'The pin code doesn’t exist. <br/> Please check it again'
}

const products = ref(totalProduct)
const originalProducts = JSON.parse(JSON.stringify([...totalProduct]))
function handleBack() {
    window.history.back();
    window.location.search = ''
}

const sort = ref(null) // desc, as
function handleSort() {
    sort.value = sort.value === null ? 'asc' : sort.value === 'asc' ? 'desc' : null
    if (sort.value === null) {
        products.value = [...products.value].sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
    } else if (sort.value === 'asc') {
        products.value.sort((a, b) => a.salePrice - b.salePrice);
    } else {
        products.value.sort((a, b) => b.salePrice - a.salePrice);
    }
}

const modals = ref({
    findPin: false,
    isExpired: false,
    isWrong: false,
})

function handlePayment(item) {
    if (item.name.toUpperCase().includes(testSoldOut.toUpperCase())) {
        modals.value.isWrong = true
        item.soldOut = true
        return
    }
    location.href = `/voucherDetail?id=${item.id}`
}

function handleModal(key) {
    modals.value[key] = false
}

function handleSearchPin() {
    modals.value.findPin = true
}

const pinSearch = ref({
    text: '',
    reCaptcha: false,
})

const pinSearchValidate = ref({
    text: null,
    reCaptcha: null,
})

const pinCodeDisabled = computed(() => !Object.values(pinSearchValidate.value).every((val) => val))

function checkPinCode() {
    if (!pinSearch.value.text) return
    pinSearchValidate.value.text = !pinSearchMessage[pinSearch.value.text]
}

function checkPinRecaptcha() {
    pinSearch.value.reCaptcha = !pinSearch.value.reCaptcha;
    pinSearchValidate.value.reCaptcha = pinSearch.value.reCaptcha
}

function handlePinCode() {
    window.location.href = `/payment?id=${3}`
}

const isSearch = computed(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search");
    return !!searchQuery
})

const expiredDate = ref('')
const search = ref('')
const result = ref('')
onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search");

    if (searchQuery) {
        search.value = searchQuery.toUpperCase();
        result.value = searchQuery
        products.value = originalProducts.filter((prod) =>
            prod.name.toUpperCase().includes(searchQuery)
        );
    }

    const emailQuery = params.get("expired");

    if (emailQuery) {
        const today = new Date()
        if (today - new Date(emailQuery) > 0) {
            modals.value.isExpired = true
            expiredDate.value = emailQuery
        }
    }

})
</script>