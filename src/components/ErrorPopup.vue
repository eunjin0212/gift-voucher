<script>
import ElementsNotification from "@/components/elements/ElementsNotification.vue";
export default {
    components: {
        ElementsNotification,
    },
    name: "ErrorPopup",
    data() {
        return {
            showPopup: false,
            showMsg: "",
        };
    },
    created() {
        this.testpopup();
    },
    methods: {
        testpopup() {
            let self = this;

            self.$emitter.$on("UI_EVENT_LOADING_BG_OVERLAY", (status,errorCode) => {

                switch (true) {
                    case errorCode == "HR_FORGOT_ACCOUNT_FORBIDDEN_403_FAILED":
                        self.showMsg = "This email is not registered.";
                        break;
                    case status == 400:
                        self.showMsg = "400 Bad Request error";
                        break;
                    case status == 401:
                        self.showMsg = "401 Unauthorized error";
                        break;
                    case status == 403:
                        self.showMsg = "403 Forbidden error";
                        break;
                    case status == 404:
                        self.showMsg = "404 Not Found error";
                        break;
                    case 500 > status && status > 400:
                        self.showMsg = "4xx Client error responses";
                        break;
                    case 600 > status && status >= 500:
                        self.showMsg = "5xx Server error responce";
                        break;
                    default:
                        self.showMsg = "Network Error !";
                }
                self.showPopup = true;
            });
        },
    },
};
</script>

<template>
    <Teleport to="body">
        <ElementsNotification
            v-model="showPopup"
            :notificationMsg="showMsg"
            :warning="showPopup"
        />
        <!-- <div v-if="showPopup">{{ showMsg }}</div> -->
    </Teleport>
</template>
