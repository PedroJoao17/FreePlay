import React from "react";
import { Text, View } from "react-native";
import { styles } from "./PlaylistsScreen.styles";
import { usePlaylistsVM } from "./usePlaylistsVM";

export default function PlaylistsScreen() {
    const vm = usePlaylistsVM();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Reprodução</Text>
            <Text style={styles.subtitle}>
                {vm.isEmpty
                    ? "Nenhuma playlist criada ainda. Em seguida vamos adicionar criação/edição e persistência local."
                    : "Suas playlists…"}
            </Text>
        </View>
    );
}
