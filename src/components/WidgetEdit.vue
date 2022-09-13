<template>
  <div class="weather-widget__edit">
    <div class="weather-widget__title">Settings</div>
    <div class="weather-widget__location-item" v-for="loc in locationsList" :key="loc.id">
      {{ loc.weatherData?.name }}, {{ loc.weatherData?.sys.country }}
    </div>
    <div class="weather-widget__search">
      <input type="text" v-model="searchText" @input="getLocationsByName">
      <div class="weather-widget__search-result">
        <div class="weather-widget__search-result-item" v-for="city in citiesSearch" :key="`${city.lat}${city.lon}`">
          {{ city.name }}, {{ city.country }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LocationData } from '../types/LocationType.interface'
import { getStoredLocations, addLocationToStore } from '../services/LocalStorage'
import { getCitiesByName } from '../services/OpenWeatherAPI'
import { CitySearchResult, CitySearchError } from '@/types/CitySearchResultType.interface'

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
      locationsList: [] as LocationData[],
      searchText: '',
      timer: 0 as ReturnType<typeof setTimeout>,
      citiesSearch: [] as CitySearchResult[]
    }
  },
  created () {
    this.locationsList = [...this.locations]
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
    }
  }
})
</script>
