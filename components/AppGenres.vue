<template>
  <div class="flex flex-wrap py-6">
    <button
      v-text="'Всі'"
      class="text-base font-medium text-white hover:text-gray-300 mr-8"
      @click="onGenre(null)"
    />
    <button
      v-for="(genre, key) of genres"
      v-text="genre"
      :key="key"
      class="text-base font-medium text-white hover:text-gray-300 mr-8"
      @click="onGenre(key)"
    />
  </div>
</template>

<script>
import { genres } from "../enums";

export default {
  name: "AppGenres",

  emits: ["genre"],

  setup(_, { emit }) {
    const onGenre = (v) => {
      emit("genre", v);
    };

    return {
      onGenre,
      genres,
    };
  },
};
</script>
