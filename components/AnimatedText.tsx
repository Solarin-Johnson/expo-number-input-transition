import {
  Platform,
  StyleSheet,
  TextProps,
  useWindowDimensions,
} from "react-native";
import React, { useMemo } from "react";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { useScaleFont } from "@/hooks/useScaleFont";
import { BASE_WIDTH } from "@/constants";

interface CharacterObject {
  id: string;
  char: string;
}

const springConfig = {
  damping: 24,
  stiffness: 180,
};

const AnimatedText = (props: TextProps & { size: number }) => {
  const { children, size, ...rest } = props;
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  const splitText: CharacterObject[] = useMemo(() => {
    if (typeof children !== "string" && typeof children !== "number") {
      return [];
    }

    let commaCount = 0;
    const stringValue = children.toString();
    return stringValue.split("").map((char, index) => ({
      id:
        char === ","
          ? `comma-${++commaCount}-${index}`
          : `${index - commaCount}-${char}`,
      char,
    }));
  }, [children]);

  const scaleFont = useScaleFont();

  const textStyle = useMemo(
    () => ({
      fontSize: scaleFont(size),
    }),
    [size]
  );

  const animatedScale = useDerivedValue(() => {
    const len = splitText.filter((item) => item.char !== ",").length;
    const scaleRatio = isWeb ? 0.9 : Math.min(0.9, BASE_WIDTH / width);

    if (len > 6) {
      return scaleRatio * 0.56;
    }
    return 1;
  });

  const textScaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(animatedScale.value, springConfig) }],
  }));

  const getAnimation = useMemo(() => {
    return (index: number, id: string) => {
      if (id === "0-0") {
        return {
          entering: FadeInUp.duration(120),
          exiting: FadeOutUp.duration(120),
        };
      }

      if (index === splitText.length - 1 || id.includes("comma")) {
        return {
          entering: FadeInDown.duration(120),
          exiting: FadeOutDown.duration(120),
        };
      }
    };
  }, [splitText.length]);

  const layoutConfig = LinearTransition.springify()
    .damping(springConfig.damping)
    .stiffness(springConfig.stiffness);

  return (
    <Animated.View style={[styles.cover, textScaleAnimatedStyle]}>
      <Animated.View layout={layoutConfig} style={[styles.container]}>
        <Animated.View>
          <Animated.Text style={[rest.style, styles.currency, textStyle]}>
            {"$"}
          </Animated.Text>
        </Animated.View>
        {splitText.map(({ char, id }, index) => (
          <Animated.View
            {...getAnimation(index, id)}
            key={id}
            layout={layoutConfig}
          >
            <Animated.Text {...rest} style={[rest.style, textStyle]}>
              {char}
            </Animated.Text>
          </Animated.View>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cover: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginLeft: 0,
  },
  currency: {
    transform: [
      { scale: 0.45 },
      {
        translateX: "-5%",
      },
      {
        translateY: "45%",
      },
    ],
    transformOrigin: "top right",
  },
});

export default React.memo(AnimatedText);
