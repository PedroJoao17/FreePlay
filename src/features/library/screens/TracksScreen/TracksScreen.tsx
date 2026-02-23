import React, { useMemo, useRef, useState } from "react";
import {
    Pressable,
    SectionList,
    Text,
    TextInput,
    View,
    PanResponder,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { styles } from "./TracksScreen.styles";
import { useTracksVM, TrackRow, TrackSection } from "./useTracksVM";

export default function TracksScreen() {
    const vm = useTracksVM();
    const listRef = useRef<SectionList<TrackRow, TrackSection>>(null);

    const [scrubbing, setScrubbing] = useState(false);
    const [bubbleLetter, setBubbleLetter] = useState("A");

    const barHeightRef = useRef(0);
    const lastLetterRef = useRef<string | null>(null);

    const findNearestSectionIndex = useMemo(() => {
        return (letter: string) => {
            if (vm.indexByLetter[letter] !== undefined) return vm.indexByLetter[letter];

            const letters = vm.letters;
            const start = letters.indexOf(letter);
            for (let i = start + 1; i < letters.length; i++) {
                const l = letters[i];
                if (vm.indexByLetter[l] !== undefined) return vm.indexByLetter[l];
            }
            return 0;
        };
    }, [vm.indexByLetter, vm.letters]);

    const scrollToLetter = (letter: string) => {
        const sectionIndex = findNearestSectionIndex(letter);
        listRef.current?.scrollToLocation({
            sectionIndex,
            itemIndex: 0,
            animated: true,
            viewPosition: 0,
        });
    };

    const pickLetterFromY = (y: number) => {
        const h = barHeightRef.current || 1;
        const total = vm.letters.length;
        const clamped = Math.max(0, Math.min(y, h));
        const idx = Math.max(
            0,
            Math.min(total - 1, Math.floor((clamped / h) * total))
        );
        return vm.letters[idx];
    };

    const handleScrub = (y: number) => {
        const letter = pickLetterFromY(y);
        if (lastLetterRef.current === letter) return;

        lastLetterRef.current = letter;
        setBubbleLetter(letter);
        scrollToLetter(letter);
    };

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: (evt) => {
                    setScrubbing(true);
                    handleScrub(evt.nativeEvent.locationY);
                },
                onPanResponderMove: (evt) => {
                    handleScrub(evt.nativeEvent.locationY);
                },
                onPanResponderRelease: () => {
                    setScrubbing(false);
                    lastLetterRef.current = null;
                },
                onPanResponderTerminate: () => {
                    setScrubbing(false);
                    lastLetterRef.current = null;
                },
            }),
        [vm.letters, vm.indexByLetter]
    );

    return (
        <View style={styles.container}>
            <SectionList
                ref={listRef}
                sections={vm.sections}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false} // ✅ evita crash no Fabric
                contentContainerStyle={styles.content}
                onRefresh={vm.onRefresh}
                refreshing={vm.refreshing}
                initialNumToRender={18}
                maxToRenderPerBatch={28}
                windowSize={12}
                updateCellsBatchingPeriod={16}
                removeClippedSubviews={false} // ✅ principal fix

                onScrollToIndexFailed={({ index, averageItemLength }) => {
                    const y = Math.max(0, (averageItemLength || 48) * index);
                    const responder = listRef.current?.getScrollResponder();
                    (responder as any)?.scrollTo?.({ y, animated: true });
                }}
                renderSectionHeader={({ section }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{section.title}</Text>
                    </View>
                )}
                ListHeaderComponent={
                    <>
                        <Text style={styles.title}>Faixas</Text>

                        <TextInput
                            value={vm.query}
                            onChangeText={vm.setQuery}
                            placeholder="Buscar por nome…"
                            placeholderTextColor="#94A3B8"
                            style={styles.search}
                            autoCorrect={false}
                            autoCapitalize="none"
                            clearButtonMode="while-editing"
                        />

                        <Text style={styles.meta}>
                            {vm.syncing ? "Atualizando biblioteca…" : `${vm.tracksCount} faixas`}
                        </Text>

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
                    </>
                }
                renderItem={({ item }) => (
                    <Pressable style={styles.row} onPress={() => { }}>
                        <View style={styles.rowIcon}>
                            <FontAwesome name="music" size={16} color="#94A3B8" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.rowTitle} numberOfLines={1}>
                                {item.title}
                            </Text>
                        </View>
                    </Pressable>
                )}
            />

            {scrubbing && (
                <View style={styles.bubble} pointerEvents="none">
                    <Text style={styles.bubbleText}>{bubbleLetter}</Text>
                </View>
            )}

            <View
                style={styles.alphaBar}
                onLayout={(e) => (barHeightRef.current = e.nativeEvent.layout.height)}
                {...panResponder.panHandlers}
            >
                {vm.letters.map((l) => (
                    <Text key={l} style={styles.alphaLetterText}>
                        {l}
                    </Text>
                ))}
            </View>
        </View>
    );
}