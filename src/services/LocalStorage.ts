import { LocationData } from '@/types/LocationType.interface'

export const getStoredLocations = (): LocationData[] => {
  if (localStorage?.locations) {
    const locationsLocal = JSON.parse(localStorage.locations) as LocationData[]
    return locationsLocal
  }
  return []
}

export const addLocationToStore = (location: LocationData): void => {
  console.log(location)
  const locationsLocal = localStorage.locations ? JSON.parse(localStorage.locations) as LocationData[] : []
  let findLocation = locationsLocal.find(el => el.id === location.id)
  if (findLocation) {
    findLocation = Object.assign(findLocation, location)
  } else {
    locationsLocal.push(location)
  }
  localStorage.setItem('locations', JSON.stringify(locationsLocal))
}
