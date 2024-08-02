export const flatDataa = <T>(nestedArray: T[]): T[] => {
  return nestedArray.flatMap((innerArray) => innerArray)
}
