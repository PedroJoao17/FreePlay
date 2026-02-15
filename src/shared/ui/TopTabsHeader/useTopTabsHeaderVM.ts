import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue, withTiming } from "react-native-reanimated";

const ROUTES = {
    playlists: "/(tabs)/playlists",
    tracks: "/(tabs)/tracks",
    albums: "/(tabs)/albums",
} as const;

export type TabKey = keyof typeof ROUTES;

export const TABS = [
    { key: "playlists", label: "Lista de Reprodução", href: ROUTES.playlists },
    { key: "tracks", label: "Faixas", href: ROUTES.tracks },
    { key: "albums", label: "Álbuns", href: ROUTES.albums },
] as const;

function getActiveTab(pathname: string): TabKey {
    if (pathname.includes("playlists")) return "playlists";
    if (pathname.includes("albums")) return "albums";
    return "tracks";
}

export function useTopTabsHeaderVM() {
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();

    const activeKey = getActiveTab(pathname);

    const activeIndex = useMemo(() => {
        const idx = TABS.findIndex((t) => t.key === activeKey);
        return idx < 0 ? 1 : idx;
    }, [activeKey]);

    const horizontalPadding = 16;
    const pillWidth = Math.min(980, width - horizontalPadding * 2);
    const segmentWidth = pillWidth / TABS.length;

    const indicatorX = useSharedValue(activeIndex * segmentWidth);

    useEffect(() => {
        indicatorX.value = withTiming(activeIndex * segmentWidth, { duration: 180 });
    }, [activeIndex, segmentWidth, indicatorX]);

    function goToTab(key: TabKey) {
        const tab = TABS.find((t) => t.key === key);
        if (tab) router.replace(tab.href);
    }

    return {
        insets,
        pillWidth,
        segmentWidth,
        indicatorX,
        activeIndex,
        activeKey,
        goToTab,
    };
}
