import { getLuminance } from "@/utils/Color";

export default function useContrastColor(bgColor: string) {
  const luminance = getLuminance(bgColor);
  return luminance > 0.179 ? '#000000' : '#ffffff';
}