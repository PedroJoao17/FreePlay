import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { usePathname, useRouter } from "expo-router";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { styles } from "./TopTabsHeader.styles";
import { TABS, useTopTabsHeaderVM } from "./useTopTabsHeaderVM";

const SETTINGS_ROUTE = "/(tabs)/settings" as const;

export function TopTabsHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const isSettings = pathname.includes("settings");

    const { insets, pillWidth, segmentWidth, indicatorX, activeIndex, goToTab } =
        useTopTabsHeaderVM();

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: indicatorX.value }],
    }));

    const subtitle = isSettings ? "Configurações" : TABS[activeIndex]?.label;

    return (
        <View style={[styles.headerWrap, { paddingTop: insets.top + 10 }]}>
            <View style={styles.brandRow}>
                <Image
                    source={require("../../../../assets/images/adaptive-icon.png")}
                    style={styles.brandIcon}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.brandTitle}>FreePlay</Text>
                    <Text style={styles.brandSubtitle}>{subtitle}</Text>
                </View>

                {/* Botão global à direita */}
                <Pressable
                    onPress={() => (isSettings ? router.back() : router.push(SETTINGS_ROUTE))}
                    style={styles.headerAction}
                    accessibilityRole="button"
                    accessibilityLabel={isSettings ? "Fechar configurações" : "Abrir configurações"}
                >
                    <FontAwesome
                        name={isSettings ? "close" : "cog"}
                        size={20}
                        color="#E5E7EB"
                    />
                </Pressable>
            </View>

            {/* Top segmented nav (só para as 3 principais) */}
            <View style={[styles.pill, { width: pillWidth }]}>
                <Animated.View
                    style={[styles.pillIndicator, { width: segmentWidth }, indicatorStyle]}
                />
                {TABS.map((tab, idx) => {
                    const isActive = idx === activeIndex && !isSettings;

                    return (
                        <Pressable
                            key={tab.key}
                            onPress={() => goToTab(tab.key)}
                            style={styles.pillItem}
                            accessibilityRole="button"
                            accessibilityLabel={tab.label}
                            accessibilityState={{ selected: isActive }}
                        >
                            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                                {tab.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
