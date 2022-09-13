<template>
  <div class="weather-widget__view" v-if="weatherData?.cod === 200">
    <div class="weather-widget__city-name">{{ cityCountry }}</div>
    <div class="weather-widget__main-info">
      <div class="weather-widget__icon">
        <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" alt="" />
      </div>
      <div class="weather-widget__temp">{{ tempInfo }}</div>
    </div>
    <div class="weather-widget__feels-cloud-wind">{{ feelsLike }} {{ weatherDescription }} {{ beaufortWindScale }}</div>
    <div class="weather-widget__other-info">
      <div class="weather-widget__other-info-item weather-widget__other-info-item_wind">
        <img :style="{ 'transform': `rotate(${windDeg}deg)` }" alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDg4Ljk4IDQ4OC45OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDg4Ljk4IDQ4OC45ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik00MDkuNDksNDg1Ljc1bC0xNjUtODAuOWwtMTY1LDgwLjljLTI1LjMsMTIuNC01Mi40LTEzLjEtNDEuNi0zOS4xbDE3OC41LTQyNy45YzEwLjQtMjUsNDUuOC0yNSw1Ni4zLDBsMTc4LjQsNDI3LjkNCgkJCUM0NjEuODksNDcyLjU1LDQzNC43OSw0OTguMTUsNDA5LjQ5LDQ4NS43NXoiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />
        {{ windInfo }}
      </div>
      <div class="weather-widget__other-info-item weather-widget__other-info-item_pressure">
        <img alt="" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDcwIDQ3MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcwIDQ3MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTQwMS4xNyw2OC44M0MzNTYuNzg1LDI0LjQ0NCwyOTcuNzcxLDAsMjM1LDBTMTEzLjIxNSwyNC40NDQsNjguODMsNjguODNDMjQuNDQ0LDExMy4yMTYsMCwxNzIuMjI5LDAsMjM1DQoJCXMyNC40NDQsMTIxLjc4NCw2OC44MywxNjYuMTdDMTEzLjIxNSw0NDUuNTU2LDE3Mi4yMjksNDcwLDIzNSw0NzBzMTIxLjc4NS0yNC40NDQsMTY2LjE3LTY4LjgzDQoJCUM0NDUuNTU2LDM1Ni43ODQsNDcwLDI5Ny43NzEsNDcwLDIzNVM0NDUuNTU2LDExMy4yMTYsNDAxLjE3LDY4LjgzeiBNMjM1LDQ1NWMtMTIxLjMwOSwwLTIyMC05OC42OTEtMjIwLTIyMFMxMTMuNjkxLDE1LDIzNSwxNQ0KCQlzMjIwLDk4LjY5MSwyMjAsMjIwUzM1Ni4zMDksNDU1LDIzNSw0NTV6Ii8+DQoJPHBhdGggZD0iTTIzNSwzMEMxMjEuOTYyLDMwLDMwLDEyMS45NjMsMzAsMjM1czkxLjk2MiwyMDUsMjA1LDIwNXMyMDUtOTEuOTYzLDIwNS0yMDVTMzQ4LjAzOCwzMCwyMzUsMzB6IE0yMzUsNDI1DQoJCWMtMTA0Ljc2NiwwLTE5MC04NS4yMzMtMTkwLTE5MFMxMzAuMjM0LDQ1LDIzNSw0NXMxOTAsODUuMjMzLDE5MCwxOTBTMzM5Ljc2Niw0MjUsMjM1LDQyNXoiLz4NCgk8cGF0aCBkPSJNMzY5Ljk2OCwxNTcuODM4Yy0wLjA5Mi0wLjE5OC0wLjE5LTAuMzk1LTAuMzAxLTAuNTg4Yy0wLjEzNi0wLjIzNS0wLjI4My0wLjQ1OC0wLjQzOS0wLjY3Mw0KCQljLTEzLjUwOS0yMy4wMzMtMzIuNzcyLTQyLjI5Ni01NS44MDUtNTUuODA1Yy0wLjIxNC0wLjE1Ni0wLjQzOC0wLjMwNC0wLjY3My0wLjQzOWMtMC4xOTMtMC4xMTEtMC4zODktMC4yMDgtMC41ODctMC4zMDENCgkJQzI4OS40MSw4Ni45NzQsMjYzLjA2Miw3OS41LDIzNSw3OS41Yy0yOC4wNjMsMC01NC40MTIsNy40NzQtNzcuMTY1LDIwLjUzNGMtMC4xOTcsMC4wOTItMC4zOTMsMC4xODktMC41ODUsMC4yOTkNCgkJYy0wLjIzNSwwLjEzNi0wLjQ1OCwwLjI4My0wLjY3MywwLjQzOWMtMjMuMDMzLDEzLjUwOS00Mi4yOTYsMzIuNzcyLTU1LjgwNSw1NS44MDVjLTAuMTU2LDAuMjE0LTAuMzA0LDAuNDM4LTAuNDM5LDAuNjczDQoJCWMtMC4xMTEsMC4xOTMtMC4yMDksMC4zOS0wLjMwMSwwLjU4OEM4Ni45NzQsMTgwLjU5LDc5LjUsMjA2LjkzOCw3OS41LDIzNWMwLDI3LjMxMiw3LjIxNSw1NC4xOTUsMjAuODczLDc3Ljc2Mg0KCQljMC4zODUsMC42NiwzLjk2Nyw2LjMzMiwxMS4xNTksMi4xODNsMjAuNjk3LTExLjk0OWMzLjU4Ny0yLjA3MSw0LjgxNi02LjY1OCwyLjc0NS0xMC4yNDVjLTIuMDcxLTMuNTg4LTYuNjU4LTQuODE1LTEwLjI0NS0yLjc0NQ0KCQljMCwwLTguNjEzLDQuOTczLTE0Ljk2Niw4LjY0MWMtOC44NzQtMTcuNDEzLTE0LjAwNC0zNi41NzEtMTUuMDUyLTU2LjE0NkgxMTJjNC4xNDIsMCw3LjUtMy4zNTcsNy41LTcuNXMtMy4zNTgtNy41LTcuNS03LjUNCgkJSDk0LjcwMWMxLjA2My0yMC4xMTksNi4zNzktMzkuMTI4LDE1LjA2Mi01Ni4xNDZsMTQuOTY2LDguNjQxYzEuMTgxLDAuNjgyLDIuNDcxLDEuMDA2LDMuNzQzLDEuMDA2DQoJCWMyLjU5MiwwLDUuMTEzLTEuMzQ1LDYuNTAyLTMuNzUxYzIuMDcxLTMuNTg3LDAuODQyLTguMTc0LTIuNzQ1LTEwLjI0NWwtMTQuOTQtOC42MjVjMTAuNjk2LTE2LjM3NywyNC43MTMtMzAuMzk0LDQxLjA5LTQxLjA5DQoJCWw4LjYyNSwxNC45MzljMS4zODksMi40MDYsMy45MSwzLjc1MSw2LjUwMiwzLjc1MWMxLjI3MiwwLDIuNTYyLTAuMzI0LDMuNzQzLTEuMDA2YzMuNTg3LTIuMDcxLDQuODE2LTYuNjU4LDIuNzQ1LTEwLjI0NQ0KCQlsLTguNjQxLTE0Ljk2NmMxNy4wMTctOC42ODMsMzYuMDI3LTEzLjk5OSw1Ni4xNDUtMTUuMDYyVjExMmMwLDQuMTQzLDMuMzU4LDcuNSw3LjUsNy41czcuNS0zLjM1Nyw3LjUtNy41Vjk0LjcwMQ0KCQljMjAuMTE5LDEuMDYzLDM5LjEyOCw2LjM3OSw1Ni4xNDUsMTUuMDYybC04LjY0MSwxNC45NjZjLTIuMDcxLDMuNTg3LTAuODQyLDguMTc0LDIuNzQ1LDEwLjI0NQ0KCQljMS4xODEsMC42ODIsMi40NzEsMS4wMDYsMy43NDMsMS4wMDZjMi41OTIsMCw1LjExMy0xLjM0NSw2LjUwMi0zLjc1MWw4LjYyNS0xNC45MzljMTYuMzc3LDEwLjY5NywzMC4zOTQsMjQuNzEzLDQxLjA5LDQxLjA5DQoJCWwtMTQuOTQsOC42MjVjLTMuNTg3LDIuMDcxLTQuODE2LDYuNjU4LTIuNzQ1LDEwLjI0NWMxLjM4OSwyLjQwNiwzLjkxLDMuNzUxLDYuNTAyLDMuNzUxYzEuMjcyLDAsMi41NjItMC4zMjQsMy43NDMtMS4wMDYNCgkJbDE0Ljk2Ni04LjY0MWM4LjY4MywxNy4wMTcsMTMuOTk4LDM2LjAyNywxNS4wNjIsNTYuMTQ2SDM1OGMtNC4xNDIsMC03LjUsMy4zNTctNy41LDcuNXMzLjM1OCw3LjUsNy41LDcuNWgxNy4yOQ0KCQljLTEuMDQ4LDE5LjU2MS02LjE3MiwzOC43MjMtMTUuMDM0LDU2LjE1NmwtMTQuOTg0LTguNjUxYy0zLjU4OC0yLjA3MS04LjE3NC0wLjg0My0xMC4yNDUsMi43NDUNCgkJYy0yLjA3MSwzLjU4Ny0wLjg0Miw4LjE3NCwyLjc0NSwxMC4yNDVsMjEuNjUxLDEyLjVjMS4xODEsMC42ODIsMi40NywxLjAwNiwzLjc0MywxLjAwNmMyLjU5LDAsNS4xMS0xLjM0NCw2LjUtMy43NDgNCgkJYzEzLjYzLTIzLjU4LDIwLjgzNS01MC40NjcsMjAuODM1LTc3Ljc1M0MzOTAuNSwyMDYuOTM4LDM4My4wMjYsMTgwLjU5LDM2OS45NjgsMTU3LjgzOHoiLz4NCgk8cGF0aCBkPSJNMjYwLjU1NCwxODkuMTVjLTMuNjE4LTIuMDEtOC4xNzktMC43MS0xMC4xOTIsMi45MDRsLTExLjU4MiwyMC43NjljLTEuMjMtMC4yMDktMi40OTEtMC4zMjQtMy43OC0wLjMyNA0KCQljLTEyLjQwNywwLTIyLjUsMTAuMDk0LTIyLjUsMjIuNWMwLDEuNDA0LDAuMTM2LDIuNzc2LDAuMzgzLDQuMTA5bC02Mi4xNzMsMzUuODk2Yy0zLjU4NywyLjA3MS00LjgxNiw2LjY1OC0yLjc0NSwxMC4yNDUNCgkJYzEuMzg5LDIuNDA2LDMuOTEsMy43NTEsNi41MDIsMy43NTFjMS4yNzIsMCwyLjU2Mi0wLjMyNCwzLjc0My0xLjAwNmw2Mi4xODQtMzUuOTAyYzMuOTM0LDMuMzY3LDkuMDM1LDUuNDA3LDE0LjYwNyw1LjQwNw0KCQljOS42NiwwLDE3LjkxNS02LjEyLDIxLjA5OC0xNC42ODVsMjMuNzc1LDAuMzU0YzAuMDM4LDAuMDAxLDAuMDc2LDAuMDAxLDAuMTE0LDAuMDAxYzQuMDg1LDAsNy40MjktMy4yNzcsNy40OTctNy4zNzYNCgkJYzAuMTU3LTkuNDctMi4yNy0xOC44MjEtNy4wMTgtMjcuMDQ1QzI3NS43MTksMjAwLjUyNywyNjguODMzLDE5My43NSwyNjAuNTU0LDE4OS4xNXogTTIzNSwyNDIuNWMtNC4xMzYsMC03LjUtMy4zNjQtNy41LTcuNQ0KCQlzMy4zNjQtNy41LDcuNS03LjVjMS4zMDIsMCwyLjUyOCwwLjMzNSwzLjU5NiwwLjkyMWMwLjAxOSwwLjAxMSwwLjAzNSwwLjAyMywwLjA1NCwwLjAzNGMyLjI5NywxLjI5LDMuODUsMy43MzgsMy44NSw2LjU0NQ0KCQljMCwwLjAzMi0wLjAwNCwwLjA2NC0wLjAwNSwwLjA5NkMyNDIuNDMyLDIzOS4xOTcsMjM5LjA5NywyNDIuNSwyMzUsMjQyLjV6IE0yNTYuMzE3LDIyNy44MTcNCgkJYy0wLjk2Ni0yLjg1OC0yLjQ4OS01LjQ2MS00LjQ0My03LjY3N2w3LjU3MS0xMy41NzZjMy4xODgsMi43MzcsNS45MDgsNi4wMDksOC4wMzEsOS42ODZjMi4xMjMsMy42NzgsMy41OTYsNy42NjksNC4zNzMsMTEuNzk5DQoJCUwyNTYuMzE3LDIyNy44MTd6Ii8+DQoJPHBhdGggZD0iTTI2MS4xNDcsMzc1LjVoLTUyLjI5NGMtNC4xNDIsMC03LjUsMy4zNTctNy41LDcuNXMzLjM1OCw3LjUsNy41LDcuNWg1Mi4yOTRjNC4xNDIsMCw3LjUtMy4zNTcsNy41LTcuNQ0KCQlTMjY1LjI4OSwzNzUuNSwyNjEuMTQ3LDM3NS41eiIvPg0KCTxwYXRoIGQ9Ik0yNTEuMTQ3LDM2MC41YzQuMTQyLDAsNy41LTMuMzU3LDcuNS03LjVzLTMuMzU4LTcuNS03LjUtNy41aC0zMi4yOTRjLTQuMTQyLDAtNy41LDMuMzU3LTcuNSw3LjVzMy4zNTgsNy41LDcuNSw3LjUNCgkJSDI1MS4xNDd6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />
        {{ pressureInfo }}
      </div>
      <div class="weather-widget__other-info-item">{{ humidityInfo }}</div>
      <div class="weather-widget__other-info-item">{{ dewPointInfo }}</div>
      <div class="weather-widget__other-info-item">{{ visibilityInfo }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WeatherData } from '../types/WeaterDataTypes.interface'
