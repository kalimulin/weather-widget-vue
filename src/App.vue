<template>
  <div class="weather-widget" v-cloak>
    <Widget msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Widget from './components/Widget.vue'
import configJson from './config.json'
import { openWeatherSearch } from './services/OpenWeatherAPI'
import { WeatherData } from './types/WeaterDataTypes.interface'

export default defineComponent({
  name: 'App',
  components: {
    Widget
  },

  data: () => {
    return {
      configData: configJson,
      apiKey: '',
      weatherData: {} as WeatherData
    }
  },

  created () {
    console.log(this.configData)
    if (this.configData.apiKey) {
      this.apiKey = this.configData.apiKey
    }
    this.getWeather('55.7522', '37.6156', '63836fc048c107a45c0d642aceb98ec8')
  },

  methods: {
    async getWeather (lat: string, lon: string, apiKey: string): Promise<void> {
      const value = await openWeatherSearch(lat, lon, apiKey)
      console.log(value)
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
</style>
