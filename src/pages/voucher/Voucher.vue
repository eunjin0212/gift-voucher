<script>
import logo from '@/assets/img/logo.svg'
import leftArrowIcon from '@/assets/img/header_left_arrow.svg'
import boxIcon from '@/assets/img/box.svg'
import searchIcon from '@/assets/img/search.svg'
import helpIcon from '@/assets/img/help.svg'
import titleIcon from '@/assets/img/title.svg'
import backIcon from '@/assets/img/back.svg'
import Card from '@/assets/img/Card.vue'
import testImg1 from '@/assets/img/test-img1.png'
import testImg2 from '@/assets/img/test-img2.png'
import speaker from '@/assets/img/speaker.png'
import textLogo from '@/assets/img/text_logo.svg'
import Toggle from '@/assets/img/Toggle.vue'

const test = [
    {
        name: 'pizza',
        img: testImg1,
        detail: 'Double All-In Overload',
        price: 525738,
        salePrice: 1000,
        soldOut: false
    },
    {
        name: 'greenwich',
        img: testImg2,
        detail: 'Double All-In Overload',
        price: 525738,
        salePrice: 10000,
        soldOut: false
    },
    {
        name: 'pizza',
        img: testImg1,
        detail: 'Double All-In Overload',
        price: 525738,
        salePrice: 21000,
        soldOut: true
    },
    {
        name: 'greenwich',
        img: testImg2,
        detail: 'Double All-In Overload',
        price: 525738,
        salePrice: 20000,
        soldOut: false
    },
]
export default {
    components: {
        Card,
        Toggle,
    },
    data() {
        const totalProduct = Array.from({ length: 16 }, (_, index) => ({
            ...test[index % test.length],
            name: `${test[index % test.length].name}${index + 1}`,
            salePrice: test[index % test.length].salePrice + index * 100,
        }));
        return {
            logo,
            leftArrowIcon,
            boxIcon,
            searchIcon,
            helpIcon,
            titleIcon,
            backIcon,
            textLogo,
            speaker,
            userEmail: 'hayden@sharetreats.com',
            totalProduct,
            originalProducts: JSON.parse(JSON.stringify([...totalProduct])),
            search: '',
            sort: null, // desc, asc
        }
    },
    methods: {
        handleBack() {
            window.history.back();
            window.location.search = ''
        },
        handleSort() {
            this.sort = this.sort === null ? 'asc' : this.sort === 'asc' ? 'desc' : null
            if (this.sort === null) {
                this.totalProduct = [...this.totalProduct].sort((a, b) =>
                    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                );
                console.log(this.totalProduct)
            } else if (this.sort === 'asc') {
                this.totalProduct.sort((a, b) => a.salePrice - b.salePrice);
            } else {
                this.totalProduct.sort((a, b) => b.salePrice - a.salePrice);
            }
        }
    },
    computed: {
        isSearch() {
            const params = new URLSearchParams(window.location.search);
            const searchQuery = params.get("search");
            return !!searchQuery
        }
    },
    mounted() {
        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get("search");

        if (searchQuery) {
            this.search = searchQuery;
            this.totalProduct = this.originalProducts.filter((prod) =>
                prod.name.includes(searchQuery)
            );
        }
    }
}
</script>
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
            <button>
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
                    Search result<b class="ml-2 text-main">“{{ search }}”</b>
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
              v-if="isSearch && totalProduct.length"
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
              v-if="!totalProduct.length"
              class="h-[calc(100vh-184px-105px)] flex pt-28 justify-center text-black-500 -tracking-wide text-sm leading-[18px]"
            >No matching search results</strong>
            <div
              v-else
              class="products-wrapper"
            >
                <template
                  v-for="(item, idx) in totalProduct"
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
                            <span>Rp {{ item.price.toLocaleString() }}</span>
                        </li>
                        <li>
                            <button
                              class="item-payment"
                              :disabled="item.soldOut"
                              :class="item.soldOut ? '!bg-black-50 !text-white !border-black-50' : ''"
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
                <button>FAQs</button>
                <button>Terms</button>
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
</template>