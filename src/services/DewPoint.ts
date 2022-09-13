export const dewPoint = (temp: number, rh: number): number => {
  const A = 17.625
  const B = 243.04

  const dewNumerator: number = B * (Math.log(rh / 100) + ((A * temp) / (temp + B)))
  const dewDenominator: number = A - (Math.log(rh / 100) + ((A * temp) / (temp + B)))
  return Math.round(dewNumerator / dewDenominator)
}
