<script>
import AppAside from "@/components/AppAside.vue";
import AppMain from "@/components/main/AppMain.vue";

export default {
	components: {
		AppAside,
		AppMain
	},
	mounted() {
	},
	data(){
		return {
			items : ["Settings", "Admin Setting"],
			showSubMenu : {
				outOnBusiness: false,
    			businessTrip: false,
    			remoteWork: false,
			},
			memberValue : "ALL",
			memberOption : [
				{
					text: "IT",
					value: "IT",
				},
				{
					text: "Service",
					value: "Service",
				}
			],
			showAddWorkPolicy : false,
			showAddAuth : false,
			rateType : "single"
		}
	},
	methods: {
		openAddWorkPolicy() {
			const self = this;
			self.showAddWorkPolicy = true;
		},
		openAddAuth() {
			const self = this;
		    self.showAddAuth = true;
		}
	}
}
</script>


<template>
  <div id="app" class="min-w-[1024px] min-h-[100vh] flex">
    <AppAside />
    <AppMain :items="items">
      <p class="text-[16px] text-[#7C8493] pt-[10px]">
        You can add/remove administrators or change super administrators.
        <br />
        Please be aware of the settings as you will be accessing important
        company information.
      </p>
      <div class="overtime-policy flex w-full max-w-7xl">
        <section
          class="content w-[30%] pt-[20px] px-[31px] pb-[37px] bg-white mt-[23px] rounded-[10px] border-gray-300 border-[1px]"
        >
          <p class="font-bold text-[14px] text-[#586371]">기본 권한 그룹</p>
          <ul class="mt-[8px] w-full">
            <li
              class="active rounded-lg py-[12px] px-[20px] border-gray-300 flex justify-between bg-[#F8F8FD]"
            >
              <p class="font-bold text-[16px] text-[#4031B8]">
                Super Administrator
              </p>
              <p class="font-bold text-[16px] text-[#4031B8]">0</p>
            </li>
            <li
              class="rounded-lg py-[12px] px-[20px] bg-white border-gray-300 flex justify-between mt-[10px]"
            >
              <p>Administrator</p>
              <p>0</p>
            </li>
          </ul>

          <p class="font-bold text-[14px] text-[#586371] mt-[40px]">
            커스텀 권한 그룹
          </p>
          <ul class="mt-[8px] w-full">
            <li
              class="active rounded-lg py-[12px] px-[20px] border-gray-300 flex justify-between bg-[#F8F8FD]"
            >
              <p class="font-bold text-[16px] text-[#4031B8]">
                Super Administrator
              </p>
              <div>
                <button
                  @click="
                    showSubMenu.outOnBusiness = !showSubMenu.outOnBusiness
                  "
                  class="dots h-[16px] relative"
                >
                  <img src="@/assets/img/dots.png" alt="" class="w-[16px]" />
                  <ul
                    v-show="showSubMenu.outOnBusiness"
                    class="shadow-md dots_list w-[235px] absolute top-[13px] right-[0px] border-gray-300 border-[1px] rounded bg-white"
                  >
                    <li
                      class="py-[20px] px-[50px] border-b-[1px] border-gray-300"
                    >
                      Edit
                    </li>
                    <li class="py-[20px] px-[50px]">Delete</li>
                  </ul>
                </button>
              </div>
            </li>
          </ul>

          <button
            @click="openAddWorkPolicy"
            class="active rounded-lg w-full py-[12px] bg-white border-gray-300 border-[1px] mt-[40px] border-dotted border-2"
          >
            + 추가하기
          </button>
        </section>
        <section
          class="content w-[70%] ml-5 pt-[20px] px-[31px] pb-[37px] bg-white mt-[23px] rounded-[10px] border-gray-300 border-[1px]"
        >
          <div class="mt-3.5 border-gray-300 border-[1px] rounded-[10px]">
            <div class="flex justify-between p-[12px] border-b-[1px]">
              <h3 class="font-bold text-[18px]">
                ‘총무부 전용 권한’ 권한 대상(1)
              </h3>
              <button
                @click="openAddAuth"
                class="active flex rounded-lg border-gray-300 border-[1px] w-[150px] h-[32px] bg-[#fff] text-sm p-[2px]"
              >
                <span class="leading-[32px] pr-[1px] ml-[5px]"
                  >권한 대상 설정하기</span
                >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mt-[3px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </div>
            <div
              class="p-[12px] bg-[#FDFDFD] flex justify-between rounded-[10px]"
            >
              <div class="flex items-center">
                <div
                  class="capital bg-[#428ADF] flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px]"
                >
                  B
                </div>
                <div class="ml-[10px]">
                  <div class="text-[14px] font-bold text-left">Ben</div>
                  <div class="subject text-[14px] font-normal">Developer</div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3.5 border-gray-300 border-[1px] rounded-[10px]">
            <div class="flex justify-between p-[12px] border-b-[1px]">
              <h3 class="font-bold text-[18px]">다른 구성원 정보 접근 권한</h3>
              <button
                class="rounded-lg w-[86px] h-[33px] leading-[33px] bg-[#4031B8] text-[#fff] text-[12px]"
              >
                저장하기
              </button>
            </div>

            <div
              class="border-b flex items-center h-12 text-xs font-medium p-[12px] bg-[#FDFDFD]"
            >
              <div class="w-[20%] text-left">Job Info</div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">조회</span>
                </label>
              </div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">편집</span>
                </label>
              </div>
            </div>
            <div
              class="border-b flex items-center h-12 text-xs font-medium p-[12px] bg-[#FDFDFD]"
            >
              <div class="w-[20%] text-left">Basic Info</div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">조회</span>
                </label>
              </div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">편집</span>
                </label>
              </div>
            </div>
            <div
              class="border-b flex items-center h-12 text-xs font-medium p-[12px] bg-[#FDFDFD] rounded-[10px]"
            >
              <div class="w-[20%] text-left">Education</div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">조회</span>
                </label>
              </div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">편집</span>
                </label>
              </div>
            </div>
            <div
              class="border-b flex items-center h-12 text-xs font-medium p-[12px] bg-[#FDFDFD] rounded-[10px]"
            >
              <div class="w-[20%] text-left">Career / Qualification</div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">조회</span>
                </label>
              </div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">편집</span>
                </label>
              </div>
            </div>
            <div
              class="border-b flex items-center h-12 text-xs font-medium p-[12px] bg-[#FDFDFD] rounded-[10px]"
            >
              <div class="w-[20%] text-left">Attendance info</div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">조회</span>
                </label>
              </div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">편집</span>
                </label>
              </div>
            </div>
            <div
              class="border-b flex items-center h-12 text-xs font-medium p-[12px] bg-[#FDFDFD] rounded-[10px]"
            >
              <div class="w-[20%] text-left">Leave info</div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">조회</span>
                </label>
              </div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">편집</span>
                </label>
              </div>
            </div>
            <div
              class="flex items-center h-12 text-xs font-medium p-[12px] bg-[#FDFDFD] rounded-[10px]"
            >
              <div class="w-[20%] text-left">Salary info</div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">조회</span>
                </label>
              </div>
              <div class="flex-1 text-left">
                <label>
                  <input
                    type="checkbox"
                    class="mr-1 relative top-1 w-[18px] h-[18px]"
                  />
                  <span class="text-[#7B7E81] text-[13px]">편집</span>
                </label>
              </div>
            </div>
          </div>
          <div class="mt-3.5 border-gray-300 border-[1px] rounded-[10px]">
            <div class="flex justify-between p-[12px] border-b-[1px]">
              <h3 class="font-bold text-[18px]">기능별 권한</h3>
              <button
                class="rounded-lg w-[86px] h-[33px] leading-[33px] bg-[#4031B8] text-[#fff] text-[12px]"
              >
                저장하기
              </button>
            </div>
            <div class="bg-[#FDFDFD] rounded-[10px]">
              <div
                class="border-b items-center h-94 text-xs font-medium p-[12px]"
              >
                <div class="flex">
                  <div class="w-[20%] text-left">Dashboard</div>
                  <div class="w-[80%] flex flex-wrap">
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >공지사항 작성</span
                        >
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >공지사항 관리</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-b items-center h-94 text-xs font-medium p-[12px]"
              >
                <div class="flex">
                  <div class="w-[20%] text-left">Attendance</div>
                  <div class="w-[80%] flex flex-wrap">
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]">조회</span>
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >출,퇴근 기록 수정</span
                        >
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >근무수정</span
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-b items-center h-94 text-xs font-medium p-[12px]"
              >
                <div class="flex">
                  <div class="w-[20%] text-left">Leave</div>
                  <div class="w-[80%] flex flex-wrap">
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]">조회</span>
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >휴가 부 및 관리</span
                        >
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >휴가 설정</span
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-b items-center h-94 text-xs font-medium p-[12px]"
              >
                <div class="flex">
                  <div class="w-[20%] text-left">Approval</div>
                  <div class="w-[80%] flex flex-wrap">
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]">조회</span>
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >승인자 설정</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-b items-center h-94 text-xs font-medium p-[12px] rounded-[10px]"
              >
                <div class="flex">
                  <div class="w-[20%] text-left">Team</div>
                  <div class="w-[80%] flex flex-wrap">
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]">조회</span>
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >직원 등록 하기</span
                        >
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >조직도, 직급 설정</span
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-b items-center h-94 text-xs font-medium p-[12px] rounded-[10px]"
              >
                <div class="flex">
                  <div class="w-[20%] text-left">Flexben</div>
                  <div class="w-[80%] flex flex-wrap">
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]">조회</span>
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >Transfer / Deduct
                        </span>
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >Flexben 설정</span
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-b items-center h-94 text-xs font-medium p-[12px] rounded-[10px]"
              >
                <div class="flex">
                  <div class="w-[20%] text-left">Payslip</div>
                  <div class="w-[80%] flex flex-wrap">
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]">조회</span>
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >급여 정산</span
                        >
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >정산 템플릿 설정</span
                          >
                        </label>
                      </div>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >급여 정산 설정</span
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-b items-center h-94 text-xs font-medium p-[12px] rounded-[10px]"
              >
                <div class="flex">
                  <div class="w-[20%] text-left">Filing</div>
                  <div class="w-[80%] flex flex-wrap">
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]">조회</span>
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >품의 추가 및 수정</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="border-b items-center h-94 text-xs font-medium p-[12px] rounded-[10px]"
              >
                <div class="flex">
                  <div class="w-[20%] text-left">Settings</div>
                  <div class="w-[80%] flex flex-wrap">
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]">조회</span>
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <label>
                        <input
                          type="checkbox"
                          class="mr-1 relative top-1 w-[18px] h-[18px]"
                        />
                        <span class="text-[#7B7E81] text-[13px]"
                          >회사 정보 수정</span
                        >
                      </label>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >Work Schedule 수정</span
                          >
                        </label>
                      </div>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >Work Place 수정</span
                          >
                        </label>
                      </div>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >Day off 수정</span
                          >
                        </label>
                      </div>
                    </div>
                    <div class="w-[50%] text-left">
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            class="mr-1 relative top-1 w-[18px] h-[18px]"
                          />
                          <span class="text-[#7B7E81] text-[13px]"
                            >Admin Setting 수정</span
                          >
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppMain>
    <Teleport to="body">
      <AppPopup v-model="showAddAuth" name="그룹 추가" button-text="Add">
        <div class="w-[963px]">
          <div class="flex w-[963px] h-[899px]">
            <div class="w-[379px] border-gray-300 border-r-[1px]">
              <div class="p-[24px]">
                <ElementsSelect
                  v-model="memberValue"
                  :options="memberOption"
                  :full="true"
                  class="mt-[16px] h-[48px] rounded"
                />
                <input
                  type="text"
                  placeholder="검색"
                  class="border-gray-300 border-[1px] rounded w-[280px] mr-[10px] w-[331px] h-[48px] mt-[16px] pl-[24px]"
                />
              </div>

              <div
                class="title text-[#9CA2AB] font-medium text-[14px] border-gray-300 border-b-[1px] px-[28px]"
              >
                모든 구성원
              </div>
              <ul>
                <li
                  class="flex items-center py-[8px] px-[31px] border-gray-300 border-b-[1px]"
                >
                  <div
                    class="capital bg-[#FF7777] flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px]"
                  >
                    H
                  </div>
                  <div class="ml-[10px]">
                    <div class="name">Henry</div>
                    <div class="subject">Finance</div>
                  </div>
                </li>
                <li
                  class="flex justify-between items-center py-[8px] px-[31px] border-gray-300 border-b-[1px]"
                >
                  <div class="flex items-center justify-center">
                    <div
                      class="capital bg-[#428ADF] flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px]"
                    >
                      B
                    </div>
                    <div class="ml-[10px]">
                      <div class="name text-[14px] font-bold">Ben</div>
                      <div class="subject text-[14px] font-normal">
                        Developer
                      </div>
                    </div>
                  </div>

                  <div class="text-[#4031B8]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                </li>
                <li class="flex items-center py-[8px] px-[31px] border-b-[1px]">
                  <div
                    class="capital bg-[#FF7777] flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px]"
                  >
                    K
                  </div>
                  <div class="ml-[10px]">
                    <div class="name text-[14px] font-bold">Kelly</div>
                    <div class="subject text-[14px] font-normal">Finance</div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="employees_container mt-[15px] p-[24px]">
              <div
                class="p-[24px] w-[528px] h-[289px] border-gray-300 rounded-[10px] border-[1px] text-center flex-col items-center"
              >
                <p class="text-[#A8AAAC] text-[12px] mt-[90px] ml-[240px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 text-center"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </p>
                <p class="text-[#A8AAAC] text-[12px] mt-[10px]">
                  이름, 직무, 직위, 직책, 조직이름 등
                  <br />
                  다양한 키워드로 검색할 수 있습니다.
                </p>
              </div>
              <div
                class="p-[24px] mt-[20px] w-[528px] h-[289px] border-gray-300 rounded-[10px] border-[1px] text-center flex-col items-center"
              >
                <div class="flex justify-between">
                  <p class="text-[12px]">선택됨(1)</p>
                  <p class="text-[#F40009] text-[12px]">모두삭제</p>
                </div>
                <div class="flex justify-between mt-[26px]">
                  <div class="flex items-center">
                    <div
                      class="capital bg-[#428ADF] flex items-center justify-center w-[54px] h-[54px] rounded-[40px] text-white text-[26px]"
                    >
                      B
                    </div>
                    <div class="ml-[10px]">
                      <div class="text-[14px] font-bold text-left">Ben</div>
                      <div class="subject text-[14px] font-normal">
                        Developer
                      </div>
                    </div>
                  </div>
                  <p class="text-[#8F969] text-[12px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppPopup>
    </Teleport>
    <Teleport to="body">
      <AppPopup v-model="showAddWorkPolicy" name="그룹 추가" button-text="Add">
        <div class="add-work-policy-popup w-[644px] py-[28px] px-[27px]">
          <p class="text-[#504F54] text-[14px] font-bold mb-[14px]">그룹명</p>
          <input
            class="mb-[26px] border-gray-300 border-[1px] rounded-[8px] py-[11px] px-[21px] w-full"
            type="text"
            placeholder="Enter work name"
          />
        </div>
      </AppPopup>
    </Teleport>
  </div>
</template>
