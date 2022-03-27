<template>
  <Dialog
    :open="modelValue"
    class="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
    style="background: rgba(0, 0, 0, 0.8)"
  >
    <div
      class="w-full flex justify-center h-screen overflow-y-auto invisible-scroll"
      ref="popup"
    >
      <div
        class="flex-inline items-center justify-center px-4 pt-6 pb-10 my-10 top-0 rounded-2xl relative w-full h-fit max-w-full mx-4 bg-gray-900"
        :style="width && `width: ${width}`"
      >
        <div
          class="flex items-center cursor-pointer absolute right-6 top-6"
          @click="onClose"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15"
              stroke="#ffffff"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 5L15 15"
              stroke="#ffffff"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <DialogTitle v-if="title">
          <div class="text-lg text-indigo-500 font-semibold mb-4">
            {{ title }}
          </div>
        </DialogTitle>
        <DialogDescription>
          <slot />
        </DialogDescription>
      </div>
    </div>
  </Dialog>
</template>

<script>
import { Dialog, DialogTitle, DialogDescription } from "@headlessui/vue";

export default {
  name: "UiPopup",

  components: {
    Dialog,
    DialogTitle,
    DialogDescription,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: null,
    },
  },

  watch: {
    modelValue(v) {
      this.$nextTick(() => {
        if (v) {
          this.$refs.popup.scrollTo(0, 0);
        }
      });
    },
  },

  methods: {
    onClose() {
      this.$emit("update:model-value", false);
      this.$emit("close", false);
    },
  },
};
</script>
