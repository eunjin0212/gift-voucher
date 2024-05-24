<script>
import LoginMain from "@/components/main/LoginMain.vue";
import ElementsModal from "@/components/elements/ElementsModal.vue";

export default {
    components: {
        LoginMain,
        ElementsModal,
    },
    data() {
        return {
            result: false,
            items: ["Login"],
            loginRequestError: {
                loginId: "",
                message: ""
            },
            loginRequest: {
                selectPosition: "admin",
                loginId: "",
            },
            noticePopup: false,
            axiosNoti: false,
        };
    },

    mounted() {
        // if(window.logOnProfile) location.href = '/company_settings/company_information'
        this.initGoogleLogin();
    },
    methods: {
        initGoogleLogin() {
            const self = this;
            const clientId = window.googleOauthClient.googleOauthClientId;

            const ele = document.createElement("script");
            ele.src = 'https://accounts.google.com/gsi/client';
            ele.onload = ()=>{
                // Document : https://developers.google.com/identity/gsi/web/guides/display-button#javascript
                google.accounts.id.initialize({
                    client_id: clientId,
                    callback: (response) => {
                        self.clerkSignInWithServer(response.credential);
                    }
                });
                google.accounts.id.renderButton(
                    document.getElementById("google-login"),
                    { theme: "outline", size: "large" }  // customization attributes
                );
                google.accounts.id.prompt(); // also display the One Tap dialog
            };
            document.getElementsByTagName("head")[0].appendChild(ele);
        },
        clerkSignInWithServer(authToken){
            const self = this;
            self.loginRequest.loginId = authToken;
            self.connect();
        },
        connect() {
            const self = this;
            const formProps = {
                "loginId" : self.loginRequest.loginId
            };

            let url = self.$api("uri", "post-sign-in-google");

            self.$axios
                .post(url, formProps)
                .then((res) => {
                    console.log(url + ":result", res);
                    location.href = "/admin_dashboard";
                })
                .catch((err) => {
                    //억지로 포커스 해제
                    document.activeElement.blur();

                    //포커스 이동, 단 input 일때만 가능...
                    // self.$nextTick(() => self.$refs.noticePopup.focus());

                    if(err.response == undefined) {
                        self.axiosNoti = true;
                        self.loginRequestError.message = "Network Error";
                        return console.error(err);
                    }

                    const status = err.response.status;
                    switch(true) {
                        case status == 400:
                            self.loginRequestError.message = "can't empty";
                            break;
                        case status == 403:{
                            self.noticePopup = true;
                            self.loginRequestError.message = "not correct";
                            break;
                        }
                    }

                    // console.error(err);
                })
                .finally(() => {});
        },
        closeNoticePopup() {
            const self = this;

            self.noticePopup = false;
        },
    },
};
</script>

<template>
    <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
        <LoginMain :items="items">
            <div id="login" class="w-full h-full flex">
                <div
                    class="flex-1 bg-[url('/src/assets/img/login-1.webp')] bg-cover"
                >
                    <div
                        class="w-full h-full flex justify-center items-center gap-4 bg-black/[0.6]"
                    >
                        <img src="@/assets/img/hrnflex_wh_logo.png" alt="white_logo" class="h-9" />
                    </div>
                </div>
                <form
                    class="flex-1 flex flex-col justify-center items-center"
                    ref="loginForm"
                >
                    <h1 class="text-4xl font-semibold">Admin Login</h1>
                    <div class="mt-3.5">
                        <div id='google-login' class="margin-left:auto; margin-right:auto; display: inline-block;"></div>
                    </div>
                </form>
            </div>
        </LoginMain>
    </div>
    <Teleport to="body">
        <ElementsModal
            v-model="noticePopup"
            :name="loginRequestError.message"
            button-text="OK"
            :warn="true"
            @button-event="closeNoticePopup"
        />
        <ElementsNotification
            v-model="axiosNoti"
            :notificationMsg="loginRequestError.message"
            :warning="axiosNoti"
        />
    </Teleport>
</template>
