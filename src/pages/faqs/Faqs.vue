<script>
import accordionIcon from '@/assets/img/accordion.svg'
import textLogo from '@/assets/img/text_logo.svg'
import backIcon from '@/assets/img/back.svg'

export default {
    data() {
        const contentClass = 'mt-5'
        return {
            textLogo,
            accordionIcon,
            backIcon,
            faqs: [
                {
                    title: 'What is SHARE TREATS?',
                    active: true,
                    content: [
                        'SHARE TREATS is a gifting service that allows sending casual treats through mobile payments.',
                        `<ul class="${contentClass}">
                            <li>Payment Options Available:</li>
                            <li>-Load/postpaid credits</li>
                            <li>-GCash</li>
                            <li>-GrabPay</li>
                            <li>-PayMaya</li>
                            <li>-BPI</li>
                            <li>-Credit/Debit</li>
                        </ul>`
                    ]
                },
                {
                    title: 'How do I use SHARE TREATS?',
                    active: false,
                    content: [
                        'SHARE TREATS is a gifting service that allows sending casual treats through mobile payments.',
                        `<ul class="${contentClass}">
                            <li>Payment Options Available:</li>
                            <li>-Load/postpaid credits</li>
                            <li>-GCash</li>
                            <li>-GrabPay</li>
                            <li>-PayMaya</li>
                            <li>-BPI</li>
                            <li>-Credit/Debit</li>
                        </ul>`
                    ]
                },
                {
                    title: 'Who can avail SHARE TREATS?',
                    active: false,
                    content: [
                        'SHARE TREATS is a gifting service that allows sending casual treats through mobile payments.',
                        `<ul class="${contentClass}">
                            <li>Payment Options Available:</li>
                            <li>-Load/postpaid credits</li>
                            <li>-GCash</li>
                            <li>-GrabPay</li>
                            <li>-PayMaya</li>
                            <li>-BPI</li>
                            <li>-Credit/Debit</li>
                        </ul>`
                    ]
                },
                {
                    title: 'How can I anail SHARE TREATS for myself?',
                    active: false,
                    content: [
                        'SHARE TREATS is a gifting service that allows sending casual treats through mobile payments.',
                        `<ul class="${contentClass}">
                            <li>Payment Options Available:</li>
                            <li>-Load/postpaid credits</li>
                            <li>-GCash</li>
                            <li>-GrabPay</li>
                            <li>-PayMaya</li>
                            <li>-BPI</li>
                            <li>-Credit/Debit</li>
                        </ul>`
                    ]
                },
            ],
        }
    },
    methods: {
        handleBack() {
            window.history.back();
        },
        handleToggle(content) {
            const activeItemIndex = this.faqs.findIndex((data) => data.title === content.title)
            // 단일 아코디언
            this.faqs.forEach((faq, idx) => {
                if (idx !== activeItemIndex) {
                    faq.active = false
                }
            })

            this.faqs[activeItemIndex].active = !this.faqs[activeItemIndex].active

            // 다중 아코디언
            // this.faqs[activeItemIndex].active = !this.faqs[activeItemIndex].active
        },
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
            <h1 class="text-lg font-semibold leading-6 -tracking-wider text-black-300">FAQs</h1>
            <div></div>
        </div>
    </header>
    <main class="min-width h-[calc(100vh-56px-106px)]">
        <h2 class="font-semibold leading-6 text-main py-[10px] mx-5 border-b border-b-gray-700">About SHARE TREATS</h2>
        <div
          v-for="faq in faqs"
          :key="faq.title"
        >
            <h3
              class="cursor-pointer border-b border-b-gray-700 flex items-center justify-between py-[18px] px-5 font-medium text-[15px] leading-[18px]"
              @click="() => handleToggle(faq)"
            >
                <span>{{ faq.title }}</span>
                <img
                  :src="accordionIcon"
                  class="transition-transform"
                  :class="{ 'rotate-180': !faq.active }"
                />
            </h3>
            <div
              class=" p-5 leading-5 text-[13px] bg-gray-0 text-black-0 hidden h-0 transition-all border-b border-b-gray-700"
              :class="{ '!h-auto !block': faq.active }"
              v-html="faq.content"
            >
            </div>
        </div>
    </main>
    <footer class="bg-white h-[105px] footer sticky bottom-0">
        <div class="footer__logo-wrapper">
            <img
              :src="textLogo"
              alt="footer_logo"
              class="footer-logo"
            />
        </div>
    </footer>
</template>