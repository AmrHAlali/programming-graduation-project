/**
 * Utility to truncate a string if it exceeds a specified length.
 * @param {string} str - The string to be truncated.
 * @param {number} maxLength - The maximum length allowed for the string.
 * @returns {string} - Truncated string with "..." if needed.
 */
export const truncateString = (str: string, maxLength: number) => {
  if (typeof str !== "string") return ""; // Safety check
  return str.length > maxLength ? `${str.substring(0, maxLength)}` : str;
};
