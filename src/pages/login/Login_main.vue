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
                loginPwd: "",
                message: ""
            },
            loginRequest: {
                selectPosition: "admin",
                loginId: "",
                loginPwd: "",
            },
            noticePopup: false,
            axiosNoti: false,
        };
    },

    mounted() {
        // if(window.logOnProfile) location.href = '/company_settings/company_information'
        this.initLoginRequest();
    },
    methods: {
        initLoginRequest() {
            //init
            const self = this;
            self.loginRequest.loginId = "";
            self.loginRequest.loginPwd = "";
        },
        errMsgReset() {
            const self = this;
            self.loginRequestError.loginId = "";
            self.loginRequestError.loginPwd = "";
        },
        isValid() {
            const self = this;

            //비어있는 갯수 체크
            let isLoginValid = true;

            //--------------
            if (self.loginRequest.loginId == "") {
                self.loginRequestError.loginId =
                    "Please enter a vaild Account";
                isLoginValid = false;
            }
            if (self.loginRequest.loginPwd == "") {
                self.loginRequestError.loginPwd =
                    "Please provide your loginPwd";
                isLoginValid = false;
            }
            //--------------

            return isLoginValid;
        },

        login() {
            const self = this;

            //처음에 errMsgReset 해줌
            self.errMsgReset();

            //비어있는지 체크
            if (!self.isValid()) return;

            self.connect();
        },
        connect() {
            const self = this;
            const formProps = Object.fromEntries(
                new FormData(self.$refs["loginForm"])
            );

            let url = self.$api("uri", "post-sign-in");

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
        onSubmit(event) {
            event.preventDefault();
            this.login();
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
                    @submit="onSubmit"
                    ref="loginForm"
                >
                    <h1 class="text-4xl font-semibold">Admin Login</h1>
                    <ElementsInput
                        class="mt-3.5"
                        v-model="loginRequest.loginId"
                        name="Account"
                        placeholder="Enter Account"
                        :error="loginRequestError.loginId"
                        inputName="loginId"
                        inputtype="text"
                    />
                    <ElementsInput
                        class="mt-3.5"
                        v-model="loginRequest.loginPwd"
                        name="Password"
                        placeholder="Enter Password"
                        :error="loginRequestError.loginPwd"
                        inputName="loginPwd"
                        inputtype="password"
                        ref="password"
                    />
                    <ElementsButton
                        class="mt-8"
                        text="Login"
                        inputtype="submit"
                    />
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
