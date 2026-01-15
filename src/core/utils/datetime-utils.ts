import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

/**
 * Format a date string into a human-readable format
 *
 * @param {string} date - Date string in ISO 8601 format
 * @return {string} Formatted date string in the format "dddd D MMM"
 */
export const formatDate = (date: string): string => {
  return dayjs(date).format("dddd D MMM");
};

/**
 * Format a date string into a human-readable short format
 *
 * @param {string} date - Date string in ISO 8601 format
 * @return {string} Formatted date string in the format "ddd D"
 */
export const formatShortDate = (date: string): string => {
  return dayjs(date).format("ddd D");
};

/**
 * Format a time value into a 12-hour clock format with AM/PM.
 *
 * Accepts either:
 * - a full ISO 8601 datetime string (e.g. "2025-12-20T10:00:00"), or
 * - a time string in HH:mm:ss format (e.g. "10:00:00").
 */
export const timeFormat = (time: string): string => {
  const asDateTime = dayjs(time);

  if (asDateTime.isValid()) {
    return asDateTime.format("hh:mm A");
  }

  return dayjs(`1970-01-01T${time}`).format("hh:mm A");
};

/**
 * Calculate the duration between two times in minutes
 *
 * @param {string} startTime - Start time in HH:mm:ss format
 * @param {string} endTime - End time in HH:mm:ss format
 * @return {number} Duration in minutes
 */
export const calculateDuration = (
  startTime: string,
  endTime: string
): number => {
  const start = dayjs(`1970-01-01T${startTime}`);
  let end = dayjs(`1970-01-01T${endTime}`);

  // If the end time is earlier than the start time, it means the end time is on the next day
  if (end.isBefore(start)) {
    end = end.add(1, "day");
  }

  return end.diff(start, "minute");
};

/**
 * Format a given date string into an ISO 8601 timestamp with time set to 00:00:00
 *
 * @param {string} date - Date string in the format "YYYY-MM-DD"
 * @return {string} Formatted ISO 8601 timestamp
 */
export const formatToIsoWithDefaultTime = (date: string): string => {
  // Combine the given date with the default time "00:00:00"
  const formattedTimestamp = dayjs.utc(`${date}T00:00:00`).toISOString();
  return formattedTimestamp;
};

/**
 * Convert a given time string into minutes
 *
 * @param {string} time - Time string in HH:mm:ss format
 * @return {number} Time in minutes
 */
export const timeToMinutes = (time: string): number => {
  return (
    dayjs(`1970-01-01T${time}`).hour() * 60 +
    dayjs(`1970-01-01T${time}`).minute()
  );
};

/**
 * Convert a given time in minutes to a string in the format "HH:mm"
 *
 * @param {number} minutes - Time in minutes
 * @return {string} Formatted time string in the format "HH:mm"
 */
export const minutesToTime = (minutes: number): string => {
  return dayjs()
    .hour(Math.floor(minutes / 60))
    .minute(minutes % 60)
    .format("HH:mm");
};

/**
 * Convert a 12-hour clock time string (e.g., "12 pm") into a 24-hour time string
 *
 * @param {string} time12h - Time string in 12-hour format with AM/PM (e.g., "12 pm")
 * @return {string} Time string in 24-hour format with seconds (e.g., "12:00:00")
 */
export const convert12hTo24h = (time12h: string): string => {
  const [time, period] = time12h.split(" ");
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);

  if (period === "PM" && hour < 12) {
    return `${(hour + 12).toString().padStart(2, "0")}:${minutes}:00`;
  } else if (period === "AM" && hour === 12) {
    return `00:${minutes}:00`;
  } else {
    return `${hours}:${minutes}:00`;
  }
};
