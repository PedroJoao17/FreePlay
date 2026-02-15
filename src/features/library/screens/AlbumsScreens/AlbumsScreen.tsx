import React from "react";
import { Text, View } from "react-native";
import { styles } from "./AlbumsScreen.styles";
import { useAlbumsVM } from "./useAlbumsVM";

export default function AlbumsScreen() {
    const vm = useAlbumsVM();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Álbuns</Text>
            <Text style={styles.subtitle}>
                {vm.isEmpty
                    ? "Nenhum álbum carregado ainda. Em seguida vamos ler os álbuns da biblioteca do aparelho."
                    : "Seus álbuns…"}
            </Text>
        </View>
    );
}
