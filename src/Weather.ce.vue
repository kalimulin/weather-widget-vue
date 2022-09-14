<template>
  <div class="weather-widget" v-cloak>
    <img
      class="weather-widget__edit-button"
      alt=""
      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjY3NSA0LjMxN0MxMy4yNDkgMi41NjEgMTAuNzUxIDIuNTYxIDEwLjMyNSA0LjMxN0MxMC4wNDkgNS40NTIgOC43NDkgNS45OSA3Ljc1MyA1LjM4MkM2LjIwOSA0LjQ0MiA0LjQ0MyA2LjIwOSA1LjM4MyA3Ljc1MkM1LjUyNDMgNy45ODM3NSA1LjYwODg5IDguMjQ1NTkgNS42Mjk4NyA4LjUxNjIxQzUuNjUwODUgOC43ODY4MyA1LjYwNzY0IDkuMDU4NTkgNS41MDM3NSA5LjMwOTM1QzUuMzk5ODUgOS41NjAxMSA1LjIzODIyIDkuNzgyOCA1LjAzMiA5Ljk1OTI5QzQuODI1NzggMTAuMTM1OCA0LjU4MDggMTAuMjYxMSA0LjMxNyAxMC4zMjVDMi41NjEgMTAuNzUxIDIuNTYxIDEzLjI0OSA0LjMxNyAxMy42NzVDNC41ODA1NiAxMy43MzkxIDQuODI1MjkgMTMuODY0NSA1LjAzMTI3IDE0LjA0MDlDNS4yMzcyNiAxNC4yMTc0IDUuMzk4NyAxNC40NCA1LjUwMjQ3IDE0LjY5MDZDNS42MDYyNCAxNC45NDEyIDUuNjQ5NDIgMTUuMjEyOCA1LjYyODQ4IDE1LjQ4MzJDNS42MDc1NSAxNS43NTM3IDUuNTIzMSAxNi4wMTUzIDUuMzgyIDE2LjI0N0M0LjQ0MiAxNy43OTEgNi4yMDkgMTkuNTU3IDcuNzUyIDE4LjYxN0M3Ljk4Mzc1IDE4LjQ3NTcgOC4yNDU1OSAxOC4zOTExIDguNTE2MjEgMTguMzcwMUM4Ljc4NjgzIDE4LjM0OTEgOS4wNTg1OSAxOC4zOTI0IDkuMzA5MzUgMTguNDk2M0M5LjU2MDExIDE4LjYwMDEgOS43ODI4IDE4Ljc2MTggOS45NTkyOSAxOC45NjhDMTAuMTM1OCAxOS4xNzQyIDEwLjI2MTEgMTkuNDE5MiAxMC4zMjUgMTkuNjgzQzEwLjc1MSAyMS40MzkgMTMuMjQ5IDIxLjQzOSAxMy42NzUgMTkuNjgzQzEzLjczOTEgMTkuNDE5NCAxMy44NjQ1IDE5LjE3NDcgMTQuMDQwOSAxOC45Njg3QzE0LjIxNzQgMTguNzYyNyAxNC40NCAxOC42MDEzIDE0LjY5MDYgMTguNDk3NUMxNC45NDEyIDE4LjM5MzggMTUuMjEyOCAxOC4zNTA2IDE1LjQ4MzIgMTguMzcxNUMxNS43NTM3IDE4LjM5MjQgMTYuMDE1MyAxOC40NzY5IDE2LjI0NyAxOC42MThDMTcuNzkxIDE5LjU1OCAxOS41NTcgMTcuNzkxIDE4LjYxNyAxNi4yNDhDMTguNDc1NyAxNi4wMTYyIDE4LjM5MTEgMTUuNzU0NCAxOC4zNzAxIDE1LjQ4MzhDMTguMzQ5MSAxNS4yMTMyIDE4LjM5MjQgMTQuOTQxNCAxOC40OTYzIDE0LjY5MDdDMTguNjAwMSAxNC40Mzk5IDE4Ljc2MTggMTQuMjE3MiAxOC45NjggMTQuMDQwN0MxOS4xNzQyIDEzLjg2NDIgMTkuNDE5MiAxMy43Mzg5IDE5LjY4MyAxMy42NzVDMjEuNDM5IDEzLjI0OSAyMS40MzkgMTAuNzUxIDE5LjY4MyAxMC4zMjVDMTkuNDE5NCAxMC4yNjA5IDE5LjE3NDcgMTAuMTM1NSAxOC45Njg3IDkuOTU5MDVDMTguNzYyNyA5Ljc4MjU4IDE4LjYwMTMgOS41NTk5OSAxOC40OTc1IDkuMzA5MzhDMTguMzkzOCA5LjA1ODc3IDE4LjM1MDYgOC43ODcyMSAxOC4zNzE1IDguNTE2NzdDMTguMzkyNCA4LjI0NjM0IDE4LjQ3NjkgNy45ODQ2NiAxOC42MTggNy43NTNDMTkuNTU4IDYuMjA5IDE3Ljc5MSA0LjQ0MyAxNi4yNDggNS4zODNDMTYuMDE2MiA1LjUyNDMgMTUuNzU0NCA1LjYwODg5IDE1LjQ4MzggNS42Mjk4N0MxNS4yMTMyIDUuNjUwODUgMTQuOTQxNCA1LjYwNzY0IDE0LjY5MDcgNS41MDM3NUMxNC40Mzk5IDUuMzk5ODUgMTQuMjE3MiA1LjIzODIyIDE0LjA0MDcgNS4wMzJDMTMuODY0MiA0LjgyNTc4IDEzLjczODkgNC41ODA4IDEzLjY3NSA0LjMxN1oiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTE0LjEyMTMgMTQuMTIxM0MxNC42ODM5IDEzLjU1ODcgMTUgMTIuNzk1NiAxNSAxMkMxNSAxMS4yMDQ0IDE0LjY4MzkgMTAuNDQxMyAxNC4xMjEzIDkuODc4NjhDMTMuNTU4NyA5LjMxNjA3IDEyLjc5NTYgOSAxMiA5QzExLjIwNDQgOSAxMC40NDEzIDkuMzE2MDcgOS44Nzg2OCA5Ljg3ODY4QzkuMzE2MDcgMTAuNDQxMyA5IDExLjIwNDQgOSAxMkM5IDEyLjc5NTYgOS4zMTYwNyAxMy41NTg3IDkuODc4NjggMTQuMTIxM0MxMC40NDEzIDE0LjY4MzkgMTEuMjA0NCAxNSAxMiAxNUMxMi43OTU2IDE1IDEzLjU1ODcgMTQuNjgzOSAxNC4xMjEzIDE0LjEyMTNaIiBzdHJva2U9IiMzNzQxNTEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo="
      @click="editMode = true"
    />
    <Widget v-for="loc in locations" :key="loc.id" :weather-data="loc.weatherData"/>
    <WidgetEdit
      v-if="editMode"
      :locations="locations"
      :api-key="apiKey"
      @add-location="addLocation"
      @remove-location="removeLocation"
      @close="editMode = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Widget from './components/Widget.vue'
