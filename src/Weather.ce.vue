<template>
  <div class="weather-widget" v-cloak>
    <Widget :weather-data="weatherData"/>
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
    }
  },

  data: () => {
    return {
      configData: configJson,
      apiKey: '',
      weatherData: {} as WeatherData,
      location: {} as LocationData,
      gettingLocation: false
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

  methods: {
    async getWeather (lat: number, lon: number, apiKey: string): Promise<void> {
      const value = await openWeatherSearch(lat, lon, apiKey)
      this.weatherData = value
      console.log(this.weatherData)
    }
  }
})
</script>

<style lang="scss">
.weather-widget {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

[v-cloak] {display: none}
</style>
