import { StyleSheet } from "react-native";
import { colors } from "@/shared/theme/colors";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },

    content: { padding: 16, paddingRight: 56, paddingBottom: 28 },

    title: { color: colors.text, fontSize: 22, fontWeight: "700" },

    search: {
        marginTop: 12,
        backgroundColor: colors.surface,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        borderRadius: 14,
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: colors.text,
        fontSize: 14,
    },

    meta: { marginTop: 10, color: colors.muted, fontSize: 12 },

    noticeCard: {
        marginTop: 14,
        backgroundColor: colors.surface,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        borderRadius: 16,
        padding: 14,
    },
    noticeTitle: { color: colors.text, fontSize: 14, fontWeight: "700" },
    noticeText: { marginTop: 6, color: colors.muted, fontSize: 12, lineHeight: 18 },

    // ✅ sem gap (mais estável)
    noticeActions: { marginTop: 12, flexDirection: "row" },
    primaryBtn: {
        flex: 1,
        marginRight: 10,
        backgroundColor: colors.primary,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryBtnText: { color: colors.text, fontWeight: "700", fontSize: 12 },
    ghostBtn: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    ghostBtnText: { color: colors.text, fontWeight: "700", fontSize: 12 },

    sectionHeader: { paddingTop: 14, paddingBottom: 8, backgroundColor: colors.bg },
    sectionHeaderText: { color: colors.muted, fontSize: 12, fontWeight: "900" },

    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
    },
    rowIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: colors.surface,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    rowTitle: { color: colors.text, fontSize: 14, fontWeight: "600" },

    alphaBar: {
        position: "absolute",
        right: 10,
        top: 132,
        bottom: 18,
        width: 36,
        borderRadius: 18,
        backgroundColor: "rgba(17, 27, 44, 0.70)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
    },
    alphaLetterText: {
        color: colors.muted,
        fontSize: 10,
        fontWeight: "900",
        lineHeight: 12,
        paddingVertical: 2,
    },

    bubble: {
        position: "absolute",
        right: 58,
        top: "50%",
        transform: [{ translateY: -42 }],
        width: 76,
        height: 76,
        borderRadius: 22,
        backgroundColor: "rgba(17, 27, 44, 0.92)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },
    bubbleText: { color: colors.text, fontSize: 30, fontWeight: "900" },
});