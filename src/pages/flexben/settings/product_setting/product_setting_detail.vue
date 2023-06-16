<template>
    <div class="mt-8 p-3 rounded-lg w-full max-w-7xl bg-white shadow-md shadow-gray-200 flex flex-col">
        <div class="font-semibold text-base"> Product Information </div>
        <div class="grid grid-cols-4">

            <div class="col-span-1">


            </div>
            <div class="col-span-3 flex flex-col">
                <div class="space-y-12">
                    <div class="pb-6">
                        <div class="pt-3">
                            <h2 class="text-sm leading-6 text-gray-600 font-semibold">Product Name </h2>
                            <p class="mt-1 text-sm leading-6 text-gray-600 border-gray-400 border-[1px] rounded-md py-2 px-4 mr-5">
                                P500 Top-up Voucher
                            </p>
                        </div>


                        <h2 class="pt-3 text-sm leading-6 text-gray-600 font-semibold">Product Code </h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600 border-gray-400 border-[1px] rounded-md py-2 px-4 mr-5">
                            G0000000106592
                        </p>

                        <h2 class="pt-3 text-sm leading-6 text-gray-600 font-semibold">Status </h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600 border-gray-400 border-[1px] rounded-md py-2 px-4 mr-5">
                            On Sale
                        </p>


                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="col-span-full">
                                <label for="about" class="block text-sm text-gray-600 font-semibold leading-6">Product Description</label>
                                <div class="mt-2 mr-5 ">
                                    <textarea id="about" name="about" rows="20"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-4 pt-5 ">
                            <h2 class="text-sm leading-6 text-gray-600 font-semibold">FlexBen Display </h2>
                            <div
                                :class="[true? 'bg-gray-200' : 'bg-indigo-600', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                                <input
                                    type="checkbox" class="cursor-pointer opacity-0 absolute w-full h-full peer appearance-none rounded-md"
                                />
                                <span :class="[true ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
                                    <span :class="[true ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                        <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                        </svg>
                                    </span>
                                    <span :class="[true ? 'opacity-100 ease-in duration-200' : 'opacity-0 ease-out duration-100', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']" aria-hidden="true">
                                        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                            <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="self-end pb-5 pr-5">
            <ElementsButton
                :width32="true"
                :text="'Save'"
            />
        </div>
    </div>
</template>

<script>

export default{

}

</script>