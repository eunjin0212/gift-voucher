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
            tab: 'terms' // terms, policy
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
    <main class="p-5 min-width">
        <ul class="flex items-center gap-2 p-2 bg-gray-600 rounded-md">
            <li
              @click="() => tab = 'terms'"
              :class="tab === 'terms' ? 'bg-white text-main' : 'text-gray-950'"
              class="text-nowrap cursor-pointer py-3 px-[10px] flex-1 text-center rounded-md text-sm leading-4 -tracking-wide font-semibold"
            >Syarat dan Ketentuan</li>
            <li
              @click="() => tab = 'policy'"
              :class="tab === 'policy' ? 'bg-white text-main' : 'text-gray-950'"
              class="text-nowrap cursor-pointer py-3 px-[10px] flex-1 text-center rounded-md text-sm leading-4 -tracking-wide font-semibold"
            >
                Kebijakan Privacy</li>
        </ul>
        <div
          class="mt-3 min-h-[572px]"
          v-if="tab === 'terms'"
        >
            <h2 class="font-semibold leading-6 text-main py-[10px] mb-2">Syarat dan ketentuan</h2>
            <ul class="text-sm text-[#363D4E] -tracking-wide">
                <li class="mb-4 ">
                    Ketentuan dalam perjanjian ini (“Ketentuan Layanan”) mengatur hubungan antara anda dan SHARE TREATS
                    INNOVATION dan pengembang terafiliasi (selanjutnya disebut “kami”) mengenai penggunaan SHARE TREATS
                    (“Layanan”), dan situs promosinya serta layanan terkait (“Layanan”). Penggunaan layanan ini juga
                    diatur dalam kebijakan privasi Share Treats Innovation, yang dimasukkan sebagai referensi.
                </li>
                <li class="mb-4">Sebelum mengakses/menggunakan layanan, anda
                    harus menyetujui Ketentuan Layanan dan
                    Kebijakan
                    Privasi. Anda juga akan diminta untuk mendaftarkan akun anda di layanan ini. Jika anda mengakses
                    layanan dari situs website dan aplikasi seluler (“apps”), anda diharuskan untuk mematuhi ketentuan
                    layanan yang ada di Ketentuan Layanan.</li>
                <li>DENGAN MENGINSTAL, MENGGUNAKAN ATAU MENGAKSES
                    LAYANAN/APLIKASI INI, ANDA MENYETUJUI
                    KETENTUAN
                    LAYANAN INI. JIKA ANDA TIDAK MENYETUJUI KETENTUAN LAYANAN INI MAKA ANDA TIDAK DAPAT MENGINSTAL ATAU
                    MENGGUNAKAN LAYANAN INI. PENGGUNAAN LAYANAN INI ADALAH DILARANG.</li>
            </ul>
        </div>
        <div
          class="mt-3"
          v-else
        >
            <h2 class="font-semibold leading-6 text-main py-[10px] mb-2">Pertanyaan Sering</h2>
            <h6 class="text-[15px] leading-5 font-semibold text-black-300 py-1 mb-4">Privasi Anda Penting bagi Kami</h6>
            <ul class="text-xs leading-5 text-black-0 -tracking-wide">
                <li class="mb-4">
                    <p class="font-medium text-[13px] leading-5 -tracking-wide text-black-300 mb-2">
                        SHARE TREATS INNOVATION
                    </p>
                    dan pengembang afiliasi (“kami”) berdedikasi untuk melindungi hak privasi semua pengguna (“pengguna”
                    atau “Anda”). Kebijakan privasi ini (“Kebijakan”) menjelaskan bagaimana SHARETREATS INNOVATION
                    CORPORATION mengumpulkan, menggunakan, menyimpan, mengungkapkan, dan membuang informasi pribadi,
                    yang Anda berikan, atau kami kumpulkan sehubungan dengan layanan yang termasuk dalam
                    https://www.sharetreats. id (“situs web”) atau dalam aplikasi SHARE TREATS (“aplikasi”) yang
                    tersedia di platform seluler (contoh: iOS dan Android) (secara kolektif disebut “Layanan”). Perlu
                    diketahui, ruang lingkup kebijakan ini terbatas pada informasi yang dikumpulkan atau diterima oleh
                    kami melalui layanan yang telah Anda gunakan. Kami tidak bertanggung jawab atas aktivitas orang atau
                    perusahaan pihak ketiga, konten situs mereka.
                </li>
                <li class="mb-4">
                    <p class="font-medium text-[13px] leading-5 -tracking-wide text-black-300 mb-2">
                        Pengumpulan dan Penggunaan Data Pribadi
                    </p>
                    Data pribadi mengacu pada semua jenis informasi pribadi, baik yang direkam dalam bentuk material
                    atau digital, dari mana identitas seseorang terlihat atau dapat dipastikan secara wajar dan langsung
                    oleh entitas yang memegang informasi tersebut atau jika digabungkan dengan informasi lain akan
                    secara langsung dan pasti mengidentifikasi individu.
                </li>
            </ul>
        </div>
    </main>
    <footer class="bg-white h-[105px] footer">
        <div class="footer__logo-wrapper">
            <img
              :src="textLogo"
              alt="footer_logo"
              class="footer-logo"
            />
        </div>
    </footer>
</template>