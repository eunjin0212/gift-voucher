import { createApp } from "vue";
import "@/index.css";
import Terms from "./Terms.vue";
import VueCookies from "vue3-cookies";

createApp(Terms).use(VueCookies).mount("#root");

