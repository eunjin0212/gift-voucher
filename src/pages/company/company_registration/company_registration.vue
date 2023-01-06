<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";
import MainTabs from "@/components/main/sections/MainTabs.vue";
import PopupCompanyRegistration from "@/pages/company/company_registration/popups/PopupCompanyRegistration.vue";
import PopupCompanyInformation from "@/pages/company/company_registration/popups/PopupCompanyInformation.vue";
import ElementsPagination from "@/components/elements/ElementsPagination.vue"
import { ValidateUtil } from "@/plugins/app-util.js";

export default {
  components: {
    AppAside,
    AppMain,
    MainTabs,
    PopupCompanyRegistration,
    PopupCompanyInformation,
    ElementsPagination,
  },
  data() {
    return {
      companyCount : null,
      items: ["Company"],
      tabs: [
        {
          name: "company",
          text: "Company",
          count : null,
          current: true,
        },
      ],
      companyList: [],
      showPopup: false,
      showCompanyPop: false,
      json_query:{
        limit : 10,
        offset : null,
        companyName : null,
      },
      selectCompany: null,
      currentPage : null,
      searchRequest : {
        companyName : null
      },

    };
  }, //data
  mounted() {
    const self = this;
    self.getCompanyListData(true);
  },
  methods: {
    over15CharFromFullName : ValidateUtil.over15CharFromFullName,
    over15Charaters : ValidateUtil.over15Charaters,
    convertPhoneGlobalToLocal : ValidateUtil.convertPhoneGlobalToLocal,
    clickEmployee(item) {
      const self = this;
      self.showCompanyPop = true;
      self.selectCompany = item.companySeq;
      self.$nextTick( () => {
        self.$refs.companyPop.getEmployeeData();
        self.$refs.companyPop.clickTab('companyInfo', item.companySeq);
      })
    },
    companyRegistrationPop(){
      const self = this;
      self.showPopup = true;
      const iPop = self.$refs.invitePopup
      iPop.resetReqeustData.call(iPop);
      iPop.resetErrorMsg();
    },
    getCompanyListData( isInit=false, offset=0 ){
      const self = this;
      self.json_query.offset = offset;
      let json_query = { ...self.json_query};

      const url = self.$api("uri", "get-company");
      json_query = JSON.stringify(json_query);
      self.$axios.get(url, { params : { json_query } }).then(res => {
        self.companyList = res.data.data.list;
        self.companyCount = res.data.data.total;
        if(isInit) self.tabs[0].count = res.data.data.total;
      });
    },
    afterClickPage( item ){
      const self = this;
      self.getCompanyListData( false, item);
    },
    searchCompanyData(){
      const self = this;
      self.json_query = {
        limit : self.json_query.limit,
        companyName : self.searchRequest.companyName,
      };

      self.getCompanyListData();
      self.currentPage = 1;
    },
  },
}; // export default
</script>

<template>
  <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
    <AppAside />
    <AppMain :items="items">
      <button class="absolute top-32 right-10 h-12 w-fit px-5 border rounded border-indigo-600 bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-800 transition-all duration-500 text-center"
              @click="companyRegistrationPop">
        + Registration Company
      </button>

      <div class="flex-1 mt-9">
        <MainTabs :tabs="tabs"/>
        <div id="employees" class="mt-12 w-full max-w-7xl">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">
              Company
            </h2>
          </div>
          <div
              class="
                            mt-5
                            rounded-lg
                            w-full
                            max-w-7xl
                            bg-white
                            shadow-md shadow-gray-200
                        "
          >
            <div
                class="
                                flex
                                justify-between
                                items-center
                                gap-5
                                flex-wrap
                                p-5
                            "
            >
              <div
                  class="flex justify-between items-center gap-5"
              >
              </div>
              <div
                  class="flex justify-between items-center gap-5"
              >
                <ElementsInput
                    v-model="searchRequest.companyName"
                    placeholder="Search Company"
                    :width72="true"
                />
                <ElementsButton
                    text="Search"
                    :fitContent="true"
                    :height12="true"
                    @click-event="searchCompanyData"
                />
              </div>
            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="flex justify-between items-center">
              <h3
                  class="
                                    py-4 text-base font-medium text-slate-500 flex-1
                                    text-center
                                "
              >
                Company Name
              </h3>
              <h3
                  class="
                                    py-4
                                    text-base
                                    font-medium
                                    text-slate-500
                                    flex-1
                                    text-center
                                "
              >
                Company Seq
              </h3>

            </div>
            <div class="w-full h-px bg-gray-200"></div>
            <div class="overflow-auto">
              <div class="min-w-full w-fit">
                <template
                    v-for="(company, index) in companyList" v-bind:key="index"
                >
<!--                  <a href="javascript:void(0)" @click="clickEmployee(company)">-->
                  <a href="javascript:void(0)">
                    <div
                        class="
                                        min-w-[656px]
                                        flex
                                        justify-between
                                        items-center
                                        py-2.5
                                        w-full
                                    "
                        :class="{ 'bg-slate-50': index % 2 !== 0 }"
                    >
                      <div
                          class="
                                            flex
                                            items-center
                                            gap-2
                                            flex-1
                                            px-4
                                        "
                      >
                        <div
                            class="
                                                rounded-full
                                                w-14
                                                h-14

                                                flex
                                                justify-center
                                                items-center
                                            "
                            :class="[index % 2 !== 0? 'bg-rose-400' : 'bg-blue-500']"
                        >
                                            <span
                                                v-if="company.companyName"
                                                class="text-3xl font-medium text-white"
                                            >{{ company.companyName.substring(0, 1).toUpperCase() }}</span>
                        </div>
                        <div class="ml-3.5 flex-1 truncate text-base font-bold">

                          {{ company.companyName }}
                        </div>
                      </div>

                      <div
                          class="flex-1 text-sm font-normal text-center truncate"
                      >
                        {{ company.companySeq }}
                      </div>

                    </div>
                  </a>
                </template>
              </div>
            </div>
            <div
                class="w-full h-28 flex justify-center items-center"
            >
              <ElementsPagination
                  v-model="currentPage"
                  :totalContent="companyCount"
                  :contentsPerPage="json_query.limit"
                  @clickPage="afterClickPage"
              />
            </div>
          </div>
        </div>
      </div>
    </AppMain>
    <Teleport to="body">
      <PopupCompanyRegistration
          name="Company Registration"
          v-model="showPopup"
          ref="invitePopup"
          @close-popup="showPopup=flase"
      />
      <AppPopup
          v-model="showCompanyPop"
          name="Employees Information"
          @afterClose="getCompanyListData(false, json_query.offset)"
      >
        <PopupCompanyInformation
            ref="companyPop"
            v-model="selectCompany" />
      </AppPopup>
    </Teleport>
  </div>

</template>
