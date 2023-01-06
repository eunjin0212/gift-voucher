<template>
  <div class="flex items-center gap-2.5">
    <div
      class="inline-flex rounded-full bg-zinc-100 items-center overflow-hidden"
    >
      <img
        v-if="!openPhotoView"
        class="object-none h-24 w-24"
        :src="previewImage"
      />
      <img
        v-else
        class="object-cover h-24 w-24 object-center"
        :src="modelValue"
      />
      <!-- <img class="object-cover h-24 w-24 object-center" :class="{'object-scale-down':modelValue == previewImage}" :src="modelValue" /> -->
    </div>
    <input
      type="file"
      class="hidden"
      ref="file"
      accept=".png, .jpg, .jpeg"
      :value="fileValue"
      @input="inputFile"
    />
    <div class="flex gap-1.5" v-show="!imageUneditable">
      <a
        v-if="imageProcessing"
        href="javascript:void(0)"
        class="border rounded w-24 h-11 bg-sky-500 text-white text-xs font-normal flex justify-center items-center gap-1"
      >
        <span>processing {{ progressPercent }}% </span>
      </a>
      <a
        v-else-if="!modelValue || modelValue == previewImage"
        href="javascript:void(0)"
        class="border rounded border-blue-500 w-24 h-11 bg-blue-500 text-xs font-normal text-white flex justify-center items-center"
        @click="$refs.file.click"
      >
        <span>Browse</span>
      </a>
      <a
        v-else
        href="javascript:void(0)"
        class="border rounded w-24 h-11 bg-white text-xs font-normal flex justify-center items-center gap-1"
        @click="deleteFile(imageProcessing)"
      >
        <img src="@/assets/img/delete.svg" />
        <span>Delete</span>
      </a>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "hr-upload-picture",
  components: {},
  props: {
    openPhotoView : Boolean,
    fileValue: File,
    modelValue: String,
    readonly: Boolean,
    fileFormat: Array,
    maxFileSize: Number,
    imageProcessing: Boolean,
    imageUneditable: Boolean,
  },
  emits: ["update:modelValue", "changeFile", "deleteFile", "failUplaod"],
  data() {
    return {
      previewImage: ref(require("@/assets/img/upload-picture.svg")),
      progressPercent: null,
    };
  },
  methods: {
    inputFile(e) {
      console.log("inputfile :: " + e);
      const self = this;
      const file = e.target.files[0];
      const fileType = file.type.split("/")[1];

      if (!self.fileFormat.includes(fileType)) {
        // 팝업
        self.$emit("failUplaod");
        return false;
      }

      const reader = new FileReader();
      reader.onload = (e2) => {
        console.log("onload :: " + e2);
        self.$emit("update:modelValue", e2.target.result);
        self.$emit("changeFile", file);
        // self.getProgressPercent();
      };
      reader.readAsDataURL(file);
    },
    deleteFile(isProgrssing) {
      console.log("deleteFile");
      if (isProgrssing) return;
      const self = this;
      self.$emit("update:modelValue", null);
      self.$emit("deleteFile");
      // self.getProgressPercent();
    },
    getProgressPercent() {
      const self = this;
      self.progressPercent = 0;
      let progressTimer = setInterval(() => {
        if (self.progressPercent >= 98 || !self.imageProcessing)
          clearInterval(progressTimer);
        self.progressPercent += 1;
      }, 100);
    },
  },
  mounted() {
    const self = this;
    if (!self.modelValue) {
      self.$emit("update:modelValue", null);
    }
  },
};
</script>
