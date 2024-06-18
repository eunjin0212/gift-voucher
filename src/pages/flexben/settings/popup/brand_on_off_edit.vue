<template>
    <div v-show="modelValue" class="fixed top-0 w-full h-full bg-black/50 z-20 flex justify-center items-center">
        <div class="border rounded-lg shadow shadow-gray-100 bg-white min-w-[70vh]">
            <div class="px-7 pt-6 flex justify-between items-center">
                <h2 class="text-xl font-bold">Brand on/off</h2>
                <a href="javascript:void(0)" class="ml-20" @click="hidePopup">
                    <img src="@/assets/img/app-popup-1.svg" alt="app-popup-1" />
                </a>
            </div>
            <div class="h-[70vh]">
                <div class="h-full flex flex-col">
                    <div class="flex justify-start gap-2 px-7 py-2 items-baseline">
                        <ElementsInput v-model="searchText" placeholder="Search the Brand" :height11="true" />
                        <ElementsButton text="Search" :fitContent="true" :fitHeight="true" @click-event="searchBrandListByName" />
                    </div>
                    <div class="overflow-auto">
                        <table class="min-w-full divide-y divide-gray-300">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="whitespace-no-wrap px-3 py-3.5 text-center text-sm text-gray-900 sm:pl-10">No.</th>
                                    <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900">Brand Name</th>
                                    <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900">On / Off</th>
                                    <th scope="col" class="whitespace-pre-wrap px-3 py-3.5 text-center text-sm text-gray-900 w-2/12"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="(brand, index) in searched_brand_list" :key="index">
                                    <td class="whitespace-pre-wrap px-3 py-4 text-center text-sm text-gray-900 sm:pl-10">{{ index + 1 }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">{{ brand.brandName }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-900">
                                        <div
                                            :class="[
                                                brand_off_list.includes(brand.flexbenBrandSeq) ? 'bg-gray-200' : 'bg-indigo-600',
                                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                                            ]">
                                            <input
                                                :disabled="!$appUtil.checkPermission('FLEXBEN_SETTING_EDIT')"
                                                :value="brand.flexbenBrandSeq"
                                                v-model="brand_off_list"
                                                type="checkbox"
                                                class="cursor-pointer opacity-0 absolute w-full h-full peer appearance-none rounded-md" />
                                            <span
                                                :class="[
                                                    brand_off_list.includes(brand.flexbenBrandSeq) ? 'translate-x-5' : 'translate-x-0',
                                                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                                ]">
                                                <span
                                                    :class="[
                                                        brand_off_list.includes(brand.flexbenBrandSeq) ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200',
                                                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                                                    ]"
                                                    aria-hidden="true">
                                                    <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                                        <path
                                                            d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                                    </svg>
                                                </span>
                                                <span
                                                    :class="[
                                                        brand_off_list.includes(brand.flexbenBrandSeq) ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100',
                                                        'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
                                                    ]"
                                                    aria-hidden="true">
                                                    <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                                        <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap text-sm text-gray-900 w-2/12"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="w-full h-px bg-gray-200"></div>
            <div class="px-4 py-6 flex justify-end" v-if="$appUtil.checkPermission('FLEXBEN_SETTING_EDIT')">
                <ElementsButton text="Cancel" :width28="true" :height12="true" :background-white="true" @click-event="hidePopup" />
                <ElementsButton class="ml-2" :text="'Change'" :width28="true" :height12="true" @click-event="$emit('buttonEvent')" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    emits: ['update:modelValue', 'afterClose', 'buttonEvent'],
    props: {
        brandList: Array,
        modelValue: Boolean,
    },
    watch: {
        modelValue(isOpen) {
            const self = this;
            if (!isOpen) {
                return;
            }
            self.searchText = '';
            self.searched_brand_list = self.brandList;
        },
    },
    data() {
        return {
            brand_off_list: [],
            searched_brand_list: [],
            searchText: '',
        };
    },
    methods: {
        hidePopup() {
            const self = this;
            self.$emit('update:modelValue', false);
        },
        searchBrandListByName() {
            const self = this;
            self.searched_brand_list = self.brandList.filter((brand) => {
                return brand.brandName.toUpperCase().includes(self.searchText.toUpperCase());
            });
        },
    },
};
</script>
