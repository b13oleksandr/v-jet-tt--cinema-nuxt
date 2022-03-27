<template>
  <div class="flex flex-col md:flex-row">
    <div class="max-w-md md:mr-8">
      <img :src="movie.image" :alt="movie.name" class="rounded-md" />
    </div>

    <div class="grow shrink basis-0 mt-6 md:mt-0">
      <h1
        v-html="movie.name"
        class="text-3xl font-extrabold tracking-tight text-white"
      />

      <p
        v-text="genres[movie.genre]"
        class="mt-3 text-base text-gray-300 sm:mt-3 sm:text-xl lg:text-lg xl:text-xl cursor-pointer"
      />

      <div class="mt-6">
        <h3 class="sr-only">Description</h3>
        <div
          v-html="movie.description"
          class="text-base text-gray-300 space-y-6"
        />
      </div>

      <div class="mt-8">
        <div v-for="(session, i) of movie.sessions" :key="i" class="mb-6">
          <p class="mb-2 text-indigo-400">
            {{ formatDate(session.showdate) }}
          </p>

          <div class="flex flex-wrap -mx-2 -mb-4">
            <div
              v-for="(daytime, j) of session.daytime.split(';')"
              :key="j"
              class="px-2 pb-4"
              @click="onSession(session.showdate, daytime)"
            >
              <label
                class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase cursor-pointer focus:outline-none"
              >
                <p
                  id="size-choice-0-label"
                  v-text="daytime"
                  class="text-white"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- select place popup  -->
  <ui-popup v-model="showPlacesPopup" @close="onPopupClose" width="600px" title="Виберіть місце">
    <div>
      <div class="flex flex-wrap -mx-2">
        <div class="flex-grid-50 px-2">
          <p class="text-white mb-2">Ряд</p>
          <Listbox v-model="selectedRow">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full py-2 pl-3 pr-10 text-left border border-white bg-gray-900 rounded-md cursor-default focus:outline-none sm:text-sm"
              >
                <span class="block truncate text-white">{{ selectedRow }}</span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <SelectorIcon
                    class="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="place in places"
                    :key="place[0].row"
                    :value="place[0].row"
                    as="template"
                  >
                    <li
                      :class="[
                        active ? 'text-amber-900 bg-amber-100' : 'text-white',
                        'cursor-default select-none relative py-2 pl-10 pr-4',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                        >{{ place[0].row }}</span
                      >
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="w-5 h-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
        <div class="flex-grid-50 px-2">
          <p class="text-white mb-2">Місце</p>
          <Listbox v-model="selectedSeat">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full py-2 pl-3 pr-10 text-left border border-white rounded-md cursor-default focus:outline-none sm:text-sm bg-gray-900"
              >
                <span class="block truncate text-white">{{
                  selectedSeat
                }}</span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <SelectorIcon
                    class="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-800 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="seat in seats"
                    :key="seat.seat"
                    :value="seat.seat"
                    as="template"
                  >
                    <li
                      :class="[
                        active ? 'text-amber-900 bg-amber-100' : 'text-white',
                        'cursor-default select-none relative py-2 pl-10 pr-4',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                        >{{ seat.seat }}</span
                      >
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="w-5 h-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
        </div>
      </div>
      <button
        class="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 mt-4 w-full"
        @click="onMakeOrder"
      >
        Замовити
      </button>

      <div v-if="ticket" class="mt-10 text-white">
        <p class="text-lg mb-2">Білет</p>
        <p class="mb-1">Дата: {{ ticket.showdate }}</p>
        <p class="mb-1">Час: {{ ticket.daytime }}</p>
        <p class="mb-1">Ряд: {{ ticket.row }}</p>
        <p class="mb-1">Місце: {{ ticket.seat }}</p>
        <p class="mb-1">Білет: {{ ticket.ticketkey }}</p>
      </div>
    </div>
  </ui-popup>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { genres } from "@/enums";
import { fetchFreePlaces, bookPlace } from "@/api/api";
import UiPopup from "@/components/AppPopup.vue";

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

export default defineComponent({
  name: "AppMovie",

  components: {
    UiPopup,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
  },

  props: {
    movie: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const selectedSession = ref();
    const showPlacesPopup = ref(false);
    const places = ref();
    const seats = ref();
    const selectedRow = ref();
    const selectedSeat = ref();
    const ticket = ref();

    const setSlectedSession = (showdate: string, daytime: string): void => {
      selectedSession.value = {
        showdate,
        daytime,
      };
    };

    const getSeatsFromPlaces = (row: number): [] | void => {
      const place = places.value.find((p: any) => p[0].row === row);

      if (place) {
        return place[1].filter((s: any) => s.is_free === true);
      }
    };

    const formatDate = (date: string): string => {
      const newDate = new Date(date).toLocaleDateString("uk-UA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return newDate[0].toUpperCase() + newDate.substring(1);
    };

    const onSession = (showdate: string, daytime: string): void => {
      setSlectedSession(showdate, daytime);
      showPlacesPopup.value = true;

      fetchFreePlaces(props.movie.id, showdate, daytime, (data: any) => {
        places.value = data;
        selectedRow.value = places.value[0][0].row;
      });
    };

    const onPopupClose = (): void => {
      ticket.value = null
    };

    const onMakeOrder = (): void => {
      bookPlace(
        props.movie.id,
        selectedRow.value,
        selectedSeat.value,
        selectedSession.value.showdate,
        selectedSession.value.daytime,
        (data: any) => {
          ticket.value = data;
        }
      );
    };

    watch(
      () => selectedRow.value,
      (row: number) => {
        seats.value = getSeatsFromPlaces(row);
        selectedSeat.value = seats.value[0].seat;
      }
    );

    return {
      genres,
      onSession,
      selectedSession,
      showPlacesPopup,
      places,
      selectedRow,
      selectedSeat,
      seats,
      onMakeOrder,
      ticket,
      formatDate,
      onPopupClose
    };
  },
});
</script>
