
export function getRandomNumbersInRange(minCount: number, maxCount: number, minValue: number, maxValue: number): number[] {
  const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  const numbers = Array.from({ length: count }, () =>
    Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
  );
  return numbers;
}