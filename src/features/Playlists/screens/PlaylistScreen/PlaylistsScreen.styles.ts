import { StyleSheet } from "react-native";
import { colors } from "@/shared/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    content: {
        padding: 16,
        paddingBottom: 28,
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

    collectionsRow: {
        marginTop: 16,
        flexDirection: "row",
        gap: 12,
    },
    collectionCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        borderRadius: 16,
        padding: 12,
    },
    collectionTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "700",
    },
    collectionMeta: {
        marginTop: 4,
        color: colors.muted,
        fontSize: 12,
    },
    thumbGrid: {
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    thumbCell: {
        width: "48%",
        aspectRatio: 1,
        marginBottom: 8,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        backgroundColor: "rgba(255,255,255,0.03)",
        alignItems: "center",
        justifyContent: "center",
    },
    sectionTitle: {
        marginTop: 18,
        color: colors.text,
        fontSize: 16,
        fontWeight: "700",
    },
    userPlaylistsCard: {
        marginTop: 10,
        backgroundColor: colors.surface,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        borderRadius: 16,
        padding: 14,
    },
    userPlaylistsText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "600",
    },
    userPlaylistsHint: {
        marginTop: 6,
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
    },

    noticeCard: {
        marginTop: 14,
        backgroundColor: colors.surface,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        borderRadius: 16,
        padding: 14,
    },
    noticeTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "700",
    },
    noticeText: {
        marginTop: 6,
        color: colors.muted,
        fontSize: 12,
        lineHeight: 18,
    },
    noticeActions: {
        marginTop: 12,
        flexDirection: "row",
        gap: 10,
    },
    primaryBtn: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryBtnText: {
        color: colors.text,
        fontWeight: "700",
        fontSize: 12,
    },
    ghostBtn: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    ghostBtnText: {
        color: colors.text,
        fontWeight: "700",
        fontSize: 12,
    },
});
