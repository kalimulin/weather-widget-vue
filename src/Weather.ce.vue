<template>
  <div class="weather-widget" v-cloak>
    <Widget v-for="loc in locationsList" :key="loc.id" :weather-data="loc.weatherData"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Widget from './components/Widget.vue'
import configJson from './config.json'
import { openWeatherSearch } from './services/OpenWeatherAPI'
import { WeatherData } from './types/WeaterDataTypes.interface'
import { LocationData } from './types/LocationType.interface'

export default defineComponent({
  name: 'App',
  components: {
    Widget
  },

  computed: {
    locationSet () {
      return Boolean(this.location.lon && this.location.lat)
    },
    locationsList (): LocationData[] {
      return this.locations.filter(loc => loc.weatherData)
    }
  },

  data: () => {
    return {
      configData: configJson,
      apiKey: '',
      weatherData: {} as WeatherData,
      location: {} as LocationData,
      gettingLocation: false,
      locations: [] as LocationData[]
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
    if (localStorage?.locations) {
      const locationsLocal = JSON.parse(localStorage.locations) as LocationData[]
      if (locationsLocal.length) {
        locationsLocal.forEach(element => {
          this.getWeather(element.lat, element.lon, this.apiKey)
        })
      } else {
        localStorage.setItem('locations', JSON.stringify([]))
        this.getCurrentPosition()
      }
    }
  },

  methods: {
    async getWeather (lat: number, lon: number, apiKey: string): Promise<void> {
      const value = await openWeatherSearch(lat, lon, apiKey)
      console.log(value)
      this.weatherData = value
      this.locations.push({
        lat: value.coord.lat,
        lon: value.coord.lon,
        id: value.id,
        order: this.locations.length,
        weatherData: value
      })
      localStorage.setItem('locations', JSON.stringify(this.locations))
    },
    getCurrentPosition (): void {
      console.log('get position')
      this.gettingLocation = true
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false
        this.location = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        }
        console.log('location', this.location)
        this.getWeather(this.location.lat, this.location.lon, this.apiKey)
      }, err => {
        console.log(err)
        this.gettingLocation = false
      })
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
