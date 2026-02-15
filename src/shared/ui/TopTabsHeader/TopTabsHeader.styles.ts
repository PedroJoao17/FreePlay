import { StyleSheet } from "react-native";
import { colors } from "@/shared/theme/colors";

export const styles = StyleSheet.create({
    headerWrap: {
        backgroundColor: colors.bg,
        paddingBottom: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    headerAction: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(17, 27, 44, 0.6)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
    },
    brandRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        gap: 12,
        paddingBottom: 10,
    },
    brandIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: colors.surface,
    },
    brandTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 0.2,
    },
    brandSubtitle: {
        color: colors.muted,
        fontSize: 12,
        marginTop: 2,
    },
    pill: {
        alignSelf: "center",
        flexDirection: "row",
        backgroundColor: colors.surface,
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        overflow: "hidden",
    },
    pillIndicator: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(59, 130, 246, 0.22)",
    },
    pillItem: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    pillText: {
        color: colors.muted,
        fontSize: 12,
        fontWeight: "600",
        textAlign: "center",
    },
    pillTextActive: {
        color: colors.text,
    },
});
