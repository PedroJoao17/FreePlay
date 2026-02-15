import { Stack } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colors } from "@/shared/theme/colors";

export default function ModalScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Sobre" }} />
      <View style={styles.container}>
        <Text style={styles.title}>FreePlay</Text>
        <Text style={styles.subtitle}>Modal placeholder (pode virar “Sobre/Config”).</Text>

        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 14,
    textAlign: "center",
  },
});
