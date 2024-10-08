import { DateTime } from "luxon";

/**
 * Calculates the Unix timestamp for the next occurrence of a specific day and time.
 *
 * @param timezone - The timezone string (e.g., "America/Los_Angeles"). Optional.
 * @param targetWeekday - The target weekday as an ISO number (1 = Monday, 7 = Sunday).
 * @param targetHour - The target hour in 24-hour format (0-23).
 * @param targetMinute - The target minute (0-59).
 * @returns The Unix timestamp for the next occurrence.
 */
const getNextOccurrence = (
  timezone: string | undefined,
  targetWeekday: number,
  targetHour: number,
  targetMinute: number,
): number => {
  // Get the current date and time in the specified timezone or local timezone if undefined
  const now = timezone ? DateTime.now().setZone(timezone) : DateTime.now(); // Defaults to local timezone
  const currentWeekday = now.weekday; // ISO weekday number (1 = Monday, 7 = Sunday)

  // Calculate days until the next occurrence of the target weekday
  let deltaDays = (targetWeekday - currentWeekday + 7) % 7;

  // If today is the target weekday
  if (deltaDays === 0) {
    // Check if the target time has already passed today
    if (
      now.hour > targetHour ||
      (now.hour === targetHour && now.minute >= targetMinute)
    ) {
      deltaDays = 7; // Schedule for next week
    } else {
      deltaDays = 0; // Schedule for today
    }
  }

  // Calculate the target date and time
  const targetDateTime = now.plus({ days: deltaDays }).set({
    hour: targetHour,
    minute: targetMinute,
    second: 0,
    millisecond: 0,
  });

  // Convert to Unix timestamp (seconds since epoch)
  return Math.floor(targetDateTime.toSeconds());
};

export default getNextOccurrence;
