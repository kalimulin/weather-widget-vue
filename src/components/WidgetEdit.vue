<template>
  <div class="weather-widget__edit">
    <div class="weather-widget__title">Settings</div>
    <div class="weather-widget__close" @click="$emit('close')">
      <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMUwxMSAxMU0xIDExTDExIDFMMSAxMVoiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" />
    </div>
    <draggable
        :list="draggableLocationsList"
        class="weather-widget__locations"
        handle=".handle"
        item-key="id"
        @start="drag=true"
        @end="onDraggableEnd"
      >
        <template #item="{ element }">
          <div class="weather-widget__location-item">
            <div class="weather-widget__drag-handle handle">
              <img alt="" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTguNSAxN2MtMS4xIDAtMiAuOS0yIDJzLjkgMiAyIDIgMi0uOSAyLTItLjktMi0yLTJ6bTctMTBjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yLTIgLjktMiAyIC45IDIgMiAyem0tNyAzYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnptNyAwYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnptMCA3Yy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMiAyLS45IDItMi0uOS0yLTItMnptLTctMTRjLTEuMSAwLTIgLjktMiAycy45IDIgMiAyIDItLjkgMi0yLS45LTItMi0yeiIvPjwvc3ZnPg==" />
          </div>
          <span>{{ element.weatherData?.name }}, {{ element.weatherData?.sys.country }}</span>
          <div class="weather-widget__remove-city" @click="removeLocation(element)">
            <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAxOCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgOVYxNU0xMSA5VjE1TTEgNUgxN00xNiA1TDE1LjEzMyAxNy4xNDJDMTUuMDk3MSAxNy42NDY2IDE0Ljg3MTMgMTguMTE4OCAxNC41MDExIDE4LjQ2MzZDMTQuMTMwOSAxOC44MDgzIDEzLjY0MzkgMTkgMTMuMTM4IDE5SDQuODYyQzQuMzU2MTQgMTkgMy44NjkwNyAxOC44MDgzIDMuNDk4ODkgMTguNDYzNkMzLjEyODcgMTguMTE4OCAyLjkwMjkyIDE3LjY0NjYgMi44NjcgMTcuMTQyTDIgNUgxNlpNMTIgNVYyQzEyIDEuNzM0NzggMTEuODk0NiAxLjQ4MDQzIDExLjcwNzEgMS4yOTI4OUMxMS41MTk2IDEuMTA1MzYgMTEuMjY1MiAxIDExIDFIN0M2LjczNDc4IDEgNi40ODA0MyAxLjEwNTM2IDYuMjkyODkgMS4yOTI4OUM2LjEwNTM2IDEuNDgwNDMgNiAxLjczNDc4IDYgMlY1SDEyWiIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" />
          </div>
          </div>
        </template>
      </draggable>
    <div class="weather-widget__search">
      <label class="weather-widget__search-label">Add location</label>
      <input placeholder="type location name..." class="weather-widget__search-field" type="text" v-model="searchText" @input="getLocationsByName">
      <div class="weather-widget__clear-search" @click="clearSearch" v-if="searchText.length">
        <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgMUwxMSAxMU0xIDExTDExIDFMMSAxMVoiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" />
      </div>
      <div class="weather-widget__search-result" v-if="citiesSearch && citiesSearch.length">
        <div class="weather-widget__search-result-item" v-for="city in citiesSearch" :key="`${city.lat}${city.lon}`">
          <span>{{ city.name }}, {{ city.country }}</span>
          <div class="weather-widget__add-city" @click="addLocation(city)">
            <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMVY3TTcgN1YxM003IDdIMTNNNyA3SDEiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import draggable from 'vuedraggable'
import { LocationData } from '../types/LocationType.interface'
import { getCitiesByName } from '../services/OpenWeatherAPI'
import { CitySearchResult } from '@/types/CitySearchResultType.interface'

export default defineComponent({
  name: 'WidgetEdit',
  props: {
    locations: {
      required: true,
      type: Array as () => LocationData[]
    },
    apiKey: {
      required: true,
      type: String
    }
  },
  data: () => {
    return {
      searchText: '',
      timer: 0 as ReturnType<typeof setTimeout>,
      citiesSearch: [] as CitySearchResult[],
      drag: false,
      draggableLocationsList: [] as LocationData[]
    }
  },
  created () {
    this.draggableLocationsList = [...this.locations]
  },
  components: {
    draggable
  },
  computed: {
    locationsList (): LocationData[] {
      return [...this.locations]
    }
  },
  methods: {
    async getCities (searchText: string): Promise<void> {
      const value = await getCitiesByName(searchText, this.apiKey)
      if (!('cod' in value)) {
        this.citiesSearch = value
      }
    },
    getLocationsByName (): void {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.getCities(this.searchText)
      }, 1000)
    },
    clearSearch () {
      this.searchText = ''
      this.citiesSearch = []
    },
    addLocation (location: LocationData) {
      this.$emit('addLocation', location)
      this.clearSearch()
    },
    removeLocation (location: LocationData) {
      this.$emit('removeLocation', location)
    },
    onDraggableEnd () {
      this.drag = false
      this.$emit('sortLocations', this.draggableLocationsList)
    }
  },
  watch: {
    locationsList (newValue) {
      this.draggableLocationsList = [...newValue]
    }
  }
})
</script>
