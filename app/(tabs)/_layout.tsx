import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { colors } from "@/shared/theme/colors";
import { TopTabsHeader } from "@/shared/ui/TopTabsHeader/TopTabsHeader";

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Tabs
        screenOptions={{
          header: () => <TopTabsHeader />,
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
