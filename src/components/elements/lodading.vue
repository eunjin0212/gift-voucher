<template>
    <transition name="modalfade">
        <div class="fixed top-0 w-full h-full bg-black/75 z-40 flex justify-center items-center" v-show="emitLodingShow">
            <svg class="animate-spin h-5 w-5 mr-3 bg-white" viewBox="0 0 24 24"></svg>
            <div>
                <p class="font-mono text-white text-4xl">Loading...</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "loadingVue",
    props: ["loadingShow"],
    methods: {
        onEmitterAxiosUseLoading(){
            const self = this;
            self.$emitter.$on("UI_EVENT_USE_LOADING_BACKGROUND", (on) => {
                if(on){
                    self.axiosRequestCount += 1;
                    return;
                } 
                if(!on){
                    self.axiosRequestCount -= 1;
                    return;
                }
            });
        }
    },
    data(){
        return {
            axiosRequestCount : 0,
        }
    },
    computed : {
        emitLodingShow(){
            const self = this;
            return self.axiosRequestCount > 0;
        }
    }, 
    mounted(){

    },
    created(){
        const self = this;
        self.onEmitterAxiosUseLoading();
        
    }
};
</script>
