import { WeatherData } from "./WeaterDataTypes.interface";

export interface LocationData {
  id?: number,
  lat: number,
  lon: number,
  order?: number,
  weatherData?: WeatherData
}
