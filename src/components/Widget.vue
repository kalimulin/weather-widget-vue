<template>
  <div class="weather-widget-view" v-if="weatherData.cod === 200">
    <div>Name: {{ weatherData.name }}</div>
    <div>Temp: {{ weatherData.main.temp }}</div>
    <div>Clouds: {{ weatherData.clouds.all }}</div>
    <div>Main: {{ weatherData.weather[0].main }}</div>
    <div>Description: {{ weatherData.weather[0].description }}</div>
    <div>Icon: {{ weatherData.weather[0].icon }}</div>
    <div>Wind deg: {{ weatherData.wind.deg }}</div>
    <div>Wind speed: {{ weatherData.wind.speed }}</div>
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
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.weather-widget-view {
  display: block;
}
</style>
