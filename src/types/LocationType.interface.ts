import { WeatherData } from "./WeaterDataTypes.interface"

export interface LocationData {
  id?: number,
  lat: number,
  lon: number,
  weatherData?: WeatherData,
  name?: string,
  country?: string
}
