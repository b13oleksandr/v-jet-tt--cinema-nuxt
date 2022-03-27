<template>
  <div>
    <input
      :model-value="modelValue"
      @input="onUpdateModelValue($event.target.value)"
      placeholder="Пошук"
      class="bg-gray-800 block w-full px-4 py-3 rounded-md border-0 text-base text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
    />
  </div>
</template>

<script>
export default {
  name: "AppSearch",

  emits: ["update:model-value"],

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  setup(_, { emit }) {
    const onUpdateModelValue = (v) => {
      emit("update:model-value", v);
    };

    return {
      onUpdateModelValue,
    };
  },
};
</script>
