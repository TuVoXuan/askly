export function toSlug(text: string): string {
  return text
    .normalize("NFD")                     // split accents from letters
    .replace(/[\u0300-\u036f]/g, "")      // remove accents
    .toLowerCase()                        // to lowercase
    .trim()                               // remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, "")         // remove special characters
    .replace(/\s+/g, "-");                // replace spaces with -
}