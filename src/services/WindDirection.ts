export const windDegreesToDirection = (deg: number): string => {
  const val: number = Math.floor((deg / 22.5) + 0.5)
  const arr: string[] = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return arr[(val % 16)]
}
