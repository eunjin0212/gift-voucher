import { createApp } from "vue";
import App from "@/pages/image-token/image-token.vue";
import "@/index.css";
import ElementsSelect from "@/components/elements/ElementsSelectRef.vue";
import ElementsInput from "@/components/elements/ElementsInput.vue";
import ElementsButton from "@/components/elements/ElementsButton.vue";
import ElementsFile from "@/components/elements/ElementsFile.vue";
import ElementsDatePicker from "@/components/elements/ElementsDatePicker.vue";
import AppPopup from "@/components/AppPopup";
import { initApp } from "@/plugins/app-pre-init";

initApp(createApp(App)).then((app) => 
	app
		.component("ElementsSelect", ElementsSelect)
		.component("ElementsInput", ElementsInput)
		.component("ElementsButton", ElementsButton)
		.component("ElementsFile", ElementsFile)
		.component("ElementsDatePicker", ElementsDatePicker)
		.component("AppPopup", AppPopup)
		.mount("#root")
);