<script>

export default{
    props :{
        totalContent :  {
            type : Number,
            default : 0
        },
        contentsPerPage :  {
            type : Number,
            default : 10
        },
        pageSize : {
            type : Number,
            default : 5
        },
        modelValue :{
            type : Number,
            default : 1
        }
    },
    emits : ['clickPage', 'update:modelValue'],
    computed :{
        totalPage(){
            const self = this;
            return Math.ceil(self.totalContent/self.contentsPerPage);
        },
        pagesRange (){
            const self = this;
            return Array.from(Array((self.endPage + 1) - self.startPage).keys()).map(i => self.startPage + i);
        },
        endPage(){
            const self = this;
            const end = Math.ceil(self.currentPage / self.pageSize) * self.pageSize;
            return Math.min(end, self.totalPage);
        },
        startPage(){
            const self = this;
            if(self.endPage == self.totalPage && self.endPage % self.pageSize != 0) return self.endPage - ( self.endPage % self.pageSize - 1 );
            return Math.max(self.endPage - ( self.pageSize-1 ) , 1);
        },
        currentPage:{
            get(){
                const self = this;
                if(!self.modelValue) self.$emit('update:modelValue', 1);
                return this.modelValue
            },
            set(value){
                const self = this;
                self.$emit('update:modelValue', value);
            }
        }
    },
    data(){
        return{
        }
    },
    mounted(){
    },
    methods:{
        clickPage( page ){
            const self = this;
            self.currentPage = page;
            const offset = (page - 1) * self.contentsPerPage;
            self.$emit('clickPage', offset );
        },
        clickPrev(){
            const self = this;
            self.clickPage(self.startPage-1);
        },
        clickNext(){
            const self = this;
            self.clickPage( Math.min(self.totalPage, self.endPage + 1) );
        },
    },
}

</script>

<template>
    <div class="flex gap-0.5">
        <a
            v-if="startPage > 1"
            href="javascript:void(0)"
            class="w-11 h-11 flex justify-center items-center"
            @click="clickPrev"
        >
            <img src="@/assets/img/elements-pagination-1.svg" alt="elements-pagination-1" />
        </a>
        <template v-for="(page) in pagesRange" :key="page">
            <a
                href="javascript:void(0)"
                class="rounded-lg w-11 h-11 hover:bg-indigo-600 flex justify-center items-center hover:text-white transition-all duration-500"
                :class="{'bg-indigo-600 text-white' : page == currentPage }"
                @click="clickPage(page)"
            >
                <span> {{ page }} </span>
            </a>
        </template>
        <a
            v-if="endPage < totalPage"
            href="javascript:void(0)"
            class="w-11 h-11 flex justify-center items-center"
            @click="clickNext"
        >
            <img src="@/assets/img/elements-pagination-2.svg" alt="elements-pagination-2" />
        </a>

    </div>
</template>
