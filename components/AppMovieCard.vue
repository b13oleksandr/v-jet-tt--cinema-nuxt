<template>
  <div>
    <div>
      <img
        :src="movie.image"
        :alt="movie.name"
        class="w-full rounded-md cursor-pointer"
        @click="onMovie(movie.id)"
      />
    </div>
    <p
      class="mt-3 text-base text-gray-300 sm:mt-3 sm:text-xl lg:text-lg xl:text-xl cursor-pointer"
      @click="onMovie(movie.id)"
    >
      {{ movie.name }}
    </p>
    <p class="mt-1 text-sm text-gray-600">
      {{ genres[movie.genre] }}
    </p>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { genres } from "../enums";

export default defineComponent({
  name: "AppMovieCard",

  emits: ["onMovie"],

  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(_, { emit }) {
    const onMovie = (id) => {
      emit("movie", id);
    };

    return {
      onMovie,
      genres,
    };
  },
});
</script>
