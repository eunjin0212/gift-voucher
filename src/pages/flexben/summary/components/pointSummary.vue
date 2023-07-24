<template>
    <div>
        <div class="flex gap-2 items-baseline">
            <h2 class="text-2xl font-semibold"> Point Summary</h2>
        </div>

        <dl class="mt-4 grid gap-3 grid-cols-3 max-w-3xl ">
            <div v-for=" ( data , key ) in summaryData" :key="key"
                class="flex flex-col items-center justify-between gap-x-4 gap-y-2
                        bg-white px-2 pb-6 pt-2 border-[1px] border-gray-200"
            >
                <dt class="text-sm font-medium leading-6 text-gray-500">{{ data.name }}</dt>
                <dd class="text-center w-full leading-10 text-gray-900">
                    <div class="text-3xl font-semibold place-self-center break-words">
                        {{ formatNumberWithComma(data.value) }}
                        <span class="text-sm font-bold self-end"> points</span>
                    </div>

                </dd>
            </div>
        </dl>
    </div>
</template>

<script>

export default{
    props : {
    },
    data(){
        return {
            summaryData : {
                TOP_UP : { name: 'Total Top-up point', value: 0 },
                AVAILABLE : { name: 'Total Available point(A) ', value: 0 },
                USED : { name: 'Used point(B)', value: 0 },
            },

        }
    },
    methods : {
        getPointSummary(){
            const self = this;
            const url = self.$api("uri", "get-flexben-point-summary" );

            self.$axios.get( url )
                    .then( res => {
                        const { totalAvailable, totalTopUp, totalUsed } = res.data.data.data;
                        console.log( totalAvailable, totalTopUp, totalUsed )
                        self.summaryData.TOP_UP.value = totalTopUp;
                        self.summaryData.AVAILABLE.value = totalAvailable;
                        self.summaryData.USED.value = totalUsed;
                    })
        },
        formatNumberWithComma( number ){
            if( ! number ) return 0;
            const local = 'en-US';
            const formattedNumber = number.toLocaleString(local);
            return formattedNumber;
        }
    },
    mounted(){
        const self = this;
        self.getPointSummary();
    }
}


</script>