<script>
import { ValidateUtil } from "@/plugins/app-util.js";

export default {
  components: {
  },
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  mounted() {},
  data() {
    return {
      tabs: [
        {
          name: "companyInfo",
          text: "Company info",
          current: true,
        },
      ],
      company: {},
    }; //return
  }, //data
  computed: {
    // employee: {
    //     get(){ return this.modelValue},
    //     set(value){
    //         const self = this;
    //         self.$emit("update:modelValue", value)
    //     },
    // },
  },
  methods: {
    over15Charaters: ValidateUtil.over15Charaters,
    over15CharFromFullName: ValidateUtil.over15CharFromFullName,
    clickTab(tabName, sequence) {
      const self = this;
      const index = self.tabs.findIndex((tab) => tab.name === tabName) ?? 0;

      self.tabs.forEach((tab, index2) => {
        self.tabs[index2].current = index2 === index;
      });

      self.$emitter.$emit("selectTab", { tabName, userSeq: sequence });
    },
    getCompanyData() {
      const self = this;
      const url = self.$api("uri", `get-company`);
      self.$axios
        .get(`${url}/${encodeURIComponent(self.modelValue)}`)
        .then((res) => {
          self.company = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<template>
  <div class="w-[70vw]">
    <div class="flex">
      <div class="border-r border-gray-200">
        <div class="flex px-7 py-4 gap-4 items-center">
          <div
            class="border rounded-full w-24 h-24"
            v-if="company.profilePhotoUrl"
          >
            <img
              class="border rounded-full object-cover h-24 w-24 object-center"
              :src="company.profilePhotoUrl"
              alt="employees-information-1"
              width="100"
              height="100"
            />
          </div>
          <div
            v-else
            class="rounded-full w-24 h-24 bg-rose-400 flex justify-center items-center"
          >
            <span
              v-if="company.employeeName"
              class="text-5xl font-medium text-white"
              >{{ company.employeeName.substring(0, 1).toUpperCase() }}</span
            >
          </div>
          <div>
            <h3 class="text-lg font-bold">
              {{ over15CharFromFullName(company.employeeName) }}
            </h3>
            <p class="text-sm font-normal w-32 truncate">
              {{ company.departmentName }}
            </p>
            <div
              class="mt-1 rounded bg-emerald-400/20 text-emerald-400 px-6 py-1.5 text-center text-sm font-bold w-fit"
            >
              {{ company.employeeStatus }}
            </div>
          </div>
        </div>
        <div class="w-full h-px bg-gray-200"></div>
        <div class="px-6 py-7">
          <a
            href="javascript:void(0)"
            class="rounded flex items-center gap-4 h-12 w-full bg-indigo-600/20 text-base font-semibold px-3.5"
          >
            <img
              src="@/assets/img/popup-employees-information-1.svg"
              alt="popup-employees-information-1"
              class="w-6 h-6"
            />
            <span class="flex-1">Profile</span>
          </a>
          <a
            href="javascript:void(0)"
            class="mt-2 rounded flex items-center gap-4 h-12 w-full text-base font-semibold px-3.5"
          >
            <img
              src="@/assets/img/popup-employees-information-2.svg"
              alt="popup-employees-information-2"
              class="w-6 h-6"
            />
            <span class="flex-1">Time History</span>
          </a>
          <a
            href="javascript:void(0)"
            class="mt-2 rounded flex items-center gap-4 h-12 w-full text-base font-semibold px-3.5"
          >
            <img
              src="@/assets/img/popup-employees-information-3.svg"
              alt="popup-employees-information-3"
              class="w-6 h-6"
            />
            <span class="flex-1">Leave History</span>
          </a>
        </div>
      </div>
      <div class="flex-1 px-3 py-4">
        <h3 class="text-xl font-bold">Profile</h3>
        <div
          class="mt-3 border-b border-gray-300 bg-transparent flex justify-between items-center gap-14"
        >
          <template v-for="tab in tabs" v-bind:key="tab.name">
            <a
              class="border-b-4 pb-1.5 text-base font-semibold text-gray-500 transition-all duration-500 flex-1 text-center"
              :class="{
                'border-transparent': !tab.current,
                'border-indigo-600': tab.current,
                'text-black': tab.current,
              }"
              href="javascript:void(0)"
              @click="clickTab(tab.name, employee.employeeSeq)"
              >{{ tab.text }}</a
            >
          </template>
        </div>
      </div>
    </div>
    <div
      class="px-4 flex justify-end items-center w-full h-[70px] border-t border-gray-200 bg-white"
    ></div>
  </div>
</template>
