// app/(tabs)/_layout.tsx
import React, { useEffect, useMemo } from "react";
import { Tabs, usePathname, useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const COLORS = {
  bg: "#0A1220",
  surface: "#111B2C",
  border: "#22304A",
  text: "#E5E7EB",
  muted: "#94A3B8",
  primary: "#3B82F6",
} as const;

const ROUTES = {
  playlists: "/(tabs)/playlists",
  tracks: "/(tabs)/tracks",
  albums: "/(tabs)/albums",
} as const;

type TabKey = keyof typeof ROUTES;

const TABS = [
  { key: "playlists", label: "Lista de Reprodução", href: ROUTES.playlists },
  { key: "tracks", label: "Faixas", href: ROUTES.tracks },
  { key: "albums", label: "Álbuns", href: ROUTES.albums },
] as const;

function getActiveTab(pathname: string): TabKey {
  if (pathname.includes("playlists")) return "playlists";
  if (pathname.includes("albums")) return "albums";
  return "tracks";
}

function HeaderTopTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const activeKey = getActiveTab(pathname);
  const activeIndex = useMemo(
    () => Math.max(0, TABS.findIndex((t) => t.key === activeKey)),
    [activeKey]
  );

  const horizontalPadding = 16;
  const pillWidth = Math.min(980, width - horizontalPadding * 2);
  const segmentWidth = pillWidth / TABS.length;

  const indicatorX = useSharedValue(activeIndex * segmentWidth);

  useEffect(() => {
    indicatorX.value = withTiming(activeIndex * segmentWidth, { duration: 180 });
  }, [activeIndex, segmentWidth, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  return (
    <View style={[styles.headerWrap, { paddingTop: insets.top + 10 }]}>
      {/* Brand row */}
      <View style={styles.brandRow}>
        <Image
          source={require("../../assets/images/adaptive-icon.png")}
          style={styles.brandIcon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.brandTitle}>FreePlay</Text>
          <Text style={styles.brandSubtitle}>{TABS[activeIndex]?.label}</Text>
        </View>
      </View>

      {/* Top segmented nav */}
      <View style={[styles.pill, { width: pillWidth }]}>
        <Animated.View
          style={[styles.pillIndicator, { width: segmentWidth }, indicatorStyle]}
        />

        {TABS.map((tab, idx) => {
          const isActive = idx === activeIndex;

          return (
            <Pressable
              key={tab.key}
              onPress={() => router.replace(tab.href)}
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

export default function TabLayout() {
  return (
    // ✅ background garantido “por trás” do navigator (sem depender de props não suportadas)
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <Tabs
        screenOptions={{
          header: () => <HeaderTopTabs />,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen name="playlists" options={{ title: "Lista de Reprodução" }} />
        <Tabs.Screen name="tracks" options={{ title: "Faixas" }} />
        <Tabs.Screen name="albums" options={{ title: "Álbuns" }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: COLORS.bg,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
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
    backgroundColor: COLORS.surface,
  },
  brandTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  brandSubtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 2,
  },
  pill: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.border,
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
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  pillTextActive: {
    color: COLORS.text,
  },
});
