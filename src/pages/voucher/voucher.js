import { createApp } from "vue";
import "@/index.css";
import Voucher from "./Voucher.vue";
import VueCookies from "vue3-cookies";

createApp(Voucher).use(VueCookies).mount("#root");

