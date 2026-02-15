import React from "react";
import { Text, View } from "react-native";
import { styles } from "./TracksScreen.styles";
import { useTracksVM } from "./useTracksVM";

export default function TracksScreen() {
    const vm = useTracksVM();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faixas</Text>
            <Text style={styles.subtitle}>
                {vm.isEmpty
                    ? "Nenhuma faixa carregada ainda. Em seguida vamos integrar a leitura da mídia local."
                    : "Lista de faixas…"}
            </Text>
        </View>
    );
}
