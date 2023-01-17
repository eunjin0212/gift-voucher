<script setup>
import { ref, reactive, onMounted } from "vue";

const show = ref(true);

let items = reactive([
   {
    href: "/hrDashboard",
    img: "app-side-1",
    text: "Dashboard",
  },
  {
    children: true,
    img: "app-side-2",
    text: "Company",
  },
  {
    parent: "app-side-2",
    show: false,
    href: "/company/company_list",
    text: "Company List",
  },
  {
    children: true,
    img: "app-side-7",
    text: "Settings",
  },
  {
    parent: "app-side-7",
    show: false,
    href: "/admin_settings/admin_settings",
    text: "Admin Settings",
  },
  {
    children: true,
    img: "app-side-6",
    text: "flexben",
  },
  {
    parent: "app-side-6",
    show: false,
    href: "/flexben/top_up",
    text: "topup",
  },

]);
onMounted(() => {
  const splitPathPure = window.location.pathname;

  const page = `${splitPathPure}`;
  let parent = "";

  items.forEach((item, index) => {

    var isEq = item["href"] && (item["href"] === (page) || item["href"]+'/' === (page));
    if( typeof item["href_sub"] === 'object' && item["href_sub"].length ){
        const find1 = item["href_sub"].find((element, index, array) => {
            return (element === (page) || element+'/' === (page));
        });
        if( find1 ) isEq = true;
    }

    if (isEq) {
      items[index]["show"] = true;
      items[index]["isCurrentHref"] = true;
      parent = item["parent"];
    }
  });
  items.forEach((item, index) => {
    if (item["parent"] === parent) {
      items[index].show = true;
    }
  });
});

function clickItem(item) {
  if (item.children) {
    const parent = item.img;

    items.forEach((item, index) => {
      if (item["parent"] === parent) {
        const show = items[index]["show"];

        items[index].show = !show;
      }
    });
  } else {
    location.href = item.href;
  }
}

function clickShowButton() {
  show.value = !show.value;
}
</script>

<template>
  <div
    id="app-aside"
    class="p-2.5 w-64 bg-indigo-600 transition-all duration-500 z-20 max-h-screen overflow-auto"
    :class="{ 'p-0': !show, 'w-0': !show }"
  >
    <div
      class="border-b border-indigo-400 h-20 flex justify-center items-center gap-2"
    >
      <img src="@/assets/img/hrnflex_wh_logo.png" alt="white_logo" class="h-5" />
      <h1 class="text-2xl font-bold text-white whitespace-nowrap">
      </h1>
    </div>
    <div class="mt-5">
      <template v-for="(item, index) in items" v-bind:key="index">
        <a
          v-show="!item.parent || item.show"
          class="block h-12 rounded-md flex items-center hover:bg-indigo-800 transition-all duration-500 cursor-pointer"
          :class="{ 'mt-4': index > 0, 'bg-indigo-800': item['isCurrentHref'] }"
          @click="clickItem(item)"
        >
          <img
            v-if="item.img"
            class="ml-4"
            :src="require(`@/assets/img/${item.img}.svg`)"
            :alt="item.img"
            width="18"
          />
          <span
            class="flex-1 ml-4 text-base font-semibold text-white whitespace-nowrap"
            :class="{ 'ml-12': !item.img }"
            >{{ item.text }}</span
          >
          <img
            v-show="
              items.find((item2) => item2.parent === item.img && item2.show)
            "
            class="mr-5"
            :src="require(`@/assets/img/app-side-8.svg`)"
            alt="app-side-8"
          />            
          <img
            v-if="item.children && items.find((item2) => item2.parent === item.img && !item2.show)"
            class="mr-5"
            :src="require(`@/assets/img/app-side-10.svg`)"
            alt="app-side-10"
          />
        </a>
      </template>
    </div>
  </div>
  <Teleport to="body">
    <a
      class="absolute top-2 translate-x-72 border rounded-lg border-gray-200 w-12 h-12 bg-white flex justify-center items-center transition-all duration-500 cursor-pointer hover:bg-gray-100 z-20"
      :class="{ 'translate-x-4': !show }"
      href="javascript:void(0)"
      @click="clickShowButton"
    >
      <img
        :class="{ 'rotate-180': !show }"
        src="@/assets/img/app-side-9.svg"
        alt="app-side-9"
      />
      <img
        :class="{ 'rotate-180': !show }"
        src="@/assets/img/app-side-9.svg"
        alt="app-side-9"
      />
    </a>
  </Teleport>
</template>
