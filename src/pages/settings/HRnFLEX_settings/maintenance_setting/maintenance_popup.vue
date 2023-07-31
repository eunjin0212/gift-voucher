<template>
    <div
        v-show="modelValue"
        class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center"
    >
        <form @submit.prevent="clickSubmitButton"
            id="hrAdminForm"
            class="border rounded-lg shadow shadow-gray-100 bg-white min-w-[70vh]"
        >
            <div class="px-7 py-6 flex justify-between items-center ">
                <h2 class="text-xl font-bold">
                    Type Edit
                </h2>
                <a
                    href="javascript:void(0)"
                    class="ml-20"
                    @click="hidePopup"
                >
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                </a>
            </div>

            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="py-4">
                    <div class="py-2 grid grid-cols-3 gap-4 px-6 items-baseline">
                        <dt class="text-sm font-medium text-gray-500">Type Name</dt>
                        <dd class="mt-1 text-sm text-gray-900 col-span-2 flex justify-between">
                            <ElementsInput
                                v-model.trim="editMaintenanceInfo.maintenanceTitle"
                                :maxNumber="200"
                            />
                        </dd>
                    </div>
                    <div class="py-2 grid grid-cols-3 gap-4 px-6 items-baseline">
                        <dt class="text-sm font-medium text-gray-500"> Type </dt>
                        <dd class="mt-1 text-sm text-gray-900 col-span-2 flex justify-between">
                            <ElementsSelect
                                :options="maintenanceTypeOptions"
                                v-model="editMaintenanceInfo.maintenanceType"
                            />
                        </dd>
                    </div>
                    <div class="py-2 grid grid-cols-3 gap-4 px-6 items-baseline">
                        <dt class="text-sm font-medium text-gray-500"> Page </dt>
                        <dd class="mt-1 text-sm text-gray-900 col-span-2 flex justify-between">
                            <div class="shadow-sm py-2 px-3 block w-full sm:text-sm border-[1px] border-gray-300 rounded-md bg-gray-50">
                                <span v-if="maintenanceInfo.server=='COMPANY'"> Company </span>
                                <span v-else-if="maintenanceInfo.server=='EMPLOYEE'"> Employee </span>
                            </div>
                        </dd>
                    </div>
                    <div class="py-2 grid grid-cols-3 gap-4 px-6 items-baseline">
                        <dt class="text-sm font-medium text-gray-500"> 1st Category </dt>
                        <dd class="mt-1 text-sm text-gray-900 col-span-2 flex justify-between">
                            <div class="shadow-sm py-2 px-3 block w-full sm:text-sm border-[1px] border-gray-300 rounded-md bg-gray-50">
                                {{ maintenanceInfo.depthOneCategory }}
                            </div>
                        </dd>
                    </div>
                    <div class="py-2 grid grid-cols-3 gap-4 px-6 items-baseline" v-if="maintenanceInfo.depthTwoCategory">
                        <dt class="text-sm font-medium text-gray-500"> 2nd Category </dt>
                        <dd class="mt-1 text-sm text-gray-900 col-span-2 flex justify-between">
                            <div class="shadow-sm py-2 px-3 block w-full sm:text-sm border-[1px] border-gray-300 rounded-md bg-gray-50">
                                {{ maintenanceInfo.depthTwoCategory }}
                            </div>
                        </dd>
                    </div>
                    <div class="py-2 grid grid-cols-3 gap-4 px-6 items-baseline">
                        <dt class="text-sm font-medium text-gray-500"> Contents </dt>
                        <dd class="mt-1 text-sm text-gray-900 col-span-2 flex justify-between">
                            <textarea
                                rows="7"
                                class="mt-1 shadow-sm block w-full sm:text-sm border-gray-300 rounded-md resize-none"
                                :maxlength="200"
                                v-model.trim="editMaintenanceInfo.maintenanceContents"
                            ></textarea>
                        </dd>
                    </div>
                    <div class="py-2 grid grid-cols-3 gap-4 px-6 items-baseline">
                        <dt class="text-sm font-medium text-gray-500"> Status </dt>
                        <dd class="mt-1 text-sm text-gray-900 col-span-2 flex gap-6">
                            <div class="flex items-center">
                                <input id=""  type="radio" :value="'Y'" v-model="editMaintenanceInfo.maintenanceUseYn"
                                    name="maintenanceUseYn"
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label for="" class="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                    Using Maintenance
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input id=""  type="radio" :value="'N'" v-model="editMaintenanceInfo.maintenanceUseYn"
                                    name="maintenanceUseYn"
                                    class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label for="" class="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                    Using Service
                                </label>
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>

            <div class="w-full h-px bg-gray-200"></div>
            <div class="px-4 py-6 flex justify-end"
            >
                <ElementsButton
                    text="Cancel"
                    :width28="true"
                    :height12="true"
                    :background-white="true"
                    @click-event="hidePopup"
                />
                <ElementsButton
                    class="ml-2"
                    :inputtype="'submit'"
                    :text="'Save'"
                    :width28="true"
                    :height12="true"
                />
            </div>
        </form>
    </div>
</template>

<script>

export default{
    props : {
        modelValue : Boolean,
        maintenanceInfo : {
            type : Object,
            default : function() {
                return {}
            }
        }
    },
    emits : [ 'update:modelValue', 'submit'],
    data(){
        return {
            editMaintenanceInfo : {},
            maintenanceTypeOptions : [
                { text : 'Site Block', value : 'SITE_BLOCK'}
            ],
        }
    },
    watch : {
        modelValue( newValue ){
            if( ! newValue ){
                return;
            }
            const self = this;
            const { maintenanceType, maintenanceTitle, maintenanceContents, maintenanceUseYn  } = self.maintenanceInfo;

            self.editMaintenanceInfo = { maintenanceType
                                        , maintenanceTitle
                                        , maintenanceContents
                                        , maintenanceUseYn };

        }
    },
    methods : {
        clickSubmitButton(){
            const self = this;
            const { systemMaintenanceSeq } = self.maintenanceInfo;
            self.$emit('submit', systemMaintenanceSeq, self.editMaintenanceInfo );
            self.hidePopup();
        },
        hidePopup() {
            const self = this;
            self.$emit('update:modelValue', false)
        },
    }

}
</script>