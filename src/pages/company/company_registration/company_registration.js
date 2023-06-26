import { createApp } from "vue";
import App from "@/pages/company/company_registration/company_registration.vue";
import "@/index.css";
import ElementsSelect from "@/components/elements/ElementsSelectRef.vue";
import ElementsInput from "@/components/elements/ElementsInput.vue";
import ElementsButton from "@/components/elements/ElementsButton.vue";
import ElementsFile from "@/components/elements/ElementsFile.vue";
import ElementsDate from "@/components/elements/ElementsDate.vue";
import ElementsToggle from "@/components/elements/ElementsToggle.vue";
import AppPopup from "@/components/AppPopup";
import { initApp } from "@/plugins/app-pre-init";

initApp(createApp(App)).then((app) =>
	app
		.component("ElementsSelect", ElementsSelect)
		.component("ElementsInput", ElementsInput)
		.component("ElementsButton", ElementsButton)
		.component("ElementsFile", ElementsFile)
		.component("ElementsToggle", ElementsToggle)
		.component("ElementsDate", ElementsDate)
		.component("AppPopup", AppPopup)
		.mount("#root")
);