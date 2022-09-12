import { defineCustomElement } from 'vue'
import Weather from './Weather.ce.vue'

const VueElement = defineCustomElement(Weather)

customElements.define('weather-widget', VueElement)
