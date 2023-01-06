import { createApp } from "vue";
import { initApp } from "@/plugins/app-pre-init";
import App from "@/pages/test_tools/message_q/MessageQueueClient.vue";
import "@/index.css";
import ElementsSelect from "@/components/elements/ElementsSelect.vue";
import VueCookies from "vue3-cookies";
import ElementsButton from "@/components/elements/ElementsButton";
import ElementsInput from "@/components/elements/ElementsInput.vue";
import ElementsDate from "@/components/elements/ElementsDate.vue";
import ElementsSelectRef from "@/components/elements/ElementsSelectRef.vue";
import ElementsNotification from '@/components/elements/ElementsNotification.vue'

initApp(createApp(App)).then((app) =>
    app
        .use(VueCookies)
        .component("ElementsSelect", ElementsSelect)
        .component("ElementsButton", ElementsButton)
        .component("ElementsDate", ElementsDate)
        .component("ElementsInput", ElementsInput)
        .component("ElementsSelectRef", ElementsSelectRef)
        .component("ElementsNotification", ElementsNotification)
        .mount("#root")
);
