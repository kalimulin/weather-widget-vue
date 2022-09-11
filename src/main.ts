import { createApp } from 'vue'
import App from './App.vue'

const widgets = document.getElementsByTagName('weather-widget') as HTMLCollectionOf<HTMLElement>
if (widgets[0]) {
  createApp(App).mount(widgets[0])
}
