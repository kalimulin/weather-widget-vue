import { createApp } from 'vue'
import App from './App.vue'

const widgets = document.getElementsByTagName('weather-widget') as HTMLCollectionOf<HTMLElement>
for (const widget of widgets) {
  widget.classList.add('vue-app-mounted')
  createApp(App).mount(widget)
}
