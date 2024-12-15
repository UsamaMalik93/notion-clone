export function stringToColor(input: string): string {
  // Generate a hash from the string
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a valid RGB color
  const r = (hash >> 0) & 0xff; // Extract red
  const g = (hash >> 8) & 0xff; // Extract green
  const b = (hash >> 16) & 0xff; // Extract blue

  // Return the color in hexadecimal format
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
