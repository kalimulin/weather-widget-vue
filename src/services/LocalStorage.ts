import { LocationData } from '@/types/LocationType.interface'

export const getStoredLocations = (): LocationData[] => {
  if (localStorage?.locations) {
    const locationsLocal = JSON.parse(localStorage.locations) as LocationData[]
    return locationsLocal
  }
  return []
}

export const addLocationToStore = (location: LocationData): void => {
  const locationsLocal = localStorage.locations ? JSON.parse(localStorage.locations) as LocationData[] : []
  let findLocation = locationsLocal.find(el => el.id === location.id)
  if (findLocation) {
    findLocation = Object.assign(findLocation, location)
  } else {
    locationsLocal.push(location)
  }
  localStorage.setItem('locations', JSON.stringify(locationsLocal))
}

export const removeLocationFromStore = (location: LocationData): void => {
  const locationsLocal = localStorage.locations ? JSON.parse(localStorage.locations) as LocationData[] : []
  const newLocations = locationsLocal.filter(el => el.id !== location.id)
  localStorage.setItem('locations', JSON.stringify(newLocations))
}

export const sortLocations = (locations: LocationData[]): void => {
  localStorage.setItem('locations', JSON.stringify(locations))
}
