<script>
import logo from '@/assets/img/logo.svg'
import headerLeftArrow from '@/assets/img/header_left_arrow.svg'

export default {
    data() {
        return {
            logo,
            headerLeftArrow,
            userEmail: 'hayden@sharetreats.com'
        }
    }
}
</script>
<template>
    <header class="header">
        <a href="/">
            <img
              :src="logo"
              alt="header_logo"
            />
        </a>
        <div></div>
        <!-- <button>
            <img
              :src="headerLeftArrow"
              alt="header_left_arrow"
            />
        </button> -->
    </header>
    <main>
        <section>
            <div>
            </div>
        </section>
    </main>
</template>