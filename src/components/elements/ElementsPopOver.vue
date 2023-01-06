<template>
	<div class="inline-block ">
		<Popover v-slot="{ open }" class="relative">
			<PopoverButton
				:class="open ? '' : 'text-opacity-90'"
				class="group items-center rounded-full  bg-white"
			>
				<EmojiSadIcon
					:class="open ? '' : 'text-opacity-70'"
					class="h-5 w-5 text-gray-800 transition duration-150 ease-in-out group-hover:text-opacity-80"
					aria-hidden="true"
				/>
			</PopoverButton>
			<transition
					enter-active-class="transition duration-200 ease-out"
					enter-from-class="translate-y-1 opacity-0"
					enter-to-class="translate-y-0 opacity-100"
					leave-active-class="transition duration-150 ease-in"
					leave-from-class="translate-y-0 opacity-100"
					leave-to-class="translate-y-1 opacity-0"
			>
				<PopoverPanel
					class="absolute left-0 top-5 z-10 mt-3 w-screen max-w-sm transform sm:px-0"
				>
					<div
						class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
					>
						<div class="bg-gray-50 p-4">
							<slot/>
						</div>
					</div>
				</PopoverPanel>
			</transition>
		</Popover>
	</div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { EmojiSadIcon } from '@heroicons/vue/outline'

export default {
		components : {
			Popover, PopoverButton, PopoverPanel, EmojiSadIcon
		},
		props : {
		},
		data(){
			return {
			}
		}
	}
</script>