export interface CitySearchResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  cod?: string;
}

export interface CitySearchError {
  cod: string;
}