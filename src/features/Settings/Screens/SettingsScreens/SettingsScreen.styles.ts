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
    card: {
        marginTop: 16,
        backgroundColor: colors.surface,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        borderRadius: 16,
        overflow: "hidden",
    },
    item: {
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    itemTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "600",
    },
    itemDesc: {
        marginTop: 4,
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
    },
});
