import { createApp } from "vue";
import App from "@/pages/admin_dashboard/admin_dashboard.vue";
import "@/index.css";
import { initApp } from "@/plugins/app-pre-init";
import ElementsButton from "@/components/elements/ElementsButton.vue";

initApp(createApp(App)).then((app) =>
	app
    .component("ElementsButton", ElementsButton)
    .mount("#root")
)
