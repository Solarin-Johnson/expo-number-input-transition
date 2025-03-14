import AnimatedText from "@/components/AnimatedText";
import {
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import NumberPad from "@/components/NumberPad";
import useNumber from "@/hooks/useNumber";
import Recipient from "@/components/ui/Recipient";
import Balance from "@/components/ui/Balance";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Home() {
  const {
    displayValue,
    appendDigit,
    addDecimalPoint,
    replaceDigit,
    deleteDigit,
    clearAll,
  } = useNumber();

  const text = useThemeColor({}, "text");
  const bg = useThemeColor({}, "background");
  const ripple = useThemeColor({}, "ripple");

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        parseFloat(displayValue) === 0 ? text + "70" : text,
        { duration: 120 }
      ),
    };
  });

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.screen}
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <Recipient names={["John Doe"]} />
        <AnimatedText size={76} style={[styles.textStyle, { color: text }]}>
          {displayValue}
        </AnimatedText>
        <Balance
          balance={19485}
          onPress={() => {
            replaceDigit(19485);
          }}
        />
      </ScrollView>
      <NumberPad
        onPress={(digit) => {
          appendDigit(digit);
        }}
        onDot={() => {
          addDecimalPoint();
        }}
        onClear={() => {
          clearAll();
        }}
        onDelete={() => {
          deleteDigit();
        }}
      />
      <View
        style={{
          paddingHorizontal: 24,
          width: "100%",
          boxSizing: "border-box",
          alignItems: "center",
        }}
      >
        <AnimatedPressable
          style={[
            styles.continue,
            { backgroundColor: text },
            buttonAnimatedStyle,
          ]}
          android_ripple={{ color: ripple }}
        >
          <ThemedText style={{ color: bg }}>Continue</ThemedText>
        </AnimatedPressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  textStyle: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(32),
    fontFamily: "QuicksandBold",
    lineHeight: 100,
  },
  label: {
    fontSize: 18,
    opacity: 0.7,
    marginBottom: 8,
  },
  screen: {
    width: "100%",
    flexGrow: 1,
    paddingVertical: 12,
  },
  continue: {
    marginBottom: 24,
    marginTop: 12,
    height: 52,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
