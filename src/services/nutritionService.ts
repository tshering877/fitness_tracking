export function calculateRemainingCalories(
  targetCalories: number,
  consumedCalories: number,
): number {
  return Math.max(0, targetCalories - consumedCalories);
}
