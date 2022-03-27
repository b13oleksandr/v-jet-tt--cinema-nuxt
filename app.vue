<template>
  <div class="bg-gray-900 min-h-screen px-4">
    <app-container class="pt-4">
      <app-header @logo="onLogo" />

      <app-search v-model="query" />

      <app-genres @genre="onGenre" />

      <app-grid v-if="!selectedMovie" :items="list">
        <template #item="{ item }">
          <app-movie-card :movie="item" @movie="onMovie" />
        </template>
      </app-grid>

      <app-movie v-else :movie="selectedMovie" />
    </app-container>
  </div>
</template>


<script lang="ts">
import { defineComponent, watch, ref } from "vue";
import { fetMoviesSessions, fetchMovies } from "@/api/api";
import { genres } from "@/enums";
import AppContainer from "@/components/AppContainer.vue";
import AppMovie from "@/components/AppMovie.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppSearch from "@/components/AppSearch.vue";
import AppGenres from "@/components/AppGenres.vue";
import AppMovieCard from "@/components/AppMovieCard.vue";
import AppGrid from "@/components/AppGrid.vue";

export default defineComponent({
  name: "App",

  components: {
    AppGrid,
    AppMovieCard,
    AppGenres,
    AppSearch,
    AppHeader,
    AppMovie,
    AppContainer,
  },

  setup: function () {
    const list = ref();
    const query = ref("");
    const selectedMovie = ref(null);

    fetchMovies(null, (data: any) => (list.value = data));

    const onGenre = (id: number) => {
      fetchMovies({ genres: id }, (data: any) => {
        selectedMovie.value = null;
        list.value = data;
      });
    };

    const onMovie = (id: number) => {
      window.scrollTo(0, 0)

      fetchMovies({ movie_id: id }, (data: any) => {
        if (data.length) {
          selectedMovie.value = data[0];
        }
      });
    };

    const onLogo = () => {
      selectedMovie.value = null;
    };

    watch(
        () => query.value,
        (v) => {
          fetchMovies({ name: v.trim() }, (data: any) => {
            list.value = data;
          });
        }
    );

    watch(
        () => selectedMovie.value,
        (movie: any) => {
          if (!movie?.id) {
            return;
          }

          fetMoviesSessions(movie.id, (data: any) => {
            if (data) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore: Object is possibly 'null'
              selectedMovie.value.sessions = data[movie.id];
            }
          });
        }
    );

    return {
      list,
      query,
      onGenre,
      genres,
      onMovie,
      selectedMovie,
      onLogo,
    };
  },
});
</script>
