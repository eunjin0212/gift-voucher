<script>
import accordionIcon from '@/assets/img/accordion.svg'
import textLogo from '@/assets/img/text_logo.svg'
import backIcon from '@/assets/img/back.svg'

export default {
    data() {
        return {
            textLogo,
            accordionIcon,
            backIcon,
        }
    },
    methods: {
        handleBack() {
            window.history.back();
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
            <h1 class="text-lg font-semibold leading-6 -tracking-wider text-black-300">Terms</h1>
            <div></div>
        </div>
    </header>
    <main class="min-width">
        <h2 class="font-semibold leading-6 text-main py-[10px] px-5">Syarat dan ketentuan</h2>
        <h2 class="font-semibold leading-6 text-main py-[10px] px-5">Pertanyaan Sering</h2>
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