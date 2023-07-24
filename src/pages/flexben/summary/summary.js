import { createApp } from "vue";
import App from "@/pages/flexben/summary/summary.vue";
import "@/index.css";
import ElementsSelect from "@/components/elements/ElementsSelectRef.vue";
import ElementsInput from "@/components/elements/ElementsInput.vue";
import ElementsButton from "@/components/elements/ElementsButton.vue";
import ElementsFile from "@/components/elements/ElementsFile.vue";
import ElementsDate from "@/components/elements/ElementsDate.vue";
import ElementsPagination from "@/components/elements/ElementsPagination.vue";
import AppPopup from "@/components/AppPopup";
import { initApp } from "@/plugins/app-pre-init";

initApp(createApp(App)).then((app) =>
	app
		.component("ElementsSelect", ElementsSelect)
		.component("ElementsInput", ElementsInput)
		.component("ElementsButton", ElementsButton)
		.component("ElementsFile", ElementsFile)
		.component("ElementsDate", ElementsDate)
		.component("ElementsPagination", ElementsPagination)
		.component("AppPopup", AppPopup)
		.mount("#root")
);