import { createApp } from 'vue'
import App from '@/pages/login/Login_main.vue'
import '@/index.css'
import ElementsSelect from '@/components/elements/ElementsSelect.vue'
import ElementsInput from '@/components/elements/ElementsInput.vue'
import ElementsButton from '@/components/elements/ElementsButton.vue'
import ElementsNotification from '@/components/elements/ElementsNotification.vue'
import VueCookies from 'vue3-cookies'
import { initApp } from '@/plugins/app-pre-init'

initApp(createApp(App),true)
.then(app=> app
    .use(VueCookies)
    .component('ElementsSelect', ElementsSelect)
    .component('ElementsInput', ElementsInput)
    .component('ElementsButton', ElementsButton)
    .component('ElementsNotification',ElementsNotification)
    .mount('#root')
)
