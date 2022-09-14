import { CitySearchError, CitySearchResult } from '@/types/CitySearchResultType.interface'
import { WeatherData } from '@/types/WeaterDataTypes.interface'

export const getWeatherByLocation = async (lat: number, lon: number, apiKey: string): Promise<WeatherData> =>
  await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(val => val.json())

export const getWeatherByName = async (name: string, apiKey: string, state?: string, country?: string): Promise<WeatherData> => {
  let query = name
  state ? query += `,${state}` : query += ''
  country ? query += `,${country}` : query += ''
  return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`).then(val => val.json())
}

export const getCitiesByName = async (searchText: string, apiKey: string): Promise<CitySearchResult[] | CitySearchError> =>
  await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchText}&appid=${apiKey}`)
    .then(val => val.json())
