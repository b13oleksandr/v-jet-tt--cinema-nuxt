<template>
  <h1
    class="text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl text-indigo-400 mb-8"
  >
    <span class="cursor-pointer" @click="onLogo">V-jet-tt</span>
  </h1>
</template>

<script>
export default {
  name: "AppHeader",

  emits: ["logo"],

  setup(_, { emit }) {
    const onLogo = () => {
      emit("logo");
    };

    return {
      onLogo,
    };
  },
};
</script>
