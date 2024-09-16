import { DateTime } from "luxon"

// Return ISO string of the next occurrence
export function getNextOccurrence(
  dayOfWeek: number,
  hours: number,
  minutes: number = 0,
): string {
  const now = DateTime.local()
  const currentDay = now.weekday
  const daysUntilNext = (dayOfWeek - currentDay + 7) % 7 || 7
  const nextOccurrence = now
    .plus({ days: daysUntilNext })
    .set({ hour: hours, minute: minutes, second: 0, millisecond: 0 })

  return nextOccurrence.toISO()
}

// Get Unix timestamp (seconds since epoch)
export function getUnixTimestamp(dateStr: string, timezone?: string): number {
  const zonedDate = timezone
    ? DateTime.fromISO(dateStr, { zone: timezone })
    : DateTime.fromISO(dateStr).toUTC()

  return Math.floor(zonedDate.toSeconds())
}
