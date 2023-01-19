<template>
    <form 
        form method="POST" action="submit" @submit.prevent="sendingInviteEmail"
        class="p-4 grid grid-cols-4 items-center gap-3"
    >
        <div class="col-span-4 gap-5 py-3">
            <div class="font-semibold"> Admin info </div>
        </div>

        <div class="col-span-1"> Company Name</div>
        <div class="col-span-3">
            name of company
        </div>

        <div class="col-span-1"> Admin account </div>
        <ElementsInput 
            class="col-span-3"
            inputtype="email"
            :required="true"
        />

        <div class="col-span-4 my-4 w-full h-px bg-gray-200"></div>
        <button inputtype="submit" class="col-span-4 bg-indigo-600 py-4 text-gray-50"> 
            Invite Master Admin
        </button>
    </form>
</template>

<script>
export default {
    methods : {
        sendingInviteEmail(){
            alert("email sending")
        }
    }
}
</script>