import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { ThemedView } from "./ThemedView";
import { useScaleFont } from "@/hooks/useScaleFont";
import { useThemeColor } from "@/hooks/useThemeColor";

interface NumberPadProps {
  onPress: (value: number) => void;
  onDelete?: () => void;
  onClear?: () => void;
  onDot?: () => void;
  showDot?: boolean;
}

const NumberPad: React.FC<NumberPadProps> = memo(
  ({ onPress, onDelete, onClear, onDot, showDot = true }) => {
    const scaleFont = useScaleFont();
    const ripple = useThemeColor({}, "ripple");

    const renderButton = React.useCallback(
      (value: string) => {
        const isSpecialButton = value === "delete" || value === "clear";

        const handlePress = () => {
          if (value === "delete") {
            onDelete?.();
          } else if (value === "clear") {
            onClear?.();
          } else if (value === "dot") {
            onDot?.();
          } else {
            onPress(parseInt(value));
          }
        };

        return (
          <Pressable
            key={value}
            style={[styles.button, isSpecialButton && styles.specialButton]}
            onPress={handlePress}
            onLongPress={() => {
              if (value === "delete") {
                onClear?.();
              }
            }}
            android_ripple={{
              color: ripple,
              borderless: true,
              radius: 42,
              foreground: true,
            }}
          >
            {value === "delete" ? (
              <ThemedText style={styles.specialButtonText}>
                <Ionicons name="chevron-back" size={24} />
              </ThemedText>
            ) : value === "dot" ? (
              <ThemedText style={styles.specialButtonText}>
                <Entypo name="dot-single" size={24} />
              </ThemedText>
            ) : (
              <ThemedText
                style={[styles.buttonText, { fontSize: scaleFont(26) }]}
              >
                {value}
              </ThemedText>
            )}
          </Pressable>
        );
      },
      [onDelete, onClear, onPress]
    );

    const numbers = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      [showDot ? "dot" : "", "0", "delete"],
    ];

    return (
      <ThemedView style={styles.container}>
        {numbers.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((value) =>
              value ? (
                renderButton(value)
              ) : (
                <View key="empty" style={styles.button} />
              )
            )}
          </View>
        ))}
      </ThemedView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    width: "100%",
    justifyContent: "flex-end",
    minHeight: 200,
    maxHeight: 300,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {},
  specialButton: {},
  specialButtonText: {
    fontSize: 20,
  },
});

export default NumberPad;
