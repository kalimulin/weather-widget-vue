import { WeatherData } from '@/types/WeaterDataTypes.interface'

export const openWeatherSearch = async (lat: string, lon: string, apiKey: string): Promise<WeatherData> =>
  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(val => val.json())
