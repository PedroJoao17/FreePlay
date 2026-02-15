import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { styles } from "./TopTabsHeader.styles";
import { TABS, useTopTabsHeaderVM } from "./useTopTabsHeaderVM";

export function TopTabsHeader() {
    const { insets, pillWidth, segmentWidth, indicatorX, activeIndex, goToTab } =
        useTopTabsHeaderVM();

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: indicatorX.value }],
    }));

    return (
        <View style={[styles.headerWrap, { paddingTop: insets.top + 10 }]}>
            <View style={styles.brandRow}>
                <Image
                    source={require("../../../../assets/images/adaptive-icon.png")}
                    style={styles.brandIcon}
                />
                <View style={{ flex: 1 }}>
                    <Text style={styles.brandTitle}>FreePlay</Text>
                    <Text style={styles.brandSubtitle}>{TABS[activeIndex]?.label}</Text>
                </View>
            </View>

            <View style={[styles.pill, { width: pillWidth }]}>
                <Animated.View
                    style={[styles.pillIndicator, { width: segmentWidth }, indicatorStyle]}
                />
                {TABS.map((tab, idx) => {
                    const isActive = idx === activeIndex;
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