import { windClassificationSearch } from '../services/WindClassification'
import { windDegreesToDirection } from '../services/WindDirection'
import { dewPoint } from '../services/DewPoint'

export default defineComponent({
  name: 'WidgetView',
  props: {
    weatherData: {
      required: true,
      type: Object as () => WeatherData | undefined
    }
  },
  created () {
    console.log(this.weatherData)
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
    temp (): number | null {
      return this.weatherData?.main?.temp ? Math.round(this.weatherData.main.temp) : null
    },
    tempInfo (): string {
      if (this.temp) {
        return Math.round(this.temp).toString() + '°C'
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
    },
    windSpeed (): number | null {
      return this.weatherData?.wind?.speed ? this.weatherData.wind.speed : null
    },
    windDeg (): number | null {
      return this.weatherData?.wind?.deg ? this.weatherData.wind.deg : null
    },
    beaufortWindScale (): string {
      return this.windSpeed ? windClassificationSearch(this.windSpeed) : ''
    },
    windInfo (): string {
      const direction: string = this.windDeg ? windDegreesToDirection(this.windDeg) : ''
      return `${this.windSpeed}m/s ${direction}`
    },
    pressureInfo (): string {
      return this.weatherData?.main?.pressure ? `${this.weatherData.main.pressure} hPa` : ''
    },
    humidity (): number | null {
      return this.weatherData?.main?.humidity ? this.weatherData.main.humidity : null
    },
    humidityInfo (): string {
      return this.humidity ? `Humidity ${this.humidity}%` : ''
    },
    visibilityInfo (): string {
      return this.weatherData?.visibility ? `Visibility ${(this.weatherData.visibility / 1000).toFixed(1)}km` : ''
    },
    dewPointInfo (): string {
      if (this.humidity && this.temp) {
        return `Dew point: ${dewPoint(this.temp, this.humidity).toString()} °C.`
      }
      return ''
    }
  }
})
</script>
