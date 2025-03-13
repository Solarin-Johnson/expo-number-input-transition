import { BASE_WIDTH } from "@/constants";
import { useMemo } from "react";
import { PixelRatio, useWindowDimensions } from "react-native";

export function useScaleFont() {
  const { width } = useWindowDimensions();

  return useMemo(
    () => (size: number) => {
      return ((size * width) / BASE_WIDTH) * (1 / PixelRatio.getFontScale());
    },
    [width]
  );
}
