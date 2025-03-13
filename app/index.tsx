import AnimatedText from "@/components/AnimatedText";
import { useReducer } from "react";
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

export default function Home() {
  const { displayValue, appendDigit, addDecimalPoint, deleteDigit, clearAll } =
    useNumber();

  const text = useThemeColor({}, "text");
  const bg = useThemeColor({}, "background");
  const ripple = useThemeColor({}, "ripple");

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
            clearAll();
            appendDigit(19485);
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
        <Pressable
          style={[styles.continue, { backgroundColor: text }]}
          android_ripple={{ color: ripple }}
        >
          <ThemedText style={{ color: bg }}>Continue</ThemedText>
        </Pressable>
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
  },
  label: {
    fontSize: 18,
    opacity: 0.7,
    marginBottom: 8,
  },
  screen: {
    width: "100%",
    // alignItems: "center",
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
