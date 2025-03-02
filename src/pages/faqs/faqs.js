import { createApp } from "vue";
import "@/index.css";
import Faqs from "./Faqs.vue";
import VueCookies from "vue3-cookies";

createApp(Faqs).use(VueCookies).mount("#root");

