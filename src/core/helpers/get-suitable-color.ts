// Utility: returns white or black based on background color
export function getReadableTextColor(bgColor: string): string {
  // Remove # and convert to RGB
  const color = bgColor.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16) / 255;
  const g = parseInt(color.substring(2, 4), 16) / 255;
  const b = parseInt(color.substring(4, 6), 16) / 255;

  // sRGB luminance
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;

  // If luminance is high → use black, otherwise → white
  return lum > 0.65 ? "#000000" : "#FFFFFF";
}
