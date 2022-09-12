import { WindClassificationData } from '@/types/WindClassificationType.interface'

export const windClassificationSearch = (speed: number): string => {
  const windClasses: Array<WindClassificationData> = [
    {
      force: 0,
      classification: 'Calm',
      speed: 0.2
    },
    {
      force: 1,
      classification: 'Light air',
      speed: 1.5
    },
    {
      force: 2,
      classification: 'Light breeze',
      speed: 3.3
    },
    {
      force: 3,
      classification: 'Gentle breeze',
      speed: 5.4
    },
    {
      force: 4,
      classification: 'Moderate breeze',
      speed: 7.9
    },
    {
      force: 5,
      classification: 'Fresh breeze',
      speed: 10.7
    },
    {
      force: 6,
      classification: 'Strong breeze',
      speed: 13.8
    },
    {
      force: 7,
      classification: 'Near Gale',
      speed: 17.1
    },
    {
      force: 8,
      classification: 'Gale',
      speed: 20.7
    },
    {
      force: 9,
      classification: 'Strong gale',
      speed: 24.4
    },
    {
      force: 10,
      classification: 'Storm',
      speed: 28.4
    },
    {
      force: 11,
      classification: 'Violent storm',
      speed: 32.6
    },
    {
      force: 12,
      classification: 'Hurricane',
      speed: Infinity
    }
  ]

  const windClass = windClasses.reduce((prev, item) => {
    return speed > prev.speed ? item : prev
  }, windClasses[0])

  return windClass.classification
}
