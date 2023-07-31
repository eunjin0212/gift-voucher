import { createApp } from "vue";
import App from "@/pages/admin_dashboard/admin_dashboard.vue";
import "@/index.css";
import { initApp } from "@/plugins/app-pre-init";

initApp(createApp(App)).then((app) =>
	app
		.mount("#root")
)
