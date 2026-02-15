import { View, Text, StyleSheet } from "react-native";

export default function PlaylistsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Reprodução</Text>
            <Text style={styles.subtitle}>Placeholder inicial.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#0A1220" },
    title: { color: "#E5E7EB", fontSize: 22, fontWeight: "700" },
    subtitle: { color: "#94A3B8", marginTop: 8, fontSize: 14 },
});
