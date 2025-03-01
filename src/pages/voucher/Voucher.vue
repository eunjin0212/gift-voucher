<script>
import logo from '@/assets/img/logo.svg'
import leftArrowIcon from '@/assets/img/header_left_arrow.svg'
import boxIcon from '@/assets/img/box.svg'
import searchIcon from '@/assets/img/search.svg'
import helpIcon from '@/assets/img/help.svg'
import titleIcon from '@/assets/img/title.svg'
import cardIcon from '@/assets/img/card.svg'
import testImg1 from '@/assets/img/test-img1.png'
import testImg2 from '@/assets/img/test-img2.png'

export default {
    data() {
        const items = [
            {
                name: 'greenwich',
                img: testImg1,
                detail: 'Double All-In Overload',
                price: 10000,
                salePrice: 525738,
            },
            {
                name: 'greenwich',
                img: testImg2,
                detail: 'Double All-In Overload',
                price: 10000,
                salePrice: 525738,
            },
            {
                name: 'greenwich',
                img: testImg1,
                detail: 'Double All-In Overload',
                price: 10000,
                salePrice: 525738,
            },
            {
                name: 'greenwich',
                img: testImg2,
                detail: 'Double All-In Overload',
                price: 10000,
                salePrice: 525738,
            },
            {
                name: 'greenwich',
                img: testImg1,
                detail: 'Double All-In Overload',
                price: 10000,
                salePrice: 525738,
            },
            {
                name: 'greenwich',
                img: testImg2,
                detail: 'Double All-In Overload',
                price: 10000,
                salePrice: 525738,
            },
            {
                name: 'greenwich',
                img: testImg1,
                detail: 'Double All-In Overload',
                price: 10000,
                salePrice: 525738,
            },
            {
                name: 'greenwich',
                img: testImg2,
                detail: 'Double All-In Overload',
                price: 10000,
                salePrice: 525738,
            },
            {
                name: 'greenwich',
                img: testImg1,
                detail: 'Double All-In Overload',
                price: 10000,
                salePrice: 525738,
            },
        ];
        return {
            logo,
            leftArrowIcon,
            boxIcon,
            searchIcon,
            helpIcon,
            titleIcon,
            cardIcon,
            userEmail: 'hayden@sharetreats.com',
            items,
            search: {
                text: '',
                recapture: false,
            },
        }
    }
}
</script>
<template>
    <header class="header">
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
        <div class="search-wrapper">
            <label class="search-input">
                <input
                  type="text"
                  class="field"
                  v-model="search.text"
                  placeholder="Search for your treat"
                />
                <img
                  :src="searchIcon"
                  alt="search"
                />
            </label>
        </div>
        <aside class="help-wrapper">
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
    <main>
        <section>
            <h1 class="flex items-center justify-center gap-2 my-3 text-lg font-bold leading-5 text-black-300">
                <img
                  :src="titleIcon"
                  alt="title"
                />
                RP.10.000 gift voucher
                <img
                  :src="titleIcon"
                  alt="title"
                />
            </h1>
            <div class="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 items-wrapper">
                <template
                  v-for="(item, idx) in items"
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
                            <strong>Rp{{ item.salePrice.toLocaleString() }}</strong>
                            <span>Rp{{ item.price.toLocaleString() }}</span>
                        </li>
                        <li>
                            <button>
                                <img
                                  :src="cardIcon"
                                  alt="payment"
                                />
                            </button>
                        </li>
                    </ul>
                </template>

            </div>
        </section>
    </main>
</template>