<template>
  <div class="weather-widget__view" v-if="weatherData.cod === 200">
    <div class="weather-widget__city-name">{{ cityCountry }}</div>
    <div class="weather-widget__main-info">
      <div class="weather-widget__icon">
        <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" alt="" />
      </div>
      <div class="weather-widget__temp">{{ temp }}</div>
    </div>
    <div class="weather-widget__other-info">{{ feelsLike }} {{ weatherDescription }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WeatherData } from '../types/WeaterDataTypes.interface'

export default defineComponent({
  name: 'WidgetView',
  props: {
    weatherData: {
      required: true,
      type: Object as () => WeatherData
    }
  },
  computed: {
    cityCountry (): string {
      const cityName = this.weatherData?.name ? this.weatherData.name : ''
      const countryCode = this.weatherData?.sys?.country ? this.weatherData.sys.country : ''
      if (cityName) {
        return `${cityName}, ${countryCode}`
      }
      return ''
    },
    temp (): string {
      if (this.weatherData?.main?.temp) {
        return Math.round(this.weatherData.main.temp).toString() + '°C'
      }
      return ''
    },
    feelsLike (): string {
      if (this.weatherData?.main?.feels_like) {
        return 'Feels like: ' + Math.round(this.weatherData.main.temp).toString() + '°C.'
      }
      return ''
    },
    weatherDescription (): string {
      if (this.weatherData?.weather?.length) {
        const desc = this.weatherData.weather[0].description
        return desc[0].toUpperCase() + desc.slice(1) + '.'
      }
      return ''
    }
  }
})
</script>
