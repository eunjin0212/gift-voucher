import { createApp } from "vue";
import "@/index.css";
import VoucherDetail from "./VoucherDetail.vue";
import VueCookies from "vue3-cookies";

createApp(VoucherDetail).use(VueCookies).mount("#root");

