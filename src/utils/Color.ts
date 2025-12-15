export function getLuminance(hex: string) {
  const rgb = hex.replace('#', '').match(/.{2}/g)?.map(v => parseInt(v, 16) / 255);

  const [r, g, b] = rgb ? rgb.map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  ) : [0,0,0];

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Converts a hex color to a lighter shade by mixing it with white
 * @param hex - Hex color string (e.g., "#FF5733" or "FF5733")
 * @param amount - Amount to lighten (0-1, where 0 is no change and 1 is white)
 * @returns Lightened hex color string
 */
export function lightenColor(hex: string, amount: number = 0.3): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex to RGB
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  
  // Clamp amount between 0 and 1
  amount = Math.max(0, Math.min(1, amount));
  
  // Mix with white (255, 255, 255)
  const newR = Math.round(r + (255 - r) * amount);
  const newG = Math.round(g + (255 - g) * amount);
  const newB = Math.round(b + (255 - b) * amount);
  
  // Convert back to hex
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}