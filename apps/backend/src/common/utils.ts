export function calculateChange(current: number, previous: number): number {
  if (previous === 0) {
    return 0;
  }

  return ((current - previous) / previous) * 100;
}
