import { createApp } from "vue";
import "@/index.css";
import Payment from "./Payment.vue";
import VueCookies from "vue3-cookies";

createApp(Payment).use(VueCookies).mount("#root");

