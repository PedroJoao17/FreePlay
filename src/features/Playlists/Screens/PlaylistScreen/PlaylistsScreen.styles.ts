import { StyleSheet } from "react-native";
import { colors } from "@/shared/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        padding: 16,
    },
    title: {
        color: colors.text,
        fontSize: 22,
        fontWeight: "700",
    },
    subtitle: {
        marginTop: 8,
        color: colors.muted,
        fontSize: 14,
        lineHeight: 20,
    },
});
