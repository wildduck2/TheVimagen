export const flateData = <T>(nestedArray: T[]): T[] => {
  return nestedArray.flatMap((innerArray) => innerArray)
}
