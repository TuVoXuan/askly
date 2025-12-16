import { lightenColor } from "@/utils/Color";

export default function useGenerateSubColor(hexColor?: string) {
  if(!hexColor) return [];
  const sub90 = lightenColor(hexColor, 0.9);
  const sub80 = lightenColor(hexColor, 0.8);
  const sub75 = lightenColor(hexColor, 0.75);
  return [sub90, sub80, sub75];
}