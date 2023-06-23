<template>

    <div>
        <div class="flex flex-col mt-5 px-6 py-3 w-[50vw] bg-white shadow-md shadow-gray-200">
            <div class="mt-4 text-indigo-900 font-semibold text-xl"> Menu Settings</div>
            <div class="mt-4 border-t border-gray-100">
                <dl class="divide-y divide-gray-100">
                    <div class="px-0 py-3 grid grid-cols-3 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900 col-span-1">
                            Attendance / Leave / FlexBen
                        </dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 col-span-2 place-self-end font-semibold">
                            Default
                        </dd>
                    </div>
                    <div class="px-0 py-3 grid grid-cols-3 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900 col-span-1">
                            Filing
                        </dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 col-span-2 place-self-end font-semibold">
                            <ElementsToggle
                                :trueValue="'ACTIVE'"
                                :falseValue="'DEACTIVE'"
                                v-model="selected"
                            />
                        </dd>
                    </div>
                    <div class="px-0 py-3 grid grid-cols-3 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900 col-span-1">
                            Payroll
                        </dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 col-span-2 place-self-end font-semibold">
                            <ElementsToggle
                                :trueValue="'ACTIVE'"
                                :falseValue="'DEACTIVE'"
                                v-model="selected"
                            />
                        </dd>
                    </div>
                    <div class="px-0 py-3 grid grid-cols-3 gap-4 ">
                        <dt class="text-sm font-medium leading-6 text-gray-900 col-span-1">
                            KPI
                        </dt>
                        <dd class="mt-1 text-sm leading-6 text-gray-700 col-span-2 place-self-end font-semibold">
                            <ElementsToggle
                                :trueValue="'ACTIVE'"
                                :falseValue="'DEACTIVE'"
                                v-model="selected"
                            />
                        </dd>
                    </div>
                    <div class="px-0 pt-9 pb-3 grid grid-cols-3 gap-4 ">
                        <ElementsButton
                            class="col-span-3 place-self-end"
                            :text="'Save'"
                            :width60="true"
                        />
                    </div>
                </dl>
            </div>
        </div>

        <div class="flex flex-col gap-4 mt-5 px-6 py-3 w-[50vw] bg-white shadow-md shadow-gray-200">
            <div class="text-indigo-900 font-semibold text-xl pt-3"> Accounts Settings</div>
            <p class="text-xs text-zinc-500"> If you stop using the service, only the administrator can log in,
                and other employees cannot log in.
            </p>
            <ElementsSelect
                class=""
            />
            <ElementsDate
                class=""
            />
            <ElementsButton
                class="col-span-3 place-self-end pt-4"
                :text="'Save'"
                :width60="true"
            />
        </div>


    </div>
</template>

<script>


export default{
    data(){
        return {
            selected : "ACTIVE"
        }
    }
}

</script>