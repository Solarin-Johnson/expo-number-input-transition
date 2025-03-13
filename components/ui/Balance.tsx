import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useScaleFont } from "@/hooks/useScaleFont";

interface RecipientProps {
  onPress: () => void;
  balance: number;
}

const Balance: React.FC<RecipientProps> = ({ onPress, balance }) => {
  const backgroundColor = useThemeColor({}, "foreground");
  const text = useThemeColor({}, "text");
  const ripple = useThemeColor({}, "ripple");
  const scaleFont = useScaleFont();

  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ThemedView
        style={{
          padding: 14,
          height: "100%",
          borderRadius: 10,
        }}
      >
        <ThemedText>
          <FontAwesome6 name="sack-dollar" size={18} />
        </ThemedText>
      </ThemedView>
      <View style={{ flex: 1 }}>
        <ThemedText
          style={{
            fontSize: scaleFont(13),
            opacity: 0.5,
          }}
        >
          Balance
        </ThemedText>
        <ThemedText
          style={{
            fontSize: scaleFont(18),
            color: text,
          }}
        >
          {formattedBalance(balance)}
        </ThemedText>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: text + "08",
          },
        ]}
        onPress={onPress}
      >
        <ThemedText style={{ fontSize: scaleFont(14) }}>Use Max</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 16,
    gap: 12,
    alignItems: "center",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Balance;
