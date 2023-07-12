<template>
    <div>
        <div class="flex flex-col py-3">
            <h1 class="text-zinc-800 text-xl font-semibold leading-10 items-center ">
                HRnFLEX System Maintenance
            </h1>
            <div class="flex gap-2 pt-3 ">
                <ElementsSelect
                    :useDefaultMsg="true"
                    :width40="true"
                    :options="serverOptions"
                    :defaultMsg="'Type'"
                    v-model="searchOption.server"
                />
                <ElementsSelect
                    :useDefaultMsg="true"
                    :width40="true"
                    :options="firstDepthOptions"
                    :defaultMsg="'1st Category'"
                    v-model="searchOption.firstDepth"
                    :readonly="!searchOption.server"
                />
                <ElementsSelect
                    v-if="searchOption.server === 'COMPANY'"
                    :width40="true"
                    :options="secondDepthOptions"
                    :defaultMsg="'2nd Category'"
                    v-model="searchOption.secondDepth"
                    :readonly="! searchOption.firstDepth"
                />
                <ElementsButton
                    class="pt-1"
                    :width24="true"
                    :fitHeight="true"
                    :text="'Search'"
                    @click-event="getMaintenanceResult( maintenanceList )"
                />
            </div>
            <div class="mt-6 overflow-auto pb-[20vh] md:rounded-lg  ">
                <table class="divide-y divide-gray-300 w-full shadow border-[1px] border-black border-opacity-10">
                    <thead class="bg-[#F8F8FD] ">
                        <tr>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Type</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">Page</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">1st <br/> Category</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900">2nd <br/> Category</th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900"> Type Name </th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900"> Status </th>
                            <th scope="col" class="px-3 py-3.5 text-center text-sm text-gray-900"> <span class="sr-only"> Edit </span> </th>
                        </tr>
                    </thead>
                    <tbody class=" bg-white">
                        <tr v-for="( maintenance , index) in searchResultList" v-bind:key="index"
                            :class="{ 'bg-[#F8F8FD]': (index % 2 !== 0) }"
                        >
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">
                                {{ convertFirstUpper(maintenance.maintenanceType) }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900">
                                {{ convertFirstUpper(maintenance.server) }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-900"> {{ maintenance.depthOneCategory }} </td>
                            <td class="whitespace-normal px-3 py-4 text-sm text-center text-gray-900"> {{ maintenance.depthTwoCategory || '-' }} </td>
                            <td class="whitespace-normal px-3 py-4 text-sm text-center text-gray-900"> {{ maintenance.maintenanceTitle }}</td>
                            <td class="whitespace-normal px-3 py-4 text-sm text-center text-gray-900">
                                <span v-if="maintenance.maintenanceUseYn === 'Y'"> Enable </span>
                                <span v-if="maintenance.maintenanceUseYn === 'N'"> Disabled </span>
                            </td>
                            <td class="whitespace-nowrap  text-sm text-gray-900 pr-3">
                                <Menu as="div" class="relative inline-block text-left"
                                >
                                    <div>
                                        <MenuButton class="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                            <span class="sr-only">Open options</span>
                                            <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                                        </MenuButton>
                                    </div>

                                    <transition
                                        enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95"
                                    >
                                        <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div class="py-1">
                                                <MenuItem v-slot="{ active }" @click="clickEditButton(maintenance)">
                                                    <div :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                                        Edit
                                                    </div>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </transition>
                                </Menu>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Teleport to="body">
            <MaintenancePopup
                v-model="editPopup.isOpen"
                :maintenanceInfo="editPopup.data"
                @submit="submitEditMaintenanceInfo"
            />
        </Teleport>
    </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { DotsVerticalIcon  } from '@heroicons/vue/solid'
import MaintenancePopup from './maintenance_popup.vue'

export default{
    components : {
        Menu, MenuButton, MenuItem, MenuItems, DotsVerticalIcon,
        MaintenancePopup
    },
    data(){
        return{
            editPopup : {
                isOpen : false,
                data : {},
            },
            maintenanceList : [],
            searchResultList : [],
            serverOptions : [
                { text : "Company", value : "COMPANY" },
                { text : "Employee", value : "EMPLOYEE" },
            ],
            firstDepthByServer : {},
            secondDepthByFirst : {},
            firstDepthOptions : [],
            secondDepthOptions : [],
            searchOption : {
                server : "",
                firstDepth : "",
                secondDepth : "",
            }
        }
    },
    watch : {
        'searchOption.server'(newVal){
            const self = this;
            self.searchOption.firstDepth = null;
            self.searchOption.secondDepth = null;

            if( newVal == null ){
                return;
            }

            const option = self.firstDepthByServer[newVal].map( m => ({ text : m, value: m }))
            self.firstDepthOptions = option;
        },
        'searchOption.firstDepth'(newVal){
            const self = this;
            self.searchOption.secondDepth = null;

            if( self.searchOption.server === 'EMPLOYEE' ) {
                return;
            }

            const option = (self.secondDepthByFirst[newVal] || []).map( m => ({ text : m, value: m }))
            if( option.length == 0 ) {
                option.push( { text : "No 2nd Category", value : null } )
            }

            self.secondDepthOptions = option;
        }
    },
    methods: {
        clickEditButton( item ){
            const self = this;
            self.editPopup.isOpen = true;
            self.editPopup.data = item;
        },
        convertFirstUpper( upperString ){
            if( ! upperString ) return "";
            let words = upperString.toLowerCase().split("_");
            let fistUpper = words.map( word => word[0].toUpperCase() + word.slice(1) );

            return fistUpper.join(' ');
        },
        getCategoryOptions( list ){
            const self = this;

            self.firstDepthByServer = list.reduce( ( acc, maintenance ) => {
                const { server, depthOneCategory } = maintenance;

                if( ! acc[server].includes( depthOneCategory) ){
                    acc[ server ].push( depthOneCategory );
                }
                return acc;
            }, { COMPANY : [], EMPLOYEE : [] })

            self.secondDepthByFirst = list.reduce( ( acc, item ) => {
                const { server, depthOneCategory, depthTwoCategory } = item;

                if( server === 'EMPLOYEE') return acc;

                // eslint-disable-next-line no-prototype-builtins
                if( ! acc.hasOwnProperty( depthOneCategory ) ){
                    acc[ depthOneCategory ] = [];
                }

                if( depthTwoCategory !== null ){
                    acc[ depthOneCategory ].push(depthTwoCategory);
                }

                return acc;
            }, { } );
        },
        getMaintenanceResult( list ){
            const self = this;

            const { server, firstDepth, secondDepth } = self.searchOption;
            self.searchResultList = list.filter( m => {
                let isMatch = true;
                if( server && m.server !== server ){
                    isMatch = false;
                }

                if( firstDepth && m.depthOneCategory !== firstDepth ){
                    isMatch = false;
                }

                if( secondDepth && m.depthTwoCategory !== secondDepth ){
                    isMatch = false;
                }

                return isMatch;
            })

        },
        getMaintenanceList( isInit = false ){
            const self = this;
            const url = self.$api("uri", "get-system-maintenance-list");

            self.$axios.get( url )
                .then( res => {
                    const list = res.data.data.list;
                    self.maintenanceList = list.map( m => ( {...m} ));
                    self.getMaintenanceResult( list );
                    if( isInit ){
                        self.getCategoryOptions( list );
                    }
                })
                .catch( err => {
                    console.error( err );
                })
        },
        submitEditMaintenanceInfo( maintenanceSeq, editData ){
            const self = this;

            const url = self.$api("uri", "put-system-maintenance-info")
                            .replace('{systemMaintenanceSeq}', maintenanceSeq);

            self.$axios.put( url , editData )
                .then( res => {
                    alert( "Success Update ");
                    self.getMaintenanceList();
                })
                .catch( err =>{
                    console.error( err );
                    alert("err", err )
                })
        }
    },
    mounted(){
        const self = this;
        self.getMaintenanceList( true );
    }
}
</script>
