import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useScaleFont } from "@/hooks/useScaleFont";

interface RecipientProps {
  names: string[];
}

const Recipient: React.FC<RecipientProps> = ({ names }) => {
  const backgroundColor = useThemeColor({}, "foreground");
  const text = useThemeColor({}, "text");
  const scaleFont = useScaleFont();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ThemedText style={[styles.label, { fontSize: scaleFont(13) }]}>
        To:
      </ThemedText>
      <View style={styles.namesContainer}>
        {names.map((name, index) => (
          <ThemedText
            key={index}
            style={[
              styles.name,
              { backgroundColor: text + "08", fontSize: scaleFont(13) },
            ]}
          >
            {name}
          </ThemedText>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    borderRadius: 15,
    marginVertical: 8,
    alignItems: "center",
  },
  label: {
    marginRight: 6,
    fontSize: 15,
    opacity: 0.5,
    padding: 4,
  },
  namesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
  },
  name: {
    fontSize: 15,
    marginRight: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
});

export default Recipient;
