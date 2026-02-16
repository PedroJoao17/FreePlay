import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { styles } from "./PlaylistsScreen.styles";
import { usePlaylistsVM } from "./usePlaylistsVM";

function CollectionCard(props: {
    title: string;
    count: number;
    hint?: string;
    thumbs: Array<unknown>; // só pra renderizar 4 slots agora
}) {
    return (
        <View style={styles.collectionCard}>
            <Text style={styles.collectionTitle}>{props.title}</Text>
            <Text style={styles.collectionMeta}>
                {props.count} faixas{props.hint ? ` • ${props.hint}` : ""}
            </Text>

            <View style={styles.thumbGrid}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <View key={i} style={styles.thumbCell}>
                        <FontAwesome name="music" size={16} color="#94A3B8" />
                    </View>
                ))}
            </View>
        </View>
    );
}

export default function PlaylistsScreen() {
    const vm = usePlaylistsVM();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Lista de Reprodução</Text>

            {/* Permissão / Erro */}
            {vm.state === "denied" && (
                <View style={styles.noticeCard}>
                    <Text style={styles.noticeTitle}>Permissão necessária</Text>
                    <Text style={styles.noticeText}>
                        Para listar suas músicas, o FreePlay precisa de acesso aos arquivos de áudio.
                    </Text>

                    <View style={styles.noticeActions}>
                        <Pressable style={styles.primaryBtn} onPress={vm.reload}>
                            <Text style={styles.primaryBtnText}>Permitir acesso</Text>
                        </Pressable>

                        <Pressable style={styles.ghostBtn} onPress={vm.openSettings}>
                            <Text style={styles.ghostBtnText}>Abrir configurações</Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {vm.state === "error" && (
                <View style={styles.noticeCard}>
                    <Text style={styles.noticeTitle}>Falha ao carregar</Text>
                    <Text style={styles.noticeText}>{vm.errorMsg}</Text>

                    <View style={styles.noticeActions}>
                        <Pressable style={styles.primaryBtn} onPress={vm.reload}>
                            <Text style={styles.primaryBtnText}>Tentar novamente</Text>
                        </Pressable>
                    </View>
                </View>
            )}

            {/* Coleções padrão (topo) */}
            <View style={styles.collectionsRow}>
                <CollectionCard
                    title="Últimas Adições"
                    count={vm.latestCount}
                    thumbs={vm.latestPreview}
                />
                <CollectionCard
                    title="Mais Tocadas"
                    count={vm.mostPlayedCount}
                    hint={vm.mostPlayedIsFallback ? "sem estatísticas ainda" : undefined}
                    thumbs={vm.mostPlayedPreview}
                />
            </View>

            {/* Título Playlists */}
            <Text style={styles.sectionTitle}>Playlists</Text>

            {/* Placeholder para playlists do usuário */}
            <View style={styles.userPlaylistsCard}>
                <Text style={styles.userPlaylistsText}>
                    Nenhuma playlist criada ainda.
                </Text>
                <Text style={styles.userPlaylistsHint}>
                    Em seguida vamos adicionar criação/edição + persistência local.
                </Text>
            </View>
        </ScrollView>
    );
}
