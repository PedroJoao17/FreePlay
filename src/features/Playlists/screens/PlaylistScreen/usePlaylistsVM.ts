import { useCallback, useEffect, useMemo, useState } from "react";
import * as Linking from "expo-linking";
import type { Track } from "@/features/library/model/types";
import {
    ensureAudioLibraryPermission,
    getLatestTracks,
} from "@/features/library/data/mediaLibraryRepo";

type LoadState = "idle" | "loading" | "ready" | "denied" | "error";

function normalizeErrorMessage(e: unknown) {
    if (typeof e === "string") return e;
    if (e && typeof e === "object" && "message" in e) {
        const msg = (e as any).message;
        if (typeof msg === "string") return msg;
    }
    return "Falha ao carregar biblioteca de músicas.";
}

export function usePlaylistsVM() {
    const [state, setState] = useState<LoadState>("idle");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const [latest, setLatest] = useState<Track[]>([]);
    const [mostPlayed, setMostPlayed] = useState<Track[]>([]);
    const [mostPlayedIsFallback, setMostPlayedIsFallback] = useState(false);

    const load = useCallback(async () => {
        setErrorMsg(null);
        setState("loading");

        try {
            const perm = await ensureAudioLibraryPermission();

            if (!perm?.granted) {
                setState("denied");
                return;
            }

            const latestTracks = await getLatestTracks(60);
            setLatest(latestTracks);

            // MVP: “Mais tocadas” ainda depende de persistência/estatísticas.
            setMostPlayed(latestTracks);
            setMostPlayedIsFallback(true);

            setState("ready");
        } catch (e) {
            setErrorMsg(normalizeErrorMessage(e));
            setState("error");
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const latestPreview = useMemo(() => latest.slice(0, 4), [latest]);
    const mostPlayedPreview = useMemo(() => mostPlayed.slice(0, 4), [mostPlayed]);

    const openSettings = useCallback(() => Linking.openSettings(), []);

    return {
        state,
        errorMsg,
        latestCount: latest.length,
        mostPlayedCount: mostPlayed.length,
        mostPlayedIsFallback,
        latestPreview,
        mostPlayedPreview,
        reload: load,
        openSettings,
    };
}
