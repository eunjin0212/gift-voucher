<script>
import { ref } from "vue";

export default {
  props: {
    modelValue: File,
    imgSrc: String,
    name: String,
    maxFileSize: Number,
    fileFormat: {
      type: Array,
      default() {
        return [".jpg"];
      },
    },
    uploadText: String,
    imageProcessing: Boolean,
  },
  emits: ["changeFile", "deleteFile"],
  data() {
    return {
      emptyPic: ref(require(`@/assets/img/elements-file-1.svg`)),
      progressPercent: null,
    };
  },
  mounted() {
    const self = this;
    if (!self.imgSrc) {
      self.$emit("changeFile", null, self.emptyPic);
    }
  },
  methods: {
    inputFile(e) {
      const vue = this;
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e2) => {
        vue.$emit("changeFile", file, e2.target.result);
        console.log();
        vue.getProgressPercent();
      };
      reader.readAsDataURL(file);
    },
    deleteFile(imageProcessing) {
      const self = this;
      if (imageProcessing) return;
      this.$emit(
        "changeFile",
        null,
        ref(require(`@/assets/img/elements-file-1.svg`))
      );
      this.$emit("deleteFile");
      self.getProgressPercent();
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
};
</script>
<template>
  <div>
    <!-- <h1 class="text-sm font-semibold text-slate-800">{{ name }}</h1> -->
    <!-- <div class="mt-3 py-1"> -->
    <div>
      <input
        :accept="fileFormat.join(',')"
        class="hidden"
        type="file"
        ref="file"
        :value="modelValue"
        placeholder="Choose File"
        @input="inputFile"
      />
      <button
        class="w-16 flex justify-center items-center text-sm font-medium text-blue-500"
        @click="$refs.file.click"
      >
        {{ uploadText }}
      </button>
      <!-- <button
          v-else
          class="rounded border border-gray-200 px-3 h-10 bg-white text-sm font-semibold text-red-500 hover:bg-gray-100 transition-all duration-500"
          @click="deleteFile(imageProcessing)"
        >
          <span> Delete </span>
        </button> -->
    </div>
  </div>
</template>
