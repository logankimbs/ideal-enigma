export function calculateChange(current: number, previous: number): number {
  if (previous === 0) {
    return current * 100;
  }

  return ((current - previous) / previous) * 100;
}

export function parseNumber(value: any, fallback = 0): number {
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
}

export function sumValues<T>(items: T[], key: keyof T): number {
  return items.reduce((sum, item) => sum + Number(item[key] || 0), 0);
}

export function calculateAverage(results: any[]): number {
  const sum = results.reduce((a, r) => a + Number(r.insight_count), 0);
  return results.length ? sum / results.length : 0;
}
