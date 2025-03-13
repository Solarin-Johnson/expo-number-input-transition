import { BASE_WIDTH } from "@/constants";
import { useMemo } from "react";
import { PixelRatio, Platform, useWindowDimensions } from "react-native";

export function useScaleFont() {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  return useMemo(
    () => (size: number) => {
      return isWeb
        ? size
        : ((size * width) / BASE_WIDTH) * (1 / PixelRatio.getFontScale());
    },
    [width]
  );
}
