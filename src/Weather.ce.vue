<template>
  <div class="weather-widget" v-cloak>
    <Widget v-for="loc in locations" :key="loc.id" :weather-data="loc.weatherData"/>
    <WidgetEdit v-if="editMode" :locations="locations" :api-key="apiKey" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Widget from './components/Widget.vue'
import WidgetEdit from './components/WidgetEdit.vue'
import configJson from './config.json'
import { getWeatherByLocation } from './services/OpenWeatherAPI'
import { getStoredLocations, addLocationToStore } from './services/LocalStorage'
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
      editMode: true
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
    const locationsLocal = getStoredLocations()
    if (locationsLocal.length) {
      locationsLocal.forEach(element => {
        this.getWeather(element.lat, element.lon, this.apiKey)
      })
    } else {
      this.getCurrentPosition()
    }
  },

  methods: {
    async getWeather (lat: number, lon: number, apiKey: string, addToStore = false): Promise<void> {
      const value = await getWeatherByLocation(lat, lon, apiKey)
      this.weatherData = value
      const newLocation: LocationData = {
        lat: value.coord.lat,
        lon: value.coord.lon,
        id: value.id,
        order: this.locations.length,
        weatherData: value
      }
      this.locations.push(newLocation)
      if (addToStore) {
        addLocationToStore(newLocation)
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
        this.getWeather(this.location.lat, this.location.lon, this.apiKey, true)
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
