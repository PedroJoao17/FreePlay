// app/index.tsx
import { useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function AppOpening() {
    const router = useRouter();

    useEffect(() => {
        // Splash simples (in-app). Depois, vai para a home (tabs).
        const t = setTimeout(() => {
            router.replace("/(tabs)");
        }, 900);

        return () => clearTimeout(t);
    }, [router]);

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/logo-horizontal.png")}
                style={styles.logo}
                resizeMode="contain"
                accessibilityLabel="FreePlay"
            />

            <ActivityIndicator style={styles.spinner} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A1220",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    logo: {
        width: "92%",
        maxWidth: 520,
        height: 140,
    },
    spinner: {
        marginTop: 24,
    },
});