import WidgetEdit from './components/WidgetEdit.vue'
import configJson from './config.json'
import { getWeatherByLocation } from './services/OpenWeatherAPI'
import { getStoredLocations, addLocationToStore, removeLocationFromStore } from './services/LocalStorage'
import { WeatherData } from './types/WeaterDataTypes.interface'
import { LocationData } from './types/LocationType.interface'

export default defineComponent({
  name: 'App',
  components: {
    Widget,
    WidgetEdit
  },

  data: () => {
    return {
      configData: configJson,
      apiKey: '',
      weatherData: {} as WeatherData,
      location: {} as LocationData,
      gettingLocation: false,
      locations: [] as LocationData[],
      editMode: false
    }
  },

  created () {
    if (this.configData.apiKey) {
      this.apiKey = this.configData.apiKey
    }
    if (!('geolocation' in navigator)) {
      console.log('Geolocation is not available.')
      return
    }
    this.locations = getStoredLocations()
    if (this.locations.length) {
      this.locations.forEach(element => {
        this.getWeather(element.lat, element.lon, this.apiKey)
      })
    } else {
      this.getCurrentPosition()
    }
  },

  methods: {
    async getWeather (lat: number, lon: number, apiKey: string): Promise<void> {
      const value = await getWeatherByLocation(lat, lon, apiKey)
      const newLocation: LocationData = {
        lat: value.coord.lat,
        lon: value.coord.lon,
        id: value.id,
        weatherData: value
      }
      const findLocation = this.locations.find(el => el.id === newLocation.id)
      addLocationToStore(newLocation)
      if (!findLocation) {
        this.locations.push(newLocation)
      } else {
        findLocation.weatherData = value
      }
    },
    getCurrentPosition (): void {
      this.gettingLocation = true
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false
        this.location = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
        this.getWeather(this.location.lat, this.location.lon, this.apiKey)
      }, err => {
        console.log(err)
        this.gettingLocation = false
      })
    },
    addLocation (location: LocationData) {
      this.getWeather(location.lat, location.lon, this.apiKey)
    },
    removeLocation (location: LocationData) {
      this.locations = [...this.locations].filter(el => el.id !== location.id)
      removeLocationFromStore(location)
    }
  }
})
</script>

<style lang="scss">
@import './styles/normalize.scss';
@import './styles/font.scss';
@import './styles/styles.scss';

[v-cloak] {display: none}
</style>
