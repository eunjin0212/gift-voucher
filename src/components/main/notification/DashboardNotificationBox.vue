<script setup>
import { XIcon } from "@heroicons/vue/solid";
import { defineProps, defineEmits, watch, ref, onMounted } from "vue";

const props = defineProps({
    box: Object,
});

const emit = defineEmits(['boxClose']);
function deleteBox(){
    props.box.deleted = true;
    emit("boxClose", props.box);
}

function iso8601TimeToHuman(iso8601){
    var date = new Date(iso8601);
    const timeF = ("0"+date.getHours()).slice(-2) + ":" + ("0"+date.getMinutes()).slice(-2) + ":" + ("0"+date.getSeconds()).slice(-2);
    return date.toLocaleDateString("en-US") + " " + timeF; // MM/dd/yyyy 00:00:00
}

function hasLinkHtmlTag(htmlText){
    const pos1 = (htmlText||'').search('<a');
    const pos2 = (htmlText||'').search('href=');
    return pos1 >= 0 && pos2 > 0;
}

props.box.showDownloadButtons = false;
props.box.downloadButtons = [];

function tryLoadDownloadButtons(text){
    props.box.downloadButtons = [];

    var vDom = document.createElement('div');
    vDom.innerHTML = text;
    const aLinks = vDom.getElementsByTagName('a');
    for (const al of aLinks) {
        const btnText = al.innerHTML;
        const btnLink = al.getAttribute('href');
        
        props.box.downloadButtons.push({text : btnText, link : btnLink});
    }

    props.box.showDownloadButtons = isValidYet(props.box);
}

function isValidYet(b){
    const timeExpired = (new Date( b.expire || (new Date()).toISOString() )).getTime();
    const timeCurrent = (new Date()).getTime();

    const yetValid = timeExpired > timeCurrent;
    return yetValid;
}

onMounted(() => {
    if( hasLinkHtmlTag(props.box.description) ){
        ((t)=>{
            tryLoadDownloadButtons(t);
        })(props.box.description);
    }else{
        props.box.showDownloadButtons = false;
    }
});

</script>
<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div :class="[box.deleted ? 'bg-slate-300':'bg-white', 'shadow sm:rounded-lg', 'hover:bg-slate-100']">
      <div class="px-3 py-3 sm:p-3">
        <div class="flex items-start justify-between">
            <div>
                <div class="text-xs font-normal text-gray-300" v-text="iso8601TimeToHuman(box.create)">
                </div>
                <h5 class="text-sm font-medium leading-6 text-gray-900">
                    {{box.subject}}
                </h5>
            </div>
            <div class="ml-3 flex h-7 items-center opacity-20">
                <button type="button" class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closePanel">
                    <span class="sr-only">Close panel</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" @click="deleteBox" v-show="!box.deleted"/>
                </button>
            </div>
        </div>
        <div class="mt-2 max-w-xl text-sm text-gray-500" v-show="isValidYet(box)">
            <p v-html="box.description"></p>
        </div>
        <div class="mt-5" v-show="box.showDownloadButtons">
            <template  v-for="(btn, index) in box.downloadButtons" v-bind:key="index">
                <a :href="btn.link" target="_blank"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 font-medium text-gray-100 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm">
                        {{ btn.text }}
                </a>
            </template>
        </div>
      </div>
    </div>
</template>