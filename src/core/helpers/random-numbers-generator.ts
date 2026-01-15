export function getRandomInRange(min: number, max: number): number {
  if (min > max) {
    throw new Error("Min cannot be greater than Max");
  }
  return Math.random() * (max - min) + min;
}
