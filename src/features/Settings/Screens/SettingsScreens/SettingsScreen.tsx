import React from "react";
import { Text, View } from "react-native";
import { styles } from "./SettingsScreen.styles";
import { useSettingsVM } from "./useSettingsVM";

export default function SettingsScreen() {
    const vm = useSettingsVM();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Configurações</Text>
            <Text style={styles.subtitle}>
                Ajustes básicos do app. (Vamos evoluir isso depois.)
            </Text>

            <View style={styles.card}>
                {vm.items.map((it, idx) => {
                    const isLast = idx === vm.items.length - 1;
                    return (
                        <View
                            key={it.title}
                            style={[
                                styles.item,
                                isLast && { borderBottomWidth: 0 },
                            ]}
                        >
                            <Text style={styles.itemTitle}>{it.title}</Text>
                            <Text style={styles.itemDesc}>{it.description}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
