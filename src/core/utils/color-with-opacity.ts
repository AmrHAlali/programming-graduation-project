// colorWithOpacity.ts
// Utility to convert hex color and opacity to rgba string

export function colorWithOpacity(hex: string, alpha: number): string {
    // Remove # if present
    hex = hex.replace('#', '');
    // Support shorthand hex
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}
